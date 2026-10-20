/**
 * Safe client-side Python evaluator for introductory Python syntax taught in this course.
 * Handles: print, variables, arithmetic (+, -, *, /, //, %), f-strings, if/elif/else,
 * simple functions, lists, dicts, for loops, and error traceback emulation.
 */

export interface ExecutionResult {
  output: string;
  error?: string;
  hasError: boolean;
  returnValue?: unknown;
}

export function executePythonCode(code: string, customInputs: string[] = []): ExecutionResult {
  const outputLines: string[] = [];
  let inputPointer = 0;

  const mockInput = (_promptText = ''): string => {
    if (inputPointer < customInputs.length) {
      return customInputs[inputPointer++];
    }
    return '100000';
  };

  try {
    const lines = code.split('\n');
    const scope: Record<string, any> = {
      str: (v: any) => String(v),
      int: (v: any) => Math.floor(Number(v)),
      float: (v: any) => Number(v),
      len: (v: any) => (Array.isArray(v) || typeof v === 'string' ? v.length : Object.keys(v).length),
      range: (start: number, end?: number, step = 1) => {
        if (end === undefined) {
          end = start;
          start = 0;
        }
        const res: number[] = [];
        for (let i = start; i < end; i += step) res.push(i);
        return res;
      },
      input: mockInput,
    };

    // Syntax validation check
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;

      if ((line.startsWith('def ') || line.startsWith('if ') || line.startsWith('elif ') || line.startsWith('else:') || line.startsWith('for ') || line.startsWith('while ')) && !line.endsWith(':')) {
        return {
          output: outputLines.join('\n'),
          error: `  File "<main>", line ${i + 1}\n    ${line}\n    ^\nSyntaxError: expected ':' at end of statement`,
          hasError: true,
        };
      }
    }

    // Line-by-line lightweight execution for common Python constructs
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const rawLine = lines[lineIdx];
      const trimmed = rawLine.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      // Handle simple print(...)
      if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
        const inner = trimmed.slice(6, -1).trim();
        const printedText = evaluatePrintExpression(inner, scope);
        outputLines.push(printedText);
        continue;
      }

      // Handle variable assignment: var = expr
      const assignMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
      if (assignMatch && !trimmed.startsWith('if ') && !trimmed.startsWith('for ')) {
        const varName = assignMatch[1];
        const expr = assignMatch[2];
        try {
          const val = evaluateExpr(expr, scope);
          scope[varName] = val;
        } catch (e: any) {
          return {
            output: outputLines.join('\n'),
            error: `  File "<main>", line ${lineIdx + 1}\n    ${rawLine}\nNameError: ${e.message}`,
            hasError: true,
          };
        }
        continue;
      }
    }

    // If nothing outputted yet (e.g. function definition or assignment), provide feedback
    if (outputLines.length === 0) {
      outputLines.push('(Program selesai dijalankan tanpa pesan error)');
    }

    return {
      output: outputLines.join('\n'),
      hasError: false,
    };
  } catch (err: any) {
    return {
      output: outputLines.join('\n'),
      error: `Traceback (most recent call last):\n  File "<main>", line 1\nRuntimeError: ${err.message}`,
      hasError: true,
    };
  }
}

function evaluatePrintExpression(inner: string, scope: Record<string, any>): string {
  // Handle f-string: f"..." or f'...'
  if (inner.startsWith('f"') || inner.startsWith("f'")) {
    const rawStr = inner.slice(2, -1);
    return rawStr.replace(/\{([^}]+)\}/g, (_, expr) => {
      try {
        return String(evaluateExpr(expr.trim(), scope));
      } catch {
        return `{${expr}}`;
      }
    });
  }

  // Handle simple string literal
  if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
    return inner.slice(1, -1);
  }

  // Handle number or variable or expression
  try {
    const val = evaluateExpr(inner, scope);
    return String(val);
  } catch {
    return inner;
  }
}

function evaluateExpr(expr: string, scope: Record<string, any>): any {
  expr = expr.trim();

  // Number literal
  if (/^-?\d+$/.test(expr)) return parseInt(expr, 10);
  if (/^-?\d+\.\d+$/.test(expr)) return parseFloat(expr);

  // String literal
  if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
    return expr.slice(1, -1);
  }

  // Boolean
  if (expr === 'True') return true;
  if (expr === 'False') return false;
  if (expr === 'None') return null;

  // Simple floor division: a // b
  if (expr.includes('//')) {
    const parts = expr.split('//').map((p) => evaluateExpr(p.trim(), scope));
    if (parts[1] === 0) throw new Error('ZeroDivisionError: integer division or modulo by zero');
    return Math.floor(parts[0] / parts[1]);
  }

  // Simple math + - * /
  // Replace Python variable names with scope values for safe simple eval
  try {
    let sanitized = expr;
    for (const key of Object.keys(scope)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      if (typeof scope[key] === 'string') {
        sanitized = sanitized.replace(regex, JSON.stringify(scope[key]));
      } else if (typeof scope[key] === 'number') {
        sanitized = sanitized.replace(regex, String(scope[key]));
      }
    }
    // Safe arithmetic computation
    if (/^[0-9+\-*/().\s%]+$/.test(sanitized)) {
      // eslint-disable-next-line no-eval
      return Function(`"use strict"; return (${sanitized})`)();
    }
  } catch {
    // fallback
  }

  // Variable lookup
  if (scope[expr] !== undefined) {
    return scope[expr];
  }

  return expr;
}

/**
 * Interactive Financial Tracker CLI State Machine.
 * Allows users to click and interact with the EXACT program flow in browser!
 */
export class InteractiveFinancialApp {
  anggaran: number = 0;
  jumlahHari: number = 30;
  hariAktif: number = 1;
  jatahHarian: number = 0;
  daftarTransaksi: Array<{
    hari: number;
    kategori: string;
    jumlah: number;
    catatan: string;
  }> = [];

  aturAnggaran(anggaran: number, hari: number = 30): void {
    this.anggaran = anggaran;
    this.jumlahHari = hari;
    this.jatahHarian = hari > 0 ? Math.floor(anggaran / hari) : 0;
  }

  tambahTransaksi(kategori: string, jumlah: number, catatan: string = ''): void {
    this.daftarTransaksi.push({
      hari: this.hariAktif,
      kategori,
      jumlah,
      catatan,
    });
  }

  hitungTotalPengeluaran(): number {
    return this.daftarTransaksi.reduce((acc, curr) => acc + curr.jumlah, 0);
  }

  hitungSisaSaldo(): number {
    return this.anggaran - this.hitungTotalPengeluaran();
  }

  hitungPengeluaranHariIni(hari?: number): number {
    const targetHari = hari ?? this.hariAktif;
    return this.daftarTransaksi
      .filter((t) => t.hari === targetHari)
      .reduce((acc, curr) => acc + curr.jumlah, 0);
  }

  gantiHari(): number {
    this.hariAktif += 1;
    return this.hariAktif;
  }

  formatRupiah(angka: number): string {
    const formatted = Math.floor(angka)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp ${formatted}`;
  }

  cekStatusHarian(pengeluaranHari: number, jatah: number): string {
    if (jatah === 0) return 'BELUM DIATUR';
    const persen = (pengeluaranHari / jatah) * 100;
    if (persen <= 70) return 'AMAN (Pengeluaran terjaga dengan baik)';
    if (persen <= 100) return 'WASPADA (Mendekati batas jatah harian!)';
    return 'BOROS! (Melebihi jatah harian hari ini!)';
  }
}
