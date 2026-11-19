import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

/**
 * Menjaga agar setiap potongan kode proyek yang ditampilkan di halaman materi
 * benar-benar sama dengan file asli di src/data/project/.
 *
 * Snippet boleh berupa potongan (tidak harus seluruh file) dan boleh dibuang
 * indentasi luarnya, tetapi isi barisnya harus muncul berurutan di file asal.
 */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROJECT_FILES = ['pencatat.py', 'laporan.py', 'main.py', 'tampilan.py'];

let vite;
let chapters;
const sources = {};

before(async () => {
  for (const name of PROJECT_FILES) {
    sources[name] = readFileSync(path.join(root, 'src/data/project', name), 'utf8')
      .replace(/\r\n/g, '\n')
      .split('\n');
  }

  vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
    optimizeDeps: { noDiscovery: true },
  });
  ({ CHAPTERS: chapters } = await vite.ssrLoadModule('/src/data/lessonsEnhanced.ts'));
});

after(async () => {
  await vite?.close();
});

/** Buang indentasi bersama pada awal setiap baris. */
function dedent(lines) {
  const berisi = lines.filter((line) => line.trim() !== '');
  if (berisi.length === 0) return lines.map(() => '');
  const minimum = Math.min(...berisi.map((line) => (line.match(/^ */) || [''])[0].length));
  return lines.map((line) => line.slice(minimum));
}

function splitCode(code) {
  return dedent(
    code
      .replace(/\r\n/g, '\n')
      .replace(/^\n+|\n+$/g, '')
      .split('\n')
  );
}

/** Apakah snippet muncul utuh dan berurutan di file asal? */
function adaDiFile(code, namaFile) {
  const snippet = splitCode(code);
  const isiFile = sources[namaFile];
  for (let mulai = 0; mulai + snippet.length <= isiFile.length; mulai++) {
    const jendela = dedent(isiFile.slice(mulai, mulai + snippet.length));
    if (jendela.every((baris, i) => baris === snippet[i])) return true;
  }
  return false;
}

test('semua potongan kode proyek sama dengan file asli', () => {
  const masalah = [];

  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      const sambungan = section.projectConnection;
      if (sambungan?.code) {
        if (!sources[sambungan.file]) {
          masalah.push(`${chapter.id}/${section.id}: file "${sambungan.file}" tidak dikenal`);
        } else if (!adaDiFile(sambungan.code, sambungan.file)) {
          masalah.push(
            `${chapter.id}/${section.id} (projectConnection → ${sambungan.file}):\n${sambungan.code}`
          );
        }
      }

      for (const snippet of section.codeSnippets ?? []) {
        if (!snippet.filename) continue;
        if (!sources[snippet.filename]) {
          masalah.push(`${chapter.id}/${section.id}/${snippet.id}: file "${snippet.filename}" tidak dikenal`);
        } else if (!adaDiFile(snippet.code, snippet.filename)) {
          masalah.push(
            `${chapter.id}/${section.id}/${snippet.id} (codeSnippet → ${snippet.filename}):\n${snippet.code}`
          );
        }
      }
    }
  }

  assert.deepEqual(masalah, [], `Kode materi berbeda dari file asli:\n\n${masalah.join('\n\n')}`);
});

test('source code utama ditampilkan lengkap, bukan terpotong', () => {
  const bab3 = chapters.find((chapter) => chapter.id === 'bab-3');
  const langkah9 = bab3.sections.find((section) => section.id === 'langkah-9-import');
  const pencatat = langkah9.codeSnippets.find((snippet) => snippet.id === 'contoh-modul-pencatat');
  assert.equal(
    pencatat.code.trim(),
    readFileSync(path.join(root, 'src/data/project/pencatat.py'), 'utf8').trim(),
    'Kode pencatat.py di Bab 3 harus sama dengan isi file aslinya'
  );

  const bab6 = chapters.find((chapter) => chapter.id === 'bab-6');
  const menu = bab6.sections.find((section) => section.id === 'menu-utama');
  const snippetMenu = menu.codeSnippets.find((snippet) => snippet.id === 'kode-tampil-menu');
  assert.match(snippetMenu.code, /def tampil_menu\(\):/);
  assert.match(snippetMenu.code, /kotak\("MENU", baris\)/);
});
