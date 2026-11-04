# pencatat.py
# Bagian inti: data dan fungsi untuk mencatat anggaran bulanan (Orang 1)

# Tuple kategori pengeluaran (isinya tetap, jadi pakai tuple)
KATEGORI = ("Makan", "Transport", "Kuota", "Kuliah/Tugas", "Hiburan", "Lainnya")

# Data akun disimpan di dictionary
akun = {
    "uang_saku": 0,
    "jumlah_hari": 30,
    "jatah_harian": 0.0,
    "hari": 1,
}

# Semua transaksi disimpan di list
# Isi tiap transaksi berupa tuple: (hari, jenis, kategori, jumlah)
# jenis = "masuk" atau "keluar"
transaksi = []


def format_rupiah(angka):
    """Ubah angka jadi tulisan rupiah, contoh 1500000 -> Rp1.500.000"""
    teks = "Rp{:,.0f}".format(abs(angka)).replace(",", ".")
    if angka < 0:
        teks = "-" + teks
    return teks


def atur_uang_saku(uang_saku, jumlah_hari):
    """Set anggaran bulanan (gaji/uang saku), lalu hitung jatah harian otomatis."""
    transaksi.clear()  # mulai dari awal lagi
    akun["uang_saku"] = uang_saku
    akun["jumlah_hari"] = jumlah_hari
    akun["jatah_harian"] = uang_saku / jumlah_hari
    akun["hari"] = 1
    transaksi.append((1, "masuk", "Anggaran", uang_saku))


def tambah_pemasukan(jumlah, sumber):
    """Catat uang masuk, misalnya kiriman tambahan atau hasil kerja."""
    transaksi.append((akun["hari"], "masuk", sumber, jumlah))


def tambah_pengeluaran(jumlah, kategori):
    """Catat uang keluar sesuai kategori."""
    transaksi.append((akun["hari"], "keluar", kategori, jumlah))


def hitung_saldo():
    """Saldo = total pemasukan - total pengeluaran."""
    saldo = 0
    for hari, jenis, kategori, jumlah in transaksi:
        if jenis == "masuk":
            saldo += jumlah
        else:
            saldo -= jumlah
    return saldo


def pengeluaran_hari(hari_ke):
    """Total uang keluar pada hari tertentu."""
    total = 0
    for hari, jenis, kategori, jumlah in transaksi:
        if hari == hari_ke and jenis == "keluar":
            total += jumlah
    return total
