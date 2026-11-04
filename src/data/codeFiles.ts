import pencatatCode from './project/pencatat.py?raw';
import laporanCode from './project/laporan.py?raw';
import mainCode from './project/main.py?raw';
import tampilanCode from './project/tampilan.py?raw';

export interface ProjectFile {
  name: string;
  role: string;
  owner: string;
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
    role: 'Pengelola Data dan Perhitungan',
    owner: 'Orang 1',
    order: 1,
    description:
      'File inti data (Orang 1). Menyimpan KATEGORI, akun (dictionary), dan transaksi (list of tuple). Berisi format_rupiah, atur_uang_saku, tambah_pemasukan, tambah_pengeluaran, hitung_saldo, dan pengeluaran_hari. Tidak meminta input dan tidak mencetak menu.',
    code: pencatatCode,
    functions: [
      {
        name: 'format_rupiah(angka)',
        purpose: 'Mengubah angka menjadi teks Rupiah, contoh 1500000 -> Rp1.500.000',
        parameters: 'angka (int/float)',
        returns: 'str format Rupiah',
      },
      {
        name: 'atur_uang_saku(uang_saku, jumlah_hari)',
        purpose: 'Mengisi akun, menghitung jatah harian, dan mencatat pemasukan awal',
        parameters: 'uang_saku (int), jumlah_hari (int)',
        returns: 'None (mengubah dictionary akun dan list transaksi)',
      },
      {
        name: 'tambah_pemasukan(jumlah, sumber)',
        purpose: 'Mencatat uang masuk pada hari aktif',
        parameters: 'jumlah (int), sumber (str)',
        returns: 'None',
      },
      {
        name: 'tambah_pengeluaran(jumlah, kategori)',
        purpose: 'Mencatat uang keluar pada hari aktif',
        parameters: 'jumlah (int), kategori (str)',
        returns: 'None',
      },
      {
        name: 'hitung_saldo()',
        purpose: 'Menjumlahkan pemasukan dan mengurangi pengeluaran',
        parameters: 'Tidak ada',
        returns: 'saldo (int)',
      },
      {
        name: 'pengeluaran_hari(hari_ke)',
        purpose: 'Menjumlahkan pengeluaran pada hari tertentu',
        parameters: 'hari_ke (int)',
        returns: 'total (int)',
      },
    ],
  },
  'laporan.py': {
    name: 'laporan.py',
    role: 'Peringatan, Laporan, dan Validasi Input',
    owner: 'Orang 2',
    order: 2,
    description:
      'File laporan (Orang 2). Memakai fungsi dari pencatat.py dan tampilan.py. Berisi baca_angka, baca_pilihan, cek_peringatan, tampil_riwayat, dan laporan_kategori. Menangani ValueError agar program tidak crash saat pengguna salah ketik.',
    code: laporanCode,
    functions: [
      {
        name: 'baca_angka(pesan)',
        purpose: 'Meminta angka bulat positif; mengulang dengan try/except ValueError jika salah',
        parameters: 'pesan (str)',
        returns: 'angka (int)',
      },
      {
        name: 'baca_pilihan(pesan, maksimal)',
        purpose: 'Meminta nomor pilihan 1..maksimal; mengulang jika di luar rentang',
        parameters: 'pesan (str), maksimal (int)',
        returns: 'nomor (int)',
      },
      {
        name: 'cek_peringatan()',
        purpose: 'Menghitung saldo, pengeluaran hari ini, status AMAN/HATI-HATI/BOROS, dan saran harian',
        parameters: 'Tidak ada (membaca akun dan transaksi)',
        returns: 'None (mencetak kotak status)',
      },
      {
        name: 'tampil_riwayat()',
        purpose: 'Menampilkan seluruh transaksi dalam tabel dengan total pemasukan dan pengeluaran',
        parameters: 'Tidak ada',
        returns: 'None (mencetak tabel)',
      },
      {
        name: 'laporan_kategori()',
        purpose: 'Menghitung total pengeluaran per kategori, mengurutkan, dan menampilkan grafik batang',
        parameters: 'Tidak ada',
        returns: 'None (mencetak laporan)',
      },
    ],
  },
  'main.py': {
    name: 'main.py',
    role: 'Menu Utama dan Penghubung Modul',
    owner: 'Orang 3',
    order: 3,
    description:
      'File utama (Orang 3). Dipanggil dengan python main.py. Menampilkan menu 1-7 dan 0, memanggil fungsi dari pencatat.py, laporan.py, dan tampilan.py. Berisi tampil_menu, setup_awal, menu_pengeluaran, menu_pemasukan, hari_berikutnya, dan main.',
    code: mainCode,
    functions: [
      {
        name: 'tampil_menu()',
        purpose: 'Membersihkan layar, mencetak judul, saldo, bar perjalanan bulan, dan daftar menu',
        parameters: 'Tidak ada',
        returns: 'None',
      },
      {
        name: 'setup_awal(ulang=False)',
        purpose: 'Meminta anggaran dan jumlah hari, lalu menyimpan lewat atur_uang_saku',
        parameters: 'ulang (bool, opsional)',
        returns: 'None',
      },
      {
        name: 'menu_pengeluaran()',
        purpose: 'Menampilkan kategori, meminta nomor dan jumlah, lalu mencatat pengeluaran',
        parameters: 'Tidak ada',
        returns: 'None',
      },
      {
        name: 'menu_pemasukan()',
        purpose: 'Meminta sumber dan jumlah pemasukan, lalu mencatatnya',
        parameters: 'Tidak ada',
        returns: 'None',
      },
      {
        name: 'hari_berikutnya()',
        purpose: 'Menaikkan akun["hari"] jika belum hari terakhir',
        parameters: 'Tidak ada',
        returns: 'None',
      },
      {
        name: 'main()',
        purpose: 'Loop utama while True yang membaca pilihan menu dan mengarahkan ke fungsi terkait',
        parameters: 'Tidak ada',
        returns: 'None',
      },
    ],
  },
  'tampilan.py': {
    name: 'tampilan.py',
    role: 'Modul Tampilan Bersama',
    owner: 'Dipakai bersama',
    order: 4,
    description:
      'File tampilan (dipakai bersama). Hanya memakai library bawaan os dan sys. Berisi WARNA, warna, panjang_tampil, persen, judul_besar, judul_bagian, kotak, baris_nilai, bar, pesan_ok/error/info, tunggu, garis_tabel, dan baris_tabel. Dipakai oleh laporan.py dan main.py.',
    code: tampilanCode,
    functions: [
      {
        name: 'warna(teks, nama, tebal=False)',
        purpose: 'Membungkus teks dengan kode ANSI; mengembalikan teks polos jika bukan terminal sungguhan',
        parameters: 'teks (str), nama (str), tebal (bool)',
        returns: 'str (boleh berisi kode ANSI)',
      },
      {
        name: 'bersihkan_layar()',
        purpose: 'Membersihkan layar hanya jika stdout adalah terminal sungguhan',
        parameters: 'Tidak ada',
        returns: 'None',
      },
      {
        name: 'panjang_tampil(teks)',
        purpose: 'Menghitung panjang teks yang terlihat dengan melewati kode ANSI',
        parameters: 'teks (str)',
        returns: 'int jumlah karakter terlihat',
      },
      {
        name: 'persen(nilai, maksimal)',
        purpose: 'Menghitung persentase dan membulatkannya; aman jika maksimal nol',
        parameters: 'nilai (int/float), maksimal (int/float)',
        returns: 'int persen',
      },
      {
        name: 'judul_besar(judul, subjudul="")',
        purpose: 'Mencetak kotak judul berbingkai ganda di atas layar',
        parameters: 'judul (str), subjudul (str)',
        returns: 'None (mencetak)',
      },
      {
        name: 'judul_bagian(teks)',
        purpose: 'Mencetak judul bagian dengan garis ──',
        parameters: 'teks (str)',
        returns: 'None (mencetak)',
      },
      {
        name: 'kotak(judul, baris, nama="cyan")',
        purpose: 'Mencetak kotak berjudul dengan isi berupa list teks',
        parameters: 'judul (str), baris (list[str]), nama (str)',
        returns: 'None (mencetak)',
      },
      {
        name: 'baris_nilai(label, nilai, nama="putih")',
        purpose: 'Membuat satu baris label ...... nilai dengan label abu-abu',
        parameters: 'label (str), nilai (str), nama (str)',
        returns: 'str siap dicetak',
      },
      {
        name: 'bar(nilai, maksimal, panjang=30, nama=None)',
        purpose: 'Membuat batang kemajuan █/░ dengan rasio, round, pembatasan maksimal, dan warna otomatis',
        parameters: 'nilai (int/float), maksimal (int/float), panjang (int), nama (str/None)',
        returns: 'str batang kemajuan',
      },
      {
        name: 'pesan_ok / pesan_error / pesan_info(teks)',
        purpose: 'Mencetak pesan singkat dengan warna dan label [OK]/[X]/[i]',
        parameters: 'teks (str)',
        returns: 'None (mencetak)',
      },
      {
        name: 'tunggu()',
        purpose: 'Menunggu Enter supaya hasil sempat dibaca',
        parameters: 'Tidak ada',
        returns: 'None',
      },
      {
        name: 'garis_tabel(lebar_kolom, kiri, tengah, kanan)',
        purpose: 'Mencetak garis pembatas tabel, misalnya ┌────┬────┐',
        parameters: 'lebar_kolom (list[int]), kiri/tengah/kanan (str)',
        returns: 'None (mencetak)',
      },
      {
        name: 'baris_tabel(isi, lebar_kolom, rata)',
        purpose: 'Mencetak satu baris tabel dengan rata kiri/kanan per kolom',
        parameters: 'isi (list[str]), lebar_kolom (list[int]), rata (list[str])',
        returns: 'None (mencetak)',
      },
    ],
  },
};

export const PROJECT_FILE_ORDER = ['pencatat.py', 'laporan.py', 'main.py', 'tampilan.py'];
