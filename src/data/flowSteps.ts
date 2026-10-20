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

export const SIMULATION_STEPS: SimulationStep[] = [
  {
    stepNumber: 1,
    title: 'Langkah 1: Menjalankan Program & Buka Menu',
    actionDescription: 'Mahasiswa mengetik "python main.py" di terminal untuk memulai aplikasi.',
    activeFile: 'main.py',
    fileRoleInStep: 'main.py memuat fungsi tampilkan_menu() dan menunggu input pengguna.',
    userInput: 'python main.py',
    calledFunctions: ['main.py -> main()', 'main.py -> tampilkan_menu()'],
    stateBefore: {
      anggaran: 0,
      jumlahHari: 30,
      jatahHarian: 0,
      hariAktif: 1,
      totalKeluar: 0,
      sisaSaldo: 0,
      pengeluaranHariIni: 0,
      status: 'BELUM DIATUR',
      transaksiCount: 0,
    },
    stateAfter: {
      anggaran: 0,
      jumlahHari: 30,
      jatahHarian: 0,
      hariAktif: 1,
      totalKeluar: 0,
      sisaSaldo: 0,
      pengeluaranHariIni: 0,
      status: 'BELUM DIATUR',
      transaksiCount: 0,
    },
    whatHappened:
      'Program Python mulai membaca file main.py. Import modul pencatat dan laporan berhasil. Menu pilihan 0-5 dicetak ke layar konsol.',
    terminalOutput: `Selamat datang di Program Pencatat Keuangan Mahasiswa!
========================================
 PENCATAT KEUANGAN MAHASISWA (PYTHON)
========================================
 [1] Atur Anggaran Awal
 [2] Catat Pengeluaran Baru
 [3] Lihat Ringkasan & Status Hari Ini
 [4] Lihat Laporan per Kategori
 [5] Ganti ke Hari Berikutnya
 [0] Keluar dari Program
========================================
Pilih menu (0-5): `,
  },
  {
    stepNumber: 2,
    title: 'Langkah 2: Menetapkan Anggaran Bulanan Rp3.000.000',
    actionDescription: 'Mahasiswa memilih menu [1], lalu memasukkan anggaran Rp3.000.000 untuk jangka waktu 30 hari.',
    activeFile: 'pencatat.py',
    fileRoleInStep: 'main.py menerima input, lalu meneruskan data ke fungsi pencatat.atur_anggaran(3000000, 30).',
    userInput: '1 -> 3000000 -> 30',
    calledFunctions: [
      'laporan.validasi_angka_positif(...)',
      'pencatat.atur_anggaran(3000000, 30)',
      'pencatat.hitung_jatah_harian()',
    ],
    stateBefore: {
      anggaran: 0,
      jumlahHari: 30,
      jatahHarian: 0,
      hariAktif: 1,
      totalKeluar: 0,
      sisaSaldo: 0,
      pengeluaranHariIni: 0,
      status: 'BELUM DIATUR',
      transaksiCount: 0,
    },
    stateAfter: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 0,
      sisaSaldo: 3000000,
      pengeluaranHariIni: 0,
      status: 'AMAN (Pengeluaran terjaga dengan baik)',
      transaksiCount: 0,
    },
    whatHappened:
      'Di dalam pencatat.py, variabel anggaran_bulanan diisi 3000000 dan jatah_harian dihitung menggunakan pembagian bulat: 3000000 // 30 = 100000. Mahasiswa kini punya patokan jatah harian Rp100.000.',
    terminalOutput: `--- Pengaturan Anggaran ---
Masukkan anggaran bulanan (Rp): 3000000
Masukkan jumlah hari (contoh: 30): 30
[OK] Anggaran berhasil diatur! Jatah harian: Rp 100.000`,
  },
  {
    stepNumber: 3,
    title: 'Langkah 3: Catat Pengeluaran Pertama — Makan Rp85.000',
    actionDescription: 'Mahasiswa memilih menu [2] pada Hari ke-1 untuk mencatat makan siang dan makan malam seharga Rp85.000.',
    activeFile: 'pencatat.py',
    fileRoleInStep: 'pencatat.tambah_transaksi("Makan", 85000, "Makan hari 1") membuat dictionary transaksi baru dan menambahkannya ke list.',
    userInput: '2 -> "Makan" -> 85000 -> "Makan siang & malam"',
    calledFunctions: [
      'laporan.validasi_angka_positif("85000")',
      'pencatat.tambah_transaksi("Makan", 85000, "Makan siang & malam")',
    ],
    stateBefore: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 0,
      sisaSaldo: 3000000,
      pengeluaranHariIni: 0,
      status: 'AMAN (Pengeluaran terjaga dengan baik)',
      transaksiCount: 0,
    },
    stateAfter: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 85000,
      sisaSaldo: 2915000,
      pengeluaranHariIni: 85000,
      status: 'WASPADA (Mendekati batas jatah harian!)',
      transaksiCount: 1,
    },
    whatHappened:
      'List daftar_transaksi kini berisi 1 transaksi. Total pengeluaran hari ini menjadi Rp85.000 (85% dari jatah Rp100.000). Status berubah menjadi WASPADA karena sudah berada di kisaran 70%-100% jatah harian.',
    terminalOutput: `--- Catat Pengeluaran (Hari ke-1) ---
Nama kategori pengeluaran: Makan
Jumlah pengeluaran (Rp): 85000
Catatan tambahan (opsional): Makan siang & malam
[OK] Pengeluaran berhasil dicatat!`,
  },
  {
    stepNumber: 4,
    title: 'Langkah 4: Melihat Ringkasan & Cek Status',
    actionDescription: 'Mahasiswa memilih menu [3] untuk memeriksa sisa saldo dompet dan status keuangan hari ini.',
    activeFile: 'laporan.py',
    fileRoleInStep: 'laporan.py mengambil data saldo dan pengeluaran dari pencatat.py, lalu mencetak tabel ringkasan dengan format rupiah rapi.',
    userInput: '3',
    calledFunctions: [
      'pencatat.hitung_total_pengeluaran()',
      'pencatat.hitung_sisa_saldo()',
      'pencatat.hitung_pengeluaran_hari_ini()',
      'laporan.cek_status_harian(85000, 100000)',
      'laporan.tampilkan_ringkasan(...)',
    ],
    stateBefore: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 85000,
      sisaSaldo: 2915000,
      pengeluaranHariIni: 85000,
      status: 'WASPADA (Mendekati batas jatah harian!)',
      transaksiCount: 1,
    },
    stateAfter: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 85000,
      sisaSaldo: 2915000,
      pengeluaranHariIni: 85000,
      status: 'WASPADA (Mendekati batas jatah harian!)',
      transaksiCount: 1,
    },
    whatHappened:
      'Fungsi laporan.py membaca sisa saldo = Rp2.915.000. Pengeluaran hari ke-1 adalah Rp85.000 dari patokan Rp100.000. Layar menampilkan peringatan waspada secara visual.',
    terminalOutput: `=============================================
           RINGKASAN KEUANGAN MAHASISWA
=============================================
 Hari Aktif           : Hari ke-1
 Anggaran Awal        : Rp 3.000.000
 Jatah Harian         : Rp 100.000
---------------------------------------------
 Pengeluaran Hari Ini : Rp 85.000
 Status Hari Ini      : WASPADA (Mendekati batas jatah harian!)
---------------------------------------------
 Total Pengeluaran    : Rp 85.000
 Sisa Saldo           : Rp 2.915.000
=============================================`,
  },
  {
    stepNumber: 5,
    title: 'Langkah 5: Catat Pengeluaran Kedua — Transport Rp40.000',
    actionDescription: 'Masih di Hari ke-1, mahasiswa naik ojek online seharga Rp40.000 dan mencatatnya ke program.',
    activeFile: 'pencatat.py',
    fileRoleInStep: 'pencatat.tambah_transaksi("Transport", 40000) menambahkan elemen kedua ke list transaksi.',
    userInput: '2 -> "Transport" -> 40000 -> "Ojek kampus bolak-balik"',
    calledFunctions: [
      'laporan.validasi_angka_positif("40000")',
      'pencatat.tambah_transaksi("Transport", 40000, "Ojek kampus")',
    ],
    stateBefore: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 85000,
      sisaSaldo: 2915000,
      pengeluaranHariIni: 85000,
      status: 'WASPADA (Mendekati batas jatah harian!)',
      transaksiCount: 1,
    },
    stateAfter: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 125000,
      sisaSaldo: 2875000,
      pengeluaranHariIni: 125000,
      status: 'BOROS! (Melebihi jatah harian hari ini!)',
      transaksiCount: 2,
    },
    whatHappened:
      'Total pengeluaran Hari ke-1 kini menjadi Rp85.000 + Rp40.000 = Rp125.000. Karena Rp125.000 > jatah Rp100.000 (125%), status otomatis berubah menjadi BOROS!',
    terminalOutput: `--- Catat Pengeluaran (Hari ke-1) ---
Nama kategori pengeluaran: Transport
Jumlah pengeluaran (Rp): 40000
Catatan tambahan (opsional): Ojek kampus bolak-balik
[OK] Pengeluaran berhasil dicatat!`,
  },
  {
    stepNumber: 6,
    title: 'Langkah 6: Memeriksa Status yang Berubah Jadi BOROS!',
    actionDescription: 'Mahasiswa kembali membuka menu [3] untuk melihat dampak dari pengeluaran transport tadi.',
    activeFile: 'laporan.py',
    fileRoleInStep: 'laporan.cek_status_harian mendeteksi persentase > 100% dan mengembalikan label peringatan BOROS!.',
    userInput: '3',
    calledFunctions: [
      'pencatat.hitung_pengeluaran_hari_ini()',
      'laporan.cek_status_harian(125000, 100000)',
      'laporan.tampilkan_ringkasan(...)',
    ],
    stateBefore: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 125000,
      sisaSaldo: 2875000,
      pengeluaranHariIni: 125000,
      status: 'BOROS! (Melebihi jatah harian hari ini!)',
      transaksiCount: 2,
    },
    stateAfter: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 125000,
      sisaSaldo: 2875000,
      pengeluaranHariIni: 125000,
      status: 'BOROS! (Melebihi jatah harian hari ini!)',
      transaksiCount: 2,
    },
    whatHappened:
      'Program memperingatkan mahasiswa bahwa ia telah "nombok" atau melebihi jatah harian sebesar Rp25.000. Ini membuktikan logika if/else di laporan.py bekerja akurat.',
    terminalOutput: `=============================================
           RINGKASAN KEUANGAN MAHASISWA
=============================================
 Hari Aktif           : Hari ke-1
 Anggaran Awal        : Rp 3.000.000
 Jatah Harian         : Rp 100.000
---------------------------------------------
 Pengeluaran Hari Ini : Rp 125.000
 Status Hari Ini      : BOROS! (Melebihi jatah harian hari ini!)
---------------------------------------------
 Total Pengeluaran    : Rp 125.000
 Sisa Saldo           : Rp 2.875.000
=============================================`,
  },
  {
    stepNumber: 7,
    title: 'Langkah 7: Ganti ke Hari ke-2',
    actionDescription: 'Hari telah berganti. Mahasiswa memilih menu [5] untuk berganti ke hari berikutnya.',
    activeFile: 'pencatat.py',
    fileRoleInStep: 'pencatat.ganti_hari() menaikkan nilai variabel hari_aktif dari 1 menjadi 2.',
    userInput: '5',
    calledFunctions: ['pencatat.ganti_hari()'],
    stateBefore: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 1,
      totalKeluar: 125000,
      sisaSaldo: 2875000,
      pengeluaranHariIni: 125000,
      status: 'BOROS! (Melebihi jatah harian hari ini!)',
      transaksiCount: 2,
    },
    stateAfter: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 2,
      totalKeluar: 125000,
      sisaSaldo: 2875000,
      pengeluaranHariIni: 0,
      status: 'AMAN (Pengeluaran terjaga dengan baik)',
      transaksiCount: 2,
    },
    whatHappened:
      'Variabel hari_aktif bertambah menjadi 2. Pengeluaran khusus hari ini dihitung ulang berdasarkan transaksi yang memiliki "hari": 2, sehingga nilainya kembali menjadi Rp0. Namun seluruh histori transaksi hari ke-1 tetap tersimpan aman di memori!',
    terminalOutput: `[>>] Berpindah ke Hari ke-2! Semangat berhemat hari ini.`,
  },
  {
    stepNumber: 8,
    title: 'Langkah 8: Cek Laporan per Kategori Keseluruhan',
    actionDescription: 'Mahasiswa memilih menu [4] untuk melihat ringkasan pengelompokan biaya selama kuliah.',
    activeFile: 'laporan.py',
    fileRoleInStep: 'laporan.tampilkan_laporan_kategori(daftar_transaksi) melakukan looping dictionary untuk menjumlahkan per jenis belanja.',
    userInput: '4',
    calledFunctions: ['laporan.tampilkan_laporan_kategori(pencatat.daftar_transaksi)'],
    stateBefore: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 2,
      totalKeluar: 125000,
      sisaSaldo: 2875000,
      pengeluaranHariIni: 0,
      status: 'AMAN (Pengeluaran terjaga dengan baik)',
      transaksiCount: 2,
    },
    stateAfter: {
      anggaran: 3000000,
      jumlahHari: 30,
      jatahHarian: 100000,
      hariAktif: 2,
      totalKeluar: 125000,
      sisaSaldo: 2875000,
      pengeluaranHariIni: 0,
      status: 'AMAN (Pengeluaran terjaga dengan baik)',
      transaksiCount: 2,
    },
    whatHappened:
      'Fungsi mengelompokkan kategori "Makan" (Rp85.000) dan "Transport" (Rp40.000). Total akumulasi pas Rp125.000. Alur lengkap program telah berhasil dijalankan!',
    terminalOutput: `-----------------------------------
 LAPORAN PENGELUARAN PER KATEGORI
-----------------------------------
 - Makan           : Rp 85.000
 - Transport       : Rp 40.000
-----------------------------------`,
  },
];
