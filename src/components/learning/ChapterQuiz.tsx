import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Trophy, Flame } from 'lucide-react';
import { QuizQuestion, ChapterId } from '../../types';
import { MiniCode } from '../code-block/MiniCode';
import { ProgressRing } from '../common/ProgressRing';
import { celebrateBig, celebrateSmall } from '../../utils/celebrate';
import { formatInlineText } from '../../utils/formatText';
import { cn } from '../../utils/cn';

interface ChapterQuizProps {
  chapterId: ChapterId;
  chapterTitle: string;
  questions: QuizQuestion[];
  savedScore?: number;
  onScoreSave: (chapterId: ChapterId, score: number) => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export const ChapterQuiz: React.FC<ChapterQuizProps> = ({
  chapterId,
  chapterTitle,
  questions,
  savedScore = 0,
  onScoreSave,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) correctCount++;
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    onScoreSave(chapterId, score);
    if (score >= 80) celebrateBig();
    else if (score > 0) celebrateSmall();
  };

  const handleRetake = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentScore = isSubmitted ? calculateScore() : savedScore;
  const correctCount = isSubmitted
    ? questions.filter((q, idx) => userAnswers[idx] === q.correctIndex).length
    : 0;

  return (
    <section className="relative my-8 overflow-hidden rounded-4xl border border-slate-200/80 bg-white/90 shadow-soft backdrop-blur-xl anim-rise">
      {/* ---------- Kepala kuis ---------- */}
      <header className="aurora relative px-5 py-6 text-white sm:px-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-amber-400/25 blur-3xl anim-float"
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_14px_30px_-12px_rgba(245,158,11,0.9)]">
              <Award className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-200">
                Kuis uji pemahaman · {chapterTitle}
              </div>
              <h3 className="text-lg font-extrabold tracking-tight sm:text-xl">
                {questions.length} Pertanyaan Evaluasi
              </h3>
              <p className="mt-0.5 text-xs text-slate-300">
                Jawab semuanya dulu, lalu periksa nilaimu — pembahasan muncul setelahnya.
              </p>
            </div>
          </div>

          {/* Skor / progres */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.07] px-3.5 py-2.5 backdrop-blur">
            {isSubmitted ? (
              <>
                <ProgressRing
                  value={currentScore}
                  size={46}
                  stroke={5}
                  from="#fbbf24"
                  to="#fb923c"
                  label={
                    <span className="text-[11px] font-extrabold tabular text-white">
                      {currentScore}
                    </span>
                  }
                />
                <div className="leading-tight">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Skor kamu
                  </div>
                  <div className="text-sm font-extrabold tabular text-white">
                    {correctCount}/{questions.length} benar
                  </div>
                </div>
              </>
            ) : (
              <>
                <ProgressRing
                  value={(answeredCount / questions.length) * 100}
                  size={46}
                  stroke={5}
                  label={
                    <span className="text-[11px] font-extrabold tabular text-white">
                      {answeredCount}
                    </span>
                  }
                />
                <div className="leading-tight">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Terjawab
                  </div>
                  <div className="text-sm font-extrabold tabular text-white">
                    {answeredCount} dari {questions.length}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {savedScore > 0 && !isSubmitted && (
          <div className="relative z-10 mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold text-emerald-200">
            <Flame className="h-3.5 w-3.5" />
            Skor terakhirmu di bab ini: {savedScore}%
          </div>
        )}
      </header>

      {/* ---------- Daftar pertanyaan ---------- */}
      <div className="space-y-4 p-4 sm:p-6">
        {questions.map((q, qIdx) => {
          const selected = userAnswers[qIdx];
          const isCorrect = isSubmitted && selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className={cn(
                'overflow-hidden rounded-3xl border p-4 transition-all duration-300 sm:p-5',
                !isSubmitted &&
                  (selected !== undefined
                    ? 'border-brand-200 bg-brand-50/40 shadow-soft'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'),
                isSubmitted && isCorrect && 'border-emerald-200 bg-emerald-50/40',
                isSubmitted && !isCorrect && 'border-rose-200 bg-rose-50/40'
              )}
            >
              <div className="mb-3 flex items-start gap-3">
                <span
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-[11px] font-extrabold tabular text-white shadow-sm transition-transform',
                    isSubmitted
                      ? isCorrect
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-400'
                        : 'bg-gradient-to-br from-rose-500 to-orange-400'
                      : 'bg-gradient-to-br from-brand-500 to-grape-500'
                  )}
                >
                  {qIdx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold leading-snug text-slate-900 sm:text-[15px]">
                    {formatInlineText(q.question)}
                  </h4>
                  {q.codeSnippet && <MiniCode code={q.codeSnippet} label="potongan kode" />}
                </div>
              </div>

              {/* Pilihan jawaban */}
              <div className="space-y-2 sm:pl-10">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selected === optIdx;
                  const isAnswer = optIdx === q.correctIndex;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      disabled={isSubmitted}
                      className={cn(
                        'flex w-full items-center justify-between gap-3 rounded-2xl border p-3 text-left text-xs transition-all duration-200 sm:text-sm',
                        !isSubmitted &&
                          (isSelected
                            ? 'border-brand-500 bg-white text-brand-900 shadow-[0_10px_24px_-16px_rgba(106,90,232,0.9)] ring-2 ring-brand-200'
                            : 'border-slate-200 bg-white/80 text-slate-700 hover:-translate-y-px hover:border-brand-200 hover:bg-white hover:shadow-soft cursor-pointer'),
                        isSubmitted && isAnswer &&
                          'border-emerald-400 bg-emerald-50 font-semibold text-emerald-950',
                        isSubmitted && isSelected && !isAnswer &&
                          'border-rose-400 bg-rose-50 text-rose-950',
                        isSubmitted && !isSelected && !isAnswer &&
                          'border-slate-200 bg-white/60 text-slate-400 opacity-70',
                        isSubmitted && 'cursor-default'
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
                              : isSelected
                              ? 'bg-brand-600 text-white'
                              : 'bg-slate-100 text-slate-500'
                          )}
                        >
                          {LETTERS[optIdx] ?? optIdx + 1}
                        </span>
                        <span className="min-w-0 font-mono text-[11px] sm:text-xs sm:font-sans sm:text-[13px]">
                          {formatInlineText(opt)}
                        </span>
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

              {/* Pembahasan */}
              {isSubmitted && (
                <div className="mt-3.5 flex items-start gap-2.5 border-t border-slate-200/70 pt-3 sm:ml-10 anim-fade">
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-900 text-[10px] font-extrabold text-white">
                    ?
                  </span>
                  <p className="text-xs leading-relaxed text-slate-700 sm:text-[13px]">
                    <strong className="font-extrabold text-slate-900">Pembahasan:</strong>{' '}
                    {formatInlineText(q.explanation)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ---------- Aksi & hasil ---------- */}
      {!isSubmitted ? (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row">
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 sm:w-52 sm:flex-none">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400 transition-[width] duration-500"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
            <p className="shrink-0 text-[11px] font-bold text-slate-500 tabular">
              {answeredCount}/{questions.length} terjawab
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={answeredCount !== questions.length}
            className="btn btn-primary w-full px-6 py-3 text-sm sm:w-auto disabled:cursor-not-allowed"
          >
            <Trophy className="h-4 w-4" />
            Selesai &amp; Periksa Nilai
          </button>
        </div>
      ) : (
        <div
          className={cn(
            'relative overflow-hidden border-t p-5 sm:p-6',
            currentScore >= 80
              ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50'
              : 'border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50'
          )}
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <span
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm',
                  currentScore >= 80
                    ? 'from-emerald-500 to-teal-400 shadow-[0_14px_30px_-14px_rgba(5,150,105,0.9)]'
                    : 'from-amber-500 to-orange-400 shadow-[0_14px_30px_-14px_rgba(217,119,6,0.9)]'
                )}
              >
                <Trophy className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  Hasil evaluasi kamu
                </div>
                <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Skor:{' '}
                  <span
                    className={cn(
                      'tabular',
                      currentScore >= 80 ? 'text-emerald-600' : 'text-amber-600'
                    )}
                  >
                    {currentScore}%
                  </span>
                </div>
                <p className="mt-1 max-w-lg text-xs leading-relaxed text-slate-600">
                  {currentScore >= 80
                    ? 'Luar biasa! Kamu sudah sangat memahami materi bab ini. Lanjut ke bab berikutnya dengan percaya diri.'
                    : 'Bagus sudah mencoba! Tinjau pembahasan di atas, lalu ulangi kuisnya untuk memantapkan pemahaman.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRetake}
              className="btn btn-soft w-full px-4 py-2.5 text-xs sm:w-auto"
            >
              <RotateCcw className="h-4 w-4" />
              Ulangi Kuis
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChapterQuiz;
