# tampilan.py
# Modul tampilan: warna, kotak, batang kemajuan, dan tabel
# supaya program terlihat menarik. Hanya memakai library bawaan Python.

import os
import sys

# Supaya warna tampil di Command Prompt Windows 10 ke atas
if os.name == "nt":
    os.system("")

# Pakai UTF-8 supaya karakter kotak dan batang tampil dengan benar
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

LEBAR = 64  # lebar tampilan (jumlah karakter)

# Kode warna disimpan di dictionary: nama warna -> kode
WARNA = {
    "reset": "\033[0m",
    "tebal": "\033[1m",
    "merah": "\033[91m",
    "hijau": "\033[92m",
    "kuning": "\033[93m",
    "biru": "\033[94m",
    "cyan": "\033[96m",
    "abu": "\033[90m",
    "putih": "\033[97m",
}

# Warna hanya dipakai kalau layarnya terminal sungguhan
# (di IDLE atau saat output disimpan ke file, teks tampil polos)
PAKAI_WARNA = sys.stdout.isatty() or os.environ.get("FORCE_COLOR") == "1"


def warna(teks, nama, tebal=False):
    """Beri warna pada teks. Contoh: warna("Halo", "hijau", True)"""
    if not PAKAI_WARNA:
        return teks
    kode = WARNA[nama]
    if tebal:
        kode = WARNA["tebal"] + kode
    return kode + teks + WARNA["reset"]


def bersihkan_layar():
    """Hapus isi layar supaya tampilan menu selalu bersih."""
    if sys.stdout.isatty():
        os.system("cls" if os.name == "nt" else "clear")


def panjang_tampil(teks):
    """Hitung panjang teks yang terlihat (kode warna tidak ikut dihitung)."""
    jumlah = 0
    dalam_kode = False
    for huruf in teks:
        if huruf == "\033":
            dalam_kode = True
        elif dalam_kode:
            if huruf == "m":
                dalam_kode = False
        else:
            jumlah += 1
    return jumlah


def persen(nilai, maksimal):
    """Hitung persentase (dibulatkan). Aman kalau pembaginya nol."""
    if maksimal <= 0:
        return 0
    return round(nilai / maksimal * 100)


# ---------- judul dan kotak ----------

def judul_besar(judul, subjudul=""):
    """Kotak judul berbingkai ganda di bagian atas layar."""
    dalam = LEBAR - 2
    print(warna("╔" + "═" * dalam + "╗", "cyan"))
    print(warna("║", "cyan") + warna(judul.center(dalam), "putih", True) + warna("║", "cyan"))
    if subjudul != "":
        print(warna("║", "cyan") + warna(subjudul.center(dalam), "abu") + warna("║", "cyan"))
    print(warna("╚" + "═" * dalam + "╝", "cyan"))


def judul_bagian(teks):
    """Judul bagian, contoh: ── STATUS ─────────────"""
    sisa = LEBAR - len(teks) - 4
    print()
    print(warna("── ", "cyan") + warna(teks, "cyan", True) + warna(" " + "─" * sisa, "cyan"))


def kotak(judul, baris, nama="cyan"):
    """Kotak berjudul. 'baris' adalah list teks (boleh sudah berwarna)."""
    dalam = LEBAR - 2
    print(warna("┌─ ", nama) + warna(judul, nama, True) + warna(" " + "─" * (dalam - len(judul) - 3) + "┐", nama))
    for isi in baris:
        isi = " " + isi
        isi = isi + " " * (dalam - panjang_tampil(isi))
        print(warna("│", nama) + isi + warna("│", nama))
    print(warna("└" + "─" * dalam + "┘", nama))


def baris_nilai(label, nilai, nama="putih"):
    """Satu baris 'label ...... nilai' dengan label abu-abu dan nilai tebal."""
    return warna(label.ljust(22), "abu") + warna(nilai, nama, True)


# ---------- batang kemajuan ----------

def bar(nilai, maksimal, panjang=30, nama=None):
    """Batang kemajuan: █ terisi, ░ kosong.
    Kalau 'nama' tidak diisi, warna otomatis: hijau, kuning, atau merah."""
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
    return warna("█" * terisi, nama) + warna("░" * (panjang - terisi), "abu")


# ---------- pesan singkat ----------

def pesan_ok(teks):
    print(warna("  [OK] ", "hijau", True) + teks)


def pesan_error(teks):
    print(warna("  [X] ", "merah", True) + warna(teks, "merah"))


def pesan_info(teks):
    print(warna("  [i] ", "cyan", True) + teks)


def tunggu():
    """Berhenti sebentar supaya hasil sempat dibaca."""
    print(warna("\n  Tekan Enter untuk kembali ke menu...", "abu"), end="")
    input()


# ---------- tabel ----------

def garis_tabel(lebar_kolom, kiri, tengah, kanan):
    """Garis pembatas tabel, contoh: ┌────┬────┐"""
    bagian = []
    for lebar in lebar_kolom:
        bagian.append("─" * (lebar + 2))
    print(warna(kiri + tengah.join(bagian) + kanan, "abu"))


def baris_tabel(isi, lebar_kolom, rata):
    """Satu baris tabel. rata berisi "kiri" atau "kanan" untuk tiap kolom."""
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
    print(teks)
