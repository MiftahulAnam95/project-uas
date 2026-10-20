import React, { useState, useEffect } from 'react';
import {
  Home,
  BookOpen,
  Activity,
  BookMarked,
  Bug,
  CheckSquare,
  Menu,
  X,
  RotateCcw,
  ClipboardCheck,
  List,
  ChevronRight,
} from 'lucide-react';
import { ChapterId } from '../../types';
import { CHAPTERS } from '../../data/lessons';
import { Modal } from '../common/Modal';

export type ActiveTab = 'home' | 'chapter' | 'flow' | 'debugging' | 'glossary' | 'project';

interface NavbarProps {
  activeTab: ActiveTab;
  currentChapterId?: ChapterId;
  onNavigateTab: (tab: ActiveTab, chapterId?: ChapterId) => void;
  completedCount: number;
  totalChapters: number;
  percentage: number;
  onResetProgress: () => void;
  onOpenSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  currentChapterId,
  onNavigateTab,
  completedCount,
  totalChapters,
  percentage,
  onResetProgress,
  onOpenSidebar,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const currentChapter = CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    shortDesc: string;
    badge?: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: 'home',
      label: 'Beranda',
      shortDesc: 'Ringkasan & peta belajar',
      icon: Home,
    },
    {
      id: 'chapter',
      label: 'Materi',
      shortDesc: 'Kurikulum 11 bab berurutan',
      badge: '11',
      icon: BookOpen,
    },
    {
      id: 'flow',
      label: 'Simulasi Alur',
      shortDesc: 'Visualisasi data & terminal',
      icon: Activity,
    },
    {
      id: 'debugging',
      label: 'Bantuan Error',
      shortDesc: 'Solusi 6 error umum Python',
      icon: Bug,
    },
    {
      id: 'glossary',
      label: 'Kamus',
      shortDesc: 'Istilah koding bahasa sederhana',
      icon: BookMarked,
    },
    {
      id: 'project',
      label: 'Proyek Akhir',
      shortDesc: 'Kode utuh 3 file & evaluasi',
      icon: CheckSquare,
    },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onNavigateTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-16">
            {/* Left: Brand Identity */}
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0 rounded-xl py-1 pr-1 focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xs ring-1 ring-indigo-600/20 group-hover:scale-105 transition-transform shrink-0">
                <ClipboardCheck className="w-4 h-4 stroke-[2.25]" />
              </div>
              <div className="leading-tight">
                <span className="block font-extrabold text-[15px] sm:text-base text-slate-900 tracking-tight whitespace-nowrap group-hover:text-indigo-700 transition-colors">
                  Tugas Project UAS
                </span>
                <span className="hidden xl:block text-[11px] font-medium text-slate-500 whitespace-nowrap">
                  Belajar coding pelan-pelan, sampai paham
                </span>
              </div>
            </button>

            {/* Center: Desktop Segmented Navigation */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden lg:flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/75 gap-0.5 xl:gap-1"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 xl:px-3.5 py-1.5 rounded-lg text-[13px] whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-indigo-700 font-semibold shadow-xs ring-1 ring-slate-900/5'
                        : 'text-slate-600 font-medium hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${
                        isActive ? 'text-indigo-600' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                          isActive
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-slate-200/80 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Desktop Progress & Reset Action */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleNavClick('chapter')}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-200 transition cursor-pointer whitespace-nowrap"
                title={`Progres belajar: ${completedCount} dari ${totalChapters} bab selesai (${percentage}%)`}
              >
                <div className="w-12 xl:w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      percentage === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 tabular-nums">
                  {completedCount}/{totalChapters}
                </span>
                <span className="hidden xl:inline text-[11px] font-semibold text-indigo-600 tabular-nums">
                  ({percentage}%)
                </span>
              </button>

              <div className="h-5 w-px bg-slate-200" aria-hidden="true" />

              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                title="Atur ulang progres belajar"
                aria-label="Atur ulang progres belajar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Mobile & Tablet Compact Progress + Menu Trigger */}
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleNavClick('chapter')}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 tabular-nums whitespace-nowrap"
                aria-label={`Progres belajar ${completedCount} dari ${totalChapters} bab`}
              >
                <div className="w-8 sm:w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      percentage === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span>
                  {completedCount}/{totalChapters}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl border transition cursor-pointer ${
                  mobileMenuOpen
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Progress Hairline Bar */}
        {percentage > 0 && (
          <div className="h-[2px] w-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}

        {/* Contextual Chapter Sub-bar for Mobile/Tablet when inside Materi */}
        {activeTab === 'chapter' && !mobileMenuOpen && (
          <div className="lg:hidden bg-slate-50/95 border-t border-slate-200/80 px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0 text-xs">
              <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md shrink-0">
                Bab {currentChapter.number}/11
              </span>
              <span className="font-medium text-slate-700 truncate">
                {currentChapter.title}
              </span>
            </div>

            {onOpenSidebar && (
              <button
                type="button"
                onClick={onOpenSidebar}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs shrink-0 cursor-pointer"
              >
                <List className="w-3.5 h-3.5 text-indigo-600" />
                <span>Daftar Bab</span>
              </button>
            )}
          </div>
        )}

        {/* Mobile Dropdown Panel + Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-slate-900/25 backdrop-blur-[1px] z-30"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="lg:hidden relative z-40 border-t border-slate-200 bg-white px-4 sm:px-6 pt-4 pb-5 shadow-xl space-y-4">
              {/* Progress Summary Card */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Progres Belajar Kamu</span>
                  <span className="font-bold text-indigo-600 tabular-nums">
                    {completedCount} dari {totalChapters} bab ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      percentage === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Navigation Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl text-left transition cursor-pointer ${
                        isActive
                          ? 'bg-indigo-50/90 text-indigo-900 border border-indigo-200/80'
                          : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold leading-snug truncate">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {item.shortDesc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-indigo-600' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Safe Reset Action Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Progres tersimpan otomatis di browser ini
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowResetModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Progres</span>
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Confirmation Modal for Resetting Progress */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={onResetProgress}
        variant="danger"
        title="Atur Ulang Progres Belajar?"
        message="Apakah kamu yakin ingin menghapus seluruh catatan progres bab yang sudah selesai, skor kuis, dan checklist proyek akhir? Data progres tersimpan di peramban ini dan tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Atur Ulang"
        cancelText="Batal"
      />
    </>
  );
};
