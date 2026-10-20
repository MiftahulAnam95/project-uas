import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Target,
  ListOrdered,
  Bookmark,
  Sparkles,
  BookOpen,
  PartyPopper,
  CircleDot,
  FileCode2,
  Dumbbell,
} from 'lucide-react';
import { ChapterId } from '../types';
import { CHAPTERS } from '../data/lessons';
import { accentForChapter } from '../theme/accents';
import { CodeBlock } from '../components/code-block/CodeBlock';
import { Callout } from '../components/common/Callout';
import { PageHeader } from '../components/common/PageHeader';
import { Reveal } from '../components/common/Reveal';
import { Button } from '../components/common/Button';
import { PredictOutputExercise } from '../components/learning/PredictOutputExercise';
import { FillInBlankExercise } from '../components/learning/FillInBlankExercise';
import { CodeOrderExercise } from '../components/learning/CodeOrderExercise';
import { ChapterQuiz } from '../components/learning/ChapterQuiz';
import { formatInlineText } from '../utils/formatText';
import { cn } from '../utils/cn';

interface ChapterPageProps {
  chapterId: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  completedChapters: ChapterId[];
  onToggleComplete: (id: ChapterId) => void;
  savedQuizScore?: number;
  onSaveQuizScore: (id: ChapterId, score: number) => void;
  onMarkExerciseDone: (exerciseId: string) => void;
}

export const ChapterPage: React.FC<ChapterPageProps> = ({
  chapterId,
  onSelectChapter,
  completedChapters,
  onToggleComplete,
  savedQuizScore = 0,
  onSaveQuizScore,
  onMarkExerciseDone,
}) => {
  const chapter = CHAPTERS.find((c) => c.id === chapterId) || CHAPTERS[0];
  const isCompleted = completedChapters.includes(chapter.id);
  const accent = accentForChapter(chapter.number);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const nextChapter = chapter.nextChapterId
    ? CHAPTERS.find((c) => c.id === chapter.nextChapterId)
    : undefined;
  const prevChapter = chapter.prevChapterId
    ? CHAPTERS.find((c) => c.id === chapter.prevChapterId)
    : undefined;

  const exerciseCount = useMemo(
    () =>
      (chapter.predictExercises?.length ?? 0) +
      (chapter.fillInBlankExercises?.length ?? 0) +
      (chapter.sequenceExercise ? 1 : 0) +
      (chapter.quiz && chapter.quiz.length > 0 ? 1 : 0),
    [chapter]
  );

  const codeCount = useMemo(
    () =>
      chapter.sections.reduce(
        (n, s) => n + (s.codeSnippets?.length ?? 0),
        0
      ),
    [chapter]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSectionId(chapter.sections[0]?.id ?? '');
  }, [chapter.id, chapter.sections]);

  /* Scroll-spy: tandai sub-materi yang sedang dibaca */
  useEffect(() => {
    const ids = chapter.sections.map((s) => s.id);
    if (!ids.length || !('IntersectionObserver' in window)) return;

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => !!n);
    if (!nodes.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let bestId = '';
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId && bestRatio > 0) {
          setActiveSectionId(bestId);
        }
      },
      { threshold: [0.05, 0.25, 0.5, 0.75], rootMargin: '-96px 0px -55% 0px' }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [chapter.id, chapter.sections]);

  const activeIndex = chapter.sections.findIndex((s) => s.id === activeSectionId);
  const readProgress =
    chapter.sections.length > 0
      ? Math.round(((activeIndex + 1) / chapter.sections.length) * 100)
      : 0;

  return (
    <div className="max-w-6xl mx-auto py-4 sm:py-8">
      {/* ======================= KEPALA BAB ======================= */}
      <PageHeader
        eyebrow={`Bab ${chapter.number} dari ${CHAPTERS.length} · Modul Resmi`}
        icon={BookOpen}
        title={chapter.title}
        description={
          <>
            <span className="font-semibold text-white">{chapter.subtitle}</span>
            <span className="mt-2 block">{formatInlineText(chapter.description, 'dark')}</span>
          </>
        }
        stats={[
          { label: 'Sub-materi', value: String(chapter.sections.length) },
          { label: 'Contoh kode', value: String(codeCount) },
          { label: 'Latihan & kuis', value: String(exerciseCount) },
        ]}
        actions={
          <Button
            size="md"
            onClick={() => onToggleComplete(chapter.id)}
            className={cn(
              isCompleted
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-[0_12px_28px_-12px_rgba(16,185,129,0.9)] hover:from-emerald-400 hover:to-teal-300'
                : 'border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20'
            )}
          >
            {isCompleted ? (
              <>
                <PartyPopper className="h-4 w-4" />
                Bab Sudah Selesai
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Tandai Bab Selesai
              </>
            )}
          </Button>
        }
        className={cn(
          // Tiap bab punya rona gradasi sendiri lewat aksen strip di bawah
          'mb-8'
        )}
      >
        {/* Tujuan pembelajaran */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-200">
            <Target className="h-4 w-4" />
            Tujuan pembelajaran bab ini
          </div>
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {chapter.learningGoals.map((goal, idx) => (
              <li
                key={idx}
                className="group flex items-start gap-2.5 rounded-2xl border border-white/10 bg-slate-950/25 p-3 text-xs leading-relaxed text-slate-200 transition hover:border-white/25 hover:bg-slate-950/40 sm:text-[13px]"
              >
                <span
                  className={cn(
                    'mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-extrabold text-white',
                    accent.iconTile
                  )}
                >
                  {idx + 1}
                </span>
                <span>{formatInlineText(goal, 'dark')}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageHeader>

      {/* ======================= ISI ======================= */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Kolom utama */}
        <div className="space-y-8 lg:col-span-9">
          {chapter.sections.map((section, idx) => (
            <Reveal key={section.id}>
              <section
                id={section.id}
                className={cn(
                  'group relative scroll-mt-28 space-y-5 overflow-hidden rounded-4xl border bg-white/85 p-5 shadow-soft backdrop-blur-xl transition-all duration-300 sm:p-8',
                  activeSectionId === section.id
                    ? 'border-brand-200 shadow-lift'
                    : 'border-slate-200/80 hover:border-slate-300'
                )}
              >
                {/* Strip aksen kiri mengikuti bab */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-y-0 left-0 w-1 bg-gradient-to-b opacity-70',
                    accent.bar
                  )}
                />

                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 group-hover:scale-105',
                      accent.iconTile
                    )}
                  >
                    <Bookmark className="h-4.5 w-4.5" strokeWidth={2.3} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 tabular">
                        Bagian {idx + 1}/{chapter.sections.length}
                      </span>
                      {activeSectionId === section.id && (
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider anim-fade',
                            accent.chip,
                            'border'
                          )}
                        >
                          <CircleDot className="h-3 w-3" />
                          Sedang dibaca
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 whitespace-pre-line text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                  {formatInlineText(section.content)}
                </div>

                {section.analogy && (
                  <Callout type="analogy" title="Perumpamaan Sehari-hari">
                    {formatInlineText(section.analogy)}
                  </Callout>
                )}

                {section.codeSnippets && section.codeSnippets.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {section.codeSnippets.map((snippet) => (
                      <CodeBlock
                        key={snippet.id}
                        code={snippet.code}
                        title={snippet.title}
                        filename={snippet.filename}
                        explanation={snippet.explanation}
                        output={snippet.output}
                        lineExplanations={snippet.lineExplanations}
                        highlightLines={snippet.highlightLines}
                        isSimulated={snippet.isSimulated}
                      />
                    ))}
                  </div>
                )}

                {section.importantNotes && section.importantNotes.length > 0 && (
                  <Callout type="info" title="Catatan Penting">
                    <ul className="ml-4 list-disc space-y-1.5 marker:text-sky-500">
                      {section.importantNotes.map((note, i) => (
                        <li key={i}>{formatInlineText(note)}</li>
                      ))}
                    </ul>
                  </Callout>
                )}

                {section.commonMistakes && section.commonMistakes.length > 0 && (
                  <Callout type="warning" title="Kesalahan Umum Pemula">
                    <ul className="ml-4 list-disc space-y-1.5 marker:text-amber-600">
                      {section.commonMistakes.map((mistake, i) => (
                        <li key={i}>{formatInlineText(mistake)}</li>
                      ))}
                    </ul>
                  </Callout>
                )}
              </section>
            </Reveal>
          ))}

          {/* Latihan interaktif */}
          {(chapter.predictExercises?.length || chapter.fillInBlankExercises?.length) && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pt-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-sm">
                  <Dumbbell className="h-4 w-4" strokeWidth={2.3} />
                </span>
                <div className="leading-tight">
                  <h3 className="text-sm font-extrabold tracking-tight text-slate-900">
                    Waktunya Latihan
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Kerjakan tanpa terburu-buru — salah itu bagian dari belajar.
                  </p>
                </div>
              </div>

              {chapter.predictExercises?.map((ex) => (
                <PredictOutputExercise
                  key={ex.id}
                  exercise={ex}
                  onCompleted={() => onMarkExerciseDone(ex.id)}
                />
              ))}

              {chapter.fillInBlankExercises?.map((ex) => (
                <FillInBlankExercise
                  key={ex.id}
                  exercise={ex}
                  onCompleted={() => onMarkExerciseDone(ex.id)}
                />
              ))}
            </div>
          )}

          {chapter.sequenceExercise && (
            <CodeOrderExercise
              exercise={chapter.sequenceExercise}
              onCompleted={() => onMarkExerciseDone(chapter.sequenceExercise!.id)}
            />
          )}

          {chapter.quiz && chapter.quiz.length > 0 && (
            <ChapterQuiz
              chapterId={chapter.id}
              chapterTitle={`Bab ${chapter.number}`}
              questions={chapter.quiz}
              savedScore={savedQuizScore}
              onScoreSave={onSaveQuizScore}
            />
          )}

          {/* Ringkasan inti */}
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl border border-brand-200/70 bg-gradient-to-br from-brand-50 via-white to-aqua-50/50 p-6 shadow-soft sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-grape-200/40 blur-3xl"
              />
              <div className="relative flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-grape-500 text-white shadow-[0_10px_24px_-10px_rgba(106,90,232,0.9)]">
                  <Sparkles className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
                    Ringkasan Inti Bab {chapter.number}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kalau cuma sempat mengingat satu bagian, ingat yang ini.
                  </p>
                </div>
              </div>

              <ul className="relative mt-5 grid gap-2.5 sm:grid-cols-2">
                {chapter.summaryPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-2xl border border-white bg-white/80 p-3 text-xs leading-relaxed text-slate-700 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift sm:text-[13px]"
                  >
                    <CheckCircle2
                      className="mt-px h-4 w-4 shrink-0 text-emerald-600"
                      strokeWidth={2.4}
                    />
                    <span>{formatInlineText(point)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Navigasi antar bab */}
          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {prevChapter ? (
              <button
                type="button"
                onClick={() => onSelectChapter(prevChapter.id)}
                className="group flex cursor-pointer items-center gap-3 rounded-3xl border border-slate-200/80 bg-white/80 p-4 text-left shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition group-hover:-translate-x-0.5 group-hover:bg-brand-50 group-hover:text-brand-600">
                  <ArrowLeft className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Bab sebelumnya
                  </span>
                  <span className="block truncate text-sm font-extrabold text-slate-800">
                    {prevChapter.title}
                  </span>
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <button
                type="button"
                onClick={() => onSelectChapter(nextChapter.id)}
                className={cn(
                  'group relative flex cursor-pointer items-center justify-end gap-3 overflow-hidden rounded-3xl p-4 text-right text-white shadow-lift transition hover:-translate-y-0.5 sm:col-start-2'
                )}
                style={{
                  backgroundImage: `linear-gradient(120deg, ${accentForChapter(
                    nextChapter.number
                  ).hex}, ${accentForChapter(nextChapter.number).hex2})`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125"
                />
                <span className="relative min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/75">
                    Lanjut ke bab {nextChapter.number}
                  </span>
                  <span className="block truncate text-sm font-extrabold">
                    {nextChapter.title}
                  </span>
                </span>
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4.5 w-4.5" />
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSelectChapter('bab-1')}
                className="group flex cursor-pointer items-center justify-end gap-3 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-400 p-4 text-right text-white shadow-lift transition hover:-translate-y-0.5 sm:col-start-2"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/80">
                    Kurikulum selesai
                  </span>
                  <span className="block text-sm font-extrabold">Ulangi dari Bab 1</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/20 transition-transform group-hover:rotate-180">
                  <ArrowLeft className="h-4.5 w-4.5" />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* ======================= TOC STICKY ======================= */}
        <div className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-[5.5rem] space-y-3">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 shadow-soft backdrop-blur-xl">
              {/* Progres baca bab ini */}
              <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ListOrdered className={cn('h-4 w-4', accent.text)} />
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                      Daftar isi bab ini
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold tabular text-slate-400">
                    {Math.max(activeIndex + 1, 1)}/{chapter.sections.length}
                  </span>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={cn(
                      'h-full rounded-full bg-gradient-to-r transition-[width] duration-500',
                      accent.bar
                    )}
                    style={{ width: `${readProgress}%` }}
                  />
                </div>
              </div>

              {/* Daftar bagian */}
              <nav className="thin-scrollbar max-h-[46vh] space-y-0.5 overflow-y-auto p-2.5">
                {chapter.sections.map((sec, idx) => {
                  const isActive = activeSectionId === sec.id;
                  const isPast = idx < activeIndex;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={cn(
                        'group flex items-start gap-2 rounded-xl px-2.5 py-2 text-[11px] leading-snug transition',
                        isActive
                          ? cn('border font-extrabold shadow-soft', accent.chip)
                          : isPast
                          ? 'font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                          : 'font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      )}
                    >
                      <span
                        className={cn(
                          'mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-md text-[9px] font-extrabold tabular transition',
                          isActive
                            ? 'bg-gradient-to-br text-white ' + accent.iconTile
                            : isPast
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        )}
                      >
                        {isPast && !isActive ? '✓' : idx + 1}
                      </span>
                      <span className="min-w-0 flex-1">{sec.title}</span>
                    </a>
                  );
                })}
              </nav>

              {/* Status bab */}
              <div className="space-y-2 border-t border-slate-100 p-3">
                <button
                  type="button"
                  onClick={() => onToggleComplete(chapter.id)}
                  className={cn(
                    'btn w-full text-xs',
                    isCompleted
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-[0_10px_22px_-12px_rgba(5,150,105,0.9)]'
                      : 'btn-primary'
                  )}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.6} />
                      Bab Selesai ✓
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-3.5 w-3.5" />
                      Tandai Selesai
                    </>
                  )}
                </button>

                {savedQuizScore > 0 && (
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200/70">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      Skor kuis bab ini
                    </span>
                    <span
                      className={cn(
                        'font-extrabold tabular',
                        savedQuizScore >= 80 ? 'text-emerald-600' : 'text-amber-600'
                      )}
                    >
                      {savedQuizScore}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Kartu kecil: ke proyek akhir */}
            <button
              type="button"
              onClick={() => onSelectChapter('bab-11')}
              className="group flex w-full cursor-pointer items-center gap-3 rounded-3xl border border-slate-200/80 bg-white/80 p-3.5 text-left shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-sm transition-transform group-hover:rotate-6">
                <FileCode2 className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-extrabold text-slate-800">
                  Siap merakit programnya?
                </span>
                <span className="block text-[11px] text-slate-500">
                  Lihat kode utuh 3 file →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
