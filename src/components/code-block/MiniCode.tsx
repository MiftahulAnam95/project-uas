import React from 'react';
import { FileCode2, TerminalSquare } from 'lucide-react';
import { highlightCode } from '../../utils/highlightSyntax';
import { cn } from '../../utils/cn';

interface MiniCodeProps {
  code: string;
  label?: string;
  /** Nada warna: netral, berbahaya (kode salah), sukses (kode benar) */
  tone?: 'neutral' | 'danger' | 'success' | 'info';
  className?: string;
  /** Tampilkan sebagai keluaran terminal (teks hijau, tanpa pewarna sintaks) */
  asOutput?: boolean;
}

const toneRing = {
  neutral: 'border-slate-700/60',
  danger: 'border-rose-700/50',
  success: 'border-emerald-700/50',
  info: 'border-sky-700/50',
} as const;

const toneLabel = {
  neutral: 'text-slate-400',
  danger: 'text-rose-300',
  success: 'text-emerald-300',
  info: 'text-sky-300',
} as const;

/** Potongan kode gelap ringkas untuk latihan, kuis, dan contoh error. */
export const MiniCode: React.FC<MiniCodeProps> = ({
  code,
  label,
  tone = 'neutral',
  className = '',
  asOutput = false,
}) => {
  return (
    <div
      className={cn(
        'code-scrollbar my-3 overflow-hidden rounded-2xl border bg-[#0a0e1c] shadow-[0_16px_36px_-24px_rgba(2,6,23,0.9)]',
        toneRing[tone],
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/70 px-3 py-1.5">
        <span className="flex items-center gap-1.5">
          {asOutput ? (
            <TerminalSquare className={cn('h-3 w-3', toneLabel[tone])} />
          ) : (
            <FileCode2 className={cn('h-3 w-3', toneLabel[tone])} />
          )}
          <span
            className={cn(
              'font-mono text-[10px] font-bold uppercase tracking-[0.14em]',
              toneLabel[tone]
            )}
          >
            {label || (asOutput ? 'output terminal' : 'python')}
          </span>
        </span>
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
        </span>
      </div>
      <pre
        className={cn(
          'overflow-x-auto px-3 py-2.5 font-mono text-[11px] leading-relaxed sm:text-xs',
          asOutput ? 'whitespace-pre-wrap text-emerald-300/90' : 'text-slate-200'
        )}
      >
        <code>{asOutput ? code : highlightCode(code)}</code>
      </pre>
    </div>
  );
};

export default MiniCode;
