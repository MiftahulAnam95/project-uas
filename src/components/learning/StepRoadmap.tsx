import React from 'react';
import {
  Megaphone,
  Package,
  Keyboard,
  Calculator,
  GitBranch,
  Boxes,
  Repeat,
  Puzzle,
  FolderOpen,
  CheckCircle2,
  Sparkles,
  Target,
  ArrowDown,
} from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StepRoadmapItem {
  number: number;
  sectionId: string;
  label: string;
  tagline: string;
  mastered: boolean;
}

interface StepRoadmapProps {
  items: StepRoadmapItem[];
}

const STEP_ICONS = [
  Megaphone,
  Package,
  Keyboard,
  Calculator,
  GitBranch,
  Boxes,
  Repeat,
  Puzzle,
  FolderOpen,
];

const GUIDE = [
  'Baca penjelasan dan perumpamaannya',
  'Klik “Jalankan” pada contoh kode',
  'Jawab 3 soal uji pemahaman',
  'Lanjut hanya jika sudah 3/3 benar',
];

/**
 * Peta kesembilan langkah Bab 3: memberi gambaran utuh, status penguasaan,
 * dan tombol lompat ke materi tertentu.
 */
export const StepRoadmap: React.FC<StepRoadmapProps> = ({ items }) => {
  const masteredCount = items.filter((item) => item.mastered).length;
  const allMastered = masteredCount === items.length;

  const jumpTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className="relative mb-8 overflow-hidden rounded-4xl border border-slate-200/80 bg-white/85 p-5 shadow-soft backdrop-blur-xl sm:p-7">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-grape-200/30 blur-3xl"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-grape-500 text-white shadow-[0_12px_26px_-12px_rgba(106,90,232,0.9)]">
            <Target className="h-5 w-5" strokeWidth={2.3} />
          </span>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-700">
              Peta belajar bab ini
            </div>
            <h2 className="mt-0.5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Sembilan Langkah Dasar
            </h2>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-[13px]">
              Setiap langkah punya penjelasan, contoh kode, dan <strong className="font-bold text-slate-800">3 soal uji pemahaman</strong>.
              Klik kotak mana pun untuk melompat ke materinya.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-aqua-50/60 px-4 py-2.5">
          <div className="text-right">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-brand-700/80">
              Langkah dikuasai
            </div>
            <div className="text-lg font-extrabold tabular text-brand-900">
              {masteredCount}
              <span className="text-sm text-slate-400">/{items.length}</span>
            </div>
          </div>
          <div className="h-10 w-px bg-brand-200/80" aria-hidden="true" />
          <Sparkles
            className={cn(
              'h-5 w-5',
              allMastered ? 'text-emerald-500' : 'text-brand-400'
            )}
          />
        </div>
      </div>

      {/* Cara memakai bab */}
      <div className="relative mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {GUIDE.map((step, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2"
          >
            <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white text-[10px] font-extrabold text-brand-700 ring-1 ring-brand-100">
              {idx + 1}
            </span>
            <p className="text-[11px] font-semibold leading-snug text-slate-600">
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Kisi sembilan langkah */}
      <div className="relative mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, idx) => {
          const Icon = STEP_ICONS[idx % STEP_ICONS.length];
          return (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => jumpTo(item.sectionId)}
              className={cn(
                'group flex cursor-pointer items-start gap-2.5 rounded-2xl border p-3 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift',
                item.mastered
                  ? 'border-emerald-200 bg-emerald-50/70 hover:border-emerald-300'
                  : 'border-slate-200 bg-white hover:border-brand-300'
              )}
            >
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-200 group-hover:scale-105',
                  item.mastered
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-400'
                    : 'bg-gradient-to-br from-brand-500 to-grape-500'
                )}
              >
                {item.mastered ? (
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2.6} />
                ) : (
                  <Icon className="h-4 w-4" strokeWidth={2.3} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                    Langkah {item.number}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide',
                      item.mastered
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {item.mastered ? 'Dikuasai' : 'Belum diuji'}
                  </span>
                </span>
                <span className="mt-0.5 block font-mono text-[12px] font-bold text-slate-900">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
                  {item.tagline}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 px-3.5 py-2.5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-900">
          <ArrowDown className="h-3.5 w-3.5 text-brand-500" />
          {allMastered
            ? 'Semua langkah sudah dikuasai. Uji nyali di kuis bab di bagian bawah!'
            : `Target: kuasai ${items.length} langkah sebelum lanjut ke Bab 4. Mulai dari Langkah 1 di bawah.`}
        </p>
        <div className="h-1.5 w-full max-w-[10rem] overflow-hidden rounded-full bg-white ring-1 ring-brand-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400 transition-[width] duration-500"
            style={{ width: `${(masteredCount / items.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default StepRoadmap;
