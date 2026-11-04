import { Chapter } from '../../types';

export const TAMPILAN_CHAPTER: Chapter = {
  id: 'bab-tampilan',
  number: 7,
  title: 'Mempercantik Tampilan Program (tampilan.py)',
  subtitle: 'Warna ANSI, kotak, tabel, dan batang kemajuan dengan library bawaan Python',
  description:
    'Bab ini menjelaskan isi tampilan.py dari nol: kenapa tampilan penting, kode warna ANSI, karakter kotak, masalah panjang teks berwarna, batang kemajuan, fungsi kotak dan tabel, membersihkan layar, serta cara memakainya dari file lain. Semua hanya memakai library bawaan Python.',
  learningGoals: [
    'Memahami kenapa tampilan terminal penting untuk demo dan penilaian, serta batasannya: hanya library bawaan Python.',
    'Membaca kode warna ANSI \\033[...m, memakai dictionary WARNA, dan memahami kenapa kode reset \\033[0m wajib ada.',
    'Menggambar garis dan kotak dengan perkalian string, .center(), dan .ljust().',
    'Memahami kenapa len() salah pada teks berwarna dan bagaimana panjang_tampil() menghitung panjang yang terlihat.',
    'Membuat batang kemajuan dengan bar(), memakai kotak() dan tabel, serta membersihkan layar dengan aman.',
    'Memakai tampilan.py dari file lain dengan from tampilan import ... dan mengatasi masalah tampilan di CMD/IDLE.',
  ],
  openingAnalogy:
    'Bayangkan kamu membuat poster untuk demo tugas. Isi programnya sama, tetapi poster yang rapi membuat dosen lebih mudah membaca dan lebih percaya. tampilan.py adalah "mesin poster" itu: ia tidak mengubah logika keuangan, hanya membuat layar lebih enak dibaca.',
  sections: [
    {
      id: 'mengapa-tampilan',
      title: '1. Mengapa Tampilan Penting (dan Batasannya)',
      content: `Program yang benar belum tentu enak dibaca. Saat demo atau penilaian, dosen melihat layar proyektor. Angka tanpa label, teks tanpa jarak, dan menu tanpa bingkai membuat penonton cepat bingung.

**tampilan.py** memperbaiki itu dengan:
- Warna untuk membedakan status (hijau aman, kuning hati-hati, merah boros).
- Kotak dan garis untuk menaikkan keterbacaan.
- Batang kemajuan untuk menunjukkan perbandingan angka.
- Tabel untuk menyusun banyak transaksi.

**Batasan penting:** file ini hanya memakai **library bawaan Python**, yaitu \`os\` dan \`sys\`. File ini **dipakai bersama** oleh laporan.py dan main.py, jadi tidak dimiliki satu orang saja. Tidak ada \`pip install\`, tidak ada library pihak ketiga, dan tidak butuh internet. Ini penting karena laptop teman sekelas mungkin tidak boleh memasang library tambahan.`,
      analogy:
        'Seperti menata meja makan: makanannya sama, tetapi piring, garpu, dan taplak membuat tamu lebih nyaman. Tidak perlu alat mahal, cukup tata letak yang rapi.',
      codeSnippets: [
        {
          id: 'kode-import-tampilan',
          title: 'Hanya dua library bawaan',
          filename: 'tampilan.py',
          code: `import os
import sys

# Supaya warna tampil di Command Prompt Windows 10 ke atas
if os.name == "nt":
    os.system("")

# Pakai UTF-8 supaya karakter kotak dan batang tampil dengan benar
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass`,
          explanation:
            'os dipakai untuk membersihkan layar dan mendeteksi Windows. sys dipakai untuk mendeteksi terminal dan mengatur encoding UTF-8.',
          output: `(Tidak ada output — file ini hanya menyiapkan alat tampilan.)`,
          isSimulated: true,
          lineExplanations: [
            { line: 1, code: 'import os', explanation: 'Dipakai untuk os.name dan os.system().' },
            { line: 2, code: 'import sys', explanation: 'Dipakai untuk sys.stdout dan encoding.' },
            { line: 5, code: 'if os.name == "nt":', explanation: 'Jika Windows, aktifkan pemrosesan warna ANSI.' },
            { line: 9, code: 'sys.stdout.reconfigure(encoding="utf-8")', explanation: 'Memastikan karakter kotak tidak rusak.' },
          ],
        },
      ],
      importantNotes: [
        'Jangan menambahkan library pihak ketiga di file ini.',
        'Karakter kotak dan blok memerlukan encoding UTF-8.',
        'Warna hanya muncul di terminal sungguhan, bukan di IDLE atau file teks.',
      ],
      projectConnection: {
        file: 'tampilan.py',
        note: 'Dipakai oleh laporan.py dan main.py. File ini tidak dijalankan sendiri saat program utama berjalan.',
        code: `from tampilan import warna, kotak, bar, judul_besar`,
      },
    },
    {
      id: 'kode-warna-ansi',
      title: '2. Kode Warna ANSI: \\033[...m',
      content: `Terminal punya cara khusus untuk memberi warna: **ANSI escape code**. Bentuknya:

\`\\033[92mHijau\\033[0m\`

- \`\\033\` adalah karakter ESC (escape).
- \`[\` menandai awal control sequence.
- \`92\` adalah kode warna (hijau terang).
- \`m\` menandai akhir perintah warna.
- \`\\033[0m\` adalah **reset**: mengembalikan warna ke normal.

**Kenapa reset wajib?** Jika tidak direset, warna akan "menempel" ke teks berikutnya. Seluruh layar bisa berubah warna dan tidak bisa kembali normal.

Di \`tampilan.py\`, semua kode warna disimpan dalam dictionary \`WARNA\`:

\`\`\`python
WARNA = {
    "reset": "\\033[0m",
    "tebal": "\\033[1m",
    "merah": "\\033[91m",
    "hijau": "\\033[92m",
    "kuning": "\\033[93m",
    "biru": "\\033[94m",
    "cyan": "\\033[96m",
    "abu": "\\033[90m",
    "putih": "\\033[97m",
}
\`\`\`

Fungsi \`warna(teks, nama, tebal=False)\` mengambil kode dari dictionary, lalu membungkus teks:

\`\`\`python
return kode + teks + WARNA["reset"]
\`\`\`

Jika \`PAKAI_WARNA\` False (misalnya di IDLE), fungsi mengembalikan teks polos tanpa kode.`,
      analogy:
        'Seperti menandai buku dengan stabilo: kode warna adalah stabilo, dan reset adalah menutup stabilo supaya tidak menodai halaman berikutnya.',
      codeSnippets: [
        {
          id: 'kode-contoh-warna',
          title: 'Contoh mini warna',
          code: `print("\\033[92mHijau\\033[0m")`,
          explanation:
            'Di terminal sungguhan, kata "Hijau" tampil hijau. Kode \\033[0m mengembalikan warna ke normal setelahnya.',
          output: `Hijau`,
          isSimulated: true,
        },
        {
          id: 'kode-warna-dictionary',
          title: 'Dictionary WARNA dan fungsi warna()',
          filename: 'tampilan.py',
          code: `import os, sys

WARNA = {
    "reset": "\\033[0m",
    "tebal": "\\033[1m",
    "merah": "\\033[91m",
    "hijau": "\\033[92m",
    "kuning": "\\033[93m",
    "biru": "\\033[94m",
    "cyan": "\\033[96m",
    "abu": "\\033[90m",
    "putih": "\\033[97m",
}

PAKAI_WARNA = sys.stdout.isatty() or os.environ.get("FORCE_COLOR") == "1"

def warna(teks, nama, tebal=False):
    if not PAKAI_WARNA:
        return teks
    kode = WARNA[nama]
    if tebal:
        kode = WARNA["tebal"] + kode
    return kode + teks + WARNA["reset"]`,
          explanation:
            'PAKAI_WARNA bernilai True hanya jika stdout adalah terminal sungguhan. warna() mengambil kode dari WARNA, menambahkan tebal jika diminta, lalu menutup dengan reset.',
          lineExplanations: [
            { line: 1, code: 'WARNA = { ... }', explanation: 'Menyimpan semua kode warna dalam satu dictionary.' },
            { line: 12, code: 'PAKAI_WARNA = sys.stdout.isatty() ...', explanation: 'Menentukan apakah warna boleh dipakai.' },
            { line: 14, code: 'def warna(teks, nama, tebal=False):', explanation: 'Fungsi pembungkus teks berwarna.' },
            { line: 15, code: 'if not PAKAI_WARNA: return teks', explanation: 'Di IDLE, kembalikan teks polos.' },
            { line: 17, code: 'kode = WARNA[nama]', explanation: 'Mengambil kode warna dari dictionary.' },
            { line: 20, code: 'return kode + teks + WARNA["reset"]', explanation: 'Membungkus teks dengan warna dan reset.' },
          ],
        },
      ],
      importantNotes: [
        'Kode warna harus diakhiri reset \\033[0m.',
        'Nama warna di dictionary harus sama persis: "hijau", bukan "Hijau".',
        'Di IDLE, warna tidak muncul. Ini normal, bukan bug.',
        'Gunakan FORCE_COLOR=1 jika ingin memaksa warna di terminal yang mendukung.',
      ],
      commonMistakes: [
        'Lupa reset sehingga warna menempel ke teks berikutnya.',
        'Menulis "Hijau" dengan huruf besar saat memanggil warna(teks, "Hijau") → KeyError.',
        'Mengira kode warna bisa dibaca manusia; di source code memang terlihat seperti \\033[92m.',
      ],
      projectConnection: {
        file: 'laporan.py',
        note: 'warna() dipakai untuk mewarnai status, saldo, dan tabel.',
        code: `warna(format_rupiah(saldo), "hijau", True)`,
      },
    },
    {
      id: 'karakter-kotak',
      title: '3. Karakter Kotak dan Blok: ╔═╗║╚╝, ┌─┐│└┘, █ ░',
      content: `Terminal bisa menampilkan karakter kotak. Karakter ini bukan gambar, tetapi huruf khusus Unicode yang tersedia di font terminal.

**Bingkai ganda:** \`╔ ═ ╗ ║ ╚ ╝\`
**Bingkai tunggal:** \`┌ ─ ┐ │ └ ┘\`
**Garis sambungan:** \`├ ┼ ┤\`
**Blok:** \`█\` (terisi) dan \`░\` (kosong)

**Cara menggambar garis:** kalikan string dengan angka.

\`"─" * 20\` menghasilkan 20 karakter garis.

**Cara menengahkan teks:** \`.center(lebar)\`.
**Cara merata kiri:** \`.ljust(lebar)\`.
**Cara merata kanan:** \`.rjust(lebar)\`.

Contoh:

\`\`\`python
print("Judul".center(20))
print("Kiri".ljust(20) + "|")
print("Kanan".rjust(20) + "|")
\`\`\`

Hasilnya:

\`\`\`
       Judul
Kiri                |
               Kanan|
\`\`\`

Perhatikan bahwa \`.center()\`, \`.ljust()\`, dan \`.rjust()\` menghitung jumlah karakter. Jika teks sudah berwarna, kode ANSI ikut dihitung dan hasilnya salah. Itu alasan \`panjang_tampil()\` dibuat.`,
      analogy:
        'Seperti membuat bingkai foto dengan kertas karton: garis adalah kertas, .center() dan .ljust() adalah penggaris yang menentukan posisi foto.',
      codeSnippets: [
        {
          id: 'kode-garis-kotak',
          title: 'Garis, center, ljust, rjust',
          code: `print("─" * 20)
print("Judul".center(20))
print("Kiri".ljust(20) + "|")
print("Kanan".rjust(20) + "|")`,
          explanation:
            'Perkalian string membuat garis. center/ljust/rjust mengatur posisi teks dalam lebar tertentu.',
          output: `────────────────────\n       Judul       \nKiri                |\n               Kanan|`,
          isSimulated: true,
          lineExplanations: [
            { line: 1, code: 'print("─" * 20)', explanation: 'Mengulang karakter ─ sebanyak 20 kali.' },
            { line: 2, code: 'print("Judul".center(20))', explanation: 'Menengahkan "Judul" dalam lebar 20.' },
            { line: 3, code: 'print("Kiri".ljust(20) + "|")', explanation: 'Merata kiri, lalu tambahkan tanda |.' },
            { line: 4, code: 'print("Kanan".rjust(20) + "|")', explanation: 'Merata kanan, lalu tambahkan tanda |.' },
          ],
        },
        {
          id: 'kode-judul-besar',
          title: 'judul_besar() memakai karakter bingkai ganda',
          filename: 'tampilan.py',
          code: `def judul_besar(judul, subjudul=""):
    dalam = LEBAR - 2
    print(warna("╔" + "═" * dalam + "╗", "cyan"))
    print(warna("║", "cyan") + warna(judul.center(dalam), "putih", True) + warna("║", "cyan"))
    if subjudul != "":
        print(warna("║", "cyan") + warna(subjudul.center(dalam), "abu") + warna("║", "cyan"))
    print(warna("╚" + "═" * dalam + "╝", "cyan"))`,
          explanation:
            'LEBAR = 64, sehingga dalam = 62. judul.center(62) menengahkan judul. Bingkai kiri dan kanan diwarnai cyan.',
          lineExplanations: [
            { line: 2, code: 'dalam = LEBAR - 2', explanation: 'Lebar bagian dalam kotak, dikurangi bingkai kiri dan kanan.' },
            { line: 3, code: 'print(warna("╔" + "═" * dalam + "╗", "cyan"))', explanation: 'Garis atas bingkai ganda.' },
            { line: 4, code: 'judul.center(dalam)', explanation: 'Menengahkan judul di dalam kotak.' },
            { line: 6, code: 'if subjudul != "":', explanation: 'Subjudul opsional.' },
          ],
        },
      ],
      importantNotes: [
        'Karakter kotak memerlukan font yang mendukung Unicode dan encoding UTF-8.',
        'LEBAR = 64 adalah lebar tampilan. Terminal yang lebih sempit akan membuat kotak pecah.',
        'Gunakan .center() untuk judul, .ljust() untuk label kiri, .rjust() untuk angka kanan.',
      ],
      commonMistakes: [
        'Menghitung panjang dengan len() pada teks berwarna; bingkai menjadi lebar.',
        'Menggunakan karakter kotak di terminal lama yang tidak mendukung UTF-8; muncul karakter aneh.',
      ],
      projectConnection: {
        file: 'tampilan.py',
        note: 'judul_besar() dan kotak() memakai karakter bingkai. main.py memanggil judul_besar() di menu.',
        code: `judul_besar("PENCATAT KEUANGAN MAHASISWA", "Catat, pantau, dan hemat uang bulananmu")`,
      },
    },
    {
      id: 'panjang-teks-berwarna',
      title: '4. Masalah Panjang Teks Berwarna: len() vs panjang_tampil()',
      content: `Perhatikan teks berikut:

\`teks = warna("Halo", "hijau")\`

Di layar, yang terlihat hanya **4 karakter**: H, a, l, o. Tetapi \`len(teks)\` bisa menghasilkan **13** karena ikut menghitung kode ANSI \`\\033[92m\` dan \`\\033[0m\`.

Akibatnya, jika kita menambahkan spasi dengan \`teks.ljust(20)\`, spasi yang ditambahkan terlalu sedikit. Bingkai tabel menjadi lebar dan tidak rapi.

**Solusinya: \`panjang_tampil(teks)\`.** Fungsi ini membaca teks huruf per huruf:

1. Jika huruf adalah \`\\033\`, tandai \`dalam_kode = True\`.
2. Selama \`dalam_kode\` True, lewati huruf sampai menemukan \`m\`.
3. Jika bukan bagian kode, tambahkan 1 ke jumlah.

Dengan cara ini, kode warna tidak dihitung.`,
      analogy:
        'Seperti menghitung isi paket: kode warna adalah label di luar barang, tidak ikut ditimbang. panjang_tampil() hanya menimbang barangnya.',
      codeSnippets: [
        {
          id: 'kode-panjang-tampil',
          title: 'panjang_tampil()',
          filename: 'tampilan.py',
          code: `def panjang_tampil(teks):
    jumlah = 0
    dalam_kode = False
    for huruf in teks:
        if huruf == "\\033":
            dalam_kode = True
        elif dalam_kode:
            if huruf == "m":
                dalam_kode = False
        else:
            jumlah += 1
    return jumlah`,
          explanation:
            'Loop per huruf. Saat menemukan ESC, masuk mode kode. Saat menemukan m, keluar mode kode. Huruf di luar mode kode dihitung.',
          lineExplanations: [
            { line: 2, code: 'jumlah = 0', explanation: 'Penghitung karakter terlihat.' },
            { line: 3, code: 'dalam_kode = False', explanation: 'Penanda apakah sedang berada di dalam kode ANSI.' },
            { line: 5, code: 'if huruf == "\\033":', explanation: 'Menemukan awal kode warna.' },
            { line: 8, code: 'if huruf == "m":', explanation: 'Menemukan akhir kode warna.' },
            { line: 11, code: 'jumlah += 1', explanation: 'Menambah hitungan untuk karakter yang terlihat.' },
          ],
        },
        {
          id: 'kode-len-salah',
          title: 'Buktikan len() salah',
          code: `import os
os.environ["FORCE_COLOR"] = "1"  # paksa warna agar kode ANSI ikut dihitung
from tampilan import warna, panjang_tampil

teks = warna("Halo", "hijau")
print(len(teks))
print(panjang_tampil(teks))`,
          explanation:
            'len() menghitung semua karakter termasuk kode ANSI. panjang_tampil() hanya menghitung huruf yang terlihat.',
          output: `13\n4`,
          isSimulated: true,
        },
      ],
      importantNotes: [
        'Jangan memakai len() untuk mengatur lebar teks berwarna.',
        'panjang_tampil() dipakai di baris_tabel() dan kotak() agar tabel tetap rapi.',
        'Kode ANSI selalu berakhir dengan huruf m.',
      ],
      commonMistakes: [
        'Memakai len(teks) lalu .ljust(lebar); tabel melebar.',
        'Lupa bahwa kode warna juga mengandung karakter [ dan angka.',
      ],
      projectConnection: {
        file: 'tampilan.py',
        note: 'baris_tabel() memakai panjang_tampil(sel) untuk menghitung sisa spasi.',
        code: `kosong = lebar_kolom[i] - panjang_tampil(sel)`,
      },
    },
    {
      id: 'fungsi-bar',
      title: '5. Membuat Batang Kemajuan: bar()',
      content: `\`bar(nilai, maksimal, panjang=30, nama=None)\` membuat batang kemajuan dengan karakter \`█\` (terisi) dan \`░\` (kosong).

Langkah kerjanya:
1. Hitung rasio: \`nilai / maksimal\`.
2. Jika maksimal <= 0, rasio = 0.
3. Jika rasio < 0, jadikan 0.
4. Batasi isi maksimal 1: \`if isi > 1: isi = 1\`.
5. Hitung jumlah blok terisi: \`round(isi * panjang)\`.
6. Tentukan warna otomatis:
   - rasio > 1 → merah
   - rasio >= 0.8 → kuning
   - selain itu → hijau
7. Cetak blok terisi berwarna, lalu blok kosong berwarna abu.

\`round()\` dipakai agar jumlah blok bulat. Pembatasan maksimal mencegah batang lebih panjang dari yang diminta.`,
      analogy:
        'Seperti gelas takar: isi gelas dibandingkan dengan kapasitasnya. Jika lebih dari penuh, tanda merah menyala.',
      codeSnippets: [
        {
          id: 'kode-bar',
          title: 'bar()',
          filename: 'tampilan.py',
          code: `def bar(nilai, maksimal, panjang=30, nama=None):
    if maksimal <= 0:
        rasio = 0
    else:
        rasio = nilai / maksimal
    if rasio < 0:
        rasio = 0

    isi = rasio
    if isi > 1:
        isi = 1
    terisi = round(isi * panjang)

    if nama is None:
        if rasio > 1:
            nama = "merah"
        elif rasio >= 0.8:
            nama = "kuning"
        else:
            nama = "hijau"
    return warna("█" * terisi, nama) + warna("░" * (panjang - terisi), "abu")`,
          explanation:
            'Rasio dihitung, dibatasi 0..1, lalu round() menentukan jumlah blok. Warna otomatis dipilih dengan if-elif-else.',
          lineExplanations: [
            { line: 2, code: 'if maksimal <= 0: rasio = 0', explanation: 'Mencegah pembagian dengan nol.' },
            { line: 5, code: 'rasio = nilai / maksimal', explanation: 'Membandingkan nilai dengan kapasitas.' },
            { line: 9, code: 'if isi > 1: isi = 1', explanation: 'Membatasi batang agar tidak lebih panjang.' },
            { line: 11, code: 'terisi = round(isi * panjang)', explanation: 'Membulatkan jumlah blok.' },
            { line: 14, code: 'if rasio > 1: nama = "merah"', explanation: 'Warna merah jika melebihi maksimal.' },
            { line: 16, code: 'elif rasio >= 0.8: nama = "kuning"', explanation: 'Warna kuning jika 80% atau lebih.' },
            { line: 18, code: 'else: nama = "hijau"', explanation: 'Warna hijau untuk sisanya.' },
          ],
        },
      ],
      importantNotes: [
        'Jika nama warna diisi, warna otomatis tidak dipakai.',
        'panjang adalah jumlah karakter batang, bukan jumlah blok terisi.',
        'Gunakan panjang 20 jika terminal sempit; 30–40 jika lebar.',
      ],
      commonMistakes: [
        'Lupa if isi > 1 sehingga batang melebihi panjang.',
        'Memakai int() alih-alih round() sehingga pembulatan kurang rapi.',
        'Membandingkan rasio > 1 padahal isi sudah dibatasi 1; warna merah tidak akan muncul.',
      ],
      projectConnection: {
        file: 'laporan.py',
        note: 'bar() dipakai untuk saldo, pengeluaran hari ini, perjalanan bulan, dan laporan kategori.',
        code: `bar(saldo, anggaran, 34, warna_saldo)\nbar(keluar_hari_ini, jatah, 34)`,
      },
    },
    {
      id: 'fungsi-kotak-tabel',
      title: '6. Fungsi kotak() dan Tabel (garis_tabel, baris_tabel)',
      content: `\`kotak(judul, baris, nama="cyan")\` membuat kotak berjudul. Parameter \`baris\` adalah **list teks**. Setiap teks dihitung dengan \`panjang_tampil()\` agar kode warna tidak merusak lebar.

\`garis_tabel(lebar_kolom, kiri, tengah, kanan)\` membuat garis pembatas. Contoh:
\`garis_tabel([3, 4, 15], "┌", "┬", "┐")\`

\`baris_tabel(isi, lebar_kolom, rata)\` membuat satu baris tabel. Parameter \`rata\` berisi "kiri" atau "kanan" untuk setiap kolom. Jika "kanan", spasi ditambahkan di kiri; jika "kiri", spasi ditambahkan di kanan.`,
      analogy:
        'Seperti membuat tabel di Excel: lebar kolom, garis pembatas, dan perataan teks kiri/kanan.',
      codeSnippets: [
        {
          id: 'kode-kotak',
          title: 'kotak()',
          filename: 'tampilan.py',
          code: `def kotak(judul, baris, nama="cyan"):
    dalam = LEBAR - 2
    print(warna("┌─ ", nama) + warna(judul, nama, True) + warna(" " + "─" * (dalam - len(judul) - 3) + "┐", nama))
    for isi in baris:
        isi = " " + isi
        isi = isi + " " * (dalam - panjang_tampil(isi))
        print(warna("│", nama) + isi + warna("│", nama))
    print(warna("└" + "─" * dalam + "┘", nama))`,
          explanation:
            'Garis atas memakai len(judul) karena judul diasumsikan polos. Isi kotak memakai panjang_tampil() karena boleh berwarna.',
          lineExplanations: [
            { line: 2, code: 'dalam = LEBAR - 2', explanation: 'Lebar bagian dalam kotak.' },
            { line: 3, code: 'print(warna("┌─ ", nama) + ...)', explanation: 'Garis atas dengan judul.' },
            { line: 5, code: 'for isi in baris:', explanation: 'Mengulang setiap baris isi.' },
            { line: 7, code: 'isi + " " * (dalam - panjang_tampil(isi))', explanation: 'Menambahkan spasi sesuai panjang terlihat.' },
          ],
        },
        {
          id: 'kode-tabel',
          title: 'garis_tabel() dan baris_tabel()',
          filename: 'tampilan.py',
          code: `def garis_tabel(lebar_kolom, kiri, tengah, kanan):
    bagian = []
    for lebar in lebar_kolom:
        bagian.append("─" * (lebar + 2))
    print(warna(kiri + tengah.join(bagian) + kanan, "abu"))

def baris_tabel(isi, lebar_kolom, rata):
    teks = warna("│", "abu")
    for i in range(len(isi)):
        sel = isi[i]
        kosong = lebar_kolom[i] - panjang_tampil(sel)
        if kosong < 0:
            kosong = 0
        if rata[i] == "kanan":
            sel = " " * kosong + sel
        else:
            sel = sel + " " * kosong
        teks += " " + sel + " " + warna("│", "abu")
    print(teks)`,
          explanation:
            'garis_tabel membuat bagian "───" untuk setiap kolom. baris_tabel menghitung sisa spasi dengan panjang_tampil, lalu merata kiri/kanan.',
          lineExplanations: [
            { line: 3, code: 'bagian.append("─" * (lebar + 2))', explanation: 'Garis untuk satu kolom, ditambah spasi kiri dan kanan.' },
            { line: 5, code: 'print(warna(kiri + tengah.join(bagian) + kanan, "abu"))', explanation: 'Mencetak garis pembatas berwarna abu.' },
            { line: 10, code: 'kosong = lebar_kolom[i] - panjang_tampil(sel)', explanation: 'Menghitung sisa lebar kolom.' },
            { line: 13, code: 'if rata[i] == "kanan":', explanation: 'Jika rata kanan, spasi di kiri.' },
            { line: 16, code: 'teks += " " + sel + " " + warna("│", "abu")', explanation: 'Menambahkan sel dan pembatas kanan.' },
          ],
        },
      ],
      importantNotes: [
        'kotak() menerima list teks, bukan satu string.',
        'garis_tabel() menerima list lebar kolom dan karakter kiri/tengah/kanan.',
        'baris_tabel() menerima list isi, list lebar, dan list rata.',
        'Jika isi lebih panjang dari lebar kolom, tabel bisa melebar. Potong teks dengan [:15] jika perlu.',
      ],
      commonMistakes: [
        'Memanggil kotak("Judul", "satu baris") dengan string; loop akan menghitung huruf, bukan baris.',
        'Lupa panjang_tampil() sehingga tabel berantakan saat isi berwarna.',
        'Jumlah rata tidak sama dengan jumlah kolom; IndexError.',
      ],
      projectConnection: {
        file: 'laporan.py',
        note: 'kotak() dipakai untuk ringkasan dan status; garis_tabel() dan baris_tabel() dipakai di tampil_riwayat().',
        code: `kotak("RINGKASAN", [baris_nilai("Saldo sekarang", format_rupiah(saldo))])\ngaris_tabel(lebar, "┌", "┬", "┐")\nbaris_tabel([str(nomor), str(hari), kategori[:15], masuk, keluar], lebar, rata)`,
      },
    },
    {
      id: 'membersihkan-layar',
      title: '7. Membersihkan Layar dan isatty()',
      content: `\`bersihkan_layar()\` memanggil \`os.system("cls")\` di Windows atau \`os.system("clear")\` di Mac/Linux. Ini membersihkan layar sebelum menu baru tampil.

**Tetapi ada pengaman:**

\`\`\`python
if sys.stdout.isatty():
    os.system("cls" if os.name == "nt" else "clear")
\`\`\`

\`sys.stdout.isatty()\` mengembalikan True hanya jika stdout terhubung ke terminal sungguhan. Di IDLE, PyCharm, atau saat output disimpan ke file, nilainya False. Dengan begitu, program tidak mencoba membersihkan layar yang bukan terminal.

Alasan lain: di IDLE, warna ANSI tidak dirender. \`PAKAI_WARNA\` juga memakai isatty() agar teks tetap polos dan tidak muncul kode aneh.`,
      analogy:
        'Seperti menghapus papan tulis sebelum menulis menu baru. Tetapi penghapus hanya dipakai jika papan tulisnya sungguhan, bukan layar proyektor yang sedang merekam.',
      codeSnippets: [
        {
          id: 'kode-bersihkan-layar',
          title: 'bersihkan_layar()',
          filename: 'tampilan.py',
          code: `def bersihkan_layar():
    if sys.stdout.isatty():
        os.system("cls" if os.name == "nt" else "clear")`,
          explanation:
            'Hanya membersihkan layar jika stdout adalah terminal sungguhan. Di IDLE, fungsi tidak melakukan apa-apa.',
          lineExplanations: [
            { line: 2, code: 'if sys.stdout.isatty():', explanation: 'Memastikan output terhubung ke terminal sungguhan.' },
            { line: 3, code: 'os.system("cls" if os.name == "nt" else "clear")', explanation: 'Memilih perintah sesuai sistem operasi.' },
          ],
        },
      ],
      importantNotes: [
        'Jangan memanggil os.system("clear") tanpa isatty() jika program bisa dijalankan di IDLE.',
        'Di Windows, os.system("") di bagian atas file mengaktifkan pemrosesan ANSI.',
        'Jika layar tidak bersih, periksa apakah program dijalankan di terminal sungguhan.',
      ],
      commonMistakes: [
        'Memakai os.system("clear") di Windows; tidak terjadi apa-apa.',
        'Menghapus layar di tengah proses tanpa memberi jeda; hasil bisa terlewat.',
      ],
      projectConnection: {
        file: 'main.py',
        note: 'main.py memanggil bersihkan_layar() di awal menu dan sebelum menampilkan laporan.',
        code: `bersihkan_layar()\njudul_besar("PENCATAT KEUANGAN MAHASISWA", "Selamat datang!")`,
      },
    },
    {
      id: 'cara-memakai',
      title: '8. Cara Memakai dari File Lain: from tampilan import ...',
      content: `Di \`laporan.py\`:

\`\`\`python
from tampilan import (warna, kotak, bar, persen, baris_nilai, judul_bagian,
                      pesan_error, pesan_info, garis_tabel, baris_tabel)
\`\`\`

Di \`main.py\`:

\`\`\`python
from tampilan import (warna, bersihkan_layar, judul_besar, judul_bagian, kotak, bar,
                      pesan_ok, pesan_error, pesan_info, tunggu)
\`\`\`

Setelah diimpor, fungsi bisa dipanggil langsung tanpa awalan \`tampilan.\`. Contoh:

\`\`\`python
kotak("RINGKASAN", [baris_nilai("Saldo", format_rupiah(saldo), "hijau")])
\`\`\`

**Sebelum dan sesudah:**

Sebelum (teks polos):
\`\`\`
RINGKASAN
Saldo: Rp2.985.000
Jatah: Rp100.000
\`\`\`

Sesudah (dengan kotak dan warna):
\`\`\`
┌─ RINGKASAN ──────────────────────────────────────────────────┐
│ Saldo sekarang        Rp2.985.000                            │
│   ██████████████████████████████████ 100% dari anggaran        │
└──────────────────────────────────────────────────────────────┘
\`\`\`

Pratinjau interaktif di bawah memakai HTML/CSS untuk meniru tampilan terminal, karena Python tidak berjalan di browser. Kamu bisa mengubah warna dan lebar untuk melihat hasilnya.`,
      analogy:
        'Seperti memakai template presentasi: sekali dibuat, semua slide memakai tata letak yang sama. Cukup ganti isinya.',
      codeSnippets: [
        {
          id: 'kode-pakai-tampilan',
          title: 'Memakai tampilan.py dari laporan.py',
          filename: 'laporan.py',
          code: `from tampilan import warna, kotak, bar, persen, baris_nilai, judul_bagian

kotak("RINGKASAN", [
    baris_nilai("Saldo sekarang", "Rp2.985.000", "hijau"),
    "  " + bar(2985000, 3000000, 34, "hijau") + " 100% dari anggaran",
])`,
          explanation:
            'Import membawa fungsi ke laporan.py. kotak() dan bar() dipanggil langsung. Perhatikan bahwa baris di atas memakai nama fungsi yang benar: baris_nilai, bukan baris_nilai.',
          output: `┌─ RINGKASAN ──────────────────────────────────────────────────┐\n│ Saldo sekarang        Rp2.985.000                            │\n│   ██████████████████████████████████ 100% dari anggaran        │\n└──────────────────────────────────────────────────────────────┘`,
          isSimulated: true,
        },
      ],
      importantNotes: [
        'tampilan.py harus berada di folder yang sama dengan laporan.py dan main.py.',
        'from tampilan import ... memungkinkan memanggil fungsi tanpa awalan tampilan.',
        'Jika ada salah ketik nama fungsi, muncul ImportError.',
      ],
      commonMistakes: [
        'Menulis from tampilan import warna, kotak, bar, persen, baris_nilai (spasi) → SyntaxError.',
        'Lupa menyimpan tampilan.py di folder yang sama → ModuleNotFoundError.',
      ],
      projectConnection: {
        file: 'laporan.py',
        note: 'laporan.py memakai warna, kotak, bar, persen, baris_nilai, judul_bagian, pesan_error, pesan_info, garis_tabel, baris_tabel.',
        code: `from tampilan import (warna, kotak, bar, persen, baris_nilai, judul_bagian,\n                      pesan_error, pesan_info, garis_tabel, baris_tabel)`,
      },
      terminalPreview: true,
    },
    {
      id: 'latihan-tampilan',
      title: '9. Latihan: Ganti Warna, Buat Kotak, Ubah Lebar Bar',
      content: `Tiga latihan berikut melatih fungsi utama tampilan.py. Coba dulu tanpa melihat kunci jawaban, lalu buka kunci jika sudah menulis kode sendiri.

1. **Ganti warna judul.** Ubah \`judul_besar("PENCATAT KEUANGAN MAHASISWA")\` agar judul berwarna kuning atau hijau. Petunjuk: fungsi \`judul_besar()\` memakai warna "putih" untuk judul. Kamu bisa mengganti bagian \`warna(judul.center(dalam), "putih", True)\` menjadi "kuning" atau "hijau".
2. **Buat kotak dengan judul sendiri.** Panggil \`kotak("PENGELUARAN", ["Makan Rp15.000", "Transport Rp40.000"])\`. Perhatikan bahwa isi kotak harus berupa list.
3. **Ubah lebar bar jadi 20.** Panggil \`bar(85000, 100000, 20)\`. Bandingkan dengan \`bar(85000, 100000, 40)\`.`,
      analogy:
        'Seperti mengganti warna poster dan ukuran papan: isinya sama, tetapi tampilannya menyesuaikan ruang.',
      codeSnippets: [
        {
          id: 'kode-latihan-tampilan',
          title: 'Contoh sebelum latihan',
          code: `from tampilan import kotak, bar

kotak("PENGELUARAN", ["Makan Rp15.000", "Transport Rp40.000"])
print(bar(85000, 100000, 20))`,
          explanation:
            'kotak() menerima list teks. bar() menerima nilai, maksimal, dan panjang. Coba ubah angka dan panjang untuk melihat hasilnya.',
          output: `┌─ PENGELUARAN ────────────────────────────────────────────────┐\n│ Makan Rp15.000                                               │\n│ Transport Rp40.000                                           │\n└──────────────────────────────────────────────────────────────┘\n█████████████████░░░`,
          isSimulated: true,
        },
      ],
      importantNotes: [
        'Isi kotak harus list, bukan string.',
        'panjang bar menentukan jumlah karakter █ dan ░.',
        'Warna otomatis bar berubah menjadi kuning/merah jika rasio tinggi.',
      ],
      projectConnection: {
        file: 'tampilan.py',
        note: 'Latihan ini memakai kotak() dan bar() yang sama seperti di laporan.py dan main.py.',
      },
    },
    {
      id: 'troubleshooting-tampilan',
      title: '10. Troubleshooting: Warna Aneh, Kotak Rusak, Layar Sempit',
      content: `**1. Warna muncul sebagai kode aneh di CMD lama.**
Command Prompt lama mungkin belum mengaktifkan pemrosesan ANSI. Solusi: Windows 10 ke atas, jalankan \`os.system("")\` di awal file (sudah ada di tampilan.py), atau gunakan Windows Terminal. Jika masih aneh, jalankan program di VS Code terminal.

**2. Karakter kotak rusak (╔ menjadi ? atau â).**
Penyebabnya encoding bukan UTF-8. Solusi: \`sys.stdout.reconfigure(encoding="utf-8")\` (sudah ada di tampilan.py). Pastikan editor menyimpan file sebagai UTF-8. Di Windows, terminal modern mendukung UTF-8.

**3. Tampilan berantakan karena terminal terlalu sempit.**
\`LEBAR = 64\`. Jika lebar terminal kurang dari 64 kolom, kotak akan pecah. Solusi: perbesar jendela terminal, kecilkan font, atau kurangi LEBAR menjadi 50. Jangan mengubah LEBAR tanpa mengubah fungsi yang memakainya.

**4. Tidak ada warna di IDLE.**
Ini normal. \`sys.stdout.isatty()\` bernilai False di IDLE, sehingga \`PAKAI_WARNA\` False dan \`warna()\` mengembalikan teks polos. Solusi: jalankan lewat terminal (python main.py), bukan lewat Run di IDLE.`,
      analogy:
        'Seperti menyetel radio: kalau frekuensi tidak pas, suara jadi aneh. Perlu disetel ke UTF-8 dan terminal yang mendukung warna.',
      codeSnippets: [
        {
          id: 'kode-troubleshooting',
          title: 'Pemeriksaan cepat',
          code: `import sys
print("isatty:", sys.stdout.isatty())
print("encoding:", sys.stdout.encoding)
print("os.name:", __import__("os").name)`,
          explanation:
            'Jalankan potongan ini untuk melihat apakah stdout adalah terminal dan encoding apa yang dipakai.',
          output: `isatty: True\nencoding: utf-8\nos.name: nt`,
          isSimulated: true,
        },
      ],
      importantNotes: [
        'Minimal lebar terminal 64 kolom agar kotak tidak pecah.',
        'Jika warna tidak muncul, periksa isatty() dan FORCE_COLOR.',
        'Jangan mengubah logika keuangan hanya untuk memperbaiki tampilan.',
      ],
      commonMistakes: [
        'Mengubah LEBAR menjadi 100 tanpa menyesuaikan terminal; kotak tetap pecah.',
        'Menghapus sys.stdout.reconfigure(encoding="utf-8") karena mengira tidak penting.',
      ],
      projectConnection: {
        file: 'tampilan.py',
        note: 'Bagian atas tampilan.py sudah menyiapkan UTF-8 dan ANSI untuk Windows.',
        code: `if os.name == "nt":\n    os.system("")\ntry:\n    sys.stdout.reconfigure(encoding="utf-8")\nexcept Exception:\n    pass`,
      },
    },
  ],
  cheatSheet: {
    title: 'Cheat Sheet Bab 7 — tampilan.py',
    items: [
      'tampilan.py hanya memakai os dan sys (library bawaan).',
      'Warna ANSI: \\033[92m teks \\033[0m. Reset wajib agar warna tidak menempel.',
      'WARNA dictionary menyimpan kode warna; warna(teks, nama, tebal=False) membungkus teks.',
      'PAKAI_WARNA = sys.stdout.isatty() atau FORCE_COLOR=1. Di IDLE, warna polos.',
      'Karakter kotak: ╔═╗║╚╝ dan ┌─┐│└┘. Blok: █ ░.',
      '"─" * 20 membuat garis. .center() menengahkan, .ljust() merata kiri, .rjust() merata kanan.',
      'len() salah pada teks berwarna; pakai panjang_tampil() yang melewati kode ANSI.',
      'bar(nilai, maksimal, panjang=30, nama=None): rasio, round, clamp 0..1, warna otomatis.',
      'kotak(judul, baris, nama) menerima list teks. garis_tabel() dan baris_tabel() membuat tabel.',
      'bersihkan_layar() hanya jalan jika isatty() True. LEBAR = 64.',
      'from tampilan import ... dipakai di laporan.py dan main.py.',
    ],
    code: `from tampilan import warna, kotak, bar\nkotak("STATUS", [baris_nilai("Saldo", "Rp2.985.000", "hijau")])\nprint(bar(85000, 100000, 20))`,
  },
  commonError: {
    name: "KeyError: 'Hijau'",
    message: "KeyError: 'Hijau'",
    cause:
      'Nama warna di dictionary WARNA ditulis huruf kecil semua ("hijau"), tetapi pemanggilan memakai "Hijau" dengan huruf besar.',
    fix:
      'Gunakan nama warna yang sama persis dengan key di WARNA: "hijau", "merah", "kuning", "cyan", "abu", "putih", "biru".',
    badCode: `print(warna("Halo", "Hijau"))`,
    goodCode: `print(warna("Halo", "hijau"))`,
  },
  tryItYourself: [
    {
      id: 'tampilan-coba-1',
      level: 'Mudah',
      prompt: 'Ganti warna judul "PENCATAT KEUANGAN" menjadi kuning. Gunakan fungsi warna().',
      starterCode: `from tampilan import warna\njudul = "PENCATAT KEUANGAN"\n# cetak dengan warna kuning`,
      answerCode: `from tampilan import warna\njudul = "PENCATAT KEUANGAN"\nprint(warna(judul, "kuning", True))`,
      explanation:
        'warna(teks, "kuning", True) membungkus judul dengan kode kuning dan tebal, lalu reset.',
    },
    {
      id: 'tampilan-coba-2',
      level: 'Sedang',
      prompt: 'Buat kotak dengan judul "PENGELUARAN" dan isi dua baris: "Makan Rp15.000" dan "Transport Rp40.000".',
      starterCode: `from tampilan import kotak\n# panggil kotak dengan list isi`,
      answerCode: `from tampilan import kotak\nkotak("PENGELUARAN", ["Makan Rp15.000", "Transport Rp40.000"])`,
      explanation:
        'kotak() menerima judul dan list teks. Setiap teks dihitung dengan panjang_tampil() agar kotak rapi.',
    },
    {
      id: 'tampilan-coba-3',
      level: 'Tantangan',
      prompt: 'Ubah lebar bar menjadi 20 dan tampilkan bar untuk 85000 dari 100000. Bandingkan dengan panjang 40.',
      starterCode: `from tampilan import bar\nprint(bar(85000, 100000, 20))\nprint(bar(85000, 100000, 40))`,
      answerCode: `from tampilan import bar\nprint(bar(85000, 100000, 20))\nprint(bar(85000, 100000, 40))`,
      explanation:
        'panjang menentukan jumlah karakter. Semakin besar panjang, semakin halus perbandingan. Warna otomatis kuning karena rasio 0.85.',
    },
  ],
  fixTheBug: {
    id: 'tampilan-fix-1',
    title: 'Perbaiki: panjang_tampil() memakai len()',
    prompt:
      'Fungsi ini memakai len() sehingga kode warna ikut dihitung. Perbaiki agar hanya menghitung karakter yang terlihat.',
    buggyCode: `def panjang_tampil(teks):\n    return len(teks)`,
    answerCode: `def panjang_tampil(teks):\n    jumlah = 0\n    dalam_kode = False\n    for huruf in teks:\n        if huruf == "\\033":\n            dalam_kode = True\n        elif dalam_kode:\n            if huruf == "m":\n                dalam_kode = False\n        else:\n            jumlah += 1\n    return jumlah`,
    explanation:
      'Loop per huruf dan lewati kode ANSI. Dengan begitu, teks berwarna "Halo" dihitung 4, bukan 13.',
  },
  quiz: [
    {
      id: 'q-tampilan-1',
      question: 'Apa fungsi dari \\033[0m dalam kode warna ANSI?',
      options: [
        'Menghapus seluruh layar',
        'Mengembalikan warna ke normal (reset)',
        'Membuat teks menjadi tebal',
        'Mengubah teks menjadi angka',
      ],
      correctIndex: 1,
      explanation:
        '\\033[0m adalah kode reset. Tanpa reset, warna akan menempel ke teks berikutnya.',
    },
    {
      id: 'q-tampilan-2',
      question: 'Mengapa len() tidak cocok untuk mengatur lebar teks berwarna?',
      options: [
        'Karena len() hanya bisa dipakai pada angka',
        'Karena kode ANSI ikut dihitung sebagai karakter, padahal tidak terlihat',
        'Karena teks berwarna tidak punya panjang',
        'Karena len() selalu menghasilkan 0',
      ],
      correctIndex: 1,
      explanation:
        'len() menghitung semua karakter termasuk kode ANSI. panjang_tampil() melewati kode tersebut.',
    },
    {
      id: 'q-tampilan-3',
      question: 'Apa hasil dari "─" * 5?',
      options: ['─', '─────', '5', 'Error'],
      correctIndex: 1,
      explanation:
        'Perkalian string mengulang karakter sebanyak 5 kali, sehingga hasilnya ─────.',
    },
    {
      id: 'q-tampilan-4',
      question: 'Kapan warna ANSI tidak muncul di IDLE?',
      options: [
        'Karena IDLE tidak punya Python',
        'Karena sys.stdout.isatty() bernilai False, sehingga PAKAI_WARNA False',
        'Karena warna hanya bisa dipakai di Linux',
        'Karena file harus bernama warna.py',
      ],
      correctIndex: 1,
      explanation:
        'Di IDLE, stdout bukan terminal sungguhan. isatty() False membuat warna() mengembalikan teks polos.',
    },
    {
      id: 'q-tampilan-5',
      question: 'Fungsi apa yang dipakai untuk membuat tabel di tampilan.py?',
      options: [
        'kotak() dan warna()',
        'garis_tabel() dan baris_tabel()',
        'bar() dan persen()',
        'judul_besar() dan judul_bagian()',
      ],
      correctIndex: 1,
      explanation:
        'garis_tabel() membuat garis pembatas, baris_tabel() membuat isi baris. Keduanya dipakai di tampil_riwayat().',
    },
  ],
  summaryPoints: [
    'tampilan.py hanya memakai library bawaan os dan sys, jadi aman dipakai di laptop mana pun.',
    'Warna ANSI memakai pola \\033[kode m dan wajib diakhiri reset \\033[0m.',
    'panjang_tampil() menghitung karakter yang terlihat dengan melewati kode ANSI; len() tidak bisa dipakai untuk teks berwarna.',
    'bar() membuat batang kemajuan dengan rasio, round(), pembatasan 0..1, dan warna otomatis if-elif-else.',
    'kotak() dan tabel (garis_tabel, baris_tabel) membuat tampilan rapi; isi kotak harus berupa list teks.',
    'bersihkan_layar() memakai isatty() sebagai pengaman; di IDLE warna tidak muncul dan layar tidak dibersihkan.',
  ],
  traceTable: {
    title: 'Tabel jejak: panjang_tampil("\\033[92mHalo\\033[0m")',
    description:
      'Perhatikan bagaimana fungsi melewati kode ANSI dan hanya menghitung H, a, l, o.',
    steps: [
      { line: 1, code: 'jumlah = 0, dalam_kode = False', variables: { jumlah: '0', dalam_kode: 'False' }, note: 'Mulai menghitung.' },
      { line: 2, code: 'huruf = \\033', variables: { jumlah: '0', dalam_kode: 'True' }, note: 'Awal kode warna. Jangan dihitung.' },
      { line: 3, code: 'huruf = [', variables: { jumlah: '0', dalam_kode: 'True' }, note: 'Masih di dalam kode.' },
      { line: 4, code: 'huruf = 9, 2', variables: { jumlah: '0', dalam_kode: 'True' }, note: 'Angka kode warna, dilewati.' },
      { line: 5, code: 'huruf = m', variables: { jumlah: '0', dalam_kode: 'False' }, note: 'Akhir kode warna. Kode selesai.' },
      { line: 6, code: 'huruf = H', variables: { jumlah: '1', dalam_kode: 'False' }, note: 'Karakter terlihat pertama.' },
      { line: 7, code: 'huruf = a, l, o', variables: { jumlah: '4', dalam_kode: 'False' }, note: 'Tiga karakter lagi. Total 4.' },
      { line: 8, code: 'huruf = \\033 ... m', variables: { jumlah: '4', dalam_kode: 'False' }, note: 'Kode reset juga dilewati. Hasil akhir 4.' },
    ],
  },
  prevChapterId: 'bab-6',
  nextChapterId: 'bab-7',
};
