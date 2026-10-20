import React from 'react';
import { cn } from '../../utils/cn';

type Accent = 'brand' | 'rose' | 'emerald' | 'amber' | 'cyan';

export interface HeaderStat {
  label: string;
  value: string;
}

interface PageHeaderProps {
  eyebrow: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  title: string;
  /** Kata di akhir judul yang diwarnai gradasi */
  highlight?: string;
  description?: React.ReactNode;
  accent?: Accent;
  stats?: HeaderStat[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const accentMap: Record<
  Accent,
  { panel: string; chip: string; tile: string; glow: string; ring: string }
> = {
  brand: {
    panel: 'aurora',
    chip: 'bg-brand-400/15 text-brand-100 border-brand-300/30',
    tile: 'from-brand-400 to-grape-500 shadow-[0_16px_40px_-12px_rgba(106,90,232,0.8)]',
    glow: 'bg-brand-500/30',
    ring: 'ring-brand-300/30',
  },
  rose: {
    panel: 'aurora aurora-rose',
    chip: 'bg-rose-400/15 text-rose-100 border-rose-300/30',
    tile: 'from-rose-500 to-orange-400 shadow-[0_16px_40px_-12px_rgba(244,63,94,0.8)]',
    glow: 'bg-rose-500/25',
    ring: 'ring-rose-300/30',
  },
  emerald: {
    panel: 'aurora aurora-emerald',
    chip: 'bg-emerald-400/15 text-emerald-100 border-emerald-300/30',
    tile: 'from-emerald-400 to-teal-400 shadow-[0_16px_40px_-12px_rgba(16,185,129,0.8)]',
    glow: 'bg-emerald-500/25',
    ring: 'ring-emerald-300/30',
  },
  amber: {
    panel: 'aurora aurora-amber',
    chip: 'bg-amber-400/15 text-amber-100 border-amber-300/30',
    tile: 'from-amber-400 to-orange-500 shadow-[0_16px_40px_-12px_rgba(245,158,11,0.8)]',
    glow: 'bg-amber-500/25',
    ring: 'ring-amber-300/30',
  },
  cyan: {
    panel: 'aurora aurora-cyan',
    chip: 'bg-aqua-400/15 text-aqua-100 border-aqua-300/30',
    tile: 'from-aqua-400 to-sky-500 shadow-[0_16px_40px_-12px_rgba(6,182,212,0.8)]',
    glow: 'bg-aqua-500/25',
    ring: 'ring-aqua-300/30',
  },
};

/**
 * Banner kepala halaman bergaya "aurora gelap" — memberi identitas kuat
 * sekaligus kontras dengan konten terang di bawahnya.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  icon: Icon,
  title,
  highlight,
  description,
  accent = 'brand',
  stats,
  actions,
  children,
  className = '',
}) => {
  const a = accentMap[accent];

  const hasHighlight =
    !!highlight && title.toLowerCase().endsWith((highlight || '').toLowerCase());
  const titleMain = hasHighlight
    ? title.slice(0, title.length - (highlight?.length ?? 0)).trimEnd()
    : title;

  return (
    <header
      className={cn(
        'relative overflow-hidden rounded-4xl text-white shadow-[0_30px_70px_-40px_rgba(15,23,42,0.85)]',
        a.panel,
        className
      )}
    >
      {/* Dekorasi melayang */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full blur-3xl anim-float-slow',
          a.glow
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/5 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 bottom-6 hidden h-24 w-24 rounded-3xl border border-white/10 rotate-12 sm:block anim-float"
      />

      <div className="relative z-10 px-5 py-8 sm:px-9 sm:py-11 lg:px-12 lg:py-14">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4 anim-rise">
            {/* Eyebrow */}
            <div
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm',
                a.chip
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{eyebrow}</span>
            </div>

            {/* Judul */}
            <h1 className="text-[1.7rem] leading-[1.12] font-extrabold tracking-tight sm:text-4xl lg:text-[2.9rem]">
              {titleMain}{' '}
              {highlight && (
                <span className="text-gradient-light">{highlight}</span>
              )}
            </h1>

            {description && (
              <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                {description}
              </p>
            )}

            {/* Statistik ringkas */}
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-2 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/[0.1]"
                  >
                    <span className="text-base font-extrabold tabular text-white">
                      {s.value}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
          </div>

          {/* Tile ikon besar di kanan (desktop) */}
          <div className="hidden shrink-0 lg:block">
            <div className="relative">
              <div
                className={cn(
                  'flex h-24 w-24 items-center justify-center rounded-4xl bg-gradient-to-br ring-1 ring-inset ring-white/25',
                  a.tile
                )}
              >
                <Icon className="h-11 w-11 text-white drop-shadow" strokeWidth={2} />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm anim-float"
              />
            </div>
          </div>
        </div>

        {children && <div className="relative z-10 mt-8">{children}</div>}
      </div>
    </header>
  );
};

export default PageHeader;
