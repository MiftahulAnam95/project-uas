import React, { useState } from 'react';
import {
  FolderTree,
  FileCode,
  Copy,
  Check,
  CheckSquare,

  Sparkles,
  Terminal,
  Layers,
  Folder,
  ArrowRight,
  Trophy,
  Braces,
  RotateCcw,
} from 'lucide-react';
import { PROJECT_FILES } from '../data/codeFiles';
import { CodeBlock } from '../components/code-block/CodeBlock';
import { ChapterId } from '../types';
import { ActiveTab } from '../components/layout/Navbar';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { SectionHeading } from '../components/common/SectionHeading';
import { Reveal } from '../components/common/Reveal';
import { ProgressRing } from '../components/common/ProgressRing';
import { Button } from '../components/common/Button';
import { celebrateBig } from '../utils/celebrate';
import { cn } from '../utils/cn';

interface ProjectPageProps {
  checklistItems: string[];
  onToggleChecklist: (id: string) => void;
  onNavigateTab: (tab: ActiveTab, chapterId?: ChapterId) => void;
}

const CHECKLIST_CRITERIA = [
  { id: 'crit-1', text: 'Saya memahami tujuan program dan mengapa jatah harian penting bagi mahasiswa.' },
  { id: 'crit-2', text: 'Saya memahami pengaturan anggaran dan rumus pembagian jatah harian (anggaran // hari).' },
  { id: 'crit-3', text: 'Saya memahami pencatatan transaksi menggunakan Dictionary di dalam List.' },
  { id: 'crit-4', text: 'Saya memahami perhitungan total pengeluaran dan sisa saldo.' },
  { id: 'crit-5', text: 'Saya memahami logika peringatan status harian: AMAN, WASPADA, dan BOROS!.' },
  { id: 'crit-6', text: 'Saya memahami cara kerja laporan pengeluaran per kategori.' },
  { id: 'crit-7', text: 'Saya memahami hubungan dan tanggung jawab tiga file (pencatat.py, laporan.py, main.py).' },
  { id: 'crit-8', text: 'Saya dapat menjalankan program dari terminal (python main.py).' },
  { id: 'crit-9', text: 'Saya dapat menjelaskan alur program dan menjawab pertanyaan dosen dengan percaya diri.' },
];

const FILE_STYLE: Record<string, { tile: string; chip: string; ring: string; text: string }> = {
  'pencatat.py': {
    tile: 'from-brand-500 to-blue-500',
    chip: 'bg-brand-50 text-brand-700 border-brand-200',
    ring: 'ring-brand-300',
    text: 'text-brand-700',
  },
  'laporan.py': {
    tile: 'from-emerald-500 to-teal-400',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    ring: 'ring-emerald-300',
    text: 'text-emerald-700',
  },
  'main.py': {
    tile: 'from-amber-500 to-orange-400',
    chip: 'bg-amber-50 text-amber-800 border-amber-200',
    ring: 'ring-amber-300',
    text: 'text-amber-700',
  },
};

const RUN_STEPS = [
  <>
    Buat folder baru bernama{' '}
    <code className="rounded-md bg-slate-950/70 px-1.5 py-0.5 font-mono text-emerald-300">
      keuangan_mahasiswa
    </code>{' '}
    di komputer kamu.
  </>,
  <>
    Buat 3 file teks kosong di dalamnya:{' '}
    <code className="rounded-md bg-slate-950/70 px-1.5 py-0.5 font-mono text-brand-300">
      pencatat.py
    </code>
    ,{' '}
    <code className="rounded-md bg-slate-950/70 px-1.5 py-0.5 font-mono text-emerald-300">
      laporan.py
    </code>
    , dan{' '}
    <code className="rounded-md bg-slate-950/70 px-1.5 py-0.5 font-mono text-amber-300">
      main.py
    </code>
    .
  </>,
  <>Salin seluruh kode dari masing-masing tab di atas ke file yang bersangkutan, lalu simpan (Ctrl+S / Cmd+S).</>,
  <>Buka Command Prompt atau Terminal di dalam folder tersebut.</>,
  <>
    Ketik{' '}
    <code className="rounded-md bg-slate-950/70 px-2 py-0.5 font-mono font-bold text-amber-300">
      python main.py
    </code>{' '}
    lalu tekan Enter!
  </>,
];

export const ProjectPage: React.FC<ProjectPageProps> = ({
  checklistItems,
  onToggleChecklist,
  onNavigateTab,
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string>('pencatat.py');
  const [copiedAll, setCopiedAll] = useState(false);

  const activeFile = PROJECT_FILES[selectedFileName] || PROJECT_FILES['pencatat.py'];
  const activeStyle = FILE_STYLE[activeFile.name] || FILE_STYLE['pencatat.py'];

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // clipboard tidak tersedia
    }
  };

  const completedChecklistCount = CHECKLIST_CRITERIA.filter((c) =>
    checklistItems.includes(c.id)
  ).length;
  const checklistPct = Math.round(
    (completedChecklistCount / CHECKLIST_CRITERIA.length) * 100
  );
  const isAllChecklistDone = completedChecklistCount === CHECKLIST_CRITERIA.length;

  const handleItemToggle = (id: string) => {
    onToggleChecklist(id);
    if (
      !checklistItems.includes(id) &&
      completedChecklistCount + 1 === CHECKLIST_CRITERIA.length
    ) {
      celebrateBig();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 sm:py-10">
      {/* ============================ HEADER ============================ */}
      <PageHeader
        eyebrow="Proyek akhir · kode sumber lengkap"
        icon={Layers}
        accent="emerald"
        title="Program Pencatat Keuangan Mahasiswa (Utuh)"
        highlight="(Utuh)"
        description={
          <>
            Struktur berkas utuh yang siap kamu salin ke komputer, simpan di folder{' '}
            <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-emerald-200">
              keuangan_mahasiswa/
            </code>
            , lalu jalankan lewat terminal.
          </>
        }
        stats={[
          { label: 'File', value: '3' },
          {
            label: 'Fungsi',
            value: String(
              Object.values(PROJECT_FILES).reduce((n, f) => n + f.functions.length, 0)
            ),
          },
          { label: 'Checklist', value: `${completedChecklistCount}/${CHECKLIST_CRITERIA.length}` },
        ]}
        actions={
          <Button
            size="md"
            variant="white"
            onClick={handleCopyAll}
            className={cn(copiedAll && 'text-emerald-700')}
          >
            {copiedAll ? (
              <>
                <Check className="h-4 w-4" strokeWidth={3} />
                Kode {activeFile.name} tersalin!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Salin seluruh {activeFile.name}
              </>
            )}
          </Button>
        }
      />

      {/* ============================ STRUKTUR BERKAS ============================ */}
      <Reveal>
        <Card className="space-y-6 p-5 sm:p-7">
          <SectionHeading
            eyebrow="Struktur berkas"
            icon={FolderTree}
            title={
              <>
                Tiga file, satu folder:{' '}
                <span className="font-mono text-brand-700">keuangan_mahasiswa/</span>
              </>
            }
            description="Klik salah satu file untuk melihat seluruh isinya beserta daftar fungsi di dalamnya."
            aside={
              <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-[11px] text-slate-500 shadow-soft sm:flex">
                <Folder className="h-4 w-4 text-amber-500" />
                <span>
                  keuangan_mahasiswa/
                  <span className="text-slate-300"> ── </span>
                  {Object.keys(PROJECT_FILES).join(' · ')}
                </span>
              </div>
            }
          />

          {/* Tab file */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {Object.values(PROJECT_FILES).map((file) => {
              const isSelected = file.name === selectedFileName;
              const s = FILE_STYLE[file.name] || FILE_STYLE['pencatat.py'];
              return (
                <button
                  key={file.name}
                  type="button"
                  onClick={() => setSelectedFileName(file.name)}
                  className={cn(
                    'group relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300',
                    isSelected
                      ? cn('border-transparent bg-white shadow-lift ring-2', s.ring)
                      : 'border-slate-200 bg-slate-50/70 hover:-translate-y-1 hover:bg-white hover:shadow-soft'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 top-0 h-1 bg-gradient-to-r transition-opacity',
                      s.tile,
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    )}
                  />
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 group-hover:scale-105',
                          s.tile
                        )}
                      >
                        <FileCode className="h-4.5 w-4.5" strokeWidth={2.2} />
                      </span>
                      <span className="font-mono text-xs font-extrabold text-slate-900 sm:text-sm">
                        {file.name}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[10px] font-extrabold',
                        s.chip
                      )}
                    >
                      File #{file.order}
                    </span>
                  </span>
                  <span className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {file.role}
                  </span>
                  <span className="mt-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <Braces className="h-3 w-3" />
                    {file.functions.length} fungsi
                  </span>
                </button>
              );
            })}
          </div>

          {/* Peran file aktif */}
          <div
            key={activeFile.name}
            className={cn(
              'flex items-start gap-3 rounded-3xl border p-4 anim-fade sm:p-5',
              activeStyle.chip
            )}
          >
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
                activeStyle.tile
              )}
            >
              <Layers className="h-4.5 w-4.5" strokeWidth={2.2} />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-80">
                Tanggung jawab file
              </div>
              <div className="text-sm font-extrabold text-slate-900">{activeFile.role}</div>
              <p className="mt-1 text-xs leading-relaxed text-slate-700 sm:text-[13px]">
                {activeFile.description}
              </p>
            </div>
          </div>

          {/* Kode lengkap */}
          <CodeBlock
            code={activeFile.code}
            filename={activeFile.name}
            title={`Kode sumber lengkap ${activeFile.name}`}
            isSimulated={true}
          />

          {/* Daftar fungsi */}
          <div className="space-y-3 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-600">
              <Braces className={cn('h-4 w-4', activeStyle.text)} />
              Daftar fungsi dalam {activeFile.name}
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {activeFile.functions.map((fn, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-extrabold text-white',
                        activeStyle.tile
                      )}
                    >
                      {idx + 1}
                    </span>
                    <code className={cn('font-mono text-xs font-extrabold', activeStyle.text)}>
                      {fn.name}
                    </code>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{fn.purpose}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-2.5">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                      param: {fn.parameters}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                      return: {fn.returns}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Reveal>

      {/* ============================ CARA MENJALANKAN ============================ */}
      <Reveal>
        <div className="aurora aurora-emerald relative overflow-hidden rounded-4xl p-6 text-white shadow-[0_30px_70px_-40px_rgba(15,23,42,0.9)] sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl anim-float"
          />
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-950 shadow-[0_14px_30px_-14px_rgba(16,185,129,0.9)]">
                <Terminal className="h-5 w-5" strokeWidth={2.3} />
              </span>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                  Panduan menjalankan di komputer sendiri
                </div>
                <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
                  Langkah demi Langkah di Terminal
                </h2>
              </div>
            </div>

            <ol className="space-y-2.5">
              {RUN_STEPS.map((content, idx) => (
                <li
                  key={idx}
                  className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/[0.1]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 text-[11px] font-extrabold text-slate-950 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {idx + 1}
                  </span>
                  <span className="text-xs leading-relaxed text-slate-200 sm:text-[13px]">
                    {content}
                  </span>
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-3.5 font-mono text-xs">
              <span className="text-emerald-300">➜</span>
              <span className="text-slate-400">~/keuangan_mahasiswa</span>
              <span className="text-white font-bold">python main.py</span>
              <span className="caret text-emerald-300" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ============================ EVALUASI MANDIRI ============================ */}
      <Reveal>
        <Card className="space-y-6 p-5 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-grape-500 text-white shadow-[0_12px_26px_-14px_rgba(106,90,232,0.9)]">
                <CheckSquare className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
                  Evaluasi mandiri
                </div>
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                  Checklist Pemahaman Program
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Centang setiap poin kalau kamu merasa sudah benar-benar paham.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 shadow-soft">
              <ProgressRing
                value={checklistPct}
                size={44}
                stroke={5}
                label={
                  <span className="text-[10px] font-extrabold tabular text-slate-700">
                    {checklistPct}%
                  </span>
                }
              />
              <div className="leading-tight">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Capaian
                </div>
                <div className="text-sm font-extrabold tabular text-slate-900">
                  {completedChecklistCount} / {CHECKLIST_CRITERIA.length}
                </div>
              </div>
            </div>
          </div>

          {/* Item checklist */}
          <ul className="grid gap-2.5">
            {CHECKLIST_CRITERIA.map((crit, idx) => {
              const isChecked = checklistItems.includes(crit.id);
              return (
                <li key={crit.id}>
                  <button
                    type="button"
                    onClick={() => handleItemToggle(crit.id)}
                    aria-pressed={isChecked}
                    className={cn(
                      'group flex w-full cursor-pointer items-start gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-200 sm:p-4',
                      isChecked
                        ? 'border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50/60 shadow-soft'
                        : 'border-slate-200 bg-white hover:-translate-y-px hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-soft'
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200',
                        isChecked
                          ? 'border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-400 text-white'
                          : 'border-slate-300 bg-white text-transparent group-hover:border-brand-400'
                      )}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
                    </span>
                    <span
                      className={cn(
                        'text-xs leading-relaxed sm:text-[13px]',
                        isChecked
                          ? 'font-semibold text-emerald-950 line-through decoration-emerald-400/60'
                          : 'font-medium text-slate-700'
                      )}
                    >
                      <span className="mr-1.5 font-extrabold text-slate-400 tabular">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {crit.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Perayaan selesai */}
          {isAllChecklistDone ? (
            <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-emerald-500 via-teal-500 to-brand-600 p-6 text-white shadow-[0_30px_70px_-35px_rgba(5,150,105,0.9)] anim-pop sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-white/20 blur-3xl anim-float"
              />
              <div className="relative space-y-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                  <Trophy className="h-6 w-6 text-amber-200" strokeWidth={2.2} />
                </span>
                <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  Selamat! Perjalanan belajarmu tuntas 🎉
                </h3>
                <p className="max-w-2xl text-xs leading-relaxed text-emerald-50 sm:text-sm">
                  Kamu sudah menguasai seluruh konsep: dari variabel sampai arsitektur 3 file
                  program pencatat keuangan mahasiswa. Saatnya mempresentasikan karyamu dengan
                  percaya diri.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button
                    size="md"
                    variant="white"
                    onClick={() => onNavigateTab('chapter', 'bab-11')}
                  >
                    Baca Tips Presentasi (Bab 11)
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="md"
                    variant="ghost"
                    onClick={() => onNavigateTab('chapter', 'bab-1')}
                    className="border border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Ulangi Materi dari Awal
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-xs leading-relaxed text-slate-600">
                {completedChecklistCount === 0
                  ? 'Mulai dari poin pertama. Checklist ini bukan ujian — hanya cermin untuk melihat sejauh mana pemahamanmu.'
                  : `Tinggal ${
                      CHECKLIST_CRITERIA.length - completedChecklistCount
                    } poin lagi. Kalau ada yang belum bisa dicentang, kembali ke bab yang membahasnya.`}
              </p>
            </div>
          )}
        </Card>
      </Reveal>
    </div>
  );
};

export default ProjectPage;
