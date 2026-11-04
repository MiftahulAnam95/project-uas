export interface SimulationStep {
  stepNumber: number;
  title: string;
  actionDescription: string;
  activeFile: 'main.py' | 'pencatat.py' | 'laporan.py';
  fileRoleInStep: string;
  userInput?: string;
  calledFunctions: string[];
  stateBefore: {
    anggaran: number;
    jumlahHari: number;
    jatahHarian: number;
    hariAktif: number;
    totalKeluar: number;
    sisaSaldo: number;
    pengeluaranHariIni: number;
    status: string;
    transaksiCount: number;
  };
  stateAfter: {
    anggaran: number;
    jumlahHari: number;
    jatahHarian: number;
    hariAktif: number;
    totalKeluar: number;
    sisaSaldo: number;
    pengeluaranHariIni: number;
    status: string;
    transaksiCount: number;
  };
  whatHappened: string;
  terminalOutput: string;
}

const EMPTY = {
  anggaran: 0,
  jumlahHari: 30,
  jatahHarian: 0,
  hariAktif: 1,
  totalKeluar: 0,
  sisaSaldo: 0,
  pengeluaranHariIni: 0,
  status: 'BELUM DIATUR',
  transaksiCount: 0,
};

const SETUP = {
  anggaran: 3000000,
  jumlahHari: 30,
  jatahHarian: 100000,
  hariAktif: 1,
  totalKeluar: 0,
  sisaSaldo: 3000000,
  pengeluaranHariIni: 0,
  status: 'AMAN',
  transaksiCount: 1,
};

const MAKAN = {
  anggaran: 3000000,
  jumlahHari: 30,
  jatahHarian: 100000,
  hariAktif: 1,
  totalKeluar: 85000,
  sisaSaldo: 2915000,
  pengeluaranHariIni: 85000,
  status: 'HATI-HATI',
  transaksiCount: 2,
};

const TRANSPORT = {
  anggaran: 3000000,
  jumlahHari: 30,
  jatahHarian: 100000,
  hariAktif: 1,
  totalKeluar: 125000,
  sisaSaldo: 2875000,
  pengeluaranHariIni: 125000,
  status: 'BOROS!',
  transaksiCount: 3,
};

const HARI_2 = {
  anggaran: 3000000,
  jumlahHari: 30,
  jatahHarian: 100000,
  hariAktif: 2,
  totalKeluar: 125000,
  sisaSaldo: 2875000,
  pengeluaranHariIni: 0,
  status: 'AMAN',
  transaksiCount: 3,
};

export const SIMULATION_STEPS: SimulationStep[] = [
  {
    stepNumber: 1,
    title: 'Langkah 1: Menjalankan Program & Setup Awal',
    actionDescription:
      'Mahasiswa mengetik "python main.py", lalu setup_awal() meminta anggaran Rp3.000.000 dan 30 hari.',
    activeFile: 'main.py',
    fileRoleInStep:
      'main.py memanggil setup_awal(), lalu setup_awal() memanggil atur_uang_saku() dari pencatat.py. tampilan.py menggambar judul dan kotak.',
    userInput: 'python main.py -> 3000000 -> 30',
    calledFunctions: [
      'main.py -> main()',
      'main.py -> setup_awal()',
      'laporan.baca_angka(...)',
      'pencatat.atur_uang_saku(3000000, 30)',
      'tampilan.judul_besar(...)',
    ],
    stateBefore: { ...EMPTY },
    stateAfter: { ...SETUP },
    whatHappened:
      'Program mencatat pemasukan awal "Anggaran" Rp3.000.000. Jatah harian dihitung 3.000.000 / 30 = 100.000. Saldo awal 3.000.000. Menu 1-7 dan 0 ditampilkan.',
    terminalOutput: `╔══════════════════════════════════════════════════════════════╗
║                 PENCATAT KEUANGAN MAHASISWA                  ║
║                       Selamat datang!                        ║
╚══════════════════════════════════════════════════════════════╝

┌─ ATUR ANGGARAN ──────────────────────────────────────────────┐
│ Isi anggaran satu bulan (gaji, honor, atau kiriman).         │
│ Jatah harian akan dihitung otomatis.                         │
└──────────────────────────────────────────────────────────────┘

  ► Anggaran sebulan (Rp)  : 3000000
  ► Jumlah hari sebulan    : 30
  [OK] Anggaran tersimpan.
  [i] Jatah harian kamu: Rp100.000`,
  },
  {
    stepNumber: 2,
    title: 'Langkah 2: Menu 1 — Catat Makan Rp85.000',
    actionDescription:
      'Pengguna memilih menu 1, memilih kategori Makan, lalu memasukkan Rp85.000.',
    activeFile: 'pencatat.py',
    fileRoleInStep:
      'main.py memanggil menu_pengeluaran(), lalu pencatat.tambah_pengeluaran(85000, "Makan") menambah tuple ke list transaksi.',
    userInput: '1 -> 1 (Makan) -> 85000',
    calledFunctions: [
      'main.py -> menu_pengeluaran()',
      'laporan.baca_pilihan(...)',
      'laporan.baca_angka(...)',
      'pencatat.tambah_pengeluaran(85000, "Makan")',
    ],
    stateBefore: { ...SETUP },
    stateAfter: { ...MAKAN },
    whatHappened:
      'Satu tuple (1, "keluar", "Makan", 85000) ditambahkan. Total pengeluaran hari ini 85.000. Status menjadi HATI-HATI karena >= 80% jatah.',
    terminalOutput: `── CATAT PENGELUARAN ───────────────────────────────────────────
┌─ PILIH KATEGORI ─────────────────────────────────────────────┐
│ [1]  Makan                                                   │
│ [2]  Transport                                               │
│ [3]  Kuota                                                   │
│ [4]  Kuliah/Tugas                                            │
│ [5]  Hiburan                                                 │
│ [6]  Lainnya                                                 │
└──────────────────────────────────────────────────────────────┘

  ► Nomor kategori          : 1
  ► Jumlah pengeluaran (Rp) : 85000
  [OK] Tercatat: Makan Rp85.000

┌─ HATI-HATI ──────────────────────────────────────────────────┐
│ Pengeluaran hari ini hampir habis jatah.                     │
└──────────────────────────────────────────────────────────────┘`,
  },
  {
    stepNumber: 3,
    title: 'Langkah 3: Menu 3 — Cek Saldo dan Peringatan',
    actionDescription:
      'Pengguna memilih menu 3 untuk melihat ringkasan saldo, jatah, dan status hari ini.',
    activeFile: 'laporan.py',
    fileRoleInStep:
      'main.py memanggil laporan.cek_peringatan(). laporan.py membaca hitung_saldo() dan pengeluaran_hari() dari pencatat.py, lalu menampilkan kotak dari tampilan.py.',
    userInput: '3',
    calledFunctions: [
      'main.py -> cek_peringatan()',
      'pencatat.hitung_saldo()',
      'pencatat.pengeluaran_hari(1)',
      'tampilan.kotak(...)',
      'tampilan.bar(...)',
    ],
    stateBefore: { ...MAKAN },
    stateAfter: { ...MAKAN },
    whatHappened:
      'Saldo 2.915.000. Pengeluaran hari ini 85.000. Status HATI-HATI. Batang kemajuan menunjukkan 85% dari jatah.',
    terminalOutput: `── STATUS HARI KE-1 DARI 30 ────────────────────────────────────
┌─ RINGKASAN ──────────────────────────────────────────────────┐
│ Saldo sekarang        Rp2.915.000                            │
│   ██████████████████████████████████ 97% dari anggaran         │
│                                                              │
│ Jatah harian          Rp100.000                              │
│ Pengeluaran hari ini  Rp85.000                               │
│   ███████████████████████████░░░ 85% dari jatah               │
└──────────────────────────────────────────────────────────────┘
┌─ HATI-HATI ──────────────────────────────────────────────────┐
│ Pengeluaran hari ini hampir habis jatah.                     │
└──────────────────────────────────────────────────────────────┘`,
  },
  {
    stepNumber: 4,
    title: 'Langkah 4: Menu 1 — Catat Transport Rp40.000',
    actionDescription:
      'Pengguna memilih menu 1 lagi, memilih Transport, lalu memasukkan Rp40.000.',
    activeFile: 'pencatat.py',
    fileRoleInStep:
      'main.py memanggil menu_pengeluaran(), lalu pencatat.tambah_pengeluaran(40000, "Transport") menambah tuple kedua.',
    userInput: '1 -> 2 (Transport) -> 40000',
    calledFunctions: [
      'main.py -> menu_pengeluaran()',
      'laporan.baca_pilihan(...)',
      'laporan.baca_angka(...)',
      'pencatat.tambah_pengeluaran(40000, "Transport")',
    ],
    stateBefore: { ...MAKAN },
    stateAfter: { ...TRANSPORT },
    whatHappened:
      'Total pengeluaran hari ini menjadi 125.000, melebihi jatah 100.000. Status berubah menjadi BOROS! Saldo menjadi 2.875.000.',
    terminalOutput: `── CATAT PENGELUARAN ───────────────────────────────────────────
  ► Nomor kategori          : 2
  ► Jumlah pengeluaran (Rp) : 40000
  [OK] Tercatat: Transport Rp40.000

┌─ BOROS! ─────────────────────────────────────────────────────┐
│ Kamu sudah lebih Rp25.000 dari jatah hari ini.               │
└──────────────────────────────────────────────────────────────┘`,
  },
  {
    stepNumber: 5,
    title: 'Langkah 5: Menu 3 — Status Berubah Menjadi BOROS!',
    actionDescription:
      'Pengguna memilih menu 3 lagi. Status hari ini sekarang BOROS karena total 125.000 > jatah 100.000.',
    activeFile: 'laporan.py',
    fileRoleInStep:
      'laporan.cek_peringatan() menghitung ulang pengeluaran_hari(1) dan memilih cabang if pertama: keluar_hari_ini > jatah.',
    userInput: '3',
    calledFunctions: [
      'main.py -> cek_peringatan()',
      'pencatat.pengeluaran_hari(1)',
      'tampilan.kotak(...)',
      'tampilan.bar(...)',
    ],
    stateBefore: { ...TRANSPORT },
    stateAfter: { ...TRANSPORT },
    whatHappened:
      'Status BOROS! ditampilkan dengan warna merah. Batang pengeluaran penuh. Ini momen utama saat demo ke dosen.',
    terminalOutput: `── STATUS HARI KE-1 DARI 30 ────────────────────────────────────
┌─ RINGKASAN ──────────────────────────────────────────────────┐
│ Saldo sekarang        Rp2.875.000                            │
│   ██████████████████████████████████ 96% dari anggaran         │
│                                                              │
│ Jatah harian          Rp100.000                              │
│ Pengeluaran hari ini  Rp125.000                              │
│   ██████████████████████████████████ 125% dari jatah          │
└──────────────────────────────────────────────────────────────┘
┌─ BOROS! ─────────────────────────────────────────────────────┐
│ Kamu sudah lebih Rp25.000 dari jatah hari ini.               │
└──────────────────────────────────────────────────────────────┘`,
  },
  {
    stepNumber: 6,
    title: 'Langkah 6: Menu 4 — Melihat Riwayat Transaksi',
    actionDescription:
      'Pengguna memilih menu 4. laporan.tampil_riwayat() menampilkan semua transaksi dalam tabel.',
    activeFile: 'laporan.py',
    fileRoleInStep:
      'laporan.py memakai garis_tabel() dan baris_tabel() dari tampilan.py. Setiap transaksi adalah tuple (hari, jenis, kategori, jumlah).',
    userInput: '4',
    calledFunctions: [
      'main.py -> tampil_riwayat()',
      'tampilan.garis_tabel(...)',
      'tampilan.baris_tabel(...)',
      'tampilan.panjang_tampil(...)',
    ],
    stateBefore: { ...TRANSPORT },
    stateAfter: { ...TRANSPORT },
    whatHappened:
      'Tabel menampilkan 3 transaksi: pemasukan Anggaran, pengeluaran Makan, dan pengeluaran Transport. Total pemasukan dan pengeluaran dihitung.',
    terminalOutput: `── RIWAYAT TRANSAKSI ───────────────────────────────────────────
┌─────┬──────┬─────────────────┬───────────────┬───────────────┐
│  No │ Hari │ Keterangan      │         Masuk │        Keluar │
├─────┼──────┼─────────────────┼───────────────┼───────────────┤
│   1 │    1 │ Anggaran        │   Rp3.000.000 │             - │
│   2 │    1 │ Makan           │             - │      Rp85.000 │
│   3 │    1 │ Transport       │             - │      Rp40.000 │
├─────┼──────┼─────────────────┼───────────────┼───────────────┤
│     │      │ TOTAL           │   Rp3.000.000 │     Rp125.000 │
└─────┴──────┴─────────────────┴───────────────┴───────────────┘`,
  },
  {
    stepNumber: 7,
    title: 'Langkah 7: Menu 5 — Laporan per Kategori',
    actionDescription:
      'Pengguna memilih menu 5. laporan.laporan_kategori() mengelompokkan pengeluaran per kategori dan mengurutkan dari terbesar.',
    activeFile: 'laporan.py',
    fileRoleInStep:
      'laporan.py membuat dictionary total per kategori, menghitung sum(total.values()), lalu menampilkan bar() untuk setiap kategori.',
    userInput: '5',
    calledFunctions: [
      'main.py -> laporan_kategori()',
      'tampilan.bar(...)',
      'tampilan.persen(...)',
      'tampilan.kotak(...)',
    ],
    stateBefore: { ...TRANSPORT },
    stateAfter: { ...TRANSPORT },
    whatHappened:
      'Kategori Transport (40.000) lebih besar dari Makan (85.000)? Tidak: Makan 85.000 lebih besar. Laporan menampilkan Makan sebagai yang paling boros.',
    terminalOutput: `── LAPORAN PENGELUARAN PER KATEGORI ─────────────────────────
┌─ PER KATEGORI ───────────────────────────────────────────────┐
│ Makan        ███████████████████ 68,0%        Rp85.000       │
│ Transport    ████████ 32,0%                   Rp40.000       │
└──────────────────────────────────────────────────────────────┘

  Total pengeluaran Rp125.000
  Kategori paling boros Makan`,
  },
  {
    stepNumber: 8,
    title: 'Langkah 8: Menu 6 — Pindah ke Hari ke-2',
    actionDescription:
      'Pengguna memilih menu 6. hari_berikutnya() menaikkan akun["hari"] menjadi 2. Pengeluaran harian reset, tetapi riwayat tetap tersimpan.',
    activeFile: 'pencatat.py',
    fileRoleInStep:
      'main.py memanggil hari_berikutnya(), lalu pencatat.hari_berikutnya() menaikkan akun["hari"]. List transaksi tidak diubah.',
    userInput: '6',
    calledFunctions: [
      'main.py -> hari_berikutnya()',
      'pencatat.hari_berikutnya()',
      'tampilan.pesan_ok(...)',
    ],
    stateBefore: { ...TRANSPORT },
    stateAfter: { ...HARI_2 },
    whatHappened:
      'Hari aktif menjadi 2. Pengeluaran hari ini 0. Status kembali AMAN. Saldo tetap 2.875.000 dan 3 transaksi lama tetap tersimpan.',
    terminalOutput: `  [OK] Masuk ke hari ke-2.
  [i] Jatah hari ini: Rp100.000

  Tekan Enter untuk kembali ke menu...`,
  },
];
