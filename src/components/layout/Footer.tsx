import React from 'react';
import {
  ClipboardCheck,
  Heart,
  ArrowRight,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { ChapterId } from '../../types';
import { cn } from '../../utils/cn';

/** Marka GitHub (lucide tidak lagi memuat ikon merek). */
const GithubMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.28.74-1.57-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.43.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

interface FooterProps {
  onNavigateTab: (tab: ActiveTab, chapterId?: ChapterId) => void;
}

const LEARNING_LINKS: Array<{ label: string; tab: ActiveTab; chapter?: ChapterId }> = [
  { label: 'Bab 1 — Kenalan Dulu', tab: 'chapter', chapter: 'bab-1' },
  { label: 'Bab 3 — Sembilan Langkah Dasar', tab: 'chapter', chapter: 'bab-3' },
  { label: 'Bab 7 — Simulasi Alur', tab: 'flow' },
  { label: 'Bab 8 — Panduan Error', tab: 'debugging' },
  { label: 'Bab 11 — Tips Presentasi', tab: 'chapter', chapter: 'bab-11' },
];

const FEATURE_LINKS: Array<{ label: string; tab: ActiveTab; chapter?: ChapterId }> = [
  { label: 'Kode Sumber 3 File', tab: 'project' },
  { label: 'Kamus Istilah Pemrograman', tab: 'glossary' },
  { label: 'Simulasi Alur Program', tab: 'flow' },
  { label: 'Kuis & Latihan Interaktif', tab: 'chapter', chapter: 'bab-4' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#0b1020] text-slate-400">
      {/* Pita gradasi + cahaya dekoratif */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400 anim-pan"
        style={{ backgroundSize: '200% 100%' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-aqua-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(60% 80% at 50% 0%, #000, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(60% 80% at 50% 0%, #000, transparent 80%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & misi */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-grape-500 text-white shadow-[0_12px_28px_-12px_rgba(106,90,232,0.9)]">
                <ClipboardCheck className="h-5 w-5" strokeWidth={2.3} />
              </span>
              <div className="leading-tight">
                <span className="block text-base font-extrabold tracking-tight text-white">
                  Tugas Project UAS
                </span>
                <span className="block text-[11px] font-medium text-slate-400">
                  Belajar coding pelan-pelan, sampai paham
                </span>
              </div>
            </div>

            <p className="max-w-md text-xs leading-relaxed text-slate-400">
              Platform pembelajaran Python interaktif untuk mahasiswa semester awal dan
              pemula, disiapkan sebagai
              <strong className="text-slate-200"> Tugas Project UAS</strong>. Berdasarkan
              modul resmi: <em>"Panduan Belajar Python dari Nol — Membuat Program
              Pencatat Keuangan Mahasiswa, Langkah demi Langkah."</em>
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-slate-300">
                <Terminal className="h-3.5 w-3.5 text-aqua-400" />
                100% jalan di browser
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-slate-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Progres tersimpan lokal
              </span>
            </div>
          </div>

          {/* Jalur belajar */}
          <div className="md:col-span-3">
            <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-200">
              Jalur Belajar
            </h4>
            <ul className="space-y-1">
              {LEARNING_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onNavigateTab(link.tab, link.chapter)}
                    className="group flex cursor-pointer items-center gap-1.5 rounded-lg py-1 text-xs text-slate-400 transition hover:text-white"
                  >
                    <ArrowRight className="h-3 w-3 -translate-x-1 text-brand-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    <span className="transition-transform group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Fitur */}
          <div className="md:col-span-4">
            <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-200">
              Fitur Platform
            </h4>
            <ul className="space-y-1">
              {FEATURE_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onNavigateTab(link.tab, link.chapter)}
                    className="group flex cursor-pointer items-center gap-1.5 rounded-lg py-1 text-xs text-slate-400 transition hover:text-white"
                  >
                    <ArrowRight className="h-3 w-3 -translate-x-1 text-aqua-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    <span className="transition-transform group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="https://github.com/MiftahulAnam95/project-uas"
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] font-bold text-slate-200 transition',
                    'hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.12]'
                  )}
                >
                  <GithubMark className="h-3.5 w-3.5" />
                  Lihat Repositori Proyek
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bar bawah */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-slate-500 sm:flex-row">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Tugas Project UAS — Didedikasikan untuk
            mahasiswa Indonesia yang ingin bisa koding dengan bahagia.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Dibuat dengan</span>
            <Heart className="h-3.5 w-3.5 animate-pulse text-rose-500 fill-rose-500" />
            <span>untuk pembelajaran terbuka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
