import { PythonErrorGuide } from '../types';

export const PYTHON_ERRORS: PythonErrorGuide[] = [
  {
    id: 'indentation-error',
    errorName: 'IndentationError',
    title: 'IndentationError: unexpected indent / expected an indented block',
    simpleMeaning:
      'Python bingung karena spasi di awal baris tidak rapi atau tidak sejajar. Di Python, spasi menentukan blok kode (anak kalimat).',
    sampleBrokenCode: `def atur_anggaran(anggaran):
jatah = anggaran // 30   # Salah! Tidak ada spasi masuk ke dalam fungsi
return jatah`,
    terminalOutput: `  File "pencatat.py", line 2
    jatah = anggaran // 30
    ^
IndentationError: expected an indented block after function definition on line 1`,
    commonCauses: [
      'Lupa menekan tombol Tab atau 4 spasi setelah membuat baris yang diakhiri tanda titik dua (:)',
      'Mencampur antara tombol Tab dan tombol Spasi biasa dalam satu file yang sama',
      'Memasukkan spasi di awal baris padahal baris tersebut bukan bagian dari blok if, def, atau for',
    ],
    howToFix:
      'Pastikan setiap kode di dalam fungsi, if, atau perulangan menjorok ke dalam sebanyak 4 spasi (atau 1 tab konsisten). Gunakan tombol Shift + Tab jika ingin memajukan baris yang terlalu masuk.',
    sampleFixedCode: `def atur_anggaran(anggaran):
    jatah = anggaran // 30   # Benar! Menjorok 4 spasi ke dalam
    return jatah`,
    practiceSnippet: {
      question: 'Manakah cara perbaikan yang benar untuk kode di bawah ini?',
      buggyCode: `if jatah_harian > 0:
status = "Aman"`,
      options: [
        'Ubah menjadi: if jatah_harian > 0; status = "Aman"',
        'Beri indentasi 4 spasi pada baris kedua: status = "Aman"',
        'Hapus tanda titik dua (:) di baris pertama',
        'Tambahkan tanda kurung kurawal { status = "Aman" }',
      ],
      correctIndex: 1,
      explanation:
        'Di Python, baris kode setelah pernyataan "if ... :" wajib diberi spasi masuk (indentasi) agar Python tahu baris tersebut hanya dijalankan saat kondisi benar.',
    },
  },

  {
    id: 'syntax-error',
    errorName: 'SyntaxError',
    title: 'SyntaxError: invalid syntax / unexpected EOF',
    simpleMeaning:
      'Penulisan tata bahasa Python salah atau ada tanda baca yang kurang/salah ketik, seperti kurang titik dua (:), kurung buka tanpa kurung tutup, atau tanda petik tertukar.',
    sampleBrokenCode: `def hitung_saldo(anggaran, keluar)
    return anggaran - keluar`,
    terminalOutput: `  File "pencatat.py", line 1
    def hitung_saldo(anggaran, keluar)
                                     ^
SyntaxError: expected ':'`,
    commonCauses: [
      'Lupa menuliskan tanda titik dua (:) di akhir pernyataan def, if, elif, else, while, atau for',
      'Kurung buka "(" lupa ditutup dengan ")"',
      'Tanda petik string tidak berpasangan, misalnya membuka dengan " lalu menutup dengan \'',
      'Menggunakan kata kunci terlarang sebagai nama variabel (misalnya: def = 100)',
    ],
    howToFix:
      'Periksa tanda panah merah (^) pada pesan error. Biasanya error terjadi tepat di tanda panah tersebut atau satu baris sebelumnya. Tambahkan tanda baca yang tertinggal.',
    sampleFixedCode: `def hitung_saldo(anggaran, keluar):   # Ditambah titik dua (:)
    return anggaran - keluar`,
    practiceSnippet: {
      question: 'Apa kesalahan sintaks pada potongan kode berikut?',
      buggyCode: `print("Pengeluaran hari ini: " + str(total_keluar)`,
      options: [
        'Kurang tanda petik satu',
        'Fungsi str() tidak boleh dipakai',
        'Kurang kurung tutup penutup ")" untuk fungsi print()',
        'Nama variabel total_keluar salah',
      ],
      correctIndex: 2,
      explanation:
        'Ada dua kurung buka `(` (satu milik print, satu milik str), tetapi di ujung baris baru ada satu kurung tutup. Dibutuhkan kurung tutup kedua: `str(total_keluar))`',
    },
  },

  {
    id: 'name-error',
    errorName: 'NameError',
    title: "NameError: name '...' is not defined",
    simpleMeaning:
      'Python dipanggil untuk menggunakan suatu variabel atau fungsi, tetapi nama tersebut belum pernah dibuat sebelumnya atau salah ketik huruf kapital.',
    sampleBrokenCode: `anggaran_bulanan = 3000000
print(Anggaran_bulanan)  # Salah ketik huruf kapital 'A'`,
    terminalOutput: `  File "main.py", line 2, in <module>
    print(Anggaran_bulanan)
          ^^^^^^^^^^^^^^^^
NameError: name 'Anggaran_bulanan' is not defined. Did you mean: 'anggaran_bulanan'?`,
    commonCauses: [
      'Typo atau salah ketik huruf besar/kecil (Python sangat sensitif: Saldo beda dengan saldo)',
      'Memanggil variabel sebelum baris di mana variabel itu dibuat',
      'Lupa melakukan import modul yang memuat fungsi tersebut',
    ],
    howToFix:
      'Cek ejaan nama variabel. Pastikan huruf kapital dan kecil persis sama. Jika memanggil fungsi dari file lain, pastikan sudah ada perintah import di baris atas.',
    sampleFixedCode: `anggaran_bulanan = 3000000
print(anggaran_bulanan)  # Huruf kecil semua, cocok dengan deklarasi`,
    practiceSnippet: {
      question: 'Mengapa kode `tambah_transaksi("Makan", 25000)` menghasilkan NameError di file main.py?',
      buggyCode: `import pencatat
tambah_transaksi("Makan", 25000)`,
      options: [
        'Nilai 25000 harus berupa string',
        'Fungsi harus dipanggil dengan awalan nama modulnya: pencatat.tambah_transaksi(...)',
        'Parameter kategori harus berupa huruf kapital semua',
        'Nama file harus diganti',
      ],
      correctIndex: 1,
      explanation:
        'Karena kita mengimpor dengan `import pencatat`, semua fungsi di dalamnya harus dipanggil dengan awalan `pencatat.nama_fungsi()`.',
    },
  },

  {
    id: 'type-error',
    errorName: 'TypeError',
    title: "TypeError: unsupported operand type(s) / can't multiply sequence",
    simpleMeaning:
      'Operasi dilakukan pada jenis data yang tidak cocok, misalnya mencoba menjumlahkan teks string ("300000") langsung dengan angka integer (50000).',
    sampleBrokenCode: `anggaran = input("Masukkan anggaran: ")  # input() selalu menghasilkan teks (str)
sisa = anggaran - 50000                # Teks dikurangi angka -> Crash!`,
    terminalOutput: `  File "pencatat.py", line 2
    sisa = anggaran - 50000
           ~~~~~~~~~^~~~~~~
TypeError: unsupported operand type(s) for -: 'str' and 'int'`,
    commonCauses: [
      'Lupa mengubah hasil input() menjadi int() atau float()',
      'Mengirim jumlah argumen fungsi yang salah (misal fungsi butuh 2 argumen tapi hanya dikirim 1)',
      'Mencoba memanggil sesuatu yang bukan fungsi dengan tanda kurung ()',
    ],
    howToFix:
      'Bungkus input dari pengguna dengan fungsi int() atau float() sebelum melakukan perhitungan matematika, contoh: int(input(...)).',
    sampleFixedCode: `anggaran = int(input("Masukkan anggaran: "))  # Diubah jadi angka bulat!
sisa = anggaran - 50000                      # Berjalan lancar!`,
    practiceSnippet: {
      question: 'Apa tipe data hasil dari pemanggilan fungsi `input("Berapa pengeluaran: ")` jika pengguna mengetik 50000?',
      buggyCode: `nominal = input("Berapa pengeluaran: ")`,
      options: [
        'int (angka bulat 50000)',
        'str (teks "50000")',
        'float (desimal 50000.0)',
        'bool (True)',
      ],
      correctIndex: 1,
      explanation:
        'Fungsi `input()` di Python SELALU menghasilkan tipe data teks (`str`), meskipun isi yang diketik pengguna adalah deretan angka. Kita harus mengonversinya dengan `int()`!',
    },
  },

  {
    id: 'index-error',
    errorName: 'IndexError',
    title: 'IndexError: list index out of range',
    simpleMeaning:
      'Kita mencoba mengambil barang di dalam list pada nomor antrean (indeks) yang tidak ada atau melewati batas panjang list.',
    sampleBrokenCode: `daftar_transaksi = ["Makan Siang", "Beli Buku"]  # Ada 2 barang (indeks 0 dan 1)
print(daftar_transaksi[2])                      # Meminta indeks 2 -> IndexError!`,
    terminalOutput: `  File "laporan.py", line 2
    print(daftar_transaksi[2])
          ~~~~~~~~~~~~~~~~^^^
IndexError: list index out of range`,
    commonCauses: [
      'Lupa bahwa urutan indeks di Python selalu dimulai dari angka 0, bukan 1',
      'Mencoba mengakses item dari list yang masih kosong (panjang 0)',
      'Perulangan manual melebihi jumlah anggota list',
    ],
    howToFix:
      'Ingat aturan indeks: elemen pertama berindeks 0, elemen kedua berindeks 1. Jika list memiliki N elemen, indeks tertinggi yang valid adalah N - 1. Gunakan perulangan `for item in list:` daripada mengakses indeks secara manual.',
    sampleFixedCode: `daftar_transaksi = ["Makan Siang", "Beli Buku"]
print(daftar_transaksi[0])  # Mengambil "Makan Siang" (indeks pertama)
print(daftar_transaksi[1])  # Mengambil "Beli Buku" (indeks kedua)`,
    practiceSnippet: {
      question: 'Jika daftar kategori adalah `kategori = ["Makan", "Transport"]`, berapakah indeks untuk "Makan"?',
      buggyCode: `kategori = ["Makan", "Transport"]`,
      options: [
        'Indeks 1',
        'Indeks 0',
        'Indeks -2',
        'Indeks "pertama"',
      ],
      correctIndex: 1,
      explanation:
        'Dalam pemrograman Python, nomor urut indeks selalu dimulai dari nol (0). Jadi elemen pertama selalu beralamat di indeks 0.',
    },
  },

  {
    id: 'module-not-found-error',
    errorName: 'ModuleNotFoundError',
    title: "ModuleNotFoundError: No module named 'pencatat'",
    simpleMeaning:
      'File main.py mencoba mengambil kode dari pencatat.py, tetapi Python tidak dapat menemukan file tersebut di folder yang sama.',
    sampleBrokenCode: `# Di terminal, pengguna berada di folder Desktop
# tapi file pencatat.py ada di folder Download
import pencatat`,
    terminalOutput: `  File "main.py", line 1, in <module>
    import pencatat
ModuleNotFoundError: No module named 'pencatat'`,
    commonCauses: [
      'File pencatat.py belum disimpan di folder yang sama dengan main.py',
      'Salah ketik nama file saat import (misalnya `import pencatatt`)',
      'Menulis akhiran .py di dalam perintah import (salah: `import pencatat.py`)',
      'Menjalankan terminal dari folder yang berbeda dengan lokasi file proyek disimpan',
    ],
    howToFix:
      'Pastikan ketiga file (pencatat.py, laporan.py, dan main.py) tersimpan di folder yang sama (misalnya folder `keuangan_mahasiswa`). Saat import, jangan gunakan ekstensi .py, cukup tulis nama dasarnya: `import pencatat`.',
    sampleFixedCode: `# Pastikan main.py dan pencatat.py ada di folder yang sama!
import pencatat
import laporan`,
    practiceSnippet: {
      question: 'Bagaimana penulisan perintah import yang benar untuk menyambungkan file `laporan.py` ke file `main.py`?',
      buggyCode: `# Mau pakai fungsi di laporan.py`,
      options: [
        'import "laporan.py"',
        'import laporan',
        'include <laporan.py>',
        'using laporan',
      ],
      correctIndex: 1,
      explanation:
        'Di Python, modul diimpor cukup dengan menulis nama dasarnya tanpa tanda kutip dan tanpa ekstensi `.py`: `import laporan`.',
    },
  },
];
