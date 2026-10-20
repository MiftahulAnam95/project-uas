import React from 'react';
import { cn } from '../../utils/cn';
import { ACCENTS, AccentKey } from '../../theme/accents';

interface ExerciseCardProps {
  /** Nama jenis latihan, mis. "Prediksi Hasil Kode" */
  kind: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  title: string;
  prompt?: React.ReactNode;
  accent?: AccentKey;
  /** Elemen kecil di pojok kanan atas (mis. status / skor) */
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Kerangka kartu latihan yang seragam: tile ikon bergradasi, label jenis
 * latihan, judul, instruksi, lalu isi interaktif.
 */
export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  kind,
  icon: Icon,
  title,
  prompt,
  accent = 'indigo',
  aside,
  children,
  className = '',
}) => {
  const a = ACCENTS[accent];

  return (
    <section
      className={cn(
        'group relative my-6 overflow-hidden rounded-4xl border border-slate-200/80 bg-white/90 p-5 shadow-soft backdrop-blur-xl transition-all duration-300 hover:shadow-lift sm:p-6 anim-rise',
        className
      )}
    >
      {/* Strip gradasi atas */}
      <span
        aria-hidden="true"
        className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', a.bar)}
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-[0.09] blur-2xl transition-opacity duration-500 group-hover:opacity-20',
          a.iconTile
        )}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105',
              a.iconTile
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <div
              className={cn(
                'text-[10px] font-extrabold uppercase tracking-[0.16em]',
                a.text
              )}
            >
              Latihan interaktif · {kind}
            </div>
            <h4 className="mt-0.5 text-[15px] font-extrabold leading-snug tracking-tight text-slate-900 sm:text-lg">
              {title}
            </h4>
          </div>
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>

      {prompt && (
        <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{prompt}</p>
      )}

      <div className="relative mt-4">{children}</div>
    </section>
  );
};

export default ExerciseCard;
