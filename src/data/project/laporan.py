# laporan.py
# Peringatan, laporan, dan pengecekan input / eksepsi (Orang 2)

from pencatat import akun, transaksi, format_rupiah, hitung_saldo, pengeluaran_hari
from tampilan import (warna, kotak, bar, persen, baris_nilai, judul_bagian,
                      pesan_error, pesan_info, garis_tabel, baris_tabel)


def baca_angka(pesan):
    """Minta input angka positif. Kalau salah, ulangi terus (pakai try-except)."""
    while True:
        try:
            teks = input(pesan).replace(".", "").replace(",", "").strip()
            angka = int(teks)
            if angka <= 0:
                raise ValueError("harus lebih dari 0")
            return angka
        except ValueError:
            pesan_error("Input salah, masukkan angka bulat lebih dari 0 ya (contoh: 15000).")


def baca_pilihan(pesan, maksimal):
    """Minta pilihan nomor dari 1 sampai maksimal."""
    while True:
        try:
            nomor = int(input(pesan))
            if nomor < 1 or nomor > maksimal:
                raise ValueError("di luar rentang")
            return nomor
        except ValueError:
            pesan_error("Pilihan tidak valid, masukkan nomor 1 sampai " + str(maksimal) + ".")


def cek_peringatan():
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
                   + warna(format_rupiah(saldo / sisa_hari), "kuning", True) + " per hari.")


def tampil_riwayat():
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
    garis_tabel(lebar, "└", "┴", "┘")


def laporan_kategori():
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
    print("  " + baris_nilai("Kategori paling boros", urutan[0][1], "merah"))
