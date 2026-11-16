import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, RefreshCw, Send, Sparkles } from 'lucide-react';
import { parseSimulatorInteger } from '../../utils/simulatorInput';

type Step =
  | 'menu'
  | 'tunggu'
  | 'anggaran_nominal'
  | 'anggaran_hari'
  | 'catat_kat'
  | 'catat_jml'
  | 'pemasukan_sumber'
  | 'pemasukan_jml';

interface Transaksi {
  hari: number;
  jenis: 'masuk' | 'keluar';
  kategori: string;
  jumlah: number;
}

const KATEGORI = ['Makan', 'Transport', 'Kuota', 'Kuliah/Tugas', 'Hiburan', 'Lainnya'];

const MENU = [
  ['1', 'Catat pengeluaran'],
  ['2', 'Catat pemasukan'],
  ['3', 'Cek saldo dan peringatan'],
  ['4', 'Riwayat transaksi'],
  ['5', 'Laporan per kategori'],
  ['6', 'Lanjut ke hari berikutnya'],
  ['7', 'Atur ulang anggaran'],
  ['0', 'Keluar'],
];

/** Semua helper di bawah meniru tampilan.py agar keluarannya sama dengan program asli. */
const LEBAR = 64;
const DALAM = LEBAR - 2;

const rupiah = (n: number) => 'Rp' + Math.round(n).toLocaleString('id-ID');
const center = (teks: string, lebar: number) => {
  const sisa = Math.max(0, lebar - teks.length);
  return ' '.repeat(Math.floor(sisa / 2)) + teks + ' '.repeat(Math.ceil(sisa / 2));
};
const bar = (nilai: number, maksimal: number, panjang = 30) => {
  const rasio = maksimal > 0 ? Math.max(0, Math.min(1, nilai / maksimal)) : 0;
  const terisi = Math.round(rasio * panjang);
  return '█'.repeat(terisi) + '░'.repeat(panjang - terisi);
};
const persen = (nilai: number, maksimal: number) =>
  maksimal > 0 ? Math.round((nilai / maksimal) * 100) : 0;
const judulBesar = (subjudul: string) => [
  '╔' + '═'.repeat(DALAM) + '╗',
  '║' + center('PENCATAT KEUANGAN MAHASISWA', DALAM) + '║',
  '║' + center(subjudul, DALAM) + '║',
  '╚' + '═'.repeat(DALAM) + '╝',
];
const judulBagian = (teks: string) =>
  '── ' + teks + ' ' + '─'.repeat(Math.max(0, LEBAR - teks.length - 4));
const boxTop = (judul: string) =>
  '┌─ ' + judul + ' ' + '─'.repeat(Math.max(0, DALAM - judul.length - 3)) + '┐';
const boxBottom = '└' + '─'.repeat(DALAM) + '┘';
const boxLine = (isi = '') => '│' + (' ' + isi).padEnd(DALAM) + '│';
const barisNilai = (label: string, nilai: string) => label.padEnd(22) + nilai;
const pesan = (tag: 'OK' | 'X' | 'i', teks: string) => `  [${tag}] ${teks}`;
const TUNGGU = '  Tekan Enter untuk kembali ke menu...';
const SALAH_ANGKA = 'Input salah, masukkan angka bulat lebih dari 0 ya (contoh: 15000).';

/** Sama dengan percabangan status di laporan.cek_peringatan(). */
const statusHarian = (keluar: number, jatah: number) => {
  if (keluar > jatah) {
    return {
      judul: 'BOROS!',
      isi: `Kamu sudah lebih ${rupiah(keluar - jatah)} dari jatah hari ini.`,
    };
  }
  if (keluar >= 0.8 * jatah) {
    return { judul: 'HATI-HATI', isi: 'Pengeluaran hari ini hampir habis jatah.' };
  }
  return { judul: 'AMAN', isi: 'Pengeluaran hari ini masih aman.' };
};

const RIWAYAT_LEBAR = [3, 4, 15, 13, 13];
const garisTabel = (kiri: string, tengah: string, kanan: string) =>
  kiri + RIWAYAT_LEBAR.map((l) => '─'.repeat(l + 2)).join(tengah) + kanan;
const barisTabel = (isi: string[], rata: Array<'kiri' | 'kanan'>) =>
  '│' +
  isi
    .map((sel, i) =>
      ' ' + (rata[i] === 'kanan' ? sel.padStart(RIWAYAT_LEBAR[i]) : sel.padEnd(RIWAYAT_LEBAR[i])) + ' │'
    )
    .join('');

export const TerminalSimulator: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'Simulasi menu Python (bukan interpreter Python)',
    '$ python main.py',
    ...judulBesar('Selamat datang!'),
    '',
    boxTop('ATUR ANGGARAN'),
    boxLine('Isi anggaran satu bulan (gaji, honor, atau kiriman).'),
    boxLine('Jatah harian akan dihitung otomatis.'),
    boxBottom,
    '',
    '  ► Anggaran sebulan (Rp)  : ',
  ]);
  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState<Step>('anggaran_nominal');
  const [anggaran, setAnggaran] = useState(0);
  const [jumlahHari, setJumlahHari] = useState(30);
  const [hariAktif, setHariAktif] = useState(1);
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [temp, setTemp] = useState<{ anggaran?: number; kat?: string; sumber?: string }>({});
  const [running, setRunning] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const jatah = jumlahHari > 0 ? anggaran / jumlahHari : 0;
  const saldo = transaksi.reduce((acc, t) => acc + (t.jenis === 'masuk' ? t.jumlah : -t.jumlah), 0);
  const totalKeluar = transaksi
    .filter((t) => t.jenis === 'keluar')
    .reduce((acc, t) => acc + t.jumlah, 0);
  const pengeluaranHariIni = transaksi
    .filter((t) => t.hari === hariAktif && t.jenis === 'keluar')
    .reduce((acc, t) => acc + t.jumlah, 0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const add = (...lines: string[]) => setHistory((prev) => [...prev, ...lines]);
  const tampilMenu = () => {
    add(
      '',
      ...judulBesar('Catat, pantau, dan hemat uang bulananmu'),
      '',
      `  Hari ke-${hariAktif} dari ${jumlahHari}   │   Saldo ${rupiah(saldo)}   │   Jatah ${rupiah(jatah)}`,
      `  ${bar(hariAktif, jumlahHari, 40)}  perjalanan bulan`,
      '',
      boxTop('MENU'),
      ...MENU.map(([nomor, nama]) => boxLine(`[${nomor}]  ${nama}`)),
      boxBottom,
      '',
      '  ► Pilih menu : '
    );
    setStep('menu');
  };

  const ringkasan = () => {
    const info = statusHarian(pengeluaranHariIni, jatah);
    const sisaHari = jumlahHari - hariAktif + 1;
    const baris = [
      '',
      judulBagian(`STATUS HARI KE-${hariAktif} DARI ${jumlahHari}`),
      boxTop('RINGKASAN'),
      boxLine(barisNilai('Saldo sekarang', rupiah(saldo))),
      boxLine(
        `  ${bar(saldo, anggaran, 34)} ${persen(saldo, anggaran)}% dari anggaran`
      ),
      boxLine(),
      boxLine(barisNilai('Jatah harian', rupiah(jatah))),
      boxLine(barisNilai('Pengeluaran hari ini', rupiah(pengeluaranHariIni))),
      boxLine(
        `  ${bar(pengeluaranHariIni, jatah, 34)} ${persen(pengeluaranHariIni, jatah)}% dari jatah`
      ),
      boxBottom,
      boxTop(info.judul),
      boxLine(info.isi),
      boxBottom,
    ];
    if (saldo < 0) {
      baris.push(boxTop('SALDO MINUS'), boxLine('Segera kurangi pengeluaran.'), boxBottom);
    } else if (saldo <= 0.2 * anggaran) {
      baris.push(
        boxTop('SALDO MENIPIS'),
        boxLine('Saldo tinggal sedikit (kurang dari 20% anggaran).'),
        boxBottom
      );
    }
    if (sisaHari > 0 && saldo > 0) {
      baris.push('', pesan('i', `Biar cukup sampai akhir bulan, maksimal pengeluaran ${rupiah(saldo / sisaHari)} per hari.`));
    }
    baris.push('', TUNGGU);
    add(...baris);
    setStep('tunggu');
  };

  const riwayat = () => {
    add('', judulBagian('RIWAYAT TRANSAKSI'));
    if (transaksi.length === 0) {
      add(pesan('i', 'Belum ada transaksi.'));
    } else {
      const rata: Array<'kiri' | 'kanan'> = ['kanan', 'kanan', 'kiri', 'kanan', 'kanan'];
      add(garisTabel('┌', '┬', '┐'));
      add(barisTabel(['No', 'Hari', 'Keterangan', 'Masuk', 'Keluar'], rata));
      add(garisTabel('├', '┼', '┤'));
      transaksi.forEach((trx, i) => {
        add(
          barisTabel(
            [
              String(i + 1),
              String(trx.hari),
              trx.kategori.slice(0, 15),
              trx.jenis === 'masuk' ? rupiah(trx.jumlah) : '-',
              trx.jenis === 'keluar' ? rupiah(trx.jumlah) : '-',
            ],
            rata
          )
        );
      });
      add(garisTabel('├', '┼', '┤'));
      add(
        barisTabel(
          [
            '',
            '',
            'TOTAL',
            rupiah(
              transaksi.filter((trx) => trx.jenis === 'masuk').reduce((a, trx) => a + trx.jumlah, 0)
            ),
            rupiah(totalKeluar),
          ],
          rata
        )
      );
      add(garisTabel('└', '┴', '┘'));
    }
    add('', TUNGGU);
    setStep('tunggu');
  };

  const laporanKategori = () => {
    add('', judulBagian('LAPORAN PENGELUARAN PER KATEGORI'));
    const total: Record<string, number> = {};
    transaksi.forEach((trx) => {
      if (trx.jenis === 'keluar') total[trx.kategori] = (total[trx.kategori] || 0) + trx.jumlah;
    });
    const semua = Object.values(total).reduce((a, b) => a + b, 0);
    if (semua === 0) {
      add(pesan('i', 'Belum ada pengeluaran.'));
    } else {
      const urutan = Object.entries(total).sort((a, b) => b[1] - a[1]);
      add(boxTop('PER KATEGORI'));
      urutan.forEach(([kat, jumlah]) => {
        const teksPersen = ((jumlah / semua) * 100).toFixed(1).replace('.', ',') + '%';
        add(
          boxLine(
            kat.padEnd(14) +
              bar(jumlah, semua, 15) +
              ' ' +
              teksPersen.padStart(6) +
              ' ' +
              rupiah(jumlah).padStart(12)
          )
        );
      });
      add(boxBottom);
      add(
        '',
        '  ' + barisNilai('Total pengeluaran', rupiah(semua)),
        '  ' + barisNilai('Kategori paling boros', urutan[0][0])
      );
    }
    add('', TUNGGU);
    setStep('tunggu');
  };

  const submit = (raw: string) => {
    const val = raw.trim();
    add(`> ${raw}`);
    setInputVal('');

    if (step === 'tunggu') {
      tampilMenu();
      return;
    }

    if (step === 'anggaran_nominal') {
      const nominal = parseSimulatorInteger(val, true);
      if (nominal === null || nominal <= 0) {
        add(pesan('X', SALAH_ANGKA));
        return;
      }
      setAnggaran(nominal);
      setTemp((prev) => ({ ...prev, anggaran: nominal }));
      add('  ► Jumlah hari sebulan    : ');
      setStep('anggaran_hari');
      return;
    }

    if (step === 'anggaran_hari') {
      const hari = parseSimulatorInteger(val, true);
      if (hari === null || hari <= 0) {
        add(pesan('X', SALAH_ANGKA));
        return;
      }
      const nominal = temp.anggaran ?? 0;
      setJumlahHari(hari);
      setHariAktif(1);
      setTransaksi([{ hari: 1, jenis: 'masuk', kategori: 'Anggaran', jumlah: nominal }]);
      add('', pesan('OK', 'Anggaran tersimpan.'));
      add(pesan('i', `Jatah harian kamu: ${rupiah(nominal / hari)}`));
      add('', TUNGGU);
      setStep('tunggu');
      return;
    }

    if (step === 'menu') {
      if (val === '') return;
      if (val === '1') {
        add('', judulBagian('CATAT PENGELUARAN'), boxTop('PILIH KATEGORI'));
        KATEGORI.forEach((k, i) => add(boxLine(`[${i + 1}]  ${k}`)));
        add(boxBottom);
        add('  ► Nomor kategori          : ');
        setStep('catat_kat');
        return;
      }
      if (val === '2') {
        add('', judulBagian('CATAT PEMASUKAN'));
        add('  ► Sumber pemasukan (contoh: gaji, honor) : ');
        setStep('pemasukan_sumber');
        return;
      }
      if (val === '3') {
        ringkasan();
        return;
      }
      if (val === '4') {
        riwayat();
        return;
      }
      if (val === '5') {
        laporanKategori();
        return;
      }
      if (val === '6') {
        if (hariAktif >= jumlahHari) {
          add('', pesan('i', 'Ini sudah hari terakhir. Cek laporan akhir di menu 5.'));
        } else {
          setHariAktif((h) => h + 1);
          add('', pesan('OK', `Masuk ke hari ke-${hariAktif + 1}.`));
          add(pesan('i', `Jatah hari ini: ${rupiah(jatah)}`));
        }
        add('', TUNGGU);
        setStep('tunggu');
        return;
      }
      if (val === '7') {
        add(
          '',
          ...judulBesar('Selamat datang!'),
          '',
          boxTop('ATUR ANGGARAN'),
          boxLine('Isi anggaran satu bulan (gaji, honor, atau kiriman).'),
          boxLine('Jatah harian akan dihitung otomatis.'),
          boxLine('Perhatian: catatan lama akan dihapus.'),
          boxBottom,
          '',
          '  ► Anggaran sebulan (Rp)  : '
        );
        setStep('anggaran_nominal');
        return;
      }
      if (val === '0') {
        add(
          boxTop('SAMPAI JUMPA'),
          boxLine('Terima kasih sudah memakai aplikasi ini.'),
          boxLine('Semoga keuangannya aman sampai akhir bulan!'),
          boxBottom
        );
        setRunning(false);
        return;
      }
      add(pesan('X', 'Menu tidak ada, pilih nomor yang tersedia ya.'));
      return;
    }

    if (step === 'catat_kat') {
      const nomor = parseSimulatorInteger(val);
      if (nomor === null || nomor < 1 || nomor > KATEGORI.length) {
        add(pesan('X', `Pilihan tidak valid, masukkan nomor 1 sampai ${KATEGORI.length}.`));
        return;
      }
      setTemp((prev) => ({ ...prev, kat: KATEGORI[nomor - 1] }));
      add('  ► Jumlah pengeluaran (Rp) : ');
      setStep('catat_jml');
      return;
    }

    if (step === 'catat_jml') {
      const jumlah = parseSimulatorInteger(val, true);
      if (jumlah === null || jumlah <= 0) {
        add(pesan('X', SALAH_ANGKA));
        return;
      }
      const kat = temp.kat ?? 'Lainnya';
      const baru: Transaksi = { hari: hariAktif, jenis: 'keluar', kategori: kat, jumlah };
      setTransaksi((prev) => [...prev, baru]);
      add('', pesan('OK', `Tercatat: ${kat} ${rupiah(jumlah)}`));
      // Sama seperti menu_pengeluaran() di main.py: langsung cek_peringatan().
      const pengeluaranBaru = pengeluaranHariIni + jumlah;
      const infoBaru = statusHarian(pengeluaranBaru, jatah);
      const sisaHariBaru = jumlahHari - hariAktif + 1;
      const saldoBaru = saldo - jumlah;
      add(
        '',
        judulBagian(`STATUS HARI KE-${hariAktif} DARI ${jumlahHari}`),
        boxTop('RINGKASAN'),
        boxLine(barisNilai('Saldo sekarang', rupiah(saldoBaru))),
        boxLine(`  ${bar(saldoBaru, anggaran, 34)} ${persen(saldoBaru, anggaran)}% dari anggaran`),
        boxLine(),
        boxLine(barisNilai('Jatah harian', rupiah(jatah))),
        boxLine(barisNilai('Pengeluaran hari ini', rupiah(pengeluaranBaru))),
        boxLine(`  ${bar(pengeluaranBaru, jatah, 34)} ${persen(pengeluaranBaru, jatah)}% dari jatah`),
        boxBottom,
        boxTop(infoBaru.judul),
        boxLine(infoBaru.isi),
        boxBottom
      );
      if (saldoBaru < 0) {
        add(boxTop('SALDO MINUS'), boxLine('Segera kurangi pengeluaran.'), boxBottom);
      } else if (saldoBaru <= 0.2 * anggaran) {
        add(
          boxTop('SALDO MENIPIS'),
          boxLine('Saldo tinggal sedikit (kurang dari 20% anggaran).'),
          boxBottom
        );
      }
      if (sisaHariBaru > 0 && saldoBaru > 0) {
        add(
          '',
          pesan(
            'i',
            `Biar cukup sampai akhir bulan, maksimal pengeluaran ${rupiah(saldoBaru / sisaHariBaru)} per hari.`
          )
        );
      }
      add('', TUNGGU);
      setStep('tunggu');
      return;
    }

    if (step === 'pemasukan_sumber') {
      setTemp((prev) => ({ ...prev, sumber: val || 'Pemasukan lain' }));
      add('  ► Jumlah pemasukan (Rp)                  : ');
      setStep('pemasukan_jml');
      return;
    }

    if (step === 'pemasukan_jml') {
      const jumlah = parseSimulatorInteger(val, true);
      if (jumlah === null || jumlah <= 0) {
        add(pesan('X', SALAH_ANGKA));
        return;
      }
      const sumber = temp.sumber ?? 'Pemasukan lain';
      setTransaksi((prev) => [...prev, { hari: hariAktif, jenis: 'masuk', kategori: sumber, jumlah }]);
      add('', pesan('OK', `Tercatat: ${sumber} ${rupiah(jumlah)}`));
      add(pesan('i', `Saldo sekarang: ${rupiah(saldo + jumlah)}`));
      add('', TUNGGU);
      setStep('tunggu');
    }
  };

  const reset = () => {
    setHistory([
      'Simulasi menu Python (bukan interpreter Python)',
      '$ python main.py',
      ...judulBesar('Selamat datang!'),
      '',
      boxTop('ATUR ANGGARAN'),
      boxLine('Isi anggaran satu bulan (gaji, honor, atau kiriman).'),
      boxLine('Jatah harian akan dihitung otomatis.'),
      boxBottom,
      '',
      '  ► Anggaran sebulan (Rp)  : ',
    ]);
    setInputVal('');
    setStep('anggaran_nominal');
    setAnggaran(0);
    setJumlahHari(30);
    setHariAktif(1);
    setTransaksi([]);
    setTemp({});
    setRunning(true);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-950 shadow-[0_28px_60px_-30px_rgba(2,6,23,0.85)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/80 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950">
            <TermIcon className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-extrabold text-white">Simulator Terminal</p>
            <p className="text-[10px] text-slate-400">Simulasi menu 1-7 dan 0, bukan Python asli</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 rounded-full border border-emerald-900/60 bg-emerald-950/40 px-2 py-0.5 text-[9px] font-bold text-emerald-300 sm:flex">
            <Sparkles className="h-2.5 w-2.5" /> Simulasi menu
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-300 transition hover:bg-slate-700"
          >
            <RefreshCw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="code-scrollbar h-80 overflow-y-auto bg-[#05070f] px-3 py-3 font-mono text-[11px] leading-relaxed text-emerald-300/90 sm:h-96 sm:px-4 sm:text-xs"
        aria-live="polite"
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line || '\u00A0'}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (running) submit(inputVal);
        }}
        className="flex items-center gap-2 border-t border-slate-800 bg-slate-900/80 px-3 py-2.5"
      >
        <span className="font-mono text-xs text-emerald-400">►</span>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={!running}
          className="min-w-0 flex-1 bg-transparent font-mono text-xs text-slate-100 outline-none placeholder:text-slate-600 disabled:cursor-not-allowed"
          placeholder={running ? 'Ketik jawaban, lalu Enter…' : 'Program selesai. Klik Reset untuk mengulang.'}
          aria-label="Input simulator terminal"
        />
        <button
          type="submit"
          disabled={!running}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1 text-[10px] font-extrabold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-3 w-3" /> Kirim
        </button>
      </form>
    </div>
  );
};

export default TerminalSimulator;
