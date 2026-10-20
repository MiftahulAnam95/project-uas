import { copyFileSync, existsSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Vite membangun entry `dev.html`, sehingga hasilnya `dist/dev.html`.
 * GitHub Pages (dan Vercel) membutuhkan `dist/index.html`, jadi berkas itu
 * diganti namanya di sini.
 */
const dist = path.resolve("dist");
const source = path.join(dist, "dev.html");
const target = path.join(dist, "index.html");

if (!existsSync(source)) {
  console.error(
    "[finalize-build] dist/dev.html tidak ditemukan. Pastikan `vite build` berhasil."
  );
  process.exit(1);
}

renameSync(source, target);

// Jaring pengaman untuk URL tanpa "#": aplikasi memakai hash routing,
// jadi halaman 404 cukup menampilkan aplikasi yang sama.
copyFileSync(target, path.join(dist, "404.html"));

// Mencegah GitHub Pages memproses hasil build dengan Jekyll.
writeFileSync(path.join(dist, ".nojekyll"), "");

console.log("[finalize-build] dist/index.html siap dipublikasikan.");
