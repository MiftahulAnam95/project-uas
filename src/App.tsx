import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Navbar, ActiveTab } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'chapter' ? (
          <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-8">
            {/* Desktop Left Sidebar (visible on xl & lg) */}
            <div className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 h-[calc(100vh-7rem)] rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                <Sidebar
                  currentChapterId={currentChapterId}
                  onSelectChapter={handleSelectChapter}
                  completedChapters={progress.completedChapters}
                />
              </div>
            </div>

            {/* Mobile Sidebar Drawer Modal */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div
                  className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
                  onClick={() => setSidebarOpen(false)}
                />
                <div className="relative w-80 max-w-[85vw] bg-white h-full z-10 shadow-2xl flex flex-col">
                  <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">Pilih Bab Pembelajaran</h3>
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      aria-label="Tutup daftar bab"
                    >
                      <X className="w-4 h-4" />
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

            {/* Middle Chapter Content */}
            <main className="flex-1 min-w-0">
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
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            {activeTab === 'home' && (
              <HomePage
                onNavigateTab={handleNavigateTab}
                completedCount={completedCount}
                totalChapters={totalChapters}
                lastVisitedChapter={currentChapterId}
                percentage={percentage}
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

      {/* Global Footer */}
      <Footer onNavigateTab={handleNavigateTab} />
    </div>
  );
}

export default App;
