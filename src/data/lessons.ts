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
    subtitle: 'Konsep Inti Python, Satu Langkah Satu Uji Pemahaman',
    description:
      'Bab ini adalah pondasi seluruh proyek. Sembilan langkah di bawah disusun untuk mahasiswa yang baru pertama kali menulis kode: setiap langkah berisi penjelasan sederhana, contoh kode yang bisa dijalankan, kesalahan umum, lalu 3 soal uji pemahaman. Jangan lanjut sebelum kamu benar-benar paham langkah sebelumnya.',
    learningGoals: [
      'Menulis dan membaca kode untuk sembilan pondasi Python: print(), variabel, input(), operator, percabangan, list/dict, perulangan, fungsi, dan import.',
      'Menjelaskan dengan kata sendiri mengapa input() perlu int() dan mengapa jatah harian memakai //.',
      'Memprediksi keluaran sebuah potongan kode sebelum menjalankannya, lalu memeriksa dugaanmu.',
      'Menyelesaikan 3 soal uji pemahaman pada setiap langkah sebagai tanda langkah itu benar-benar dikuasai.',
    ],
    sections: [
      {
        id: 'langkah-1-print',
        title: 'Langkah 1: Menampilkan Teks dengan print()',
        stepNumber: 1,
        stepLabel: 'print()',
        stepTagline: 'Menyuruh komputer bicara',
        content: `\`print()\` adalah perintah pertama yang wajib dikuasai. Tanpa \`print()\`, program bekerja di dalam komputer tanpa memberi kabar apa pun — seperti teman yang menghitung uangmu tetapi diam seribu bahasa.

Anggap \`print()\` sebagai **pengeras suara** Python. Apa pun yang kamu letakkan di dalam tanda kurungnya akan diucapkan ke layar terminal.

**Tiga aturan dasar:**
1. **Teks** harus diapit tanda petik: \`print("Halo")\` atau \`print('Halo')\`.
2. **Angka** ditulis apa adanya, tanpa tanda petik: \`print(3000000)\`.
3. **Setiap \`print()\` selesai, kursor otomatis pindah ke baris baru.** Itu sebabnya dua perintah \`print()\` menghasilkan dua baris.

**Mencetak beberapa hal sekaligus:** pisahkan dengan koma. Python otomatis menambahkan satu spasi di antaranya, seperti \`print("Anggaran:", 3000000)\` yang menghasilkan \`Anggaran: 3000000\`.

**Baris kosong:** \`print()\` tanpa isi berguna untuk memberi jarak agar tampilan terminal lebih mudah dibaca.

Di bab-bab berikutnya, hampir semua laporan keuangan akan dicetak dengan \`print()\`. Jadi pastikan langkah kecil ini benar-benar otomatis bagimu.`,
        analogy:
          'Seperti pengumuman di pengeras suara kampus: apa pun yang kamu bisikkan ke mikrofon (isi tanda kurung) akan terdengar jelas di seluruh terminal.',
        codeSnippets: [
          {
            id: 'contoh-print-dasar',
            title: 'Mencetak tiga baris',
            code: `print("Selamat datang di Pencatat Keuangan!")
print(3000000)
print("Jatah harian:", 100000)`,
            explanation:
              'Baris pertama dan ketiga berisi teks, baris kedua berisi angka. Koma pada baris ketiga membuat Python menambahkan spasi otomatis.',
            output: `Selamat datang di Pencatat Keuangan!
3000000
Jatah harian: 100000`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 1,
                code: 'print("Selamat datang di Pencatat Keuangan!")',
                explanation:
                  'Mencetak teks sambutan. Tanda petik memberi tahu Python bahwa isinya teks, bukan nama variabel.',
              },
              {
                line: 2,
                code: 'print(3000000)',
                explanation: 'Angka bulat ditulis tanpa tanda petik dan langsung dicetak.',
              },
              {
                line: 3,
                code: 'print("Jatah harian:", 100000)',
                explanation:
                  'Dua nilai dipisahkan koma. Hasilnya satu baris dengan spasi otomatis di antara keduanya.',
              },
            ],
          },
          {
            id: 'contoh-print-jarak',
            title: 'Memberi jarak dengan print() kosong',
            code: `print("=== RINGKASAN ===")
print("Anggaran: 3000000")
print()
print("Sisa saldo: 2915000")
print("=== SELESAI ===")`,
            explanation:
              'Baris ketiga adalah print() tanpa isi. Ia mencetak satu baris kosong sehingga laporan terasa lebih rapi.',
            output: `=== RINGKASAN ===
Anggaran: 3000000

Sisa saldo: 2915000
=== SELESAI ===`,
            lineExplanations: [
              {
                line: 1,
                code: 'print("=== RINGKASAN ===")',
                explanation: 'Mencetak judul laporan.',
              },
              {
                line: 3,
                code: 'print()',
                explanation: 'Tanpa isi, print() menghasilkan satu baris kosong sebagai pemisah.',
              },
              {
                line: 5,
                code: 'print("=== SELESAI ===")',
                explanation: 'Mencetak penutup laporan.',
              },
            ],
          },
        ],
        importantNotes: [
          'Tanda petik harus **lurus** (`"` atau `\'`), bukan kutip melengkung (`“ ”`) hasil salin dari Word atau media sosial.',
          'Python membedakan huruf besar dan kecil. `Print("Halo")` bukan perintah yang dikenal; tulisannya harus `print` huruf kecil semua.',
          'Bila teksnya sendiri mengandung tanda petik, gunakan petik satu di luar dan petik dua di dalam, misalnya `print(\'Dia bilang "halo"\')`.',
        ],
        commonMistakes: [
          '`print(Halo)` → **NameError**, karena Python mengira `Halo` adalah nama variabel. Teks harus diapit tanda petik.',
          '`print("Halo)` → **SyntaxError**, karena tanda petik pembuka tidak pernah ditutup.',
          '`print("Rp 3.000.000")` memang tampil rapi, tetapi nilainya **teks**, bukan angka. Nanti tidak bisa dijumlahkan. Simpan angka sebagai angka, rapikan saat mencetak.',
        ],
        practice: {
          id: 'bab3-uji-langkah-1',
          stepNumber: 1,
          keyTakeaway:
            'Teks selalu bertanda petik, angka tidak. Setiap `print()` otomatis pindah ke baris baru.',
          questions: [
            {
              id: 'bab3-s1-q1',
              type: 'choice',
              question: 'Manakah perintah yang **benar** untuk mencetak teks `Halo, mahasiswa`?',
              options: [
                '`print(Halo, mahasiswa)`',
                '`print("Halo, mahasiswa")`',
                '`Print("Halo, mahasiswa")`',
                '`print Halo, mahasiswa`',
              ],
              correctIndex: 1,
              explanation:
                'Teks wajib diapit tanda petik dan nama perintahnya huruf kecil semua: `print("Halo, mahasiswa")`.',
              hint: 'Perhatikan tanda petik dan huruf besar/kecil pada kata print.',
            },
            {
              id: 'bab3-s1-q2',
              type: 'choice',
              question: 'Apa yang tercetak di terminal?',
              code: `print("Jatah harian:")
print(100000)`,
              options: [
                '`Jatah harian: 100000` dalam satu baris',
                'Dua baris: `Jatah harian:` lalu `100000`',
                '`Jatah harian:100000` tanpa spasi',
                'Error karena angka tidak boleh dicetak',
              ],
              correctIndex: 1,
              explanation:
                'Setiap `print()` selesai, kursor pindah baris. Jadi hasilnya dua baris terpisah.',
              hint: 'Ingat aturan nomor 3: setiap print() berakhir dengan baris baru.',
            },
            {
              id: 'bab3-s1-q3',
              type: 'fill',
              question: 'Lengkapi perintah agar angka `3000000` tercetak ke layar.',
              code: `_____(3000000)`,
              placeholder: 'tulis perintahnya',
              acceptedAnswers: ['print'],
              explanation:
                '`print(3000000)` mencetak angka tanpa tanda petik. Perintahnya ditulis huruf kecil semua.',
              hint: 'Namanya terdiri dari lima huruf dan berarti "cetak".',
            },
          ],
        },
      },
      {
        id: 'langkah-2-variabel',
        title: 'Langkah 2: Menyimpan Data di Variabel',
        stepNumber: 2,
        stepLabel: 'Variabel',
        stepTagline: 'Memberi nama pada data',
        content: `Variabel adalah **wadah bernama** di dalam memori komputer. Kita memberi nama pada wadah itu, lalu memasukkan nilai dengan tanda \`=\`.

**Penting:** dalam Python, \`=\` berarti "**isi dengan**", bukan "sama dengan". Baris \`anggaran = 3000000\` dibaca: "wadah bernama anggaran, isi dengan 3000000".

**Aturan penamaan variabel:**
- Boleh berisi huruf, angka, dan garis bawah (\`_\`), tetapi **tidak boleh diawali angka**.
- **Tidak boleh ada spasi.** Gunakan garis bawah: \`jatah_harian\`, bukan \`jatah harian\`.
- Huruf besar dan kecil dianggap berbeda: \`Saldo\` dan \`saldo\` adalah dua variabel yang berbeda.
- Sebaiknya gunakan nama yang menjelaskan isinya: \`total_pengeluaran\`, bukan \`x\`.

**Tiga tipe data yang paling sering kita pakai:**
- **\`str\` (string)** — teks, selalu bertanda petik. Contoh: \`"Makan Siang"\`.
- **\`int\` (integer)** — bilangan bulat. Contoh: \`3000000\` dan \`30\`.
- **\`float\`** — bilangan desimal. Contoh: \`85.5\` dan \`100000.0\`.

Kamu bisa memeriksa tipe data dengan \`type()\`, misalnya \`print(type(anggaran))\` menghasilkan \`<class \'int\'>\`.

**Tanda + pada teks berarti menyambung, bukan menjumlahkan.** \`"100" + "200"\` menghasilkan \`"100200"\`, bukan \`300\`. Ini akan sering muncul saat membaca kode dan menjadi bahan latihan nanti.

**Mencetak variabel di tengah teks (f-string):** tulis huruf f tepat sebelum tanda petik, lalu letakkan nama variabel di dalam kurung kurawal. Contoh \`print(f"Saldo: {saldo}")\`. Bagian \`{saldo}\` diganti dengan isi variabelnya, sehingga jauh lebih rapi daripada menyambung teks dengan tanda +.

**Mencetak isi variabel:** tulis namanya tanpa tanda petik. \`print(anggaran)\` menghasilkan \`3000000\`, sedangkan \`print("anggaran")\` menghasilkan kata \`anggaran\` saja.`,
        analogy:
          'Variabel seperti stoples berlabel: kamu menulis "anggaran" di labelnya, memasukkan uang ke dalamnya, lalu kapan pun perlu, kamu tinggal menyebut nama labelnya.',
        codeSnippets: [
          {
            id: 'contoh-variabel-tipe',
            title: 'Menyimpan nilai dan memeriksa tipe data',
            code: `nama = "Budi"
anggaran = 3000000
jatah_harian = 100000.0
mahasiswa_rajin = True

print(nama)
print(anggaran)
print(jatah_harian)
print(mahasiswa_rajin)
print(type(anggaran))`,
            explanation:
              'Empat variabel dengan empat tipe data berbeda. type(anggaran) membuktikan bahwa 3000000 bertipe int.',
            output: `Budi
3000000
100000.0
True
<class 'int'>`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 1,
                code: 'nama = "Budi"',
                explanation: 'Membuat wadah bernama nama dan mengisinya dengan teks "Budi".',
              },
              {
                line: 2,
                code: 'anggaran = 3000000',
                explanation: 'Nilai angka tanpa tanda petik, sehingga bertipe int.',
              },
              {
                line: 3,
                code: 'jatah_harian = 100000.0',
                explanation: 'Angka dengan titik desimal dianggap float, walaupun nilainya bulat.',
              },
              {
                line: 4,
                code: 'mahasiswa_rajin = True',
                explanation: 'True dan False adalah tipe boolean (benar/salah), tanpa tanda petik.',
              },
              {
                line: 10,
                code: 'print(type(anggaran))',
                explanation: 'type() memberi tahu tipe data dari isi variabel.',
              },
            ],
          },
          {
            id: 'contoh-variabel-fstring',
            title: 'Mengganti isi variabel dan memakai f-string',
            code: `saldo = 500000
print(f"Saldo awal: {saldo}")

saldo = 425000
print(f"Setelah jajan: {saldo}")

nama = "Budi"
print(f"{nama} punya saldo Rp {saldo}")`,
            explanation:
              'Huruf f sebelum tanda petik membuat Python mengganti setiap {nama_variabel} dengan nilainya.',
            output: `Saldo awal: 500000
Setelah jajan: 425000
Budi punya saldo Rp 425000`,
            lineExplanations: [
              {
                line: 1,
                code: 'saldo = 500000',
                explanation: 'Saldo awal diisi 500000.',
              },
              {
                line: 4,
                code: 'saldo = 425000',
                explanation:
                  'Nilai lama 500000 diganti 425000. Baris yang dieksekusi terakhir adalah yang menang.',
              },
              {
                line: 8,
                code: 'print(f"{nama} punya saldo Rp {saldo}")',
                explanation:
                  'f-string menggabungkan teks dan variabel. Bagian di dalam { } diganti dengan isi variabelnya.',
              },
            ],
          },
        ],
        importantNotes: [
          'Kalau nilai variabel diganti, nilai lama hilang. Baris yang paling terakhir dieksekusi adalah yang menang.',
          '`=` untuk mengisi variabel; `==` (dua tanda sama dengan) untuk membandingkan. Jangan tertukar!',
          'Nama variabel sebaiknya jelas dan konsisten, bukan singkatan yang membingungkan. `total_pengeluaran` lebih baik daripada `tp`.',
        ],
        commonMistakes: [
          '`nama = Budi` → **NameError**, karena `Budi` dianggap variabel yang belum pernah dibuat. Tulis `nama = "Budi"`.',
          '`jatah harian = 100000` → **SyntaxError** karena ada spasi di nama variabel. Gunakan `jatah_harian`.',
          '`umur = "19"` lalu `umur + 1` → **TypeError**, karena `"19"` adalah teks. Tulis `umur = 19` atau ubah dengan `int()`.',
          '`print("saldo")` mencetak kata *saldo*, bukan isi variabelnya.',
        ],
        practice: {
          id: 'bab3-uji-langkah-2',
          stepNumber: 2,
          keyTakeaway:
            'Variabel adalah wadah bernama. `=` mengisi, `==` membandingkan, dan tipe data menentukan apa yang boleh dilakukan.',
          questions: [
            {
              id: 'bab3-s2-q1',
              type: 'choice',
              question: 'Manakah nama variabel yang **valid** di Python?',
              options: ['`jatah_harian`', '`jatah harian`', '`2jatah`', '`jatah-harian`'],
              correctIndex: 0,
              explanation:
                'Nama variabel tidak boleh berspasi, tidak boleh diawali angka, dan tidak boleh memakai tanda hubung. Garis bawah adalah pilihan yang benar.',
              hint: 'Lihat aturan penamaan: hanya huruf, angka, dan garis bawah.',
            },
            {
              id: 'bab3-s2-q2',
              type: 'choice',
              question: 'Apa yang tercetak di terminal?',
              code: `harga = 25000
harga = 40000
print(harga)`,
              options: ['`25000`', '`40000`', '`65000`', 'Error karena variabel diisi dua kali'],
              correctIndex: 1,
              explanation:
                'Baris kedua mengganti isi variabel harga. Nilai yang tersimpan saat dicetak adalah nilai terakhir, yaitu 40000.',
              hint: 'Nilai variabel bisa berubah. Yang dipakai adalah isi terakhirnya.',
            },
            {
              id: 'bab3-s2-q3',
              type: 'fill',
              question: 'Lengkapi agar tipe data variabel `saldo` ditampilkan ke layar.',
              code: `print(_____(saldo))`,
              placeholder: 'nama fungsi',
              acceptedAnswers: ['type'],
              explanation:
                '`type(saldo)` mengembalikan tipe data, misalnya `<class \'int\'>`. Namanya empat huruf.',
              hint: 'Fungsi ini juga dipakai di contoh untuk memeriksa int, float, dan str.',
            },
          ],
        },
      },
      {
        id: 'langkah-3-input',
        title: 'Langkah 3: Menerima Ketikan Pengguna dengan input()',
        stepNumber: 3,
        stepLabel: 'input()',
        stepTagline: 'Membaca ketikan pengguna',
        content: `Program yang berguna harus bisa menerima data dari pengguna. Perintahnya \`input()\`.

Saat Python menemui \`input("Masukkan nominal: ")\`, terjadi tiga hal:
1. Teks di dalam tanda kurung ditampilkan sebagai **pertanyaan**.
2. Program **berhenti sejenak** menunggu pengguna mengetik dan menekan Enter.
3. Ketikan itu **dikembalikan** ke program.

**Jebakan paling penting di bab ini:** apa pun yang diketik — angka sekalipun — \`input()\` selalu mengembalikannya sebagai **teks (\`str\`)**.

Jika pengguna mengetik \`50000\`, Python menyimpannya sebagai \`"50000"\` (teks), bukan \`50000\` (angka). Akibatnya \`nominal + 10000\` akan menghasilkan **TypeError**, karena teks tidak bisa dijumlahkan dengan angka.

**Solusinya: konversi tipe (type casting).**
- \`int(input("..."))\` → mengubah teks menjadi bilangan bulat.
- \`float(input("..."))\` → mengubah teks menjadi bilangan desimal.
- \`str(angka)\` → mengubah angka menjadi teks (jarang diperlukan).

Pola yang akan kamu tulis ratusan kali: \`anggaran = int(input("Masukkan anggaran bulanan: "))\`. Urutannya **input dulu, baru dikonversi**.

**Kalau pengguna mengetik huruf?** \`int("abc")\` gagal dengan **ValueError**. Nanti di Bab 5 kita belajar memeriksa input agar program tidak langsung mati. Untuk sekarang, cukup pahami bahwa konversi hanya berhasil jika isinya memang angka.`,
        analogy:
          'Seperti menerima slip kertas bertuliskan "50000". Komputer membaca tulisan itu sebagai teks. int() adalah juru ketik yang menyalin angka dari kertas ke mesin hitung.',
        codeSnippets: [
          {
            id: 'contoh-input-tipe',
            title: 'Membuktikan input() menghasilkan teks',
            code: `umur_teks = input("Umur kamu: ")
print(type(umur_teks))

umur_angka = int(umur_teks)
print(umur_angka + 1)`,
            explanation:
              'type() membuktikan bahwa hasil input() adalah str. Setelah int(), angkanya baru bisa dihitung.',
            output: `Umur kamu: 19
<class 'str'>
20`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 1,
                code: 'umur_teks = input("Umur kamu: ")',
                explanation:
                  'Menampilkan pertanyaan, menunggu ketikan, lalu menyimpannya sebagai teks.',
              },
              {
                line: 4,
                code: 'umur_angka = int(umur_teks)',
                explanation: 'Teks "19" diubah menjadi bilangan bulat 19.',
              },
              {
                line: 5,
                code: 'print(umur_angka + 1)',
                explanation: 'Sekarang penjumlahan berhasil karena kedua nilai berupa angka.',
              },
            ],
          },
          {
            id: 'contoh-input-anggaran',
            title: 'Pola int(input()) untuk anggaran',
            code: `anggaran = int(input("Masukkan anggaran bulanan: "))
hari = int(input("Jumlah hari: "))
jatah = anggaran // hari
print(f"Jatah harianmu: Rp {jatah}")`,
            explanation:
              'Dua input dikonversi menjadi int lebih dulu, baru dibagi. Contoh isian: 3000000 lalu 30.',
            output: `Masukkan anggaran bulanan: 3000000
Jumlah hari: 30
Jatah harianmu: Rp 100000`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 1,
                code: 'anggaran = int(input("Masukkan anggaran bulanan: "))',
                explanation:
                  'input() membaca teks, lalu int() mengubahnya menjadi angka. Semuanya dalam satu baris.',
              },
              {
                line: 3,
                code: 'jatah = anggaran // hari',
                explanation: 'Pembagian bulat agar jatah harian tidak memiliki angka desimal.',
              },
              {
                line: 4,
                code: 'print(f"Jatah harianmu: Rp {jatah}")',
                explanation: 'f-string mencetak hasil dengan rapi.',
              },
            ],
          },
        ],
        importantNotes: [
          'Di simulator browser, nilai input memakai contoh bawaan karena browser tidak bisa mengetik ke terminal. Di komputermu, program akan benar-benar menunggu ketikanmu.',
          'Jangan menulis `input(int("..."))`. Urutan yang benar: `int(input("..."))` — input dulu, baru dikonversi.',
          '`int("50000")` berhasil, tetapi `int("50.000")` gagal karena mengandung titik. Ketik angka polos: `50000`.',
        ],
        commonMistakes: [
          '`nominal = input("Nominal: ")` lalu `nominal + 10000` → **TypeError**. Bungkus dengan `int()`.',
          '`int(input("Nominal: "))` lalu pengguna mengetik `lima puluh ribu` → **ValueError**. Program hanya menerima angka.',
          'Menulis `input = 50000` — jangan memakai nama `input` untuk variabel karena akan menutupi perintah aslinya.',
        ],
        practice: {
          id: 'bab3-uji-langkah-3',
          stepNumber: 3,
          keyTakeaway:
            '`input()` selalu menghasilkan teks. Bungkus dengan `int()` sebelum dipakai berhitung.',
          questions: [
            {
              id: 'bab3-s3-q1',
              type: 'choice',
              question:
                'Setelah `nominal = input("Nominal: ")` dan pengguna mengetik `50000`, apa tipe data `nominal`?',
              options: ['`str` (teks)', '`int` (bilangan bulat)', '`float` (desimal)', '`list` (daftar)'],
              correctIndex: 0,
              explanation:
                'input() selalu mengembalikan teks, walaupun yang diketik terlihat seperti angka. Teks "50000" berbeda dengan angka 50000.',
              hint: 'Ini justru jebakan utama di Langkah 3.',
            },
            {
              id: 'bab3-s3-q2',
              type: 'choice',
              question:
                'Pengguna akan mengetik nominal uang. Kode mana yang bisa menjumlahkannya dengan `10000`?',
              options: [
                '`nominal = input("Nominal: ")\nprint(nominal + 10000)`',
                '`nominal = int(input("Nominal: "))\nprint(nominal + 10000)`',
                '`nominal = str(input("Nominal: "))\nprint(nominal + 10000)`',
                '`nominal = input(int("Nominal: "))\nprint(nominal + 10000)`',
              ],
              correctIndex: 1,
              explanation:
                'int() harus membungkus input() agar hasilnya bilangan bulat. str() justru menambah masalah, dan input(int(...)) salah urutan.',
              hint: 'Konversi dilakukan setelah input membaca ketikan.',
            },
            {
              id: 'bab3-s3-q3',
              type: 'fill',
              question: 'Lengkapi agar ketikan pengguna menjadi bilangan bulat.',
              code: `anggaran = _____(input("Anggaran: "))`,
              placeholder: 'nama fungsi konversi',
              acceptedAnswers: ['int'],
              explanation:
                '`int(input(...))` mengubah teks dari input menjadi bilangan bulat. Untuk desimal, gunakan `float`.',
              hint: 'Tiga huruf, singkatan dari integer.',
            },
          ],
        },
      },
      {
        id: 'langkah-4-operator',
        title: 'Langkah 4: Menghitung dengan Operator Matematika',
        stepNumber: 4,
        stepLabel: 'Operator',
        stepTagline: 'Menghitung jatah & sisa',
        content: `Komputer unggul dalam hitungan. Operator yang wajib kamu kenal:

- \`+\` penjumlahan, \`-\` pengurangan, \`*\` perkalian
- \`/\` pembagian biasa → hasilnya **selalu float**, misalnya \`3000000 / 30\` menghasilkan \`100000.0\`
- \`//\` pembagian bulat (floor division) → membuang bagian desimal, misalnya \`3000000 // 30\` menghasilkan \`100000\`
- \`%\` sisa bagi (modulo) → \`7 % 2\` menghasilkan \`1\`, dan \`10 % 5\` menghasilkan \`0\`
- \`**\` pangkat → \`2 ** 3\` menghasilkan \`8\`

**Mengapa kita memakai \`//\` untuk jatah harian?**
Uang rupiah tidak perlu pecahan dalam program kita. Dengan \`//\`, jatah harian selalu berupa bilangan bulat yang rapi. Bandingkan \`3000000 / 30\` yang menghasilkan \`100000.0\` dengan \`3000000 // 30\` yang menghasilkan \`100000\`.

**Urutan hitung:** kurung dulu, lalu pangkat, lalu \`*\` dan \`/\`, terakhir \`+\` dan \`-\`. Contoh: \`(3000000 - 500000) // 25\` menghasilkan \`100000\`.

**Singkatan yang sering dipakai:**
- \`total += harga\` sama dengan \`total = total + harga\`
- \`saldo -= 50000\` sama dengan \`saldo = saldo - 50000\``,
        analogy:
          'Seperti kalkulator di ponsel: + dan - sudah biasa, tetapi // adalah mode "buang receh" yang selalu membulatkan ke bawah agar catatan uangmu tidak penuh angka desimal.',
        codeSnippets: [
          {
            id: 'contoh-operator-lima',
            title: 'Mengenal lima operator',
            code: `anggaran = 3000000
hari = 30

print(anggaran / hari)    # 100000.0
print(anggaran // hari)   # 100000
print(7 % 2)              # 1
print(2 ** 3)             # 8
print(anggaran - 85000)   # 2915000`,
            explanation:
              'Perhatikan bahwa / dan // memberi hasil berbeda. Komentar setelah tanda # hanya menjelaskan, tidak ikut dihitung.',
            output: `100000.0
100000
1
8
2915000`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 4,
                code: 'print(anggaran / hari)',
                explanation: 'Pembagian biasa. Hasilnya float 100000.0, bukan 100000.',
              },
              {
                line: 5,
                code: 'print(anggaran // hari)',
                explanation: 'Pembagian bulat. Bagian desimal dibuang sehingga hasilnya 100000.',
              },
              {
                line: 6,
                code: 'print(7 % 2)',
                explanation: 'Modulo: sisa pembagian 7 dibagi 2 adalah 1.',
              },
              {
                line: 7,
                code: 'print(2 ** 3)',
                explanation: 'Pangkat: 2 pangkat 3 sama dengan 8.',
              },
              {
                line: 8,
                code: 'print(anggaran - 85000)',
                explanation: 'Pengurangan biasa untuk mencari sisa saldo.',
              },
            ],
          },
          {
            id: 'contoh-operator-keuangan',
            title: 'Menghitung jatah, sisa, dan persentase',
            code: `anggaran = 3000000
pengeluaran = 85000
jatah_harian = anggaran // 30
sisa = anggaran - pengeluaran
persen = (pengeluaran / jatah_harian) * 100

print(f"Jatah harian: Rp {jatah_harian}")
print(f"Sisa saldo: Rp {sisa}")
print(f"Terpakai: {persen}% dari jatah harian")`,
            explanation:
              'Tiga hitungan berbeda dalam satu program: pembagian bulat, pengurangan, dan persentase dengan pembagian biasa.',
            output: `Jatah harian: Rp 100000
Sisa saldo: Rp 2915000
Terpakai: 85.0% dari jatah harian`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 3,
                code: 'jatah_harian = anggaran // 30',
                explanation: 'Pembagian bulat menghasilkan 100000 tanpa desimal.',
              },
              {
                line: 4,
                code: 'sisa = anggaran - pengeluaran',
                explanation: 'Sisa saldo didapat dari pengurangan.',
              },
              {
                line: 5,
                code: 'persen = (pengeluaran / jatah_harian) * 100',
                explanation:
                  'Hitung perbandingan dengan pembagian biasa, lalu kalikan 100. Hasilnya 85.0.',
              },
              {
                line: 9,
                code: 'print(f"Terpakai: {persen}% dari jatah harian")',
                explanation: 'f-string menampilkan hasil lengkap dengan tanda persen.',
              },
            ],
          },
        ],
        importantNotes: [
          'Di Python 3, `/` selalu menghasilkan float walau hasilnya bulat. `100000.0` dan `100000` adalah dua tipe berbeda.',
          'Pembagian dengan nol (`anggaran / 0`) menghasilkan **ZeroDivisionError**. Pastikan jumlah hari tidak nol.',
          'Gunakan tanda kurung agar maksud hitunganmu jelas dan tidak salah urutan.',
        ],
        commonMistakes: [
          'Menulis `jatah = anggaran / 30` lalu mencetak `Rp 100000.0`. Gunakan `//` jika ingin bilangan bulat.',
          'Lupa tanda kurung: `(a + b) * 2` berbeda hasilnya dengan `a + b * 2`.',
          'Menulis `total = + 5000` (tanda plus di depan) alih-alih `total += 5000`.',
        ],
        practice: {
          id: 'bab3-uji-langkah-4',
          stepNumber: 4,
          keyTakeaway:
            '`/` menghasilkan float, `//` menghasilkan bilangan bulat, dan `%` memberi sisa bagi.',
          questions: [
            {
              id: 'bab3-s4-q1',
              type: 'choice',
              question: 'Apa hasil dari `3000000 // 30`?',
              options: ['`100000.0`', '`100000`', '`90000`', 'Error'],
              correctIndex: 1,
              explanation:
                'Operator // adalah pembagian bulat, jadi hasilnya 100000 bertipe int tanpa titik desimal.',
              hint: 'Dua garis miring berarti pembagian bulat.',
            },
            {
              id: 'bab3-s4-q2',
              type: 'choice',
              question: 'Apa yang tercetak di terminal?',
              code: `print(10 / 4)
print(10 // 4)`,
              options: [
                '`2.5` lalu `2`',
                '`2` lalu `2.5`',
                '`2.5` lalu `2.0`',
                '`2` lalu `2`',
              ],
              correctIndex: 0,
              explanation:
                '10 / 4 = 2.5 (float), sedangkan 10 // 4 = 2 (dibulatkan ke bawah, bertipe int).',
              hint: 'Perhatikan perbedaan / dan // pada angka yang tidak habis dibagi.',
            },
            {
              id: 'bab3-s4-q3',
              type: 'fill',
              question: 'Lengkapi operator pembagian bulat agar jatah berupa bilangan bulat.',
              code: `jatah = 3000000 _____ 30`,
              placeholder: 'satu operator',
              acceptedAnswers: ['//'],
              explanation:
                '`//` melakukan pembagian bulat. Hasilnya 100000, bukan 100000.0.',
              hint: 'Dua karakter, terdiri dari dua garis miring.',
            },
          ],
        },
      },
      {
        id: 'langkah-5-percabangan',
        title: 'Langkah 5: Mengambil Keputusan dengan if / elif / else',
        stepNumber: 5,
        stepLabel: 'if / elif / else',
        stepTagline: 'Program mulai berpikir',
        content: `Percabangan membuat program memilih langkah berdasarkan kondisi. Bentuk paling sederhana: \`if kondisi:\` diikuti perintah yang menjorok, lalu \`else:\` untuk pilihan lainnya.

**Tiga hal yang wajib diperhatikan:**
1. Setelah kondisi selalu ada **titik dua (\`:\`)**.
2. Baris perintah di bawahnya harus **menjorok ke dalam (indentasi)** — standar Python 4 spasi.
3. Python memakai indentasi untuk tahu baris mana yang "masuk" ke dalam if. Berbeda dengan bahasa lain yang memakai kurung kurawal.

**Operator pembanding:**
- \`>\` lebih besar, \`<\` lebih kecil
- \`>=\` lebih besar atau sama dengan, \`<=\` lebih kecil atau sama dengan
- \`==\` sama dengan (dua tanda!), \`!=\` tidak sama dengan

**Ingat:** \`=\` untuk mengisi variabel, \`==\` untuk membandingkan. Ini kesalahan pemula nomor satu.

**Rantai \`elif\`** dipakai saat ada lebih dari dua kemungkinan. Python memeriksa dari atas ke bawah dan **berhenti di kondisi pertama yang benar**. Kalau \`persen = 85\`, kondisi \`persen <= 70\` salah dan \`persen <= 100\` benar, sehingga status menjadi \`WASPADA\` dan \`else\` tidak dijalankan.

Artinya, urutan penulisan kondisi itu penting. Kondisi yang lebih sempit harus diperiksa lebih dulu.`,
        analogy:
          'Seperti memilih jalur saat macet: jika jalan utama padat, ambil jalan alternatif; jika tidak, tetap di jalan utama. Program hanya menjalankan satu jalur, bukan semuanya.',
        codeSnippets: [
          {
            id: 'contoh-if-else',
            title: 'if / else sederhana',
            code: `pengeluaran = 125000
jatah = 100000

if pengeluaran > jatah:
    print("Status: BOROS")
else:
    print("Status: AMAN")`,
            explanation:
              'Karena 125000 lebih besar dari 100000, kondisi if benar dan hanya baris di dalam if yang dijalankan.',
            output: `Status: BOROS`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 4,
                code: 'if pengeluaran > jatah:',
                explanation:
                  'Membandingkan dua nilai. Titik dua menandai awal blok perintah di bawahnya.',
              },
              {
                line: 5,
                code: '    print("Status: BOROS")',
                explanation: 'Dijalankan hanya jika kondisi benar. Perhatikan indentasi 4 spasi.',
              },
              {
                line: 6,
                code: 'else:',
                explanation: 'Cadangan yang dijalankan jika kondisi if salah.',
              },
              {
                line: 7,
                code: '    print("Status: AMAN")',
                explanation: 'Hanya dijalankan jika pengeluaran tidak melebihi jatah.',
              },
            ],
          },
          {
            id: 'contoh-elif-status',
            title: 'Rantai elif untuk tiga status',
            code: `persen = 85

if persen <= 70:
    print("Status: AMAN")
elif persen <= 100:
    print("Status: WASPADA")
else:
    print("Status: BOROS")`,
            explanation:
              'Python memeriksa dari atas. 85 tidak memenuhi <= 70, tetapi memenuhi <= 100, sehingga WASPADA dicetak dan else dilewati.',
            output: `Status: WASPADA`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 3,
                code: 'if persen <= 70:',
                explanation: 'Kondisi pertama diperiksa lebih dulu. 85 <= 70 salah.',
              },
              {
                line: 5,
                code: 'elif persen <= 100:',
                explanation:
                  'Kondisi kedua benar (85 <= 100), jadi blok ini dijalankan dan sisa rantai dilewati.',
              },
              {
                line: 7,
                code: 'else:',
                explanation: 'Hanya dijalankan jika semua kondisi di atasnya salah.',
              },
            ],
          },
        ],
        importantNotes: [
          'Indentasi harus konsisten. Campuran tab dan spasi bisa menghasilkan `TabError` atau `IndentationError`. Atur editor agar memakai 4 spasi.',
          'Kondisi yang sudah benar di `if` membuat Python melewati semua `elif` dan `else` di bawahnya.',
          'Teks pembanding harus sama persis, termasuk huruf besar/kecil: `"Aman"` tidak sama dengan `"aman"`.',
        ],
        commonMistakes: [
          'Lupa titik dua: `if pengeluaran > jatah` → **SyntaxError**.',
          'Tidak menjorokkan badan if → **IndentationError**.',
          '`if pengeluaran = jatah:` → **SyntaxError**; gunakan `==` untuk membandingkan.',
          'Menulis `elif` setelah `else` → **SyntaxError**; `else` harus paling akhir.',
        ],
        practice: {
          id: 'bab3-uji-langkah-5',
          stepNumber: 5,
          keyTakeaway:
            'Satu kondisi, satu jalur. Jangan lupa titik dua dan indentasi; `==` untuk membandingkan.',
          questions: [
            {
              id: 'bab3-s5-q1',
              type: 'choice',
              question: 'Operator mana yang dipakai untuk memeriksa apakah dua nilai **sama dengan**?',
              options: ['`=`', '`==`', '`=>`', '`!`'],
              correctIndex: 1,
              explanation:
                '`==` adalah operator pembanding. `=` hanya untuk mengisi nilai ke variabel.',
              hint: 'Dua tanda sama dengan.',
            },
            {
              id: 'bab3-s5-q2',
              type: 'choice',
              question: 'Apa yang tercetak di terminal?',
              code: `nilai = 100000
if nilai > 100000:
    print("BOROS")
else:
    print("TIDAK BOROS")`,
              options: ['`BOROS`', '`TIDAK BOROS`', 'Keduanya tercetak', 'Error'],
              correctIndex: 1,
              explanation:
                'Kondisi `100000 > 100000` salah karena tidak lebih besar, hanya sama. Karena itu jalur else yang dijalankan.',
              hint: 'Perhatikan tanda > (lebih besar), bukan >=.',
            },
            {
              id: 'bab3-s5-q3',
              type: 'choice',
              question: 'Apa yang akan terjadi pada kode berikut?',
              code: `if pengeluaran > jatah
    print("BOROS")`,
              options: [
                '`SyntaxError` karena setelah kondisi tidak ada titik dua',
                '`NameError` karena pengeluaran belum diisi',
                'Program berjalan dan mencetak BOROS',
                '`IndexError` karena tidak ada list',
              ],
              correctIndex: 0,
              explanation:
                'Setiap `if` wajib diakhiri titik dua. Tanpa titik dua, Python berhenti membaca sebelum sempat menjalankan program.',
              hint: 'Periksa akhir baris pertama.',
            },
          ],
        },
      },
      {
        id: 'langkah-6-wadah-data',
        title: 'Langkah 6: Menyimpan Banyak Data dengan List & Dictionary',
        stepNumber: 6,
        stepLabel: 'List & dict',
        stepTagline: 'Merapikan banyak transaksi',
        content: `Satu transaksi punya beberapa detail (hari, kategori, jumlah). Sebulan ada puluhan transaksi. Kalau kita membuat \`transaksi1\`, \`transaksi2\`, dan seterusnya, kode akan kacau.

**Dictionary \`{}\` — untuk SATU transaksi.**
Dictionary menyimpan data berpasangan **key: value** (label: isi), misalnya \`transaksi = {"hari": 1, "kategori": "Makan", "jumlah": 85000}\`.
Ambil isinya dengan nama key: \`transaksi["kategori"]\` menghasilkan \`"Makan"\`, dan \`transaksi["jumlah"]\` menghasilkan \`85000\`.

**List \`[]\` — untuk BANYAK transaksi.**
List adalah deretan nilai yang berurutan. Posisinya disebut **index**, dan **index dimulai dari 0** (bukan 1). List kosong dibuat dengan \`daftar_transaksi = []\`.
Tambahkan data ke akhir list dengan \`.append()\`, misalnya \`daftar_transaksi.append(transaksi)\`.

**Menggabungkan keduanya — inilah yang dipakai program kita:**
\`daftar_transaksi\` adalah **list**, dan setiap isinya adalah **dictionary**.
- \`daftar_transaksi[0]\` → dictionary transaksi pertama
- \`daftar_transaksi[0]["kategori"]\` → kategori transaksi pertama
- \`len(daftar_transaksi)\` → jumlah transaksi yang tersimpan`,
        analogy:
          'List seperti rak loker bernomor yang berurutan. Dictionary seperti satu map plastik berisi lembaran berlabel "hari", "kategori", dan "jumlah". Satu loker berisi satu map transaksi.',
        codeSnippets: [
          {
            id: 'contoh-list-index',
            title: 'Dasar list, index, dan append',
            code: `daftar_kategori = ["Makan", "Transportasi", "Internet"]

print(daftar_kategori[0])
print(daftar_kategori[2])
print(len(daftar_kategori))

daftar_kategori.append("Kos")
print(daftar_kategori)`,
            explanation:
              'Index 0 mengambil data pertama, index 2 mengambil data ketiga. append() menambahkan data baru di posisi paling akhir.',
            output: `Makan
Internet
3
['Makan', 'Transportasi', 'Internet', 'Kos']`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 1,
                code: 'daftar_kategori = ["Makan", "Transportasi", "Internet"]',
                explanation: 'List dibuat dengan kurung siku dan isinya dipisahkan koma.',
              },
              {
                line: 3,
                code: 'print(daftar_kategori[0])',
                explanation: 'Index 0 menunjuk data pertama, yaitu "Makan".',
              },
              {
                line: 5,
                code: 'print(len(daftar_kategori))',
                explanation: 'len() menghitung jumlah data di dalam list, yaitu 3.',
              },
              {
                line: 7,
                code: 'daftar_kategori.append("Kos")',
                explanation: 'append() menambahkan "Kos" ke akhir list.',
              },
            ],
          },
          {
            id: 'contoh-dict-dalam-list',
            title: 'Dictionary di dalam list',
            code: `transaksi = {
    "hari": 1,
    "kategori": "Makan",
    "jumlah": 85000
}

print(transaksi["kategori"])
print(transaksi["jumlah"])

daftar_transaksi = []
daftar_transaksi.append(transaksi)

print(len(daftar_transaksi))
print(daftar_transaksi[0]["jumlah"])`,
            explanation:
              'Satu dictionary menyimpan detail satu transaksi. List menampung semua dictionary transaksi. Index dan key bisa dirangkai untuk mengambil nilai terdalam.',
            output: `Makan
85000
1
85000`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 1,
                code: 'transaksi = {',
                explanation:
                  'Dictionary dibuka dengan kurung kurawal. Setiap baris berisi pasangan "key": value.',
              },
              {
                line: 7,
                code: 'print(transaksi["kategori"])',
                explanation: 'Mengambil nilai dengan key "kategori".',
              },
              {
                line: 11,
                code: 'daftar_transaksi.append(transaksi)',
                explanation: 'Memasukkan dictionary transaksi ke dalam list.',
              },
              {
                line: 14,
                code: 'print(daftar_transaksi[0]["jumlah"])',
                explanation:
                  'Index 0 mengambil transaksi pertama, lalu key "jumlah" mengambil nominalnya.',
              },
            ],
          },
        ],
        importantNotes: [
          'List memakai kurung siku `[]`; dictionary memakai kurung kurawal `{}`. Jangan tertukar.',
          'Key dictionary ditulis sebagai teks (`"kategori"`), bukan nama variabel (`kategori`), kecuali kamu memang menyimpan variabel bernama begitu.',
          'Index yang tidak ada, misalnya `daftar_transaksi[5]` padahal isinya hanya 3, menghasilkan **IndexError**. Key yang salah menghasilkan **KeyError**.',
        ],
        commonMistakes: [
          'Mengambil transaksi pertama dengan `[1]` → itu transaksi **kedua**. Index pertama adalah `[0]`.',
          'Menulis `transaksi(kategori)` dengan tanda kurung → **TypeError**; dictionary diakses dengan `[]`.',
          'Menambahkan dictionary ke list dengan `daftar_transaksi + transaksi` → **TypeError**; gunakan `.append(transaksi)`.',
        ],
        practice: {
          id: 'bab3-uji-langkah-6',
          stepNumber: 6,
          keyTakeaway:
            'Dictionary untuk satu transaksi berlabel, list untuk menampung banyak transaksi. Index mulai dari 0.',
          questions: [
            {
              id: 'bab3-s6-q1',
              type: 'choice',
              question:
                'Struktur mana yang paling tepat untuk menyimpan detail **satu** transaksi (hari, kategori, jumlah)?',
              options: [
                'Dictionary: `{"hari": 1, "kategori": "Makan", "jumlah": 85000}`',
                'List kosong: `[]`',
                'Variabel boolean: `True`',
                'String: `"hari kategori jumlah"`',
              ],
              correctIndex: 0,
              explanation:
                'Dictionary memberi label pada setiap nilai sehingga detail transaksi mudah diambil berdasarkan nama key.',
              hint: 'Kita butuh pasangan label dan isi.',
            },
            {
              id: 'bab3-s6-q2',
              type: 'choice',
              question: 'Apa yang tercetak di terminal?',
              code: `buah = ["apel", "jeruk", "mangga"]
print(buah[1])`,
              options: ['`apel`', '`jeruk`', '`mangga`', '`IndexError`'],
              correctIndex: 1,
              explanation:
                'Index dimulai dari 0: buah[0] adalah apel, buah[1] adalah jeruk, dan buah[2] adalah mangga.',
              hint: 'Hitung posisi mulai dari nol, bukan satu.',
            },
            {
              id: 'bab3-s6-q3',
              type: 'fill',
              question: 'Lengkapi agar dictionary `transaksi` masuk ke akhir list `daftar_transaksi`.',
              code: `daftar_transaksi._____(transaksi)`,
              placeholder: 'nama method',
              acceptedAnswers: ['append'],
              explanation:
                '`append()` menambahkan satu data ke akhir list. Tanpa titik dan nama method, list tidak bertambah.',
              hint: 'Enam huruf, artinya "menambahkan di akhir".',
            },
          ],
        },
      },
      {
        id: 'langkah-7-perulangan',
        title: 'Langkah 7: Mengulang Pekerjaan dengan for & while',
        stepNumber: 7,
        stepLabel: 'for & while',
        stepTagline: 'Mengulang tanpa menyalin kode',
        content: `Kalau punya 30 transaksi, kita tidak mungkin menulis 30 baris penjumlahan. Perulangan (loop) menyuruh komputer mengulang perintah yang sama.

**\`for\` — untuk mengulang setiap isi kumpulan data.**
Bentuknya \`for harga in daftar_harga:\` diikuti perintah yang menjorok. Dibaca: "untuk setiap \`harga\` di dalam \`daftar_harga\`, lakukan baris di bawahnya". Perulangan berhenti otomatis setelah data terakhir.

**Pola penampung (accumulator):** sebelum loop, siapkan wadah kosong; di dalam loop, tambahkan nilainya.
\`total = 0\` disiapkan sekali, lalu \`total += harga\` dijalankan setiap putaran. Kalau \`daftar_harga = [25000, 15000, 45000]\`, isi \`total\` berubah begini:
- Mulai: \`total = 0\`
- Putaran 1 (\`harga = 25000\`): \`total = 25000\`
- Putaran 2 (\`harga = 15000\`): \`total = 40000\`
- Putaran 3 (\`harga = 45000\`): \`total = 85000\`

**\`while\` — ulang selama kondisi masih benar.**
Dipakai ketika jumlah pengulangan belum pasti, misalnya menu yang terus muncul sampai pengguna memilih keluar. Contoh kondisinya \`while pilihan != "0":\`.

**Hati-hati:** kalau kondisi tidak pernah berubah menjadi salah, program berputar selamanya (*infinite loop*). Pastikan ada jalan keluar, misalnya \`break\` atau perubahan nilai variabel.`,
        analogy:
          'for seperti memeriksa satu per satu struk di tumpukan. while seperti menunggu di halte: terus menunggu selama bus yang dituju belum datang, dan berhenti saat bus itu tiba.',
        codeSnippets: [
          {
            id: 'contoh-for-accumulator',
            title: 'for + accumulator dengan jejak per putaran',
            code: `daftar_harga = [25000, 15000, 45000]
total = 0

for harga in daftar_harga:
    total = total + harga
    print(f"Setelah {harga}, total = {total}")

print(f"Total akhir: Rp {total}")`,
            explanation:
              'total dimulai dari 0, lalu bertambah setiap putaran. Baris print di dalam loop menunjukkan prosesnya, sedangkan print terakhir di luar loop hanya mencetak hasil akhir sekali.',
            output: `Setelah 25000, total = 25000
Setelah 15000, total = 40000
Setelah 45000, total = 85000
Total akhir: Rp 85000`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 2,
                code: 'total = 0',
                explanation: 'Wadah penampung disiapkan sekali sebelum loop, bukan di dalam loop.',
              },
              {
                line: 4,
                code: 'for harga in daftar_harga:',
                explanation:
                  'Setiap data dalam list diambil bergantian dan disimpan sementara di variabel harga.',
              },
              {
                line: 5,
                code: '    total = total + harga',
                explanation: 'Nilai total lama ditambah harga saat ini, lalu disimpan kembali.',
              },
              {
                line: 8,
                code: 'print(f"Total akhir: Rp {total}")',
                explanation:
                  'Tidak menjorok, berarti berada di luar loop dan dijalankan sekali setelah loop selesai.',
              },
            ],
          },
          {
            id: 'contoh-while-menu',
            title: 'while untuk menu sampai pengguna keluar',
            code: `pilihan = ""

while pilihan != "0":
    pilihan = input("Pilih menu (0 untuk keluar): ")
    if pilihan == "0":
        print("Program selesai. Terima kasih!")
    else:
        print(f"Kamu memilih menu {pilihan}")`,
            explanation:
              'Loop terus berjalan selama pilihan belum "0". Begitu pengguna mengetik 0, kondisi menjadi salah dan loop berhenti.',
            output: `Pilih menu (0 untuk keluar): 1
Kamu memilih menu 1
Pilih menu (0 untuk keluar): 0
Program selesai. Terima kasih!`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 1,
                code: 'pilihan = ""',
                explanation:
                  'Nilai awal berupa teks kosong, supaya kondisi while pertama kali bernilai benar.',
              },
              {
                line: 3,
                code: 'while pilihan != "0":',
                explanation: 'Selama pilihan bukan "0", badan loop terus diulang.',
              },
              {
                line: 4,
                code: '    pilihan = input("Pilih menu (0 untuk keluar): ")',
                explanation:
                  'Nilai pilihan diperbarui setiap putaran. Inilah yang akhirnya bisa membuat loop berhenti.',
              },
            ],
          },
        ],
        importantNotes: [
          'Badan loop wajib menjorok ke dalam, sama seperti badan `if`.',
          'Variabel penampung (`total`) harus dibuat **sebelum** loop. Kalau dibuat di dalam loop, nilainya akan di-reset setiap putaran.',
          '`break` langsung menghentikan loop; `continue` melewati satu putaran dan lanjut ke putaran berikutnya.',
        ],
        commonMistakes: [
          'Lupa `total = 0` sebelum loop → `NameError` atau hasil salah.',
          'Menjorokkan `print(total)` ke dalam loop → total tercetak setiap putaran, bukan sekali di akhir.',
          'While dengan kondisi yang tidak pernah berubah → program menggantung. Selalu pastikan variabel kondisinya diperbarui.',
        ],
        practice: {
          id: 'bab3-uji-langkah-7',
          stepNumber: 7,
          keyTakeaway:
            '`for` mengulang isi kumpulan data; `while` mengulang selama kondisi benar. Penampung disiapkan sebelum loop.',
          questions: [
            {
              id: 'bab3-s7-q1',
              type: 'choice',
              question: 'Kapan sebaiknya memakai `for` dan kapan memakai `while`?',
              options: [
                '`for` untuk data yang jumlahnya sudah diketahui (mis. isi list); `while` selama kondisi masih benar (mis. menu sampai keluar)',
                '`for` hanya untuk angka; `while` hanya untuk teks',
                '`for` untuk menu; `while` untuk list',
                'Keduanya selalu bisa ditukar tanpa perbedaan',
              ],
              correctIndex: 0,
              explanation:
                'for cocok untuk menelusuri kumpulan data. while cocok saat pengulangan bergantung pada kondisi yang berubah.',
              hint: 'Pikirkan "setiap isi list" vs "selama belum memilih keluar".',
            },
            {
              id: 'bab3-s7-q2',
              type: 'choice',
              question: 'Apa yang tercetak di terminal?',
              code: `total = 0
for angka in [10000, 20000, 30000]:
    total += angka
print(total)`,
              options: ['`30000`', '`60000`', '`0`', '`Error`'],
              correctIndex: 1,
              explanation:
                'total bertambah 10000, lalu 20000, lalu 30000. Jumlahnya 60000 dan dicetak sekali setelah loop.',
              hint: 'Jumlahkan ketiga angka di dalam list.',
            },
            {
              id: 'bab3-s7-q3',
              type: 'fill',
              question: 'Lengkapi kata kunci untuk menelusuri setiap harga di dalam list.',
              code: `_____ harga in daftar_harga:`,
              placeholder: 'kata kunci loop',
              acceptedAnswers: ['for'],
              explanation:
                '`for harga in daftar_harga:` mengambil setiap isi list satu per satu. Jangan lupa titik dua di akhir baris.',
              hint: 'Tiga huruf, artinya "untuk setiap".',
            },
          ],
        },
      },
      {
        id: 'langkah-8-fungsi',
        title: 'Langkah 8: Membungkus Logika dengan Fungsi (def & return)',
        stepNumber: 8,
        stepLabel: 'def & return',
        stepTagline: 'Menulis sekali, memakai berkali-kali',
        content: `Fungsi adalah **resep bernama** yang bisa dipanggil berulang kali. Daripada menulis ulang rumus sisa saldo di lima tempat, kita tulis sekali sebagai fungsi.

**Bentuk dasar:**
\`def\` diikuti nama fungsi dan parameter dalam tanda kurung, lalu titik dua. Badan fungsi menjorok ke dalam. Di akhir, \`return\` mengirim hasil kembali ke baris yang memanggilnya.

- \`def\` → kata kunci untuk membuat fungsi.
- \`nama_fungsi\` → namanya, huruf kecil dengan garis bawah.
- **parameter** → "slot" nilai yang akan diberikan saat fungsi dipanggil.
- \`return\` → mengembalikan hasil.

**Memanggil fungsi:** \`sisa = hitung_sisa(3000000, 85000)\`. Nilai \`3000000\` dan \`85000\` disebut **argumen**, dan urutannya harus sesuai parameter.

**\`print\` vs \`return\` — bedanya besar!**
- \`print\` hanya **menampilkan** nilai ke layar; nilainya tidak bisa diolah lagi.
- \`return\` **mengembalikan** nilai sehingga bisa disimpan: \`sisa = hitung_sisa(...)\`, lalu dipakai untuk hitungan berikutnya.
- Fungsi tanpa \`return\` mengembalikan \`None\` (kosong).

**Parameter itu lokal:** variabel \`sisa\` di dalam fungsi tidak otomatis bisa diakses di luar. Itu fitur baik — fungsi tidak mengotori variabel lain.`,
        analogy:
          'Fungsi seperti mesin kopi di kantin: kamu memasukkan bahan (argumen), mesin bekerja dengan resep yang sama (badan fungsi), lalu mengeluarkan kopi jadi (return). Kamu tidak perlu tahu cara kerjanya setiap kali memesan.',
        codeSnippets: [
          {
            id: 'contoh-fungsi-sisa',
            title: 'Membuat dan memanggil fungsi',
            code: `def hitung_sisa(anggaran, total_pengeluaran):
    sisa = anggaran - total_pengeluaran
    return sisa

hasil = hitung_sisa(3000000, 85000)
print(f"Sisa saldo: Rp {hasil}")

print(f"Setelah belanja lagi: Rp {hitung_sisa(3000000, 185000)}")`,
            explanation:
              'Fungsi dipanggil dua kali dengan argumen berbeda, tetapi memakai rumus yang sama. Hasil return bisa disimpan di variabel hasil atau langsung dicetak.',
            output: `Sisa saldo: Rp 2915000
Setelah belanja lagi: Rp 2815000`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 1,
                code: 'def hitung_sisa(anggaran, total_pengeluaran):',
                explanation:
                  'Mendefinisikan fungsi bernama hitung_sisa dengan dua parameter. Titik dua menandai awal badan fungsi.',
              },
              {
                line: 3,
                code: '    return sisa',
                explanation:
                  'Mengirim nilai sisa ke pemanggil. Tanpa return, hasilnya menjadi None.',
              },
              {
                line: 5,
                code: 'hasil = hitung_sisa(3000000, 85000)',
                explanation:
                  'Memanggil fungsi dengan argumen 3000000 dan 85000. Urutan argumen harus sesuai parameter.',
              },
              {
                line: 8,
                code: 'print(f"Setelah belanja lagi: Rp {hitung_sisa(3000000, 185000)}")',
                explanation:
                  'Fungsi bisa dipanggil langsung di dalam f-string karena return menghasilkan nilai.',
              },
            ],
          },
          {
            id: 'contoh-fungsi-status',
            title: 'Fungsi dengan if di dalamnya',
            code: `def status_harian(pengeluaran, jatah):
    if pengeluaran > jatah:
        return "BOROS"
    elif pengeluaran > jatah * 0.7:
        return "WASPADA"
    else:
        return "AMAN"

print(status_harian(85000, 100000))
print(status_harian(125000, 100000))
print(status_harian(50000, 100000))`,
            explanation:
              'Fungsi mengembalikan teks status yang berbeda sesuai kondisi. return langsung menghentikan fungsi, jadi hanya satu status yang dikembalikan.',
            output: `WASPADA
BOROS
AMAN`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 1,
                code: 'def status_harian(pengeluaran, jatah):',
                explanation: 'Dua parameter: pengeluaran hari ini dan jatah harian.',
              },
              {
                line: 2,
                code: '    if pengeluaran > jatah:',
                explanation: 'Kondisi pertama diperiksa lebih dulu.',
              },
              {
                line: 4,
                code: '    elif pengeluaran > jatah * 0.7:',
                explanation:
                  'Jika tidak melebihi jatah tetapi sudah di atas 70%, statusnya WASPADA.',
              },
              {
                line: 9,
                code: 'print(status_harian(85000, 100000))',
                explanation:
                  '85% dari jatah berarti WASPADA. Nilai return langsung dicetak oleh print.',
              },
            ],
          },
        ],
        importantNotes: [
          'Fungsi harus **didefinisikan lebih dulu** sebelum dipanggil. Kalau dipanggil sebelum `def`, muncul **NameError**.',
          'Saat memanggil, tulis tanda kurung: `hitung_sisa(...)`. Menulis `hitung_sisa` tanpa kurung hanya menunjuk fungsinya, bukan menjalankannya.',
          '`return` langsung menghentikan fungsi. Kode setelah `return` di dalam fungsi yang sama tidak akan dijalankan.',
        ],
        commonMistakes: [
          'Lupa `return` → hasilnya `None` walaupun fungsi sudah mencetak angka.',
          'Menaruh `return` di luar indentasi fungsi → **SyntaxError** atau hasil tidak sesuai.',
          'Tertukar urutan argumen: `hitung_sisa(85000, 3000000)` menghasilkan angka negatif.',
          'Memberi nama fungsi sama dengan variabel, lalu bingung saat memanggilnya.',
        ],
        practice: {
          id: 'bab3-uji-langkah-8',
          stepNumber: 8,
          keyTakeaway:
            '`def` membuat fungsi, `return` mengirim hasil agar bisa disimpan dan diolah lagi. Tanpa return, hasilnya `None`.',
          questions: [
            {
              id: 'bab3-s8-q1',
              type: 'choice',
              question: 'Apa fungsi utama `return` di dalam sebuah fungsi?',
              options: [
                'Menampilkan hasil ke layar terminal',
                'Mengirim nilai kembali ke pemanggil agar bisa disimpan atau diolah lagi',
                'Mengulang fungsi sampai kondisi benar',
                'Menghentikan seluruh program',
              ],
              correctIndex: 1,
              explanation:
                'return mengembalikan nilai. Menampilkan ke layar adalah tugas print, bukan return.',
              hint: 'Bedakan "menampilkan" dengan "mengembalikan".',
            },
            {
              id: 'bab3-s8-q2',
              type: 'choice',
              question: 'Apa yang tercetak di terminal?',
              code: `def tambah(a, b):
    return a + b

print(tambah(3, 4))`,
              options: ['`34`', '`7`', '`None`', '`Error`'],
              correctIndex: 1,
              explanation:
                'Fungsi mengembalikan 3 + 4 = 7. Karena angkanya bertipe int, hasilnya 7, bukan teks "34".',
              hint: 'return a + b menjumlahkan, bukan menggabungkan teks.',
            },
            {
              id: 'bab3-s8-q3',
              type: 'fill',
              question: 'Lengkapi kata kunci untuk **membuat** sebuah fungsi.',
              code: `_____ hitung_sisa(anggaran, keluar):`,
              placeholder: 'kata kunci',
              acceptedAnswers: ['def'],
              explanation:
                '`def` adalah kata kunci untuk mendefinisikan fungsi. Setelahnya ada nama fungsi, parameter, dan titik dua.',
              hint: 'Tiga huruf, singkatan dari define.',
            },
          ],
        },
      },
      {
        id: 'langkah-9-import',
        title: 'Langkah 9: Memecah Program dengan import',
        stepNumber: 9,
        stepLabel: 'import',
        stepTagline: 'Menyambung tiga file',
        content: `Sampai sini, semua kode kita ada dalam satu file. Program keuangan yang sebenarnya dipecah menjadi tiga file supaya rapi:
- \`pencatat.py\` → logika data dan hitungan
- \`laporan.py\` → format Rupiah dan status
- \`main.py\` → menu dan penghubung

**Cara menyambungnya: \`import\`.**

Misalnya \`pencatat.py\` berisi fungsi \`hitung_jatah_harian\`. Di file lain, \`main.py\` cukup menulis \`import pencatat\`, lalu memanggil fungsinya dengan **nama file diikuti titik**: \`jatah = pencatat.hitung_jatah_harian(3000000, 30)\`.

**Aturan penting:**
- Tulis nama file **tanpa \`.py\`**: \`import pencatat\`, bukan \`import pencatat.py\`.
- Kedua file harus berada di **folder yang sama**.
- Awalan \`pencatat.\` wajib. Tanpa itu, Python tidak tahu fungsi itu milik file mana.

**Kenapa repot-repot dipisah?** Karena setiap file punya satu tanggung jawab. Saat ada error di format Rupiah, kamu cukup membuka \`laporan.py\`, tidak perlu menyisir 300 baris kode. Ini yang disebut **modularitas**.

**Alternatif:** \`from pencatat import hitung_jatah_harian\` memungkinkan memanggil \`hitung_jatah_harian(...)\` langsung tanpa awalan. Namun di proyek ini kita memakai \`import pencatat\` agar jelas asal setiap fungsi.`,
        analogy:
          'Seperti menyambung alat elektronik ke stopkontak: import adalah kabel yang menghubungkan main.py ke pencatat.py. Setelah tersambung, semua alat di dalamnya bisa dipakai.',
        codeSnippets: [
          {
            id: 'contoh-modul-pencatat',
            filename: 'pencatat.py',
            title: 'File yang menyediakan fungsi',
            code: `# pencatat.py
def hitung_jatah_harian(anggaran, hari):
    return anggaran // hari`,
            explanation:
              'File ini hanya menyiapkan fungsi. Saat dijalankan sendiri, tidak ada yang dicetak karena belum ada perintah print.',
            output: '(Tidak ada output — file ini hanya menyiapkan fungsi.)',
            isSimulated: true,
            lineExplanations: [
              {
                line: 2,
                code: 'def hitung_jatah_harian(anggaran, hari):',
                explanation: 'Fungsi ini disimpan di dalam file pencatat.py.',
              },
              {
                line: 3,
                code: '    return anggaran // hari',
                explanation:
                  'Hasil pembagian bulat dikembalikan ke file yang memanggil fungsi ini.',
              },
            ],
          },
          {
            id: 'contoh-modul-main',
            filename: 'main.py',
            title: 'File yang memakai fungsi dari file lain',
            code: `# main.py
import pencatat

jatah = pencatat.hitung_jatah_harian(3000000, 30)
print(f"Jatah harian: Rp {jatah}")`,
            explanation:
              'import pencatat membaca file pencatat.py. Awalan pencatat. memberi tahu Python di file mana fungsi itu berada.',
            output: `Jatah harian: Rp 100000`,
            isSimulated: true,
            lineExplanations: [
              {
                line: 2,
                code: 'import pencatat',
                explanation: 'Menyambungkan main.py dengan pencatat.py yang ada di folder yang sama.',
              },
              {
                line: 4,
                code: 'jatah = pencatat.hitung_jatah_harian(3000000, 30)',
                explanation:
                  'Memanggil fungsi dari modul pencatat. Tanpa awalan pencatat., fungsi tidak dikenali.',
              },
            ],
          },
        ],
        importantNotes: [
          'Jalankan `python main.py` dari folder proyek, bukan `python pencatat.py`. File utama adalah pintu masuk program.',
          'Jangan menamai file sama dengan modul bawaan Python (misalnya `random.py` atau `math.py`), karena bisa menimpa modul asli.',
          'Saat diimpor, seluruh kode di tingkat atas file ikut dijalankan. Itulah sebabnya nanti kita menaruh menu di dalam fungsi `main()` dan memakai `if __name__ == "__main__":` di Bab 6.',
        ],
        commonMistakes: [
          '`import pencatat.py` → **ModuleNotFoundError**. Tulis `import pencatat`.',
          'File berada di folder berbeda → **ModuleNotFoundError**. Satukan dalam satu folder proyek.',
          'Menulis `hitung_jatah_harian(3000000, 30)` setelah `import pencatat` → **NameError**. Gunakan awalan `pencatat.`.',
          'Salah huruf besar/kecil nama file di Windows bisa lolos, tetapi di Linux/Mac gagal. Konsisten huruf kecil.',
        ],
        practice: {
          id: 'bab3-uji-langkah-9',
          stepNumber: 9,
          keyTakeaway:
            '`import nama_file` menyambung file lain; panggil fungsinya dengan awalan `nama_file.`.',
          questions: [
            {
              id: 'bab3-s9-q1',
              type: 'choice',
              question:
                'File `pencatat.py` berisi fungsi `hitung_jatah_harian`. Bagaimana cara memanggilnya dari `main.py`?',
              options: [
                '`import pencatat` lalu `pencatat.hitung_jatah_harian(3000000, 30)`',
                '`import pencatat.py` lalu `pencatat.hitung_jatah_harian(3000000, 30)`',
                '`import pencatat` lalu `hitung_jatah_harian(3000000, 30)`',
                '`pencatat.hitung_jatah_harian(3000000, 30)` tanpa import',
              ],
              correctIndex: 0,
              explanation:
                'Nama file diimpor tanpa .py, lalu fungsinya dipanggil dengan awalan nama modul.',
              hint: 'Periksa dua hal: tanpa .py, dan memakai awalan titik.',
            },
            {
              id: 'bab3-s9-q2',
              type: 'choice',
              question:
                'Setelah `import laporan`, kamu menulis `format_rupiah(85000)`. Apa yang terjadi, padahal fungsi itu ada di `laporan.py`?',
              options: [
                'Berhasil karena fungsi otomatis tersedia',
                '`NameError`, karena harus ditulis `laporan.format_rupiah(85000)`',
                '`SyntaxError`, karena import harus di akhir file',
                '`IndexError`, karena list tidak punya index',
              ],
              correctIndex: 1,
              explanation:
                'Tanpa `from laporan import format_rupiah`, fungsi harus dipanggil dengan awalan modulnya: `laporan.format_rupiah(85000)`.',
              hint: 'Ingat aturan ketiga: awalan nama file wajib.',
            },
            {
              id: 'bab3-s9-q3',
              type: 'fill',
              question: 'Lengkapi perintah untuk menyambungkan file `pencatat.py`.',
              code: `_____ pencatat`,
              placeholder: 'kata kunci',
              acceptedAnswers: ['import'],
              explanation:
                '`import pencatat` menyambungkan modul. Nama file ditulis tanpa `.py`.',
              hint: 'Enam huruf, artinya "impor".',
            },
          ],
        },
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
        hint: 'Perhatikan dua garis miring. Hasilnya tidak memiliki titik desimal.',
      },
      {
        id: 'prediksi-bab3-tipe-input',
        title: 'Tebak Hasil Penjumlahan Teks',
        prompt: 'Perhatikan kode berikut. Apa yang akan dicetak oleh Python?',
        code: `a = "100"
b = "200"
print(a + b)`,
        options: ['300', '"300"', '100200', 'Error'],
        correctAnswer: '100200',
        explanation:
          'Karena a dan b diapit tanda petik, keduanya bertipe String. Operator + pada String menyambungkan kedua teks tersebut menjadi "100200", bukan menjumlahkannya!',
        hint: 'Tanda + pada teks berarti menyambung, bukan menambah.',
      },
      {
        id: 'prediksi-bab3-fstring',
        title: 'Tebak Hasil f-string',
        prompt: 'Apa yang tercetak di terminal?',
        code: `nama = "Sari"
saldo = 150000
print(f"{nama} punya Rp {saldo}")`,
        options: [
          'Sari punya Rp 150000',
          '{nama} punya Rp {saldo}',
          'Sari punya Rp saldo',
          'Error karena kurung kurawal tidak boleh di dalam teks',
        ],
        correctAnswer: 'Sari punya Rp 150000',
        explanation:
          'Huruf f sebelum tanda petik membuat Python mengganti setiap {variabel} dengan isinya: nama menjadi Sari dan saldo menjadi 150000.',
        hint: 'f-string mengisi bagian dalam kurung kurawal dengan nilai variabel.',
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
        explanation:
          'Kata kunci return digunakan untuk mengirimkan hasil perhitungan fungsi ke pemanggilnya. Tanpa return, hasilnya menjadi None.',
        hint1: 'Bahasa Inggris untuk "mengembalikan"',
        hint2: 'Diawali huruf r dan berakhiran n',
      },
    ],
    quiz: [
      {
        id: 'q-bab3-1',
        question: 'Apa output dari kode berikut?',
        codeSnippet: `anggaran = 2000000
hari = 25
print(anggaran // hari)`,
        options: ['80000.0', '80000', '80000.5', 'Error'],
        correctIndex: 1,
        explanation:
          'Pembagian bulat // menghasilkan 80000 bertipe int. Kalau memakai /, hasilnya 80000.0 (float).',
      },
      {
        id: 'q-bab3-2',
        question:
          'Pengguna mengetik 75000 pada kode `nominal = input("Nominal: ")`. Mengapa `nominal + 5000` gagal?',
        options: [
          'Karena input() menghasilkan teks (string), sehingga tidak bisa dijumlahkan dengan angka',
          'Karena 75000 terlalu besar untuk Python',
          'Karena input() hanya boleh dipakai satu kali',
          'Karena setelah input() harus ada titik dua',
        ],
        correctIndex: 0,
        explanation:
          'input() selalu mengembalikan string. Bungkus dengan int() agar nominal bisa dihitung sebagai angka.',
      },
      {
        id: 'q-bab3-3',
        question: 'Manakah penulisan f-string yang benar untuk mencetak isi variabel `nama`?',
        options: [
          '`print(f"Halo, {nama}!")`',
          '`print(f"Halo, nama!")`',
          '`print("Halo, {nama}!")`',
          '`print(f "Halo, {nama}!")`',
        ],
        correctIndex: 0,
        explanation:
          'Huruf f harus menempel langsung pada tanda petik. Nama variabel di dalam kurung kurawal akan diganti dengan isinya.',
      },
      {
        id: 'q-bab3-4',
        question: 'Apa yang tercetak di terminal?',
        codeSnippet: `transaksi = {"kategori": "Makan", "jumlah": 85000}
daftar = [transaksi]
print(daftar[0]["jumlah"])`,
        options: ['85000', '"Makan"', '0', 'KeyError'],
        correctIndex: 0,
        explanation:
          'daftar[0] mengambil dictionary pertama, lalu ["jumlah"] mengambil nilai dengan key jumlah, yaitu 85000.',
      },
      {
        id: 'q-bab3-5',
        question: 'Apa yang tercetak di terminal?',
        codeSnippet: `total = 0
for harga in [10000, 20000]:
    total += harga
print(total)`,
        options: ['10000', '20000', '30000', '0'],
        correctIndex: 2,
        explanation:
          'total bertambah 10000 lalu 20000, sehingga hasil akhirnya 30000 dan dicetak sekali setelah loop.',
      },
      {
        id: 'q-bab3-6',
        question: 'Apa yang tercetak di terminal?',
        codeSnippet: `def hitung(a, b):
    hasil = a - b
    print(hasil)

sisa = hitung(100000, 40000)
print(sisa)`,
        options: ['60000 lalu 60000', '60000 lalu None', 'None lalu 60000', 'Error'],
        correctIndex: 1,
        explanation:
          'Fungsi mencetak 60000, tetapi tidak memiliki return. Karena itu variabel sisa berisi None, lalu dicetak sebagai None.',
      },
      {
        id: 'q-bab3-7',
        question:
          'pencatat.py dan main.py berada di folder yang sama. Kode mana yang benar untuk memakai fungsi dari pencatat.py?',
        options: [
          '`import pencatat` lalu `pencatat.hitung_jatah_harian(3000000, 30)`',
          '`import pencatat.py` lalu `pencatat.hitung_jatah_harian(3000000, 30)`',
          '`import pencatat` lalu `hitung_jatah_harian(3000000, 30)`',
          'Cukup `pencatat.hitung_jatah_harian(3000000, 30)` tanpa import',
        ],
        correctIndex: 0,
        explanation:
          'Nama modul ditulis tanpa .py, dan fungsi dipanggil dengan awalan nama modul diikuti titik.',
      },
    ],
    summaryPoints: [
      'Langkah 1 — `print()` menampilkan teks (bertanda petik) atau angka; setiap print() pindah baris.',
      'Langkah 2 — Variabel adalah wadah bernama; `=` mengisi, `==` membandingkan.',
      'Langkah 3 — `input()` selalu menghasilkan teks, jadi bungkus dengan `int()` sebelum dihitung.',
      'Langkah 4 — `/` menghasilkan float, `//` menghasilkan bilangan bulat, `%` memberi sisa bagi.',
      'Langkah 5 — `if/elif/else` menjalankan satu jalur saja; jangan lupa titik dua dan indentasi 4 spasi.',
      'Langkah 6 — Dictionary untuk satu transaksi, list untuk banyak transaksi; index dimulai dari 0.',
      'Langkah 7 — `for` mengulang isi list dengan penampung `total`; `while` mengulang selama kondisi benar.',
      'Langkah 8 — `def` membuat fungsi dan `return` mengembalikan hasil agar bisa diolah lagi.',
      'Langkah 9 — `import` menyambung file; panggil fungsi dengan awalan `nama_modul.`.',
      'Uji dirimu: 3 soal per langkah harus benar semua sebelum lanjut ke Bab 4.',
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
