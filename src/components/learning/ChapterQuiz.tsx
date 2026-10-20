import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { QuizQuestion, ChapterId } from '../../types';

interface ChapterQuizProps {
  chapterId: ChapterId;
  chapterTitle: string;
  questions: QuizQuestion[];
  savedScore?: number;
  onScoreSave: (chapterId: ChapterId, score: number) => void;
}

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
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    onScoreSave(chapterId, score);

    if (score >= 80) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const allAnswered = Object.keys(userAnswers).length === questions.length;
  const currentScore = isSubmitted ? calculateScore() : savedScore;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 my-8">
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Kuis Uji Pemahaman {chapterTitle}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {questions.length} Pertanyaan Evaluasi
          </h3>
        </div>

        {savedScore > 0 && !isSubmitted && (
          <div className="text-right">
            <div className="text-xs text-slate-500">Skor Sebelumnya</div>
            <div className="text-lg font-bold text-emerald-600">{savedScore}%</div>
          </div>
        )}
      </div>

      {/* Question List */}
      <div className="space-y-6 my-6">
        {questions.map((q, qIdx) => {
          const selected = userAnswers[qIdx];
          const isCorrect = isSubmitted && selected === q.correctIndex;
          const isWrong = isSubmitted && selected !== q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-xl border transition-colors ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-rose-200 bg-rose-50/40'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                    {q.question}
                  </h4>
                  {q.codeSnippet && (
                    <div className="mt-2 bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                      <pre>{q.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 mt-3 pl-0 sm:pl-9">
                {q.options.map((opt, optIdx) => {
                  let optStyle = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700';

                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-medium';
                    } else if (optIdx === selected) {
                      optStyle = 'border-rose-400 bg-rose-100 text-rose-950';
                    } else {
                      optStyle = 'border-slate-200 bg-white/60 text-slate-400 opacity-60';
                    }
                  } else if (selected === optIdx) {
                    optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-500';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between transition cursor-pointer disabled:cursor-default ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {isSubmitted && optIdx === selected && isWrong && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation in Review Mode */}
              {isSubmitted && (
                <div className="mt-3.5 pt-3 border-t border-slate-200/80 pl-0 sm:pl-9 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>Pembahasan:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Controls & Score Summary */}
      {!isSubmitted ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            {Object.keys(userAnswers).length} dari {questions.length} pertanyaan telah dijawab
          </p>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition active:scale-95 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Selesai dan Periksa Nilai
          </button>
        </div>
      ) : (
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Hasil Evaluasi Kamu
            </div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              Skor: <span className={currentScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}>{currentScore}%</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              {currentScore >= 80
                ? 'Luar biasa! Kamu sudah sangat memahami materi bab ini dengan baik.'
                : 'Bagus sudah mencoba! Kamu bisa meninjau pembahasan di atas atau mengulang kuis untuk memantapkan pemahaman.'}
            </p>
          </div>
          <button
            onClick={handleRetake}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Ulangi Kuis
          </button>
        </div>
      )}
    </div>
  );
};
