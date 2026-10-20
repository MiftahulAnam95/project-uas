import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  ListOrdered,
  Shuffle,
  GripVertical,
} from 'lucide-react';
import { SequenceExercise, SequenceExerciseItem } from '../../types';
import { ExerciseCard } from './ExerciseCard';
import { FeedbackPanel } from './FeedbackPanel';
import { celebrateSmall } from '../../utils/celebrate';
import { cn } from '../../utils/cn';

interface CodeOrderExerciseProps {
  exercise: SequenceExercise;
  onCompleted?: () => void;
}

const shuffle = (items: SequenceExerciseItem[]) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  // Hindari kebetulan sudah terurut sejak awal
  const alreadySorted = copy.every((it, idx) => it.order === idx + 1);
  if (alreadySorted && copy.length > 1) {
    [copy[0], copy[1]] = [copy[1], copy[0]];
  }
  return copy;
};

export const CodeOrderExercise: React.FC<CodeOrderExerciseProps> = ({
  exercise,
  onCompleted,
}) => {
  const [items, setItems] = useState<SequenceExerciseItem[]>(() => shuffle(exercise.items));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isSubmitted) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setItems(newItems);
  };

  const isOrderCorrect = items.every((item, idx) => item.order === idx + 1);
  const correctCount = items.filter((item, idx) => item.order === idx + 1).length;

  const handleCheck = () => {
    setIsSubmitted(true);
    if (isOrderCorrect) {
      celebrateSmall();
      onCompleted?.();
    }
  };

  const handleReset = () => {
    setItems(shuffle(exercise.items));
    setIsSubmitted(false);
  };

  return (
    <ExerciseCard
      kind="Susun urutan alur"
      icon={ListOrdered}
      title={exercise.title}
      prompt={exercise.prompt}
      accent="teal"
      aside={
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 tabular">
          {items.length} langkah
        </span>
      }
    >
      {/* Daftar langkah */}
      <ol className="space-y-2">
        {items.map((item, idx) => {
          const inPlace = item.order === idx + 1;
          return (
            <li
              key={item.id}
              className={cn(
                'group relative flex items-center gap-3 overflow-hidden rounded-2xl border p-3 transition-all duration-200',
                !isSubmitted && 'border-slate-200 bg-white hover:border-teal-200 hover:shadow-soft',
                isSubmitted && inPlace && 'border-emerald-300 bg-emerald-50/80',
                isSubmitted && !inPlace && 'border-rose-300 bg-rose-50/70'
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-y-0 left-0 w-1 transition-colors',
                  isSubmitted
                    ? inPlace
                      ? 'bg-emerald-400'
                      : 'bg-rose-400'
                    : 'bg-gradient-to-b from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100'
                )}
              />

              <GripVertical className="ml-1 h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />

              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-[11px] font-extrabold tabular transition-colors',
                  isSubmitted
                    ? inPlace
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                    : 'bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-700'
                )}
              >
                {idx + 1}
              </span>

              <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-slate-800">
                {item.text}
              </span>

              {isSubmitted && !inPlace && (
                <span className="shrink-0 rounded-lg bg-white/80 px-2 py-0.5 text-[10px] font-bold text-rose-600 ring-1 ring-rose-200">
                  seharusnya #{item.order}
                </span>
              )}

              {!isSubmitted && (
                <span className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(idx, 'up')}
                    disabled={idx === 0}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-px hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
                    title="Geser ke atas"
                    aria-label={`Geser langkah "${item.text}" ke atas`}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(idx, 'down')}
                    disabled={idx === items.length - 1}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:translate-y-px hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
                    title="Geser ke bawah"
                    aria-label={`Geser langkah "${item.text}" ke bawah`}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Aksi */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] font-semibold text-slate-500">
          {isSubmitted ? (
            <>
              <span className="font-extrabold text-slate-700 tabular">{correctCount}</span> dari{' '}
              <span className="tabular">{items.length}</span> langkah sudah di posisi benar.
            </>
          ) : (
            <>Gunakan tombol panah untuk memindahkan langkah.</>
          )}
        </p>

        <div className="flex gap-2">
          {!isSubmitted && (
            <button
              type="button"
              onClick={() => setItems(shuffle(exercise.items))}
              className="btn btn-soft px-3.5 py-2.5 text-xs"
              title="Acak ulang urutan"
            >
              <Shuffle className="h-3.5 w-3.5" />
              Acak
            </button>
          )}
          {!isSubmitted ? (
            <button type="button" onClick={handleCheck} className="btn btn-primary px-5 py-2.5 text-xs">
              Periksa Urutan
            </button>
          ) : (
            <button type="button" onClick={handleReset} className="btn btn-soft px-5 py-2.5 text-xs">
              <Shuffle className="h-3.5 w-3.5" />
              Acak & Coba Lagi
            </button>
          )}
        </div>
      </div>

      {isSubmitted && (
        <FeedbackPanel
          correct={isOrderCorrect}
          celebrate={isOrderCorrect}
          heading={
            isOrderCorrect
              ? 'Luar biasa! Urutan alur programnya sudah tepat.'
              : 'Urutannya belum tepat — periksa lagi alur logikanya.'
          }
        >
          {exercise.explanation}
        </FeedbackPanel>
      )}
    </ExerciseCard>
  );
};

export default CodeOrderExercise;
