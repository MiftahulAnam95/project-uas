import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, RefreshCw, Send, Sparkles } from 'lucide-react';

type Step =
  | 'menu'
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

const rupiah = (n: number) => 'Rp' + Math.round(n).toLocaleString('id-ID');
const bar = (nilai: number, maksimal: number, panjang = 20) => {
  const rasio = maksimal > 0 ? Math.max(0, Math.min(1, nilai / maksimal)) : 0;
  const terisi = Math.round(rasio * panjang);
  return '█'.repeat(terisi) + '░'.repeat(panjang - terisi);
};
const statusHarian = (keluar: number, jatah: number) => {
  if (jatah <= 0) return 'BELUM DIATUR';
  if (keluar > jatah) return 'BOROS!';
  if (keluar >= 0.8 * jatah) return 'HATI-HATI';
  return 'AMAN';
};

export const TerminalSimulator: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'Python 3.11.4 (interactive sandbox)',
    '$ python main.py',
    'Selamat datang di Program Pencatat Keuangan Mahasiswa!',
    '',
    '┌─ ATUR ANGGARAN ──────────────────────────────────────────────┐',
    '│ Isi anggaran satu bulan (gaji, honor, atau kiriman).         │',
    '│ Jatah harian akan dihitung otomatis.                         │',
    '└──────────────────────────────────────────────────────────────┘',
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
  const status = statusHarian(pengeluaranHariIni, jatah);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const add = (...lines: string[]) => setHistory((prev) => [...prev, ...lines]);
  const addAndReset = (...lines: string[]) => {
    add(...lines);
    setInputVal('');
  };

  const tampilMenu = () => {
    add(
      '',
      '╔══════════════════════════════════════════════════════════════╗',
      '║                 PENCATAT KEUANGAN MAHASISWA                  ║',
      '║           Catat, pantau, dan hemat uang bulananmu            ║',
      '╚══════════════════════════════════════════════════════════════╝',
      '',
      `  Hari ke-${hariAktif} dari ${jumlahHari}   │   Saldo ${rupiah(saldo)}   │   Jatah ${rupiah(jatah)}`,
      `  ${bar(hariAktif, jumlahHari, 40)}  perjalanan bulan`,
      '',
      '┌─ MENU ───────────────────────────────────────────────────────┐',
      ...MENU.map(([nomor, nama]) => `│ [${nomor}]  ${nama.padEnd(56)}│`),
      '└──────────────────────────────────────────────────────────────┘',
      '',
      '  ► Pilih menu : '
    );
    setStep('menu');
  };

  const ringkasan = () => {
    add(
      '',
      `── STATUS HARI KE-${hariAktif} DARI ${jumlahHari} ────────────────────────────────`,
      '┌─ RINGKASAN ──────────────────────────────────────────────────┐',
      `│ Saldo sekarang        ${rupiah(saldo).padEnd(28)}│`,
      `│   ${bar(saldo, anggaran, 34)} ${String(Math.round((saldo / (anggaran || 1)) * 100)).padStart(3)}% dari anggaran`,
      '│                                                              │',
      `│ Jatah harian          ${rupiah(jatah).padEnd(28)}│`,
      `│ Pengeluaran hari ini  ${rupiah(pengeluaranHariIni).padEnd(28)}│`,
      `│   ${bar(pengeluaranHariIni, jatah, 34)} ${String(Math.round((pengeluaranHariIni / (jatah || 1)) * 100)).padStart(3)}% dari jatah`,
      '└──────────────────────────────────────────────────────────────┘',
      `┌─ ${status} ${'─'.repeat(Math.max(0, 60 - status.length))}┐`,
      `│ Status hari ini: ${status}`,
      '└──────────────────────────────────────────────────────────────┘',
      '',
      '  Tekan Enter untuk kembali ke menu...'
    );
    setStep('menu');
    setRunning(false);
  };

  const riwayat = () => {
    add('', '── RIWAYAT TRANSAKSI ───────────────────────────────────────────');
    if (transaksi.length === 0) {
      add('  Belum ada transaksi.');
    } else {
      add('┌─────┬──────┬─────────────────┬───────────────┬───────────────┐');
      add('│  No │ Hari │ Keterangan      │         Masuk │        Keluar │');
      add('├─────┼──────┼─────────────────┼───────────────┼───────────────┤');
      transaksi.forEach((t, i) => {
        add(
          `│ ${String(i + 1).padEnd(3)} │ ${String(t.hari).padEnd(4)} │ ${t.kategori
            .slice(0, 15)
            .padEnd(15)} │ ${(t.jenis === 'masuk' ? rupiah(t.jumlah) : '-').padStart(13)} │ ${(
            t.jenis === 'keluar' ? rupiah(t.jumlah) : '-'
          ).padStart(13)} │`
        );
      });
      add('├─────┼──────┼─────────────────┼───────────────┼───────────────┤');
      add(
        `│     │      │ TOTAL           │ ${rupiah(
          transaksi.filter((t) => t.jenis === 'masuk').reduce((a, t) => a + t.jumlah, 0)
        ).padStart(13)} │ ${rupiah(totalKeluar).padStart(13)} │`
      );
      add('└─────┴──────┴─────────────────┴───────────────┴───────────────┘');
    }
    add('', '  Tekan Enter untuk kembali ke menu...');
    setStep('menu');
    setRunning(false);
  };

  const laporanKategori = () => {
    add('', '── LAPORAN PENGELUARAN PER KATEGORI ─────────────────────────');
    const total: Record<string, number> = {};
    transaksi.forEach((t) => {
      if (t.jenis === 'keluar') total[t.kategori] = (total[t.kategori] || 0) + t.jumlah;
    });
    const semua = Object.values(total).reduce((a, b) => a + b, 0);
    if (semua === 0) {
      add('  Belum ada pengeluaran.');
    } else {
      add('┌─ PER KATEGORI ───────────────────────────────────────────────┐');
      Object.entries(total)
        .sort((a, b) => b[1] - a[1])
        .forEach(([kat, jumlah]) => {
          const persen = Math.round((jumlah / semua) * 100);
          add(
            `│ ${kat.padEnd(14)}${bar(jumlah, semua, 15)} ${String(persen).padStart(3)}% ${rupiah(
              jumlah
            ).padStart(12)} │`
          );
        });
      add('└──────────────────────────────────────────────────────────────┘');
      add('', `  Total pengeluaran ${rupiah(semua)}`);
    }
    add('', '  Tekan Enter untuk kembali ke menu...');
    setStep('menu');
    setRunning(false);
  };

  const submit = (raw: string) => {
    const val = raw.trim();
    add(`> ${raw}`);
    setInputVal('');

    if (step === 'anggaran_nominal') {
      const nominal = Number(val.replace(/\./g, ''));
      if (!Number.isFinite(nominal) || nominal <= 0) {
        add('  [X] Input salah, masukkan angka bulat lebih dari 0 ya.');
        return;
      }
      setAnggaran(nominal);
      setTemp((prev) => ({ ...prev, anggaran: nominal }));
      add('  ► Jumlah hari sebulan    : ');
      setStep('anggaran_hari');
      return;
    }

    if (step === 'anggaran_hari') {
      const hari = Number(val.replace(/\./g, ''));
      if (!Number.isFinite(hari) || hari <= 0) {
        add('  [X] Input salah, masukkan angka bulat lebih dari 0 ya.');
        return;
      }
      const nominal = temp.anggaran ?? 0;
      setJumlahHari(hari);
      setHariAktif(1);
      setTransaksi([{ hari: 1, jenis: 'masuk', kategori: 'Anggaran', jumlah: nominal }]);
      add('', '  [OK] Anggaran tersimpan.');
      add(`  [i] Jatah harian kamu: ${rupiah(nominal / hari)}`);
      add('', '  Tekan Enter untuk kembali ke menu...');
      setStep('menu');
      setRunning(false);
      return;
    }

    if (step === 'menu') {
      if (val === '') return;
      if (val === '1') {
        add('', '── CATAT PENGELUARAN ───────────────────────────────────────────');
        add('┌─ PILIH KATEGORI ─────────────────────────────────────────────┐');
        KATEGORI.forEach((k, i) => add(`│ [${i + 1}]  ${k.padEnd(56)}│`));
        add('└──────────────────────────────────────────────────────────────┘');
        add('  ► Nomor kategori          : ');
        setStep('catat_kat');
        return;
      }
      if (val === '2') {
        add('', '── CATAT PEMASUKAN ─────────────────────────────────────────────');
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
          add('', '  [i] Ini sudah hari terakhir. Cek laporan akhir di menu 5.');
        } else {
          setHariAktif((h) => h + 1);
          add('', `  [OK] Masuk ke hari ke-${hariAktif + 1}.`);
          add(`  [i] Jatah hari ini: ${rupiah(jatah)}`);
        }
        add('', '  Tekan Enter untuk kembali ke menu...');
        setStep('menu');
        setRunning(false);
        return;
      }
      if (val === '7') {
        add('', '┌─ ATUR ANGGARAN ──────────────────────────────────────────────┐');
        add('│ Isi anggaran satu bulan (gaji, honor, atau kiriman).         │');
        add('│ Perhatian: catatan lama akan dihapus.                        │');
        add('└──────────────────────────────────────────────────────────────┘');
        add('  ► Anggaran sebulan (Rp)  : ');
        setStep('anggaran_nominal');
        return;
      }
      if (val === '0') {
        add(
          '',
          '┌─ SAMPAI JUMPA ───────────────────────────────────────────────┐',
          '│ Terima kasih sudah memakai aplikasi ini.                     │',
          '│ Semoga keuangannya aman sampai akhir bulan!                  │',
          '└──────────────────────────────────────────────────────────────┘'
        );
        setRunning(false);
        return;
      }
      add('  [X] Menu tidak ada, pilih nomor yang tersedia ya.');
      return;
    }

    if (step === 'catat_kat') {
      const nomor = Number(val);
      if (!Number.isFinite(nomor) || nomor < 1 || nomor > KATEGORI.length) {
        add(`  [X] Pilihan tidak valid, masukkan nomor 1 sampai ${KATEGORI.length}.`);
        return;
      }
      setTemp((prev) => ({ ...prev, kat: KATEGORI[nomor - 1] }));
      add('  ► Jumlah pengeluaran (Rp) : ');
      setStep('catat_jml');
      return;
    }

    if (step === 'catat_jml') {
      const jumlah = Number(val.replace(/\./g, ''));
      if (!Number.isFinite(jumlah) || jumlah <= 0) {
        add('  [X] Input salah, masukkan angka bulat lebih dari 0 ya.');
        return;
      }
      const kat = temp.kat ?? 'Lainnya';
      const baru: Transaksi = { hari: hariAktif, jenis: 'keluar', kategori: kat, jumlah };
      setTransaksi((prev) => [...prev, baru]);
      add('', `  [OK] Tercatat: ${kat} ${rupiah(jumlah)}`);
      const pengeluaranBaru = pengeluaranHariIni + jumlah;
      const statusBaru = statusHarian(pengeluaranBaru, jatah);
      add(`┌─ ${statusBaru} ${'─'.repeat(Math.max(0, 60 - statusBaru.length))}┐`);
      add(`│ Status hari ini: ${statusBaru}`);
      add('└──────────────────────────────────────────────────────────────┘');
      add('', '  Tekan Enter untuk kembali ke menu...');
      setStep('menu');
      setRunning(false);
      return;
    }

    if (step === 'pemasukan_sumber') {
      setTemp((prev) => ({ ...prev, sumber: val || 'Pemasukan lain' }));
      add('  ► Jumlah pemasukan (Rp)                  : ');
      setStep('pemasukan_jml');
      return;
    }

    if (step === 'pemasukan_jml') {
      const jumlah = Number(val.replace(/\./g, ''));
      if (!Number.isFinite(jumlah) || jumlah <= 0) {
        add('  [X] Input salah, masukkan angka bulat lebih dari 0 ya.');
        return;
      }
      const sumber = temp.sumber ?? 'Pemasukan lain';
      setTransaksi((prev) => [...prev, { hari: hariAktif, jenis: 'masuk', kategori: sumber, jumlah }]);
      add('', `  [OK] Tercatat: ${sumber} ${rupiah(jumlah)}`);
      add(`  [i] Saldo sekarang: ${rupiah(saldo + jumlah)}`);
      add('', '  Tekan Enter untuk kembali ke menu...');
      setStep('menu');
      setRunning(false);
    }
  };

  const reset = () => {
    setHistory([
      'Python 3.11.4 (interactive sandbox)',
      '$ python main.py',
      'Selamat datang di Program Pencatat Keuangan Mahasiswa!',
      '',
      '┌─ ATUR ANGGARAN ──────────────────────────────────────────────┐',
      '│ Isi anggaran satu bulan (gaji, honor, atau kiriman).         │',
      '│ Jatah harian akan dihitung otomatis.                         │',
      '└──────────────────────────────────────────────────────────────┘',
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
            <p className="text-[10px] text-slate-400">Simulasi main.py dengan menu 1-7 dan 0</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 rounded-full border border-emerald-900/60 bg-emerald-950/40 px-2 py-0.5 text-[9px] font-bold text-emerald-300 sm:flex">
            <Sparkles className="h-2.5 w-2.5" /> Python sandbox
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
