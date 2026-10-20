import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

interface ScriptLine {
  text: string;
  cls?: string;
  /** Jeda ekstra (ms) sebelum mengetik baris ini */
  pause?: number;
}

/** Skenario singkat: pengguna menjalankan program pencatat keuangan. */
const SCRIPT: ScriptLine[] = [
  { text: '$ python main.py', cls: 'text-slate-400', pause: 320 },
  { text: '=========================================', cls: 'text-cyan-300/70', pause: 120 },
  { text: '   PENCATAT KEUANGAN MAHASISWA', cls: 'text-white font-bold', pause: 120 },
  { text: '=========================================', cls: 'text-cyan-300/70', pause: 200 },
  { text: ' [1] Atur Anggaran Awal', cls: 'text-slate-300' },
  { text: ' [2] Catat Pengeluaran Baru', cls: 'text-slate-300' },
  { text: ' [3] Lihat Ringkasan Hari Ini', cls: 'text-slate-300', pause: 260 },
  { text: '> 1', cls: 'text-amber-300 font-semibold', pause: 300 },
  { text: 'Anggaran bulanan (Rp): 3000000', cls: 'text-slate-300', pause: 160 },
  { text: 'Jumlah hari          : 30', cls: 'text-slate-300', pause: 260 },
  { text: '> 2', cls: 'text-amber-300 font-semibold', pause: 240 },
  { text: 'Kategori : Makan', cls: 'text-slate-300' },
  { text: 'Jumlah   : 125000', cls: 'text-slate-300', pause: 300 },
  { text: '-----------------------------------------', cls: 'text-slate-600' },
  { text: ' Jatah harian  : Rp 100.000', cls: 'text-slate-300' },
  { text: ' Hari ini      : Rp 125.000', cls: 'text-slate-300' },
  { text: ' Status        : BOROS! ⚠', cls: 'text-rose-300 font-bold', pause: 260 },
  { text: ' Sisa saldo    : Rp 2.875.000', cls: 'text-emerald-300 font-semibold' },
  { text: '=========================================', cls: 'text-cyan-300/70', pause: 200 },
  { text: '✓ 3 file terhubung: pencatat · laporan · main', cls: 'text-emerald-400/90 italic' },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

interface TypingTerminalProps {
  className?: string;
  /** Kecepatan ketik per karakter (ms) */
  speed?: number;
  /** Jeda sebelum mengulang (ms) */
  loopDelay?: number;
}

/**
 * Terminal simulator yang "mengetik sendiri" — memberi nyawa pada hero
 * tanpa mengganggu keterbacaan. Otomatis berhenti saat tidak terlihat
 * dan langsung menampilkan hasil penuh bila pengguna memilih reduced-motion.
 */
export const TypingTerminal: React.FC<TypingTerminalProps> = ({
  className = '',
  speed = 13,
  loopDelay = 5200,
}) => {
  const reduced = usePrefersReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  const offsets = useMemo(() => {
    const arr: number[] = [];
    let acc = 0;
    SCRIPT.forEach((l) => {
      arr.push(acc);
      acc += l.text.length + 1; // +1 untuk jeda antar baris
    });
    return arr;
  }, []);

  const total = useMemo(
    () => offsets[offsets.length - 1] + SCRIPT[SCRIPT.length - 1].text.length,
    [offsets]
  );

  const [count, setCount] = useState(0);

  // Hentikan animasi saat panel keluar dari viewport
  useEffect(() => {
    const node = boxRef.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setCount(total);
      return;
    }
    if (!inView) return;
    if (count >= total) {
      const t = window.setTimeout(() => setCount(0), loopDelay);
      return () => window.clearTimeout(t);
    }

    // Cari baris aktif untuk memutuskan jeda
    let lineIdx = 0;
    for (let i = 0; i < offsets.length; i++) {
      if (count >= offsets[i]) lineIdx = i;
    }
    const lineStart = offsets[lineIdx];
    const atLineStart = count === lineStart;
    const chunk = atLineStart ? 1 : 2;
    const delay = atLineStart ? (SCRIPT[lineIdx].pause ?? 0) + speed : speed;

    const t = window.setTimeout(() => {
      setCount((c) => Math.min(total, c + chunk));
    }, delay);
    return () => window.clearTimeout(t);
  }, [count, total, reduced, inView, loopDelay, offsets, speed]);

  const done = count >= total;

  // Pastikan baris terbaru selalu terlihat saat terminal mulai penuh
  useEffect(() => {
    const node = screenRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [count]);

  return (
    <div
      ref={boxRef}
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
          <span className="relative flex h-1.5 w-1.5 text-emerald-400">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300/90 sm:text-[11px]">
            {done ? 'selesai' : 'menjalankan…'}
          </span>
        </div>
      </div>

      {/* Isi terminal */}
      <div
        ref={screenRef}
        className="code-scrollbar max-h-72 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-xs"
      >
        {SCRIPT.map((line, idx) => {
          const start = offsets[idx];
          const visible = Math.max(0, Math.min(line.text.length, count - start));
          if (visible <= 0) return null;
          const isCurrent = count < start + line.text.length;
          return (
            <div
              key={idx}
              className={cn(
                'whitespace-pre-wrap break-words',
                line.cls || 'text-slate-300',
                isCurrent && !reduced && 'caret'
              )}
            >
              {line.text.slice(0, visible)}
            </div>
          );
        })}
        {done && !reduced && (
          <div className="mt-1 text-slate-500 caret" aria-hidden="true">
            &gt;
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTerminal;
