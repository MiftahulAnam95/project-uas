"""Pemeriksaan alur inti program Python proyek, tanpa menyimpan data ke file."""
import contextlib
import io
import pathlib
import subprocess
import sys
import unittest
from unittest.mock import patch

PROJECT = pathlib.Path(__file__).resolve().parents[1] / 'src' / 'data' / 'project'
sys.path.insert(0, str(PROJECT))
import pencatat
import laporan


class ProjectTest(unittest.TestCase):
    def setUp(self):
        pencatat.atur_uang_saku(3000000, 30)

    def status(self):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            laporan.cek_peringatan()
        return output.getvalue()

    def test_saldo_dan_batas_status(self):
        self.assertIn('AMAN', self.status())
        pencatat.tambah_pengeluaran(79999, 'Makan')
        self.assertIn('AMAN', self.status())
        pencatat.tambah_pengeluaran(1, 'Makan')
        self.assertIn('HATI-HATI', self.status())
        pencatat.tambah_pengeluaran(20000, 'Transport')
        self.assertIn('HATI-HATI', self.status())
        pencatat.tambah_pengeluaran(1, 'Transport')
        self.assertIn('BOROS', self.status())
        pencatat.tambah_pemasukan(50000, 'Honor')
        self.assertEqual(pencatat.hitung_saldo(), 2949999)
        self.assertEqual(pencatat.pengeluaran_hari(1), 100001)
        with contextlib.redirect_stdout(io.StringIO()) as output:
            laporan.laporan_kategori()
        self.assertIn('Makan', output.getvalue())
        self.assertIn('Transport', output.getvalue())

    def test_validasi_input(self):
        with patch('builtins.input', side_effect=['abc', '1e3', '-2', '1.500']), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(laporan.baca_angka(''), 1500)
        with patch('builtins.input', side_effect=['1.5', '7', '2']), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(laporan.baca_pilihan('', 6), 2)

    def test_demo_terminal_berakhir(self):
        inputs = '3000000\n30\n\n1\n1\n85000\n\n1\n2\n40000\n\n4\n\n5\n\n0\n'
        result = subprocess.run([sys.executable, '-B', str(PROJECT / 'main.py')], input=inputs, text=True, capture_output=True, timeout=10)
        self.assertEqual(result.returncode, 0, result.stderr)
        for text in ('HATI-HATI', 'BOROS', 'RIWAYAT TRANSAKSI', 'LAPORAN PENGELUARAN PER KATEGORI', 'SAMPAI JUMPA'):
            self.assertIn(text, result.stdout)


if __name__ == '__main__':
    unittest.main()
