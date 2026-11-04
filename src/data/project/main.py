# main.py
# Menu utama yang menyambungkan semua modul (Orang 3)
# Jalankan dengan: python main.py

from pencatat import (KATEGORI, akun, format_rupiah, atur_uang_saku,
                      tambah_pemasukan, tambah_pengeluaran, hitung_saldo)
from laporan import (baca_angka, baca_pilihan, cek_peringatan,
                     tampil_riwayat, laporan_kategori)
from tampilan import (warna, bersihkan_layar, judul_besar, judul_bagian, kotak, bar,
                      pesan_ok, pesan_error, pesan_info, tunggu)

# Daftar menu: list berisi tuple (nomor, tulisan)
MENU = [
    ("1", "Catat pengeluaran"),
    ("2", "Catat pemasukan"),
    ("3", "Cek saldo dan peringatan"),
    ("4", "Riwayat transaksi"),
    ("5", "Laporan per kategori"),
    ("6", "Lanjut ke hari berikutnya"),
    ("7", "Atur ulang anggaran"),
    ("0", "Keluar"),
]


def tampil_menu():
    bersihkan_layar()
    judul_besar("PENCATAT KEUANGAN MAHASISWA", "Catat, pantau, dan hemat uang bulananmu")

    saldo = hitung_saldo()
    if saldo < 0:
        warna_saldo = "merah"
    else:
        warna_saldo = "hijau"
    print()
    print("  " + warna("Hari ke-" + str(akun["hari"]) + " dari " + str(akun["jumlah_hari"]), "kuning", True)
          + warna("   │   ", "abu") + "Saldo " + warna(format_rupiah(saldo), warna_saldo, True)
          + warna("   │   ", "abu") + "Jatah " + warna(format_rupiah(akun["jatah_harian"]), "putih", True))
    print("  " + bar(akun["hari"], akun["jumlah_hari"], 40, "biru") + warna("  perjalanan bulan", "abu"))
    print()

    baris = []
    for nomor, nama in MENU:
        baris.append(warna("[" + nomor + "]", "cyan", True) + "  " + nama)
    kotak("MENU", baris)


def setup_awal(ulang=False):
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
    atur_uang_saku(uang_saku, jumlah_hari)
    print()
    pesan_ok("Anggaran tersimpan.")
    pesan_info("Jatah harian kamu: " + warna(format_rupiah(akun["jatah_harian"]), "kuning", True))
    tunggu()


def menu_pengeluaran():
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
    tambah_pengeluaran(jumlah, KATEGORI[pilihan - 1])
    print()
    pesan_ok("Tercatat: " + KATEGORI[pilihan - 1] + " " + warna(format_rupiah(jumlah), "merah", True))
    cek_peringatan()
    tunggu()


def menu_pemasukan():
    bersihkan_layar()
    judul_bagian("CATAT PEMASUKAN")
    print()
    sumber = input("  ► Sumber pemasukan (contoh: gaji, honor) : ").strip()
    if sumber == "":
        sumber = "Pemasukan lain"
    jumlah = baca_angka("  ► Jumlah pemasukan (Rp)                  : ")
    tambah_pemasukan(jumlah, sumber)
    print()
    pesan_ok("Tercatat: " + sumber + " " + warna(format_rupiah(jumlah), "hijau", True))
    pesan_info("Saldo sekarang: " + warna(format_rupiah(hitung_saldo()), "hijau", True))
    tunggu()


def hari_berikutnya():
    print()
    if akun["hari"] >= akun["jumlah_hari"]:
        pesan_info("Ini sudah hari terakhir. Cek laporan akhir di menu 5.")
    else:
        akun["hari"] += 1
        pesan_ok("Masuk ke hari ke-" + str(akun["hari"]) + ".")
        pesan_info("Jatah hari ini: " + warna(format_rupiah(akun["jatah_harian"]), "kuning", True))
    tunggu()


def main():
    setup_awal()
    while True:
        tampil_menu()
        pilihan = input("\n  ► Pilih menu : ").strip()
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
            kotak("SAMPAI JUMPA", ["Terima kasih sudah memakai aplikasi ini.",
                                   "Semoga keuangannya aman sampai akhir bulan!"], "hijau")
            break
        else:
            print()
            pesan_error("Menu tidak ada, pilih nomor yang tersedia ya.")
            tunggu()


main()
