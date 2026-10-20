export interface ProjectFile {
  name: string;
  role: string;
  description: string;
  order: number;
  code: string;
  functions: Array<{
    name: string;
    purpose: string;
    parameters: string;
    returns: string;
  }>;
}

export const PROJECT_FILES: Record<string, ProjectFile> = {
  'pencatat.py': {
    name: 'pencatat.py',
    role: 'Pengelola Data dan Logika Perhitungan',
    order: 1,
    description:
      'File ini bertugas mengurus variabel data inti (anggaran, transaksi, hari aktif) dan seluruh perhitungan matematika keuangan. File ini tidak menampilkan menu utama, melainkan fokus sebagai penyedia data.',
    code: `# ========================================================
# pencatat.py - Modul Pengelola Data dan Perhitungan
# Program Pencatat Keuangan Mahasiswa
# ========================================================

# Data inti program (disimpan dalam variabel global modul)
anggaran_bulanan = 0
jumlah_hari = 30
hari_aktif = 1
jatah_harian = 0
daftar_transaksi = []

def atur_anggaran(anggaran, hari=30):
    """
    Menetapkan anggaran awal dan jumlah hari yang direncanakan.
    Jatah harian langsung dihitung secara otomatis.
    """
    global anggaran_bulanan, jumlah_hari, jatah_harian
    anggaran_bulanan = anggaran
    jumlah_hari = hari
    if jumlah_hari > 0:
        jatah_harian = anggaran_bulanan // jumlah_hari
    else:
        jatah_harian = 0

def hitung_jatah_harian():
    """Mengembalikan nilai jatah harian yang telah dihitung."""
    return jatah_harian

def tambah_transaksi(kategori, jumlah, catatan=""):
    """
    Menambahkan satu catatan pengeluaran ke dalam daftar transaksi.
    Disimpan sebagai dictionary berisi data terstruktur.
    """
    transaksi_baru = {
        "hari": hari_aktif,
        "kategori": kategori,
        "jumlah": jumlah,
        "catatan": catatan
    }
    daftar_transaksi.append(transaksi_baru)

def hitung_total_pengeluaran():
    """Menghitung jumlah seluruh pengeluaran dari awal hingga sekarang."""
    total = 0
    for t in daftar_transaksi:
        total += t["jumlah"]
    return total

def hitung_sisa_saldo():
    """Menghitung sisa saldo dari anggaran dikurangi total pengeluaran."""
    return anggaran_bulanan - hitung_total_pengeluaran()

def hitung_pengeluaran_hari_ini(hari=None):
    """Menghitung total pengeluaran khusus pada hari tertentu."""
    if hari is None:
        hari = hari_aktif
    total_hari = 0
    for t in daftar_transaksi:
        if t["hari"] == hari:
            total_hari += t["jumlah"]
    return total_hari

def ganti_hari():
    """Menaikkan penanda hari aktif ke hari berikutnya."""
    global hari_aktif
    hari_aktif += 1
    return hari_aktif
`,
    functions: [
      {
        name: 'atur_anggaran(anggaran, hari=30)',
        purpose: 'Mengatur anggaran total dan menghitung jatah per hari',
        parameters: 'anggaran (int), hari (int, default 30)',
        returns: 'None',
      },
      {
        name: 'tambah_transaksi(kategori, jumlah, catatan)',
        purpose: 'Menyimpan transaksi baru ke list daftar_transaksi',
        parameters: 'kategori (str), jumlah (int), catatan (str)',
        returns: 'None',
      },
      {
        name: 'hitung_total_pengeluaran()',
        purpose: 'Menjumlahkan semua pengeluaran yang pernah dicatat',
        parameters: 'Tidak ada',
        returns: 'total (int)',
      },
      {
        name: 'hitung_sisa_saldo()',
        purpose: 'Mengurangi anggaran bulanan dengan total pengeluaran',
        parameters: 'Tidak ada',
        returns: 'sisa_saldo (int)',
      },
      {
        name: 'hitung_pengeluaran_hari_ini(hari)',
        purpose: 'Menjumlahkan transaksi pada hari yang sedang aktif saja',
        parameters: 'hari (int, opsional)',
        returns: 'total_hari (int)',
      },
      {
        name: 'ganti_hari()',
        purpose: 'Melanjutkan simulasi ke hari berikutnya',
        parameters: 'Tidak ada',
        returns: 'hari_aktif (int baru)',
      },
    ],
  },

  'laporan.py': {
    name: 'laporan.py',
    role: 'Penyaji Laporan, Peringatan Status, dan Validasi',
    order: 2,
    description:
      'File ini bertugas mengolah tampilan teks agar ramah dibaca manusia: memformat angka menjadi format Rupiah, menentukan status hemat/boros, menampilkan tabel ringkasan, dan memvalidasi input agar tidak error.',
    code: `# ========================================================
# laporan.py - Modul Laporan, Status, dan Tampilan
# Program Pencatat Keuangan Mahasiswa
# ========================================================

def format_rupiah(angka):
    """
    Mengubah angka bulat menjadi format mata uang Rupiah.
    Contoh: 1500000 -> 'Rp 1.500.000'
    """
    teks = f"{angka:,}".replace(",", ".")
    return f"Rp {teks}"

def cek_status_harian(pengeluaran_hari_ini, jatah_harian):
    """
    Memeriksa apakah pengeluaran hari ini masih aman atau boros.
    - <= 70% jatah : AMAN (sangat hemat)
    - <= 100% jatah: WASPADA (mendekati batas)
    - > 100% jatah : BOROS! (melewati batas jatah)
    """
    if jatah_harian == 0:
        return "BELUM DIATUR"
    
    persentase = (pengeluaran_hari_ini / jatah_harian) * 100

    if persentase <= 70:
        return "AMAN (Pengeluaran terjaga dengan baik)"
    elif persentase <= 100:
        return "WASPADA (Mendekati batas jatah harian!)"
    else:
        return "BOROS! (Melebihi jatah harian hari ini!)"

def tampilkan_ringkasan(anggaran, total_keluar, sisa_saldo, hari_aktif, pengeluaran_hari, jatah_harian):
    """Menampilkan ringkasan keuangan dalam kotak rapi di terminal."""
    status = cek_status_harian(pengeluaran_hari, jatah_harian)
    
    print("\\n" + "=" * 45)
    print("           RINGKASAN KEUANGAN MAHASISWA")
    print("=" * 45)
    print(f" Hari Aktif           : Hari ke-{hari_aktif}")
    print(f" Anggaran Awal        : {format_rupiah(anggaran)}")
    print(f" Jatah Harian         : {format_rupiah(jatah_harian)}")
    print("-" * 45)
    print(f" Pengeluaran Hari Ini : {format_rupiah(pengeluaran_hari)}")
    print(f" Status Hari Ini      : {status}")
    print("-" * 45)
    print(f" Total Pengeluaran    : {format_rupiah(total_keluar)}")
    print(f" Sisa Saldo           : {format_rupiah(sisa_saldo)}")
    print("=" * 45 + "\\n")

def tampilkan_laporan_kategori(daftar_transaksi):
    """Menghitung total pengeluaran per kategori (Makan, Transport, Kos, dll)."""
    if not daftar_transaksi:
        print("\\n[!] Belum ada transaksi yang dicatat.\\n")
        return

    kategori_total = {}
    for t in daftar_transaksi:
        kat = t["kategori"]
        kat_jumlah = t["jumlah"]
        if kat in kategori_total:
            kategori_total[kat] += kat_jumlah
        else:
            kategori_total[kat] = kat_jumlah

    print("\\n" + "-" * 35)
    print(" LAPORAN PENGELUARAN PER KATEGORI")
    print("-" * 35)
    for kat, total in kategori_total.items():
        print(f" - {kat:<15} : {format_rupiah(total)}")
    print("-" * 35 + "\\n")

def validasi_angka_positif(teks_input):
    """
    Meminta input angka dari pengguna dan memastikan nilainya berupa
    bilangan bulat positif. Mengulang jika pengguna salah ketik.
    """
    while True:
        isi = input(teks_input).strip()
        if isi.isdigit():
            nilai = int(isi)
            if nilai > 0:
                return nilai
            print("[!] Angka harus lebih besar dari 0.")
        else:
            print("[!] Masukkan hanya angka bulat positif!")
`,
    functions: [
      {
        name: 'format_rupiah(angka)',
        purpose: 'Mengubah integer ke teks berformat rupiah dengan pemisah titik',
        parameters: 'angka (int)',
        returns: 'str (contoh: "Rp 100.000")',
      },
      {
        name: 'cek_status_harian(pengeluaran, jatah)',
        purpose: 'Menentukan kategori status: Aman, Waspada, atau Boros',
        parameters: 'pengeluaran (int), jatah (int)',
        returns: 'str status deskriptif',
      },
      {
        name: 'tampilkan_ringkasan(...)',
        purpose: 'Mencetak kartu ringkasan keuangan mahasiswa ke layar',
        parameters: 'anggaran, total_keluar, sisa_saldo, hari, pengeluaran_hari, jatah',
        returns: 'None (mencetak teks)',
      },
      {
        name: 'tampilkan_laporan_kategori(daftar_transaksi)',
        purpose: 'Mengelompokkan transaksi dan menjumlahkan per jenis kategori',
        parameters: 'daftar_transaksi (list of dict)',
        returns: 'None (mencetak teks)',
      },
      {
        name: 'validasi_angka_positif(teks_input)',
        purpose: 'Mencegah program crash akibat input salah dari pengguna',
        parameters: 'teks_input (str)',
        returns: 'int (angka valid)',
      },
    ],
  },

  'main.py': {
    name: 'main.py',
    role: 'Menu Utama dan Penghubung File',
    order: 3,
    description:
      'File utama yang pertama kali dijalankan pengguna (python main.py). Menampilkan antarmuka menu CLI, menerima pilihan pengguna, dan memanggil fungsi dari pencatat.py serta laporan.py.',
    code: `# ========================================================
# main.py - File Utama Program Pencatat Keuangan
# Jalankan di terminal: python main.py
# ========================================================

import pencatat
import laporan

def tampilkan_menu():
    """Menampilkan pilihan menu utama ke layar."""
    print("========================================")
    print(" PENCATAT KEUANGAN MAHASISWA (PYTHON)")
    print("========================================")
    print(" [1] Atur Anggaran Awal")
    print(" [2] Catat Pengeluaran Baru")
    print(" [3] Lihat Ringkasan & Status Hari Ini")
    print(" [4] Lihat Laporan per Kategori")
    print(" [5] Ganti ke Hari Berikutnya")
    print(" [0] Keluar dari Program")
    print("========================================")

def main():
    """Fungsi utama pengendali alur aplikasi."""
    print("\\nSelamat datang di Program Pencatat Keuangan Mahasiswa!")
    
    while True:
        tampilkan_menu()
        pilihan = input("Pilih menu (0-5): ").strip()

        if pilihan == "1":
            print("\\n--- Pengaturan Anggaran ---")
            anggaran = laporan.validasi_angka_positif("Masukkan anggaran bulanan (Rp): ")
            hari = laporan.validasi_angka_positif("Masukkan jumlah hari (contoh: 30): ")
            pencatat.atur_anggaran(anggaran, hari)
            print(f"[OK] Anggaran berhasil diatur! Jatah harian: {laporan.format_rupiah(pencatat.hitung_jatah_harian())}\\n")

        elif pilihan == "2":
            if pencatat.anggaran_bulanan == 0:
                print("\\n[!] Harap atur anggaran terlebih dahulu di menu [1].\\n")
                continue
            
            print(f"\\n--- Catat Pengeluaran (Hari ke-{pencatat.hari_aktif}) ---")
            print("Pilihan kategori: [Makan, Transport, Kos, Kuliah, Hiburan, Lainnya]")
            kategori = input("Nama kategori pengeluaran: ").strip().capitalize()
            if not kategori:
                kategori = "Lainnya"
            
            jumlah = laporan.validasi_angka_positif("Jumlah pengeluaran (Rp): ")
            catatan = input("Catatan tambahan (opsional): ").strip()

            pencatat.tambah_transaksi(kategori, jumlah, catatan)
            print("[OK] Pengeluaran berhasil dicatat!\\n")

        elif pilihan == "3":
            total_keluar = pencatat.hitung_total_pengeluaran()
            sisa_saldo = pencatat.hitung_sisa_saldo()
            pengeluaran_hari = pencatat.hitung_pengeluaran_hari_ini()
            jatah = pencatat.hitung_jatah_harian()

            laporan.tampilkan_ringkasan(
                pencatat.anggaran_bulanan,
                total_keluar,
                sisa_saldo,
                pencatat.hari_aktif,
                pengeluaran_hari,
                jatah
            )

        elif pilihan == "4":
            laporan.tampilkan_laporan_kategori(pencatat.daftar_transaksi)

        elif pilihan == "5":
            hari_baru = pencatat.ganti_hari()
            print(f"\\n[>>] Berpindah ke Hari ke-{hari_baru}! Semangat berhemat hari ini.\\n")

        elif pilihan == "0":
            print("\\nTerima kasih telah menggunakan program ini. Tetap bijak mengelola uang!")
            break

        else:
            print("\\n[!] Pilihan tidak valid. Silakan ketik angka antara 0 sampai 5.\\n")

if __name__ == "__main__":
    main()
`,
    functions: [
      {
        name: 'tampilkan_menu()',
        purpose: 'Menampilkan daftar 6 opsi menu di konsol',
        parameters: 'Tidak ada',
        returns: 'None',
      },
      {
        name: 'main()',
        purpose: 'Loop utama (while True) yang membaca input opsi dan mengarahkan ke modul yang tepat',
        parameters: 'Tidak ada',
        returns: 'None',
      },
    ],
  },
};
