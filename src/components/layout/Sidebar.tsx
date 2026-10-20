import React from 'react';
import { CheckCircle2, Circle, ChevronRight, BookOpen } from 'lucide-react';
import { CHAPTERS } from '../../data/lessons';
import { ChapterId } from '../../types';

interface SidebarProps {
  currentChapterId: ChapterId;
  onSelectChapter: (chapterId: ChapterId) => void;
  completedChapters: ChapterId[];
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentChapterId,
  onSelectChapter,
  completedChapters,
  className = '',
}) => {
  return (
    <aside
      className={`bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden ${className}`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Daftar Bab Pembelajaran
          </h2>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {completedChapters.length}/11 Selesai
        </span>
      </div>

      {/* Chapters Scrollable List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {CHAPTERS.map((chap) => {
          const isCurrent = chap.id === currentChapterId;
          const isDone = completedChapters.includes(chap.id);

          return (
            <button
              key={chap.id}
              onClick={() => onSelectChapter(chap.id)}
              className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 group cursor-pointer ${
                isCurrent
                  ? 'bg-indigo-50 border border-indigo-200/80 shadow-xs text-indigo-950 font-semibold'
                  : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
              }`}
            >
              {/* Checkmark or number icon */}
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle
                    className={`w-4 h-4 ${
                      isCurrent
                        ? 'text-indigo-600 fill-indigo-100'
                        : 'text-slate-300 group-hover:text-slate-400'
                    }`}
                  />
                )}
              </div>

              {/* Chapter meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-[11px] uppercase tracking-wide font-bold ${
                      isCurrent ? 'text-indigo-600' : 'text-slate-400'
                    }`}
                  >
                    Bab {chap.number}
                  </span>
                  {isCurrent && (
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  )}
                </div>
                <div
                  className={`text-xs sm:text-sm truncate font-medium ${
                    isCurrent ? 'text-slate-900 font-bold' : 'text-slate-700'
                  }`}
                >
                  {chap.title}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Hint */}
      <div className="p-3 bg-slate-50/80 border-t border-slate-100 text-[11px] text-slate-500 leading-tight">
        💡 <em>Progres belajar kamu tersimpan otomatis di perangkat ini.</em>
      </div>
    </aside>
  );
};
