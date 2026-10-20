import React, { useState } from 'react';
import { Bug, CheckCircle2, XCircle, AlertCircle, Wrench, Terminal, HelpCircle } from 'lucide-react';
import { PYTHON_ERRORS } from '../data/errors';
import { PythonErrorGuide } from '../types';

export const DebuggingPage: React.FC = () => {
  const [selectedErrorId, setSelectedErrorId] = useState<string>(PYTHON_ERRORS[0].id);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState<Record<string, boolean>>({});

  const currentError: PythonErrorGuide =
    PYTHON_ERRORS.find((e) => e.id === selectedErrorId) || PYTHON_ERRORS[0];

  const handleSelectPracticeOption = (errId: string, optIdx: number) => {
    if (practiceSubmitted[errId]) return;
    setPracticeAnswers((prev) => ({ ...prev, [errId]: optIdx }));
  };

  const handleSubmitPractice = (errId: string) => {
    setPracticeSubmitted((prev) => ({ ...prev, [errId]: true }));
  };

  const handleResetPractice = (errId: string) => {
    setPracticeAnswers((prev) => {
      const copy = { ...prev };
      delete copy[errId];
      return copy;
    });
    setPracticeSubmitted((prev) => {
      const copy = { ...prev };
      delete copy[errId];
      return copy;
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
          <Bug className="w-4 h-4" />
          <span>Bab 8 & Pusat Bantuan Debugging</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Error yang Sering Muncul & Cara Mengatasinya
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Jangan panik saat melihat teks merah di layar! Pesan error di Python adalah petunjuk akurat dari penerjemah untuk membantumu menemukan bagian kode yang perlu diperbaiki.
        </p>
      </div>

      {/* Error Tabs Navigator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {PYTHON_ERRORS.map((err) => {
          const isSelected = err.id === currentError.id;
          return (
            <button
              key={err.id}
              onClick={() => setSelectedErrorId(err.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{err.errorName}</span>
            </button>
          );
        })}
      </div>

      {/* Main Error Detail Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        {/* Error Header */}
        <div className="space-y-2 pb-6 border-b border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-mono text-xs font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{currentError.errorName}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {currentError.title}
          </h2>
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed">
            <strong>Arti dalam bahasa manusia:</strong> {currentError.simpleMeaning}
          </div>
        </div>

        {/* Side-by-side or stacked Broken Code vs Fixed Code */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Broken Code & Traceback */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase">
              <XCircle className="w-4 h-4" />
              <span>Contoh Kode yang Salah (Menyebabkan Error)</span>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-rose-900/40 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
              <pre className="whitespace-pre">{currentError.sampleBrokenCode}</pre>
            </div>

            {/* Simulated Terminal Output */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>Pesan Traceback Asli di Terminal:</span>
              </div>
              <div className="bg-black/90 rounded-2xl border border-rose-800/50 p-4 font-mono text-xs text-rose-300 overflow-x-auto leading-relaxed">
                <pre className="whitespace-pre-wrap">{currentError.terminalOutput}</pre>
              </div>
            </div>
          </div>

          {/* Fixed Code & How to Fix */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Contoh Kode Setelah Diperbaiki</span>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-emerald-900/40 p-4 font-mono text-xs text-emerald-300 overflow-x-auto">
              <pre className="whitespace-pre">{currentError.sampleFixedCode}</pre>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase">
                <Wrench className="w-4 h-4 text-emerald-700" />
                <span>Cara Memperbaiki:</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {currentError.howToFix}
              </p>
            </div>
          </div>
        </div>

        {/* Common Causes List */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Penyebab Umum yang Sering Terjadi:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentError.commonCauses.map((cause, idx) => (
              <li
                key={idx}
                className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed"
              >
                &bull; {cause}
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Practice Snippet */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Uji Pemahaman: Tebak Cara Memperbaiki Error Ini</span>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <p className="text-sm font-semibold text-slate-900">
              {currentError.practiceSnippet.question}
            </p>

            <div className="bg-slate-900 text-slate-200 font-mono text-xs p-3.5 rounded-xl overflow-x-auto">
              <pre>{currentError.practiceSnippet.buggyCode}</pre>
            </div>

            {/* Options */}
            <div className="space-y-2 pt-2">
              {currentError.practiceSnippet.options.map((opt, optIdx) => {
                const selected = practiceAnswers[currentError.id];
                const submitted = practiceSubmitted[currentError.id];
                const isCorrect = optIdx === currentError.practiceSnippet.correctIndex;

                let optStyle = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700';

                if (submitted) {
                  if (isCorrect) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (selected === optIdx) {
                    optStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                  } else {
                    optStyle = 'border-slate-200 bg-white/50 text-slate-400 opacity-60';
                  }
                } else if (selected === optIdx) {
                  optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-500';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectPracticeOption(currentError.id, optIdx)}
                    disabled={submitted}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition cursor-pointer disabled:cursor-default ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {submitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {submitted && selected === optIdx && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Practice Action */}
            {!practiceSubmitted[currentError.id] ? (
              <button
                onClick={() => handleSubmitPractice(currentError.id)}
                disabled={practiceAnswers[currentError.id] === undefined}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                Periksa Jawaban
              </button>
            ) : (
              <div className="mt-3 p-4 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <div className="font-bold text-slate-900">Pembahasan:</div>
                <p>{currentError.practiceSnippet.explanation}</p>
                <button
                  onClick={() => handleResetPractice(currentError.id)}
                  className="text-xs font-semibold text-indigo-600 hover:underline pt-1 block cursor-pointer"
                >
                  Coba Pertanyaan Ini Lagi
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
