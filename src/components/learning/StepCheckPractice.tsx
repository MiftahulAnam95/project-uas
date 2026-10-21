import React, { useRef, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Target,
  Trophy,
  Send,
  ArrowRight,
} from 'lucide-react';
import { StepCheckQuestion, StepPractice } from '../../types';
import { MiniCode } from '../code-block/MiniCode';
import { formatInlineText } from '../../utils/formatText';
import { celebrateSmall } from '../../utils/celebrate';
import { cn } from '../../utils/cn';

interface StepCheckPracticeProps {
  practice: StepPractice;
  /** True bila langkah ini sudah pernah diselesaikan pada perangkat ini. */
  isMastered?: boolean;
  onCompleted: () => void;
}

interface AnswerState {
  value: string;
  correct: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[`'"]/g, '');

/**
 * Uji pemahaman singkat yang menempel di bawah satu langkah materi.
 * Tiga soal per langkah: konsep, membaca kode, dan isian singkat.
 * Sebuah langkah baru dianggap "dikuasai" bila ketiga soal dijawab benar.
 */
export const StepCheckPractice: React.FC<StepCheckPracticeProps> = ({
  practice,
  isMastered = false,
  onCompleted,
}) => {
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [fillDrafts, setFillDrafts] = useState<Record<string, string>>({});
  const [hintsOpen, setHintsOpen] = useState<Record<string, boolean>>({});
  const completedRef = useRef(false);

  const total = practice.questions.length;
  const solvedCount = practice.questions.filter((q) => answers[q.id]?.correct).length;
  const allSolved = solvedCount === total;
  const answeredCount = practice.questions.filter((q) => answers[q.id] !== undefined).length;

  const recordAnswer = (question: StepCheckQuestion, rawValue: string) => {
    const correct =
      question.type === 'choice'
        ? Number(rawValue) === question.correctIndex
        : question.acceptedAnswers.some(
            (accepted) => normalize(accepted) === normalize(rawValue)
          );

    const nextAnswers: Record<string, AnswerState> = {
      ...answers,
      [question.id]: { value: rawValue, correct },
    };

    setAnswers(nextAnswers);

    const nowAllCorrect = practice.questions.every((q) => nextAnswers[q.id]?.correct);
    if (correct && nowAllCorrect && !completedRef.current) {
      completedRef.current = true;
      celebrateSmall();
      onCompleted();
    }
  };

  const retryQuestion = (questionId: string) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setFillDrafts((prev) => ({ ...prev, [questionId]: '' }));
  };

  const resetAll = () => {
    completedRef.current = false;
    setAnswers({});
    setFillDrafts({});
    setHintsOpen({});
  };

  const toggleHint = (questionId: string) => {
    setHintsOpen((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl border border-brand-200/80 bg-gradient-to-br from-brand-50/90 via-white to-aqua-50/40 shadow-soft">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400"
      />

      {/* ---------------- Kepala uji ---------------- */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-brand-100/80 px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-grape-500 text-white shadow-[0_10px_24px_-12px_rgba(106,90,232,0.9)]">
            <Target className="h-5 w-5" strokeWidth={2.3} />
          </span>
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-700">
              Uji pemahaman · Langkah {practice.stepNumber} dari 9
            </div>
            <h3 className="mt-0.5 text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
              Sudah benar-benar paham langkah ini?
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
              Jawab {total} soal di bawah. Semua harus benar — tidak apa-apa salah, justru di
              situ kita belajar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isMastered && !allSolved && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
              <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
              Pernah dikuasai
            </span>
          )}
          <div
            className={cn(
              'rounded-2xl border px-3 py-1.5 text-center',
              allSolved
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-brand-200 bg-white/80 text-brand-700'
            )}
          >
            <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] opacity-70">
              Dikuasai
            </div>
            <div className="text-sm font-extrabold tabular">
              {solvedCount}/{total}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Kalimat kunci ---------------- */}
      <div className="mx-4 mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/50 px-3.5 py-3 sm:mx-5">
        <Lightbulb className="mt-px h-4 w-4 shrink-0 text-amber-500" strokeWidth={2.4} />
        <p className="text-xs leading-relaxed text-amber-950">
          <strong className="font-extrabold">Inti langkah ini:</strong>{' '}
          {formatInlineText(practice.keyTakeaway)}
        </p>
      </div>

      {/* ---------------- Daftar soal ---------------- */}
      <div className="space-y-3 p-4 sm:p-5">
        {practice.questions.map((question, idx) => {
          const answer = answers[question.id];
          const isCorrect = answer?.correct === true;
          const isWrong = answer !== undefined && !answer.correct;
          const selectedIndex =
            question.type === 'choice' && answer ? Number(answer.value) : -1;

          return (
            <div
              key={question.id}
              className={cn(
                'rounded-2xl border p-3.5 transition-colors sm:p-4',
                !answer && 'border-slate-200 bg-white/85',
                isCorrect && 'border-emerald-200 bg-emerald-50/60',
                isWrong && 'border-rose-200 bg-rose-50/50'
              )}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-extrabold tabular',
                    isCorrect
                      ? 'bg-emerald-500 text-white'
                      : isWrong
                      ? 'bg-rose-500 text-white'
                      : 'bg-brand-100 text-brand-700'
                  )}
                >
                  {isCorrect ? <CheckCircle2 className="h-3.5 w-3.5" /> : idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold leading-relaxed text-slate-800 sm:text-sm">
                    {formatInlineText(question.question)}
                  </p>

                  {question.code && (
                    <MiniCode code={question.code} label="perhatikan kodenya" />
                  )}

                  {/* Pilihan ganda */}
                  {question.type === 'choice' && (
                    <div className="mt-3 space-y-1.5">
                      {question.options.map((option, optIdx) => {
                        const isSelected = selectedIndex === optIdx;
                        const isKey = optIdx === question.correctIndex;

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={isCorrect || answer !== undefined}
                            onClick={() => recordAnswer(question, String(optIdx))}
                            aria-pressed={isSelected}
                            className={cn(
                              'flex w-full items-center justify-between gap-2.5 rounded-xl border px-3 py-2 text-left text-xs transition-all duration-200 sm:text-[13px]',
                              !answer &&
                                'cursor-pointer border-slate-200 bg-white text-slate-700 hover:-translate-y-px hover:border-brand-300 hover:bg-brand-50/60',
                              answer &&
                                isKey &&
                                'border-emerald-300 bg-emerald-50 font-semibold text-emerald-900',
                              answer &&
                                isSelected &&
                                !isKey &&
                                'border-rose-300 bg-rose-50 text-rose-900',
                              answer &&
                                !isSelected &&
                                !isKey &&
                                'border-slate-200 bg-white/60 text-slate-400 opacity-70',
                              answer && 'cursor-default'
                            )}
                          >
                            <span className="flex min-w-0 items-start gap-2">
                              <span
                                className={cn(
                                  'mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[9px] font-extrabold',
                                  answer && isKey
                                    ? 'bg-emerald-500 text-white'
                                    : answer && isSelected
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-slate-100 text-slate-500'
                                )}
                              >
                                {LETTERS[optIdx] ?? optIdx + 1}
                              </span>
                              <span className="min-w-0 break-words">
                                {option.includes('\n') ? (
                                  <code className="block whitespace-pre-wrap font-mono text-[11px] leading-relaxed sm:text-xs">
                                    {option.replace(/`/g, '')}
                                  </code>
                                ) : (
                                  formatInlineText(option)
                                )}
                              </span>
                            </span>
                            {answer && isKey && (
                              <CheckCircle2
                                className="h-4 w-4 shrink-0 text-emerald-600"
                                strokeWidth={2.5}
                              />
                            )}
                            {answer && isSelected && !isKey && (
                              <XCircle
                                className="h-4 w-4 shrink-0 text-rose-500"
                                strokeWidth={2.5}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Isian singkat */}
                  {question.type === 'fill' && (
                    <form
                      className="mt-3 flex flex-col gap-2 sm:flex-row"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (isCorrect) return;
                        const draft = fillDrafts[question.id] ?? '';
                        if (!draft.trim()) return;
                        recordAnswer(question, draft);
                      }}
                    >
                      <input
                        type="text"
                        value={fillDrafts[question.id] ?? ''}
                        onChange={(e) =>
                          setFillDrafts((prev) => ({
                            ...prev,
                            [question.id]: e.target.value,
                          }))
                        }
                        disabled={isCorrect}
                        autoComplete="off"
                        spellCheck={false}
                        placeholder={question.placeholder || 'Ketik jawabanmu…'}
                        className={cn(
                          'min-w-0 flex-1 rounded-xl border bg-white px-3 py-2 font-mono text-xs text-slate-800 outline-none transition placeholder:font-sans placeholder:text-slate-400 sm:text-[13px]',
                          !answer &&
                            'border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100',
                          isCorrect && 'border-emerald-300 bg-emerald-50/70',
                          isWrong && 'border-rose-300 bg-rose-50/70'
                        )}
                      />
                      <button
                        type="submit"
                        disabled={isCorrect || !(fillDrafts[question.id] ?? '').trim()}
                        className="btn btn-primary shrink-0 px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Send className="h-3.5 w-3.5" />
                        )}
                        {isCorrect ? 'Benar' : 'Periksa'}
                      </button>
                    </form>
                  )}

                  {/* Petunjuk */}
                  {!isCorrect && question.hint && (
                    <div className="mt-2">
                      {hintsOpen[question.id] ? (
                        <p className="flex items-start gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-2 text-[11px] leading-relaxed text-amber-900 anim-fade">
                          <Lightbulb className="mt-px h-3.5 w-3.5 shrink-0 text-amber-500" />
                          <span>
                            <strong className="font-extrabold">Petunjuk:</strong>{' '}
                            {formatInlineText(question.hint)}
                          </span>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleHint(question.id)}
                          className="inline-flex cursor-pointer items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-700 transition hover:text-amber-900"
                        >
                          <HelpCircle className="h-3 w-3" />
                          Butuh petunjuk?
                        </button>
                      )}
                    </div>
                  )}

                  {/* Umpan balik */}
                  {answer && (
                    <div
                      className={cn(
                        'mt-2.5 rounded-xl border px-3 py-2.5 text-[11px] leading-relaxed anim-fade sm:text-xs',
                        isCorrect
                          ? 'border-emerald-200 bg-white/70 text-emerald-900'
                          : 'border-rose-200 bg-white/70 text-rose-900'
                      )}
                    >
                      <p>
                        <strong className="font-extrabold">
                          {isCorrect ? 'Tepat! ' : 'Belum tepat. '}
                        </strong>
                        {formatInlineText(question.explanation)}
                      </p>
                      {!isCorrect && (
                        <button
                          type="button"
                          onClick={() => retryQuestion(question.id)}
                          className="mt-1.5 inline-flex cursor-pointer items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-rose-700 underline decoration-dotted underline-offset-2 transition hover:text-rose-900"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Coba lagi
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- Status bawah ---------------- */}
      <div className="border-t border-brand-100/80 bg-white/60 px-4 py-3.5 sm:px-5">
        {allSolved ? (
          <div className="flex flex-col items-start justify-between gap-3 anim-rise sm:flex-row sm:items-center">
            <div className="flex items-start gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-sm">
                <Trophy className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-sm font-extrabold text-emerald-800">
                  Langkah {practice.stepNumber} dikuasai! 🎉
                </p>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  {practice.stepNumber < 9
                    ? `Sekarang lanjut ke Langkah ${practice.stepNumber + 1}. Kamu boleh kembali ke sini kapan saja.`
                    : 'Kesembilan langkah sudah kamu lewati. Saatnya menguji semuanya di kuis bab.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={resetAll}
              className="btn btn-soft shrink-0 px-3.5 py-2 text-[11px]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Ulangi uji ini
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200 sm:w-44">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400 transition-[width] duration-500"
                  style={{ width: `${(solvedCount / total) * 100}%` }}
                />
              </div>
              <p className="text-[11px] font-bold tabular text-slate-500">
                {answeredCount}/{total} dijawab · {solvedCount}/{total} benar
              </p>
            </div>
            <p className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <ArrowRight className="h-3 w-3" />
              Benar semua untuk lanjut
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCheckPractice;
