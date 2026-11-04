import { Chapter } from '../../types';

export const bab7to11: Record<string, Partial<Chapter>> = {
  'bab-7': {
    number: 8,
    prevChapterId: 'bab-tampilan',
    nextChapterId: 'bab-8',
    openingAnalogy:
      'Bayangkan kamu merekam perjalanan uang saku dari tanggal 1 sampai tanggal 30. Setiap kali belanja, kamu mencatat: hari berapa, jenis apa, kategori apa, dan berapa jumlahnya. Di akhir bulan, kamu bisa melihat persis ke mana uang pergi.',
    sections: [
      {
        id: 'mengapa-perlu-trace',
        title: '1. Mengapa Kita Harus Melacak Alur Program?',
        content: `Kode komputer sering terlihat seperti teks mati. Namun saat dijalankan, variabel di memori terus berubah. Dengan menelusuri setiap langkah, kita tahu **kapan** saldo berubah dan **mengapa** status berubah dari AMAN ke BOROS.

Di proyek 4 file, alur program melibatkan:
- \`main.py\`: membaca pilihan menu.
- \`pencatat.py\`: mengubah \`akun\` dan \`transaksi\`.
- \`laporan.py\`: membaca data dan menampilkan status.
- \`tampilan.py\`: menggambar kotak, tabel, dan batang.`,
        analogy:
          'Seperti rekaman gerak lambat pertandingan sepak bola: kita bisa melihat bola dioper dari pemain ke pemain sampai masuk gawang.',
        importantNotes: [
          'Data disimpan di dictionary akun dan list transaksi.',
          'Status harian dihitung dari pengeluaran hari ini dibanding jatah.',
          'Saat hari berganti, transaksi lama tetap tersimpan.',
        ],
        projectConnection: {
          file: 'main.py',
          note: 'main.py mengatur urutan aksi; pencatat.py mengubah data; laporan.py menampilkan hasil.',
        },
      },
      {
        id: 'skenario-mahasiswa',
        title: '2. Skenario Nyata Mahasiswa Rian di Awal Bulan',
        content: `Rian membuka program dan mengatur anggaran Rp3.000.000 untuk 30 hari. Jatah harian = 3.000.000 / 30 = **Rp100.000**.

1. **Menu 1** — Rian mencatat Makan Rp85.000. Pengeluaran hari ini 85.000. Status **HATI-HATI** karena >= 80% jatah.
2. **Menu 3** — Rian melihat ringkasan. Saldo berkurang menjadi Rp2.915.000.
3. **Menu 1** — Rian mencatat Transport Rp40.000. Total hari ini 125.000. Status berubah menjadi **BOROS!** karena melebihi jatah.
4. **Menu 4** — Rian melihat riwayat transaksi dalam tabel.
5. **Menu 5** — Rian melihat laporan per kategori dan batang kemajuan.
6. **Menu 6** — Rian pindah ke hari ke-2. Pengeluaran harian reset, tetapi riwayat tetap tersimpan.
7. **Menu 0** — Rian keluar dari program.`,
        analogy:
          'Seperti memeriksa struk belanja satu per satu: setiap baris menambah atau mengurangi saldo, dan status dihitung dari baris hari ini.',
        codeSnippets: [
          {
            id: 'kode-menu-baru',
            title: 'Menu baru di main.py',
            filename: 'main.py',
            code: `MENU = [
    ("1", "Catat pengeluaran"),
    ("2", "Catat pemasukan"),
    ("3", "Cek saldo dan peringatan"),
    ("4", "Riwayat transaksi"),
    ("5", "Laporan per kategori"),
    ("6", "Lanjut ke hari berikutnya"),
    ("7", "Atur ulang anggaran"),
    ("0", "Keluar"),
]`,
            explanation:
              'Menu sekarang punya 7 aksi utama dan menu 0. Menu 7 mengatur ulang anggaran; menu 6 pindah hari.',
            output: `(Tidak ada output — ini hanya definisi menu.)`,
            isSimulated: true,
          },
        ],
        importantNotes: [
          'Jatah harian dihitung sekali saat anggaran diatur.',
          'Status harian memakai ambang 80% jatah.',
          'Transaksi lama tidak hilang saat hari berganti.',
        ],
        projectConnection: {
          file: 'pencatat.py',
          note: 'Data transaksi dan akun diubah oleh fungsi di pencatat.py.',
          code: `akun["hari"] += 1\ntransaksi.append((akun["hari"], "keluar", kategori, jumlah))`,
        },
      },
      {
        id: 'membaca-state',
        title: '3. Membaca State: akun dan transaksi',
        content: `**State** adalah isi memori program pada satu waktu. Di proyek ini, state utama ada di dua tempat:

- \`akun\`: dictionary berisi uang_saku, jumlah_hari, jatah_harian, dan hari.
- \`transaksi\`: list berisi tuple (hari, jenis, kategori, jumlah).

Contoh state setelah Rian mencatat Makan Rp85.000:

\`\`\`python
akun = {"uang_saku": 3000000, "jumlah_hari": 30, "jatah_harian": 100000.0, "hari": 1}
transaksi = [
    (1, "masuk", "Anggaran", 3000000),
    (1, "keluar", "Makan", 85000),
]
\`\`\`

Dari state ini, \`hitung_saldo()\` menghasilkan 2.915.000 dan \`pengeluaran_hari(1)\` menghasilkan 85.000.`,
        analogy:
          'Seperti isi dompet dan struk di dalam tas: state adalah isi tas saat ini, bukan seluruh riwayat hidupmu.',
        codeSnippets: [
          {
            id: 'kode-state',
            title: 'State setelah mencatat Makan',
            filename: 'pencatat.py',
            code: `akun = {"uang_saku": 3000000, "jumlah_hari": 30, "jatah_harian": 100000.0, "hari": 1}
transaksi = [
    (1, "masuk", "Anggaran", 3000000),
    (1, "keluar", "Makan", 85000),
]

print(hitung_saldo())
print(pengeluaran_hari(1))`,
            explanation:
              'hitung_saldo() menjumlahkan pemasukan dan mengurangi pengeluaran. pengeluaran_hari(1) hanya menghitung transaksi keluar pada hari ke-1.',
            output: `2915000\n85000`,
            isSimulated: true,
          },
        ],
        importantNotes: [
          'State berubah setiap kali fungsi pencatat.py dipanggil.',
          'Jangan mengubah state langsung dari laporan.py; gunakan fungsi pencatat.py.',
          'Data hilang saat program ditutup karena tidak disimpan ke file.',
        ],
        projectConnection: {
          file: 'laporan.py',
          note: 'laporan.py membaca state untuk menampilkan ringkasan dan status.',
          code: `saldo = hitung_saldo()\nkeluar_hari_ini = pengeluaran_hari(akun["hari"])`,
        },
      },
    ],
    sequenceExercise: {
      id: 'seq-bab7-alur-baru',
      title: 'Susun Urutan Alur Program 4 File',
      prompt:
        'Urutkan langkah penggunaan program pencatat keuangan terbaru dari awal sampai akhir:',
      explanation:
        'Urutan yang logis: jalankan main.py, atur anggaran, catat pengeluaran, cek status, lihat riwayat, lihat laporan kategori, pindah hari, lalu keluar.',
      items: [
        { id: 'item-1', text: 'Jalankan python main.py di terminal', order: 1 },
        { id: 'item-2', text: 'Isi anggaran dan jumlah hari lewat setup_awal()', order: 2 },
        { id: 'item-3', text: 'Pilih menu 1 untuk mencatat pengeluaran', order: 3 },
        { id: 'item-4', text: 'Pilih menu 3 untuk cek saldo dan peringatan', order: 4 },
        { id: 'item-5', text: 'Pilih menu 4 untuk melihat riwayat transaksi', order: 5 },
        { id: 'item-6', text: 'Pilih menu 5 untuk laporan per kategori', order: 6 },
        { id: 'item-7', text: 'Pilih menu 6 untuk pindah ke hari berikutnya', order: 7 },
        { id: 'item-8', text: 'Pilih menu 0 untuk keluar', order: 8 },
      ],
    },
    quiz: [
      {
        id: 'q-bab7-1',
        question: 'Apa yang terjadi pada transaksi hari ke-1 saat pengguna memilih menu 6?',
        options: [
          'Semua transaksi hari ke-1 dihapus',
          'Transaksi tetap tersimpan, hanya akun["hari"] bertambah',
          'Program error dan harus diinstal ulang',
          'Anggaran menjadi nol',
        ],
        correctIndex: 1,
        explanation:
          'Menu 6 memanggil hari_berikutnya() yang hanya menaikkan akun["hari"]. List transaksi tidak diubah.',
      },
      {
        id: 'q-bab7-2',
        question: 'Jika jatah 100.000 dan pengeluaran hari ini 85.000, status apa yang muncul?',
        options: ['AMAN', 'HATI-HATI', 'BOROS!', 'BELUM DIATUR'],
        correctIndex: 1,
        explanation:
          '85.000 >= 0.8 * 100.000 (80.000), tetapi tidak lebih dari 100.000, sehingga HATI-HATI.',
      },
      {
        id: 'q-bab7-3',
        question: 'State mana yang menyimpan jumlah transaksi?',
        options: ['akun', 'transaksi', 'KATEGORI', 'MENU'],
        correctIndex: 1,
        explanation:
          'transaksi adalah list yang menampung semua tuple transaksi. akun menyimpan data ringkas.',
      },
      {
        id: 'q-bab7-4',
        question: 'Mengapa saldo berkurang setelah mencatat pengeluaran?',
        options: [
          'Karena program menghapus transaksi lama',
          'Karena hitung_saldo() mengurangi jumlah transaksi jenis "keluar"',
          'Karena jatah harian diubah',
          'Karena warna merah',
        ],
        correctIndex: 1,
        explanation:
          'hitung_saldo() menjumlahkan pemasukan dan mengurangi pengeluaran. Maka saldo berkurang.',
      },
      {
        id: 'q-bab7-5',
        question: 'Menu 7 digunakan untuk apa?',
        options: [
          'Mencatat pengeluaran',
          'Mengatur ulang anggaran dan menghapus transaksi lama',
          'Melihat riwayat',
          'Keluar dari program',
        ],
        correctIndex: 1,
        explanation:
          'Menu 7 memanggil setup_awal(True), yang memanggil atur_uang_saku() dan membersihkan transaksi lama.',
      },
    ],
    summaryPoints: [
      'Alur program melibatkan main.py (menu), pencatat.py (data), laporan.py (status/laporan), dan tampilan.py (tampilan).',
      'State utama ada di dictionary akun dan list transaksi.',
      'Status harian: BOROS jika > jatah, HATI-HATI jika >= 80% jatah, selain itu AMAN.',
      'Menu 6 menaikkan hari tanpa menghapus transaksi lama; menu 7 mengatur ulang anggaran dan menghapus transaksi.',
    ],
    cheatSheet: {
      title: 'Cheat Sheet Bab 8 — Mengikuti Jalannya Program',
      items: [
        'State = isi memori program pada satu waktu.',
        'akun: dictionary uang_saku, jumlah_hari, jatah_harian, hari.',
        'transaksi: list of tuple (hari, jenis, kategori, jumlah).',
        'Menu 1 catat pengeluaran; menu 2 catat pemasukan; menu 3 cek status.',
        'Menu 4 riwayat; menu 5 laporan kategori; menu 6 pindah hari; menu 7 atur ulang.',
        'Menu 0 keluar dengan break.',
        'Status: BOROS > jatah, HATI-HATI >= 80% jatah, AMAN < 80%.',
        'Transaksi lama tetap tersimpan saat hari berganti.',
      ],
      code: `saldo = hitung_saldo()\nkeluar = pengeluaran_hari(akun["hari"])\nprint(saldo, keluar)`,
    },
    commonError: {
      name: 'IndexError: tuple index out of range',
      message: 'IndexError: tuple index out of range',
      cause:
        'Pengguna memilih nomor kategori 6, tetapi KATEGORI[pilihan] mengakses index 6 yang tidak ada (index valid 0-5).',
      fix:
        'Gunakan KATEGORI[pilihan - 1] karena nomor pilihan mulai 1, sedangkan index tuple mulai 0.',
      badCode: `pilihan = 6\nkategori = KATEGORI[pilihan]`,
      goodCode: `pilihan = 6\nkategori = KATEGORI[pilihan - 1]`,
    },
    tryItYourself: [
      {
        id: 'bab7-coba-1',
        level: 'Mudah',
        prompt: 'Setelah akun["hari"] = 2 dan transaksi hari 1 ada, cetak pengeluaran hari 1 dan hari 2.',
        starterCode: `transaksi = [(1, "keluar", "Makan", 85000), (2, "keluar", "Transport", 40000)]\n# cetak pengeluaran_hari(1) dan pengeluaran_hari(2)`,
        answerCode: `transaksi = [(1, "keluar", "Makan", 85000), (2, "keluar", "Transport", 40000)]\n\ndef pengeluaran_hari(hari_ke):\n    total = 0\n    for hari, jenis, kategori, jumlah in transaksi:\n        if hari == hari_ke and jenis == "keluar":\n            total += jumlah\n    return total\n\nprint(pengeluaran_hari(1))\nprint(pengeluaran_hari(2))`,
        explanation: 'Hasilnya 85000 dan 40000. Setiap hari punya total sendiri.',
      },
      {
        id: 'bab7-coba-2',
        level: 'Sedang',
        prompt: 'Tentukan status untuk pengeluaran 85000 dengan jatah 100000. Gunakan if/elif/else.',
        starterCode: `keluar = 85000\njatah = 100000\n# tulis if/elif/else`,
        answerCode: `keluar = 85000\njatah = 100000\nif keluar > jatah:\n    print("BOROS!")\nelif keluar >= 0.8 * jatah:\n    print("HATI-HATI")\nelse:\n    print("AMAN")`,
        explanation: '85000 >= 80000, jadi hasilnya HATI-HATI.',
      },
      {
        id: 'bab7-coba-3',
        level: 'Tantangan',
        prompt: 'Tulis fungsi saldo_setelah(transaksi, tambahan) yang mengembalikan saldo setelah menambah satu transaksi keluar.',
        starterCode: `transaksi = [(1, "masuk", "Anggaran", 3000000), (1, "keluar", "Makan", 85000)]\n\ndef saldo_setelah(transaksi, tambahan):\n    # tulis di sini\n    pass`,
        answerCode: `transaksi = [(1, "masuk", "Anggaran", 3000000), (1, "keluar", "Makan", 85000)]\n\ndef saldo_setelah(transaksi, tambahan):\n    saldo = 0\n    for hari, jenis, kategori, jumlah in transaksi:\n        if jenis == "masuk":\n            saldo += jumlah\n        else:\n            saldo -= jumlah\n    return saldo - tambahan\n\nprint(saldo_setelah(transaksi, 40000))`,
        explanation: 'Saldo awal 2.915.000, dikurangi tambahan 40.000 menjadi 2.875.000.',
      },
    ],
    fixTheBug: {
      id: 'bab7-fix-1',
      title: 'Perbaiki: kategori bergeser satu',
      prompt:
        'Pengguna memilih nomor 1, tetapi program mencatat kategori kedua. Perbaiki akses KATEGORI.',
      buggyCode: `KATEGORI = ("Makan", "Transport", "Kuota", "Kuliah/Tugas", "Hiburan", "Lainnya")\npilihan = 1\nkategori = KATEGORI[pilihan]\nprint(kategori)`,
      answerCode: `KATEGORI = ("Makan", "Transport", "Kuota", "Kuliah/Tugas", "Hiburan", "Lainnya")\npilihan = 1\nkategori = KATEGORI[pilihan - 1]\nprint(kategori)`,
      explanation:
        'Nomor pilihan mulai 1, index tuple mulai 0. Karena itu dikurangi 1.',
    },
    traceTable: {
      title: 'Tabel jejak: menu 1 → menu 3 → menu 6',
      description: 'Perhatikan perubahan akun["hari"] dan status.',
      steps: [
        { line: 1, code: 'pilihan = "1"', variables: { hari: '1', aksi: 'catat pengeluaran' }, note: 'Pengguna mencatat Makan 85000.' },
        { line: 2, code: 'tambah_pengeluaran(85000, "Makan")', variables: { hari: '1', transaksi: '2 baris' }, note: 'Transaksi baru ditambahkan.' },
        { line: 3, code: 'pilihan = "3"', variables: { hari: '1', aksi: 'cek status' }, note: 'Status HATI-HATI.' },
        { line: 4, code: 'pilihan = "6"', variables: { hari: '1', aksi: 'pindah hari' }, note: 'Menu 6 dipilih.' },
        { line: 5, code: 'akun["hari"] += 1', variables: { hari: '2', transaksi: '2 baris' }, note: 'Hari menjadi 2, transaksi tetap.' },
      ],
    },
  },

  'bab-8': {
    number: 9,
    prevChapterId: 'bab-7',
    nextChapterId: 'bab-9',
    openingAnalogy:
      'Bayangkan error seperti lampu indikator di dasbor motor. Lampu bensin berkedip bukan berarti motor rusak selamanya; kamu hanya perlu mengisi bensin. Pesan error memberi tahu bagian mana yang perlu diperiksa.',
    sections: [
      {
        id: 'filosofi-error',
        title: '1. Error Bukan Tanda Kamu Bodoh!',
        content: `Setiap programmer berpengalaman menghadapi error puluhan kali sehari. Bedanya, mereka membaca **nama error** dan **nomor baris**, lalu memperbaiki satu hal.

Pesan error Python disebut **traceback**. Bagian penting biasanya di dua baris paling bawah:
- Baris atas: nama file dan nomor baris, misalnya \`File "laporan.py", line 12\`.
- Baris bawah: nama error dan alasannya, misalnya \`ValueError: invalid literal for int()\`.

Di proyek 4 file, error sering muncul karena:
- Input pengguna salah (ValueError).
- Lupa titik dua atau indentasi (SyntaxError/IndentationError).
- Salah ketik nama fungsi (NameError).
- Mengakses index yang tidak ada (IndexError).
- File modul tidak ditemukan (ModuleNotFoundError).`,
        analogy:
          'Seperti lampu indikator di dasbor motor: bukan berarti motor rusak selamanya, hanya perlu diperiksa.',
        importantNotes: [
          'Baca traceback dari bawah ke atas untuk menemukan nama error.',
          'Perbaiki satu hal, jalankan lagi, jangan mengubah banyak hal sekaligus.',
          'Error adalah petunjuk, bukan kegagalan.',
        ],
        projectConnection: {
          file: 'laporan.py',
          note: 'baca_angka() dan baca_pilihan() menangani ValueError agar program tidak crash.',
        },
      },
      {
        id: 'delapan-error',
        title: '2. Delapan Jenis Error yang Paling Sering Muncul',
        content: `Berikut error yang sering ditemui di proyek keuangan:

1. **IndentationError** — spasi/tab di awal baris tidak sejajar setelah titik dua.
2. **SyntaxError** — lupa titik dua, kurung tutup kurang, atau tanda petik tidak berpasangan.
3. **NameError** — salah ketik nama variabel/fungsi, misalnya \`format_rupiahh\`.
4. **TypeError** — menggabungkan teks dan angka tanpa konversi, atau mengubah tuple.
5. **IndexError** — mengakses index list/tuple yang tidak ada.
6. **KeyError** — mengakses key dictionary yang tidak ada.
7. **ValueError** — \`int("abc")\` atau input tidak valid.
8. **ZeroDivisionError** — membagi dengan nol.
9. **ModuleNotFoundError** — file modul tidak ditemukan atau salah ketik nama import.`,
        analogy:
          'Seperti daftar gejala penyakit: setiap gejala menunjuk ke bagian tubuh yang perlu diperiksa.',
        importantNotes: [
          'ValueError dan ZeroDivisionError sering muncul di laporan.py dan pencatat.py.',
          'ModuleNotFoundError sering muncul jika tampilan.py tidak ada di folder yang sama.',
          'KeyError sering muncul jika nama key salah ketik.',
        ],
        projectConnection: {
          file: 'pencatat.py',
          note: 'Jika jumlah_hari 0, atur_uang_saku() akan memicu ZeroDivisionError. Validasi di laporan.py mencegahnya.',
        },
      },
      {
        id: 'try-except',
        title: '3. Menangani Error dengan try/except dan raise',
        content: `\`try/except\` menjalankan kode yang berisiko error. Jika error terjadi, program tidak berhenti, melainkan menjalankan blok \`except\`.

Contoh di \`baca_angka()\`:

\`\`\`python
while True:
    try:
        angka = int(input("Jumlah: "))
        if angka <= 0:
            raise ValueError("harus lebih dari 0")
        return angka
    except ValueError:
        print("Input salah, coba lagi.")
\`\`\`

- \`try\`: kode yang mungkin error.
- \`except ValueError\`: menangkap ValueError.
- \`raise ValueError(...)\`: memicu error sendiri saat validasi gagal.
- \`while True\`: mengulang sampai input benar.

**Penting:** jangan menangkap semua error dengan \`except:\` tanpa nama. Itu bisa menyembunyikan bug lain.`,
        analogy:
          'Seperti satpam yang menangkap tamu tanpa undangan, lalu menyuruhnya mengisi formulir dengan benar. Program tidak langsung mati.',
        codeSnippets: [
          {
            id: 'kode-try-except',
            title: 'try/except ValueError',
            filename: 'laporan.py',
            code: `while True:
    try:
        angka = int(input("Jumlah: "))
        if angka <= 0:
            raise ValueError("harus lebih dari 0")
        return angka
    except ValueError:
        print("Input salah, coba lagi.")`,
            explanation:
              'Jika input huruf atau <= 0, ValueError ditangkap dan program mengulang. Jika valid, return mengakhiri fungsi.',
            output: `(Contoh: pengguna mengetik "abc", lalu "15000")\nInput salah, coba lagi.\n15000`,
            isSimulated: true,
            lineExplanations: [
              { line: 2, code: 'try:', explanation: 'Mulai blok yang berisiko error.' },
              { line: 3, code: 'angka = int(input(...))', explanation: 'Mengubah input menjadi int; bisa ValueError.' },
              { line: 5, code: 'raise ValueError(...)', explanation: 'Memicu error sendiri jika angka tidak valid.' },
              { line: 7, code: 'except ValueError:', explanation: 'Menangkap ValueError dan mengulang.' },
            ],
          },
        ],
        importantNotes: [
          'try/except mencegah program crash, tetapi tidak memperbaiki data yang salah.',
          'Gunakan except ValueError, bukan except kosong, agar bug lain tetap terlihat.',
          'raise ValueError(...) dipakai untuk validasi manual.',
        ],
        projectConnection: {
          file: 'laporan.py',
          note: 'baca_angka() dan baca_pilihan() memakai try/except ValueError.',
          code: `except ValueError:\n    pesan_error("Input salah, masukkan angka bulat lebih dari 0 ya.")`,
        },
      },
    ],
    quiz: [
      {
        id: 'q-bab8-1',
        question: 'Error apa yang muncul jika pengguna mengetik "abc" saat diminta angka?',
        options: ['SyntaxError', 'ValueError', 'NameError', 'IndexError'],
        correctIndex: 1,
        explanation:
          'int("abc") tidak bisa mengubah teks menjadi angka, sehingga ValueError.',
      },
      {
        id: 'q-bab8-2',
        question: 'Apa fungsi try/except pada baca_angka()?',
        options: [
          'Mengubah input menjadi angka',
          'Menangkap ValueError dan mengulang pertanyaan tanpa crash',
          'Menghapus semua transaksi',
          'Mencetak laporan',
        ],
        correctIndex: 1,
        explanation:
          'try/except menangkap ValueError, lalu while True mengulang sampai input valid.',
      },
      {
        id: 'q-bab8-3',
        question: 'Error apa yang muncul jika membagi angka dengan nol?',
        options: ['ValueError', 'ZeroDivisionError', 'KeyError', 'ModuleNotFoundError'],
        correctIndex: 1,
        explanation:
          'Membagi dengan nol memicu ZeroDivisionError. Validasi jatah/jumlah hari mencegahnya.',
      },
      {
        id: 'q-bab8-4',
        question: 'Error apa yang muncul jika file tampilan.py tidak ada di folder yang sama?',
        options: ['ModuleNotFoundError', 'IndentationError', 'TypeError', 'IndexError'],
        correctIndex: 0,
        explanation:
          'Python tidak menemukan modul tampilan, sehingga ModuleNotFoundError.',
      },
      {
        id: 'q-bab8-5',
        question: 'Apa arti raise ValueError("harus positif")?',
        options: [
          'Mencetak pesan dan menghentikan program',
          'Memicu error ValueError yang bisa ditangkap except',
          'Mengubah angka menjadi positif',
          'Menghapus input',
        ],
        correctIndex: 1,
        explanation:
          'raise melempar error. Jika berada di dalam try, error ditangkap oleh except ValueError.',
      },
    ],
    summaryPoints: [
      'Error adalah petunjuk. Baca nama error dan nomor baris di traceback.',
      'Delapan error umum: IndentationError, SyntaxError, NameError, TypeError, IndexError, KeyError, ValueError, ZeroDivisionError, ModuleNotFoundError.',
      'try/except ValueError menangkap input salah dan mengulang pertanyaan.',
      'raise ValueError(...) memicu error sendiri saat validasi gagal.',
      'Jangan menangkap semua error dengan except kosong; bisa menyembunyikan bug.',
    ],
    cheatSheet: {
      title: 'Cheat Sheet Bab 9 — Error dan Penanganannya',
      items: [
        'IndentationError: rapikan indentasi 4 spasi.',
        'SyntaxError: cek titik dua, kurung, dan tanda petik.',
        'NameError: cek ejaan nama variabel/fungsi.',
        'TypeError: cek tipe data; jangan gabung str dan int tanpa konversi.',
        'IndexError: cek index list/tuple; index mulai 0.',
        'KeyError: cek nama key dictionary.',
        'ValueError: int("abc") gagal; tangkap dengan try/except.',
        'ZeroDivisionError: cek pembagi tidak nol.',
        'ModuleNotFoundError: cek nama file dan folder modul.',
        'try/except ValueError: ulangi input tanpa crash.',
      ],
      code: `try:\n    angka = int(input("Jumlah: "))\n    if angka <= 0:\n        raise ValueError("harus positif")\nexcept ValueError:\n    print("Input salah")`,
    },
    commonError: {
      name: "ValueError: invalid literal for int() with base 10: 'abc'",
      message: "ValueError: invalid literal for int() with base 10: 'abc'",
      cause: 'Pengguna mengetik huruf saat diminta angka. int("abc") gagal.',
      fix: 'Tangkap dengan try/except ValueError dan ulangi pertanyaan.',
      badCode: `angka = int(input("Jumlah: "))`,
      goodCode: `while True:\n    try:\n        angka = int(input("Jumlah: "))\n        break\n    except ValueError:\n        print("Input salah")`,
    },
    tryItYourself: [
      {
        id: 'bab8-coba-1',
        level: 'Mudah',
        prompt: 'Perbaiki kode agar tidak crash saat input huruf. Gunakan try/except ValueError.',
        starterCode: `angka = int(input("Jumlah: "))\nprint(angka + 1)`,
        answerCode: `while True:\n    try:\n        angka = int(input("Jumlah: "))\n        break\n    except ValueError:\n        print("Input salah, coba lagi.")\nprint(angka + 1)`,
        explanation: 'while True dan try/except membuat program mengulang sampai input valid.',
      },
      {
        id: 'bab8-coba-2',
        level: 'Sedang',
        prompt: 'Perbaiki fungsi yang membagi dengan nol. Kembalikan 0 jika pembagi <= 0.',
        starterCode: `def bagi(a, b):\n    return a / b`,
        answerCode: `def bagi(a, b):\n    if b <= 0:\n        return 0\n    return a / b\n\nprint(bagi(100, 0))`,
        explanation: 'Pengecekan pembagi mencegah ZeroDivisionError.',
      },
      {
        id: 'bab8-coba-3',
        level: 'Tantangan',
        prompt: 'Perbaiki akses kategori agar tidak IndexError saat pilihan 6.',
        starterCode: `KATEGORI = ("Makan", "Transport", "Kuota", "Kuliah/Tugas", "Hiburan", "Lainnya")\npilihan = 6\nprint(KATEGORI[pilihan])`,
        answerCode: `KATEGORI = ("Makan", "Transport", "Kuota", "Kuliah/Tugas", "Hiburan", "Lainnya")\npilihan = 6\nprint(KATEGORI[pilihan - 1])`,
        explanation: 'Index valid 0-5. Nomor pilihan 6 harus dikurangi 1.',
      },
    ],
    fixTheBug: {
      id: 'bab8-fix-1',
      title: 'Perbaiki: input huruf membuat program crash',
      prompt: 'Tambahkan try/except ValueError agar program mengulang saat input bukan angka.',
      buggyCode: `angka = int(input("Jumlah: "))\nprint(angka + 1)`,
      answerCode: `while True:\n    try:\n        angka = int(input("Jumlah: "))\n        break\n    except ValueError:\n        print("Input salah, coba lagi.")\nprint(angka + 1)`,
      explanation:
        'try/except menangkap ValueError. while True mengulang sampai input valid, lalu break.',
    },
  },

  'bab-9': {
    number: 10,
    prevChapterId: 'bab-8',
    nextChapterId: 'bab-10',
    openingAnalogy:
      'Bayangkan kamu punya warung yang sudah jalan. Tantangan berikutnya adalah menambah menu baru, mengubah batas toleransi, atau membuat laporan baru. Semua bisa dilakukan tanpa membongkar seluruh dapur.',
    sections: [
      {
        id: 'tantangan-1-kategori',
        title: 'Tantangan 1: Menambah Kategori Baru',
        content: `Di \`pencatat.py\`, kategori disimpan dalam tuple \`KATEGORI\`. Untuk menambah kategori baru, ubah tuple tersebut, misalnya menambahkan "Pulsa".

**Tugasmu:** tambahkan "Pulsa" ke KATEGORI, lalu pastikan menu kategori di main.py menampilkan pilihan baru. Karena main.py memakai \`for nama in KATEGORI\`, kategori baru otomatis muncul.`,
        analogy:
          'Seperti menambah menu di warung: cukup tambah satu baris di daftar menu, tidak perlu mengubah cara memasak.',
        codeSnippets: [
          {
            id: 'hint-kategori-baru',
            title: 'Menambah kategori di pencatat.py',
            filename: 'pencatat.py',
            code: `KATEGORI = ("Makan", "Transport", "Kuota", "Kuliah/Tugas", "Hiburan", "Pulsa", "Lainnya")`,
            explanation:
              'Menambah "Pulsa" ke tuple. main.py akan menampilkan 7 pilihan kategori secara otomatis.',
            output: `(Tidak ada output — hanya definisi data.)`,
            isSimulated: true,
          },
        ],
        importantNotes: [
          'Tuple tidak bisa diubah setelah dibuat; ganti seluruh tuple jika ingin menambah kategori.',
          'Jangan mengubah urutan kategori yang sudah ada agar nomor pilihan tidak berubah.',
          'Setelah menambah kategori, uji menu 1 di main.py.',
        ],
        projectConnection: {
          file: 'pencatat.py',
          note: 'KATEGORI dipakai oleh main.py untuk menampilkan pilihan kategori.',
          code: `for nama in KATEGORI:\n    print(nama)`,
        },
      },
      {
        id: 'tantangan-2-ambang-batas',
        title: 'Tantangan 2: Mengubah Ambang Batas Peringatan',
        content: `Di \`laporan.py\`, fungsi \`cek_peringatan()\` memakai ambang 80% jatah untuk status HATI-HATI.

**Tugasmu:** ubah ambang menjadi 70%. Artinya, pengeluaran >= 70% jatah sudah dianggap HATI-HATI.

Ubah baris:

\`\`\`python
elif keluar_hari_ini >= 0.8 * jatah:
\`\`\`

menjadi:

\`\`\`python
elif keluar_hari_ini >= 0.7 * jatah:
\`\`\`

Logika lain tetap sama.`,
        analogy:
          'Seperti mengubah batas kecepatan di jalan: angkanya berubah, tetapi aturan tetap sama.',
        codeSnippets: [
          {
            id: 'hint-ambang-baru',
            title: 'Mengubah ambang di laporan.py',
            filename: 'laporan.py',
            code: `keluar_hari_ini = 75000
jatah = 100000
if keluar_hari_ini > jatah:
    judul_status = "BOROS!"
elif keluar_hari_ini >= 0.7 * jatah:
    judul_status = "HATI-HATI"
else:
    judul_status = "AMAN"
print(judul_status)`,
            explanation:
              'Mengubah 0.8 menjadi 0.7. Status HATI-HATI muncul lebih awal.',
            output: `(Tidak ada output — hanya logika status.)`,
            isSimulated: true,
          },
        ],
        importantNotes: [
          'Ubah hanya angka ambang, bukan logika if/elif.',
          'Uji dengan pengeluaran 75.000 dan jatah 100.000; status sekarang HATI-HATI.',
          'Jangan lupa menjalankan ulang program setelah mengubah file.',
        ],
        projectConnection: {
          file: 'laporan.py',
          note: 'cek_peringatan() dipanggil dari menu 3 dan setelah mencatat pengeluaran.',
        },
      },
      {
        id: 'tantangan-3-fungsi-baru',
        title: 'Tantangan 3: Menambah Fungsi total_masuk()',
        content: `**Tugasmu:** tambahkan fungsi \`total_masuk()\` di \`pencatat.py\` yang menjumlahkan semua transaksi jenis "masuk".

Fungsi ini mirip \`hitung_saldo()\`, tetapi hanya menjumlahkan pemasukan. Setelah itu, tampilkan hasilnya di laporan atau menu.

Contoh implementasi:

\`\`\`python
def total_masuk():
    total = 0
    for hari, jenis, kategori, jumlah in transaksi:
        if jenis == "masuk":
            total += jumlah
    return total
\`\`\`

Fungsi ini bisa dipanggil dari \`laporan.py\` atau \`main.py\`.`,
        analogy:
          'Seperti menghitung total pemasukan di buku kas: hanya baris bertanda "masuk" yang dijumlahkan.',
        codeSnippets: [
          {
            id: 'hint-total-masuk',
            title: 'Fungsi baru di pencatat.py',
            filename: 'pencatat.py',
            code: `def total_masuk():
    total = 0
    for hari, jenis, kategori, jumlah in transaksi:
        if jenis == "masuk":
            total += jumlah
    return total`,
            explanation:
              'Siapkan total = 0, loop semua transaksi, tambahkan hanya jika jenis "masuk", lalu return total.',
            output: `(Tidak ada output — fungsi hanya mengembalikan nilai.)`,
            isSimulated: true,
          },
        ],
        importantNotes: [
          'Fungsi baru tidak mengubah data; hanya membaca transaksi.',
          'Gunakan return agar hasilnya bisa dipakai di tempat lain.',
          'Jangan lupa import total_masuk jika dipanggil dari file lain.',
        ],
        projectConnection: {
          file: 'pencatat.py',
          note: 'total_masuk() melengkapi hitung_saldo() dan pengeluaran_hari().',
          code: `from pencatat import total_masuk\nprint(total_masuk())`,
        },
      },
    ],
    quiz: [
      {
        id: 'q-bab9-1',
        question: 'Apa yang harus diubah untuk menambah kategori "Pulsa"?',
        options: [
          'Ubah MENU di main.py',
          'Ubah tuple KATEGORI di pencatat.py',
          'Ubah LEBAR di tampilan.py',
          'Ubah fungsi main()',
        ],
        correctIndex: 1,
        explanation:
          'KATEGORI adalah sumber daftar kategori. main.py menampilkan isi KATEGORI dengan loop.',
      },
      {
        id: 'q-bab9-2',
        question: 'Jika ambang HATI-HATI diubah dari 0.8 menjadi 0.7, apa yang terjadi?',
        options: [
          'Status HATI-HATI muncul lebih awal',
          'Status BOROS tidak pernah muncul',
          'Program error',
          'Jatah harian berubah',
        ],
        correctIndex: 0,
        explanation:
          'Ambang lebih kecil berarti lebih banyak pengeluaran yang masuk kategori HATI-HATI.',
      },
      {
        id: 'q-bab9-3',
        question: 'Apa yang dikembalikan oleh total_masuk() jika tidak ada transaksi masuk?',
        options: ['0', 'None', 'Error', 'Transaksi terakhir'],
        correctIndex: 0,
        explanation:
          'total dimulai dari 0 dan tidak bertambah, sehingga return 0.',
      },
      {
        id: 'q-bab9-4',
        question: 'Mengapa tuple KATEGORI tidak bisa diubah dengan KATEGORI[0] = "Makanan"?',
        options: [
          'Karena tuple tidak bisa diubah setelah dibuat',
          'Karena index 0 tidak valid',
          'Karena KATEGORI bukan data',
          'Karena Python melarang perubahan data',
        ],
        correctIndex: 0,
        explanation:
          'Tuple bersifat immutable. Untuk mengubah isinya, ganti seluruh tuple atau gunakan list.',
      },
      {
        id: 'q-bab9-5',
        question: 'Di file mana fungsi total_masuk() sebaiknya ditempatkan?',
        options: ['main.py', 'laporan.py', 'pencatat.py', 'tampilan.py'],
        correctIndex: 2,
        explanation:
          'Fungsi yang membaca dan menghitung data transaksi termasuk logika data, jadi tempatnya di pencatat.py.',
      },
    ],
    summaryPoints: [
      'Menambah kategori: ubah tuple KATEGORI di pencatat.py; main.py otomatis menampilkan.',
      'Mengubah ambang status: ubah angka 0.8 di cek_peringatan() menjadi 0.7.',
      'Menambah fungsi baru: total_masuk() di pencatat.py menjumlahkan transaksi jenis "masuk".',
      'Uji setiap perubahan dengan menjalankan program dari menu 1 sampai 5.',
    ],
    cheatSheet: {
      title: 'Cheat Sheet Bab 10 — Latihan Mandiri',
      items: [
        'Tambah kategori: ubah tuple KATEGORI di pencatat.py.',
        'Ubah ambang: ganti 0.8 menjadi 0.7 di cek_peringatan().',
        'Fungsi baru: total_masuk() menjumlahkan transaksi jenis "masuk".',
        'Tuple immutable; ganti seluruh tuple jika ingin mengubah isi.',
        'Selalu uji perubahan dengan menjalankan program.',
        'Jangan mengubah logika inti tanpa alasan.',
      ],
      code: `def total_masuk():\n    total = 0\n    for hari, jenis, kategori, jumlah in transaksi:\n        if jenis == "masuk":\n            total += jumlah\n    return total`,
    },
    commonError: {
      name: 'IndexError: tuple index out of range',
      message: 'IndexError: tuple index out of range',
      cause:
        'Setelah menambah kategori, nomor pilihan pengguna mungkin melebihi jumlah kategori yang ada, atau akses KATEGORI[pilihan] lupa dikurangi 1.',
      fix: 'Gunakan KATEGORI[pilihan - 1] dan pastikan baca_pilihan() menerima len(KATEGORI).',
      badCode: `pilihan = 7\nkategori = KATEGORI[pilihan]`,
      goodCode: `pilihan = 7\nkategori = KATEGORI[pilihan - 1]`,
    },
    tryItYourself: [
      {
        id: 'bab9-coba-1',
        level: 'Mudah',
        prompt: 'Tambahkan "Pulsa" ke KATEGORI dan cetak semua kategori dengan nomor urut.',
        starterCode: `KATEGORI = ("Makan", "Transport", "Kuota", "Kuliah/Tugas", "Hiburan", "Lainnya")\n# tambah Pulsa dan cetak`,
        answerCode: `KATEGORI = ("Makan", "Transport", "Kuota", "Kuliah/Tugas", "Hiburan", "Pulsa", "Lainnya")\nfor nomor, nama in enumerate(KATEGORI, start=1):\n    print(f"[{nomor}] {nama}")`,
        explanation:
          'enumerate(KATEGORI, start=1) memberi nomor urut mulai 1. Kategori baru otomatis muncul.',
      },
      {
        id: 'bab9-coba-2',
        level: 'Sedang',
        prompt: 'Ubah status HATI-HATI menjadi >= 70% jatah. Uji dengan 75.000 dari 100.000.',
        starterCode: `keluar = 75000\njatah = 100000\n# tulis if/elif/else dengan ambang 0.7`,
        answerCode: `keluar = 75000\njatah = 100000\nif keluar > jatah:\n    print("BOROS!")\nelif keluar >= 0.7 * jatah:\n    print("HATI-HATI")\nelse:\n    print("AMAN")`,
        explanation: '75.000 >= 70.000, jadi status HATI-HATI.',
      },
      {
        id: 'bab9-coba-3',
        level: 'Tantangan',
        prompt: 'Buat fungsi total_keluar() yang menjumlahkan semua transaksi jenis "keluar".',
        starterCode: `transaksi = [(1, "masuk", "Anggaran", 3000000), (1, "keluar", "Makan", 15000)]\n\ndef total_keluar():\n    # tulis di sini\n    pass`,
        answerCode: `transaksi = [(1, "masuk", "Anggaran", 3000000), (1, "keluar", "Makan", 15000)]\n\ndef total_keluar():\n    total = 0\n    for hari, jenis, kategori, jumlah in transaksi:\n        if jenis == "keluar":\n            total += jumlah\n    return total\n\nprint(total_keluar())`,
        explanation: 'Hanya transaksi jenis "keluar" yang dijumlahkan. Hasilnya 15000.',
      },
    ],
    fixTheBug: {
      id: 'bab9-fix-1',
      title: 'Perbaiki: total per kategori bisa KeyError',
      prompt:
        'Fungsi ini menambah jumlah ke dictionary tanpa cek apakah kategori sudah ada. Perbaiki agar kategori baru tidak menyebabkan KeyError.',
      buggyCode: `transaksi = [(1, "keluar", "Makan", 15000), (1, "keluar", "Makan", 5000)]\ntotal = {}\nfor hari, jenis, kategori, jumlah in transaksi:\n    if jenis == "keluar":\n        total[kategori] += jumlah`,
      answerCode: `transaksi = [(1, "keluar", "Makan", 15000), (1, "keluar", "Makan", 5000)]\ntotal = {}\nfor hari, jenis, kategori, jumlah in transaksi:\n    if jenis == "keluar":\n        if kategori in total:\n            total[kategori] += jumlah\n        else:\n            total[kategori] = jumlah`,
      explanation:
        'Periksa if kategori in total. Jika belum ada, inisialisasi dengan jumlah. Jika sudah ada, tambahkan.',
    },
  },

  'bab-10': {
    number: 11,
    prevChapterId: 'bab-9',
    nextChapterId: 'bab-11',
    openingAnalogy:
      'Bayangkan kamu punya kamus istilah di kantong. Saat dosen atau teman memakai kata "tuple", "try/except", atau "isatty", kamu tidak perlu menebak; tinggal buka kamus.',
    sections: [
      {
        id: 'pengantar-kamus',
        title: '1. Mengapa Perlu Menguasai Istilah?',
        content: `Istilah pemrograman dibuat untuk menyederhanakan komunikasi. Di balik istilah keren, konsepnya dekat dengan kehidupan sehari-hari.

Di proyek 4 file, istilah yang sering muncul:
- **tuple**: data tetap yang tidak bisa diubah, seperti KATEGORI dan satu transaksi.
- **dictionary**: data berlabel, seperti akun.
- **list**: kumpulan data berurutan, seperti transaksi.
- **try/except**: menangkap error agar program tidak crash.
- **ValueError**: input tidak valid.
- **isatty()**: memeriksa apakah output terhubung ke terminal sungguhan.
- **ANSI**: kode warna terminal.
- **UTF-8**: encoding karakter agar karakter kotak tidak rusak.`,
        analogy:
          'Seperti istilah di dapur: "santri" adalah istilah, tetapi semua orang tahu maksudnya. Istilah membuat komunikasi cepat.',
        importantNotes: [
          'Gunakan istilah yang tepat saat presentasi agar dosen yakin kamu paham.',
          'Jangan hanya menghafal istilah; pahami contohnya di kode.',
          'Halaman Kamus di navbar menyediakan pencarian istilah.',
        ],
        projectConnection: {
          file: 'tampilan.py',
          note: 'Istilah ANSI, isatty, UTF-8, dan panjang_tampil muncul di tampilan.py.',
        },
      },
      {
        id: 'istilah-baru',
        title: '2. Istilah Baru di Proyek 4 File',
        content: `Berikut istilah yang perlu kamu kuasai setelah menambahkan tampilan.py dan memperbarui proyek:

- **tuple**: KATEGORI dan setiap transaksi. Tidak bisa diubah.
- **dictionary**: akun. Menyimpan data dengan key.
- **list of tuple**: transaksi. Banyak catatan, setiap catatan tuple.
- **try/except**: menangkap ValueError saat input salah.
- **raise**: memicu error sendiri, misalnya raise ValueError("harus positif").
- **isatty()**: mengembalikan True jika stdout terminal sungguhan.
- **ANSI escape code**: pola \\033[...m untuk warna.
- **UTF-8**: encoding karakter; dipakai agar karakter kotak tidak rusak.
- **panjang_tampil()**: menghitung panjang teks dengan melewati kode ANSI.
- **from module import name**: mengimpor fungsi tertentu dari modul.`,
        analogy:
          'Seperti peralatan baru di dapur: kamu perlu tahu nama dan fungsinya sebelum memakainya.',
        codeSnippets: [
          {
            id: 'kode-istilah',
            title: 'Contoh istilah dalam kode',
            filename: 'tampilan.py',
            code: `import sys
from tampilan import warna, kotak, bar, panjang_tampil

print(sys.stdout.isatty())
print(warna("Halo", "hijau"))
print(panjang_tampil(warna("Halo", "hijau")))`,
            explanation:
              'isatty() memeriksa terminal. warna() membungkus teks dengan ANSI. panjang_tampil() menghitung 4, bukan 11.',
            output: `True\nHalo\n4`,
            isSimulated: true,
          },
        ],
        importantNotes: [
          'Istilah baru tidak mengubah logika keuangan; hanya menambah cara menampilkan.',
          'Gunakan istilah yang sama seperti di kode agar tidak bingung.',
          'Buka halaman Kamus untuk definisi lengkap dan contoh.',
        ],
        projectConnection: {
          file: 'laporan.py',
          note: 'laporan.py memakai tuple, dictionary, try/except, dan fungsi tampilan.',
        },
      },
    ],
    quiz: [
      {
        id: 'q-bab10-1',
        question: 'Apa perbedaan tuple dan list?',
        options: [
          'Tuple tidak bisa diubah, list bisa diubah',
          'Tuple hanya berisi angka, list hanya teks',
          'Tuple selalu lebih cepat',
          'Tidak ada perbedaan',
        ],
        correctIndex: 0,
        explanation:
          'Tuple immutable (tidak bisa diubah setelah dibuat), list mutable (bisa ditambah/diubah).',
      },
      {
        id: 'q-bab10-2',
        question: 'Apa fungsi isatty()?',
        options: [
          'Mengecek apakah stdout terhubung ke terminal sungguhan',
          'Mencetak teks',
          'Mengubah warna',
          'Menghapus layar',
        ],
        correctIndex: 0,
        explanation:
          'isatty() mengembalikan True jika stdout adalah terminal. Di IDLE, False.',
      },
      {
        id: 'q-bab10-3',
        question: 'Apa itu ANSI escape code?',
        options: [
          'Kode warna terminal seperti \\033[92m',
          'Nama file Python',
          'Perintah untuk menghapus layar',
          'Jenis error',
        ],
        correctIndex: 0,
        explanation:
          'ANSI escape code adalah pola karakter untuk mengatur warna dan gaya teks di terminal.',
      },
      {
        id: 'q-bab10-4',
        question: 'Apa fungsi try/except?',
        options: [
          'Menangkap error agar program tidak crash',
          'Mengubah tipe data',
          'Mengulang loop',
          'Mencetak laporan',
        ],
        correctIndex: 0,
        explanation:
          'try/except menjalankan kode berisiko, lalu menangani error jika terjadi.',
      },
      {
        id: 'q-bab10-5',
        question: 'Mengapa UTF-8 penting untuk karakter kotak?',
        options: [
          'Agar karakter ╔═╗ tidak rusak',
          'Agar program berjalan lebih cepat',
          'Agar warna otomatis muncul',
          'Agar file lebih kecil',
        ],
        correctIndex: 0,
        explanation:
          'UTF-8 mendukung karakter Unicode seperti kotak dan blok. Tanpa itu, karakter bisa berubah menjadi ? atau â.',
      },
    ],
    summaryPoints: [
      'Istilah membuat komunikasi lebih cepat dan tepat.',
      'Tuple immutable, list mutable, dictionary berlabel.',
      'try/except menangkap error; raise memicu error sendiri.',
      'isatty() dan ANSI/UTF-8 adalah istilah penting di tampilan.py.',
      'Gunakan halaman Kamus untuk mencari istilah kapan saja.',
    ],
    cheatSheet: {
      title: 'Cheat Sheet Bab 11 — Kamus Istilah',
      items: [
        'tuple: data tetap, tidak bisa diubah.',
        'list: data berurutan, bisa diubah.',
        'dictionary: data berlabel key:value.',
        'try/except: menangkap error agar tidak crash.',
        'raise: memicu error sendiri.',
        'ValueError: input tidak valid.',
        'ZeroDivisionError: pembagi nol.',
        'isatty(): cek terminal sungguhan.',
        'ANSI: kode warna terminal.',
        'UTF-8: encoding karakter kotak.',
      ],
    },
    commonError: {
      name: "NameError: name 'panjang_tampil' is not defined",
      message: "NameError: name 'panjang_tampil' is not defined",
      cause:
        'Fungsi panjang_tampil dipanggil tanpa import dari tampilan.py, atau nama fungsi salah ketik.',
      fix: 'Tambahkan from tampilan import panjang_tampil, atau panggil tampilan.panjang_tampil(...).',
      badCode: `print(panjang_tampil(warna("Halo", "hijau")))`,
      goodCode: `from tampilan import warna, panjang_tampil\nprint(panjang_tampil(warna("Halo", "hijau")))`,
    },
    tryItYourself: [
      {
        id: 'bab10-coba-1',
        level: 'Mudah',
        prompt: 'Manakah yang tuple? (1, 2, 3) atau [1, 2, 3]? Cetak tipenya.',
        starterCode: `a = (1, 2, 3)\nb = [1, 2, 3]\n# cetak type(a) dan type(b)`,
        answerCode: `a = (1, 2, 3)\nb = [1, 2, 3]\nprint(type(a))\nprint(type(b))`,
        explanation: 'Kurung biasa membuat tuple; kurung siku membuat list.',
      },
      {
        id: 'bab10-coba-2',
        level: 'Sedang',
        prompt: 'Cetak isi dictionary akun dengan format key: value.',
        starterCode: `akun = {"uang_saku": 3000000, "hari": 1}\n# cetak key dan value`,
        answerCode: `akun = {"uang_saku": 3000000, "hari": 1}\nfor key, value in akun.items():\n    print(f"{key}: {value}")`,
        explanation: 'dict.items() menghasilkan pasangan key dan value.',
      },
      {
        id: 'bab10-coba-3',
        level: 'Tantangan',
        prompt: 'Jelaskan dengan kode mengapa panjang_tampil() menghasilkan 4 untuk teks berwarna "Halo".',
        starterCode: `from tampilan import warna, panjang_tampil\nteks = warna("Halo", "hijau")\nprint(len(teks))\nprint(panjang_tampil(teks))`,
        answerCode: `from tampilan import warna, panjang_tampil\nteks = warna("Halo", "hijau")\nprint(len(teks))\nprint(panjang_tampil(teks))`,
        explanation:
          'len() menghitung kode ANSI, panjang_tampil() melewatinya. Hasil panjang_tampil 4.',
      },
    ],
    fixTheBug: {
      id: 'bab10-fix-1',
      title: 'Perbaiki: panjang teks berwarna dihitung dengan len()',
      prompt:
        'Fungsi ini memakai len() sehingga kode warna ikut dihitung. Ganti dengan panjang_tampil().',
      buggyCode: `from tampilan import warna\nteks = warna("Halo", "hijau")\nprint(len(teks))`,
      answerCode: `from tampilan import warna, panjang_tampil\nteks = warna("Halo", "hijau")\nprint(panjang_tampil(teks))`,
      explanation:
        'panjang_tampil() melewati kode ANSI, sehingga hasilnya 4, bukan 11.',
    },
  },

  'bab-11': {
    number: 12,
    prevChapterId: 'bab-10',
    nextChapterId: undefined,
    openingAnalogy:
      'Bayangkan kamu akan demo masak di depan juri. Bahan sudah siap, tetapi kamu perlu tahu urutan langkah, alat yang dipakai, dan cara menjelaskan setiap bumbu. Presentasi program juga begitu.',
    sections: [
      {
        id: 'persiapan-sebelum-maju',
        title: '1. Persiapan Sebelum Maju Presentasi',
        content: `Lakukan checklist ini 10 menit sebelum giliranmu:
1. **Perbesar font terminal** agar dosen di baris belakang bisa membaca.
2. **Bersihkan layar** dengan \`cls\` (Windows) atau \`clear\` (Mac/Linux).
3. **Pastikan 4 file ada di folder yang sama**: \`pencatat.py\`, \`laporan.py\`, \`main.py\`, \`tampilan.py\`.
4. **Tutup aplikasi lain** agar laptop tidak lambat.
5. **Siapkan data demo**: anggaran Rp3.000.000 untuk 30 hari, pengeluaran Makan Rp85.000, Transport Rp40.000.
6. **Uji alur demo** dari menu 1 sampai 5 sebelum presentasi.`,
        analogy:
          'Seperti koki yang menyiapkan pisau dan celemek bersih sebelum juri datang.',
        importantNotes: [
          'Jangan mengubah kode saat presentasi; gunakan versi yang sudah diuji.',
          'Siapkan jawaban untuk pertanyaan "kenapa 4 file?" dan "apa itu tampilan.py?".',
          'Bawa cadangan screenshot jika terminal bermasalah.',
        ],
        projectConnection: {
          file: 'main.py',
          note: 'Jalankan python main.py dari folder yang berisi 4 file.',
        },
      },
      {
        id: 'skenario-demo-runtut',
        title: '2. Urutan Skenario Live Demo yang Memukau Dosen',
        content: `Gunakan alur cerita yang runtut:

1. **Buka dengan masalah**: "Mahasiswa sering kehabisan uang di akhir bulan karena tidak ada batasan harian."
2. **Jalankan** \`python main.py\`.
3. **Menu 7 / setup awal**: masukkan anggaran Rp3.000.000 untuk 30 hari. Tunjukkan jatah harian Rp100.000.
4. **Menu 1**: catat Makan Rp85.000. Buka **menu 3** dan tunjukkan status **HATI-HATI**.
5. **Menu 1**: catat Transport Rp40.000. Buka **menu 3** dan tunjukkan status **BOROS!**.
6. **Menu 4**: tunjukkan riwayat transaksi dalam tabel.
7. **Menu 5**: tunjukkan laporan per kategori dan batang kemajuan.
8. **Menu 6**: pindah ke hari ke-2. Tunjukkan bahwa riwayat tetap tersimpan.
9. **Menu 0**: keluar dengan pesan terima kasih.

Saat demo, tunjukkan **tampilan.py** sebagai alasan layar terlihat rapi: warna, kotak, tabel, dan batang.`,
        analogy:
          'Seperti demo masak: mulai dari bahan, proses, sampai hasil di piring. Jangan melompat-lompat.',
        importantNotes: [
          'Jangan memencet menu secara acak; ikuti alur cerita.',
          'Tunjukkan perubahan status dari HATI-HATI ke BOROS sebagai momen utama.',
          'Jelaskan bahwa tampilan.py tidak mengubah logika keuangan.',
        ],
        projectConnection: {
          file: 'tampilan.py',
          note: 'tampilan.py membuat demo terlihat profesional tanpa mengubah logika.',
        },
      },
      {
        id: 'pertanyaan-dosen-dan-jawaban',
        title: '3. Bocoran Pertanyaan Dosen & Cara Menjawabnya',
        content: `**Pertanyaan 1: "Kenapa program dibagi jadi 4 file?"**
Jawaban: "Kami menerapkan Separation of Concerns. pencatat.py (Orang 1) mengelola data dan hitungan, laporan.py (Orang 2) mengurus status dan validasi input, main.py (Orang 3) mengatur menu, dan tampilan.py dipakai bersama untuk warna, kotak, tabel, dan batang. Jika ingin mengganti tampilan, kami hanya mengubah tampilan.py tanpa menyentuh rumus keuangan."

**Pertanyaan 2: "Bagaimana kalau pengguna salah input?"**
Jawaban: "Kami memakai try/except ValueError di baca_angka() dan baca_pilihan(). Program tidak crash, tetapi mengulang pertanyaan sampai input valid."

**Pertanyaan 3: "Kenapa ada isatty()?"**
Jawaban: "Karena warna ANSI hanya bermakna di terminal sungguhan. Di IDLE, isatty() False, sehingga warna() mengembalikan teks polos dan tidak muncul kode aneh."

**Pertanyaan 4: "Apa itu panjang_tampil()?"**
Jawaban: "Fungsi itu menghitung panjang teks yang terlihat dengan melewati kode ANSI. len() akan menghitung kode warna, sehingga tabel bisa melebar."

**Pertanyaan 5: "Data disimpan di mana?"**
Jawaban: "Di memori RAM, dalam dictionary akun dan list transaksi. Data hilang saat program ditutup. Pengembangan berikutnya bisa menyimpan ke file CSV/JSON atau database."`,
        analogy:
          'Seperti menjawab pertanyaan juri: jawab dengan istilah yang tepat, lalu beri contoh dari kode.',
        importantNotes: [
          'Gunakan istilah: Separation of Concerns, try/except, isatty, ANSI, UTF-8.',
          'Jelaskan peran setiap file dan siapa pemiliknya.',
          'Jangan mengaku menulis kode sendiri jika hanya copy-paste; pahami alurnya.',
        ],
        projectConnection: {
          file: 'main.py',
          note: 'main.py adalah pintu masuk; sebutkan perannya saat menjawab pertanyaan.',
        },
      },
    ],
    quiz: [
      {
        id: 'q-bab11-1',
        question: 'Kenapa program dibagi menjadi 4 file?',
        options: [
          'Agar jumlah file terlihat banyak',
          'Menerapkan Separation of Concerns: data, laporan, menu, dan tampilan dipisah',
          'Karena Python mewajibkan 4 file',
          'Agar program lebih lambat',
        ],
        correctIndex: 1,
        explanation:
          'Pemisahan tugas membuat kode lebih mudah dipahami, diuji, dan dirawat.',
      },
      {
        id: 'q-bab11-2',
        question: 'Apa peran tampilan.py?',
        options: [
          'Menghitung saldo',
          'Menyimpan transaksi',
          'Membuat warna, kotak, tabel, dan batang kemajuan',
          'Membaca input pengguna',
        ],
        correctIndex: 2,
        explanation:
          'tampilan.py hanya mengurus tampilan. Logika data ada di pencatat.py dan laporan.py.',
      },
      {
        id: 'q-bab11-3',
        question: 'Saat demo, status HATI-HATI muncul jika pengeluaran hari ini...',
        options: [
          'Lebih dari jatah',
          'Minimal 80% jatah tetapi belum melebihi jatah',
          'Nol rupiah',
          'Lebih dari saldo',
        ],
        correctIndex: 1,
        explanation:
          'Kode memakai elif keluar_hari_ini >= 0.8 * jatah untuk HATI-HATI.',
      },
      {
        id: 'q-bab11-4',
        question: 'Apa jawaban terbaik jika dosen bertanya "kenapa ada isatty()?"',
        options: [
          'Agar program berjalan lebih cepat',
          'Karena warna ANSI hanya bermakna di terminal sungguhan; di IDLE teks dibiarkan polos',
          'Karena isatty() adalah library wajib',
          'Agar data tidak hilang',
        ],
        correctIndex: 1,
        explanation:
          'isatty() mencegah kode warna muncul sebagai teks aneh di lingkungan yang bukan terminal.',
      },
      {
        id: 'q-bab11-5',
        question: 'Sebelum presentasi, file apa saja yang harus ada di folder yang sama?',
        options: [
          'Cukup main.py',
          'pencatat.py, laporan.py, main.py, dan tampilan.py',
          'Hanya tampilan.py',
          'Semua file di folder berbeda',
        ],
        correctIndex: 1,
        explanation:
          'main.py mengimpor tiga modul lain. Jika salah satu tidak ada, muncul ModuleNotFoundError.',
      },
    ],
    summaryPoints: [
      'Siapkan 4 file dalam satu folder dan uji alur demo sebelum presentasi.',
      'Gunakan skenario runtut: atur anggaran, catat Makan, lihat HATI-HATI, catat Transport, lihat BOROS.',
      'Jelaskan peran 4 file dan istilah kunci: Separation of Concerns, try/except, isatty, ANSI, panjang_tampil.',
      'Tunjukkan tampilan.py sebagai alasan layar rapi, bukan sebagai pengubah logika.',
    ],
    cheatSheet: {
      title: 'Cheat Sheet Bab 12 — Tips Presentasi',
      items: [
        'Siapkan 4 file: pencatat.py, laporan.py, main.py, tampilan.py.',
        'Perbesar font terminal dan bersihkan layar sebelum demo.',
        'Skenario: anggaran 3.000.000, Makan 85.000 (HATI-HATI), Transport 40.000 (BOROS).',
        'Tunjukkan menu 1, 3, 4, 5, 6, dan 0.',
        'Jelaskan peran tiap file dan pemiliknya.',
        'Gunakan istilah: Separation of Concerns, try/except, isatty, ANSI, UTF-8.',
        'Jelaskan panjang_tampil() dan kenapa len() salah pada teks berwarna.',
        'Data disimpan di memori; hilang saat program ditutup.',
      ],
    },
    commonError: {
      name: "ModuleNotFoundError: No module named 'tampilan'",
      message: "ModuleNotFoundError: No module named 'tampilan'",
      cause:
        'File tampilan.py tidak berada di folder yang sama dengan main.py, atau nama file salah ketik.',
      fix:
        'Pastikan keempat file berada di folder yang sama dan nama file persis: tampilan.py, bukan Tampilan.py atau tampilan.txt.',
      badCode: `from tampilan import warna`,
      goodCode: `# pastikan file tampilan.py ada di folder yang sama\nfrom tampilan import warna`,
    },
    tryItYourself: [
      {
        id: 'bab11-coba-1',
        level: 'Mudah',
        prompt: 'Sebutkan 4 file proyek dan satu tugas masing-masing.',
        starterCode: `# tulis jawabanmu di komentar\n# 1. ...\n# 2. ...\n# 3. ...\n# 4. ...`,
        answerCode: `# 1. pencatat.py: data dan hitungan\n# 2. laporan.py: status, validasi, dan laporan\n# 3. main.py: menu dan penghubung\n# 4. tampilan.py: warna, kotak, tabel, batang`,
        explanation:
          'pencatat.py (Orang 1), laporan.py (Orang 2), main.py (Orang 3), tampilan.py dipakai bersama.',
      },
      {
        id: 'bab11-coba-2',
        level: 'Sedang',
        prompt: 'Tulis jawaban singkat: kenapa isatty() dipakai di tampilan.py?',
        starterCode: `# jawaban singkat (1-2 kalimat)`,
        answerCode: `# isatty() memastikan stdout adalah terminal sungguhan.\n# Di IDLE atau file, warna ANSI tidak dirender, jadi warna() mengembalikan teks polos.`,
        explanation:
          'isatty() mencegah kode warna muncul sebagai teks aneh di lingkungan yang bukan terminal.',
      },
      {
        id: 'bab11-coba-3',
        level: 'Tantangan',
        prompt: 'Tulis skenario demo 5 langkah yang menunjukkan status HATI-HATI dan BOROS.',
        starterCode: `# langkah 1: ...\n# langkah 2: ...\n# langkah 3: ...\n# langkah 4: ...\n# langkah 5: ...`,
        answerCode: `# 1. python main.py\n# 2. atur anggaran 3000000 untuk 30 hari\n# 3. menu 1: catat Makan 85000\n# 4. menu 3: tunjukkan status HATI-HATI\n# 5. menu 1: catat Transport 40000, lalu menu 3: tunjukkan BOROS!`,
        explanation:
          'Skenario ini menunjukkan perubahan status dari HATI-HATI ke BOROS, momen yang paling meyakinkan dosen.',
      },
    ],
    fixTheBug: {
      id: 'bab11-fix-1',
      title: 'Perbaiki: import tampilan gagal',
      prompt:
        'Program gagal dengan ModuleNotFoundError. Perbaiki kode agar import berhasil (asumsikan file tampilan.py ada di folder yang sama).',
      buggyCode: `import tampilan.py\nprint(tampilan.warna("Halo", "hijau"))`,
      answerCode: `from tampilan import warna\nprint(warna("Halo", "hijau"))`,
      explanation:
        'Nama modul ditulis tanpa .py. Jika file tampilan.py ada di folder yang sama, from tampilan import warna adalah cara yang benar. Jika masih ModuleNotFoundError, periksa nama file dan letaknya.',
    },
  },
};
