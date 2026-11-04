import { Chapter } from '../../types';

export const bab5: Partial<Chapter> = {
  openingAnalogy:
    'Bayangkan laporan.py adalah pelayan yang menata struk di meja. Ia tidak menghitung uangnya sendiri, tetapi tahu cara menyusun angka, memberi label status, dan menolak pesanan yang tidak masuk akal (misalnya "dua puluh ribu").',
  sections: [
    {
      id: 'peran-laporan',
      title: '1. Peran dan Tanggung Jawab laporan.py (Orang 2)',
      content: `\`laporan.py\` adalah **pelayan dan satpam** program. File ini:
- Mengimpor data dan fungsi dari \`pencatat.py\`.
- Mengimpor alat tampilan dari \`tampilan.py\`.
- Meminta input dengan aman lewat \`baca_angka()\` dan \`baca_pilihan()\`.
- Menampilkan status, riwayat, dan laporan kategori.

File ini tidak menyimpan data sendiri. Ia hanya membaca data dari \`pencatat.py\` dan menampilkannya.`,
      analogy:
        'Pelayan tidak memasak, tetapi tahu cara menyajikan pesanan dan menolak pesanan yang salah.',
      codeSnippets: [
        {
          id: 'kode-import-laporan',
          title: 'Import di laporan.py',
          filename: 'laporan.py',
          code: `from pencatat import akun, transaksi, format_rupiah, hitung_saldo, pengeluaran_hari
from tampilan import (warna, kotak, bar, persen, baris_nilai, judul_bagian,
                      pesan_error, pesan_info, garis_tabel, baris_tabel)`,
          explanation:
            'laporan.py memakai data dari pencatat.py dan alat tampilan dari tampilan.py. Keduanya harus berada di folder yang sama.',
          lineExplanations: [
            { line: 1, code: 'from pencatat import ...', explanation: 'Mengambil data dan fungsi dari pencatat.py.' },
            { line: 2, code: 'from tampilan import ...', explanation: 'Mengambil fungsi warna, kotak, bar, dan tabel dari tampilan.py.' },
          ],
        },
      ],
      importantNotes: [
        'Jangan menulis ulang format_rupiah di laporan.py; fungsi itu sudah ada di pencatat.py.',
        'Jangan mengubah data langsung dari laporan.py; gunakan fungsi dari pencatat.py.',
        'Semua modul harus berada di folder yang sama.',
      ],
      projectConnection: {
        file: 'laporan.py',
        note: 'laporan.py adalah jembatan antara data (pencatat.py) dan tampilan (tampilan.py).',
      },
    },
    {
      id: 'fungsi-baca',
      title: '2. Fungsi baca_angka() dan baca_pilihan()',
      content: `\`baca_angka(pesan)\` meminta angka bulat positif. Jika pengguna salah ketik, program **tidak crash**, tetapi mengulang pertanyaan.

Caranya:
1. \`input(pesan)\` membaca teks.
2. \`replace(".", "").replace(",", "")\` membersihkan pemisah ribuan.
3. \`int(teks)\` mengubah teks menjadi angka.
4. Jika angka <= 0, \`raise ValueError\` memicu error sengaja.
5. \`except ValueError\` menangkap error, mencetak pesan, lalu mengulang.

\`baca_pilihan(pesan, maksimal)\` bekerja sama, tetapi memastikan nomor berada di rentang 1 sampai maksimal.`,
      analogy:
        'Seperti satpam yang menolak tamu tanpa undangan, lalu menyuruhnya mengisi formulir dengan benar. Program tidak langsung mati; ia memberi kesempatan kedua.',
      codeSnippets: [
        {
          id: 'kode-baca-angka',
          title: 'baca_angka() dengan try/except',
          filename: 'laporan.py',
          code: `def baca_angka(pesan):
    while True:
        try:
            teks = input(pesan).replace(".", "").replace(",", "").strip()
            angka = int(teks)
            if angka <= 0:
                raise ValueError("harus lebih dari 0")
            return angka
        except ValueError:
            pesan_error("Input salah, masukkan angka bulat lebih dari 0 ya (contoh: 15000).")`,
          explanation:
            'while True mengulang sampai input benar. try/except menangkap ValueError, lalu program mengulang tanpa crash.',
          lineExplanations: [
            { line: 2, code: 'while True:', explanation: 'Ulangi terus sampai pengguna memasukkan angka yang benar.' },
            { line: 4, code: 'teks = input(pesan).replace(...)', explanation: 'Membaca input dan membersihkan titik/koma pemisah ribuan.' },
            { line: 5, code: 'angka = int(teks)', explanation: 'Mengubah teks menjadi bilangan bulat.' },
            { line: 6, code: 'if angka <= 0: raise ValueError(...)', explanation: 'Menolak nol dan angka negatif dengan memicu ValueError sendiri.' },
            { line: 9, code: 'except ValueError:', explanation: 'Menangkap ValueError, lalu mencetak pesan dan mengulang.' },
          ],
        },
        {
          id: 'kode-baca-pilihan',
          title: 'baca_pilihan()',
          filename: 'laporan.py',
          code: `def baca_pilihan(pesan, maksimal):
    while True:
        try:
            nomor = int(input(pesan))
            if nomor < 1 or nomor > maksimal:
                raise ValueError("di luar rentang")
            return nomor
        except ValueError:
            pesan_error("Pilihan tidak valid, masukkan nomor 1 sampai " + str(maksimal) + ".")`,
          explanation:
            'Memastikan nomor pilihan berada di rentang 1 sampai maksimal. Jika tidak, ValueError ditangkap dan program mengulang.',
          lineExplanations: [
            { line: 3, code: 'nomor = int(input(pesan))', explanation: 'Membaca pilihan dan mengubahnya menjadi int.' },
            { line: 4, code: 'if nomor < 1 or nomor > maksimal:', explanation: 'Memeriksa apakah nomor di luar rentang.' },
            { line: 5, code: 'raise ValueError("di luar rentang")', explanation: 'Memicu error sendiri agar ditangkap except.' },
          ],
        },
      ],
      importantNotes: [
        'try/except adalah cara menangani error agar program tidak berhenti mendadak.',
        'ValueError muncul jika int() menerima teks yang bukan angka.',
        'raise ValueError(...) adalah cara "melempar" error sendiri saat validasi gagal.',
        'Setelah except, program kembali ke awal while, bukan keluar dari fungsi.',
      ],
      commonMistakes: [
        'Menulis int(input(...)) tanpa try/except; program crash saat pengguna mengetik huruf.',
        'Lupa return di dalam try; fungsi tidak mengembalikan nilai.',
        'Menulis except tanpa ValueError; semua error ikut tertangkap dan menyembunyikan bug lain.',
      ],
      projectConnection: {
        file: 'laporan.py',
        note: 'baca_angka() dipanggil di setup_awal(), menu_pengeluaran(), dan menu_pemasukan() pada main.py.',
        code: `uang_saku = baca_angka("  ► Anggaran sebulan (Rp)  : ")\njumlah_hari = baca_angka("  ► Jumlah hari sebulan    : ")`,
      },
    },
    {
      id: 'fungsi-cek-peringatan',
      title: '3. Fungsi cek_peringatan()',
      content: `\`cek_peringatan()\` menampilkan status hari ini:
- **BOROS!** jika pengeluaran hari ini > jatah.
- **HATI-HATI** jika pengeluaran >= 80% jatah.
- **AMAN** jika di bawah 80%.

Fungsi ini juga menghitung saldo, menampilkan batang kemajuan, dan memberi saran maksimal pengeluaran per hari sampai akhir bulan.`,
      analogy:
        'Seperti lampu indikator di dasbor motor: hijau untuk aman, kuning untuk hati-hati, merah untuk boros.',
      codeSnippets: [
        {
          id: 'kode-cek-peringatan',
          title: 'Logika status di cek_peringatan()',
          filename: 'laporan.py',
          code: `keluar_hari_ini = 85000
jatah = 100000
def format_rupiah(angka):
    return "Rp" + str(angka)

if keluar_hari_ini > jatah:
    warna_status = "merah"
    judul_status = "BOROS!"
    isi_status = "Kamu sudah lebih " + format_rupiah(keluar_hari_ini - jatah) + " dari jatah hari ini."
elif keluar_hari_ini >= 0.8 * jatah:
    warna_status = "kuning"
    judul_status = "HATI-HATI"
    isi_status = "Pengeluaran hari ini hampir habis jatah."
else:
    warna_status = "hijau"
    judul_status = "AMAN"
    isi_status = "Pengeluaran hari ini masih aman."
print(judul_status)`,
          explanation:
            'Python memeriksa dari atas. Jika kondisi pertama benar, elif dan else dilewati. Hanya satu status yang tampil.',
          lineExplanations: [
            { line: 1, code: 'if keluar_hari_ini > jatah:', explanation: 'Kondisi boros: pengeluaran melebihi jatah.' },
            { line: 5, code: 'elif keluar_hari_ini >= 0.8 * jatah:', explanation: 'Kondisi hati-hati: 80% jatah atau lebih, tetapi belum melebihi.' },
            { line: 9, code: 'else:', explanation: 'Jalur aman jika dua kondisi di atas salah.' },
          ],
        },
      ],
      importantNotes: [
        'Ambang batas HATI-HATI adalah 80% jatah, bukan 70% seperti versi lama.',
        'warna_status dipakai untuk mewarnai kotak status dan batang.',
        'Jika saldo <= 20% anggaran, muncul kotak "SALDO MENIPIS". Jika saldo < 0, muncul "SALDO MINUS".',
      ],
      commonMistakes: [
        'Menulis elif setelah else; else harus paling akhir.',
        'Lupa titik dua setelah if/elif/else.',
        'Membandingkan teks dengan angka tanpa mengubah tipe.',
      ],
      projectConnection: {
        file: 'main.py',
        note: 'cek_peringatan() dipanggil dari menu 3 dan setelah mencatat pengeluaran.',
        code: `elif pilihan == "3":\n    bersihkan_layar()\n    cek_peringatan()\n    tunggu()`,
      },
    },
    {
      id: 'fungsi-riwayat',
      title: '4. Fungsi tampil_riwayat()',
      content: `\`tampil_riwayat()\` menampilkan semua transaksi dalam bentuk tabel. Kolomnya: No, Hari, Keterangan, Masuk, Keluar.

Fungsi ini memakai:
- \`garis_tabel(lebar, "┌", "┬", "┐")\` untuk garis atas.
- \`baris_tabel(isi, lebar, rata)\` untuk setiap baris.
- \`warna(teks, "hijau")\` untuk pemasukan dan \`warna(teks, "merah")\` untuk pengeluaran.
- \`panjang_tampil()\` di dalam baris_tabel agar kode warna tidak merusak lebar kolom.`,
      analogy:
        'Seperti meja kasir dengan kolom-kolom rapi: nomor, hari, keterangan, uang masuk, uang keluar.',
      codeSnippets: [
        {
          id: 'kode-tampil-riwayat',
          title: 'Potongan tampil_riwayat()',
          filename: 'laporan.py',
          code: `from tampilan import garis_tabel, baris_tabel, warna

lebar = [3, 4, 15, 13, 13]
rata = ["kanan", "kanan", "kiri", "kanan", "kanan"]

garis_tabel(lebar, "┌", "┬", "┐")
baris_tabel([warna("No", "cyan", True), warna("Hari", "cyan", True),
             warna("Keterangan", "cyan", True), warna("Masuk", "cyan", True),
             warna("Keluar", "cyan", True)], lebar, rata)
garis_tabel(lebar, "├", "┼", "┤")`,
          explanation:
            'lebar_kolom menentukan lebar setiap kolom. rata menentukan posisi teks: "kiri" atau "kanan".',
          lineExplanations: [
            { line: 1, code: 'lebar = [3, 4, 15, 13, 13]', explanation: 'Daftar lebar kolom dalam jumlah karakter.' },
            { line: 2, code: 'rata = ["kanan", "kanan", "kiri", "kanan", "kanan"]', explanation: 'Posisi teks di setiap kolom.' },
            { line: 4, code: 'garis_tabel(lebar, "┌", "┬", "┐")', explanation: 'Mencetak garis pembatas atas tabel.' },
          ],
        },
      ],
      importantNotes: [
        'Garis tabel memakai karakter kotak ┌ ┬ ┐ ├ ┼ ┤ └ ┴ ┘.',
        'baris_tabel memakai panjang_tampil() agar kode warna tidak dihitung sebagai karakter.',
        'Jika kategori lebih dari 15 karakter, dipotong dengan kategori[:15].',
      ],
      commonMistakes: [
        'Lupa garis penutup sehingga tabel terlihat menggantung.',
        'Menghitung panjang dengan len() pada teks berwarna; hasilnya terlalu panjang dan tabel melebar.',
      ],
      projectConnection: {
        file: 'main.py',
        note: 'tampil_riwayat() dipanggil dari menu 4.',
        code: `elif pilihan == "4":\n    bersihkan_layar()\n    tampil_riwayat()\n    tunggu()`,
      },
    },
    {
      id: 'fungsi-laporan-kategori',
      title: '5. Fungsi laporan_kategori()',
      content: `\`laporan_kategori()\` menghitung total pengeluaran per kategori:
1. Buat dictionary \`total\` kosong.
2. Loop semua transaksi; jika jenis "keluar", tambahkan jumlahnya ke kategori.
3. Hitung total keseluruhan dengan \`sum(total.values())\`.
4. Ubah dictionary menjadi list tuple \`(jumlah, kategori)\`, lalu urutkan dari terbesar dengan \`sort(reverse=True)\`.
5. Tampilkan setiap kategori dengan batang kemajuan dan persentase.`,
      analogy:
        'Seperti mengelompokkan struk belanja per jenis: makan, transport, kuota, lalu diurutkan dari yang paling mahal.',
      codeSnippets: [
        {
          id: 'kode-laporan-kategori',
          title: 'Menghitung total per kategori',
          filename: 'laporan.py',
          code: `transaksi = [(1, "keluar", "Makan", 85000), (1, "keluar", "Transport", 40000)]
total = {}
for hari, jenis, kategori, jumlah in transaksi:
    if jenis == "keluar":
        if kategori in total:
            total[kategori] += jumlah
        else:
            total[kategori] = jumlah

semua = sum(total.values())

urutan = []
for kategori in total:
    urutan.append((total[kategori], kategori))
urutan.sort(reverse=True)`,
          explanation:
            'Dictionary total menyimpan jumlah per kategori. sort(reverse=True) mengurutkan dari jumlah terbesar.',
          lineExplanations: [
            { line: 1, code: 'total = {}', explanation: 'Dictionary kosong untuk menampung total per kategori.' },
            { line: 3, code: 'if jenis == "keluar":', explanation: 'Hanya pengeluaran yang dihitung.' },
            { line: 4, code: 'if kategori in total:', explanation: 'Jika kategori sudah ada, tambahkan jumlahnya.' },
            { line: 9, code: 'semua = sum(total.values())', explanation: 'Menjumlahkan semua nilai di dictionary.' },
            { line: 13, code: 'urutan.sort(reverse=True)', explanation: 'Mengurutkan dari terbesar ke terkecil.' },
          ],
        },
      ],
      importantNotes: [
        'Kategori yang belum ada di dictionary ditambahkan dengan else.',
        'sum(total.values()) menjumlahkan semua pengeluaran.',
        'urutan[0][1] adalah kategori dengan pengeluaran terbesar.',
      ],
      commonMistakes: [
        'Menggunakan total[kategori] += jumlah tanpa cek if kategori in total; KeyError pada kategori baru.',
        'Lupa reverse=True sehingga urutan dari terkecil.',
      ],
      projectConnection: {
        file: 'main.py',
        note: 'laporan_kategori() dipanggil dari menu 5.',
        code: `elif pilihan == "5":\n    bersihkan_layar()\n    laporan_kategori()\n    tunggu()`,
      },
    },
  ],
  cheatSheet: {
    title: 'Cheat Sheet Bab 5 — laporan.py',
    items: [
      'laporan.py dipegang Orang 2; mengimpor data dari pencatat.py dan alat dari tampilan.py.',
      'baca_angka(pesan): input -> replace titik/koma -> int -> validasi > 0 -> return.',
      'try/except ValueError menangkap input salah dan mengulang pertanyaan.',
      'raise ValueError(...) memicu error sendiri saat validasi gagal.',
      'baca_pilihan(pesan, maksimal): memastikan nomor 1..maksimal.',
      'cek_peringatan(): BOROS jika > jatah, HATI-HATI jika >= 80% jatah, selain itu AMAN.',
      'tampil_riwayat(): tabel dengan garis_tabel() dan baris_tabel().',
      'laporan_kategori(): total per kategori, sum(total.values()), sort(reverse=True), lalu bar().',
      'Jangan mengubah data langsung; panggil fungsi dari pencatat.py.',
    ],
    code: `try:\n    angka = int(input("Jumlah: "))\n    if angka <= 0:\n        raise ValueError("harus positif")\n    return angka\nexcept ValueError:\n    print("Input salah")`,
  },
  commonError: {
    name: "ValueError: invalid literal for int() with base 10: 'abc'",
    message: "ValueError: invalid literal for int() with base 10: 'abc'",
    cause:
      'Pengguna mengetik huruf saat diminta angka. int("abc") tidak bisa mengubah teks menjadi angka.',
    fix:
      'Bungkus int() dengan try/except ValueError, lalu ulangi pertanyaan. Jangan biarkan program crash.',
    badCode: `angka = int(input("Jumlah: "))\nprint(angka + 1)`,
    goodCode: `while True:\n    try:\n        angka = int(input("Jumlah: "))\n        if angka > 0:\n            break\n    except ValueError:\n        print("Input salah, coba lagi.")\nprint(angka + 1)`,
  },
  tryItYourself: [
    {
      id: 'bab5-coba-1',
      level: 'Mudah',
      prompt: 'Buat fungsi status(saldo, anggaran) yang mengembalikan "AMAN", "HATI-HATI", atau "BOROS" dengan ambang 20% dan 50%.',
      starterCode: `def status(saldo, anggaran):\n    # tulis di sini\n    pass`,
      answerCode: `def status(saldo, anggaran):\n    if saldo <= 0.2 * anggaran:\n        return "BOROS"\n    elif saldo <= 0.5 * anggaran:\n        return "HATI-HATI"\n    else:\n        return "AMAN"\n\nprint(status(100000, 1000000))`,
      explanation:
        'Periksa kondisi terburuk dulu. 100000 <= 200000, jadi hasilnya BOROS.',
    },
    {
      id: 'bab5-coba-2',
      level: 'Sedang',
      prompt: 'Buat fungsi total_kategori(transaksi, kategori) yang menjumlahkan pengeluaran pada kategori tertentu.',
      starterCode: `transaksi = [(1, "keluar", "Makan", 15000), (1, "keluar", "Transport", 40000)]\n\ndef total_kategori(transaksi, kategori):\n    # tulis di sini\n    pass`,
      answerCode: `transaksi = [(1, "keluar", "Makan", 15000), (1, "keluar", "Transport", 40000)]\n\ndef total_kategori(transaksi, kategori):\n    total = 0\n    for hari, jenis, kat, jumlah in transaksi:\n        if jenis == "keluar" and kat == kategori:\n            total += jumlah\n    return total\n\nprint(total_kategori(transaksi, "Makan"))`,
      explanation: 'Periksa jenis "keluar" dan kategori yang diminta. Hasilnya 15000.',
    },
    {
      id: 'bab5-coba-3',
      level: 'Tantangan',
      prompt: 'Buat fungsi persen_terpakai(pengeluaran, jatah) yang mengembalikan persen bulat, dan 0 jika jatah nol.',
      starterCode: `def persen_terpakai(pengeluaran, jatah):\n    # tulis di sini\n    pass`,
      answerCode: `def persen_terpakai(pengeluaran, jatah):\n    if jatah <= 0:\n        return 0\n    return round(pengeluaran / jatah * 100)\n\nprint(persen_terpakai(85000, 100000))`,
      explanation:
        'round() membulatkan. Pengecekan jatah <= 0 mencegah ZeroDivisionError. Hasilnya 85.',
    },
  ],
  fixTheBug: {
    id: 'bab5-fix-1',
    title: 'Perbaiki: input huruf membuat program crash',
    prompt:
      'Program ini crash jika pengguna mengetik huruf. Tambahkan try/except ValueError agar program mengulang pertanyaan.',
    buggyCode: `def baca_angka(pesan):\n    angka = int(input(pesan))\n    return angka`,
    answerCode: `def baca_angka(pesan):\n    while True:\n        try:\n            angka = int(input(pesan))\n            if angka > 0:\n                return angka\n        except ValueError:\n            print("Input salah, coba lagi.")`,
    explanation:
      'while True dan try/except membuat program mengulang sampai input valid. Tanpa itu, ValueError menghentikan program.',
  },
  quiz: [
    {
      id: 'q-bab5-1',
      question: 'Apa fungsi try/except ValueError pada baca_angka()?',
      options: [
        'Mengubah input menjadi angka',
        'Menangkap input salah dan mengulang pertanyaan tanpa membuat program crash',
        'Menghapus input dari memori',
        'Mencetak angka dengan format Rupiah',
      ],
      correctIndex: 1,
      explanation:
        'try/except menangkap ValueError saat int() gagal, lalu program mengulang while True.',
    },
    {
      id: 'q-bab5-2',
      question: 'Apa yang dilakukan raise ValueError("harus lebih dari 0")?',
      options: [
        'Mencetak pesan dan menghentikan program selamanya',
        'Memicu error ValueError yang ditangkap oleh except di bawahnya',
        'Mengubah angka menjadi teks',
        'Menghapus semua transaksi',
      ],
      correctIndex: 1,
      explanation:
        'raise melempar error. Karena berada di dalam try, error itu ditangkap oleh except ValueError.',
    },
    {
      id: 'q-bab5-3',
      question: 'Jika jatah 100000 dan pengeluaran hari ini 85000, status apa yang muncul?',
      options: ['AMAN', 'HATI-HATI', 'BOROS!', 'BELUM DIATUR'],
      correctIndex: 1,
      explanation:
        '85000 >= 0.8 * 100000 (80000), tetapi tidak lebih dari 100000, sehingga HATI-HATI.',
    },
    {
      id: 'q-bab5-4',
      question: 'Fungsi apa yang dipakai untuk menampilkan riwayat transaksi dalam tabel?',
      options: ['cek_peringatan()', 'tampil_riwayat()', 'baca_angka()', 'laporan_kategori()'],
      correctIndex: 1,
      explanation:
        'tampil_riwayat() memakai garis_tabel() dan baris_tabel() dari tampilan.py.',
    },
    {
      id: 'q-bab5-5',
      question: 'Mengapa baris_tabel() memakai panjang_tampil() dan bukan len()?',
      options: [
        'Karena len() tidak bisa dipakai di Python',
        'Karena teks berwarna mengandung kode ANSI yang tidak boleh dihitung sebagai karakter',
        'Karena panjang_tampil() lebih cepat',
        'Karena tabel hanya boleh berisi angka',
      ],
      correctIndex: 1,
      explanation:
        'Kode warna seperti \\033[92m tidak terlihat di layar, tetapi ikut dihitung oleh len(). panjang_tampil() melewatinya.',
    },
  ],
  summaryPoints: [
    'laporan.py (Orang 2) mengimpor data dari pencatat.py dan alat tampilan dari tampilan.py.',
    'baca_angka() dan baca_pilihan() memakai while True + try/except ValueError agar input salah tidak membuat program crash.',
    'raise ValueError(...) dipakai untuk memicu error sendiri saat validasi gagal.',
    'cek_peringatan() menentukan status BOROS / HATI-HATI / AMAN dan menampilkan batang kemajuan.',
    'tampil_riwayat() dan laporan_kategori() menampilkan data dalam tabel dan grafik batang.',
  ],
  traceTable: {
    title: 'Tabel jejak: cek_peringatan()',
    description: 'Perhatikan bagaimana pengeluaran hari ini menentukan status.',
    steps: [
      { line: 1, code: 'keluar_hari_ini = 15000', variables: { keluar_hari_ini: '15000', jatah: '100000', status: '—' }, note: 'Belanja kecil.' },
      { line: 2, code: 'if 15000 > 100000', result: 'False', variables: { keluar_hari_ini: '15000', jatah: '100000', status: '—' }, note: 'Bukan boros.' },
      { line: 3, code: 'elif 15000 >= 80000', result: 'False', variables: { keluar_hari_ini: '15000', jatah: '100000', status: '—' }, note: 'Bukan hati-hati.' },
      { line: 4, code: 'else: status = "AMAN"', result: 'jalur else', variables: { keluar_hari_ini: '15000', jatah: '100000', status: 'AMAN' }, note: 'Status aman.' },
      { line: 5, code: 'keluar_hari_ini = 85000', variables: { keluar_hari_ini: '85000', jatah: '100000', status: 'AMAN' }, note: 'Data baru.' },
      { line: 6, code: 'elif 85000 >= 80000', result: 'True', variables: { keluar_hari_ini: '85000', jatah: '100000', status: 'HATI-HATI' }, note: 'Status hati-hati.' },
      { line: 7, code: 'keluar_hari_ini = 125000', variables: { keluar_hari_ini: '125000', jatah: '100000', status: 'HATI-HATI' }, note: 'Data baru.' },
      { line: 8, code: 'if 125000 > 100000', result: 'True', variables: { keluar_hari_ini: '125000', jatah: '100000', status: 'BOROS!' }, note: 'Status boros.' },
    ],
  },
};
