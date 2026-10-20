import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { PredictExercise } from '../../types';
import { ExerciseCard } from './ExerciseCard';
import { FeedbackPanel } from './FeedbackPanel';
import { MiniCode } from '../code-block/MiniCode';
import { celebrateSmall } from '../../utils/celebrate';
import { cn } from '../../utils/cn';

interface PredictOutputExerciseProps {
  exercise: PredictExercise;
  onCompleted?: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export const PredictOutputExercise: React.FC<PredictOutputExerciseProps> = ({
  exercise,
  onCompleted,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = selectedOption === exercise.correctAnswer;

  const handleSubmit = (option: string) => {
    setSelectedOption(option);
    setIsSubmitted(true);
    if (option === exercise.correctAnswer) {
      celebrateSmall();
      onCompleted?.();
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <ExerciseCard
      kind="Prediksi hasil kode"
      icon={HelpCircle}
      title={exercise.title}
      prompt={exercise.prompt}
      accent="violet"
      aside={
        isSubmitted ? (
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider',
              isCorrect
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-rose-200 bg-rose-50 text-rose-700'
            )}
          >
            {isCorrect ? 'Benar' : 'Coba lagi'}
          </span>
        ) : (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            {exercise.options.length} pilihan
          </span>
        )
      }
    >
      <MiniCode code={exercise.code} label="kode yang dijalankan" />

      <p className="mb-2 mt-4 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
        Menurutmu, apa yang tercetak di terminal?
      </p>

      <div className="space-y-2">
        {exercise.options.map((option, idx) => {
          const isSelected = option === selectedOption;
          const isAnswer = option === exercise.correctAnswer;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !isSubmitted && handleSubmit(option)}
              disabled={isSubmitted}
              className={cn(
                'flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3 text-left font-mono text-xs transition-all duration-200 disabled:cursor-default sm:text-[13px]',
                !isSubmitted &&
                  'border-slate-200 bg-white hover:-translate-y-px hover:border-violet-300 hover:bg-violet-50/60 hover:shadow-soft active:scale-[0.99]',
                isSubmitted && isAnswer &&
                  'border-emerald-400 bg-emerald-50 text-emerald-900 shadow-[0_10px_24px_-16px_rgba(5,150,105,0.9)]',
                isSubmitted && isSelected && !isAnswer &&
                  'border-rose-400 bg-rose-50 text-rose-900',
                isSubmitted && !isSelected && !isAnswer &&
                  'border-slate-200 bg-slate-50/60 text-slate-400 opacity-70'
              )}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold transition-colors',
                    isSubmitted && isAnswer
                      ? 'bg-emerald-500 text-white'
                      : isSubmitted && isSelected
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 text-slate-500'
                  )}
                >
                  {LETTERS[idx] ?? idx + 1}
                </span>
                <span className="min-w-0 break-words">{option}</span>
              </span>
              {isSubmitted && isAnswer && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
              )}
              {isSubmitted && isSelected && !isAnswer && (
                <XCircle className="h-4 w-4 shrink-0 text-rose-500" strokeWidth={2.5} />
              )}
            </button>
          );
        })}
      </div>

      {isSubmitted && (
        <FeedbackPanel
          correct={isCorrect}
          celebrate={isCorrect}
          heading={isCorrect ? 'Tepat sekali! 🎉' : 'Belum tepat — lihat alasannya yuk'}
          onRetry={isCorrect ? undefined : handleReset}
        >
          {exercise.explanation}
        </FeedbackPanel>
      )}
    </ExerciseCard>
  );
};

export default PredictOutputExercise;
