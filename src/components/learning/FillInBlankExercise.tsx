import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';
import { FillInBlankExercise as FillExerciseType } from '../../types';

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

  const isCorrect = userInput.trim().toLowerCase() === exercise.missingToken.trim().toLowerCase();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setIsSubmitted(true);
    if (isCorrect && onCompleted) {
      onCompleted();
    }
  };

  const handleReset = () => {
    setUserInput('');
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 my-6 transition hover:shadow-md">
      <div className="flex items-center gap-2 mb-2 text-indigo-700">
        <Sparkles className="w-5 h-5" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Latihan Interaktif: Lengkapi Kode
        </span>
      </div>

      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
        {exercise.title}
      </h4>
      <p className="text-sm text-slate-600 mb-4">{exercise.prompt}</p>

      {/* Code Template Box */}
      <div className="bg-slate-900 text-slate-100 font-mono text-sm p-4 rounded-xl mb-4 border border-slate-800">
        <pre className="whitespace-pre">
          {exercise.templateCode.replace(
            '_____',
            isSubmitted
              ? `[ ${userInput || '_____'} ]`
              : '[ ...bagian kosong... ]'
          )}
        </pre>
      </div>

      {/* Input Form */}
      <form onSubmit={handleCheck} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isSubmitted && isCorrect}
            placeholder="Ketik kata/fungsi yang hilang di sini..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-slate-50/50"
            required
          />
          <button
            type="submit"
            disabled={isSubmitted && isCorrect}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            Periksa Jawaban
          </button>
        </div>
      </form>

      {/* Progressive Hints Section */}
      <div className="mt-3 flex items-center justify-between">
        {hintLevel === 0 && (
          <button
            onClick={() => setHintLevel(1)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-medium hover:text-amber-800 hover:underline cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Butuh Petunjuk?
          </button>
        )}
        {hintLevel === 1 && (
          <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-2">
            <div>💡 <strong>Petunjuk 1:</strong> {exercise.hint1}</div>
            {exercise.hint2 && (
              <button
                onClick={() => setHintLevel(2)}
                className="text-amber-800 font-semibold underline hover:text-amber-950 block text-[11px]"
              >
                Masih kesulitan? Buka Petunjuk 2
              </button>
            )}
          </div>
        )}
        {hintLevel === 2 && exercise.hint2 && (
          <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
            <div>💡 <strong>Petunjuk 1:</strong> {exercise.hint1}</div>
            <div>💡 <strong>Petunjuk 2:</strong> {exercise.hint2}</div>
          </div>
        )}
      </div>

      {/* Result Feedback */}
      {isSubmitted && (
        <div
          className={`mt-4 p-4 rounded-xl border animate-in fade-in duration-200 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Benar! Kamu sudah memahami bagian ini.</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Belum tepat. Coba periksa kembali penjelasannya:</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed mb-3">
            {isCorrect
              ? exercise.explanation
              : `Kata kunci yang benar adalah "${exercise.missingToken}". ${exercise.explanation}`}
          </p>
          {!isCorrect && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-rose-200/70 hover:bg-rose-300 text-rose-900 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Coba Lagi
            </button>
          )}
        </div>
      )}
    </div>
  );
};
