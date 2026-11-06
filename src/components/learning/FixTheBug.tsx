import React, { useState } from 'react';
import { Bug, CheckCircle2, XCircle, RotateCcw, Eye, EyeOff, Wrench } from 'lucide-react';
import { FixTheBugExercise } from '../../types';
import { MiniCode } from '../code-block/MiniCode';

interface FixTheBugProps {
  exercise: FixTheBugExercise;
}

const normalize = (code: string) =>
  code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+$/g, ''))
    .join('\n')
    .trim();

export const FixTheBug: React.FC<FixTheBugProps> = ({ exercise }) => {
  const [code, setCode] = useState(exercise.buggyCode);
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCheck = () => {
    const isCorrect = normalize(code) === normalize(exercise.answerCode);
    setResult(isCorrect ? 'correct' : 'wrong');
  };

  const handleReset = () => {
    setCode(exercise.buggyCode);
    setResult('idle');
    setShowAnswer(false);
  };

  return (
    <section className="my-6 overflow-hidden rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-50/80 via-white to-white shadow-soft">
      <div className="flex items-center gap-2.5 border-b border-violet-100 bg-violet-50/70 px-4 py-3 sm:px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
          <Wrench className="h-4.5 w-4.5" strokeWidth={2.3} />
        </span>
        <div className="leading-tight">
          <h3 className="text-sm font-extrabold tracking-tight text-slate-900">
            Perbaiki kode yang rusak
          </h3>
          <p className="text-[11px] text-slate-500">{exercise.title}</p>
        </div>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-slate-700">{exercise.prompt}</p>

        <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <Bug className="h-3.5 w-3.5 text-rose-400" /> editor perbaikan
            </span>
            <span className="font-mono text-[10px] text-slate-500">Python</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setResult('idle');
            }}
            spellCheck={false}
            rows={Math.max(6, code.split('\n').length + 1)}
            className="block w-full resize-y bg-[#0a0e1c] px-3 py-3 font-mono text-[12px] leading-relaxed text-slate-200 outline-none focus:ring-1 focus:ring-violet-400 sm:text-[13px]"
            aria-label="Editor perbaikan kode"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCheck}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3.5 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:brightness-110 active:scale-95"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Periksa jawaban
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button
            type="button"
            onClick={() => setShowAnswer(!showAnswer)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-[11px] font-bold text-violet-700 transition hover:bg-violet-100"
          >
            {showAnswer ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {showAnswer ? 'Tutup jawaban' : 'Lihat jawaban'}
          </button>
        </div>

        {result === 'correct' && (
          <div className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 anim-fade">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <p className="text-xs leading-relaxed text-emerald-800">
              Tepat! Kode sudah diperbaiki. {exercise.explanation}
            </p>
          </div>
        )}
        {result === 'wrong' && (
          <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 anim-fade">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            <p className="text-xs leading-relaxed text-rose-800">
              Belum tepat. Bandingkan dengan jawaban, lalu coba lagi. Perhatikan indentasi dan
              tanda kurung.
            </p>
          </div>
        )}

        {showAnswer && (
          <div className="space-y-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-3 anim-fade">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
              Jawaban yang benar
            </p>
            <MiniCode code={exercise.answerCode} label="jawaban" tone="success" />
            <p className="text-xs leading-relaxed text-slate-700">{exercise.explanation}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FixTheBug;
