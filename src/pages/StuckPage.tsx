import React, { useState } from 'react';
import { LifeBuoy, ArrowRight, Bug, Terminal, Palette, Search, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { MiniCode } from '../components/code-block/MiniCode';
import { PYTHON_ERRORS } from '../data/errors';
import { ActiveTab } from '../components/layout/Navbar';
import { ChapterId } from '../types';
import { cn } from '../utils/cn';

interface StuckPageProps {
  onNavigateTab: (tab: ActiveTab, chapterId?: ChapterId) => void;
}

interface StuckItem {
  id: string;
  label: string;
  group: 'error' | 'tampilan' | 'umum';
  meaning: string;
  solution: string;
  code?: string;
  tone?: 'danger' | 'success' | 'info';
}

const STUCK_ITEMS: StuckItem[] = [
  ...PYTHON_ERRORS.map((error) => ({
    id: error.id,
    label: error.errorName,
    group: 'error' as const,
    meaning: error.simpleMeaning,
    solution: error.howToFix,
    code: error.sampleFixedCode,
    tone: 'danger' as const,
  })),
  {
    id: 'no-output',
    label: 'Tidak ada output sama sekali',
    group: 'umum',
    meaning:
      'Program selesai tanpa mencetak apa pun. Bisa jadi karena tidak ada print(), atau semua kode berada di dalam fungsi yang belum dipanggil.',
    solution:
      'Tambahkan print() untuk memeriksa nilai variabel. Pastikan fungsi dipanggil, bukan hanya didefinisikan. Jalankan file dari folder yang benar.',
    code: `print("Program mulai")\nprint(akun)`,
    tone: 'info',
  },
  {
    id: 'no-color',
    label: 'Warna tidak muncul di IDLE',
    group: 'tampilan',
    meaning:
      'IDLE bukan terminal sungguhan. sys.stdout.isatty() bernilai False, sehingga PAKAI_WARNA False dan warna() mengembalikan teks polos.',
    solution:
      'Jalankan program lewat terminal dengan python main.py, bukan tombol Run di IDLE. Jika perlu, set FORCE_COLOR=1 di terminal yang mendukung.',
    code: `import sys\nprint(sys.stdout.isatty())  # False di IDLE`,
    tone: 'info',
  },
  {
    id: 'ansi-code',
    label: 'Warna muncul sebagai kode aneh',
    group: 'tampilan',
    meaning:
      'Terminal belum mengaktifkan pemrosesan ANSI, atau program dijalankan di lingkungan yang tidak merender warna.',
    solution:
      'Gunakan Windows 10 ke atas atau Windows Terminal. Pastikan os.system("") dipanggil di awal file jika os.name == "nt".',
    code: `import os\nif os.name == "nt":\n    os.system("")`,
    tone: 'info',
  },
  {
    id: 'box-broken',
    label: 'Karakter kotak rusak (╔ jadi ?)',
    group: 'tampilan',
    meaning:
      'Encoding terminal bukan UTF-8, sehingga karakter Unicode tidak dikenali.',
    solution:
      'Set encoding UTF-8 dengan sys.stdout.reconfigure(encoding="utf-8"). Pastikan file disimpan sebagai UTF-8.',
    code: `import sys\nsys.stdout.reconfigure(encoding="utf-8")`,
    tone: 'info',
  },
  {
    id: 'narrow',
    label: 'Tampilan berantakan karena terminal sempit',
    group: 'tampilan',
    meaning:
      'LEBAR = 64, tetapi lebar terminal kurang dari 64 kolom. Kotak dan tabel akan pecah.',
    solution:
      'Perbesar jendela terminal, kecilkan font, atau kurangi LEBAR menjadi 50. Jangan mengubah LEBAR tanpa menguji semua fungsi yang memakainya.',
    code: `LEBAR = 64  # sesuaikan dengan lebar terminal`,
    tone: 'info',
  },
];

const GROUPS: Array<{ id: StuckItem['group']; label: string; icon: typeof Bug }> = [
  { id: 'error', label: 'Muncul error', icon: Bug },
  { id: 'tampilan', label: 'Masalah tampilan', icon: Palette },
  { id: 'umum', label: 'Umum', icon: Terminal },
];

export const StuckPage: React.FC<StuckPageProps> = ({ onNavigateTab }) => {
  const [selectedId, setSelectedId] = useState<string>('indentation-error');
  const selected = STUCK_ITEMS.find((item) => item.id === selectedId) ?? STUCK_ITEMS[0];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 py-6 sm:py-10">
      <PageHeader
        eyebrow="Pusat bantuan · Kalau Macet"
        icon={LifeBuoy}
        accent="rose"
        title="Kalau Macet, Mulai dari Sini"
        highlight="Mulai dari Sini"
        description="Jangan panik. Pilih gejala yang kamu lihat, lalu ikuti arti dan solusinya. Kalau masih bingung, buka panduan error lengkap."
        stats={[
          { label: 'Skenario bantuan', value: String(STUCK_ITEMS.length) },
          { label: 'Panduan error', value: String(PYTHON_ERRORS.length) },
          { label: 'Istilah', value: '31' },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          {GROUPS.map((group) => {
            const items = STUCK_ITEMS.filter((item) => item.group === group.id);
            const GroupIcon = group.icon;
            return (
              <div key={group.id} className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 shadow-soft backdrop-blur">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-3.5 py-2.5">
                  <GroupIcon className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                    {group.label}
                  </span>
                </div>
                <div className="space-y-1 p-2">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[11px] font-semibold transition',
                        selectedId === item.id
                          ? 'bg-rose-50 text-rose-800 ring-1 ring-rose-200'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      )}
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 shrink-0 rounded-full',
                          selectedId === item.id ? 'bg-rose-500' : 'bg-slate-300'
                        )}
                      />
                      <span className="min-w-0 flex-1">{item.label}</span>
                      {selectedId === item.id && <ArrowRight className="h-3 w-3 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 shadow-soft backdrop-blur">
            <div className="border-b border-slate-100 bg-gradient-to-r from-rose-50 via-white to-amber-50/60 px-4 py-3 sm:px-5">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
                Gejala yang dipilih
              </p>
              <h2 className="mt-0.5 text-base font-extrabold text-slate-900 sm:text-lg">
                {selected.label}
              </h2>
            </div>
            <div className="space-y-4 p-4 sm:p-5">
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-3.5">
                <div className="flex items-center gap-1.5">
                  <Search className="h-3.5 w-3.5 text-rose-600" />
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700">
                    Ini artinya
                  </p>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{selected.meaning}</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                    Ini solusinya
                  </p>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{selected.solution}</p>
              </div>
              {selected.code && (
                <MiniCode
                  code={selected.code}
                  label="contoh perbaikan"
                  tone={selected.tone === 'danger' ? 'success' : 'info'}
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onNavigateTab('debugging')}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 px-3.5 py-2 text-[11px] font-extrabold text-white shadow-sm transition hover:brightness-110"
            >
              <Bug className="h-3.5 w-3.5" /> Buka panduan error lengkap
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('glossary')}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50"
            >
              <Search className="h-3.5 w-3.5" /> Cari istilah di kamus
            </button>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-3.5">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700">
              Alur cepat
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">
              1. Baca pesan error dari baris paling bawah. 2. Cari nama file dan nomor baris. 3.
              Perbaiki satu hal. 4. Jalankan ulang. 5. Jika masih error, buka panduan error atau
              tanya teman.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StuckPage;
