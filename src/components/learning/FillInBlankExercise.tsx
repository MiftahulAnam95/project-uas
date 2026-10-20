import React, { useState } from 'react';
import {
  PenLine,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Send,
  RotateCcw,
} from 'lucide-react';
import { FillInBlankExercise as FillExerciseType } from '../../types';
import { highlightSyntax } from '../../utils/highlightSyntax';
import { ExerciseCard } from './ExerciseCard';
import { FeedbackPanel } from './FeedbackPanel';
import { celebrateSmall } from '../../utils/celebrate';
import { formatInlineText } from '../../utils/formatText';
import { cn } from '../../utils/cn';

interface FillInBlankExerciseProps {
  exercise: FillExerciseType;
  onCompleted?: () => void;
}

export const FillInBlankExercise: React.FC<FillInBlankExerciseProps> = ({
  exercise,
  onCompleted,
}) => {
  const [userInput, setUserInput] = useState('');
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect =
    userInput.trim().toLowerCase() === exercise.missingToken.trim().toLowerCase();
  const locked = isSubmitted && isCorrect;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || locked) return;
    setIsSubmitted(true);
    if (isCorrect) {
      celebrateSmall();
      onCompleted?.();
    }
  };

  const handleReset = () => {
    setUserInput('');
    setIsSubmitted(false);
  };

  /** Render template: bagian kosong jadi "slot" yang bisa diisi. */
  const renderTemplate = () =>
    exercise.templateCode.split('\n').map((line, lineIdx) => {
      const parts = line.split('_____');
      return (
        <div key={lineIdx} className="flex min-h-[1.6em] items-center whitespace-pre">
          {parts.map((part, i) => (
            <React.Fragment key={i}>
              <span>{highlightSyntax(part)}</span>
              {i < parts.length - 1 && (
                <span
                  className={cn(
                    'mx-1 inline-flex min-w-[5.5rem] items-center justify-center rounded-lg border border-dashed px-2 py-0.5 font-sans text-[11px] font-bold transition-colors',
                    !isSubmitted &&
                      'border-brand-400/70 bg-brand-500/15 text-brand-200',
                    isSubmitted &&
                      (isCorrect
                        ? 'border-emerald-400/70 bg-emerald-500/20 text-emerald-200'
                        : 'border-rose-400/70 bg-rose-500/20 text-rose-200')
                  )}
                >
                  {isSubmitted
                    ? userInput.trim() || '—'
                    : 'isi di sini'}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    });

  return (
    <ExerciseCard
      kind="Lengkapi kode"
      icon={PenLine}
      title={exercise.title}
      prompt={formatInlineText(exercise.prompt)}
      accent="sky"
      aside={
        locked ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
            <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
            Terisi
          </span>
        ) : undefined
      }
    >
      {/* Template kode dengan slot kosong */}
      <div className="code-scrollbar overflow-x-auto rounded-2xl border border-slate-700/60 bg-[#0a0e1c] p-3.5 font-mono text-xs leading-relaxed text-slate-200 shadow-[0_16px_36px_-24px_rgba(2,6,23,0.9)] sm:text-[13px]">
        {renderTemplate()}
      </div>

      {/* Form jawaban */}
      <form onSubmit={handleCheck} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={locked}
            placeholder="Ketik kata / fungsi yang hilang…"
            autoComplete="off"
            spellCheck={false}
            className={cn(
              'w-full rounded-2xl border bg-white px-4 py-3 font-mono text-sm text-slate-800 shadow-soft outline-none transition placeholder:font-sans placeholder:text-slate-400',
              !isSubmitted &&
                'border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100',
              isSubmitted && isCorrect && 'border-emerald-300 bg-emerald-50/60',
              isSubmitted && !isCorrect && 'border-rose-300 bg-rose-50/60'
            )}
            required
          />
        </div>
        <button
          type="submit"
          disabled={locked || !userInput.trim()}
          className={cn(
            'btn btn-primary px-5 py-3 text-sm disabled:cursor-not-allowed',
            locked && 'pointer-events-none opacity-60'
          )}
        >
          {locked ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          {locked ? 'Jawaban Benar' : 'Periksa Jawaban'}
        </button>
      </form>

      {/* Petunjuk bertingkat */}
      <div className="mt-3">
        {hintLevel === 0 && (
          <button
            type="button"
            onClick={() => setHintLevel(1)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-extrabold text-amber-800 transition hover:-translate-y-px hover:bg-amber-100"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Butuh petunjuk?
          </button>
        )}

        {hintLevel > 0 && (
          <div className="space-y-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/60 p-3.5 anim-rise">
            <div className="flex items-start gap-2 text-xs text-amber-950">
              <Lightbulb className="mt-px h-4 w-4 shrink-0 text-amber-500" />
              <p className="leading-relaxed">
                <strong className="font-extrabold">Petunjuk 1:</strong>{' '}
                {formatInlineText(exercise.hint1)}
              </p>
            </div>
            {exercise.hint2 && hintLevel === 1 && (
              <button
                type="button"
                onClick={() => setHintLevel(2)}
                className="ml-6 cursor-pointer text-[11px] font-extrabold text-amber-700 underline decoration-dotted underline-offset-2 transition hover:text-amber-900"
              >
                Masih kesulitan? Buka petunjuk 2 →
              </button>
            )}
            {exercise.hint2 && hintLevel === 2 && (
              <div className="flex items-start gap-2 text-xs text-amber-950 anim-rise">
                <Lightbulb className="mt-px h-4 w-4 shrink-0 text-orange-500" />
                <p className="leading-relaxed">
                  <strong className="font-extrabold">Petunjuk 2:</strong>{' '}
                  {formatInlineText(exercise.hint2)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Umpan balik */}
      {isSubmitted && (
        <FeedbackPanel
          correct={isCorrect}
          celebrate={isCorrect}
          heading={
            isCorrect
              ? 'Benar! Bagian itu sudah kamu pahami.'
              : `Kunci yang tepat: "${exercise.missingToken}"`
          }
          onRetry={isCorrect ? undefined : handleReset}
          retryLabel="Isi Ulang"
        >
          {formatInlineText(exercise.explanation)}
          {!isCorrect && (
            <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-700">
              <RotateCcw className="h-3 w-3" />
              Mengetik ulang membantu memori ototmu, lho.
            </span>
          )}
        </FeedbackPanel>
      )}
    </ExerciseCard>
  );
};

export default FillInBlankExercise;
