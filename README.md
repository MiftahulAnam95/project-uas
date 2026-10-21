# Tugas Project UAS 🐍
> **"Belajar coding pelan-pelan, sampai benar-benar paham."**

Website pembelajaran interaktif berbahasa Indonesia yang disiapkan sebagai **Tugas Project UAS**, berdasarkan modul:
**"Panduan Belajar Python dari Nol — Membuat Program Pencatat Keuangan Mahasiswa, Langkah demi Langkah."**

Website ini dirancang khusus untuk mahasiswa semester awal dan pemula yang baru pertama kali belajar pemrograman komputer. Tanpa menggunakan backend khusus, seluruh aplikasi berjalan 100% di peramban (client-side) dan dapat dipublikasikan ke **GitHub Pages** maupun **Vercel**.

### 🔗 Demo Online

| Platform | URL |
| --- | --- |
| **GitHub Pages** | https://miftahulanam95.github.io/project-uas/ |
| **Vercel** | Import repo ini di [vercel.com/new](https://vercel.com/new) — konfigurasi sudah otomatis (lihat panduan di bawah) |

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MiftahulAnam95/project-uas)

---

## 🌟 Fitur Utama Platform

1. **Kurikulum Lengkap 11 Bab Sesuai Modul**:
   - **Bab 1 — Kenalan Dulu**: Memahami masalah keuangan mahasiswa dan alasan modularitas 3 file (`pencatat.py`, `laporan.py`, `main.py`).
   - **Bab 2 — Persiapan**: Memasang Python 3, teks editor (VS Code), dan menjalankan file lewat terminal.
   - **Bab 3 — Sembilan Langkah Dasar**: 9 pondasi koding (`print`, variabel, `input`, operator, `if/else`, `list`, `dict`, perulangan `for/while`, fungsi `def`, dan `import`). Setiap langkah dilengkapi penjelasan ulang untuk pemula, contoh kode, kesalahan umum, dan **3 soal uji pemahaman** yang harus benar semua sebelum langkah dianggap dikuasai.
   - **Bab 4 — Bedah pencatat.py**: Logika penyimpanan data keuangan dan perhitungan matematika.
   - **Bab 5 — Bedah laporan.py**: Format Rupiah rapi, status peringatan (Aman/Waspada/Boros), dan validasi input.
   - **Bab 6 — Bedah main.py**: Menu interaktif terminal (CLI) dan penghubung antar-file.
   - **Bab 7 — Mengikuti Jalannya Program**: Visualisasi alur program dan pelacakan isi memori sebelum vs sesudah aksi.
   - **Bab 8 — Error yang Sering Muncul**: Panduan debugging 6 error umum (*IndentationError*, *SyntaxError*, *NameError*, *TypeError*, *IndexError*, *ModuleNotFoundError*).
   - **Bab 9 — Latihan Mandiri**: 3 tantangan modifikasi kode mandiri disertai petunjuk bertahap.
   - **Bab 10 — Kamus Istilah**: Pencarian istilah pemrograman dalam bahasa sehari-hari dengan perumpamaan nyata.
   - **Bab 11 — Tips Presentasi**: Strategi live demo di hadapan dosen penguji dan bocoran jawaban pertanyaan ujian.

2. **Sistem Penjelasan Kode 3 Bagian**:
   - Kode Python dengan *syntax highlighting*.
   - Penjelasan baris demi baris interaktif.
   - Pratinjau hasil eksekusi terminal.
   - Tombol salin kode cepat.

3. **Latihan Interaktif Beragam**:
   - **Uji Pemahaman per Langkah (Bab 3)**: peta 9 langkah dengan status penguasaan, lalu 3 soal per langkah (konsep, membaca kode, dan isian singkat) beserta petunjuk dan pembahasan.
   - Prediksi hasil kode (*Predict Output*).
   - Lengkapi kode (*Fill in the Blank*) dengan sistem petunjuk bertahap (Petunjuk 1 & Petunjuk 2).
   - Susun urutan langkah program (*Code Sequence Ordering*).
   - Kuis evaluasi bab berpenilaian langsung dengan efek perayaan *confetti*.

4. **Simulasi Terminal Interaktif (Interactive CLI Simulator)**:
   - Mahasiswa dapat mencoba program pencatat keuangan secara langsung di browser tanpa perlu menginstal apapun.
   - Mendukung Menu [1] Atur Anggaran, [2] Catat Pengeluaran, [3] Ringkasan & Status, [4] Laporan Kategori, [5] Ganti Hari, dan [0] Keluar.

5. **Visualisasi Alur & Pelacak Data (State Inspector)**:
   - Skenario realistis anggaran Rp3.000.000 selama 30 hari.
   - Perubahan status dari Aman -> Waspada -> Boros saat pengeluaran melebihi jatah harian.
   - Menampilkan isi memori sebelum dan sesudah aksi.

6. **Penyimpanan Progres Lokal (LocalStorage)**:
   - Progres bab, skor kuis, latihan, dan checklist tersimpan otomatis di perangkat pengguna.
   - Dilengkapi dialog konfirmasi untuk mengatur ulang progres.

7. **Tampilan yang Hidup namun Tetap Profesional**:
   - Sistem desain terpusat (token warna `brand`/`grape`/`aqua`, bayangan lembut, radius besar) di `src/index.css`.
   - Latar "aurora" bergradasi + grid halus, kartu kaca (*glassmorphism*), dan aksen warna unik untuk tiap bab.
   - Animasi muncul saat digulir (*scroll reveal*), terminal yang mengetik sendiri di beranda, cincin progres SVG, serta tombol "kembali ke atas".
   - Menghormati `prefers-reduced-motion` sehingga seluruh animasi otomatis dinonaktifkan bagi pengguna yang sensitif gerakan.

---

## 🎨 Sistem Desain

| Bagian | Penjelasan |
| --- | --- |
| `src/index.css` | Token tema Tailwind v4 (`@theme`), keyframes, kelas komponen (`.aurora`, `.surface`, `.btn`, `.reveal`, `.shine`) |
| `src/theme/accents.ts` | Palet aksen per bab (9 warna berputar) agar kurikulum terasa berwarna tapi konsisten |
| `src/components/common/` | `Button`, `Card`, `PageHeader`, `SectionHeading`, `ProgressRing`, `Reveal`, `BackToTop`, `Callout`, `Badge`, `Modal`, `HeroTerminal` |
| `src/components/code-block/` | `CodeBlock` (editor penuh: jalankan, salin, bedah per baris) dan `MiniCode` (potongan kode ringkas) |
| `src/utils/highlightSyntax.tsx` | Pewarna sintaks Python ringan tanpa dependensi tambahan |

Tipografi memakai **Plus Jakarta Sans** (teks) dan **JetBrains Mono** (kode).

---

## 🛠️ Teknologi yang Digunakan

- **React 19**
- **Vite 7**
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (Koleksi ikon UI modern)
- **Canvas Confetti** (Animasi selebrasi capaian kuis & proyek)
- **LocalStorage API** (Penyimpanan progres tanpa server)

---

## 💻 Cara Instalasi & Menjalankan di Komputer Lokal

### Prasyarat
- Pastikan [Node.js](https://nodejs.org/) (versi 20 ke atas) telah terpasang di komputermu.

### Langkah-langkah:
1. Unduh atau clone repository ini:

   ```bash
   git clone https://github.com/MiftahulAnam95/project-uas.git
   cd project-uas
   ```

2. Pasang semua dependensi proyek:

   ```bash
   npm install
   ```

3. Jalankan server pengembangan lokal:

   ```bash
   npm run dev
   ```

4. Buka tautan lokal yang ditampilkan di terminal (biasanya `http://localhost:5173`). Alamat `/` otomatis diarahkan ke `dev.html`, yaitu template sumber aplikasi.

> [!NOTE]
> `dev.html` adalah **template sumber** yang dipakai Vite saat pengembangan. `index.html` di root repositori adalah **hasil build** yang disajikan GitHub Pages — jangan mengeditnya secara manual, karena akan ditimpa otomatis oleh workflow.

---

## 📦 Perintah Build Produksi

Untuk menghasilkan file statis siap rilis:

```bash
npm run build
```

Hasil build akan otomatis berada di folder `dist/` dalam bentuk file statis yang siap di-deploy ke server statis mana pun. Berkat `vite-plugin-singlefile`, seluruh JavaScript dan CSS sudah **digabung menjadi satu file `index.html`** (tanpa folder `assets/`), sehingga tidak ada masalah path saat di-hosting di sub-folder GitHub Pages.

Untuk menyegarkan `index.html` di root repositori secara manual (misalnya sebelum commit tanpa lewat GitHub Actions):

```bash
npm run build
cp dist/index.html index.html
```

Untuk menguji hasil build secara lokal:

```bash
npm run preview
```

---

## 🚀 Panduan Deployment

### 1. Deployment ke Vercel (Otomatis)

Konfigurasi Vercel sudah disiapkan di file [`vercel.json`](./vercel.json), jadi tidak perlu mengatur apa pun secara manual.

1. Buka [vercel.com/new](https://vercel.com/new) lalu login (bisa pakai akun GitHub).
2. Pilih **Import Git Repository** &rarr; `MiftahulAnam95/project-uas`.
3. Vercel otomatis mendeteksi **Framework Preset: Vite**, **Build Command: `npm run build`**, dan **Output Directory: `dist`**. Langsung klik **Deploy**.
4. Situs aktif di domain `*.vercel.app` yang diberikan Vercel (setiap `git push` ke branch `main` akan otomatis di-deploy ulang).

Alternatif lewat CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

### 2. Deployment ke GitHub Pages (Otomatis)

Workflow [`deploy-pages.yml`](./.github/workflows/deploy-pages.yml) sudah disiapkan: setiap push ke branch `main`, GitHub Actions akan menjalankan `npm ci` dan `npm run build`, lalu menangani publikasi sesuai **mode** yang sedang aktif di repository.

Workflow ini mendukung **dua mode** sekaligus, jadi situs tetap tampil apa pun pengaturan Pages-nya:

| Mode di Settings &rarr; Pages | Cara kerja workflow |
| --- | --- |
| **Deploy from a branch** (`main` / root) — mode bawaan | Hasil build disalin otomatis ke `index.html` di root, lalu GitHub Pages menyajikannya. |
| **GitHub Actions** | Folder `dist/` diunggah dan dipublikasikan lewat `actions/deploy-pages`. |

> [!NOTE]
> Sebelumnya halaman tampil **kosong/putih** karena Pages memakai mode "Deploy from a branch" sementara `index.html` di root masih berupa template sumber yang memanggil `/src/main.tsx`. Sekarang `index.html` di root selalu berisi hasil build, sehingga mode apa pun aman.

Disarankan (opsional) untuk berpindah ke mode **GitHub Actions** agar lebih rapi:

1. Buka **Settings** &rarr; **Pages**: https://github.com/MiftahulAnam95/project-uas/settings/pages
2. Pada **Build and deployment** &rarr; **Source**, pilih **GitHub Actions**.
3. Buka tab **Actions** &rarr; workflow **Deploy ke GitHub Pages** &rarr; **Run workflow** (atau cukup push ke `main`).

Situs aktif di `https://miftahulanam95.github.io/project-uas/`.

> Untuk mengganti nama repository, tidak perlu mengubah konfigurasi apa pun. `base: "./"` di `vite.config.ts` membuat path aset tetap relatif, sehingga situs tetap jalan di `username.github.io/nama-repo-apa-saja/`.

### 3. Deployment Manual (Opsional)

Kalau ingin meng-upload hasil build ke hosting statis lain (Netlify, cPanel, dsb.):

```bash
npm run build
# upload seluruh isi folder dist/ (index.html + .nojekyll)
```

---

## 🩺 Troubleshooting

| Gejala | Penyebab & Solusi |
| --- | --- |
| Halaman GitHub Pages tampil **kosong/putih** | Dulu terjadi karena Pages menyajikan `index.html` versi *source* (memanggil `/src/main.tsx`). Sekarang workflow menyalin hasil build ke `index.html` di root. Jika masih kosong: buka tab **Actions**, jalankan ulang **Deploy ke GitHub Pages**, lalu pastikan commit terakhir mengubah `index.html` di root. Selalu terbuka di jendela **incognito**/hard refresh (`Ctrl` + `F5`) agar tidak memakai cache lama. |
| Halaman GitHub Pages tampil daftar file / kode README, bukan aplikasi | Berarti `index.html` di root bukan hasil build. Jalankan workflow **Deploy ke GitHub Pages** (atau `npm run build && cp dist/index.html index.html` lalu push). |
| Halaman putih padahal build hijau ✅ | Buka DevTools &rarr; Console. Jika ada pesan `Failed to load module script`, berarti yang tersaji masih file sumber; tunggu workflow sinkronisasi selesai (± 1 menit) lalu muat ulang. |
| Halaman putih kosong juga di Vercel | Biasanya aset gagal dimuat karena `base` salah. Pastikan `base: "./"` di `vite.config.ts` dan build ulang. |
| Error 404 saat refresh halaman | Aplikasi memakai *hash routing* (`#bab-1`, `#flow`), jadi URL yang benar selalu menyertakan `#`. Untuk Vercel, `vercel.json` sudah menangani fallback ke `index.html`. |
| Link ke bab tertentu tidak bisa dibagikan | Gunakan format `https://miftahulanam95.github.io/project-uas/#bab-3`. |

---

## 🔒 Privasi & Penyimpanan Data

- Seluruh progres belajar, status bab yang selesai, skor kuis, dan checklist proyek akhir disimpan di **LocalStorage** browser masing-masing pengguna.
- Aplikasi ini **tidak membutuhkan akun pengguna**, tidak membutuhkan database eksternal, dan tidak melacak data pribadi mahasiswa.

---

## 📚 Hak Cipta & Sumber Materi

Materi pembelajaran dalam platform ini disusun berdasarkan naskah modul:
*"Panduan Belajar Python dari Nol — Membuat Program Pencatat Keuangan Mahasiswa, Langkah demi Langkah."*
