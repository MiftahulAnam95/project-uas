# Tugas Project UAS 🐍
> **"Belajar coding pelan-pelan, sampai benar-benar paham."**

Website pembelajaran interaktif berbahasa Indonesia yang disiapkan sebagai **Tugas Project UAS**, berdasarkan modul:
**"Panduan Belajar Python dari Nol — Membuat Program Pencatat Keuangan Mahasiswa, Langkah demi Langkah."**

Website ini dirancang khusus untuk mahasiswa semester awal dan pemula yang baru pertama kali belajar pemrograman komputer. Tanpa menggunakan backend khusus, seluruh aplikasi berjalan 100% di peramban (client-side) dan dapat dipublikasikan ke **GitHub Pages** maupun **Vercel**.

---

## 🌟 Fitur Utama Platform

1. **Kurikulum Lengkap 11 Bab Sesuai Modul**:
   - **Bab 1 — Kenalan Dulu**: Memahami masalah keuangan mahasiswa dan alasan modularitas 3 file (`pencatat.py`, `laporan.py`, `main.py`).
   - **Bab 2 — Persiapan**: Memasang Python 3, teks editor (VS Code), dan menjalankan file lewat terminal.
   - **Bab 3 — Sembilan Langkah Dasar**: 9 pondasi koding (`print`, variabel, `input`, operator, `if/else`, `list`, `dict`, perulangan `for/while`, fungsi `def`, dan `import`).
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
- Pastikan [Node.js](https://nodejs.org/) (versi 18 ke atas) telah terpasang di komputermu.

### Langkah-langkah:
1. Unduh atau clone repository ini:
   \`\`\`bash
   git clone https://github.com/username/tugas-project-uas.git
   cd tugas-project-uas
   \`\`\`

2. Pasang semua dependensi proyek:
   \`\`\`bash
   npm install
   \`\`\`

3. Jalankan server pengembangan lokal:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Buka tautan lokal yang ditampilkan di terminal (biasanya `http://localhost:5173`) di browser pilihanmu.

---

## 📦 Perintah Build Produksi

Untuk menghasilkan file statis siap rilis:

\`\`\`bash
npm run build
\`\`\`

Hasil build akan otomatis berada di folder \`dist/\` dalam bentuk file statis yang siap di-deploy ke server statis mana pun.

Untuk menguji hasil build secara lokal:
\`\`\`bash
npm run preview
\`\`\`

---

## 🚀 Panduan Deployment

### 1. Deployment ke Vercel
1. Masuk ke dashboard [Vercel](https://vercel.com/).
2. Buat proyek baru dan hubungkan ke repository GitHub proyek ini.
3. Konfigurasi build otomatis:
   - **Framework Preset**: Vite
   - **Build Command**: \`npm run build\`
   - **Output Directory**: \`dist\`
4. Klik **Deploy**. Website akan langsung aktif dalam hitungan detik.

### 2. Deployment ke GitHub Pages
1. Pastikan kode sudah di-push ke repository GitHub.
2. Di repository GitHub, buka **Settings** &rarr; **Pages**.
3. Di bagian **Build and deployment**, pilih **GitHub Actions** atau deploy dari branch \`gh-pages\` menggunakan build file dari folder \`dist\`.
4. Navigasi platform menggunakan hash routing (`#bab-1`, `#flow`, dll.) sehingga seluruh tautan dijamin bebas dari error 404 pada GitHub Pages.

---

## 🔒 Privasi & Penyimpanan Data

- Seluruh progres belajar, status bab yang selesai, skor kuis, dan checklist proyek akhir disimpan di **LocalStorage** browser masing-masing pengguna.
- Aplikasi ini **tidak membutuhkan akun pengguna**, tidak membutuhkan database eksternal, dan tidak melacak data pribadi mahasiswa.

---

## 📚 Hak Cipta & Sumber Materi

Materi pembelajaran dalam platform ini disusun berdasarkan naskah modul:
*"Panduan Belajar Python dari Nol — Membuat Program Pencatat Keuangan Mahasiswa, Langkah demi Langkah."*
