import React, { useState } from 'react';
import { Dumbbell, Eye, EyeOff, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { TryItExercise } from '../../types';
import { MiniCode } from '../code-block/MiniCode';
import { cn } from '../../utils/cn';

interface TryItYourselfProps {
  exercises: TryItExercise[];
  title?: string;
}

const LEVEL_STYLE: Record<TryItExercise['level'], string> = {
  Mudah: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Sedang: 'border-amber-200 bg-amber-50 text-amber-700',
  Tantangan: 'border-rose-200 bg-rose-50 text-rose-700',
};

export const TryItYourself: React.FC<TryItYourselfProps> = ({
  exercises,
  title = 'Coba sendiri',
}) => {
  const [openAnswer, setOpenAnswer] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const toggleDone = (id: string) => {
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <section className="my-6 overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/90 via-white to-white shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 bg-amber-50/70 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-sm">
            <Dumbbell className="h-4.5 w-4.5" strokeWidth={2.3} />
          </span>
          <div className="leading-tight">
            <h3 className="text-sm font-extrabold tracking-tight text-slate-900">{title}</h3>
            <p className="text-[11px] text-slate-500">
              Kerjakan dulu, baru buka kunci jawaban. Salah itu bagian dari belajar.
            </p>
          </div>
        </div>
        <span className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
          {done.length}/{exercises.length} dicoba
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {exercises.map((exercise, index) => {
          const isOpen = openAnswer === exercise.id;
          const isDone = done.includes(exercise.id);
          return (
            <div
              key={exercise.id}
              className={cn(
                'rounded-2xl border bg-white p-3.5 shadow-soft transition sm:p-4',
                isDone ? 'border-emerald-200' : 'border-slate-200/80'
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-extrabold text-slate-600">
                  {index + 1}
                </span>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider',
                    LEVEL_STYLE[exercise.level]
                  )}
                >
                  {exercise.level}
                </span>
                {isDone && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" /> Sudah dicoba
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm leading-relaxed text-slate-700">{exercise.prompt}</p>

              {exercise.starterCode && (
                <MiniCode code={exercise.starterCode} label="titik mulai" className="mt-2" />
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleDone(exercise.id)}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-bold transition',
                    isDone
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/50'
                  )}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {isDone ? 'Sudah dicoba' : 'Tandai sudah dicoba'}
                </button>
                <button
                  type="button"
                  onClick={() => setOpenAnswer(isOpen ? null : exercise.id)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3 py-1.5 text-[11px] font-bold text-brand-700 transition hover:bg-brand-100"
                  aria-expanded={isOpen}
                >
                  {isOpen ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {isOpen ? 'Tutup kunci jawaban' : 'Lihat kunci jawaban'}
                  {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
              </div>

              {isOpen && (
                <div className="mt-3 space-y-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-3 anim-fade">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                    Kunci jawaban
                  </p>
                  <MiniCode code={exercise.answerCode} label="jawaban" tone="success" />
                  <p className="text-xs leading-relaxed text-slate-700">{exercise.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TryItYourself;
