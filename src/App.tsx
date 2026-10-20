import { useState, useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';
import { Navbar, ActiveTab } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/common/BackToTop';
import { HomePage } from './pages/HomePage';
import { ChapterPage } from './pages/ChapterPage';
import { FlowVisualizerPage } from './pages/FlowVisualizerPage';
import { DebuggingPage } from './pages/DebuggingPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { ProjectPage } from './pages/ProjectPage';
import { useProgress } from './hooks/useProgress';
import { ChapterId } from './types';
import { CHAPTERS } from './data/lessons';

export function App() {
  const {
    progress,
    toggleChapterComplete,
    setLastVisited,
    saveQuizScore,
    markExerciseCompleted,
    toggleChecklistItem,
    resetAllProgress,
    totalChapters,
    completedCount,
    percentage,
  } = useProgress();

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentChapterId, setCurrentChapterId] = useState<ChapterId>(
    progress.lastVisitedChapter || 'bab-1'
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync with browser hash on initial load
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (hash === 'flow') {
        setActiveTab('flow');
      } else if (hash === 'debugging') {
        setActiveTab('debugging');
      } else if (hash === 'glossary') {
        setActiveTab('glossary');
      } else if (hash === 'project') {
        setActiveTab('project');
      } else if (hash.startsWith('bab-')) {
        const found = CHAPTERS.find((c) => c.id === hash);
        if (found) {
          setCurrentChapterId(found.id);
          setActiveTab('chapter');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keep document title in sync with the active view
  useEffect(() => {
    const tabTitles: Record<ActiveTab, string> = {
      home: 'Beranda',
      chapter: currentChapterId
        ? `Bab ${CHAPTERS.find((c) => c.id === currentChapterId)?.number ?? 1} — ${
            CHAPTERS.find((c) => c.id === currentChapterId)?.title ?? 'Materi'
          }`
        : 'Materi',
      flow: 'Simulasi Alur Program',
      debugging: 'Bantuan Error Python',
      glossary: 'Kamus Istilah',
      project: 'Proyek Akhir',
    };
    document.title = `Tugas Project UAS — ${tabTitles[activeTab]}`;
  }, [activeTab, currentChapterId]);

  // Kunci scroll saat drawer bab terbuka di layar kecil
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const handleNavigateTab = (tab: ActiveTab, chapterId?: ChapterId) => {
    setActiveTab(tab);
    if (chapterId) {
      setCurrentChapterId(chapterId);
      setLastVisited(chapterId);
      window.location.hash = chapterId;
    } else {
      window.location.hash = tab === 'home' ? '' : tab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChapter = (chapterId: ChapterId) => {
    setCurrentChapterId(chapterId);
    setLastVisited(chapterId);
    setActiveTab('chapter');
    setSidebarOpen(false);
    window.location.hash = chapterId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // `key` ini membuat tiap perpindahan halaman bermain animasi masuk yang halus
  const viewKey = activeTab === 'chapter' ? `chapter-${currentChapterId}` : activeTab;

  return (
    <div className="flex min-h-screen flex-col text-slate-900">
      <Navbar
        activeTab={activeTab}
        currentChapterId={currentChapterId}
        onNavigateTab={handleNavigateTab}
        completedCount={completedCount}
        totalChapters={totalChapters}
        percentage={percentage}
        onResetProgress={resetAllProgress}
        onOpenSidebar={() => setSidebarOpen(true)}
      />

      <div className="flex flex-1 flex-col">
        {activeTab === 'chapter' ? (
          <div
            key={viewKey}
            className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-6 sm:px-6 lg:px-8 anim-fade"
          >
            {/* Sidebar desktop */}
            <div className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-[5.5rem] h-[calc(100vh-7.5rem)] overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 shadow-soft backdrop-blur-xl">
                <Sidebar
                  currentChapterId={currentChapterId}
                  onSelectChapter={handleSelectChapter}
                  completedChapters={progress.completedChapters}
                />
              </div>
            </div>

            {/* Drawer bab untuk mobile/tablet */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 flex lg:hidden">
                <div
                  className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm anim-fade"
                  onClick={() => setSidebarOpen(false)}
                  aria-hidden="true"
                />
                <div
                  className="relative z-10 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-[0_0_80px_rgba(2,6,23,0.5)] anim-rise"
                  role="dialog"
                  aria-label="Pilih bab pembelajaran"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
                    <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                      <BookOpen className="h-4 w-4 text-brand-600" />
                      Pilih Bab Pembelajaran
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(false)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label="Tutup daftar bab"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <Sidebar
                      currentChapterId={currentChapterId}
                      onSelectChapter={handleSelectChapter}
                      completedChapters={progress.completedChapters}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Konten bab */}
            <main className="min-w-0 flex-1">
              <ChapterPage
                chapterId={currentChapterId}
                onSelectChapter={handleSelectChapter}
                completedChapters={progress.completedChapters}
                onToggleComplete={toggleChapterComplete}
                savedQuizScore={progress.quizScores[currentChapterId]}
                onSaveQuizScore={saveQuizScore}
                onMarkExerciseDone={markExerciseCompleted}
              />
            </main>
          </div>
        ) : (
          <main
            key={viewKey}
            className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 anim-fade"
          >
            {activeTab === 'home' && (
              <HomePage
                onNavigateTab={handleNavigateTab}
                completedCount={completedCount}
                totalChapters={totalChapters}
                lastVisitedChapter={currentChapterId}
                percentage={percentage}
                completedChapters={progress.completedChapters}
              />
            )}
            {activeTab === 'flow' && <FlowVisualizerPage />}
            {activeTab === 'debugging' && <DebuggingPage />}
            {activeTab === 'glossary' && (
              <GlossaryPage onNavigateTab={handleNavigateTab} />
            )}
            {activeTab === 'project' && (
              <ProjectPage
                checklistItems={progress.checklistItems}
                onToggleChecklist={toggleChecklistItem}
                onNavigateTab={handleNavigateTab}
              />
            )}
          </main>
        )}
      </div>

      <Footer onNavigateTab={handleNavigateTab} />
      <BackToTop />
    </div>
  );
}

export default App;
