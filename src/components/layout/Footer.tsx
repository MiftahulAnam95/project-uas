import React from 'react';
import { ClipboardCheck, Heart } from 'lucide-react';
import { ActiveTab } from './Navbar';
import { ChapterId } from '../../types';

interface FooterProps {
  onNavigateTab: (tab: ActiveTab, chapterId?: ChapterId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <ClipboardCheck className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                Tugas Project UAS
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Platform pembelajaran Python interaktif untuk mahasiswa semester awal dan pemula, disiapkan sebagai
              <strong className="text-slate-300"> Tugas Project UAS</strong>.
              Berdasarkan modul resmi: <em>"Panduan Belajar Python dari Nol — Membuat Program Pencatat Keuangan Mahasiswa, Langkah demi Langkah."</em>
            </p>
            <p className="text-[11px] text-slate-500">
              Disusun menggunakan bahasa Indonesia sehari-hari yang ramah, analogi nyata, dan kode modular 3 file.
            </p>
          </div>

          {/* Quick Learning Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Jalur Belajar
            </h4>
            <ul className="text-xs space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigateTab('chapter', 'bab-1')}
                  className="hover:text-indigo-400 transition cursor-pointer"
                >
                  Bab 1 — Kenalan Dulu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('chapter', 'bab-3')}
                  className="hover:text-indigo-400 transition cursor-pointer"
                >
                  Bab 3 — 9 Langkah Dasar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('flow')}
                  className="hover:text-indigo-400 transition cursor-pointer"
                >
                  Bab 7 — Simulasi Alur
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('debugging')}
                  className="hover:text-indigo-400 transition cursor-pointer"
                >
                  Bab 8 — Panduan Error
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('chapter', 'bab-11')}
                  className="hover:text-indigo-400 transition cursor-pointer"
                >
                  Bab 11 — Tips Presentasi
                </button>
              </li>
            </ul>
          </div>

          {/* Project & Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Fitur Platform
            </h4>
            <ul className="text-xs space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigateTab('project')}
                  className="hover:text-indigo-400 transition cursor-pointer"
                >
                  Kode Sumber 3 File (Proyek Akhir)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('glossary')}
                  className="hover:text-indigo-400 transition cursor-pointer"
                >
                  Kamus Istilah Pemrograman
                </button>
              </li>
              <li>
                <span className="text-emerald-400">
                  ✓ Berjalan 100% di browser (Client-side)
                </span>
              </li>
              <li>
                <span className="text-slate-500">
                  ✓ Progres tersimpan di LocalStorage
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Tugas Project UAS. Didedikasikan untuk mahasiswa Indonesia yang ingin bisa koding dengan bahagia.
          </div>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk pembelajaran terbuka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
