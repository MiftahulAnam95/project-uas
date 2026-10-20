import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, RefreshCw, Sparkles, Send } from 'lucide-react';
import { InteractiveFinancialApp } from '../../utils/pythonRunner';

export const TerminalSimulator: React.FC = () => {
  const [app, setApp] = useState(() => new InteractiveFinancialApp());
  const [history, setHistory] = useState<string[]>([
    'Python 3.11.4 (interactive sandbox)',
    '$ python main.py',
    'Selamat datang di Program Pencatat Keuangan Mahasiswa!',
    '========================================',
    ' PENCATAT KEUANGAN MAHASISWA (PYTHON)',
    '========================================',
    ' [1] Atur Anggaran Awal',
    ' [2] Catat Pengeluaran Baru',
    ' [3] Lihat Ringkasan & Status Hari Ini',
    ' [4] Lihat Laporan per Kategori',
    ' [5] Ganti ke Hari Berikutnya',
    ' [0] Keluar dari Program',
    '========================================',
  ]);
  const [inputVal, setInputVal] = useState('');
  const [inputStep, setInputStep] = useState<
    | 'menu'
    | 'anggaran_nominal'
    | 'anggaran_hari'
    | 'catat_kat'
    | 'catat_jml'
    | 'catat_ket'
  >('menu');

  // Temp form buffers
  const [tempAnggaran, setTempAnggaran] = useState<number>(0);
  const [tempKat, setTempKat] = useState<string>('');
  const [tempJml, setTempJml] = useState<number>(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const addLine = (line: string) => {
    setHistory((prev) => [...prev, line]);
  };

  const submitValue = (raw: string) => {
    const val = raw.trim();
    if (!val && inputStep === 'menu') return;

    addLine(`> ${raw}`);
    setInputVal('');

    if (inputStep === 'menu') {
      if (val === '1') {
        addLine('--- Pengaturan Anggaran ---');
        addLine('Masukkan anggaran bulanan (Rp):');
        setInputStep('anggaran_nominal');
      } else if (val === '2') {
        if (app.anggaran === 0) {
          addLine('[!] Harap atur anggaran terlebih dahulu di menu [1].');
          printMenu();
          return;
        }
        addLine(`--- Catat Pengeluaran (Hari ke-${app.hariAktif}) ---`);
        addLine('Pilihan kategori: [Makan, Transport, Kos, Kuliah, Hiburan, Lainnya]');
        addLine('Nama kategori pengeluaran:');
        setInputStep('catat_kat');
      } else if (val === '3') {
        const total = app.hitungTotalPengeluaran();
        const sisa = app.hitungSisaSaldo();
        const hariIni = app.hitungPengeluaranHariIni();
        const status = app.cekStatusHarian(hariIni, app.jatahHarian);

        addLine('');
        addLine('=============================================');
        addLine('           RINGKASAN KEUANGAN MAHASISWA');
        addLine('=============================================');
        addLine(` Hari Aktif           : Hari ke-${app.hariAktif}`);
        addLine(` Anggaran Awal        : ${app.formatRupiah(app.anggaran)}`);
        addLine(` Jatah Harian         : ${app.formatRupiah(app.jatahHarian)}`);
        addLine('---------------------------------------------');
        addLine(` Pengeluaran Hari Ini : ${app.formatRupiah(hariIni)}`);
        addLine(` Status Hari Ini      : ${status}`);
        addLine('---------------------------------------------');
        addLine(` Total Pengeluaran    : ${app.formatRupiah(total)}`);
        addLine(` Sisa Saldo           : ${app.formatRupiah(sisa)}`);
        addLine('=============================================');
        addLine('');
        printMenu();
      } else if (val === '4') {
        if (app.daftarTransaksi.length === 0) {
          addLine('\n[!] Belum ada transaksi yang dicatat.\n');
        } else {
          addLine('');
          addLine('-----------------------------------');
          addLine(' LAPORAN PENGELUARAN PER KATEGORI');
          addLine('-----------------------------------');
          const katMap: Record<string, number> = {};
          app.daftarTransaksi.forEach((t) => {
            katMap[t.kategori] = (katMap[t.kategori] || 0) + t.jumlah;
          });
          Object.entries(katMap).forEach(([k, total]) => {
            addLine(` - ${k.padEnd(16)} : ${app.formatRupiah(total)}`);
          });
          addLine('-----------------------------------');
          addLine('');
        }
        printMenu();
      } else if (val === '5') {
        const nextDay = app.gantiHari();
        addLine(`\n[>>] Berpindah ke Hari ke-${nextDay}! Semangat berhemat hari ini.\n`);
        printMenu();
      } else if (val === '0') {
        addLine('\nTerima kasih telah menggunakan program ini. Tetap bijak mengelola uang!');
        addLine('Program terminated.');
      } else {
        addLine('[!] Pilihan tidak valid. Silakan ketik angka antara 0 sampai 5.');
        printMenu();
      }
    } else if (inputStep === 'anggaran_nominal') {
      const num = parseInt(val, 10);
      if (isNaN(num) || num <= 0) {
        addLine('[!] Masukkan hanya angka bulat positif!');
        addLine('Masukkan anggaran bulanan (Rp):');
        return;
      }
      setTempAnggaran(num);
      addLine('Masukkan jumlah hari (contoh: 30):');
      setInputStep('anggaran_hari');
    } else if (inputStep === 'anggaran_hari') {
      const days = parseInt(val, 10);
      if (isNaN(days) || days <= 0) {
        addLine('[!] Hari harus lebih besar dari 0!');
        addLine('Masukkan jumlah hari (contoh: 30):');
        return;
      }
      app.aturAnggaran(tempAnggaran, days);
      addLine(`[OK] Anggaran berhasil diatur! Jatah harian: ${app.formatRupiah(app.jatahHarian)}\n`);
      setInputStep('menu');
      printMenu();
    } else if (inputStep === 'catat_kat') {
      setTempKat(val ? val.charAt(0).toUpperCase() + val.slice(1) : 'Lainnya');
      addLine('Jumlah pengeluaran (Rp):');
      setInputStep('catat_jml');
    } else if (inputStep === 'catat_jml') {
      const nominal = parseInt(val, 10);
      if (isNaN(nominal) || nominal <= 0) {
        addLine('[!] Masukkan hanya angka bulat positif!');
        addLine('Jumlah pengeluaran (Rp):');
        return;
      }
      setTempJml(nominal);
      addLine('Catatan tambahan (tekan enter jika kosong):');
      setInputStep('catat_ket');
    } else if (inputStep === 'catat_ket') {
      app.tambahTransaksi(tempKat, tempJml, val);
      addLine('[OK] Pengeluaran berhasil dicatat!\n');
      setInputStep('menu');
      printMenu();
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    submitValue(inputVal);
  };

  const printMenu = () => {
    addLine('========================================');
    addLine(' PENCATAT KEUANGAN MAHASISWA (PYTHON)');
    addLine('========================================');
    addLine(' [1] Atur Anggaran Awal');
    addLine(' [2] Catat Pengeluaran Baru');
    addLine(' [3] Lihat Ringkasan & Status Hari Ini');
    addLine(' [4] Lihat Laporan per Kategori');
    addLine(' [5] Ganti ke Hari Berikutnya');
    addLine(' [0] Keluar dari Program');
    addLine('========================================');
    addLine('Pilih menu (0-5):');
  };

  const handlePresetScenario = () => {
    const newApp = new InteractiveFinancialApp();
    newApp.aturAnggaran(3000000, 30);
    newApp.tambahTransaksi('Makan', 85000, 'Makan siang & es teh');
    newApp.tambahTransaksi('Transport', 40000, 'Ojek kampus');
    setApp(newApp);

    setHistory([
      'Python 3.11.4 (Simulasi Modul Dimuat)',
      '$ python main.py',
      '[!] Skenario modul berhasil dimuat:',
      ' - Anggaran Awal: Rp 3.000.000 / 30 Hari',
      ' - Jatah Harian: Rp 100.000',
      ' - Pengeluaran Hari 1: Makan (Rp 85.000) + Transport (Rp 40.000) = Rp 125.000',
      ' - Status: BOROS! (125% dari jatah harian)',
      '========================================',
      'Ketik [3] untuk melihat Ringkasan, [4] untuk Laporan Kategori, atau [5] untuk Ganti Hari!',
      'Pilih menu (0-5):',
    ]);
    setInputStep('menu');
  };

  const handleReset = () => {
    const fresh = new InteractiveFinancialApp();
    setApp(fresh);
    setHistory([
      'Python 3.11.4 (Reset)',
      '$ python main.py',
      'Selamat datang di Program Pencatat Keuangan Mahasiswa!',
      '========================================',
      ' PENCATAT KEUANGAN MAHASISWA (PYTHON)',
      '========================================',
      ' [1] Atur Anggaran Awal',
      ' [2] Catat Pengeluaran Baru',
      ' [3] Lihat Ringkasan & Status Hari Ini',
      ' [4] Lihat Laporan per Kategori',
      ' [5] Ganti ke Hari Berikutnya',
      ' [0] Keluar dari Program',
      '========================================',
      'Pilih menu (0-5):',
    ]);
    setInputStep('menu');
  };

  const QUICK_ACTIONS: Record<string, Array<{ label: string; value: string }>> = {
    menu: [
      { label: '1 · Anggaran', value: '1' },
      { label: '2 · Catat', value: '2' },
      { label: '3 · Ringkasan', value: '3' },
      { label: '4 · Laporan', value: '4' },
      { label: '5 · Ganti hari', value: '5' },
      { label: '0 · Keluar', value: '0' },
    ],
    anggaran_nominal: [
      { label: 'Rp 1.000.000', value: '1000000' },
      { label: 'Rp 2.000.000', value: '2000000' },
      { label: 'Rp 3.000.000', value: '3000000' },
    ],
    anggaran_hari: [
      { label: '28 hari', value: '28' },
      { label: '30 hari', value: '30' },
      { label: '31 hari', value: '31' },
    ],
    catat_kat: [
      { label: 'Makan', value: 'Makan' },
      { label: 'Transport', value: 'Transport' },
      { label: 'Kos', value: 'Kos' },
      { label: 'Kuliah', value: 'Kuliah' },
      { label: 'Hiburan', value: 'Hiburan' },
      { label: 'Lainnya', value: 'Lainnya' },
    ],
    catat_jml: [
      { label: 'Rp 25.000', value: '25000' },
      { label: 'Rp 50.000', value: '50000' },
      { label: 'Rp 125.000', value: '125000' },
    ],
    catat_ket: [
      { label: 'Makan siang', value: 'Makan siang' },
      { label: 'Ojek kampus', value: 'Ojek kampus' },
      { label: '(kosong)', value: '' },
    ],
  };

  const quick = QUICK_ACTIONS[inputStep] || QUICK_ACTIONS.menu;

  return (
    <div className="group relative my-6 overflow-hidden rounded-4xl border border-slate-700/60 bg-slate-950 shadow-[0_40px_90px_-40px_rgba(2,6,23,0.95)]">
      {/* Pita gradasi atas */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400 anim-pan"
        style={{ backgroundSize: '200% 100%' }}
      />

      {/* ---------- Bar judul ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-900/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/85" />
          </div>
          <span className="ml-1 flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-300">
            <TermIcon className="h-3.5 w-3.5 text-aqua-400" />
            mahasiswa@terminal: ~/keuangan_mahasiswa
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5 text-emerald-400">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            live
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePresetScenario}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-brand-500/40 bg-brand-500/15 px-2.5 py-1 text-[11px] font-bold text-brand-200 transition hover:border-brand-400 hover:bg-brand-500/25 hover:text-white"
            title="Muat contoh skenario anggaran Rp3 juta dari modul"
          >
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">Muat Skenario Modul</span>
            <span className="sm:hidden">Skenario</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[11px] font-bold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            title="Mulai ulang terminal"
          >
            <RefreshCw className="h-3 w-3" />
            Reset
          </button>
        </div>
      </div>

      {/* ---------- Layar terminal ---------- */}
      <div
        ref={scrollRef}
        className="code-scrollbar h-80 space-y-1 overflow-y-auto bg-[radial-gradient(120%_100%_at_50%_0%,rgba(106,90,232,0.12),transparent_60%),#05070f] p-4 font-mono text-xs leading-relaxed text-slate-200 selection:bg-brand-500 selection:text-white sm:h-96 sm:p-5 sm:text-[13px]"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap break-words ${
              line.startsWith('>')
                ? 'rounded-md bg-amber-400/10 px-1.5 font-bold text-amber-300'
                : line.includes('BOROS!')
                ? 'font-bold text-rose-400'
                : line.includes('WASPADA')
                ? 'font-semibold text-amber-300'
                : line.includes('AMAN')
                ? 'font-semibold text-emerald-400'
                : line.startsWith('[OK]')
                ? 'text-emerald-400'
                : line.startsWith('[!]')
                ? 'text-rose-400'
                : line.startsWith('[>>]')
                ? 'text-sky-300'
                : line.startsWith('=')
                ? 'text-aqua-400/70'
                : line.startsWith('Pilih menu')
                ? 'font-bold text-white'
                : 'text-slate-300'
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      {/* ---------- Pintasan cepat ---------- */}
      <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-800 bg-slate-900/60 px-3 py-2.5">
        <span className="mr-1 hidden text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500 sm:inline">
          Pintasan
        </span>
        {quick.map((q) => (
          <button
            key={q.label}
            type="button"
            onClick={() => submitValue(q.value)}
            className="cursor-pointer rounded-lg border border-slate-700/80 bg-slate-800/60 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-300 transition hover:-translate-y-px hover:border-aqua-400/50 hover:bg-aqua-400/10 hover:text-aqua-200 active:scale-95"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* ---------- Baris input ---------- */}
      <form
        onSubmit={handleCommand}
        className="flex items-center gap-2 border-t border-slate-800 bg-slate-900/90 p-3"
      >
        <span className="select-none pl-1 font-mono text-xs text-emerald-400 sm:text-sm">
          ❯
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={
            inputStep === 'menu'
              ? 'Ketik angka menu (1-5, atau 0 untuk keluar) lalu Enter…'
              : 'Ketik jawabanmu lalu tekan Enter…'
          }
          aria-label="Masukkan perintah terminal"
          className="flex-1 border-0 bg-transparent font-mono text-xs text-white caret-aqua-400 outline-none placeholder:text-slate-600 focus:ring-0 sm:text-[13px]"
          autoFocus
        />
        <button
          type="submit"
          className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-grape-500 px-3 py-2 text-[11px] font-extrabold text-white shadow-[0_10px_22px_-12px_rgba(106,90,232,0.95)] transition hover:brightness-110 active:scale-95"
          aria-label="Kirim perintah"
        >
          <Send className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Enter</span>
        </button>
      </form>
    </div>
  );
};
