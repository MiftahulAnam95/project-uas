import React, { useState } from 'react';
import { Printer, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { CheatSheet as CheatSheetType } from '../../types';
import { MiniCode } from '../code-block/MiniCode';

interface CheatSheetProps {
  cheatSheet: CheatSheetType;
  chapterNumber: number;
}

export const CheatSheet: React.FC<CheatSheetProps> = ({ cheatSheet, chapterNumber }) => {
  const [open, setOpen] = useState(false);

  return (
    <section className="cheat-sheet-print my-6 overflow-hidden rounded-3xl border border-brand-200/80 bg-white shadow-soft print:border-0 print:shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-100 bg-gradient-to-r from-brand-50 via-white to-aqua-50/60 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-grape-500 text-white shadow-sm">
            <FileText className="h-4.5 w-4.5" strokeWidth={2.3} />
          </span>
          <div className="leading-tight">
            <h3 className="text-sm font-extrabold tracking-tight text-slate-900">
              Cheat Sheet Bab {chapterNumber}
            </h3>
            <p className="text-[11px] text-slate-500">{cheatSheet.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-brand-200 bg-white px-3 py-1.5 text-[11px] font-bold text-brand-700 transition hover:bg-brand-50"
          >
            <Printer className="h-3.5 w-3.5" /> Cetak
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50"
            aria-expanded={open}
          >
            {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {open ? 'Tutup' : 'Buka'}
          </button>
        </div>
      </div>

      <div className={`p-4 sm:p-5 ${open ? 'block' : 'hidden print:block'}`}>
        <div className="grid gap-2 sm:grid-cols-2">
          {cheatSheet.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 text-xs leading-relaxed text-slate-700"
            >
              <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-brand-100 text-[9px] font-extrabold text-brand-700">
                {index + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        {cheatSheet.code && (
          <div className="mt-3">
            <MiniCode code={cheatSheet.code} label="contoh cepat" />
          </div>
        )}
        <p className="mt-3 text-[10px] text-slate-400 print:hidden">
          Tips: klik Cetak, lalu pilih "Save as PDF" untuk menyimpan cheat sheet satu halaman.
        </p>
      </div>
    </section>
  );
};

export default CheatSheet;
