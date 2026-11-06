import { Chapter } from '../../types';

export const bab4: Partial<Chapter> = {
  openingAnalogy:
    'Bayangkan pencatat.py adalah buku kasir di warung. Buku ini tidak menyapa pembeli dan tidak menghias struk. Tugasnya cuma mencatat uang masuk, uang keluar, dan menghitung sisa. Menu dan tampilan diurus file lain.',
  sections: [
    {
      id: 'peran-pencatat',
      title: '1. Peran dan Tanggung Jawab pencatat.py (Orang 1)',
      content: `File \`pencatat.py\` adalah **buku kasir** program. File ini tidak meminta input dan tidak mencetak menu. Tugasnya:
- Menyimpan data dalam variabel \`KATEGORI\`, \`akun\`, dan \`transaksi\`.
- Menyediakan fungsi untuk mencatat pemasukan dan pengeluaran.
- Menyediakan fungsi untuk menghitung saldo dan pengeluaran harian.

Karena data dan hitungan dipisah, file \`laporan.py\` dan \`main.py\` cukup memanggil fungsi tanpa tahu isi rumusnya.`,
      analogy:
        'Seperti buku kasir: tidak perlu tahu siapa pelayannya, yang penting setiap uang masuk dan keluar tercatat rapi.',
      importantNotes: [
        'File ini tidak memakai input() dan tidak memakai print() untuk menu.',
        'Semua data disimpan di memori selama program berjalan. Jika program ditutup, data hilang.',
        'Transaksi dan pengaturan anggaran diubah lewat fungsi pencatat.py; hari aktif dinaikkan langsung oleh hari_berikutnya() di main.py.',
      ],
      projectConnection: {
        file: 'pencatat.py',
        note: 'File ini adalah sumber data untuk laporan.py dan main.py.',
      },
    },
    {
      id: 'variabel-inti-pencatat',
      title: '2. Data Inti: KATEGORI, akun, dan transaksi',
      content: `Ada tiga variabel inti di bagian atas file:

- **\`KATEGORI\`** adalah **tuple** berisi pilihan kategori. Isinya tetap, jadi tidak diubah.
- **\`akun\`** adalah **dictionary** berisi saldo awal, jumlah hari, jatah harian, dan hari aktif.
- **\`transaksi\`** adalah **list** berisi banyak catatan. Setiap catatan berupa **tuple** \`(hari, jenis, kategori, jumlah)\`.

Contoh satu transaksi:
\`(1, "keluar", "Makan", 15000)\`
Artinya: hari ke-1, uang keluar, kategori Makan, sebesar Rp15.000.`,
      analogy:
        'KATEGORI seperti daftar menu tetap. akun seperti dompet. transaksi seperti tumpukan struk belanja.',
      codeSnippets: [
        {
          id: 'kode-data-pencatat',
          title: 'Data awal pencatat.py',
          filename: 'pencatat.py',
          code: `KATEGORI = ("Makan", "Transport", "Kuota", "Kuliah/Tugas", "Hiburan", "Lainnya")

akun = {
    "uang_saku": 0,
    "jumlah_hari": 30,
    "jatah_harian": 0.0,
    "hari": 1,
}

transaksi = []`,
          explanation:
            'KATEGORI tuple, akun dictionary, transaksi list. Semua data program ada di sini.',
          output: `(Tidak ada output — file ini hanya menyiapkan data.)`,
          isSimulated: true,
          lineExplanations: [
            { line: 1, code: 'KATEGORI = (...)', explanation: 'Tuple berisi pilihan kategori. Isinya tetap.' },
            { line: 3, code: 'akun = { ... }', explanation: 'Dictionary menyimpan data dengan label.' },
            { line: 9, code: 'transaksi = []', explanation: 'List kosong untuk menampung banyak transaksi.' },
          ],
        },
      ],
      importantNotes: [
        'Tuple memakai kurung biasa (), list memakai kurung siku [], dictionary memakai kurung kurawal {}.',
        'transaksi adalah list, jadi transaksi[0] boleh diganti dengan tuple baru jika elemen itu ada. Namun, isi tuple tidak dapat diubah langsung dengan transaksi[0][3] = ....',
        'Key dictionary harus sama persis: "uang_saku", bukan "uang_saka".',
      ],
      commonMistakes: [
        'KeyError: salah ketik nama key, misalnya akun["uang_saka"].',
        'TypeError: mencoba mengubah isi tuple, misalnya transaksi[0][3] = 20000.',
      ],
      projectConnection: {
        file: 'pencatat.py',
        note: 'Data ini dipakai oleh laporan.py untuk membuat tabel dan oleh main.py untuk menampilkan menu.',
        code: `akun["uang_saku"]\nakun["jatah_harian"]\ntransaksi`,
      },
    },
    {
      id: 'fungsi-format-dan-atur',
      title: '3. Fungsi format_rupiah() dan atur_uang_saku()',
      content: `\`format_rupiah(angka)\` mengubah angka menjadi teks Rupiah. Contoh: 1500000 menjadi "Rp1.500.000". Caranya: format dengan pemisah ribuan, lalu ganti koma menjadi titik.

\`atur_uang_saku(uang_saku, jumlah_hari)\` dipanggil saat pengguna mengatur anggaran:
1. Membersihkan transaksi lama dengan \`transaksi.clear()\`.
2. Menyimpan uang saku dan jumlah hari ke \`akun\`.
3. Menghitung jatah harian dengan **pembagian biasa** \`/\`, bukan \`//\`. Hasilnya float, misalnya 100000.0.
4. Mengatur hari kembali ke 1.
5. Mencatat pemasukan awal "Anggaran" sebesar uang saku.`,
      analogy:
        'format_rupiah seperti mesin pembuat struk: angka mentah diubah menjadi tulisan rapi. atur_uang_saku seperti membuka buku kas baru: halaman lama dikosongkan, lalu saldo awal ditulis.',
      codeSnippets: [
        {
          id: 'kode-format-rupiah',
          title: 'format_rupiah()',
          filename: 'pencatat.py',
          code: `def format_rupiah(angka):
    teks = "Rp{:,.0f}".format(abs(angka)).replace(",", ".")
    if angka < 0:
        teks = "-" + teks
    return teks

print(format_rupiah(1500000))
print(format_rupiah(85000))`,
          explanation:
            'Format "{:,.0f}" memberi pemisah ribuan gaya Amerika. Lalu .replace(",", ".") mengubahnya menjadi gaya Indonesia.',
          output: `Rp1.500.000\nRp85.000`,
          isSimulated: true,
          lineExplanations: [
            { line: 2, code: 'teks = "Rp{:,.0f}".format(abs(angka))...', explanation: 'Format angka dengan pemisah ribuan, lalu ganti koma menjadi titik.' },
            { line: 3, code: 'if angka < 0:', explanation: 'Jika angka negatif, tambahkan tanda minus di depan.' },
            { line: 5, code: 'return teks', explanation: 'Kembalikan teks Rupiah ke pemanggil.' },
          ],
        },
        {
          id: 'kode-atur-uang-saku',
          title: 'atur_uang_saku()',
          filename: 'pencatat.py',
          code: `def atur_uang_saku(uang_saku, jumlah_hari):
    transaksi.clear()
    akun["uang_saku"] = uang_saku
    akun["jumlah_hari"] = jumlah_hari
    akun["jatah_harian"] = uang_saku / jumlah_hari
    akun["hari"] = 1
    transaksi.append((1, "masuk", "Anggaran", uang_saku))`,
          explanation:
            'Data lama dibersihkan, lalu data baru disimpan. Jatah harian dihitung dengan / sehingga hasilnya float.',
          lineExplanations: [
            { line: 2, code: 'transaksi.clear()', explanation: 'Mengosongkan semua transaksi lama.' },
            { line: 5, code: 'akun["jatah_harian"] = uang_saku / jumlah_hari', explanation: 'Pembagian biasa menghasilkan float, misalnya 100000.0.' },
            { line: 7, code: 'transaksi.append((1, "masuk", "Anggaran", uang_saku))', explanation: 'Saldo awal dicatat sebagai pemasukan hari ke-1.' },
          ],
        },
      ],
      importantNotes: [
        'format_rupiah() sekarang berada di pencatat.py, bukan laporan.py.',
        'Jatah harian memakai / sehingga bisa berupa float. Format Rupiah akan membulatkannya saat dicetak.',
        'Jika jumlah_hari 0, program akan error ZeroDivisionError. Validasi di laporan.py mencegah input 0.',
      ],
      commonMistakes: [
        'Mengira / dan // selalu menghasilkan nilai yang sama; pembagian yang tidak habis dapat menghasilkan nilai berbeda.',
        'Lupa transaksi.clear() sehingga data lama tercampur data baru.',
      ],
      projectConnection: {
        file: 'pencatat.py',
        note: 'format_rupiah() dipakai di laporan.py dan main.py. atur_uang_saku() dipanggil dari setup_awal() di main.py.',
        code: `from pencatat import atur_uang_saku, format_rupiah\natur_uang_saku(3000000, 30)\nprint(format_rupiah(akun["jatah_harian"]))`,
      },
    },
    {
      id: 'fungsi-tambah',
      title: '4. Fungsi tambah_pemasukan() dan tambah_pengeluaran()',
      content: `Kedua fungsi ini menambahkan satu tuple ke list \`transaksi\`.

- \`tambah_pemasukan(jumlah, sumber)\` mencatat uang masuk, misalnya gaji atau honor.
- \`tambah_pengeluaran(jumlah, kategori)\` mencatat uang keluar, misalnya makan atau transport.

Keduanya memakai \`akun["hari"]\` sebagai hari aktif, jadi tidak perlu mengirim hari secara manual.`,
      analogy:
        'Seperti menambahkan baris baru di buku kas: satu baris untuk uang masuk, satu baris untuk uang keluar.',
      codeSnippets: [
        {
          id: 'kode-tambah',
          title: 'Mencatat pemasukan dan pengeluaran',
          filename: 'pencatat.py',
          code: `def tambah_pemasukan(jumlah, sumber):
    transaksi.append((akun["hari"], "masuk", sumber, jumlah))

def tambah_pengeluaran(jumlah, kategori):
    transaksi.append((akun["hari"], "keluar", kategori, jumlah))`,
          explanation:
            'Setiap fungsi membuat tuple baru berisi hari aktif, jenis, kategori/sumber, dan jumlah, lalu menambahkannya ke list.',
          lineExplanations: [
            { line: 2, code: 'transaksi.append((akun["hari"], "masuk", sumber, jumlah))', explanation: 'Tuple baru ditambahkan ke akhir list.' },
            { line: 5, code: 'transaksi.append((akun["hari"], "keluar", kategori, jumlah))', explanation: 'Sama, tetapi jenisnya "keluar".' },
          ],
        },
      ],
      importantNotes: [
        'Urutan tuple penting: (hari, jenis, kategori, jumlah).',
        'Gunakan "masuk" dan "keluar" huruf kecil semua agar perbandingan konsisten.',
        'Jangan mengubah tuple yang sudah ada; tambahkan tuple baru.',
      ],
      commonMistakes: [
        'Menulis "Masuk" dengan huruf besar, lalu perbandingan if jenis == "masuk" gagal.',
        'Lupa menyertakan akun["hari"] sehingga transaksi tidak punya hari.',
      ],
      projectConnection: {
        file: 'pencatat.py',
        note: 'Dipanggil dari menu_pengeluaran() dan menu_pemasukan() di main.py.',
        code: `tambah_pengeluaran(15000, "Makan")\ntambah_pemasukan(500000, "Honor")`,
      },
    },
    {
      id: 'fungsi-hitung',
      title: '5. Fungsi hitung_saldo() dan pengeluaran_hari()',
      content: `\`hitung_saldo()\` menjumlahkan semua transaksi:
- Jika jenis "masuk", saldo ditambah.
- Jika jenis "keluar", saldo dikurangi.

\`pengeluaran_hari(hari_ke)\` hanya menjumlahkan transaksi keluar pada hari tertentu. Ini dipakai untuk status harian.`,
      analogy:
        'hitung_saldo seperti menghitung isi dompet dari semua struk. pengeluaran_hari seperti menyaring struk khusus hari ini.',
      codeSnippets: [
        {
          id: 'kode-hitung-saldo',
          title: 'hitung_saldo() dan pengeluaran_hari()',
          filename: 'pencatat.py',
          code: `def hitung_saldo():
    saldo = 0
    for hari, jenis, kategori, jumlah in transaksi:
        if jenis == "masuk":
            saldo += jumlah
        else:
            saldo -= jumlah
    return saldo

def pengeluaran_hari(hari_ke):
    total = 0
    for hari, jenis, kategori, jumlah in transaksi:
        if hari == hari_ke and jenis == "keluar":
            total += jumlah
    return total`,
          explanation:
            'Loop melewati setiap transaksi. Untuk saldo, semua jenis diperhitungkan. Untuk pengeluaran harian, hanya hari dan jenis keluar yang cocok.',
          lineExplanations: [
            { line: 3, code: 'for hari, jenis, kategori, jumlah in transaksi:', explanation: 'Membuka tuple transaksi satu per satu.' },
            { line: 5, code: 'if jenis == "masuk":', explanation: 'Jika pemasukan, tambahkan ke saldo.' },
            { line: 8, code: 'return saldo', explanation: 'Kembalikan saldo akhir.' },
            { line: 14, code: 'if hari == hari_ke and jenis == "keluar":', explanation: 'Hanya hitung pengeluaran pada hari yang diminta.' },
          ],
        },
      ],
      importantNotes: [
        'Saldo awal 0, tetapi atur_uang_saku() sudah mencatat anggaran sebagai pemasukan, sehingga saldo menjadi uang saku.',
        'pengeluaran_hari() mengembalikan 0 jika tidak ada transaksi pada hari itu.',
        'Fungsi ini tidak mencetak apa pun; hasilnya dikembalikan ke pemanggil.',
      ],
      commonMistakes: [
        'Mengembalikan None karena lupa return.',
        'Menghitung pemasukan sebagai pengeluaran karena lupa if jenis == "keluar".',
      ],
      projectConnection: {
        file: 'laporan.py',
        note: 'cek_peringatan() memanggil hitung_saldo() dan pengeluaran_hari() untuk menentukan status.',
        code: `saldo = hitung_saldo()\nkeluar_hari_ini = pengeluaran_hari(akun["hari"])`,
      },
    },
  ],
  cheatSheet: {
    title: 'Cheat Sheet Bab 4 — pencatat.py',
    items: [
      'pencatat.py dipegang Orang 1; tidak memakai input() dan tidak mencetak menu.',
      'KATEGORI adalah tuple pilihan kategori.',
      'akun adalah dictionary: uang_saku, jumlah_hari, jatah_harian, hari.',
      'transaksi adalah list of tuple: (hari, jenis, kategori, jumlah).',
      'format_rupiah(angka) mengubah angka menjadi "Rp1.500.000".',
      'atur_uang_saku(uang, hari) mengosongkan transaksi, mengisi akun, menghitung jatah dengan /, dan mencatat anggaran.',
      'tambah_pemasukan(jumlah, sumber) dan tambah_pengeluaran(jumlah, kategori) menambah tuple baru.',
      'hitung_saldo() menjumlahkan pemasukan dan mengurangi pengeluaran.',
      'pengeluaran_hari(hari_ke) menjumlahkan pengeluaran pada hari tertentu.',
    ],
    code: `saldo = 0\nfor hari, jenis, kategori, jumlah in transaksi:\n    if jenis == "masuk":\n        saldo += jumlah\n    else:\n        saldo -= jumlah`,
  },
  commonError: {
    name: "KeyError: 'uang_saka'",
    message: "KeyError: 'uang_saka'",
    cause: 'Nama key di dictionary salah ketik. Python mencari key "uang_saka" yang tidak ada.',
    fix: 'Periksa ejaan key. Gunakan key yang sama persis seperti saat dictionary dibuat: "uang_saku".',
    badCode: `print(akun["uang_saka"])`,
    goodCode: `print(akun["uang_saku"])`,
  },
  tryItYourself: [
    {
      id: 'bab4-coba-1',
      level: 'Mudah',
      prompt: 'Setelah akun["uang_saku"] = 3000000 dan akun["jumlah_hari"] = 30, cetak jatah harian dengan format Rupiah.',
      starterCode: `akun = {"uang_saku": 3000000, "jumlah_hari": 30, "jatah_harian": 0.0, "hari": 1}\n# hitung dan cetak`,
      answerCode: `akun = {"uang_saku": 3000000, "jumlah_hari": 30, "jatah_harian": 0.0, "hari": 1}\nakun["jatah_harian"] = akun["uang_saku"] / akun["jumlah_hari"]\nprint("Jatah harian:", akun["jatah_harian"])`,
      explanation: '3000000 / 30 = 100000.0. Hasilnya float karena memakai pembagian biasa.',
    },
    {
      id: 'bab4-coba-2',
      level: 'Sedang',
      prompt: 'Buat fungsi total_masuk() yang menjumlahkan hanya transaksi jenis "masuk".',
      starterCode: `transaksi = [(1, "masuk", "Anggaran", 3000000), (1, "keluar", "Makan", 15000)]\n\ndef total_masuk():\n    # tulis di sini\n    pass`,
      answerCode: `transaksi = [(1, "masuk", "Anggaran", 3000000), (1, "keluar", "Makan", 15000)]\n\ndef total_masuk():\n    total = 0\n    for hari, jenis, kategori, jumlah in transaksi:\n        if jenis == "masuk":\n            total += jumlah\n    return total\n\nprint(total_masuk())`,
      explanation: 'Siapkan total = 0, lalu tambahkan hanya jika jenis == "masuk". Kembalikan total.',
    },
    {
      id: 'bab4-coba-3',
      level: 'Tantangan',
      prompt: 'Buat fungsi pengeluaran_kategori(kategori) yang menjumlahkan pengeluaran keluar pada kategori tertentu.',
      starterCode: `transaksi = [(1, "keluar", "Makan", 15000), (1, "keluar", "Transport", 40000), (1, "keluar", "Makan", 5000)]\n\ndef pengeluaran_kategori(kategori):\n    # tulis di sini\n    pass`,
      answerCode: `transaksi = [(1, "keluar", "Makan", 15000), (1, "keluar", "Transport", 40000), (1, "keluar", "Makan", 5000)]\n\ndef pengeluaran_kategori(kategori):\n    total = 0\n    for hari, jenis, kat, jumlah in transaksi:\n        if jenis == "keluar" and kat == kategori:\n            total += jumlah\n    return total\n\nprint(pengeluaran_kategori("Makan"))`,
      explanation: 'Periksa dua hal sekaligus: jenis "keluar" dan kategori yang diminta. Hasilnya 20000.',
    },
  ],
  fixTheBug: {
    id: 'bab4-fix-1',
    title: 'Perbaiki: saldo menghitung semua transaksi sebagai tambahan',
    prompt:
      'Fungsi hitung_saldo() seharusnya mengurangi pengeluaran, tetapi kode ini selalu menambah. Perbaiki.',
    buggyCode: `def hitung_saldo():\n    saldo = 0\n    for hari, jenis, kategori, jumlah in transaksi:\n        saldo += jumlah\n    return saldo`,
    answerCode: `def hitung_saldo():\n    saldo = 0\n    for hari, jenis, kategori, jumlah in transaksi:\n        if jenis == "masuk":\n            saldo += jumlah\n        else:\n            saldo -= jumlah\n    return saldo`,
    explanation:
      'Tambahkan if jenis == "masuk": saldo += jumlah, else: saldo -= jumlah. Tanpa percabangan, pengeluaran ikut ditambahkan.',
  },
  quiz: [
    {
      id: 'q-bab4-1',
      question: 'Apa tipe data dari KATEGORI di pencatat.py?',
      options: ['list', 'tuple', 'dictionary', 'string'],
      correctIndex: 1,
      explanation: 'KATEGORI ditulis dengan kurung biasa () dan isinya tetap, sehingga bertipe tuple.',
    },
    {
      id: 'q-bab4-2',
      question: 'Apa isi dari satu transaksi di list transaksi?',
      options: [
        'dictionary dengan key hari, kategori, jumlah',
        'tuple (hari, jenis, kategori, jumlah)',
        'list berisi angka',
        'string "hari kategori jumlah"',
      ],
      correctIndex: 1,
      explanation:
        'Setiap transaksi adalah tuple berisi hari, jenis ("masuk"/"keluar"), kategori/sumber, dan jumlah.',
    },
    {
      id: 'q-bab4-3',
      question: 'Mengapa jatah harian di atur_uang_saku() memakai / dan bukan //?',
      options: [
        'Karena / lebih cepat',
        'Karena hasilnya boleh berupa float dan nanti diformat saat dicetak',
        'Karena // tidak bisa dipakai di Python',
        'Karena jumlah_hari selalu nol',
      ],
      correctIndex: 1,
      explanation:
        'Kode terbaru memakai / sehingga jatah_harian bertipe float, misalnya 100000.0. format_rupiah() merapikannya saat dicetak.',
    },
    {
      id: 'q-bab4-4',
      question: 'Apa yang dikembalikan oleh hitung_saldo() jika transaksi berisi pemasukan 3000000 dan pengeluaran 15000?',
      options: ['3015000', '2985000', '15000', 'None'],
      correctIndex: 1,
      explanation: 'Saldo = 3000000 - 15000 = 2985000.',
    },
    {
      id: 'q-bab4-5',
      question: 'Fungsi mana yang dipakai untuk menghitung pengeluaran pada hari tertentu?',
      options: ['hitung_saldo()', 'pengeluaran_hari(hari_ke)', 'format_rupiah()', 'atur_uang_saku()'],
      correctIndex: 1,
      explanation:
        'pengeluaran_hari(hari_ke) memfilter transaksi yang harinya sama dan jenisnya "keluar".',
    },
  ],
  summaryPoints: [
    'pencatat.py (Orang 1) mengelola data dan hitungan; tidak meminta input dan tidak mencetak menu.',
    'Data inti: KATEGORI (tuple), akun (dictionary), transaksi (list of tuple).',
    'format_rupiah() dan atur_uang_saku() menyiapkan data awal; jatah harian memakai /.',
    'tambah_pemasukan() dan tambah_pengeluaran() menambah tuple baru ke list transaksi.',
    'hitung_saldo() menjumlahkan semua transaksi; pengeluaran_hari() memfilter hari tertentu.',
  ],
  traceTable: {
    title: 'Tabel jejak: hitung_saldo()',
    description: 'Perhatikan nilai saldo setiap kali satu transaksi diproses.',
    steps: [
      { line: 1, code: 'saldo = 0', variables: { saldo: '0' }, note: 'Wadah penampung disiapkan.' },
      { line: 2, code: 'for ... in transaksi:', variables: { saldo: '0', transaksi: '3 baris' }, note: 'Mulai membaca transaksi pertama.' },
      { line: 3, code: 'transaksi[0] = (1, "masuk", "Anggaran", 3000000)', variables: { saldo: '0', jenis: 'masuk', jumlah: '3000000' }, note: 'Pemasukan anggaran.' },
      { line: 4, code: 'saldo += jumlah', variables: { saldo: '3000000' }, note: 'Saldo menjadi 3.000.000.' },
      { line: 5, code: 'transaksi[1] = (1, "keluar", "Makan", 15000)', variables: { saldo: '3000000', jenis: 'keluar', jumlah: '15000' }, note: 'Pengeluaran makan.' },
      { line: 6, code: 'saldo -= jumlah', variables: { saldo: '2985000' }, note: 'Saldo menjadi 2.985.000.' },
      { line: 7, code: 'return saldo', variables: { saldo: '2985000' }, note: 'Loop selesai, saldo dikembalikan.' },
    ],
  },
};
