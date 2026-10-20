import React, { useState, useMemo } from 'react';
import { BookMarked, Search, ArrowRight, Lightbulb, Code2 } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { ChapterId } from '../types';
import { ActiveTab } from '../components/layout/Navbar';

interface GlossaryPageProps {
  onNavigateTab: (tab: ActiveTab, chapterId?: ChapterId) => void;
}

export const GlossaryPage: React.FC<GlossaryPageProps> = ({ onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Dasar',
    'Tipe Data',
    'Struktur Kontrol',
    'Fungsi & Modularitas',
    'Alat & Konsep',
  ];

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

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <BookMarked className="w-4 h-4" />
          <span>Bab 10 & Kamus Istilah Pemrograman</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Kamus Istilah Python Bahasa Manusia
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Kumpulan kosakata dan konsep penting pemrograman yang digunakan dalam pembuatan program pencatat keuangan mahasiswa. Diterjemahkan ke dalam perumpamaan yang ramah pemula.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-xl">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah, misal: variabel, loop, return, module..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Terms Grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-indigo-300 transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{term.term}</h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {term.category}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {term.simpleDefinition}
                </p>

                {/* Analogy Box */}
                {term.analogy && (
                  <div className="p-3 bg-purple-50/70 border border-purple-200/80 rounded-xl text-xs text-purple-950 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Perumpamaan:</strong> {term.analogy}
                    </span>
                  </div>
                )}

                {/* Code Example if present */}
                {term.codeExample && (
                  <div className="bg-slate-900 rounded-xl p-3 font-mono text-xs text-slate-200 border border-slate-800 overflow-x-auto">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Code2 className="w-3 h-3" />
                      <span>Contoh Kode:</span>
                    </div>
                    <pre className="whitespace-pre">{term.codeExample}</pre>
                  </div>
                )}
              </div>

              {/* Link to Related Chapter */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onNavigateTab('chapter', term.relatedChapterId)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 group cursor-pointer"
                >
                  <span>Pelajari di {term.relatedChapterTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <BookMarked className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            Tidak ada istilah yang cocok dengan "{searchQuery}"
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba gunakan kata kunci lain atau pilih kategori "Semua" untuk melihat daftar lengkap.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl hover:bg-indigo-100"
          >
            Bersihkan Pencarian
          </button>
        </div>
      )}
    </div>
  );
};
