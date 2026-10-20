import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  // =========================================================================
  // BAB 1: KENALAN DULU
  // =========================================================================
  {
    id: 'bab-1',
    number: 1,
    title: 'Kenalan Dulu',
    subtitle: 'Memahami Masalah, Program yang Akan Dibuat, dan Alasan Membagi Tiga File',
    description:
      'Selamat datang di dunia pemrograman Python! Di bab pembuka ini, kita akan berkenalan dengan masalah keuangan mahasiswa, program yang akan kita bangun bersama, dan mengapa kita memecah program menjadi tiga file terpisah.',
    learningGoals: [
      'Memahami masalah keuangan khas anak kuliahan dan bagaimana program komputer dapat membantu.',
      'Mengetahui gambaran utuh program pencatat keuangan mahasiswa berbasis Python yang akan dibuat.',
      'Memahami konsep modularitas: mengapa membagi kode menjadi 3 file (pencatat.py, laporan.py, main.py) jauh lebih rapi dibanding menumpuknya dalam satu file raksasa.',
    ],
    sections: [
      {
        id: 'latar-belakang-masalah',
        title: '1. Masalah Keuangan Mahasiswa di Awal Bulan vs Akhir Bulan',
        content: `Hampir setiap mahasiswa pernah mengalami momen ini: kiriman bulanan dari orang tua atau uang saku baru saja cair di tanggal 1. Rasanya dompet tebal sekali. Makan siang di kafe, nongkrong pesan kopi kekinian, jajan camilan tanpa hitung-hitungan.

Namun saat masuk tanggal 20, tiba-tiba saldo rekening tinggal beberapa puluh ribu rupiah. Sisa hari harus bertahan hidup dengan mi instan.

Mengapa hal ini sering terjadi? Bukan karena uangnya selalu kurang, melainkan karena kita tidak tahu persis berapa **jatah uang yang aman dibelanjakan setiap hari**. Ketika kita belanja tanpa batasan harian, uang akan habis begitu saja tanpa kita sadari.`,
        analogy:
          'Bayangkan kamu punya galon air 19 liter untuk 30 hari berkemah. Jika kamu minum langsung dari galon tanpa takaran gelas per hari, air pasti habis sebelum waktu berkemah selesai. Jatah harian adalah gelas takar kita!',
        importantNotes: [
          'Program yang kita buat bukan aplikasi perbankan sungguhan yang terhubung ke rekening bank.',
          'Program ini adalah alat bantu simulasi berbasis konsol/terminal untuk melatih logika berpikir komputasional pemula.',
        ],
      },
      {
        id: 'solusi-program',
        title: '2. Program Apa yang Akan Kita Buat?',
        content: `Kita akan membuat program Python bernama **Pencatat Keuangan Mahasiswa**.

Cara kerja program ini sangat sederhana namun ampuh:
1. Kamu memasukkan total anggaran bulanan (misal: Rp3.000.000) dan jumlah hari (misal: 30 hari).
2. Program menghitung otomatis jatah harianmu: Rp3.000.000 ÷ 30 = **Rp100.000 per hari**.
3. Setiap kali kamu jajan atau bayar sesuatu, kamu mencatatnya ke program.
4. Program langsung memberi tahu statusmu: apakah masih **AMAN**, sudah **WASPADA**, atau sudah **BOROS** karena melebihi jatah hari itu.
5. Saat hari berganti, kamu bisa memindahkan hari aktif dan program tetap menyimpan seluruh catatan transaksi pengeluaranmu.`,
        codeSnippets: [
          {
            id: 'contoh-output-program',
            title: 'Tampilan yang Dihasilkan Program Kita Nanti',
            code: `=============================================
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
            explanation:
              'Inilah hasil akhir yang akan dicetak ke layar terminal. Program menyajikan informasi angka yang jelas dan status peringatan otomatis.',
            isSimulated: true,
          },
        ],
      },
      {
        id: 'mengapa-tiga-file',
        title: '3. Mengapa Program Kita Dibagi Menjadi Tiga File?',
        content: `Banyak pemula tergoda untuk menulis semua kode dari baris 1 sampai baris 300 di dalam satu file saja. Kelihatannya praktis, tetapi begitu program semakin panjang dan ada error, mencari kesalahan di file 300 baris rasanya seperti mencari jarum di tumpukan jerami!

Dalam dunia kerja profesional, prinsip ini disebut **Separation of Concerns** (Pemisahan Tanggung Jawab) atau **Modularitas**. Kita membagi program kita menjadi tiga file dengan tugas yang berbeda:

1. **pencatat.py**: Si "Akuntan Data". File ini hanya mengurus angka: menyimpan transaksi, menghitung total pengeluaran, menghitung sisa saldo, dan menghitung jatah harian. File ini tidak peduli tampilan di layar.
2. **laporan.py**: Si "Desainer Visual". File ini bertugas membuat teks menjadi rapi: mengubah angka biasa jadi format Rupiah, menentukan label status (Aman/Boros), dan memastikan pengguna tidak memasukkan huruf saat diminta angka.
3. **main.py**: Si "Resepsionis / Manajer". File inilah yang pertama kali dijalankan oleh pengguna di terminal. File ini menampilkan menu 1 sampai 5 dan memanggil fungsi yang ada di pencatat.py dan laporan.py sesuai pilihan pengguna.`,
        analogy:
          'Seperti restoran yang sukses: Koki (pencatat.py) fokus memasak di dapur, Pelayan (laporan.py) fokus menata makanan di piring dan memberi bon belanja, sedangkan Kasir di depan (main.py) menyapa pelanggan dan menerima pesanan.',
        importantNotes: [
          'Dengan membagi 3 file, jika ada salah hitung rumus, kita langsung tahu harus membuka pencatat.py.',
          'Jika ada salah ejaan kata di menu, kita langsung tahu cukup membuka main.py.',
          'Kode menjadi lebih rapi, tidak membingungkan, dan mudah dipresentasikan kepada dosen.',
        ],
      },
    ],
    predictExercises: [
      {
        id: 'prediksi-bab1-peran-file',
        title: 'Tebak Tanggung Jawab File',
        prompt: 'Jika kita ingin mengubah rumus perhitungan sisa saldo dari (anggaran - pengeluaran), file manakah yang seharusnya kita buka dan edit?',
        code: `# Di mana rumus ini seharusnya berada?
def hitung_sisa_saldo():
    return anggaran_bulanan - total_pengeluaran`,
        options: ['main.py', 'laporan.py', 'pencatat.py', 'terminal.exe'],
        correctAnswer: 'pencatat.py',
        explanation:
          'Tepat sekali! Seluruh logika hitungan matematika dan penyimpanan data keuangan dikelola secara khusus di dalam pencatat.py.',
      },
    ],
    quiz: [
      {
        id: 'q-bab1-1',
        question: 'Apa tujuan utama dari pembuatan program pencatat keuangan mahasiswa ini?',
        options: [
          'Menghubungkan rekening bank mahasiswa ke sistem pembayaran digital',
          'Membantu mahasiswa mengontrol pengeluaran dengan menghitung jatah harian dan status boros/aman',
          'Mengirimkan tagihan otomatis ke orang tua mahasiswa',
          'Menggantikan aplikasi Microsoft Excel secara keseluruhan',
        ],
        correctIndex: 1,
        explanation:
          'Program ini membantu mahasiswa membagi anggaran menjadi jatah harian agar terhindar dari krisis uang di akhir bulan.',
      },
      {
        id: 'q-bab1-2',
        question: 'Apa keuntungan membagi kode program menjadi tiga file (pencatat.py, laporan.py, main.py)?',
        options: [
          'Ukuran file menjadi lebih besar di harddisk',
          'Program berjalan sepuluh kali lebih cepat di komputer',
          'Kode lebih teratur, mudah dipahami, mudah diperbaiki jika ada error, dan setiap file punya tugas jelas',
          'Wajib dilakukan karena Python menolak menjalankan program satu file',
        ],
        correctIndex: 2,
        explanation:
          'Prinsip modularitas membuat kode terstruktur rapi karena tiap file memiliki tanggung jawab yang spesifik (akuntan, desainer tampilan, dan pengendali menu).',
      },
      {
        id: 'q-bab1-3',
        question: 'File manakah yang pertama kali kita ketik dan jalankan di terminal saat ingin menggunakan program?',
        options: ['pencatat.py', 'laporan.py', 'main.py', 'config.json'],
        correctIndex: 2,
        explanation:
          'File main.py adalah pintu masuk utama (entry point) aplikasi yang menyajikan antarmuka menu kepada pengguna.',
      },
    ],
    summaryPoints: [
      'Masalah keuangan mahasiswa sering terjadi karena tidak ada pembagian jatah harian yang disiplin.',
      'Program kita menghitung jatah harian dan memberi peringatan status: AMAN, WASPADA, atau BOROS.',
      'Modularitas 3 file: pencatat.py (data & hitungan), laporan.py (format tampilan & validasi), main.py (menu utama).',
    ],
    nextChapterId: 'bab-2',
  },

  // =========================================================================
  // BAB 2: PERSIAPAN
  // =========================================================================
  {
    id: 'bab-2',
    number: 2,
    title: 'Persiapan',
    subtitle: 'Memasang Python, Menyiapkan Editor Kode, dan Menjalankan File di Terminal',
    description:
      'Sebelum mulai menulis kode pencatat keuangan, kita perlu menyiapkan peralatan tempur kita: Python di komputer, text editor yang nyaman, dan pemahaman dasar menggunakan terminal.',
    learningGoals: [
      'Mengetahui cara memastikan Python 3 sudah terpasang di komputer.',
      'Memilih teks editor yang tepat (seperti Visual Studio Code) untuk pemula.',
      'Membuat folder proyek keuangan_mahasiswa dan memahami cara menjalankan file Python lewat Command Prompt / Terminal.',
    ],
    sections: [
      {
        id: 'pasang-python',
        title: '1. Memasang Python 3 di Laptop / Komputer',
        content: `Python adalah bahasa pemrograman yang mudah dibaca mirip bahasa Inggris. Agar laptopmu bisa memahami perintah Python, laptop membutuhkan penerjemah (interpreter) Python.

Langkah pemasangan:
1. Buka situs resmi **python.org** dan unduh installer Python versi terbaru (Python 3.10 ke atas).
2. **PENTING UNTUK PENGGUNA WINDOWS**: Saat membuka installer, pastikan kamu mencentang kotak **"Add python.exe to PATH"** di bagian paling bawah layar installer sebelum mengklik tombol Install Now!
3. Jika kotak tersebut lupa dicentang, terminal tidak akan mengenali perintah \`python\` saat kamu mengetiknya nanti.`,
        analogy:
          'Mencentang "Add Python to PATH" ibarat mendaftarkan nomor telepon teman ke kontak favorit: kapan pun kamu memanggil namanya, laptop langsung tahu ke mana harus mencari!',
        importantNotes: [
          'Bagi pengguna macOS atau Linux, Python 3 biasanya sudah terpasang bawaan. Kamu bisa mengetik `python3 --version` di terminal.',
        ],
      },
      {
        id: 'cek-instalasi-terminal',
        title: '2. Memeriksa Instalasi Lewat Terminal',
        content: `Setelah instalasi selesai, buka **Command Prompt** (di Windows) atau **Terminal** (di Mac/Linux), lalu ketik perintah berikut:`,
        codeSnippets: [
          {
            id: 'cek-versi-cmd',
            title: 'Ketik di Command Prompt / Terminal:',
            code: `python --version`,
            explanation:
              'Perintah ini meminta Python memberitahukan versi yang terpasang di komputermu.',
            output: `Python 3.11.4`,
          },
        ],
      },
      {
        id: 'membuat-folder-proyek',
        title: '3. Membuat Folder Proyek dan Tiga File Kosong',
        content: `Buatlah sebuah folder baru di komputermu, misalnya di Desktop atau Documents, dengan nama:
\`keuangan_mahasiswa/\`

Buka folder tersebut di text editor favoritmu (sangat disarankan memakai **Visual Studio Code**).
Di dalam folder tersebut, buatlah 3 file kosong dengan nama persis seperti berikut (huruf kecil semua):
1. \`pencatat.py\`
2. \`laporan.py\`
3. \`main.py\`

Ketiga file ini **harus berada dalam satu folder yang sama** agar bisa saling mengimpor dengan mudah!`,
        analogy:
          'Ketiga file ini seperti tiga buku catatan yang berada di dalam satu ransel yang sama. Jika salah satu ditaruh di ransel lain, temanmu akan kesulitan mencarinya.',
      },
      {
        id: 'menjalankan-program-pertama',
        title: '4. Cara Menjalankan File Python',
        content: `Untuk menguji apakah semuanya bekerja, buka file \`main.py\` lalu ketik satu baris kode uji coba:
\`print("Halo dari main.py!")\`

Lalu di terminal (pastikan posisi direktori terminal sudah berada di folder proyekmu), ketik:
\`python main.py\`
(atau di Mac/Linux: \`python3 main.py\`)

Jika muncul tulisan *Halo dari main.py!*, selamat! Lingkungan kodingmu sudah 100% siap untuk membangun proyek keuangan mahasiswa.`,
        codeSnippets: [
          {
            id: 'contoh-halo-dunia',
            title: 'Uji Coba Pertama di main.py',
            code: `print("Halo dari main.py!")`,
            explanation: 'Fungsi print() adalah cara paling sederhana untuk menyuruh Python menampilkan teks ke layar.',
            output: `Halo dari main.py!`,
          },
        ],
      },
    ],
    predictExercises: [
      {
        id: 'prediksi-bab2-perintah-run',
        title: 'Tebak Perintah Terminal',
        prompt: 'Perintah terminal manakah yang benar untuk menjalankan file program main.py pada komputer Windows?',
        code: `# Berada di folder keuangan_mahasiswa
C:\\keuangan_mahasiswa> _____ main.py`,
        options: ['run', 'execute', 'python', 'open'],
        correctAnswer: 'python',
        explanation:
          'Perintah yang digunakan untuk menjalankan skrip Python adalah `python nama_file.py` (atau `python3` pada Mac/Linux).',
      },
    ],
    fillInBlankExercises: [
      {
        id: 'fill-bab2-ekstensi',
        title: 'Lengkapi Nama File Python',
        prompt: 'Semua file kode program Python wajib disimpan dengan akhiran ekstensi:',
        templateCode: `nama_file = "pencatat._____"`,
        missingToken: 'py',
        explanation: 'Setiap file kode program Python selalu memiliki ekstensi .py agar sistem mengenalinya sebagai skrip Python.',
        hint1: 'Terdiri dari dua huruf',
        hint2: 'Huruf depan p dan huruf belakang y',
      },
    ],
    quiz: [
      {
        id: 'q-bab2-1',
        question: 'Langkah krusial apa yang wajib dicentang saat menginstal Python di Windows agar terminal mengenali perintah python?',
        options: [
          'Install for Guest Users only',
          'Add python.exe to PATH',
          'Disable Windows Defender',
          'Install Ancient Python 2.7',
        ],
        correctIndex: 1,
        explanation:
          '"Add python.exe to PATH" mendaftarkan Python ke sistem operasi sehingga kamu bisa mengetik `python` di command prompt mana pun.',
      },
      {
        id: 'q-bab2-2',
        question: 'Di mana file pencatat.py, laporan.py, dan main.py harus disimpan?',
        options: [
          'Di folder acak yang berbeda-beda agar tidak tertukar',
          'Di dalam satu folder proyek yang sama (misal: folder keuangan_mahasiswa)',
          'Di folder sistem C:\\Windows\\System32',
          'Di Recycle Bin',
        ],
        correctIndex: 1,
        explanation:
          'Ketiga file harus diletakkan di dalam folder yang sama agar perintah `import pencatat` dan `import laporan` dapat langsung menemukannya.',
      },
    ],
    summaryPoints: [
      'Unduh Python dari python.org dan pastikan mencentang "Add python.exe to PATH" saat instalasi.',
      'Gunakan VS Code untuk menulis kode dengan nyaman dan rapi.',
      'Simpan pencatat.py, laporan.py, dan main.py dalam satu folder proyek bersama.',
      'Jalankan program dari terminal dengan mengetik: python main.py.',
    ],
    prevChapterId: 'bab-1',
    nextChapterId: 'bab-3',
  },

  // =========================================================================
  // BAB 3: SEMBILAN LANGKAH DASAR
  // =========================================================================
  {
    id: 'bab-3',
    number: 3,
    title: 'Sembilan Langkah Dasar',
    subtitle: 'Konsep Inti Pemrograman Python Melalui Contoh Kecil Nyata',
    description:
      'Untuk membuat program keuangan mahasiswa, kita hanya perlu menguasai 9 pondasi dasar Python. Di bab ini, kita pelajari satu per satu dengan contoh sehari-hari yang mudah diingat.',
    learningGoals: [
      'Memahami fungsi print(), variabel, dan tipe data dasar (str, int, float).',
      'Menerima input pengguna dengan input() dan melakukan konversi tipe data (type casting).',
      'Menggunakan operator matematika, percabangan (if/elif/else), wadah data (list & dict), perulangan (for/while), fungsi (def), dan import file.',
    ],
    sections: [
      {
        id: 'langkah-1-print',
        title: 'Langkah 1: Menampilkan Teks ke Layar (print)',
        content: `Perintah \`print()\` digunakan untuk menyuruh komputer menampilkan tulisan atau angka ke layar konsol. Tulisan yang ingin ditampilkan harus diapit tanda petik dua (\`"...\`") atau petik satu (\`'...\`').`,
        analogy: 'Seperti pengumuman di pengeras suara kampus atau tulisan di papan pengumuman mading.',
        codeSnippets: [
          {
            id: 'contoh-print',
            title: 'Contoh Menggunakan print()',
            code: `print("Selamat datang di Pencatat Keuangan!")
print(100000)`,
            explanation: 'Teks diapit tanda petik, sedangkan angka bulat bisa langsung ditulis tanpa tanda petik.',
            output: `Selamat datang di Pencatat Keuangan!\n100000`,
            lineExplanations: [
              { line: 1, code: 'print("Selamat datang di Pencatat Keuangan!")', explanation: 'Mencetak teks sambutan ke layar.' },
              { line: 2, code: 'print(100000)', explanation: 'Mencetak angka 100000 langsung tanpa tanda petik.' },
            ],
          },
        ],
      },
      {
        id: 'langkah-2-variabel',
        title: 'Langkah 2: Menyimpan Data (Variabel & Tipe Data)',
        content: `Variabel adalah wadah penyimpanan dalam memori komputer. Kita memberi nama pada wadah tersebut dengan tanda sama dengan (\`=\`) untuk memasukkan nilai ke dalamnya.

Tiga tipe data utama yang kita pakai di modul ini:
- **String (str)**: Teks, selalu diapit tanda petik. Contoh: \`"Makan Siang"\`
- **Integer (int)**: Bilangan bulat. Contoh: \`3000000\` (anggaran), \`30\` (hari)
- **Float**: Angka berkoma/desimal. Contoh: \`85.5\` (persentase boros)`,
        analogy: 'Variabel seperti stoples bertuliskan label spidol: kamu bisa memasukkan uang ke stoples berlabel "anggaran", lalu mengambil atau mengganti isinya kapan pun.',
        codeSnippets: [
          {
            id: 'contoh-variabel',
            title: 'Menyimpan Anggaran ke Variabel',
            code: `anggaran = 3000000
kategori = "Makan Siang"
print("Anggaran awal:")
print(anggaran)
print("Kategori belanja:")
print(kategori)`,
            explanation: 'Variabel anggaran menyimpan angka 3000000 dan kategori menyimpan tulisan "Makan Siang".',
            output: `Anggaran awal:\n3000000\nKategori belanja:\nMakan Siang`,
          },
        ],
      },
      {
        id: 'langkah-3-input',
        title: 'Langkah 3: Menerima Masukan Pengguna (input & konversi int)',
        content: `Fungsi \`input()\` membuat program berhenti sejenak dan menunggu pengguna mengetik sesuatu di keyboard lalu menekan Enter.

**PENTING!** Apapun yang diketik pengguna, \`input()\` SELALU mengembalikannya dalam bentuk teks (String).
Jika pengguna mengetik angka \`50000\`, komputer menganggapnya teks \`"50000"\`. Kamu tidak bisa melakukan pengurangan teks dengan angka!
Oleh karena itu, kita harus membungkusnya dengan \`int()\` untuk mengubahnya menjadi angka bulat:
\`jumlah = int(input("Masukkan nominal: "))\``,
        analogy: 'Seperti menerima lembaran kertas bertuliskan nomor 50000. Komputer melihatnya hanya sebagai gambar tulisan sampai kita menyuruhnya: "baca gambar ini sebagai nilai uang rupiah!".',
        codeSnippets: [
          {
            id: 'contoh-input-casting',
            title: 'Menerima Angka dari Pengguna',
            code: `anggaran_teks = "3000000"
anggaran_angka = int(anggaran_teks)
print(anggaran_angka + 500000)  # Bisa dijumlahkan karena sudah berupa integer!`,
            explanation: 'Fungsi int() mengubah teks "3000000" menjadi bilangan bulat 3000000 sehingga dapat dihitung matematika.',
            output: `3500000`,
          },
        ],
      },
      {
        id: 'langkah-4-operator',
        title: 'Langkah 4: Operator Matematika (+, -, *, /, //, %)',
        content: `Di program kita, kita butuh menghitung pembagian anggaran bulanan menjadi jatah harian.
Python memiliki dua jenis pembagian:
- \`/\` : Pembagian biasa (menghasilkan angka desimal float, misal \`10 / 3 = 3.3333333333333335\`)
- \`//\` : Pembagian bulat (floor division, membuang komanya, misal \`3000000 // 30 = 100000\`)
Kita menggunakan \`//\` agar jatah harian selalu berupa bilangan bulat rupiah yang rapi.`,
        codeSnippets: [
          {
            id: 'contoh-operator',
            title: 'Menghitung Jatah Harian dan Sisa Saldo',
            code: `anggaran = 3000000
hari = 30
jatah_harian = anggaran // hari
pengeluaran = 85000
sisa_saldo = anggaran - pengeluaran

print(f"Jatah harian: {jatah_harian}")
print(f"Sisa saldo: {sisa_saldo}")`,
            explanation: 'Tanda // membagi anggaran bulat-bulat, sedangkan tanda - mengurangi anggaran dengan pengeluaran.',
            output: `Jatah harian: 100000\nSisa saldo: 2915000`,
          },
        ],
      },
      {
        id: 'langkah-5-percabangan',
        title: 'Langkah 5: Percabangan Logika (if / elif / else)',
        content: `Percabangan memungkinkan program mengambil keputusan. Misalnya: jika pengeluaran hari ini melebihi jatah harian, beri peringatan "BOROS!". Jika tidak, beri status "AMAN".`,
        analogy: 'Seperti memilih membawa payung: jika cuaca mendung atau hujan, bawa payung; jika cerah, pakai kacamata hitam.',
        codeSnippets: [
          {
            id: 'contoh-if-else',
            title: 'Logika Penentu Status Boros atau Aman',
            code: `pengeluaran_hari_ini = 125000
jatah_harian = 100000

if pengeluaran_hari_ini > jatah_harian:
    print("Status: BOROS! (Melebihi jatah harian)")
else:
    print("Status: AMAN (Sesuai rencana)")`,
            explanation: 'Karena 125000 lebih besar dari 100000, kondisi if terpenuhi dan tulisan BOROS dicetak.',
            output: `Status: BOROS! (Melebihi jatah harian)`,
          },
        ],
      },
      {
        id: 'langkah-6-wadah-data',
        title: 'Langkah 6: Wadah Banyak Data (List & Dictionary)',
        content: `Dalam satu bulan, ada puluhan transaksi. Kita tidak mungkin membuat variabel \`transaksi1\`, \`transaksi2\`, \`transaksi3\`, dst.

Kita menggunakan dua struktur data hebat:
1. **List \`[]\`**: Menyimpan urutan barang/data.
2. **Dictionary \`{}\`**: Menyimpan data berlabel (key-value) untuk satu transaksi, misalnya hari, kategori, dan jumlah.`,
        codeSnippets: [
          {
            id: 'contoh-list-dict',
            title: 'Menyimpan Catatan Transaksi di Dictionary dan List',
            code: `daftar_transaksi = []

transaksi_1 = {
    "hari": 1,
    "kategori": "Makan",
    "jumlah": 85000
}

daftar_transaksi.append(transaksi_1)
print(f"Jumlah transaksi tersimpan: {len(daftar_transaksi)}")
print(f"Transaksi pertama: {daftar_transaksi[0]['kategori']} sebesar Rp {daftar_transaksi[0]['jumlah']}")`,
            explanation: 'append() memasukkan dictionary transaksi_1 ke dalam list daftar_transaksi.',
            output: `Jumlah transaksi tersimpan: 1\nTransaksi pertama: Makan sebesar Rp 85000`,
          },
        ],
      },
      {
        id: 'langkah-7-perulangan',
        title: 'Langkah 7: Perulangan (for & while)',
        content: `- Perulangan **\`for\`**: Dipakai untuk memeriksa satu per satu transaksi yang ada di dalam list (misalnya untuk menghitung total pengeluaran).
- Perulangan **\`while True\`**: Dipakai untuk terus memunculkan menu aplikasi sampai pengguna memilih keluar (menu 0).`,
        codeSnippets: [
          {
            id: 'contoh-for-loop',
            title: 'Menjumlahkan Total Belanja dengan for Loop',
            code: `daftar_harga = [25000, 15000, 45000]
total = 0

for harga in daftar_harga:
    total += harga

print(f"Total pengeluaran: Rp {total}")`,
            explanation: 'Perulangan for mengambil tiap angka dari daftar_harga dan menambahkannya ke variabel total.',
            output: `Total pengeluaran: Rp 85000`,
          },
        ],
      },
      {
        id: 'langkah-8-fungsi',
        title: 'Langkah 8: Membungkus Kode dalam Fungsi (def & return)',
        content: `Fungsi adalah sekumpulan baris perintah yang diberi nama dengan kata kunci \`def\`. Jika kamu butuh menghitung sisa saldo di banyak tempat, kamu tinggal memanggil nama fungsinya. Perintah \`return\` mengembalikan hasil perhitungannya.`,
        codeSnippets: [
          {
            id: 'contoh-fungsi',
            title: 'Membuat dan Memanggil Fungsi',
            code: `def hitung_saldo(anggaran, total_keluar):
    sisa = anggaran - total_keluar
    return sisa

hasil = hitung_saldo(3000000, 85000)
print(f"Sisa uang: Rp {hasil}")`,
            explanation: 'Fungsi hitung_saldo menerima 2 parameter, menghitung selisihnya, dan mengembalikan sisa.',
            output: `Sisa uang: Rp 2915000`,
          },
        ],
      },
      {
        id: 'langkah-9-import',
        title: 'Langkah 9: Membagi File dengan Perintah import',
        content: `Ketika kita punya file \`pencatat.py\` dan \`main.py\`, file \`main.py\` bisa menggunakan seluruh fungsi di \`pencatat.py\` hanya dengan mengetik:
\`import pencatat\`

Lalu memanggil fungsinya:
\`pencatat.atur_anggaran(3000000, 30)\`
Inilah rahasia modularitas kode kita!`,
        codeSnippets: [
          {
            id: 'contoh-import',
            title: 'Memanggil Modul Lain',
            code: `# Di file main.py:
import pencatat

pencatat.atur_anggaran(3000000, 30)
print(f"Jatah harian dari pencatat: {pencatat.hitung_jatah_harian()}")`,
            explanation: 'Dengan import pencatat, main.py bebas memanggil fungsi yang tinggal di dalam pencatat.py.',
            output: `Jatah harian dari pencatat: 100000`,
          },
        ],
      },
    ],
    predictExercises: [
      {
        id: 'prediksi-bab3-pembagian-bulat',
        title: 'Tebak Hasil Pembagian Bulat //',
        prompt: 'Berapakah output dari potongan kode Python berikut ini?',
        code: `anggaran = 1500000
hari = 30
jatah = anggaran // hari
print(jatah)`,
        options: ['50000.0', '50000', '45000', '1500000 / 30'],
        correctAnswer: '50000',
        explanation:
          'Operator // menghasilkan pembagian bilangan bulat (integer), sehingga 1.500.000 // 30 menghasilkan angka 50000 tanpa titik desimal.',
      },
      {
        id: 'prediksi-bab3-tipe-input',
        title: 'Tebak Tipe Data input()',
        prompt: 'Perhatikan kode berikut. Apa yang akan dicetak oleh Python?',
        code: `a = "100"
b = "200"
print(a + b)`,
        options: ['300', '"300"', '100200', 'Error'],
        correctAnswer: '100200',
        explanation:
          'Karena a dan b diapit tanda petik, keduanya bertipe String. Operator + pada String menyambungkan kedua teks tersebut menjadi "100200", bukan menjumlahkannya!',
      },
    ],
    fillInBlankExercises: [
      {
        id: 'fill-bab3-def-return',
        title: 'Lengkapi Kata Kunci Fungsi',
        prompt: 'Lengkapi kata kunci yang digunakan untuk mengembalikan nilai dari sebuah fungsi:',
        templateCode: `def hitung_saldo(anggaran, keluar):
    sisa = anggaran - keluar
    _____ sisa`,
        missingToken: 'return',
        explanation: 'Kata kunci return digunakan untuk mengirimkan hasil perhitungan fungsi ke pemanggilnya.',
        hint1: 'Bahasa Inggris untuk "mengembalikan"',
        hint2: 'Diawali huruf r dan berakhiran n',
      },
    ],
    quiz: [
      {
        id: 'q-bab3-1',
        question: 'Tipe data manakah yang cocok untuk menyimpan catatan kategori pengeluaran seperti "Transportasi Kampus"?',
        options: ['int', 'float', 'str (String)', 'bool'],
        correctIndex: 2,
        explanation: 'String (str) digunakan untuk menyimpan teks dan kata-kata yang diapit tanda petik.',
      },
      {
        id: 'q-bab3-2',
        question: 'Mengapa kita perlu menggunakan fungsi int() pada hasil input() dari pengguna?',
        options: [
          'Agar program berjalan lebih cepat',
          'Karena fungsi input() selalu menghasilkan teks (string), sehingga harus diubah ke integer agar bisa dihitung matematika',
          'Hanya sebagai formalitas agar tidak ada peringatan kuning',
          'Karena Python tidak mendukung angka di terminal',
        ],
        correctIndex: 1,
        explanation:
          'Fungsi input() selalu membaca ketikan pengguna sebagai teks. Tanpa int(), komputer tidak bisa melakukan pengurangan atau penambahan uang.',
      },
      {
        id: 'q-bab3-3',
        question: 'Struktur data apa yang paling pas untuk menyimpan detail satu transaksi (hari, kategori, dan jumlah uang)?',
        options: [
          'Dictionary dengan pasangan key-value seperti {"kategori": "Makan", "jumlah": 25000}',
          'Variabel boolean True/False',
          'Float',
          'Perulangan while',
        ],
        correctIndex: 0,
        explanation:
          'Dictionary memudahkan kita memberi label nama pada setiap data (misal "kategori" dan "jumlah").',
      },
    ],
    summaryPoints: [
      'print() untuk mencetak teks; variabel untuk menyimpan nilai dengan tipe str, int, atau float.',
      'input() menghasilkan string; ubah dengan int() jika ingin dihitung sebagai uang.',
      'Operator // menghasilkan pembagian bilangan bulat yang pas untuk jatah harian.',
      'Percabangan if/else menentukan status boros atau aman.',
      'List menyimpan deretan transaksi; dictionary menyimpan detail satu transaksi.',
      'for mengulang isi list; while mengulang menu utama.',
      'def membungkus logika ke dalam fungsi dan return mengembalikan hasilnya.',
      'import menghubungkan kode dari file lain.',
    ],
    prevChapterId: 'bab-2',
    nextChapterId: 'bab-4',
  },

  // =========================================================================
  // BAB 4: BEDAH PENCATAT.PY
  // =========================================================================
  {
    id: 'bab-4',
    number: 4,
    title: 'Bedah pencatat.py',
    subtitle: 'Mengelola Data Keuangan, Variabel Global, dan Logika Perhitungan Matematika',
    description:
      'Di bab ini, kita membedah isi file pertama dari proyek kita: pencatat.py. File ini adalah otak akuntansi yang menyimpan data anggaran, transaksi, dan seluruh rumus perhitungan keuangan mahasiswa.',
    learningGoals: [
      'Memahami variabel data inti yang dikelola oleh pencatat.py.',
      'Mempelajari cara kerja fungsi atur_anggaran(), hitung_jatah_harian(), dan tambah_transaksi().',
      'Mempelajari cara kerja fungsi hitung_total_pengeluaran(), hitung_sisa_saldo(), dan hitung_pengeluaran_hari_ini().',
    ],
    sections: [
      {
        id: 'peran-pencatat',
        title: '1. Peran dan Tanggung Jawab pencatat.py',
        content: `Ingat perumpamaan kita di Bab 1: **pencatat.py adalah Koki di dapur**.
File ini:
- **TIDAK PERNAH** meminta input keyboard pengguna (\`input()\`).
- **TIDAK PERNAH** menampilkan teks menu utama.
- Tugasnya murni satu hal: **menerima data, menyimpannya di wadah yang aman, dan menghitung hasil angka saat diminta**.

Dengan cara ini, jika di masa depan kita ingin mengubah tampilan aplikasi (misalnya membuat versi web atau mobile), file \`pencatat.py\` tidak perlu diubah sama sekali!`,
      },
      {
        id: 'variabel-inti-pencatat',
        title: '2. Variabel Inti di Bagian Paling Atas',
        content: `Di awal file \`pencatat.py\`, kita mendeklarasikan lima variabel utama yang menjadi status memori program kita:`,
        codeSnippets: [
          {
            id: 'kode-variabel-pencatat',
            title: 'Variabel Awal pencatat.py',
            code: `anggaran_bulanan = 0
jumlah_hari = 30
hari_aktif = 1
jatah_harian = 0
daftar_transaksi = []`,
            explanation:
              'Variabel ini bertindak sebagai basis data sederhana di memori komputer selama program berjalan.',
            lineExplanations: [
              { line: 1, code: 'anggaran_bulanan = 0', explanation: 'Menampung total uang awal (misal: 3000000).' },
              { line: 2, code: 'jumlah_hari = 30', explanation: 'Rencana jangka waktu pemakaian uang (biasanya 30 hari).' },
              { line: 3, code: 'hari_aktif = 1', explanation: 'Penanda hari ke berapa mahasiswa sedang berada sekarang (mulai dari hari 1).' },
              { line: 4, code: 'jatah_harian = 0', explanation: 'Hasil bagi anggaran_bulanan // jumlah_hari.' },
              { line: 5, code: 'daftar_transaksi = []', explanation: 'List kosong yang siap menampung catatan belanja satu demi satu.' },
            ],
          },
        ],
      },
      {
        id: 'fungsi-atur-anggaran',
        title: '3. Fungsi atur_anggaran(anggaran, hari=30)',
        content: `Fungsi ini dipanggil ketika mahasiswa pertama kali menentukan anggaran.
Perhatikan kata kunci \`global\`: kata kunci ini memberitahukan Python bahwa fungsi ini ingin mengubah nilai variabel yang ada di luar fungsi (variabel tingkat modul).`,
        codeSnippets: [
          {
            id: 'kode-atur-anggaran',
            title: 'Fungsi atur_anggaran()',
            code: `def atur_anggaran(anggaran, hari=30):
    global anggaran_bulanan, jumlah_hari, jatah_harian
    anggaran_bulanan = anggaran
    jumlah_hari = hari
    if jumlah_hari > 0:
        jatah_harian = anggaran_bulanan // jumlah_hari
    else:
        jatah_harian = 0`,
            explanation: 'Menyimpan nilai anggaran, lalu otomatis menghitung jatah_harian jika jumlah_hari lebih dari nol.',
            lineExplanations: [
              { line: 1, code: 'def atur_anggaran(anggaran, hari=30):', explanation: 'Parameter hari memiliki nilai bawaan (default) 30 jika tidak diisi.' },
              { line: 2, code: 'global anggaran_bulanan, jumlah_hari, jatah_harian', explanation: 'Mengizinkan fungsi memodifikasi variabel di level modul.' },
              { line: 5, code: 'jatah_harian = anggaran_bulanan // jumlah_hari', explanation: 'Pembagian bulat agar jatah harian rapi dalam nominal rupiah.' },
            ],
          },
        ],
      },
      {
        id: 'fungsi-tambah-transaksi',
        title: '4. Fungsi tambah_transaksi(kategori, jumlah, catatan)',
        content: `Setiap kali mahasiswa belanja, fungsi ini membungkus data belanja ke dalam satu Dictionary berlabel rapi, lalu menyimpannya ke dalam list \`daftar_transaksi\`.`,
        codeSnippets: [
          {
            id: 'kode-tambah-transaksi',
            title: 'Fungsi tambah_transaksi()',
            code: `def tambah_transaksi(kategori, jumlah, catatan=""):
    transaksi_baru = {
        "hari": hari_aktif,
        "kategori": kategori,
        "jumlah": jumlah,
        "catatan": catatan
    }
    daftar_transaksi.append(transaksi_baru)`,
            explanation: 'Membuat dictionary transaksi dengan kunci: hari, kategori, jumlah, dan catatan, lalu menambahkannya ke list.',
          },
        ],
      },
      {
        id: 'fungsi-perhitungan',
        title: '5. Fungsi Perhitungan: Total Pengeluaran, Sisa Saldo, & Pengeluaran Hari Ini',
        content: `Ketiga fungsi ini bertugas menghitung akumulasi angka:
- \`hitung_total_pengeluaran()\`: Menjumlahkan semua uang yang pernah keluar dari hari ke-1 sampai hari ini.
- \`hitung_sisa_saldo()\`: Mengurangi anggaran awal dengan total pengeluaran.
- \`hitung_pengeluaran_hari_ini(hari)\`: Khusus menjumlahkan transaksi yang terjadi pada hari tertentu saja!`,
        codeSnippets: [
          {
            id: 'kode-hitung-total-dan-hari',
            title: 'Fungsi Perhitungan di pencatat.py',
            code: `def hitung_total_pengeluaran():
    total = 0
    for t in daftar_transaksi:
        total += t["jumlah"]
    return total

def hitung_sisa_saldo():
    return anggaran_bulanan - hitung_total_pengeluaran()

def hitung_pengeluaran_hari_ini(hari=None):
    if hari is None:
        hari = hari_aktif
    total_hari = 0
    for t in daftar_transaksi:
        if t["hari"] == hari:
            total_hari += t["jumlah"]
    return total_hari`,
            explanation: 'Perhatikan perulangan for t in daftar_transaksi: t["jumlah"] mengambil nominal uang dari tiap dictionary.',
          },
        ],
      },
    ],
    predictExercises: [
      {
        id: 'prediksi-bab4-sisa-saldo',
        title: 'Prediksi Sisa Saldo',
        prompt: 'Jika anggaran awal diatur 2.000.000 dan daftar_transaksi berisi dua pengeluaran: 50.000 dan 30.000, berapa nilai yang dikembalikan oleh hitung_sisa_saldo()?',
        code: `# Anggaran: 2000000
# Transaksi 1: 50000
# Transaksi 2: 30000
sisa = hitung_sisa_saldo()
print(sisa)`,
        options: ['1920000', '1950000', '2080000', '1970000'],
        correctAnswer: '1920000',
        explanation:
          'Total pengeluaran adalah 50.000 + 30.000 = 80.000. Maka sisa saldo = 2.000.000 - 80.000 = 1.920.000.',
      },
    ],
    quiz: [
      {
        id: 'q-bab4-1',
        question: 'Mengapa kata kunci `global` digunakan di dalam fungsi atur_anggaran()?',
        options: [
          'Agar fungsi bisa diakses oleh komputer lain di internet',
          'Untuk memberi tahu Python bahwa fungsi ingin memodifikasi variabel di tingkat modul (di luar fungsi)',
          'Untuk mempercepat waktu eksekusi kode',
          'Karena Python mewajibkan semua variabel memakai kata global',
        ],
        correctIndex: 1,
        explanation:
          'Di Python, jika sebuah fungsi ingin mengubah nilai variabel yang berada di luar cakupan fungsi (scope modul), variabel tersebut harus dideklarasikan dengan `global`.',
      },
      {
        id: 'q-bab4-2',
        question: 'Bagaimana fungsi hitung_pengeluaran_hari_ini() hanya menghitung transaksi pada hari aktif?',
        options: [
          'Dengan menghapus transaksi di hari sebelumnya',
          'Dengan memeriksa kondisi `if t["hari"] == hari:` di dalam perulangan for',
          'Dengan mematikan komputer setiap malam',
          'Dengan membatasi panjang list maksimal 1',
        ],
        correctIndex: 1,
        explanation:
          'Fungsi melakukan filter dengan mengecek nilai kunci `"hari"` pada setiap dictionary transaksi di dalam list.',
      },
    ],
    summaryPoints: [
      'pencatat.py bertanggung jawab mengelola data dan perhitungan keuangan.',
      'Data disimpan dalam list daftar_transaksi sebagai dictionary.',
      'Fungsi hitung_sisa_saldo() mengurangi anggaran_bulanan dengan total seluruh pengeluaran.',
      'Fungsi hitung_pengeluaran_hari_ini() hanya menjumlahkan transaksi pada hari yang aktif.',
    ],
    prevChapterId: 'bab-3',
    nextChapterId: 'bab-5',
  },

  // =========================================================================
  // BAB 5: BEDAH LAPORAN.PY
  // =========================================================================
  {
    id: 'bab-5',
    number: 5,
    title: 'Bedah laporan.py',
    subtitle: 'Fungsi Laporan, Peringatan Status Boros/Aman, dan Validasi Input Pengguna',
    description:
      'File kedua, laporan.py, adalah desainer tampilan dan satpam penjaga input program. Di bab ini kita membedah cara memformat angka Rupiah, menentukan status peringatan, dan mencegah program crash akibat salah ketik.',
    learningGoals: [
      'Memahami cara memformat angka bulat menjadi teks mata uang Rupiah yang rapi (format_rupiah).',
      'Memahami logika ambang batas persentase status harian: AMAN, WASPADA, dan BOROS (cek_status_harian).',
      'Mempelajari cara menyajikan ringkasan keuangan dan laporan per kategori pengeluaran.',
      'Memahami teknik validasi input (validasi_angka_positif) agar program tidak pernah crash.',
    ],
    sections: [
      {
        id: 'peran-laporan',
        title: '1. Peran dan Tanggung Jawab laporan.py',
        content: `Jika \`pencatat.py\` adalah koki di dapur, maka **laporan.py adalah pelayan dan penata hidangan di meja makan**.

Tugas utamanya:
1. **Mempercantik angka**: Mengubah \`1500000\` menjadi \`Rp 1.500.000\`.
2. **Memberi lampu indikator**: Mengecek apakah hari ini mahasiswa belanja wajar atau kelewat batas.
3. **Mencetak kartu laporan**: Membuat garis pembatas yang rapi di terminal.
4. **Menjaga pintu gerbang (Validasi)**: Mencegah pengguna memasukkan huruf atau angka minus yang bisa merusak hitungan.`,
      },
      {
        id: 'fungsi-format-rupiah',
        title: '2. Fungsi format_rupiah(angka)',
        content: `Di Python, f-string punya trik cerdas: \`f"{angka:,}"\` secara otomatis memberikan pemisah koma ribuan (gaya Amerika: \`1,500,000\`).
Lalu kita ganti tanda koma tersebut menjadi titik gaya Indonesia menggunakan \`.replace(",", ".")\`:`,
        codeSnippets: [
          {
            id: 'kode-format-rupiah',
            title: 'Fungsi format_rupiah()',
            code: `def format_rupiah(angka):
    teks = f"{angka:,}".replace(",", ".")
    return f"Rp {teks}"

# Contoh pemanggilan:
print(format_rupiah(3000000))  # Output: Rp 3.000.000
print(format_rupiah(85000))    # Output: Rp 85.000`,
            explanation: 'Mengubah bilangan bulat apa pun menjadi string berformat rupiah yang sangat mudah dibaca.',
            output: `Rp 3.000.000\nRp 85.000`,
          },
        ],
      },
      {
        id: 'fungsi-cek-status',
        title: '3. Logika Ambang Batas: cek_status_harian()',
        content: `Bagaimana program tahu seorang mahasiswa sedang boros atau hemat?
Program menghitung persentase belanja terhadap jatah harian:
\`persentase = (pengeluaran_hari_ini / jatah_harian) * 100\`

Tiga kondisi status:
- **<= 70%** : \`"AMAN (Pengeluaran terjaga dengan baik)"\`
- **> 70% dan <= 100%** : \`"WASPADA (Mendekati batas jatah harian!)"\`
- **> 100%** : \`"BOROS! (Melebihi jatah harian hari ini!)"\``,
        codeSnippets: [
          {
            id: 'kode-cek-status-harian',
            title: 'Logika Peringatan di laporan.py',
            code: `def cek_status_harian(pengeluaran_hari_ini, jatah_harian):
    if jatah_harian == 0:
        return "BELUM DIATUR"
    
    persentase = (pengeluaran_hari_ini / jatah_harian) * 100

    if persentase <= 70:
        return "AMAN (Pengeluaran terjaga dengan baik)"
    elif persentase <= 100:
        return "WASPADA (Mendekati batas jatah harian!)"
    else:
        return "BOROS! (Melebihi jatah harian hari ini!)"`,
            explanation: 'Struktur if-elif-else membandingkan rasio pengeluaran harian terhadap jatah yang ditetapkan.',
          },
        ],
      },
      {
        id: 'validasi-input',
        title: '4. Satpam Pintu Masuk: validasi_angka_positif()',
        content: `Apa yang terjadi jika program meminta nominal uang, lalu pengguna salah ketik \`"dua puluh ribu"\` atau \`-50000\`?
Jika kita langsung memanggil \`int("dua puluh ribu")\`, program akan langsung **CRASH** dengan error \`ValueError\`!

Untuk mencegah hal itu, kita buat fungsi validasi dengan loop \`while True\` yang memeriksa \`.isdigit()\`:`,
        codeSnippets: [
          {
            id: 'kode-validasi-angka',
            title: 'Fungsi validasi_angka_positif()',
            code: `def validasi_angka_positif(teks_input):
    while True:
        isi = input(teks_input).strip()
        if isi.isdigit():
            nilai = int(isi)
            if nilai > 0:
                return nilai
            print("[!] Angka harus lebih besar dari 0.")
        else:
            print("[!] Masukkan hanya angka bulat positif!")`,
            explanation:
              'Jika pengguna mengetik huruf atau nilai negatif, program tidak crash, melainkan menampilkan pesan peringatan ramah dan mengulang pertanyaan sampai pengguna memasukkan angka yang benar.',
          },
        ],
      },
    ],
    predictExercises: [
      {
        id: 'prediksi-bab5-status',
        title: 'Prediksi Status Harian',
        prompt: 'Jika jatah harian adalah Rp100.000 dan pengeluaran hari ini Rp60.000, status manakah yang dikembalikan oleh cek_status_harian()?',
        code: `status = cek_status_harian(60000, 100000)
print(status)`,
        options: ['BOROS!', 'WASPADA', 'AMAN (Pengeluaran terjaga dengan baik)', 'BELUM DIATUR'],
        correctAnswer: 'AMAN (Pengeluaran terjaga dengan baik)',
        explanation:
          'Persentase pengeluaran adalah (60.000 / 100.000) * 100 = 60%. Karena 60% <= 70%, maka status yang dikembalikan adalah AMAN.',
      },
    ],
    quiz: [
      {
        id: 'q-bab5-1',
        question: 'Apa fungsi dari method .isdigit() pada string di Python?',
        options: [
          'Mengubah teks menjadi angka secara otomatis',
          'Memeriksa apakah seluruh karakter dalam string hanya terdiri dari digit angka 0-9',
          'Menghapus spasi di awal dan akhir string',
          'Menghitung jumlah digit dalam dompet',
        ],
        correctIndex: 1,
        explanation:
          '.isdigit() mengembalikan True jika string hanya memuat digit angka murni, dan False jika ada huruf atau simbol lain.',
      },
      {
        id: 'q-bab5-2',
        question: 'Mengapa validasi input sangat penting dalam program interaktif?',
        options: [
          'Agar program terlihat canggih di depan teman',
          'Mencegah program crash tiba-tiba saat pengguna salah mengetik huruf atau angka negatif',
          'Wajib dicantumkan agar nilai ujian otomatis 100',
          'Karena Python tidak bisa membaca input lebih dari satu baris',
        ],
        correctIndex: 1,
        explanation:
          'Validasi input memastikan data yang masuk selalu bersih dan aman untuk diproses, sehingga program tidak mati mendadak karena error.',
      },
    ],
    summaryPoints: [
      'laporan.py mengurus tampilan, status peringatan, dan validasi masukan.',
      'format_rupiah() merapikan angka ke gaya Rupiah dengan pemisah titik.',
      'cek_status_harian() mengklasifikasikan belanja menjadi AMAN (<=70%), WASPADA (<=100%), dan BOROS (>100%).',
      'validasi_angka_positif() menjaga program tetap berjalan stabil meskipun pengguna salah ketik.',
    ],
    prevChapterId: 'bab-4',
    nextChapterId: 'bab-6',
  },

  // =========================================================================
  // BAB 6: BEDAH MAIN.PY
  // =========================================================================
  {
    id: 'bab-6',
    number: 6,
    title: 'Bedah main.py',
    subtitle: 'Menu Utama CLI, Interaksi Pengguna, dan Penghubung Antar File',
    description:
      'File ketiga, main.py, adalah resepsionis sekaligus dirigen orchestra program kita. Di bab ini kita membedah alur menu, perulangan interaktif, dan cara menghubungkan fungsi dari pencatat.py serta laporan.py.',
    learningGoals: [
      'Memahami cara kerja perulangan menu utama menggunakan while True.',
      'Melihat bagaimana import pencatat dan import laporan bekerja sama secara harmonis.',
      'Memahami logika percabangan menu [1] sampai [5] dan cara keluar dengan menu [0].',
    ],
    sections: [
      {
        id: 'peran-main',
        title: '1. Peran dan Tanggung Jawab main.py',
        content: `\`main.py\` adalah file yang pertama kali kita sentuh saat menjalankan:
\`python main.py\`

Tugas \`main.py\` adalah menjadi **jembatan penghubung (orkestrator)**:
- Menyapa pengguna dan mencetak menu 0 sampai 5.
- Menerima pilihan angka dari pengguna.
- Memanggil fungsi yang relevan dari \`pencatat.py\` untuk menyimpan atau menghitung data.
- Memanggil fungsi yang relevan dari \`laporan.py\` untuk menampilkan data secara cantik di layar.
- Terus mengulang menu sampai pengguna mengetik \`0\` untuk keluar (\`break\`).`,
      },
      {
        id: 'menu-cli',
        title: '2. Tampilan Menu Utama dan Perulangan while True',
        content: `Program interaktif terminal menggunakan pola umum:
\`while True:\`
  \`tampilkan_menu()\`
  \`pilihan = input("Pilih menu: ")\`
  \`if pilihan == "1": ...\`
  \`elif pilihan == "0": break\`

Pernyataan \`break\` adalah rem darurat yang menghentikan loop dan keluar dari program dengan sopan.`,
        codeSnippets: [
          {
            id: 'kode-menu-main',
            title: 'Struktur Menu Utama di main.py',
            code: `import pencatat
import laporan

def tampilkan_menu():
    print("========================================")
    print(" PENCATAT KEUANGAN MAHASISWA (PYTHON)")
    print("========================================")
    print(" [1] Atur Anggaran Awal")
    print(" [2] Catat Pengeluaran Baru")
    print(" [3] Lihat Ringkasan & Status Hari Ini")
    print(" [4] Lihat Laporan per Kategori")
    print(" [5] Ganti ke Hari Berikutnya")
    print(" [0] Keluar dari Program")
    print("========================================")`,
            explanation: 'Fungsi tampilkan_menu() mencetak 6 pilihan menu bernomor yang jelas bagi pengguna.',
          },
        ],
      },
      {
        id: 'menghubungkan-dua-file',
        title: '3. Bagaimana main.py Menghubungkan Dua File Lainnya',
        content: `Perhatikan contoh pada Menu [3] (Lihat Ringkasan):
1. \`main.py\` meminta angka total dari \`pencatat.py\`:
   \`total_keluar = pencatat.hitung_total_pengeluaran()\`
   \`sisa_saldo = pencatat.hitung_sisa_saldo()\`
2. Lalu \`main.py\` menyerahkan angka-angka tersebut ke \`laporan.py\` untuk dicetak:
   \`laporan.tampilkan_ringkasan(..., total_keluar, sisa_saldo, ...)\`

Lihat betapa indahnya kerja sama ini: \`main.py\` tidak perlu tahu rumus hitungan saldo, dan \`laporan.py\` tidak perlu mengurusi penyimpanan list transaksi. Masing-masing fokus pada bidang keahliannya!`,
        codeSnippets: [
          {
            id: 'kode-menu-3-ringkasan',
            title: 'Potongan Logika Menu [3] di main.py',
            code: `elif pilihan == "3":
    total_keluar = pencatat.hitung_total_pengeluaran()
    sisa_saldo = pencatat.hitung_sisa_saldo()
    pengeluaran_hari = pencatat.hitung_pengeluaran_hari_ini()
    jatah = pencatat.hitung_jatah_harian()

    # Kirim ke laporan untuk dicetak rapi
    laporan.tampilkan_ringkasan(
        pencatat.anggaran_bulanan,
        total_keluar,
        sisa_saldo,
        pencatat.hari_aktif,
        pengeluaran_hari,
        jatah
    )`,
            explanation: 'main.py mengorkestrasi pertukaran data dari pencatat ke laporan dengan sangat elegan.',
          },
        ],
      },
    ],
    predictExercises: [
      {
        id: 'prediksi-bab6-break-loop',
        title: 'Tebak Perilaku Perintah break',
        prompt: 'Apa yang terjadi pada loop "while True:" ketika pengguna memilih menu "0" yang berisi perintah "break"?',
        code: `if pilihan == "0":
    print("Terima kasih!")
    break`,
        options: [
          'Program mengulang lagi ke baris pertama',
          'Perulangan berhenti seketika dan program selesai',
          'File main.py terhapus otomatis',
          'Komputer melakukan restart',
        ],
        correctAnswer: 'Perulangan berhenti seketika dan program selesai',
        explanation:
          'Perintah break langsung menghentikan perulangan (loop) tempat ia berada, sehingga alur keluar dari while True dan program berakhir.',
      },
    ],
    quiz: [
      {
        id: 'q-bab6-1',
        question: 'Apa peran file main.py dalam arsitektur program tiga file kita?',
        options: [
          'Menghitung bunga bank mahasiswa',
          'Sebagai entry point yang menyajikan menu utama dan mengoordinasikan modul pencatat dan laporan',
          'Hanya sebagai file cadangan jika pencatat.py rusak',
          'Mengunduh pembaruan dari internet',
        ],
        correctIndex: 1,
        explanation:
          'main.py bertindak sebagai koordinator antarmuka CLI yang menghubungkan input pengguna dengan logika di file lainnya.',
      },
      {
        id: 'q-bab6-2',
        question: 'Apa fungsi baris `if __name__ == "__main__": main()` di akhir file main.py?',
        options: [
          'Memastikan fungsi main() hanya dijalankan jika file main.py dieksekusi secara langsung oleh pengguna',
          'Mewajibkan pengguna memasukkan kata sandi',
          'Mengubah nama pengguna menjadi administrator',
          'Menghapus variabel di memori',
        ],
        correctIndex: 0,
        explanation:
          'Pola standar Python ini memastikan fungsi main() otomatis berjalan jika file dijalankan langsung via `python main.py`.',
      },
    ],
    summaryPoints: [
      'main.py adalah pintu masuk utama program.',
      'while True memastikan menu terus tampil sampai pengguna mengetik menu 0.',
      'main.py mengimpor pencatat dan laporan, bertindak sebagai dirigen yang menghubungkan keduanya.',
    ],
    prevChapterId: 'bab-5',
    nextChapterId: 'bab-7',
  },

  // =========================================================================
  // BAB 7: MENGIKUTI JALANNYA PROGRAM
  // =========================================================================
  {
    id: 'bab-7',
    number: 7,
    title: 'Mengikuti Jalannya Program',
    subtitle: 'Simulasi Alur Kerja Nyata Langkah demi Langkah dan Perubahan Status Data di Memori',
    description:
      'Di bab ini, kita menelusuri skenario nyata mahasiswa dari hari ke hari: bagaimana data berubah saat anggaran dimasukkan, belanja makan dicatat, jatah harian terlampaui menjadi BOROS, hingga berganti ke hari berikutnya.',
    learningGoals: [
      'Memahami siklus hidup data: input pengguna -> pemrosesan logika -> perubahan nilai di memori -> output terminal.',
      'Menelusuri skenario realistis: anggaran Rp3.000.000, belanja Makan Rp85.000, belanja Transport Rp40.000, lalu pindah ke Hari ke-2.',
      'Melihat secara visual nilai variabel sebelum vs sesudah setiap aksi dilakukan.',
    ],
    sections: [
      {
        id: 'mengapa-perlu-trace',
        title: '1. Mengapa Kita Harus Melacak Alur Program?',
        content: `Bagi pemula, kode komputer sering terlihat seperti teks mati. Namun begitu program dijalankan, variabel-variabel di memori komputer terus bergerak dan bertransformasi seperti air yang mengalir di pipa!

Dengan memahami apa yang terjadi di setiap langkah, kamu tidak lagi hanya "menghafal kode", melainkan **benar-benar memahami cara berpikir komputer**.`,
        analogy:
          'Seperti rekaman gerak lambat pertandingan sepak bola: kita bisa melihat bola dioper dari satu pemain ke pemain lain sampai masuk ke gawang.',
      },
      {
        id: 'skenario-mahasiswa',
        title: '2. Skenario Nyata Mahasiswa Rian di Awal Bulan',
        content: `Mari ikuti kisah mahasiswa bernama Rian:
1. **Langkah 1**: Rian baru dapat kiriman uang saku dan membuka program (\`python main.py\`).
2. **Langkah 2**: Rian memasukkan anggaran bulanan Rp3.000.000 untuk 30 hari. Program menghitung jatah harian: **Rp100.000**.
3. **Langkah 3**: Siang hari, Rian makan nasi padang dan es teh seharga **Rp85.000**. Total hari ini: Rp85.000. Status masih: **WASPADA** (85% jatah).
4. **Langkah 4**: Rian memeriksa ringkasan. Sisa saldo dompetnya: Rp2.915.000.
5. **Langkah 5**: Sore hari, hujan lebat sehingga Rian harus naik ojek online seharga **Rp40.000**.
6. **Langkah 6**: Total pengeluaran hari ini menjadi **Rp125.000**. Status berubah otomatis menjadi **BOROS!** karena melebihi jatah harian Rp100.000.
7. **Langkah 7**: Malam hari, Rian berganti ke **Hari ke-2**. Pengeluaran hari ini reset menjadi Rp0, tetapi sisa saldo tetap Rp2.875.000 dan histori transaksi tetap aman tersimpan!`,
      },
    ],
    sequenceExercise: {
      id: 'seq-bab7-alur',
      title: 'Susun Urutan Alur Penggunaan Program',
      prompt: 'Urutkan langkah-langkah penggunaan program pencatat keuangan mahasiswa berikut ke urutan yang benar dari awal sampai akhir:',
      explanation: 'Urutan yang logis: Pengguna membuka program di terminal, mengatur anggaran bulanan, mencatat transaksi belanja harian, melihat ringkasan keuangan, lalu berganti ke hari berikutnya saat hari berganti.',
      items: [
        { id: 'item-1', text: 'Jalankan python main.py di terminal', order: 1 },
        { id: 'item-2', text: 'Pilih Menu [1] untuk mengatur anggaran bulanan dan jumlah hari', order: 2 },
        { id: 'item-3', text: 'Pilih Menu [2] untuk mencatat transaksi belanja (kategori dan nominal)', order: 3 },
        { id: 'item-4', text: 'Pilih Menu [3] untuk memeriksa ringkasan sisa saldo dan status boros/aman', order: 4 },
        { id: 'item-5', text: 'Pilih Menu [5] untuk berpindah ke hari aktif berikutnya', order: 5 },
      ],
    },
    quiz: [
      {
        id: 'q-bab7-1',
        question: 'Ketika pengguna berpindah ke Hari ke-2 dengan memilih Menu [5], apa yang terjadi pada daftar transaksi Hari ke-1?',
        options: [
          'Seluruh transaksi Hari ke-1 otomatis terhapus',
          'Transaksi Hari ke-1 tetap tersimpan di dalam list daftar_transaksi, hanya variabel hari_aktif yang bertambah',
          'Program error dan harus diinstal ulang',
          'Anggaran bulanan otomatis berkurang menjadi nol',
        ],
        correctIndex: 1,
        explanation:
          'Data transaksi tersimpan permanen di dalam list selama program berjalan. Nilai `hari_aktif` berubah jadi 2, sehingga perhitungan harian fokus ke transaksi dengan `"hari": 2`.',
      },
      {
        id: 'q-bab7-2',
        question: 'Mengapa status pengeluaran berubah menjadi BOROS saat total pengeluaran mencapai Rp125.000 dari jatah Rp100.000?',
        options: [
          'Karena pengguna mengetik kata "boros" di catatan',
          'Karena nilai pengeluaran hari ini (125.000) lebih besar daripada jatah harian (100.000), memicu cabang else di cek_status_harian()',
          'Karena saldo rekening bank habis',
          'Karena hari sudah malam',
        ],
        correctIndex: 1,
        explanation:
          'Logika `if persentase > 100` terpenuhi (125%), sehingga program secara otomatis memberikan peringatan status BOROS!.',
      },
    ],
    summaryPoints: [
      'Alur kerja program menghubungkan aksi pengguna dengan perubahan memori data.',
      'Jatah harian dihitung sekali di awal dan menjadi tolok ukur status harian.',
      'Saat hari berganti, riwayat masa lalu tetap aman di dalam list transaksi.',
    ],
    prevChapterId: 'bab-6',
    nextChapterId: 'bab-8',
  },

  // =========================================================================
  // BAB 8: ERROR YANG SERING MUNCUL
  // =========================================================================
  {
    id: 'bab-8',
    number: 8,
    title: 'Error yang Sering Muncul',
    subtitle: 'Mengenali Pesan Error Python, Memahami Artinya, dan Cara Memperbaikinya dengan Tenang',
    description:
      'Jangan panik saat melihat tulisan merah di terminal! Error adalah sahabat terbaik programmer. Di bab ini, kita bedah 6 error yang paling sering dialami mahasiswa pemula beserta solusinya.',
    learningGoals: [
      'Mengubah cara pandang: error bukanlah kegagalan, melainkan petunjuk akurat dari Python.',
      'Mengenali 6 error klasik pemula: IndentationError, SyntaxError, NameError, TypeError, IndexError, ModuleNotFoundError.',
      'Membaca pesan traceback terminal untuk menemukan nomor baris kode yang perlu diperbaiki.',
    ],
    sections: [
      {
        id: 'filosofi-error',
        title: '1. Error Bukan Tanda Kamu Bodoh!',
        content: `Setiap programmer berpengalaman di dunia pasti menghadapi error puluhan kali setiap hari.
Bedanya, pemula biasanya panik dan mengira laptopnya rusak, sedangkan programmer berpengalaman langsung membaca **nama error** dan **nomor barisnya**.

Pesan error di Python disebut **Traceback**. Bagian paling penting biasanya ada di 2 baris paling bawah:
- Baris atasnya: Memberitahu nama file dan nomor baris (misal: \`File "pencatat.py", line 12\`).
- Baris bawahnya: Memberitahu nama penyakitnya (misal: \`SyntaxError: expected ':'\`).`,
        analogy:
          'Pesan error seperti lampu indikator di dasbor motor: jika lampu bensin berkedip merah, bukan berarti motornya rusak selamanya, kamu cuma perlu mengisi bensin!',
      },
      {
        id: 'enam-error-utama',
        title: '2. Enam Jenis Error yang Paling Sering Muncul di Modul Kita',
        content: `Berikut 6 error yang sering ditemui saat membuat program keuangan:

1. **IndentationError**: Spasi tab di awal baris tidak sejajar setelah tanda titik dua (\`:\`).
2. **SyntaxError**: Lupa tanda titik dua (\`:\`), kurung tutup kurang, atau tanda petik tidak berpasangan.
3. **NameError**: Salah ketik nama variabel atau fungsi (misal ketik \`Saldo\` padahal namanya \`saldo\`).
4. **TypeError**: Mengurangi teks (\`str\`) dengan angka (\`int\`) tanpa konversi \`int()\`.
5. **IndexError**: Meminta elemen list di nomor indeks yang tidak ada.
6. **ModuleNotFoundError**: File \`pencatat.py\` tidak berada di folder yang sama saat di-\`import\`.`,
      },
    ],
    predictExercises: [
      {
        id: 'prediksi-bab8-error-type',
        title: 'Identifikasi Jenis Error',
        prompt: 'Perhatikan kode berikut: x = "50000"; y = 20000; print(x - y). Error apa yang akan dimuntahkan oleh Python?',
        code: `x = "50000"  # String teks
y = 20000    # Integer angka
print(x - y)`,
        options: ['SyntaxError', 'TypeError', 'NameError', 'IndexError'],
        correctAnswer: 'TypeError',
        explanation:
          'Python akan melempar TypeError: unsupported operand type(s) for -: "str" and "int" karena operator minus (-) tidak bisa bekerja antara teks dan angka bulat.',
      },
    ],
    quiz: [
      {
        id: 'q-bab8-1',
        question: 'Jika terminal menampilkan pesan: "SyntaxError: expected \':\'" pada baris 5, apa yang harus kamu lakukan?',
        options: [
          'Menghapus seluruh file dan mulai dari awal lagi',
          'Membuka file tersebut di baris 5 dan menambahkan tanda titik dua (:) di akhir pernyataan def/if/for/while',
          'Menginstal ulang sistem operasi Windows',
          'Mengganti nama laptop',
        ],
        correctIndex: 1,
        explanation:
          'Pesan tersebut secara eksplisit menyatakan bahwa Python mengharapkan adanya tanda titik dua (:) di akhir baris tersebut.',
      },
      {
        id: 'q-bab8-2',
        question: 'Apa penyebab paling umum dari munculnya ModuleNotFoundError: No module named \'pencatat\'?',
        options: [
          'Python tidak punya lisensi berbayar',
          'File pencatat.py belum disimpan di folder yang sama dengan main.py, atau ada salah ketik nama file saat import',
          'File pencatat.py isinya terlalu panjang',
          'Komputer tidak terhubung ke WiFi',
        ],
        correctIndex: 1,
        explanation:
          'Python mencari file modul di folder kerja yang sama. Jika nama file salah ketik atau tersimpan di folder berbeda, modul tidak akan ditemukan.',
      },
    ],
    summaryPoints: [
      'Error adalah petunjuk, bukan kegagalan. Baca nomor baris dan nama error di bagian bawah traceback.',
      'IndentationError = rapikan spasi; SyntaxError = cek titik dua dan kurung.',
      'NameError = cek typo ejaan; TypeError = ubah tipe data dengan int(); ModuleNotFoundError = cek letak folder.',
    ],
    prevChapterId: 'bab-7',
    nextChapterId: 'bab-9',
  },

  // =========================================================================
  // BAB 9: LATIHAN MANDIRI
  // =========================================================================
  {
    id: 'bab-9',
    number: 9,
    title: 'Latihan Mandiri',
    subtitle: 'Tantangan Pengembangan Program untuk Melatih Kemandirian Coding',
    description:
      'Setelah memahami program standar, sekarang giliranmu menjadi programmer mandiri! Di bab ini, ada 3 tantangan modifikasi yang sesuai dengan materi modul untuk memperkaya fitur program keuanganmu.',
    learningGoals: [
      'Mempraktikkan modifikasi kode secara mandiri tanpa takut rusak.',
      'Tantangan 1: Menambah pilihan kategori baru (Kuliah/Buku, Hiburan, Kos).',
      'Tantangan 2: Mengubah ambang batas peringatan status (misal status Waspada di 80%).',
      'Tantangan 3: Menambahkan fungsi hitung rata-rata pengeluaran per hari.',
    ],
    sections: [
      {
        id: 'tantangan-1-kategori',
        title: 'Tantangan 1: Menambah Kategori Baru',
        content: `Di versi awal, kita punya kategori umum seperti "Makan" dan "Transport".
Mahasiswa sering punya kebutuhan lain, seperti:
- "Buku / Kuliah" (fotokopi, modul, praktikum)
- "Hiburan / Nongkrong"
- "Kos / Perlengkapan"

**Tugasmu**:
Buka file \`main.py\` pada Menu [2]. Tambahkan opsi kategori rekomendasi di layar agar pengguna diingatkan dengan pilihan kategori baru tersebut!`,
        codeSnippets: [
          {
            id: 'hint-kategori',
            title: 'Contoh Modifikasi di main.py (Menu 2)',
            code: `# Di menu [2]:
print("Pilihan kategori rekomendasi:")
print(" - Makan | Transport | Kuliah | Hiburan | Kos | Lainnya")
kategori = input("Nama kategori: ").strip().capitalize()`,
            explanation: 'Memberi panduan teks kepada pengguna agar kategori transaksi lebih rapi dan konsisten.',
          },
        ],
      },
      {
        id: 'tantangan-2-ambang-batas',
        title: 'Tantangan 2: Mengubah Ambang Batas Peringatan Status',
        content: `Di file \`laporan.py\`, ambang batas bawaan adalah:
- <= 70% : Aman
- <= 100% : Waspada
- > 100% : Boros

**Tugasmu**:
Ubah batas ini menjadi lebih ketat atau lebih longgar:
- Misalnya: Mahasiswa yang sangat hemat ingin status Aman maksimal hanya sampai **60%**, dan Waspada dari **61% hingga 90%**, sedangkan di atas 90% sudah dianggap Boros!`,
        codeSnippets: [
          {
            id: 'hint-ambang-batas',
            title: 'Solusi Modifikasi di laporan.py',
            code: `def cek_status_harian_ketat(pengeluaran, jatah):
    if jatah == 0:
        return "BELUM DIATUR"
    persen = (pengeluaran / jatah) * 100
    
    if persen <= 60:
        return "HEMAT JUARA (<= 60%)"
    elif persen <= 90:
        return "WASPADA (61% - 90%)"
    else:
        return "BAHAYA BOROS! (> 90%)"`,
            explanation: 'Cukup dengan mengubah angka perbandingan di if dan elif, logika status langsung menyesuaikan.',
          },
        ],
      },
      {
        id: 'tantangan-3-rata-rata',
        title: 'Tantangan 3: Menghitung Rata-rata Pengeluaran per Hari',
        content: `**Tugasmu**:
Tambahkan satu fungsi baru di \`pencatat.py\` bernama:
\`hitung_rata_rata_harian()\`

Rumusnya sangat sederhana:
\`rata_rata = hitung_total_pengeluaran() // hari_aktif\`
Jika mahasiswa sudah berjalan sampai Hari ke-3 dan total keluar Rp300.000, rata-ratanya adalah Rp100.000 per hari!`,
        codeSnippets: [
          {
            id: 'hint-rata-rata',
            title: 'Solusi Fungsi Baru di pencatat.py',
            code: `def hitung_rata_rata_harian():
    """Menghitung rata-rata pengeluaran per hari yang sudah berjalan."""
    if hari_aktif > 0:
        return hitung_total_pengeluaran() // hari_aktif
    return 0`,
            explanation: 'Perhatikan pengecekan if hari_aktif > 0 untuk mencegah ZeroDivisionError jika hari_aktif bernilai 0.',
          },
        ],
      },
    ],
    predictExercises: [
      {
        id: 'prediksi-bab9-rata-rata',
        title: 'Prediksi Hasil Rata-Rata',
        prompt: 'Jika hari_aktif bernilai 4 dan total pengeluaran adalah Rp240.000, berapa hasil dari 240000 // 4?',
        code: `total = 240000
hari = 4
rata_rata = total // hari
print(rata_rata)`,
        options: ['60000', '80000', '120000', '240000'],
        correctAnswer: '60000',
        explanation: '240.000 dibagi 4 adalah 60.000 rupiah per hari.',
      },
    ],
    quiz: [
      {
        id: 'q-bab9-1',
        question: 'Mengapa sebelum melakukan pembagian kita sebaiknya memeriksa apakah pembagi lebih besar dari nol?',
        options: [
          'Agar komputer tidak meledak',
          'Mencegah terjadinya ZeroDivisionError di Python saat membagi angka dengan nol',
          'Hanya kebiasaan kuno',
          'Karena angka nol tidak diakui dalam matematika',
        ],
        correctIndex: 1,
        explanation:
          'Di semua bahasa pemrograman, membagi angka dengan nol akan memicu error fatal (ZeroDivisionError di Python). Selalu cek `if penyebut > 0:`.',
      },
    ],
    summaryPoints: [
      'Memodifikasi kode sendiri adalah cara tercepat menjadi programmer mahir.',
      'Kamu bisa menambah kategori pengeluaran di main.py.',
      'Kamu bisa menyesuaikan batas toleransi boros/aman di laporan.py.',
      'Kamu bisa menambah fungsi analisis baru seperti hitung_rata_rata_harian() di pencatat.py.',
    ],
    prevChapterId: 'bab-8',
    nextChapterId: 'bab-10',
  },

  // =========================================================================
  // BAB 10: KAMUS ISTILAH
  // =========================================================================
  {
    id: 'bab-10',
    number: 10,
    title: 'Kamus Istilah',
    subtitle: 'Kumpulan Istilah Pemrograman Python Berbahasa Indonesia Sederhana',
    description:
      'Dunia koding penuh dengan istilah asing yang sering terdengar rumit. Di bab ini, kita rangkum seluruh istilah penting dari modul kita dengan definisi bahasa sehari-hari dan contoh nyata.',
    learningGoals: [
      'Memahami arti kata-kata kunci: Variabel, Fungsi, Parameter, Argumen, Return, List, Dictionary, Percabangan, Perulangan, Modularitas, Indentasi.',
      'Mampu menjelaskan istilah tersebut ke orang lain dengan perumpamaan sederhana tanpa jargon berbelit.',
    ],
    sections: [
      {
        id: 'pengantar-kamus',
        title: '1. Mengapa Perlu Menguasai Istilah?',
        content: `Ketika berbicara dengan dosen penguji, asisten praktikum, atau rekan kelompok, menggunakan istilah yang tepat akan membuat penjelasanmu terdengar profesional dan meyakinkan.
Namun di balik istilah keren tersebut, konsep aslinya sebenarnya sangat dekat dengan kehidupan kita sehari-hari!`,
      },
    ],
    quiz: [
      {
        id: 'q-bab10-1',
        question: 'Apakah perbedaan antara Parameter dan Argumen dalam fungsi Python?',
        options: [
          'Keduanya sama persis, tidak ada perbedaan sama sekali',
          'Parameter adalah variabel penampung di dalam definisi fungsi (def), sedangkan Argumen adalah nilai nyata yang dikirimkan saat memanggil fungsi',
          'Argumen selalu berupa angka, parameter selalu berupa teks',
          'Parameter hanya ada di bahasa C++',
        ],
        correctIndex: 1,
        explanation:
          'Contoh: Pada `def format_rupiah(angka):`, `angka` adalah parameter. Saat kita memanggil `format_rupiah(50000)`, `50000` adalah argumen.',
      },
    ],
    summaryPoints: [
      'Istilah pemrograman dibuat untuk menyederhanakan komunikasi teknis.',
      'Gunakan fitur pencarian istilah di halaman Kamus untuk menemukan arti istilah dalam hitungan detik.',
    ],
    prevChapterId: 'bab-9',
    nextChapterId: 'bab-11',
  },

  // =========================================================================
  // BAB 11: TIPS PRESENTASI
  // =========================================================================
  {
    id: 'bab-11',
    number: 11,
    title: 'Tips Presentasi',
    subtitle: 'Panduan Mendemonstrasikan Program dan Menjawab Pertanyaan Dosen dengan Percaya Diri',
    description:
      'Membuat program adalah setengah perjalanan; setengah perjalanan lagi adalah menyampaikannya dengan gemilang di depan dosen atau asisten lab. Di bab penutup ini, kita pelajari strategi demo dan bocoran pertanyaan ujian.',
    learningGoals: [
      'Menyiapkan laptop dan terminal sebelum maju presentasi agar bebas masalah teknis.',
      'Menyusun skenario live demo yang runtut dan logis di hadapan penguji.',
      'Menguasai jawaban untuk 4 pertanyaan jebakan yang paling sering diajukan dosen.',
      'Menggunakan kata kunci yang membuat dosen yakin kamu menulis kode sendiri, bukan copy-paste.',
    ],
    sections: [
      {
        id: 'persiapan-sebelum-maju',
        title: '1. Persiapan Sebelum Maju Presentasi',
        content: `Banyak mahasiswa gugup karena terminal tiba-tiba error di detik-detik terakhir. Lakukan checklist ini 10 menit sebelum giliranmu:
1. **Perbesar ukuran font terminal**: Tekan \`Ctrl + +\` di VS Code / terminal agar dosen di baris belakang bisa membaca teks dengan jelas.
2. **Bersihkan layar terminal**: Ketik \`cls\` (Windows) atau \`clear\` (Mac/Linux) sebelum memulai agar layar tampak bersih dan rapi.
3. **Pastikan berada di folder yang benar**: Ketik \`dir\` atau \`ls\` untuk memastikan file \`pencatat.py\`, \`laporan.py\`, dan \`main.py\` terlihat di folder tersebut.
4. **Tutup aplikasi lain**: Tutup tab browser game atau sosmed agar konsentrasi terjaga.`,
        analogy: 'Seperti koki yang menyiapkan pisau dan celemek bersih sebelum juri memasak datang memeriksa meja dapurnya.',
      },
      {
        id: 'skenario-demo-runtut',
        title: '2. Urutan Skenario Live Demo yang Memukau Dosen',
        content: `Jangan memencet menu secara acak! Dosen menyukai alur cerita (storytelling) yang logis:

- **Buka dengan salam & perkenalan masalah**:
  *"Selamat pagi Bapak/Ibu Dosen, program ini kami buat untuk menyelesaikan masalah klasik mahasiswa: kehabisan uang saku di akhir bulan karena tidak ada batasan belanja harian."*
- **Langkah 1**: Jalankan \`python main.py\`.
- **Langkah 2**: Atur Anggaran (Menu 1) -> Masukkan Rp3.000.000 untuk 30 hari. Tunjukkan jatah harian Rp100.000.
- **Langkah 3**: Catat belanja wajar (Menu 2) -> Makan Rp85.000. Buka ringkasan (Menu 3) dan tunjukkan status **WASPADA**.
- **Langkah 4**: Catat belanja kedua (Menu 2) -> Transport Rp40.000. Buka ringkasan lagi dan tunjukkan status **BOROS!** (Total Rp125.000 > jatah Rp100.000). Dosen akan terkesan melihat logika otomatis ini!
- **Langkah 5**: Pindah hari (Menu 5) ke Hari 2. Tunjukkan bahwa pengeluaran harian reset tapi riwayat total tetap tersimpan.
- **Langkah 6**: Tunjukkan Laporan Kategori (Menu 4) dan tutup dengan Menu 0 (Keluar).`,
      },
      {
        id: 'pertanyaan-dosen-dan-jawaban',
        title: '3. Bocoran Pertanyaan Dosen & Cara Menjawabnya',
        content: `Berikut pertanyaan yang hampir PASTI ditanyakan dosen beserta jawaban terbaiknya:

**Pertanyaan 1: "Kenapa program ini kamu bagi jadi 3 file? Kenapa nggak disatuin aja?"**
*Jawaban Juara*:
"Kami menerapkan prinsip **Separation of Concerns** (pemisahan tanggung jawab), Pak/Bu. \`pencatat.py\` khusus mengelola data dan perhitungan matematika, \`laporan.py\` khusus mengurus format tampilan teks dan validasi, sedangkan \`main.py\` bertindak sebagai menu pengendali. Jika suatu saat kami ingin mengganti tampilan terminal menjadi antarmuka web, kami hanya perlu mengubah sisi antarmuka tanpa merusak rumus perhitungan di \`pencatat.py\`."

**Pertanyaan 2: "Bagaimana kalau pengguna salah memasukkan huruf saat diminta jumlah uang?"**
*Jawaban Juara*:
"Program kami tidak akan crash, Pak/Bu, karena kami sudah membuat fungsi \`validasi_angka_positif()\` di \`laporan.py\`. Fungsi tersebut menggunakan perulangan \`while True\` dan method \`.isdigit()\`. Jika terdeteksi huruf atau angka negatif, sistem memberi pesan peringatan ramah dan mengulang pertanyaan."

**Pertanyaan 3: "Data transaksi disimpan di mana? Kalau program ditutup apakah datanya hilang?"**
*Jawaban Juara*:
"Untuk modul dasar ini, data disimpan di dalam memori RAM komputer menggunakan struktur data **List of Dictionaries** (\`daftar_transaksi\`). Ketika program ditutup, data akan hilang. Untuk tahap pengembangan selanjutnya, data ini bisa kami simpan permanen ke dalam file CSV, JSON, atau database SQLite."`,
      },
    ],
    quiz: [
      {
        id: 'q-bab11-1',
        question: 'Apa alasan terbaik untuk menjawab pertanyaan dosen: "Mengapa program dibagi menjadi tiga file?"',
        options: [
          'Karena disuruh oleh teman sekelompok',
          'Menerapkan prinsip modularitas dan Separation of Concerns agar logika data, tampilan, dan menu terpisah rapi serta mudah dirawat',
          'Agar jumlah file di folder terlihat banyak saat dinilai',
          'Karena Python tidak mengizinkan file lebih dari 50 baris',
        ],
        correctIndex: 1,
        explanation:
          'Prinsip modularitas dan Separation of Concerns adalah jawaban paling tepat dan disukai dosen karena mencerminkan pemahaman rekayasa perangkat lunak yang baik.',
      },
      {
        id: 'q-bab11-2',
        question: 'Sebelum maju presentasi di kelas, hal praktis apa yang sangat membantu audiens membaca kode di layarmu?',
        options: [
          'Memperbesar ukuran font terminal/editor dan membersihkan tampilan konsol dengan cls atau clear',
          'Mematikan layar proyektor',
          'Mengetik kode secepat mungkin tanpa penjelasan',
          'Mengubah tema editor menjadi warna merah menyala',
        ],
        correctIndex: 0,
        explanation:
          'Memperbesar ukuran teks dan membersihkan terminal memastikan semua orang di ruangan dapat membaca kode dengan nyaman.',
      },
    ],
    summaryPoints: [
      'Siapkan terminal: perbesar font dan ketik cls/clear sebelum mulai presentasi.',
      'Lakukan demo dengan skenario runtut: buat demo status boros untuk memukau dosen.',
      'Gunakan istilah profesional: "Separation of Concerns", "Validasi Input", dan "List of Dictionaries" saat menjawab pertanyaan dosen.',
    ],
    prevChapterId: 'bab-10',
  },
];
