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
          code: `# laporan.py
# Peringatan, laporan, dan pengecekan input / eksepsi (Orang 2)

from pencatat import akun, transaksi, format_rupiah, hitung_saldo, pengeluaran_hari
from tampilan import (warna, kotak, bar, persen, baris_nilai, judul_bagian,
                      pesan_error, pesan_info, garis_tabel, baris_tabel)`,
          output: `(Tidak ada output — file ini hanya berisi import. Kode lengkapnya bisa dijalankan lewat main.py.)`,
          isSimulated: true,
          explanation:
            'laporan.py memakai data dari pencatat.py dan alat tampilan dari tampilan.py. Keduanya harus berada di folder yang sama.',
          lineExplanations: [
            { line: 4, code: 'from pencatat import akun, transaksi, format_rupiah, hitung_saldo, pengeluaran_hari', explanation: 'Mengambil data dan fungsi dari pencatat.py.' },
            { line: 5, code: 'from tampilan import (warna, kotak, bar, persen, baris_nilai, judul_bagian,', explanation: 'Mengambil fungsi warna, kotak, bar, dan tabel dari tampilan.py.' },
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
    """Minta input angka positif. Kalau salah, ulangi terus (pakai try-except)."""
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
            { line: 3, code: 'while True:', explanation: 'Ulangi terus sampai pengguna memasukkan angka yang benar.' },
            { line: 5, code: 'teks = input(pesan).replace(".", "").replace(",", "").strip()', explanation: 'Membaca input dan membersihkan titik/koma pemisah ribuan.' },
            { line: 6, code: 'angka = int(teks)', explanation: 'Mengubah teks menjadi bilangan bulat.' },
            { line: 7, code: 'if angka <= 0:', explanation: 'Menolak nol dan angka negatif dengan raise ValueError("harus lebih dari 0").' },
            { line: 10, code: 'except ValueError:', explanation: 'Menangkap ValueError, lalu mencetak pesan dan mengulang.' },
          ],
        },
        {
          id: 'kode-baca-pilihan',
          title: 'baca_pilihan()',
          filename: 'laporan.py',
          code: `def baca_pilihan(pesan, maksimal):
    """Minta pilihan nomor dari 1 sampai maksimal."""
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
            { line: 5, code: 'nomor = int(input(pesan))', explanation: 'Membaca pilihan dan mengubahnya menjadi int.' },
            { line: 6, code: 'if nomor < 1 or nomor > maksimal:', explanation: 'Memeriksa apakah nomor di luar rentang.' },
            { line: 7, code: 'raise ValueError("di luar rentang")', explanation: 'Memicu error sendiri agar ditangkap except.' },
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
          code: `def cek_peringatan():
    """Tampilkan status hari ini dan peringatan kalau boros."""
    saldo = hitung_saldo()
    hari = akun["hari"]
    jatah = akun["jatah_harian"]
    anggaran = akun["uang_saku"]
    keluar_hari_ini = pengeluaran_hari(hari)
    sisa_hari = akun["jumlah_hari"] - hari + 1

    judul_bagian("STATUS HARI KE-" + str(hari) + " DARI " + str(akun["jumlah_hari"]))

    # Percabangan: cek boros, hati-hati, atau aman
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

    # Warna saldo mengikuti sisa uang dibanding anggaran
    if saldo <= 0.2 * anggaran:
        warna_saldo = "merah"
    elif saldo <= 0.5 * anggaran:
        warna_saldo = "kuning"
    else:
        warna_saldo = "hijau"

    kotak("RINGKASAN", [
        baris_nilai("Saldo sekarang", format_rupiah(saldo), warna_saldo),
        "  " + bar(saldo, anggaran, 34, warna_saldo) + " " + str(persen(saldo, anggaran)) + "% dari anggaran",
        "",
        baris_nilai("Jatah harian", format_rupiah(jatah)),
        baris_nilai("Pengeluaran hari ini", format_rupiah(keluar_hari_ini), warna_status),
        "  " + bar(keluar_hari_ini, jatah, 34) + " " + str(persen(keluar_hari_ini, jatah)) + "% dari jatah",
    ])

    kotak(judul_status, [isi_status], warna_status)

    if saldo < 0:
        kotak("SALDO MINUS", ["Segera kurangi pengeluaran."], "merah")
    elif saldo <= 0.2 * anggaran:
        kotak("SALDO MENIPIS", ["Saldo tinggal sedikit (kurang dari 20% anggaran)."], "kuning")

    if sisa_hari > 0 and saldo > 0:
        print()
        pesan_info("Biar cukup sampai akhir bulan, maksimal pengeluaran "
                   + warna(format_rupiah(saldo / sisa_hari), "kuning", True) + " per hari.")`,
          output: `── STATUS HARI KE-1 DARI 30 ────────────────────────────────────
┌─ RINGKASAN ──────────────────────────────────────────────────┐
│ Saldo sekarang        Rp2.915.000                            │
│   █████████████████████████████████░ 97% dari anggaran       │
│                                                              │
│ Jatah harian          Rp100.000                              │
│ Pengeluaran hari ini  Rp85.000                               │
│   █████████████████████████████░░░░░ 85% dari jatah          │
└──────────────────────────────────────────────────────────────┘
┌─ HATI-HATI ──────────────────────────────────────────────────┐
│ Pengeluaran hari ini hampir habis jatah.                     │
└──────────────────────────────────────────────────────────────┘

  [i] Biar cukup sampai akhir bulan, maksimal pengeluaran Rp97.167 per hari.`,
          explanation: 'Python memeriksa percabangan dari atas: hanya satu status yang dipakai. Status (BOROS!/HATI-HATI/AMAN) diambil dari perbandingan pengeluaran hari ini dengan jatah harian, sedangkan warna saldo diambil dari perbandingan saldo dengan anggaran sebulan.',
          isSimulated: true,
          lineExplanations: [
            { line: 3, code: 'saldo = hitung_saldo()', explanation: 'Saldo dihitung ulang dari seluruh transaksi lewat hitung_saldo() di pencatat.py.' },
            { line: 7, code: 'keluar_hari_ini = pengeluaran_hari(hari)', explanation: 'Total pengeluaran hari ini diambil dari pengeluaran_hari(hari) di pencatat.py.' },
            { line: 8, code: 'sisa_hari = akun["jumlah_hari"] - hari + 1', explanation: 'Sisa hari (termasuk hari ini) dipakai untuk menghitung saran pengeluaran per hari.' },
            { line: 13, code: 'if keluar_hari_ini > jatah:', explanation: 'Kondisi boros: pengeluaran melebihi jatah harian.' },
            { line: 17, code: 'elif keluar_hari_ini >= 0.8 * jatah:', explanation: 'Kondisi hati-hati: sudah 80% jatah atau lebih, tetapi belum melewati jatah.' },
            { line: 21, code: 'else:', explanation: 'Jalur aman jika dua kondisi di atas salah.' },
            { line: 27, code: 'if saldo <= 0.2 * anggaran:', explanation: 'Warna saldo jadi merah kalau saldo tinggal 20% anggaran atau kurang.' },
            { line: 34, code: 'kotak("RINGKASAN", [', explanation: 'Kotak RINGKASAN berisi saldo, batang saldo, jatah harian, dan pengeluaran hari ini.' },
            { line: 36, code: '"  " + bar(saldo, anggaran, 34, warna_saldo) + " " + str(persen(saldo, anggaran)) + "% dari anggaran",', explanation: 'Batang kemajuan saldo memakai bar() sepanjang 34 karakter; persen(saldo, anggaran) memberi angka persennya.' },
            { line: 45, code: 'if saldo < 0:', explanation: 'Kalau saldo minus, muncul kotak tambahan SALDO MINUS.' },
            { line: 52, code: 'pesan_info("Biar cukup sampai akhir bulan, maksimal pengeluaran "', explanation: 'Saran pengeluaran per hari = saldo dibagi sisa hari.' },
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
          code: `def tampil_riwayat():
    """Tampilkan semua transaksi dalam bentuk tabel."""
    judul_bagian("RIWAYAT TRANSAKSI")
    if len(transaksi) == 0:
        pesan_info("Belum ada transaksi.")
        return

    lebar = [3, 4, 15, 13, 13]
    rata = ["kanan", "kanan", "kiri", "kanan", "kanan"]

    garis_tabel(lebar, "┌", "┬", "┐")
    baris_tabel([warna("No", "cyan", True), warna("Hari", "cyan", True),
                 warna("Keterangan", "cyan", True), warna("Masuk", "cyan", True),
                 warna("Keluar", "cyan", True)], lebar, rata)
    garis_tabel(lebar, "├", "┼", "┤")

    nomor = 1
    total_masuk = 0
    total_keluar = 0
    for hari, jenis, kategori, jumlah in transaksi:
        if jenis == "masuk":
            masuk = warna(format_rupiah(jumlah), "hijau")
            keluar = warna("-", "abu")
            total_masuk += jumlah
        else:
            masuk = warna("-", "abu")
            keluar = warna(format_rupiah(jumlah), "merah")
            total_keluar += jumlah
        baris_tabel([str(nomor), str(hari), kategori[:15], masuk, keluar], lebar, rata)
        nomor += 1

    garis_tabel(lebar, "├", "┼", "┤")
    baris_tabel(["", "", warna("TOTAL", "putih", True),
                 warna(format_rupiah(total_masuk), "hijau", True),
                 warna(format_rupiah(total_keluar), "merah", True)], lebar, rata)
    garis_tabel(lebar, "└", "┴", "┘")`,
          output: `── RIWAYAT TRANSAKSI ───────────────────────────────────────────
          isSimulated: true,
┌─────┬──────┬─────────────────┬───────────────┬───────────────┐
│  No │ Hari │ Keterangan      │         Masuk │        Keluar │
├─────┼──────┼─────────────────┼───────────────┼───────────────┤
│   1 │    1 │ Anggaran        │   Rp3.000.000 │             - │
│   2 │    1 │ Makan           │             - │      Rp85.000 │
│   3 │    1 │ Transport       │             - │      Rp40.000 │
├─────┼──────┼─────────────────┼───────────────┼───────────────┤
│     │      │ TOTAL           │   Rp3.000.000 │     Rp125.000 │
└─────┴──────┴─────────────────┴───────────────┴───────────────┘`,
          explanation: 'Fungsi lengkap tampil_riwayat(): menyiapkan lebar kolom, mencetak garis tabel, mengulang semua transaksi, lalu menutup dengan baris TOTAL.',
          lineExplanations: [
            { line: 4, code: 'if len(transaksi) == 0:', explanation: 'Kalau belum ada transaksi, cukup tampilkan pesan info lalu keluar dari fungsi.' },
            { line: 8, code: 'lebar = [3, 4, 15, 13, 13]', explanation: 'Daftar lebar kolom dalam jumlah karakter.' },
            { line: 9, code: 'rata = ["kanan", "kanan", "kiri", "kanan", "kanan"]', explanation: 'Posisi teks di setiap kolom: angka rata kanan, keterangan rata kiri.' },
            { line: 11, code: 'garis_tabel(lebar, "┌", "┬", "┐")', explanation: 'Mencetak garis pembatas atas tabel.' },
            { line: 20, code: 'for hari, jenis, kategori, jumlah in transaksi:', explanation: 'Membuka setiap tuple transaksi untuk dijadikan satu baris tabel.' },
            { line: 33, code: 'baris_tabel(["", "", warna("TOTAL", "putih", True),', explanation: 'Baris TOTAL menjumlahkan semua uang masuk dan keluar.' },
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
          code: `def laporan_kategori():
    """Total pengeluaran per kategori (grafik batang) dan kategori paling boros."""
    judul_bagian("LAPORAN PENGELUARAN PER KATEGORI")

    total = {}
    for hari, jenis, kategori, jumlah in transaksi:
        if jenis == "keluar":
            if kategori in total:
                total[kategori] += jumlah
            else:
                total[kategori] = jumlah

    if len(total) == 0:
        pesan_info("Belum ada pengeluaran.")
        return

    semua = sum(total.values())

    # Urutkan dari yang terbesar: list berisi tuple (jumlah, kategori)
    urutan = []
    for kategori in total:
        urutan.append((total[kategori], kategori))
    urutan.sort(reverse=True)

    baris = []
    nomor = 0
    for jumlah, kategori in urutan:
        persen_ini = jumlah / semua * 100
        teks_persen = str(round(persen_ini, 1)).replace(".", ",") + "%"
        if nomor == 0:
            nama_warna = "merah"      # yang terbesar diberi warna merah
        else:
            nama_warna = "cyan"
        baris.append(kategori.ljust(14) + bar(jumlah, semua, 15, nama_warna) + " "
                     + teks_persen.rjust(6) + " " + format_rupiah(jumlah).rjust(12))
        nomor += 1

    kotak("PER KATEGORI", baris)
    print()
    print("  " + baris_nilai("Total pengeluaran", format_rupiah(semua)))
    print("  " + baris_nilai("Kategori paling boros", urutan[0][1], "merah"))`,
          output: `── LAPORAN PENGELUARAN PER KATEGORI ────────────────────────────
          isSimulated: true,
┌─ PER KATEGORI ───────────────────────────────────────────────┐
│ Makan         ██████████░░░░░  68,0%     Rp85.000            │
│ Transport     █████░░░░░░░░░░  32,0%     Rp40.000            │
└──────────────────────────────────────────────────────────────┘

  Total pengeluaran     Rp125.000
  Kategori paling boros Makan`,
          explanation: 'Fungsi lengkap laporan_kategori(): menghitung total per kategori, mengurutkannya dari yang terbesar, menggambar batang, lalu menulis kategori paling boros.',
          lineExplanations: [
            { line: 5, code: 'total = {}', explanation: 'Dictionary kosong untuk menampung total per kategori.' },
            { line: 7, code: 'if jenis == "keluar":', explanation: 'Hanya pengeluaran yang dihitung.' },
            { line: 8, code: 'if kategori in total:', explanation: 'Kalau kategori sudah ada, tambahkan jumlahnya; kalau belum, buat entri baru.' },
            { line: 17, code: 'semua = sum(total.values())', explanation: 'Menjumlahkan semua nilai di dictionary untuk pembagi batang.' },
            { line: 20, code: 'urutan = []', explanation: 'Total diubah menjadi list berisi tuple (jumlah, kategori) supaya bisa diurutkan.' },
            { line: 23, code: 'urutan.sort(reverse=True)', explanation: 'Mengurutkan dari yang terbesar ke terkecil.' },
            { line: 34, code: 'baris.append(kategori.ljust(14) + bar(jumlah, semua, 15, nama_warna) + " "', explanation: 'Tiap baris: nama kategori, batang, persen, dan nominal.' },
            { line: 38, code: 'kotak("PER KATEGORI", baris)', explanation: 'Semua baris dimasukkan ke dalam satu kotak.' },
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
