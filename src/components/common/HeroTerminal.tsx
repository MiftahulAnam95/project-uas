import React from 'react';
import { cn } from '../../utils/cn';

interface ScriptLine {
  text: string;
  cls?: string;
}

/** Potret sesi program pencatat keuangan — ditampilkan utuh, tanpa animasi. */
const SCRIPT: ScriptLine[] = [
  { text: '$ python main.py', cls: 'text-slate-400' },
  { text: '=========================================', cls: 'text-cyan-300/70' },
  { text: '   PENCATAT KEUANGAN MAHASISWA', cls: 'text-white font-bold' },
  { text: '=========================================', cls: 'text-cyan-300/70' },
  { text: ' [1] Atur Anggaran Awal', cls: 'text-slate-300' },
  { text: ' [2] Catat Pengeluaran Baru', cls: 'text-slate-300' },
  { text: ' [3] Lihat Ringkasan Hari Ini', cls: 'text-slate-300' },
  { text: '> 1', cls: 'text-amber-300 font-semibold' },
  { text: 'Anggaran bulanan (Rp): 3000000', cls: 'text-slate-300' },
  { text: 'Jumlah hari          : 30', cls: 'text-slate-300' },
  { text: '> 2', cls: 'text-amber-300 font-semibold' },
  { text: 'Kategori : Makan', cls: 'text-slate-300' },
  { text: 'Jumlah   : 125000', cls: 'text-slate-300' },
  { text: '-----------------------------------------', cls: 'text-slate-600' },
  { text: ' Jatah harian  : Rp 100.000', cls: 'text-slate-300' },
  { text: ' Hari ini      : Rp 125.000', cls: 'text-slate-300' },
  { text: ' Status        : BOROS! ⚠', cls: 'text-rose-300 font-bold' },
  { text: ' Sisa saldo    : Rp 2.875.000', cls: 'text-emerald-300 font-semibold' },
  { text: '=========================================', cls: 'text-cyan-300/70' },
  { text: '✓ 3 file terhubung: pencatat · laporan · main', cls: 'text-emerald-400/90 italic' },
];

interface HeroTerminalProps {
  className?: string;
}

/**
 * Terminal statis untuk hero: seluruh baris langsung tampil tanpa efek
 * mengetik, tanpa mengulang, dan tanpa menggulir sendiri. Pembaca bisa
 * fokus membaca isi terminal tanpa distraksi animasi.
 */
export const HeroTerminal: React.FC<HeroTerminalProps> = ({ className = '' }) => {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950/95 shadow-[0_40px_80px_-32px_rgba(2,6,23,0.9)]',
        className
      )}
    >
      {/* Bar judul jendela */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 sm:text-xs">
            keuangan_mahasiswa — <span className="text-slate-200">main.py</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300/90 sm:text-[11px]">
            selesai
          </span>
        </div>
      </div>

      {/* Isi terminal — statis, semua baris terlihat tanpa scroll */}
      <div className="p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-xs">
        {SCRIPT.map((line, idx) => (
          <div
            key={idx}
            className={cn('whitespace-pre-wrap break-words', line.cls || 'text-slate-300')}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroTerminal;
