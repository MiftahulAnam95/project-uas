import React from 'react';
import { Check, BookOpen, Sparkles, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { CHAPTERS } from '../../data/lessons';
import { ChapterId } from '../../types';
import { accentForChapter } from '../../theme/accents';
import { ProgressRing } from '../common/ProgressRing';
import { cn } from '../../utils/cn';

interface SidebarProps {
  currentChapterId: ChapterId;
  onSelectChapter: (chapterId: ChapterId) => void;
  completedChapters: ChapterId[];
  className?: string;
  /** Tampilkan mode ramping (ikon bab saja) — dipakai desktop */
  collapsed?: boolean;
  /** Dipanggil saat tombol minimize/maximize ditekan. Bila tidak diisi, tombol tidak tampil */
  onToggleCollapsed?: () => void;
}

/** Daftar bab di sisi kiri: tiap bab punya warna identitas sendiri. */
export const Sidebar: React.FC<SidebarProps> = ({
  currentChapterId,
  onSelectChapter,
  completedChapters,
  className = '',
  collapsed = false,
  onToggleCollapsed,
}) => {
  const total = CHAPTERS.length;
  const done = completedChapters.length;
  const pct = Math.round((done / total) * 100);

  // ---------- Mode ramping (minimized): hanya ikon bab ----------
  if (collapsed) {
    return (
      <aside
        className={cn(
          'flex h-full flex-col items-center overflow-hidden bg-white/95 py-3 backdrop-blur-sm',
          className
        )}
        aria-label="Daftar Bab (mode ramping)"
      >
        {/* Tombol maximize */}
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label="Perbesar Daftar Bab"
          aria-expanded={false}
          title="Perbesar Daftar Bab"
          className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-500 shadow-soft transition-all duration-200 hover:-translate-y-px hover:border-brand-200 hover:text-brand-600 hover:shadow-[0_10px_24px_-12px_rgba(106,90,232,0.55)]"
        >
          <PanelLeftOpen className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110" strokeWidth={2.2} />
        </button>

        {/* Cincin progres ringkas */}
        <div className="mt-3" title={`Progres belajar: ${done} dari ${total} bab selesai (${pct}%)`}>
          <ProgressRing
            value={pct}
            size={36}
            stroke={4}
            label={
              <span className="text-[9px] font-extrabold tabular text-slate-700">
                {pct}%
              </span>
            }
          />
        </div>

        <div
          aria-hidden="true"
          className="my-3 h-px w-8 bg-gradient-to-r from-transparent via-slate-200 to-transparent"
        />

        {/* Daftar ikon bab */}
        <nav className="thin-scrollbar flex flex-1 flex-col items-center gap-1.5 overflow-y-auto px-1.5 pb-1">
          {CHAPTERS.map((chap) => {
            const isCurrent = chap.id === currentChapterId;
            const isDone = completedChapters.includes(chap.id);
            const accent = accentForChapter(chap.number);

            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => onSelectChapter(chap.id)}
                aria-current={isCurrent ? 'true' : undefined}
                aria-label={`Bab ${chap.number} — ${chap.title}`}
                title={`Bab ${chap.number} — ${chap.title}`}
                className={cn(
                  'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-[11px] font-extrabold tabular transition-all duration-200',
                  isDone
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-[0_6px_14px_-6px_rgba(5,150,105,0.9)] hover:scale-110'
                    : isCurrent
                    ? cn(
                        'scale-110 bg-gradient-to-br text-white shadow-md ring-2 ring-slate-900/10',
                        accent.iconTile
                      )
                    : 'bg-slate-100 text-slate-500 hover:scale-110 hover:bg-slate-200 hover:text-slate-700'
                )}
              >
                {isDone ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  chap.number
                )}
              </button>
            );
          })}
        </nav>

        {/* Kaki: ringkasan jumlah */}
        <div
          className="mt-2 rounded-lg bg-slate-50 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-400 tabular"
          title={`${done} dari ${total} bab selesai`}
        >
          {done}/{total}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        'flex h-full flex-col overflow-hidden bg-white/95 backdrop-blur-sm',
        className
      )}
    >
      {/* ---------- Kepala sidebar ---------- */}
      <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-brand-50 via-white to-white p-4">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-grape-200/40 blur-2xl"
        />
        <div className="relative flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-grape-500 text-white shadow-[0_8px_20px_-8px_rgba(106,90,232,0.9)]">
              <BookOpen className="h-4.5 w-4.5" strokeWidth={2.3} />
            </span>
            <div className="leading-tight">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Daftar Bab
              </h2>
              <p className="text-[11px] font-medium text-slate-500">
                {done === total ? 'Semua bab tuntas 🎉' : `${total - done} bab lagi`}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <ProgressRing
              value={pct}
              size={38}
              stroke={4.5}
              label={
                <span className="text-[10px] font-extrabold tabular text-slate-700">
                  {done}/{total}
                </span>
              }
            />
            {onToggleCollapsed && (
              <button
                type="button"
                onClick={onToggleCollapsed}
                aria-label="Perkecil Daftar Bab"
                aria-expanded={true}
                title="Perkecil Daftar Bab — perlebar area materi"
                className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-400 transition-all duration-200 hover:-translate-y-px hover:border-brand-200 hover:text-brand-600 hover:shadow-[0_8px_18px_-10px_rgba(106,90,232,0.55)]"
              >
                <PanelLeftClose className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" strokeWidth={2.2} />
              </button>
            )}
          </div>
        </div>

        {/* Bar progres tipis */}
        <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400 transition-[width] duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* ---------- Daftar bab ---------- */}
      <nav className="thin-scrollbar flex-1 space-y-1 overflow-y-auto p-3">
        {CHAPTERS.map((chap) => {
          const isCurrent = chap.id === currentChapterId;
          const isDone = completedChapters.includes(chap.id);
          const accent = accentForChapter(chap.number);

          return (
            <button
              key={chap.id}
              type="button"
              onClick={() => onSelectChapter(chap.id)}
              aria-current={isCurrent ? 'true' : undefined}
              className={cn(
                'group relative flex w-full cursor-pointer items-start gap-3 overflow-hidden rounded-2xl border p-2.5 text-left transition-all duration-200',
                isCurrent
                  ? 'border-transparent bg-white shadow-[0_8px_24px_-14px_rgba(15,23,42,0.5)] ring-1 ring-slate-200'
                  : 'border-transparent hover:-translate-y-px hover:bg-slate-50 hover:shadow-soft'
              )}
            >
              {/* Strip aksen kiri */}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-y-2 left-0 w-1 rounded-r-full bg-gradient-to-b transition-opacity duration-200',
                  accent.bar,
                  isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                )}
              />

              {/* Nomor / centang */}
              <span
                className={cn(
                  'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-[11px] font-extrabold tabular transition-all duration-200',
                  isDone
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-[0_6px_14px_-6px_rgba(5,150,105,0.9)]'
                    : isCurrent
                    ? cn('bg-gradient-to-br text-white shadow-sm', accent.iconTile)
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                )}
              >
                {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : chap.number}
              </span>

              {/* Judul */}
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block text-[10px] font-extrabold uppercase tracking-wider transition-colors',
                    isCurrent ? accent.text : 'text-slate-400'
                  )}
                >
                  Bab {chap.number}
                </span>
                <span
                  className={cn(
                    'block truncate text-[13px] leading-snug transition-colors',
                    isCurrent
                      ? 'font-extrabold text-slate-900'
                      : 'font-semibold text-slate-600 group-hover:text-slate-900'
                  )}
                  title={chap.title}
                >
                  {chap.title}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* ---------- Catatan kaki ---------- */}
      <div className="border-t border-slate-100 bg-slate-50/80 p-3">
        <div className="flex items-start gap-2 rounded-xl bg-white/80 p-2.5 ring-1 ring-slate-200/70">
          <Sparkles className="mt-px h-3.5 w-3.5 shrink-0 text-amber-500" />
          <p className="text-[11px] leading-tight text-slate-500">
            Progres belajar kamu <strong className="text-slate-700">tersimpan otomatis</strong> di
            perangkat ini.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
