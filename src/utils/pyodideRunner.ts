import { PROJECT_FILES } from '../data/codeFiles';
import type { ExecutionResult } from './pythonRunner';

declare global {
  interface Window {
    loadPyodide?: (options?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  globals: { get: (name: string) => any; set: (name: string, value: unknown) => void };
  FS: { writeFile: (path: string, data: string) => void };
}

const PYODIDE_VERSION = '0.26.4';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
let pyodidePromise: Promise<PyodideInterface> | null = null;
let filesReady = false;

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Gagal memuat ${src}`));
    document.head.appendChild(script);
  });

async function getPyodide(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      if (!window.loadPyodide) {
        await loadScript(`${PYODIDE_CDN}pyodide.js`);
      }
      if (!window.loadPyodide) {
        throw new Error('loadPyodide tidak tersedia');
      }
      const py = await window.loadPyodide({ indexURL: PYODIDE_CDN });
      if (!filesReady) {
        for (const [name, file] of Object.entries(PROJECT_FILES)) {
          try {
            py.FS.writeFile(`/home/pyodide/${name}`, file.code);
          } catch {
            // Abaikan jika file sudah ada atau filesystem tidak tersedia.
          }
        }
        try {
          py.runPython("import sys; sys.path.insert(0, '/home/pyodide')");
        } catch {
          // Path mungkin sudah ada.
        }
        filesReady = true;
      }
      return py;
    })();
  }
  return pyodidePromise;
}

const stripAnsi = (value: string) => value.replace(/\u001b\[[0-9;]*m/g, '');

export function guessInputs(code: string): string[] {
  if (!/\binput\s*\(/.test(code)) return [];
  if (/MENU|def main\s*\(|setup_awal\s*\(/.test(code)) {
    return ['3000000', '30', '', '1', '1', '15000', '', '3', '', '4', '', '5', '', '0'];
  }
  if (/baca_angka|baca_pilihan/.test(code)) {
    return ['15000', '1'];
  }
  return ['100000', '30', '15000', 'Makan', ''];
}

/**
 * Menjalankan Python sungguhan di browser dengan Pyodide.
 * Jika Pyodide gagal dimuat, pemanggil dapat memakai simulator lama.
 */
export async function runPythonReal(
  code: string,
  inputs: string[] = guessInputs(code)
): Promise<ExecutionResult> {
  const py = await getPyodide();
  py.globals.set('__code__', code);
  py.globals.set('__inputs_json__', JSON.stringify(inputs));

  await py.runPythonAsync(`
import sys, io, builtins, traceback, json
__inputs__ = json.loads(__inputs_json__)
__stdout__ = io.StringIO()
__stderr__ = io.StringIO()
__old_stdout__ = sys.stdout
__old_stderr__ = sys.stderr
__old_input__ = builtins.input
sys.stdout = __stdout__
sys.stderr = __stderr__

def __mock_input__(prompt=''):
    if prompt:
        print(prompt, end='')
    if __inputs__:
        value = __inputs__.pop(0)
        print(value)
        return value
    raise EOFError('Tidak ada input lagi. Jalankan program di terminal untuk mencoba sendiri.')

builtins.input = __mock_input__
__error__ = None
try:
    exec(compile(__code__, '<main>', 'exec'), globals())
except SystemExit:
    pass
except BaseException:
    __error__ = traceback.format_exc()
finally:
    sys.stdout = __old_stdout__
    sys.stderr = __old_stderr__
    builtins.input = __old_input__
`);

  const stdout = String(py.globals.get('__stdout__')?.getvalue?.() ?? '');
  const stderr = String(py.globals.get('__stderr__')?.getvalue?.() ?? '');
  const error = py.globals.get('__error__');
  const hasError = error !== null && error !== undefined && String(error).length > 0;
  const output = stripAnsi(stdout).replace(/\n+$/g, '');
  const errorText = hasError
    ? stripAnsi(String(error)).trim()
    : stderr.trim()
    ? stripAnsi(stderr).trim()
    : undefined;

  return {
    output: output || (hasError ? '' : '(Program selesai tanpa output)'),
    error: errorText,
    hasError,
  };
}
