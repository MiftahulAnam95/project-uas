import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { PredictExercise } from '../../types';

interface PredictOutputExerciseProps {
  exercise: PredictExercise;
  onCompleted?: () => void;
}

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
    if (option === exercise.correctAnswer && onCompleted) {
      onCompleted();
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 my-6 transition hover:shadow-md">
      <div className="flex items-center gap-2.5 mb-3 text-indigo-700">
        <HelpCircle className="w-5 h-5" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Latihan Interaktif: Prediksi Hasil Kode
        </span>
      </div>

      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
        {exercise.title}
      </h4>
      <p className="text-sm text-slate-600 mb-4">{exercise.prompt}</p>

      {/* Code Snippet Box */}
      <div className="bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm p-4 rounded-xl mb-4 overflow-x-auto border border-slate-800">
        <pre className="whitespace-pre">{exercise.code}</pre>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {exercise.options.map((option, idx) => {
          let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-300 text-slate-800';

          if (isSubmitted) {
            if (option === exercise.correctAnswer) {
              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
            } else if (option === selectedOption) {
              btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
            } else {
              btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => !isSubmitted && handleSubmit(option)}
              disabled={isSubmitted}
              className={`w-full text-left p-3 sm:p-3.5 rounded-xl border text-sm font-mono flex items-center justify-between transition cursor-pointer disabled:cursor-default ${btnStyle}`}
            >
              <span>{option}</span>
              {isSubmitted && option === exercise.correctAnswer && (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
              )}
              {isSubmitted && option === selectedOption && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Section */}
      {isSubmitted && (
        <div
          className={`p-4 rounded-xl border animate-in fade-in duration-200 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            {isCorrect ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Jawabanmu Tepat! 🎉</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Belum tepat. Coba periksa kembali alasannya di bawah:</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed mb-3">{exercise.explanation}</p>

          {!isCorrect && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-rose-200/80 hover:bg-rose-300/80 text-rose-900 rounded-lg transition"
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
