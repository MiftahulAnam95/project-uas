import React, { useState } from 'react';
import {
  Bug,
  CheckCircle2,
  XCircle,
  Wrench,
  Terminal,
  HelpCircle,
  LifeBuoy,
  SearchCode,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { PYTHON_ERRORS } from '../data/errors';
import { PythonErrorGuide } from '../types';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Reveal } from '../components/common/Reveal';
import { MiniCode } from '../components/code-block/MiniCode';
import { FeedbackPanel } from '../components/learning/FeedbackPanel';
import { celebrateSmall } from '../utils/celebrate';
import { formatInlineText } from '../utils/formatText';
import { cn } from '../utils/cn';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const READ_TRACEBACK_STEPS = [
  {
    icon: SearchCode,
    title: 'Baca dari baris paling bawah',
    desc: 'Nama error dan alasannya selalu ada di kalimat terakhir traceback.',
    tile: 'from-rose-500 to-orange-400',
  },
  {
    icon: Terminal,
    title: 'Cari nama file & nomor baris',
    desc: 'Python menyebut "File pencatat.py, line 12" — itulah lokasi kejadian.',
    tile: 'from-amber-500 to-yellow-400',
  },
  {
    icon: Wrench,
    title: 'Perbaiki satu hal, jalankan lagi',
    desc: 'Ubah satu bagian saja lalu jalankan ulang. Jangan mengubah banyak hal sekaligus.',
    tile: 'from-emerald-500 to-teal-400',
  },
];

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
    if (
      practiceAnswers[errId] ===
      PYTHON_ERRORS.find((e) => e.id === errId)?.practiceSnippet.correctIndex
    ) {
      celebrateSmall();
    }
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

  const selected = practiceAnswers[currentError.id];
  const submitted = practiceSubmitted[currentError.id];
  const practiceCorrect = selected === currentError.practiceSnippet.correctIndex;

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 sm:py-10">
      {/* ============================ HEADER ============================ */}
      <PageHeader
        eyebrow="Bab 8 · Pusat bantuan debugging"
        icon={Bug}
        accent="rose"
        title="Error yang Sering Muncul & Cara Mengatasinya"
        highlight="Cara Mengatasinya"
        description="Jangan panik saat melihat teks merah di layar! Pesan error Python adalah petunjuk akurat dari penerjemahnya untuk membantumu menemukan baris yang perlu diperbaiki."
        stats={[
          { label: 'Error dibahas', value: String(PYTHON_ERRORS.length) },
          { label: 'Latihan tebak', value: String(PYTHON_ERRORS.length) },
          { label: 'Level', value: 'Pemula' },
        ]}
      />

      {/* ================== CARA MEMBACA TRACEBACK ================== */}
      <Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {READ_TRACEBACK_STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative flex items-start gap-3 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:shadow-lift"
              >
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6',
                    s.tile
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Langkah {idx + 1}
                  </div>
                  <h3 className="text-sm font-extrabold tracking-tight text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* ================== PILIHAN ERROR ================== */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
          <LifeBuoy className="h-4 w-4 text-rose-500" />
          Pilih error yang sedang kamu hadapi
        </div>
        <div className="thin-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-2">
          {PYTHON_ERRORS.map((err) => {
            const isSelected = err.id === currentError.id;
            const isSolved = practiceSubmitted[err.id] && practiceCorrect;
            return (
              <button
                key={err.id}
                type="button"
                onClick={() => setSelectedErrorId(err.id)}
                className={cn(
                  'group flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-extrabold transition-all duration-200 sm:text-[13px]',
                  isSelected
                    ? 'border-transparent bg-gradient-to-r from-rose-600 to-orange-500 text-white shadow-[0_14px_30px_-14px_rgba(225,29,72,0.9)]'
                    : 'border-slate-200 bg-white/85 text-slate-700 shadow-soft hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50/60 hover:text-rose-700'
                )}
              >
                <span
                  className={cn(
                    'font-mono text-[11px] font-bold tracking-tight',
                    isSelected ? 'text-white/80' : 'text-slate-400 group-hover:text-rose-400'
                  )}
                >
                  {err.errorName}
                </span>
                {isSolved && (
                  <CheckCircle2
                    className={cn(
                      'h-3.5 w-3.5',
                      isSelected ? 'text-white' : 'text-emerald-500'
                    )}
                    strokeWidth={3}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================== DETAIL ERROR ================== */}
      <Card key={currentError.id} className="space-y-8 p-5 anim-fade sm:p-8">
        {/* Kepala detail */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 font-mono text-xs font-extrabold text-rose-700 shadow-soft">
              <ShieldAlert className="h-3.5 w-3.5" />
              {currentError.errorName}
            </span>
            <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-500">
              {PYTHON_ERRORS.findIndex((e) => e.id === currentError.id) + 1} dari{' '}
              {PYTHON_ERRORS.length}
            </span>
          </div>

          <h2 className="text-lg font-extrabold leading-snug tracking-tight text-slate-900 sm:text-2xl">
            {currentError.title}
          </h2>

          <div className="relative overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-br from-amber-50 via-white to-orange-50/60 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-[0_10px_22px_-12px_rgba(217,119,6,0.9)]">
                <HelpCircle className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              <p className="text-xs leading-relaxed text-amber-950 sm:text-sm">
                <strong className="font-extrabold">Arti dalam bahasa manusia:</strong>{' '}
                {formatInlineText(currentError.simpleMeaning)}
              </p>
            </div>
          </div>
        </div>

        {/* Salah vs Benar */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Kode salah */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-sm">
                <XCircle className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-rose-700">
                Kode yang salah (memicu error)
              </h3>
            </div>
            <MiniCode
              code={currentError.sampleBrokenCode}
              tone="danger"
              label="contoh_salah.py"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                <Terminal className="h-3.5 w-3.5" />
                Pesan traceback asli di terminal
              </div>
              <MiniCode
                code={currentError.terminalOutput}
                asOutput
                tone="danger"
                label="traceback"
                className="[&_pre]:text-rose-300/95"
              />
            </div>
          </div>

          {/* Kode benar */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-sm">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                Kode setelah diperbaiki
              </h3>
            </div>
            <MiniCode
              code={currentError.sampleFixedCode}
              tone="success"
              label="sudah_diperbaiki.py"
            />
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50/60 p-4">
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                <Wrench className="h-3.5 w-3.5" />
                Cara memperbaiki
              </div>
              <p className="mt-2 text-xs leading-relaxed text-emerald-950/85 sm:text-[13px]">
                {formatInlineText(currentError.howToFix)}
              </p>
            </div>
          </div>
        </div>

        {/* Penyebab umum */}
        <div className="space-y-3 border-t border-slate-100 pt-6">
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-600">
            Penyebab umum yang sering terjadi
          </h3>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {currentError.commonCauses.map((cause, idx) => (
              <li
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-soft transition hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-lift"
              >
                <span className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 text-[10px] font-extrabold text-white shadow-sm">
                    {idx + 1}
                  </span>
                  <span className="text-xs leading-relaxed text-slate-700">
                    {formatInlineText(cause)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latihan tebak perbaikan */}
        <div className="space-y-4 rounded-4xl border border-brand-200/70 bg-gradient-to-br from-brand-50/80 via-white to-white p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-grape-500 text-white shadow-[0_12px_26px_-14px_rgba(106,90,232,0.9)]">
              <HelpCircle className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
                Uji pemahaman
              </div>
              <h3 className="text-base font-extrabold tracking-tight text-slate-900">
                Tebak cara memperbaiki error ini
              </h3>
            </div>
          </div>

          <p className="text-sm font-semibold text-slate-800">
            {formatInlineText(currentError.practiceSnippet.question)}
          </p>

          <MiniCode
            code={currentError.practiceSnippet.buggyCode}
            tone="danger"
            label="kode bermasalah"
          />

          <div className="space-y-2 pt-1">
            {currentError.practiceSnippet.options.map((opt, optIdx) => {
              const isAnswer = optIdx === currentError.practiceSnippet.correctIndex;
              const isPicked = selected === optIdx;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectPracticeOption(currentError.id, optIdx)}
                  disabled={submitted}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-2xl border p-3 text-left text-xs transition-all duration-200 sm:text-[13px]',
                    !submitted &&
                      (isPicked
                        ? 'border-brand-500 bg-white font-semibold text-brand-900 shadow-[0_10px_24px_-16px_rgba(106,90,232,0.9)] ring-2 ring-brand-200'
                        : 'border-slate-200 bg-white/85 text-slate-700 hover:-translate-y-px hover:border-brand-200 hover:bg-white hover:shadow-soft cursor-pointer'),
                    submitted && isAnswer && 'border-emerald-400 bg-emerald-50 text-emerald-950',
                    submitted && isPicked && !isAnswer && 'border-rose-400 bg-rose-50 text-rose-950',
                    submitted && !isPicked && !isAnswer && 'border-slate-200 bg-white/60 text-slate-400 opacity-70',
                    submitted && 'cursor-default'
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold transition-colors',
                        submitted && isAnswer
                          ? 'bg-emerald-500 text-white'
                          : submitted && isPicked
                          ? 'bg-rose-500 text-white'
                          : isPicked
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      )}
                    >
                      {LETTERS[optIdx] ?? optIdx + 1}
                    </span>
                    <span className="min-w-0 font-mono text-[11px] sm:text-xs">
                      {opt}
                    </span>
                  </span>
                  {submitted && isAnswer && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  )}
                  {submitted && isPicked && !isAnswer && (
                    <XCircle className="h-4 w-4 shrink-0 text-rose-500" strokeWidth={2.5} />
                  )}
                </button>
              );
            })}
          </div>

          {!submitted ? (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleSubmitPractice(currentError.id)}
                disabled={selected === undefined}
                className="btn btn-primary px-5 py-2.5 text-xs disabled:cursor-not-allowed"
              >
                <ArrowRight className="h-4 w-4" />
                Periksa Jawaban
              </button>
              <span className="text-[11px] font-semibold text-slate-500">
                {selected === undefined
                  ? 'Pilih salah satu jawaban dulu, ya.'
                  : 'Jawaban terpilih siap diperiksa.'}
              </span>
            </div>
          ) : (
            <FeedbackPanel
              correct={practiceCorrect}
              celebrate={practiceCorrect}
              heading={practiceCorrect ? 'Tepat! Kamu sudah bisa membaca error ini.' : 'Belum tepat.'}
              onRetry={practiceCorrect ? undefined : () => handleResetPractice(currentError.id)}
              retryLabel="Coba Pertanyaan Ini Lagi"
            >
              {formatInlineText(currentError.practiceSnippet.explanation)}
            </FeedbackPanel>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DebuggingPage;
