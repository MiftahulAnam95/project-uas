import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  ListOrdered, 
  Bookmark, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ChapterId } from '../types';
import { CHAPTERS } from '../data/lessons';
import { CodeBlock } from '../components/code-block/CodeBlock';
import { Callout } from '../components/common/Callout';
import { PredictOutputExercise } from '../components/learning/PredictOutputExercise';
import { FillInBlankExercise } from '../components/learning/FillInBlankExercise';
import { CodeOrderExercise } from '../components/learning/CodeOrderExercise';
import { ChapterQuiz } from '../components/learning/ChapterQuiz';

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
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (chapter.sections.length > 0) {
      setActiveSectionId(chapter.sections[0].id);
    }
  }, [chapter.id]);

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10">
      {/* Chapter Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
              Bab {chapter.number} dari {CHAPTERS.length}
            </span>
            <span className="text-xs text-slate-400">• Modul Resmi</span>
          </div>

          {/* Mark as Complete Toggle */}
          <button
            onClick={() => onToggleComplete(chapter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                <span>Bab Sudah Selesai</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>Tandai Bab Selesai</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          {chapter.title}
        </h1>
        <p className="text-sm sm:text-lg text-indigo-600 font-semibold mb-4">
          {chapter.subtitle}
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {chapter.description}
        </p>

        {/* Learning Goals (Tujuan Pembelajaran) */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Target className="w-4 h-4" />
            <span>Tujuan Pembelajaran Bab Ini</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {chapter.learningGoals.map((goal, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80"
              >
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout with optional Section Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-9 space-y-10">
          {/* Chapter Sections */}
          {chapter.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>{section.title}</span>
              </h2>

              {/* Text content with paragraphs */}
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
                {section.content}
              </div>

              {/* Everyday Analogy if present */}
              {section.analogy && (
                <Callout type="analogy" title="Perumpamaan Sehari-hari">
                  {section.analogy}
                </Callout>
              )}

              {/* Code Snippets */}
              {section.codeSnippets && section.codeSnippets.length > 0 && (
                <div className="space-y-6 pt-2">
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

              {/* Important Notes */}
              {section.importantNotes && section.importantNotes.length > 0 && (
                <Callout type="info" title="Catatan Penting">
                  <ul className="list-disc pl-5 space-y-1">
                    {section.importantNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </Callout>
              )}

              {/* Common Mistakes */}
              {section.commonMistakes && section.commonMistakes.length > 0 && (
                <Callout type="warning" title="Kesalahan Umum Pemula">
                  <ul className="list-disc pl-5 space-y-1">
                    {section.commonMistakes.map((mistake, idx) => (
                      <li key={idx}>{mistake}</li>
                    ))}
                  </ul>
                </Callout>
              )}
            </section>
          ))}

          {/* Predict Output Exercises if present */}
          {chapter.predictExercises && chapter.predictExercises.length > 0 && (
            <div className="space-y-4">
              {chapter.predictExercises.map((ex) => (
                <PredictOutputExercise
                  key={ex.id}
                  exercise={ex}
                  onCompleted={() => onMarkExerciseDone(ex.id)}
                />
              ))}
            </div>
          )}

          {/* Fill in the blank Exercises if present */}
          {chapter.fillInBlankExercises && chapter.fillInBlankExercises.length > 0 && (
            <div className="space-y-4">
              {chapter.fillInBlankExercises.map((ex) => (
                <FillInBlankExercise
                  key={ex.id}
                  exercise={ex}
                  onCompleted={() => onMarkExerciseDone(ex.id)}
                />
              ))}
            </div>
          )}

          {/* Sequence Sort Exercise if present */}
          {chapter.sequenceExercise && (
            <CodeOrderExercise
              exercise={chapter.sequenceExercise}
              onCompleted={() => onMarkExerciseDone(chapter.sequenceExercise!.id)}
            />
          )}

          {/* Chapter Quiz */}
          {chapter.quiz && chapter.quiz.length > 0 && (
            <ChapterQuiz
              chapterId={chapter.id}
              chapterTitle={`Bab ${chapter.number}`}
              questions={chapter.quiz}
              savedScore={savedQuizScore}
              onScoreSave={onSaveQuizScore}
            />
          )}

          {/* Summary Box (Ringkasan Bab) */}
          <div className="bg-gradient-to-br from-indigo-50/70 to-slate-50 rounded-3xl border border-indigo-200/80 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-base">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Ringkasan Inti Bab {chapter.number}</span>
            </div>
            <ul className="space-y-2.5">
              {chapter.summaryPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Previous & Next Chapter Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
            {chapter.prevChapterId ? (
              <button
                onClick={() => onSelectChapter(chapter.prevChapterId!)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-semibold transition active:scale-95 cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Bab Sebelumnya</span>
              </button>
            ) : (
              <div />
            )}

            {chapter.nextChapterId ? (
              <button
                onClick={() => onSelectChapter(chapter.nextChapterId!)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-200 transition active:scale-95 cursor-pointer"
              >
                <span>Lanjut ke Bab Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onSelectChapter('bab-1')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition active:scale-95 cursor-pointer"
              >
                <span>Ulangi dari Bab 1</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Sticky Table of Contents Column (Desktop) */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
              <ListOrdered className="w-4 h-4 text-indigo-600" />
              <span>Daftar Isi Bab Ini</span>
            </div>

            <nav className="space-y-1 text-xs">
              {chapter.sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`block p-2 rounded-lg transition leading-snug ${
                    activeSectionId === sec.id
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {sec.title}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100">
              <div className="text-[11px] text-slate-500 mb-2">Status Bab Ini:</div>
              <button
                onClick={() => onToggleComplete(chapter.id)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bab Selesai ✓</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Tandai Selesai</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
