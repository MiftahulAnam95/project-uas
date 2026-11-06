import { Chapter, ChapterSection, TraceTableData } from '../../types';
import { CHAPTERS as BASE } from '../lessonsBase';

const baseBab3 = BASE.find((c) => c.id === 'bab-3')!;

const PROJECT_BY_STEP: Record<string, ChapterSection['projectConnection']> = {
  'langkah-1-print': {
    file: 'main.py',
    note: 'print() dipakai di mana-mana: judul menu, saldo, jatah harian, dan pesan [OK]/[X]. Di laporan.py, print() dipakai untuk mencetak tabel dan kotak.',
    code: `print("  Hari ke-" + str(akun["hari"]) + " dari " + str(akun["jumlah_hari"]))`,
  },
  'langkah-2-variabel': {
    file: 'pencatat.py',
    note: 'Data program disimpan dalam dictionary akun dan list transaksi. Dictionary menyimpan label, list menyimpan banyak catatan.',
    code: `akun = {"uang_saku": 0, "jumlah_hari": 30, "jatah_harian": 0.0, "hari": 1}\ntransaksi = []`,
  },
  'langkah-3-input': {
    file: 'laporan.py',
    note: 'input() selalu menghasilkan teks. Fungsi baca_angka() membungkusnya dengan int() dan try/except ValueError agar program tidak crash.',
    code: `teks = input(pesan).replace(".", "").replace(",", "").strip()\nangka = int(teks)`,
  },
  'langkah-4-operator': {
    file: 'pencatat.py',
    note: 'Jatah harian dihitung dengan pembagian biasa, lalu format_rupiah() merapikan angka. Saldo dihitung dengan penjumlahan dan pengurangan.',
    code: `akun["jatah_harian"] = uang_saku / jumlah_hari\nsaldo = 0\nfor hari, jenis, kategori, jumlah in transaksi:\n    if jenis == "masuk":\n        saldo += jumlah\n    else:\n        saldo -= jumlah`,
  },
  'langkah-5-percabangan': {
    file: 'laporan.py',
    note: 'Status harian AMAN / HATI-HATI / BOROS ditentukan oleh if-elif-else di cek_peringatan().',
    code: `if keluar_hari_ini > jatah:\n    judul_status = "BOROS!"\nelif keluar_hari_ini >= 0.8 * jatah:\n    judul_status = "HATI-HATI"\nelse:\n    judul_status = "AMAN"`,
  },
  'langkah-6-wadah-data': {
    file: 'pencatat.py',
    note: 'Satu transaksi disimpan sebagai tuple (hari, jenis, kategori, jumlah). Semua transaksi disimpan dalam list. Di laporan.py, list ini ditampilkan sebagai tabel.',
    code: `transaksi.append((akun["hari"], "keluar", kategori, jumlah))\nfor hari, jenis, kategori, jumlah in transaksi:\n    print(hari, jenis, kategori, jumlah)`,
  },
  'langkah-7-perulangan': {
    file: 'laporan.py',
    note: 'Loop dipakai untuk menjumlahkan transaksi, menampilkan riwayat, dan menghitung total per kategori.',
    code: `for hari, jenis, kategori, jumlah in transaksi:\n    if jenis == "keluar":\n        total[kategori] += jumlah`,
  },
  'langkah-8-fungsi': {
    file: 'pencatat.py',
    note: 'hitung_saldo() dan pengeluaran_hari() adalah fungsi yang mengembalikan angka. Fungsi lain di laporan.py dan main.py memanggilnya.',
    code: `def hitung_saldo():\n    saldo = 0\n    for hari, jenis, kategori, jumlah in transaksi:\n        if jenis == "masuk":\n            saldo += jumlah\n        else:\n            saldo -= jumlah\n    return saldo`,
  },
  'langkah-9-import': {
    file: 'main.py',
    note: 'main.py mengimpor tiga modul: pencatat, laporan, dan tampilan. laporan.py juga mengimpor pencatat dan tampilan.',
    code: `from pencatat import KATEGORI, akun, format_rupiah, atur_uang_saku\nfrom laporan import baca_angka, baca_pilihan, cek_peringatan\nfrom tampilan import warna, bersihkan_layar, judul_besar, kotak, bar`,
  },
};

const TRACE_IF = {
  title: 'Tabel jejak: if / elif / else di cek_peringatan()',
  description:
    'Perhatikan bagaimana variabel keluar_hari_ini dan jatah menentukan jalur yang dijalankan. Hanya satu jalur yang dieksekusi.',
  steps: [
    {
      line: 1,
      code: 'keluar_hari_ini = 15000',
      condition: '15000 > 100000',
      result: 'False',
      variables: { keluar_hari_ini: '15000', jatah: '100000', status: '—' },
      note: 'Belanja kecil. Kondisi pertama salah, lanjut ke elif.',
    },
    {
      line: 2,
      code: 'elif keluar_hari_ini >= 0.8 * jatah',
      condition: '15000 >= 80000',
      result: 'False',
      variables: { keluar_hari_ini: '15000', jatah: '100000', status: '—' },
      note: 'Kondisi kedua juga salah, jalur else yang dijalankan.',
    },
    {
      line: 3,
      code: 'else: judul_status = "AMAN"',
      condition: 'tidak ada kondisi',
      result: 'jalur else',
      variables: { keluar_hari_ini: '15000', jatah: '100000', status: 'AMAN' },
      note: 'Status AMAN. Sisa jatah masih besar.',
    },
    {
      line: 4,
      code: 'keluar_hari_ini = 85000',
      condition: '85000 > 100000',
      result: 'False',
      variables: { keluar_hari_ini: '85000', jatah: '100000', status: 'AMAN' },
      note: 'Data baru. Kondisi pertama masih salah.',
    },
    {
      line: 5,
      code: 'elif keluar_hari_ini >= 0.8 * jatah',
      condition: '85000 >= 80000',
      result: 'True',
      variables: { keluar_hari_ini: '85000', jatah: '100000', status: 'HATI-HATI' },
      note: 'Kondisi kedua benar. Status berubah menjadi HATI-HATI, else dilewati.',
    },
    {
      line: 6,
      code: 'keluar_hari_ini = 125000',
      condition: '125000 > 100000',
      result: 'True',
      variables: { keluar_hari_ini: '125000', jatah: '100000', status: 'BOROS!' },
      note: 'Kondisi pertama benar. Status BOROS, elif dan else dilewati.',
    },
  ],
};

const TRACE_LOOP: TraceTableData = {
  title: 'Tabel jejak: loop menjumlahkan saldo',
  description:
    'Variabel saldo bertambah atau berkurang setiap kali satu transaksi dibaca. Perhatikan nilai saldo di setiap putaran.',
  steps: [
    {
      line: 1,
      code: 'saldo = 0',
      variables: { saldo: '0', transaksi: '3 baris' },
      note: 'Wadah penampung disiapkan sebelum loop.',
    },
    {
      line: 2,
      code: 'for hari, jenis, kategori, jumlah in transaksi:',
      variables: { saldo: '0', hari: '1', jenis: 'masuk', jumlah: '3000000' },
      note: 'Putaran 1: transaksi anggaran masuk.',
    },
    {
      line: 3,
      code: 'saldo += jumlah',
      variables: { saldo: '3000000', hari: '1', jenis: 'masuk', jumlah: '3000000' },
      note: 'Saldo bertambah 3.000.000.',
    },
    {
      line: 4,
      code: 'for ... (putaran 2)',
      variables: { saldo: '3000000', hari: '1', jenis: 'keluar', jumlah: '15000' },
      note: 'Putaran 2: pengeluaran Makan.',
    },
    {
      line: 5,
      code: 'saldo -= jumlah',
      variables: { saldo: '2985000', hari: '1', jenis: 'keluar', jumlah: '15000' },
      note: 'Saldo berkurang 15.000.',
    },
    {
      line: 6,
      code: 'for ... (putaran 3)',
      variables: { saldo: '2985000', hari: '1', jenis: 'keluar', jumlah: '40000' },
      note: 'Putaran 3: pengeluaran Transport.',
    },
    {
      line: 7,
      code: 'saldo -= jumlah',
      variables: { saldo: '2945000', hari: '1', jenis: 'keluar', jumlah: '40000' },
      note: 'Saldo berkurang 40.000. Loop selesai, saldo akhir 2.945.000.',
    },
  ],
};

export const bab3: Partial<Chapter> = {
  openingAnalogy:
    'Bayangkan kamu baru pertama kali masuk dapur kantin. Ada sembilan alat: pengeras suara (print), stoples berlabel (variabel), slip pesanan (input), kalkulator (operator), papan keputusan (if/else), rak map (list & dict), daftar tugas berulang (loop), resep (fungsi), dan colokan listrik (import). Hari ini kita cuma memakai satu alat per langkah, tidak semuanya sekaligus.',
  sections: baseBab3.sections.map((section) => ({
    ...section,
    projectConnection: PROJECT_BY_STEP[section.id],
    ...(section.id === 'langkah-5-percabangan' ? { traceTable: TRACE_IF } : {}),
    ...(section.id === 'langkah-7-perulangan' ? { traceTable: TRACE_LOOP } : {}),
  })),
  cheatSheet: {
    title: 'Cheat Sheet Bab 3 — Sembilan Langkah Dasar',
    items: [
      'print("teks") mencetak; print(angka) mencetak angka; print() mencetak baris kosong.',
      'Variabel: nama = nilai. Nama tanpa spasi, tidak diawali angka, huruf besar/kecil berbeda.',
      'input() selalu menghasilkan str. Bungkus dengan int() atau float() sebelum berhitung.',
      'Tipe data: str (teks), int (bulat), float (desimal), bool (True/False), list [], dict {}.',
      'Operator: + - * / // % **. / hasil float; // membulatkan ke bawah; % sisa bagi.',
      'if / elif / else: wajib titik dua, badan menjorok 4 spasi, hanya satu jalur dijalankan.',
      'list: index mulai 0, append() menambah di akhir, len() menghitung isi.',
      'dict: akses dengan key, contoh transaksi["jumlah"].',
      'for: mengulang isi list/tuple. while: mengulang selama kondisi benar. break: keluar loop.',
      'def: membuat fungsi. return: mengembalikan nilai. Tanpa return, hasilnya None.',
      'import modul: menyambung file. Panggil dengan awalan modul.fungsi().',
    ],
    code: `akun = {"uang_saku": 3000000, "jumlah_hari": 30}\nprint(akun["uang_saku"] / akun["jumlah_hari"])`,
  },
  commonError: {
    name: 'TypeError: can only concatenate str (not "int") to str',
    message: `TypeError: can only concatenate str (not "int") to str`,
    cause:
      'Python tidak bisa menyambung teks dengan angka menggunakan +. Contohnya, umur dari input() sudah diubah menjadi int sebelum disambung ke teks.',
    fix:
      'Ubah angka menjadi teks dengan str() sebelum disambung, atau gunakan f-string.',
    badCode: `umur = int(input("Umur: "))\nprint("Umur: " + umur)`,
    goodCode: `umur = int(input("Umur: "))\nprint("Umur: " + str(umur))`,
  },
  tryItYourself: [
    {
      id: 'bab3-coba-1',
      level: 'Mudah',
      prompt: 'Buat variabel nama, isi dengan namamu, lalu cetak "Halo, [nama]!"',
      starterCode: `nama = "Budi"\n# cetak di bawah ini`,
      answerCode: `nama = "Budi"\nprint(f"Halo, {nama}!")`,
      explanation: 'f-string mengganti {nama} dengan isi variabel. Hasilnya: Halo, Budi!',
    },
    {
      id: 'bab3-coba-2',
      level: 'Sedang',
      prompt:
        'Minta anggaran dan jumlah hari lewat input(), ubah ke int, hitung jatah harian dengan / seperti di proyek, lalu cetak.',
      starterCode: `anggaran = int(input("Anggaran: "))\nhari = int(input("Hari: "))\n# hitung dan cetak`,
      answerCode: `anggaran = int(input("Anggaran: "))\nhari = int(input("Hari: "))\njatah = anggaran / hari\nprint(f"Jatah harian: Rp {jatah}")`,
      explanation:
        'input() dibungkus int() lebih dulu. / menghasilkan float. Contoh: 3000000 / 30 = 100000.0; proyek merapikannya dengan format_rupiah().',
    },
    {
      id: 'bab3-coba-3',
      level: 'Tantangan',
      prompt:
        'Diberi list transaksi [15000, 40000, 25000]. Jumlahkan dengan loop, lalu cetak total dan rata-rata (total // jumlah transaksi).',
      starterCode: `transaksi = [15000, 40000, 25000]\ntotal = 0\n# loop di sini`,
      answerCode: `transaksi = [15000, 40000, 25000]\ntotal = 0\nfor jumlah in transaksi:\n    total += jumlah\nprint(f"Total: Rp {total}")\nprint(f"Rata-rata: Rp {total // len(transaksi)}")`,
      explanation:
        'total disiapkan sebelum loop. Setiap putaran menambah jumlah. Setelah loop, total dibagi banyaknya transaksi dengan //.',
    },
  ],
  fixTheBug: {
    id: 'bab3-fix-1',
    title: 'Perbaiki: input belum diubah ke angka',
    prompt:
      'Program ini error TypeError saat menjumlahkan input dengan 10000. Perbaiki satu baris agar bisa berhitung.',
    buggyCode: `nominal = input("Nominal: ")\ntotal = nominal + 10000\nprint(total)`,
    answerCode: `nominal = int(input("Nominal: "))\ntotal = nominal + 10000\nprint(total)`,
    explanation:
      'input() menghasilkan str. int(input(...)) mengubahnya menjadi bilangan bulat sebelum dijumlahkan.',
  },
  quiz: [
    {
      id: 'q-bab3-1',
      question: 'Apa hasil dari 3000000 // 30?',
      options: ['100000.0', '100000', '90000', 'Error'],
      correctIndex: 1,
      explanation: '// adalah pembagian bulat. Hasilnya 100000 bertipe int, tanpa titik desimal.',
    },
    {
      id: 'q-bab3-2',
      question:
        'Pengguna mengetik 75000 pada nominal = input("Nominal: "). Mengapa nominal + 5000 gagal?',
      options: [
        'input() menghasilkan teks, jadi tidak bisa dijumlahkan dengan angka',
        '75000 terlalu besar untuk Python',
        'input() hanya boleh dipakai satu kali',
        'setelah input() harus ada titik dua',
      ],
      correctIndex: 0,
      explanation:
        'input() selalu mengembalikan str. Bungkus dengan int() agar nominal bisa dihitung.',
    },
    {
      id: 'q-bab3-3',
      question: 'Apa yang tercetak?',
      codeSnippet: `transaksi = {"kategori": "Makan", "jumlah": 85000}\ndaftar = [transaksi]\nprint(daftar[0]["jumlah"])`,
      options: ['85000', '"Makan"', '0', 'KeyError'],
      correctIndex: 0,
      explanation:
        'daftar[0] mengambil dict pertama, lalu ["jumlah"] mengambil nilainya, yaitu 85000.',
    },
    {
      id: 'q-bab3-4',
      question: 'Apa yang tercetak?',
      codeSnippet: `def hitung(a, b):\n    hasil = a - b\n    print(hasil)\n\nsisa = hitung(100000, 40000)\nprint(sisa)`,
      options: ['60000 lalu 60000', '60000 lalu None', 'None lalu 60000', 'Error'],
      correctIndex: 1,
      explanation:
        'Fungsi mencetak 60000, tetapi tidak punya return. Variabel sisa berisi None, lalu dicetak sebagai None.',
    },
    {
      id: 'q-bab3-5',
      question:
        'pencatat.py dan main.py berada di folder yang sama. Kode mana yang benar untuk memakai fungsi dari pencatat.py?',
      options: [
        'import pencatat lalu pencatat.hitung_saldo()',
        'import pencatat.py lalu pencatat.hitung_saldo()',
        'import pencatat lalu hitung_saldo()',
        'cukup pencatat.hitung_saldo() tanpa import',
      ],
      correctIndex: 0,
      explanation:
        'Nama modul ditulis tanpa .py, dan fungsi dipanggil dengan awalan nama modul diikuti titik.',
    },
  ],
  summaryPoints: [
    'print() menampilkan teks (bertanda petik) atau angka; setiap print() pindah baris.',
    'input() selalu menghasilkan teks; bungkus dengan int() atau float() sebelum berhitung.',
    'Digunakan // untuk bilangan bulat, / untuk float, dan % untuk sisa bagi.',
    'if/elif/else memilih satu jalur; wajib titik dua dan indentasi 4 spasi.',
    'list untuk banyak data, dict untuk satu data berlabel; for/while untuk mengulang; def/return untuk fungsi; import untuk memakai file lain.',
  ],
};
