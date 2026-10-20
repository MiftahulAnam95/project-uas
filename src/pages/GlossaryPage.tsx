import React, { useState, useMemo } from 'react';
import {
  BookMarked,
  Search,
  ArrowRight,
  Lightbulb,
  X,
  Library,
  Sparkles,
} from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { ChapterId } from '../types';
import { ActiveTab } from '../components/layout/Navbar';
import { PageHeader } from '../components/common/PageHeader';
import { MiniCode } from '../components/code-block/MiniCode';
import { Reveal } from '../components/common/Reveal';
import { cn } from '../utils/cn';

interface GlossaryPageProps {
  onNavigateTab: (tab: ActiveTab, chapterId?: ChapterId) => void;
}

const CATEGORIES = [
  'Semua',
  'Dasar',
  'Tipe Data',
  'Struktur Kontrol',
  'Fungsi & Modularitas',
  'Alat & Konsep',
] as const;

/** Warna identitas per kategori supaya kamus tidak monoton. */
const CATEGORY_STYLE: Record<string, { chip: string; tile: string; letter: string }> = {
  Dasar: {
    chip: 'border-brand-200 bg-brand-50 text-brand-700',
    tile: 'from-brand-500 to-grape-500',
    letter: 'text-brand-700',
  },
  'Tipe Data': {
    chip: 'border-amber-200 bg-amber-50 text-amber-800',
    tile: 'from-amber-500 to-orange-400',
    letter: 'text-amber-700',
  },
  'Struktur Kontrol': {
    chip: 'border-rose-200 bg-rose-50 text-rose-700',
    tile: 'from-rose-500 to-pink-500',
    letter: 'text-rose-700',
  },
  'Fungsi & Modularitas': {
    chip: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    tile: 'from-emerald-500 to-teal-400',
    letter: 'text-emerald-700',
  },
  'Alat & Konsep': {
    chip: 'border-sky-200 bg-sky-50 text-sky-700',
    tile: 'from-sky-500 to-aqua-400',
    letter: 'text-sky-700',
  },
};

const FALLBACK_STYLE = {
  chip: 'border-slate-200 bg-slate-50 text-slate-700',
  tile: 'from-slate-500 to-slate-400',
  letter: 'text-slate-700',
};

export const GlossaryPage: React.FC<GlossaryPageProps> = ({ onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.simpleDefinition.toLowerCase().includes(q) ||
        (item.analogy && item.analogy.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const countFor = (cat: string) =>
    cat === 'Semua'
      ? GLOSSARY_TERMS.length
      : GLOSSARY_TERMS.filter((t) => t.category === cat).length;

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 sm:py-10">
      {/* ============================ HEADER ============================ */}
      <PageHeader
        eyebrow="Bab 10 · Kamus istilah pemrograman"
        icon={BookMarked}
        accent="cyan"
        title="Kamus Istilah Python Bahasa Manusia"
        highlight="Bahasa Manusia"
        description="Kumpulan kosakata dan konsep penting pemrograman yang dipakai dalam program pencatat keuangan mahasiswa — diterjemahkan ke perumpamaan yang ramah pemula."
        stats={[
          { label: 'Istilah', value: String(GLOSSARY_TERMS.length) },
          { label: 'Kategori', value: String(CATEGORIES.length - 1) },
          { label: 'Perumpamaan', value: String(GLOSSARY_TERMS.filter((t) => t.analogy).length) },
        ]}
      >
        {/* Kolom pencarian */}
        <div className="relative max-w-2xl">
          <div className="group relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-aqua-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah, misal: variabel, loop, return, module…"
              aria-label="Cari istilah pemrograman"
              className="w-full rounded-2xl border border-white/15 bg-white/[0.08] py-3.5 pl-12 pr-11 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur outline-none transition placeholder:text-slate-400 focus:border-aqua-300/60 focus:bg-white/[0.14] focus:ring-4 focus:ring-aqua-400/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus kata pencarian"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-aqua-300" />
            Menampilkan{' '}
            <span className="font-extrabold text-white tabular">{filteredTerms.length}</span> dari{' '}
            <span className="tabular">{GLOSSARY_TERMS.length}</span> istilah
          </div>
        </div>
      </PageHeader>

      {/* ============================ FILTER ============================ */}
      <div className="thin-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-2">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'group flex shrink-0 cursor-pointer items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-bold transition-all duration-200 sm:text-[13px]',
                active
                  ? 'border-transparent bg-gradient-to-r from-aqua-500 to-sky-500 text-white shadow-[0_14px_28px_-14px_rgba(6,182,212,0.9)]'
                  : 'border-slate-200 bg-white/85 text-slate-700 shadow-soft hover:-translate-y-0.5 hover:border-aqua-200 hover:bg-aqua-50/60 hover:text-aqua-700'
              )}
            >
              {cat}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-extrabold tabular',
                  active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                )}
              >
                {countFor(cat)}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================ DAFTAR ISTILAH ============================ */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredTerms.map((term, idx) => {
            const style = CATEGORY_STYLE[term.category] || FALLBACK_STYLE;
            return (
              <Reveal key={term.id} delay={(idx % 2) * 70} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-slate-200/80 bg-white/88 p-5 shadow-soft backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-aqua-200 hover:shadow-lift sm:p-6">
                  {/* Cahaya lembut saat hover */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute -right-12 -top-14 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25',
                      style.tile
                    )}
                  />

                  <div className="relative flex items-start gap-3.5">
                    <span
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-extrabold text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3',
                        style.tile
                      )}
                    >
                      {term.term.charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
                        {term.term}
                      </h3>
                      <span
                        className={cn(
                          'mt-1 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider',
                          style.chip
                        )}
                      >
                        {term.category}
                      </span>
                    </div>
                  </div>

                  <p className="relative mt-4 text-sm leading-relaxed text-slate-700">
                    {term.simpleDefinition}
                  </p>

                  {term.analogy && (
                    <div className="relative mt-3.5 flex items-start gap-2.5 rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50/90 to-fuchsia-50/50 p-3">
                      <Lightbulb className="mt-px h-4 w-4 shrink-0 text-violet-600" />
                      <p className="text-xs leading-relaxed text-violet-950">
                        <strong className="font-extrabold">Perumpamaan:</strong> {term.analogy}
                      </p>
                    </div>
                  )}

                  {term.codeExample && (
                    <MiniCode
                      code={term.codeExample}
                      tone="info"
                      label="contoh pemakaian"
                      className="relative"
                    />
                  )}

                  <div className="relative mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3.5">
                    <button
                      type="button"
                      onClick={() => onNavigateTab('chapter', term.relatedChapterId)}
                      className="group/link inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-2 py-1 text-[11px] font-extrabold text-brand-600 transition hover:bg-brand-50 hover:text-brand-800"
                    >
                      <span>Pelajari di {term.relatedChapterTitle}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-4xl border border-slate-200/80 bg-white/85 p-10 text-center shadow-soft backdrop-blur">
          <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
          <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100 text-slate-400 shadow-inner">
            <Library className="h-7 w-7" />
          </span>
          <h3 className="relative mt-4 text-base font-extrabold tracking-tight text-slate-800">
            Tidak ada istilah yang cocok dengan “{searchQuery}”
          </h3>
          <p className="relative mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
            Coba kata kunci lain, atau pilih kategori “Semua” untuk melihat daftar lengkap{' '}
            {GLOSSARY_TERMS.length} istilah.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="btn btn-primary relative mt-5 px-5 py-2.5 text-xs"
          >
            Bersihkan Pencarian
          </button>
        </div>
      )}
    </div>
  );
};

export default GlossaryPage;
