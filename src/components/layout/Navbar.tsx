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
import { ProgressRing } from '../common/ProgressRing';
import { cn } from '../../utils/cn';

export type ActiveTab =
  | 'home'
  | 'chapter'
  | 'flow'
  | 'debugging'
  | 'glossary'
  | 'project';

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

interface NavItem {
  id: ActiveTab;
  label: string;
  shortDesc: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Gradasi tile ikon */
  tile: string;
  /** Warna teks saat aktif */
  activeText: string;
  /** Warna cincin saat aktif */
  activeRing: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Beranda',
    shortDesc: 'Ringkasan & peta belajar',
    icon: Home,
    tile: 'from-brand-500 to-grape-500',
    activeText: 'text-brand-700',
    activeRing: 'ring-brand-200',
  },
  {
    id: 'chapter',
    label: 'Materi',
    shortDesc: 'Kurikulum 11 bab berurutan',
    badge: '11',
    icon: BookOpen,
    tile: 'from-sky-500 to-cyan-400',
    activeText: 'text-sky-700',
    activeRing: 'ring-sky-200',
  },
  {
    id: 'flow',
    label: 'Simulasi Alur',
    shortDesc: 'Visualisasi data & terminal',
    icon: Activity,
    tile: 'from-violet-500 to-fuchsia-500',
    activeText: 'text-violet-700',
    activeRing: 'ring-violet-200',
  },
  {
    id: 'debugging',
    label: 'Bantuan Error',
    shortDesc: 'Solusi 6 error umum Python',
    icon: Bug,
    tile: 'from-rose-500 to-orange-400',
    activeText: 'text-rose-700',
    activeRing: 'ring-rose-200',
  },
  {
    id: 'glossary',
    label: 'Kamus',
    shortDesc: 'Istilah koding bahasa sederhana',
    icon: BookMarked,
    tile: 'from-teal-500 to-emerald-400',
    activeText: 'text-teal-700',
    activeRing: 'ring-teal-200',
  },
  {
    id: 'project',
    label: 'Proyek Akhir',
    shortDesc: 'Kode utuh 3 file & evaluasi',
    icon: CheckSquare,
    tile: 'from-amber-500 to-orange-400',
    activeText: 'text-amber-700',
    activeRing: 'ring-amber-200',
  },
];

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
  const [scrolled, setScrolled] = useState(false);

  const currentChapter =
    CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: ActiveTab) => {
    onNavigateTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 border-b bg-white/80 backdrop-blur-xl transition-all duration-300',
          scrolled
            ? 'border-slate-200/90 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]'
            : 'border-slate-200/60 shadow-none'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-16">
            {/* ---------- Identitas ---------- */}
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="group flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl py-1 pr-1 text-left"
            >
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-grape-500 text-white shadow-[0_10px_24px_-10px_rgba(106,90,232,0.9)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <ClipboardCheck className="h-4.5 w-4.5" strokeWidth={2.4} />
                <span
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-400/40 to-grape-400/30 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                />
              </span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-[15px] font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-brand-700 sm:text-base">
                  Tugas Project UAS
                </span>
                <span className="hidden whitespace-nowrap text-[11px] font-medium text-slate-500 xl:block">
                  Belajar coding pelan-pelan, sampai paham
                </span>
              </span>
            </button>

            {/* ---------- Navigasi desktop ---------- */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden items-center gap-0.5 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-1 lg:flex"
            >
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'group relative flex cursor-pointer items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[13px] whitespace-nowrap transition-all duration-200 xl:px-3.5',
                      isActive
                        ? cn(
                            'bg-white font-bold shadow-[0_4px_14px_-6px_rgba(15,23,42,0.35)] ring-1',
                            item.activeText,
                            item.activeRing
                          )
                        : 'font-medium text-slate-600 hover:bg-white/70 hover:text-slate-900'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-3.5 w-3.5 shrink-0 transition-transform duration-300 xl:h-4 xl:w-4',
                        isActive
                          ? cn(item.activeText, 'scale-110')
                          : 'text-slate-400 group-hover:scale-110 group-hover:text-slate-600'
                      )}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          'rounded-full px-1.5 py-0.5 text-[10px] leading-none font-extrabold tabular transition-colors',
                          isActive
                            ? 'bg-brand-100 text-brand-700'
                            : 'bg-slate-200/80 text-slate-600'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3 -bottom-[5px] h-0.5 rounded-full bg-gradient-to-r',
                          item.tile
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ---------- Progres & aksi (desktop) ---------- */}
            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => handleNavClick('chapter')}
                title={`Progres belajar: ${completedCount} dari ${totalChapters} bab selesai (${percentage}%)`}
                className="group flex cursor-pointer items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/70 py-1.5 pl-2 pr-3 transition hover:border-brand-200 hover:bg-brand-50/60 hover:shadow-soft"
              >
                <ProgressRing
                  value={percentage}
                  size={30}
                  stroke={4}
                  label={
                    <span className="text-[9px] font-extrabold tabular text-slate-700">
                      {percentage}
                    </span>
                  }
                />
                <span className="leading-tight">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Progres
                  </span>
                  <span className="block text-xs font-extrabold tabular text-slate-800">
                    {completedCount}
                    <span className="text-slate-400">/{totalChapters} bab</span>
                  </span>
                </span>
              </button>

              <span className="h-5 w-px bg-slate-200" aria-hidden="true" />

              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition hover:rotate-[-25deg] hover:bg-rose-50 hover:text-rose-600"
                title="Atur ulang progres belajar"
                aria-label="Atur ulang progres belajar"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* ---------- Progres & menu (mobile/tablet) ---------- */}
            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => handleNavClick('chapter')}
                aria-label={`Progres belajar ${completedCount} dari ${totalChapters} bab`}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/70 px-2 py-1.5 text-xs font-extrabold tabular text-slate-700"
              >
                <ProgressRing value={percentage} size={22} stroke={3.5} />
                <span>
                  {completedCount}/{totalChapters}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  'flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border transition',
                  mobileMenuOpen
                    ? 'border-brand-200 bg-brand-50 text-brand-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                )}
                aria-expanded={mobileMenuOpen}
                aria-label={
                  mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
                }
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Bar progres gradasi ---------- */}
        <div
          className="relative h-[3px] w-full overflow-hidden bg-slate-100"
          aria-hidden="true"
        >
          <div
            className="relative h-full bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400 transition-[width] duration-700 ease-out"
            style={{ width: `${Math.max(percentage, 0)}%` }}
          >
            {percentage > 0 && percentage < 100 && (
              <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)] bg-[length:60%_100%] bg-no-repeat"
                style={{ animation: 'uas-shimmer 2.4s ease-in-out infinite' }}
              />
            )}
          </div>
        </div>

        {/* ---------- Sub-bar bab (mobile/tablet) ---------- */}
        {activeTab === 'chapter' && !mobileMenuOpen && (
          <div className="flex items-center justify-between gap-3 border-t border-slate-200/70 bg-white/70 px-4 py-2 backdrop-blur-xl sm:px-6 lg:hidden">
            <div className="flex min-w-0 items-center gap-2 text-xs">
              <span className="shrink-0 rounded-lg bg-gradient-to-r from-brand-600 to-grape-500 px-2 py-0.5 font-extrabold text-white shadow-sm">
                Bab {currentChapter.number}/11
              </span>
              <span className="truncate font-semibold text-slate-700">
                {currentChapter.title}
              </span>
            </div>

            {onOpenSidebar && (
              <button
                type="button"
                onClick={onOpenSidebar}
                className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-soft transition hover:border-brand-200 hover:text-brand-700"
              >
                <List className="h-3.5 w-3.5 text-brand-600" />
                <span>Daftar Bab</span>
              </button>
            )}
          </div>
        )}

        {/* ---------- Panel menu mobile ---------- */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-x-0 top-16 bottom-0 z-30 bg-slate-950/30 backdrop-blur-[2px] lg:hidden anim-fade"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="relative z-40 space-y-4 border-t border-slate-200 bg-white/95 px-4 pt-4 pb-5 shadow-[0_30px_60px_-24px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:px-6 lg:hidden anim-rise">
              {/* Ringkasan progres */}
              <div className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-3.5">
                <ProgressRing
                  value={percentage}
                  size={44}
                  stroke={5}
                  label={
                    <span className="text-[10px] font-extrabold tabular text-brand-700">
                      {percentage}%
                    </span>
                  }
                />
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-slate-800">
                    Progres Belajar Kamu
                  </div>
                  <div className="text-[11px] font-semibold text-brand-600 tabular">
                    {completedCount} dari {totalChapters} bab selesai
                  </div>
                </div>
              </div>

              {/* Daftar navigasi */}
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {NAV_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      style={{ animationDelay: `${idx * 35}ms` }}
                      className={cn(
                        'flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3 text-left transition anim-rise',
                        isActive
                          ? 'border-brand-200 bg-brand-50/80 shadow-soft'
                          : 'border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50'
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300',
                            item.tile,
                            isActive ? 'scale-105' : 'opacity-80'
                          )}
                        >
                          <Icon className="h-4 w-4" strokeWidth={2.3} />
                        </span>
                        <span className="min-w-0">
                          <span
                            className={cn(
                              'block truncate text-sm font-bold leading-snug',
                              isActive ? 'text-brand-900' : 'text-slate-800'
                            )}
                          >
                            {item.label}
                          </span>
                          <span className="block truncate text-[11px] text-slate-500">
                            {item.shortDesc}
                          </span>
                        </span>
                      </span>
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 shrink-0 transition-transform',
                          isActive
                            ? 'translate-x-0.5 text-brand-500'
                            : 'text-slate-300'
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Aksi reset */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[11px] text-slate-400">
                  Progres tersimpan otomatis di browser ini
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowResetModal(true);
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Progres</span>
                </button>
              </div>
            </div>
          </>
        )}
      </header>

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
