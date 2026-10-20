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

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputVal.trim();
    if (!val && inputStep === 'menu') return;

    addLine(`> ${inputVal}`);
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

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden my-6">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="font-mono font-medium text-slate-300 ml-2 flex items-center gap-1.5">
            <TermIcon className="w-3.5 h-3.5 text-indigo-400" />
            Terminal Eksekusi Python (main.py)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePresetScenario}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-indigo-900/40 hover:bg-indigo-800/60 text-indigo-300 border border-indigo-700/50 rounded-md transition cursor-pointer"
            title="Muat contoh skenario anggaran Rp3jt dari modul"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Muat Skenario Modul</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition cursor-pointer"
            title="Bersihkan terminal"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div
        ref={scrollRef}
        className="p-4 sm:p-5 h-80 sm:h-96 overflow-y-auto font-mono text-xs sm:text-sm text-slate-200 space-y-1 leading-relaxed bg-black/90 selection:bg-indigo-600 selection:text-white"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              line.startsWith('>')
                ? 'text-amber-400 font-bold'
                : line.includes('BOROS!')
                ? 'text-rose-400 font-bold'
                : line.includes('WASPADA')
                ? 'text-amber-300 font-semibold'
                : line.includes('AMAN')
                ? 'text-emerald-400 font-semibold'
                : line.startsWith('[OK]')
                ? 'text-emerald-400'
                : line.startsWith('[!]')
                ? 'text-rose-400'
                : line.startsWith('[>>]')
                ? 'text-sky-300'
                : 'text-slate-300'
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Terminal Input Prompt */}
      <form
        onSubmit={handleCommand}
        className="bg-slate-900 p-3 border-t border-slate-800 flex items-center gap-2"
      >
        <span className="text-emerald-400 font-mono text-xs sm:text-sm pl-2 select-none">
           mahasiswa@terminal:~$
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={
            inputStep === 'menu'
              ? 'Ketik angka menu (contoh: 1, 2, 3, 4, 5, 0) lalu tekan Enter...'
              : 'Ketik input lalu tekan Enter...'
          }
          className="flex-1 bg-transparent border-0 text-white font-mono text-xs sm:text-sm focus:outline-hidden focus:ring-0 placeholder:text-slate-600"
          autoFocus
        />
        <button
          type="submit"
          className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition active:scale-95 cursor-pointer"
          aria-label="Kirim perintah"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
