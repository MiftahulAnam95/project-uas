import { Chapter } from '../../types';

export const bab6: Partial<Chapter> = {
  openingAnalogy:
    'Bayangkan main.py adalah resepsionis di kantor. Ia menyambut tamu, menawarkan menu layanan, mencatat permintaan, lalu memanggil orang yang tepat (pencatat atau laporan). Ia tidak menghitung sendiri, tetapi mengatur alur.',
  sections: [
    {
      id: 'peran-main',
      title: '1. Peran dan Tanggung Jawab main.py (Orang 3)',
      content: `\`main.py\` adalah **pintu masuk** program. Pengguna menjalankan \`python main.py\`, lalu melihat menu.

Tugasnya:
- Mengimpor \`pencatat\`, \`laporan\`, dan \`tampilan\`.
- Menampilkan menu 1 sampai 7 dan 0.

**Pembagian file proyek:** pencatat.py dipegang Orang 1, laporan.py dipegang Orang 2, main.py dipegang Orang 3, dan tampilan.py dipakai bersama oleh laporan.py dan main.py.
- Menerima pilihan pengguna.
- Memanggil fungsi yang tepat dari modul lain.
- Mengulang menu sampai pengguna memilih 0.

File ini tidak menghitung saldo sendiri dan tidak menampilkan tabel sendiri. Ia hanya mengatur alur.`,
      analogy:
        'Resepsionis tidak memasak, tetapi tahu harus menghubungi dapur atau kasir sesuai permintaan tamu.',
      codeSnippets: [
        {
          id: 'kode-import-main',
          title: 'Import di main.py',
          filename: 'main.py',
          code: `from pencatat import (KATEGORI, akun, format_rupiah, atur_uang_saku,
                      tambah_pemasukan, tambah_pengeluaran, hitung_saldo)
from laporan import (baca_angka, baca_pilihan, cek_peringatan,
                     tampil_riwayat, laporan_kategori)
from tampilan import (warna, bersihkan_layar, judul_besar, judul_bagian, kotak, bar,
                      pesan_ok, pesan_error, pesan_info, tunggu)`,
          explanation:
            'main.py mengimpor tiga modul. Nama fungsi dipanggil langsung tanpa awalan modul karena memakai from ... import ...',
          lineExplanations: [
            { line: 1, code: 'from pencatat import ...', explanation: 'Mengambil data dan fungsi dari pencatat.py.' },
            { line: 3, code: 'from laporan import ...', explanation: 'Mengambil fungsi input dan laporan dari laporan.py.' },
            { line: 5, code: 'from tampilan import ...', explanation: 'Mengambil alat tampilan dari tampilan.py.' },
          ],
        },
      ],
      importantNotes: [
        'Semua modul harus berada di folder yang sama.',
        'from modul import nama memungkinkan memanggil nama tanpa awalan modul.',
        'Jangan menamai file dengan nama modul bawaan Python seperti random.py atau math.py.',
      ],
      projectConnection: {
        file: 'main.py',
        note: 'main.py adalah file yang dijalankan pengguna: python main.py.',
      },
    },
    {
      id: 'menu-utama',
      title: '2. Fungsi tampil_menu()',
      content: `\`tampil_menu()\` membersihkan layar, mencetak judul besar, menampilkan saldo dan jatah, lalu mencetak daftar menu dalam kotak.

Menu yang tersedia:
1. Catat pengeluaran
2. Catat pemasukan
3. Cek saldo dan peringatan
4. Riwayat transaksi
5. Laporan per kategori
6. Lanjut ke hari berikutnya
7. Atur ulang anggaran
0. Keluar`,
      analogy:
        'Seperti papan menu di kantin: semua pilihan ditulis jelas, lalu pelanggan memilih nomor.',
      codeSnippets: [
        {
          id: 'kode-tampil-menu',
          title: 'Struktur menu utama',
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
            'MENU adalah list of tuple. Setiap tuple berisi nomor menu dan nama menu. Loop for nomor, nama in MENU mencetak semuanya.',
          lineExplanations: [
            { line: 1, code: 'MENU = [ ... ]', explanation: 'List berisi pasangan nomor dan nama menu.' },
            { line: 3, code: '("1", "Catat pengeluaran")', explanation: 'Tuple pertama: nomor "1" dan nama menu.' },
          ],
        },
      ],
      importantNotes: [
        'Nomor menu disimpan sebagai teks, karena input() menghasilkan teks.',
        'Perbandingan memakai pilihan == "1", bukan pilihan == 1.',
        'Menu 0 dipakai untuk keluar dengan break.',
      ],
      commonMistakes: [
        'Membandingkan pilihan (teks) dengan angka 1 tanpa tanda petik.',
        'Lupa menampilkan menu sebelum input, sehingga pengguna tidak tahu pilihan.',
      ],
      projectConnection: {
        file: 'main.py',
        note: 'MENU dipakai di tampil_menu() dan di loop utama main().',
        code: `for nomor, nama in MENU:\n    print("[" + nomor + "] " + nama)`,
      },
    },
    {
      id: 'fungsi-setup-awal',
      title: '3. Fungsi setup_awal()',
      content: `\`setup_awal(ulang=False)\` dijalankan saat program pertama kali dibuka atau saat pengguna memilih menu 7.

Fungsi ini:
1. Membersihkan layar dan mencetak judul.
2. Menampilkan kotak "ATUR ANGGARAN".
3. Meminta anggaran dan jumlah hari lewat \`baca_angka()\`.
4. Memanggil \`atur_uang_saku(uang_saku, jumlah_hari)\` dari pencatat.py.
5. Menampilkan pesan berhasil dan jatah harian.
6. Menunggu Enter lewat \`tunggu()\`.

Jika \`ulang=True\`, ditambahkan peringatan bahwa catatan lama akan dihapus.`,
      analogy:
        'Seperti membuka buku kas baru: isi saldo awal dan jumlah hari, lalu buku siap dipakai.',
      codeSnippets: [
        {
          id: 'kode-setup-awal',
          title: 'setup_awal()',
          filename: 'main.py',
          code: `def setup_awal(ulang=False):
    bersihkan_layar()
    judul_besar("PENCATAT KEUANGAN MAHASISWA", "Selamat datang!")
    print()
    isi = ["Isi anggaran satu bulan (gaji, honor, atau kiriman).",
           "Jatah harian akan dihitung otomatis."]
    if ulang:
        isi.append(warna("Perhatian: catatan lama akan dihapus.", "kuning"))
    kotak("ATUR ANGGARAN", isi)
    print()
    uang_saku = baca_angka("  ► Anggaran sebulan (Rp)  : ")
    jumlah_hari = baca_angka("  ► Jumlah hari sebulan    : ")
    atur_uang_saku(uang_saku, jumlah_hari)`,
          explanation:
            'setup_awal() meminta dua angka, lalu memanggil atur_uang_saku() untuk menyimpan data dan menghitung jatah harian.',
          lineExplanations: [
            { line: 2, code: 'bersihkan_layar()', explanation: 'Menghapus layar hanya jika terminal sungguhan.' },
            { line: 3, code: 'judul_besar(...)', explanation: 'Mencetak kotak judul dari tampilan.py.' },
            { line: 7, code: 'if ulang:', explanation: 'Jika menu 7 dipilih, tambahkan peringatan.' },
            { line: 11, code: 'uang_saku = baca_angka(...)', explanation: 'Input divalidasi di laporan.py.' },
            { line: 13, code: 'atur_uang_saku(uang_saku, jumlah_hari)', explanation: 'Menyimpan data dan menghitung jatah harian.' },
          ],
        },
      ],
      importantNotes: [
        'setup_awal() tidak mengembalikan nilai; ia mengubah data di pencatat.py.',
        'Menu 7 memanggil setup_awal(True) untuk mengatur ulang.',
        'Jika jumlah_hari 0, baca_angka() menolaknya karena harus > 0.',
      ],
      commonMistakes: [
        'Memanggil setup_awal() tanpa menunggu input selesai.',
        'Lupa import atur_uang_saku dari pencatat.py.',
      ],
      projectConnection: {
        file: 'pencatat.py',
        note: 'setup_awal() memanggil atur_uang_saku() yang menulis ke akun dan transaksi.',
        code: `atur_uang_saku(uang_saku, jumlah_hari)`,
      },
    },
    {
      id: 'fungsi-menu-transaksi',
      title: '4. Fungsi menu_pengeluaran() dan menu_pemasukan()',
      content: `\`menu_pengeluaran()\`:
1. Membersihkan layar dan mencetak judul.
2. Menampilkan daftar KATEGORI dalam kotak.
3. Meminta nomor kategori lewat \`baca_pilihan(..., len(KATEGORI))\`.
4. Meminta jumlah lewat \`baca_angka()\`.
5. Memanggil \`tambah_pengeluaran(jumlah, KATEGORI[pilihan - 1])\`.
6. Menampilkan pesan berhasil dan status.

\`menu_pemasukan()\` hampir sama, tetapi meminta sumber pemasukan dan memanggil \`tambah_pemasukan(jumlah, sumber)\`.`,
      analogy:
        'Seperti kasir yang menanyakan "mau pesan apa?" dan "berapa jumlahnya?", lalu mencatat pesanan.',
      codeSnippets: [
        {
          id: 'kode-menu-pengeluaran',
          title: 'menu_pengeluaran()',
          filename: 'main.py',
          code: `def menu_pengeluaran():
    bersihkan_layar()
    judul_bagian("CATAT PENGELUARAN")
    baris = []
    nomor = 1
    for nama in KATEGORI:
        baris.append(warna("[" + str(nomor) + "]", "cyan", True) + "  " + nama)
        nomor += 1
    kotak("PILIH KATEGORI", baris)
    print()
    pilihan = baca_pilihan("  ► Nomor kategori          : ", len(KATEGORI))
    jumlah = baca_angka("  ► Jumlah pengeluaran (Rp) : ")
    tambah_pengeluaran(jumlah, KATEGORI[pilihan - 1])`,
          explanation:
            'Nomor kategori mulai dari 1, tetapi index list mulai dari 0. Karena itu dipakai KATEGORI[pilihan - 1].',
          lineExplanations: [
            { line: 5, code: 'for nama in KATEGORI:', explanation: 'Menampilkan setiap kategori dengan nomor urut.' },
            { line: 9, code: 'pilihan = baca_pilihan(..., len(KATEGORI))', explanation: 'Memastikan nomor 1 sampai 6.' },
            { line: 11, code: 'tambah_pengeluaran(jumlah, KATEGORI[pilihan - 1])', explanation: 'Mengubah nomor menjadi kategori, lalu mencatat.' },
          ],
        },
      ],
      importantNotes: [
        'KATEGORI[pilihan - 1] dipakai karena pilihan pengguna mulai 1, sedangkan index list mulai 0.',
        'baca_pilihan() mencegah nomor di luar rentang.',
        'baca_angka() mencegah input huruf atau angka negatif.',
      ],
      commonMistakes: [
        'Menulis KATEGORI[pilihan] sehingga kategori bergeser satu.',
        'Lupa memanggil cek_peringatan() setelah mencatat pengeluaran.',
      ],
      projectConnection: {
        file: 'pencatat.py',
        note: 'tambah_pengeluaran() dan tambah_pemasukan() menambah tuple ke list transaksi.',
        code: `tambah_pengeluaran(jumlah, KATEGORI[pilihan - 1])`,
      },
    },
    {
      id: 'fungsi-loop-utama',
      title: '5. Fungsi hari_berikutnya() dan main()',
      content: `\`hari_berikutnya()\` menaikkan \`akun["hari"]\` jika belum hari terakhir. Jika sudah hari terakhir, program memberi info.

\`main()\` adalah loop utama:
1. Memanggil setup_awal() sekali di awal.
2. \`while True\`: tampilkan menu, minta pilihan.
3. \`if pilihan == "1"\`: menu_pengeluaran().
4. \`elif pilihan == "2"\`: menu_pemasukan().
5. \`elif pilihan == "3"\`: cek_peringatan().
6. \`elif pilihan == "4"\`: tampil_riwayat().
7. \`elif pilihan == "5"\`: laporan_kategori().
8. \`elif pilihan == "6"\`: hari_berikutnya().
9. \`elif pilihan == "7"\`: setup_awal(True).
10. \`elif pilihan == "0"\`: cetak pesan, lalu \`break\`.
11. \`else\`: pesan menu tidak valid.

Di akhir file, \`main()\` dipanggil langsung.`,
      analogy:
        'Seperti pelayan yang terus kembali ke meja pelanggan sampai pelanggan bilang "sudah, terima kasih" (menu 0).',
      codeSnippets: [
        {
          id: 'kode-loop-utama',
          title: 'Loop utama main()',
          filename: 'main.py',
          code: `def main():
    setup_awal()
    while True:
        tampil_menu()
        pilihan = input("\\n  ► Pilih menu : ").strip()
        if pilihan == "1":
            menu_pengeluaran()
        elif pilihan == "2":
            menu_pemasukan()
        elif pilihan == "3":
            bersihkan_layar()
            cek_peringatan()
            tunggu()
        elif pilihan == "4":
            bersihkan_layar()
            tampil_riwayat()
            tunggu()
        elif pilihan == "5":
            bersihkan_layar()
            laporan_kategori()
            tunggu()
        elif pilihan == "6":
            hari_berikutnya()
        elif pilihan == "7":
            setup_awal(True)
        elif pilihan == "0":
            bersihkan_layar()
            kotak("SAMPAI JUMPA", ["Terima kasih sudah memakai aplikasi ini."], "hijau")
            break
        else:
            pesan_error("Menu tidak ada, pilih nomor yang tersedia ya.")
            tunggu()

main()`,
          explanation:
            'while True mengulang menu. break pada menu 0 menghentikan loop. elif memastikan hanya satu aksi dijalankan.',
          lineExplanations: [
            { line: 3, code: 'while True:', explanation: 'Menu terus muncul sampai pengguna memilih 0.' },
            { line: 5, code: 'pilihan = input(...)', explanation: 'Membaca pilihan sebagai teks.' },
            { line: 7, code: 'if pilihan == "1":', explanation: 'Menu 1 memanggil menu_pengeluaran().' },
            { line: 27, code: 'elif pilihan == "0": ... break', explanation: 'Menu 0 mencetak pesan lalu menghentikan loop.' },
            { line: 33, code: 'main()', explanation: 'Memanggil fungsi utama saat file dijalankan.' },
          ],
        },
      ],
      importantNotes: [
        'while True membutuhkan jalan keluar. Di sini jalan keluarnya adalah break pada menu 0.',
        'Jika lupa break, program akan terus mengulang menu meskipun pengguna memilih 0.',
        'Memanggil main() di akhir file membuat program langsung berjalan saat python main.py diketik.',
        'Pola if __name__ == "__main__": main() adalah alternatif yang lebih aman jika file ini nanti diimpor oleh file lain. Versi terlampir memanggil main() langsung.',
      ],
      commonMistakes: [
        'Lupa break sehingga program tidak bisa keluar.',
        'Menulis if setelah elif, atau elif setelah else.',
        'Membandingkan pilihan dengan angka tanpa tanda petik.',
      ],
      projectConnection: {
        file: 'main.py',
        note: 'main() adalah loop utama yang menghubungkan semua modul.',
        code: `if pilihan == "0":\n    break`,
      },
    },
  ],
  cheatSheet: {
    title: 'Cheat Sheet Bab 6 — main.py',
    items: [
      '4 file: pencatat.py (Orang 1), laporan.py (Orang 2), main.py (Orang 3), tampilan.py (dipakai bersama).',
      'MENU adalah list of tuple (nomor, nama). Ada 7 menu + 0.',
      'tampil_menu() membersihkan layar, mencetak judul, saldo, dan menu.',
      'setup_awal() meminta anggaran dan hari, lalu memanggil atur_uang_saku().',
      'menu_pengeluaran() memakai KATEGORI[pilihan - 1] karena index mulai 0.',
      'menu_pemasukan() mencatat uang masuk.',
      'hari_berikutnya() menaikkan akun["hari"] jika belum hari terakhir.',
      'while True + break pada menu 0 menghentikan program.',
      'Pilihan dibandingkan sebagai teks: pilihan == "1".',
    ],
    code: `while True:\n    pilihan = input("Pilih menu: ")\n    if pilihan == "0":\n        break`,
  },
  commonError: {
    name: 'IndentationError: expected an indented block',
    message: 'IndentationError: expected an indented block',
    cause:
      'Setelah if/elif/else atau def, baris berikutnya harus menjorok ke dalam. Jika tidak, Python tidak tahu isi bloknya.',
    fix:
      'Tambahkan indentasi 4 spasi pada baris di bawah if/elif/else/def. Pastikan tidak mencampur tab dan spasi.',
    badCode: `if pilihan == "1":\nmenu_pengeluaran()`,
    goodCode: `if pilihan == "1":\n    menu_pengeluaran()`,
  },
  tryItYourself: [
    {
      id: 'bab6-coba-1',
      level: 'Mudah',
      prompt: 'Diberi MENU list of tuple. Cetak semua menu dengan format [nomor] nama.',
      starterCode: `MENU = [("1", "Catat pengeluaran"), ("2", "Catat pemasukan"), ("0", "Keluar")]\n# cetak semua`,
      answerCode: `MENU = [("1", "Catat pengeluaran"), ("2", "Catat pemasukan"), ("0", "Keluar")]\nfor nomor, nama in MENU:\n    print(f"[{nomor}] {nama}")`,
      explanation: 'Loop for nomor, nama in MENU membuka setiap tuple, lalu f-string mencetaknya.',
    },
    {
      id: 'bab6-coba-2',
      level: 'Sedang',
      prompt: 'Buat fungsi nama_menu(pilihan) yang mengembalikan nama menu dari nomor pilihan, atau "Tidak ada" jika tidak ditemukan.',
      starterCode: `MENU = [("1", "Catat pengeluaran"), ("2", "Catat pemasukan"), ("0", "Keluar")]\n\ndef nama_menu(pilihan):\n    # tulis di sini\n    pass`,
      answerCode: `MENU = [("1", "Catat pengeluaran"), ("2", "Catat pemasukan"), ("0", "Keluar")]\n\ndef nama_menu(pilihan):\n    for nomor, nama in MENU:\n        if nomor == pilihan:\n            return nama\n    return "Tidak ada"\n\nprint(nama_menu("1"))`,
      explanation:
        'Loop mencari nomor yang cocok. Jika ketemu, return nama. Jika loop selesai tanpa ketemu, return "Tidak ada".',
    },
    {
      id: 'bab6-coba-3',
      level: 'Tantangan',
      prompt: 'Buat loop menu sederhana: minta pilihan, cetak "Menu dipilih: ...", dan berhenti jika pengguna memilih "0".',
      starterCode: `while True:\n    pilihan = input("Pilih menu (0 untuk keluar): ")\n    # tulis logika di sini`,
      answerCode: `while True:\n    pilihan = input("Pilih menu (0 untuk keluar): ")\n    if pilihan == "0":\n        print("Program selesai.")\n        break\n    print(f"Menu dipilih: {pilihan}")`,
      explanation:
        'break menghentikan while True. Tanpa break, loop akan berjalan selamanya.',
    },
  ],
  fixTheBug: {
    id: 'bab6-fix-1',
    title: 'Perbaiki: menu tidak bisa keluar',
    prompt:
      'Program ini punya menu 0, tetapi tidak pernah berhenti. Tambahkan break agar loop berhenti saat pengguna memilih 0.',
    buggyCode: `while True:\n    pilihan = input("Pilih menu: ")\n    if pilihan == "0":\n        print("Terima kasih!")\n    else:\n        print("Menu dipilih:", pilihan)`,
    answerCode: `while True:\n    pilihan = input("Pilih menu: ")\n    if pilihan == "0":\n        print("Terima kasih!")\n        break\n    else:\n        print("Menu dipilih:", pilihan)`,
    explanation:
      'break harus berada di dalam blok if pilihan == "0". Tanpa break, while True tidak punya jalan keluar.',
  },
  quiz: [
    {
      id: 'q-bab6-1',
      question: 'Apa peran main.py dalam program 4 file?',
      options: [
        'Menghitung semua rumus keuangan',
        'Menjadi pintu masuk yang menampilkan menu dan memanggil modul lain',
        'Menyimpan data transaksi',
        'Menggambar kotak dan warna',
      ],
      correctIndex: 1,
      explanation:
        'main.py adalah entry point. Ia mengatur alur dan memanggil fungsi dari pencatat.py, laporan.py, dan tampilan.py.',
    },
    {
      id: 'q-bab6-2',
      question: 'Mengapa KATEGORI[pilihan - 1] dipakai di menu_pengeluaran()?',
      options: [
        'Karena pilihan pengguna mulai dari 1, sedangkan index list mulai dari 0',
        'Karena KATEGORI tidak punya index',
        'Karena list harus dikurangi satu',
        'Karena pilihan selalu negatif',
      ],
      correctIndex: 0,
      explanation:
        'Pengguna memilih nomor 1 untuk kategori pertama. Index list 0 adalah kategori pertama, jadi dikurangi 1.',
    },
    {
      id: 'q-bab6-3',
      question: 'Apa yang terjadi jika pengguna memilih menu 0?',
      options: [
        'Program mengulang menu dari awal',
        'Program mencetak pesan terima kasih lalu break keluar dari while True',
        'Program menghapus semua transaksi',
        'Program menginstal ulang Python',
      ],
      correctIndex: 1,
      explanation:
        'Menu 0 mencetak kotak "SAMPAI JUMPA" lalu break. Loop berhenti dan program selesai.',
    },
    {
      id: 'q-bab6-4',
      question: 'Mengapa pilihan menu dibandingkan dengan "1" dan bukan 1?',
      options: [
        'Karena input() menghasilkan teks',
        'Karena angka 1 tidak valid di Python',
        'Karena menu harus berupa huruf',
        'Karena perbandingan angka selalu error',
      ],
      correctIndex: 0,
      explanation:
        'input() selalu mengembalikan str. Jika dibandingkan dengan angka 1, hasilnya selalu False.',
    },
    {
      id: 'q-bab6-5',
      question: 'Apa fungsi setup_awal(True) pada menu 7?',
      options: [
        'Mengatur ulang anggaran dan menghapus transaksi lama',
        'Mencetak laporan per kategori',
        'Menambah pemasukan',
        'Keluar dari program',
      ],
      correctIndex: 0,
      explanation:
        'setup_awal(True) memanggil atur_uang_saku() yang membersihkan transaksi lama dan mengisi anggaran baru.',
    },
  ],
  summaryPoints: [
    'main.py (Orang 3) adalah pintu masuk program dan dijalankan dengan python main.py.',
    'MENU adalah list of tuple berisi 7 menu utama dan menu 0 untuk keluar.',
    'tampil_menu() menampilkan judul, saldo, dan menu; setup_awal() mengatur anggaran.',
    'menu_pengeluaran() dan menu_pemasukan() memanggil fungsi pencatat.py dan menampilkan status.',
    'while True + break pada menu 0 menghentikan program; pilihan dibandingkan sebagai teks.',
  ],
  traceTable: {
    title: 'Tabel jejak: loop menu utama',
    description: 'Perhatikan nilai pilihan dan aksi yang dijalankan di setiap putaran.',
    steps: [
      { line: 1, code: 'setup_awal()', variables: { pilihan: '—', aksi: 'atur anggaran' }, note: 'Program membuka buku kas baru.' },
      { line: 2, code: 'tampil_menu()', variables: { pilihan: '—', aksi: 'tampilkan menu' }, note: 'Menu 1-7 dan 0 ditampilkan.' },
      { line: 3, code: 'pilihan = input(...)', variables: { pilihan: '"1"', aksi: '—' }, note: 'Pengguna memilih menu 1.' },
      { line: 4, code: 'if pilihan == "1": menu_pengeluaran()', variables: { pilihan: '"1"', aksi: 'catat pengeluaran' }, note: 'Mencatat pengeluaran, lalu kembali ke menu.' },
      { line: 5, code: 'pilihan = input(...)', variables: { pilihan: '"3"', aksi: '—' }, note: 'Pengguna memilih menu 3.' },
      { line: 6, code: 'elif pilihan == "3": cek_peringatan()', variables: { pilihan: '"3"', aksi: 'cek status' }, note: 'Status hari ini ditampilkan.' },
      { line: 7, code: 'pilihan = input(...)', variables: { pilihan: '"0"', aksi: '—' }, note: 'Pengguna memilih keluar.' },
      { line: 8, code: 'elif pilihan == "0": break', variables: { pilihan: '"0"', aksi: 'keluar' }, note: 'Loop berhenti, program selesai.' },
    ],
  },
};
