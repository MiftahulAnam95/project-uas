import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ListOrdered, CheckCircle2, RotateCcw } from 'lucide-react';
import { SequenceExercise, SequenceExerciseItem } from '../../types';

interface CodeOrderExerciseProps {
  exercise: SequenceExercise;
  onCompleted?: () => void;
}

export const CodeOrderExercise: React.FC<CodeOrderExerciseProps> = ({
  exercise,
  onCompleted,
}) => {
  // Initialize with shuffled items
  const [items, setItems] = useState<SequenceExerciseItem[]>(() => {
    return [...exercise.items].sort(() => Math.random() - 0.5);
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isSubmitted) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
  };

  const isOrderCorrect = items.every((item, idx) => item.order === idx + 1);

  const handleCheck = () => {
    setIsSubmitted(true);
    if (isOrderCorrect && onCompleted) {
      onCompleted();
    }
  };

  const handleReset = () => {
    setItems([...exercise.items].sort(() => Math.random() - 0.5));
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 my-6 transition hover:shadow-md">
      <div className="flex items-center gap-2 mb-2 text-indigo-700">
        <ListOrdered className="w-5 h-5" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Latihan Interaktif: Susun Urutan Alur
        </span>
      </div>

      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
        {exercise.title}
      </h4>
      <p className="text-sm text-slate-600 mb-4">{exercise.prompt}</p>

      {/* Item List with Up/Down buttons */}
      <div className="space-y-2 mb-5">
        {items.map((item, idx) => {
          const isCorrectPosition = isSubmitted && item.order === idx + 1;
          const isWrongPosition = isSubmitted && item.order !== idx + 1;

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                isCorrectPosition
                  ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950'
                  : isWrongPosition
                  ? 'border-rose-300 bg-rose-50/80 text-rose-950'
                  : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-200/80 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>

              {!isSubmitted && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveItem(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded-md hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="Pindahkan ke atas"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(idx, 'down')}
                    disabled={idx === items.length - 1}
                    className="p-1 rounded-md hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="Pindahkan ke bawah"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleCheck}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
        >
          Periksa Urutan
        </button>
      ) : (
        <div
          className={`p-4 rounded-xl border animate-in fade-in duration-200 ${
            isOrderCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            {isOrderCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Luar biasa! Urutan alur program sudah tepat.</span>
              </>
            ) : (
              <span>Urutan belum tepat. Coba periksa kembali alur logikanya.</span>
            )}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed mb-3">{exercise.explanation}</p>
          {!isOrderCorrect && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-rose-200/70 hover:bg-rose-300 text-rose-900 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Acak dan Coba Lagi
            </button>
          )}
        </div>
      )}
    </div>
  );
};
