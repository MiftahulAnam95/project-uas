import React, { useEffect, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Database,
  Eye,
  Terminal as TermIcon,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  Zap,
  Keyboard,
  Cpu,
  ArrowDown,
  FileCode2,
} from 'lucide-react';
import { SIMULATION_STEPS } from '../data/flowSteps';
import { TerminalSimulator } from '../components/learning/TerminalSimulator';
import { PageHeader } from '../components/common/PageHeader';
import { SectionHeading } from '../components/common/SectionHeading';
import { MiniCode } from '../components/code-block/MiniCode';
import { Reveal } from '../components/common/Reveal';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { cn } from '../utils/cn';

const FILE_META: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
    title: string;
    desc: string;
    tile: string;
    wrap: string;
    chip: string;
    hex: string;
  }
> = {
  'main.py': {
    icon: TermIcon,
    title: 'Resepsionis & Pengendali Menu',
    desc: 'Menerima ketikan pengguna dari terminal, lalu memanggil fungsi di pencatat.py dan menyerahkan hasilnya ke laporan.py.',
    tile: 'from-amber-500 to-orange-400',
    wrap: 'border-amber-200/80 bg-gradient-to-br from-amber-50/90 via-white to-white',
    chip: 'bg-amber-100 text-amber-900 border-amber-300',
    hex: '#f59e0b',
  },
  'pencatat.py': {
    icon: Database,
    title: 'Akuntan & Basis Data Memori',
    desc: 'Menyimpan anggaran, list transaksi, menghitung jatah harian (//), sisa saldo (−), dan total pengeluaran.',
    tile: 'from-brand-500 to-blue-500',
    wrap: 'border-brand-200/80 bg-gradient-to-br from-brand-50/90 via-white to-white',
    chip: 'bg-brand-100 text-brand-900 border-brand-300',
    hex: '#6a5ae8',
  },
  'laporan.py': {
    icon: Eye,
    title: 'Desainer Tampilan & Validasi',
    desc: 'Mengubah angka jadi format "Rp 100.000", mengecek status AMAN vs BOROS, dan memvalidasi ketikan agar tidak crash.',
    tile: 'from-emerald-500 to-teal-400',
    wrap: 'border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-white',
    chip: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    hex: '#10b981',
  },
};

const FLOW_NODES = [
  { label: 'Mulai', style: 'bg-gradient-to-r from-brand-600 to-grape-500 text-white border-transparent font-extrabold' },
  { label: 'Atur Anggaran [1]', style: 'bg-white text-slate-700 border-slate-300' },
  { label: 'Tampilkan Menu', style: 'bg-white text-slate-700 border-slate-300' },
  { label: 'Pengguna Pilih Opsi', style: 'bg-amber-50 text-amber-900 border-amber-300' },
  { label: 'Jalankan Fungsi', style: 'bg-brand-50 text-brand-900 border-brand-300' },
  { label: 'Perbarui & Tampilkan', style: 'bg-emerald-50 text-emerald-900 border-emerald-300' },
  { label: 'Keluar [0]', style: 'bg-gradient-to-r from-rose-600 to-rose-500 text-white border-transparent font-extrabold' },
];

const formatRupiah = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

type StateKey = keyof (typeof SIMULATION_STEPS)[number]['stateAfter'];

const STATE_FIELDS: Array<{
  key: StateKey;
  label: string;
  format: (v: number | string) => string;
}> = [
  { key: 'anggaran', label: 'anggaran_bulanan', format: (v) => formatRupiah(Number(v)) },
  { key: 'jatahHarian', label: 'jatah_harian', format: (v) => formatRupiah(Number(v)) },
  { key: 'hariAktif', label: 'hari_aktif', format: (v) => `Hari ke-${v}` },
  { key: 'pengeluaranHariIni', label: 'pengeluaran_hari_ini', format: (v) => formatRupiah(Number(v)) },
  { key: 'totalKeluar', label: 'total_pengeluaran', format: (v) => formatRupiah(Number(v)) },
  { key: 'sisaSaldo', label: 'sisa_saldo', format: (v) => formatRupiah(Number(v)) },
  { key: 'transaksiCount', label: 'jumlah_transaksi', format: (v) => `${v} baris` },
  { key: 'status', label: 'status', format: (v) => String(v) },
];

export const FlowVisualizerPage: React.FC = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const step = SIMULATION_STEPS[currentStepIdx];
  const fileMeta = FILE_META[step.activeFile];
  const FileIcon = fileMeta.icon;

  // Animasi masuk setiap kali langkah berganti
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    setPulse((p) => p + 1);
  }, [currentStepIdx]);

  const handleNext = () =>
    setCurrentStepIdx((i) => Math.min(i + 1, SIMULATION_STEPS.length - 1));
  const handlePrev = () => setCurrentStepIdx((i) => Math.max(i - 1, 0));

  // Navigasi papan ketik: panah kiri/kanan
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const changedKeys = STATE_FIELDS.filter(
    (f) => step.stateBefore[f.key] !== step.stateAfter[f.key]
  ).map((f) => f.key);

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6 sm:py-10">
      {/* ============================ HEADER ============================ */}
      <PageHeader
        eyebrow="Bab 7 · Simulasi visual alur program"
        icon={Activity}
        title="Visualisasi Alur Kerja Program & Perubahan Data"
        highlight="Perubahan Data"
        description="Lihat bagaimana input pengguna mengalir melalui 3 file Python (main.py, pencatat.py, dan laporan.py), serta amati perubahan isi variabel di memori secara langsung di setiap langkah."
        stats={[
          { label: 'Langkah trace', value: String(SIMULATION_STEPS.length) },
          { label: 'File terlibat', value: '3' },
          { label: 'Variabel dilacak', value: String(STATE_FIELDS.length) },
        ]}
        actions={
          <div className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.07] px-3 py-2 text-[11px] font-semibold text-slate-300 backdrop-blur">
            <Keyboard className="h-3.5 w-3.5 text-aqua-300" />
            Pakai tombol ← → untuk berpindah langkah
          </div>
        }
      />

      {/* ==================== DIAGRAM 3 FILE ==================== */}
      <Reveal>
        <Card className="space-y-6 p-5 sm:p-8">
          <SectionHeading
            eyebrow="Separation of concerns"
            icon={Layers}
            title="Diagram Hubungan Tiga File"
            description="Setiap file punya satu pekerjaan utama. Inilah alasan kodemu rapi dan mudah diperbaiki."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Object.entries(FILE_META).map(([name, meta], idx) => {
              const Icon = meta.icon;
              const isActiveNow = step.activeFile === name;
              return (
                <React.Fragment key={name}>
                  <div
                    className={cn(
                      'group relative overflow-hidden rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
                      meta.wrap,
                      isActiveNow && 'ring-2 ring-offset-2 ring-offset-white shadow-lift'
                    )}
                    style={isActiveNow ? { '--tw-ring-color': meta.hex } as React.CSSProperties : undefined}
                  >
                    {isActiveNow && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-900/85 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white anim-fade">
                        <span className="relative flex h-1.5 w-1.5 text-emerald-400">
                          <span className="pulse-ring absolute inline-flex h-full w-full rounded-full" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        sedang bertugas
                      </span>
                    )}
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 group-hover:scale-105',
                          meta.tile
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <span
                        className={cn(
                          'rounded-lg border px-2 py-0.5 font-mono text-xs font-extrabold',
                          meta.chip
                        )}
                      >
                        {name}
                      </span>
                    </div>
                    <h3 className="mt-3.5 text-sm font-extrabold tracking-tight text-slate-900">
                      {meta.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{meta.desc}</p>
                    <span className="absolute bottom-3 right-4 text-4xl font-extrabold text-slate-900/[0.05]">
                      {idx + 1}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Alur ringkas */}
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-4">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              Alur program dari awal sampai keluar
            </div>
            <div className="thin-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
              {FLOW_NODES.map((node, idx) => (
                <React.Fragment key={node.label}>
                  <span
                    className={cn(
                      'shrink-0 rounded-xl border px-3 py-1.5 text-[11px] font-semibold shadow-soft transition-transform duration-200 hover:-translate-y-0.5',
                      node.style
                    )}
                  >
                    {node.label}
                  </span>
                  {idx < FLOW_NODES.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Card>
      </Reveal>

      {/* ==================== TRACE LANGKAH DEMI LANGKAH ==================== */}
      <Reveal>
        <Card className="overflow-hidden p-0">
          {/* Kepala stepper */}
          <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-brand-50/40 p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
                  <Sparkles className="h-3.5 w-3.5" />
                  Skenario nyata modul · anggaran Rp 3.000.000
                </div>
                <h2
                  key={`title-${pulse}`}
                  className="text-lg font-extrabold tracking-tight text-slate-900 anim-rise sm:text-2xl"
                >
                  {step.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 font-mono text-[11px] font-extrabold',
                      fileMeta.chip
                    )}
                  >
                    <FileCode2 className="h-3.5 w-3.5" />
                    {step.activeFile}
                  </span>
                  <span className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-500 tabular">
                    Langkah {currentStepIdx + 1} / {SIMULATION_STEPS.length}
                  </span>
                  {changedKeys.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-aqua-200 bg-aqua-50 px-2.5 py-1 text-[11px] font-bold text-aqua-600">
                      <Zap className="h-3.5 w-3.5" />
                      {changedKeys.length} nilai berubah
                    </span>
                  )}
                </div>
              </div>

              {/* Navigasi langkah */}
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStepIdx === 0}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-soft transition hover:-translate-x-0.5 hover:border-brand-300 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                  title="Langkah sebelumnya"
                  aria-label="Langkah sebelumnya"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentStepIdx === SIMULATION_STEPS.length - 1}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-grape-500 text-white shadow-[0_12px_26px_-12px_rgba(106,90,232,0.9)] transition hover:translate-x-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  title="Langkah berikutnya"
                  aria-label="Langkah berikutnya"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Bar progres langkah */}
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 via-grape-500 to-aqua-400 transition-[width] duration-500"
                style={{
                  width: `${((currentStepIdx + 1) / SIMULATION_STEPS.length) * 100}%`,
                }}
              />
            </div>

            {/* Pil pilihan langkah */}
            <div className="thin-scrollbar mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
              {SIMULATION_STEPS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentStepIdx(idx)}
                  title={s.title}
                  className={cn(
                    'shrink-0 cursor-pointer rounded-xl px-3 py-1.5 text-[11px] font-extrabold tabular transition-all duration-200',
                    currentStepIdx === idx
                      ? 'bg-gradient-to-r from-brand-600 to-grape-500 text-white shadow-[0_10px_20px_-12px_rgba(106,90,232,0.9)]'
                      : idx < currentStepIdx
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                  )}
                >
                  {s.stepNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Isi langkah */}
          <div key={pulse} className="space-y-6 p-5 anim-fade sm:p-7">
            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
              {/* Kolom penjelasan */}
              <div className="space-y-4">
                <div
                  className={cn(
                    'rounded-3xl border p-4 transition-colors',
                    fileMeta.wrap
                  )}
                >
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    <Cpu className="h-3.5 w-3.5" />
                    File yang bertugas
                  </div>
                  <div className="mt-2 flex items-center gap-2.5">
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
                        fileMeta.tile
                      )}
                    >
                      <FileIcon className="h-4.5 w-4.5" strokeWidth={2.2} />
                    </span>
                    <span className="font-mono text-sm font-extrabold text-slate-900">
                      {step.activeFile}
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-700 sm:text-[13px]">
                    {step.fileRoleInStep}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-soft">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    <Keyboard className="h-3.5 w-3.5" />
                    Aksi & masukan pengguna
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-800">
                    {step.actionDescription}
                  </p>
                  {step.userInput && (
                    <div className="mt-2.5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-1.5 font-mono text-[11px] text-emerald-300">
                      <span className="text-slate-500">&gt;</span>
                      {step.userInput}
                    </div>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-soft">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    Fungsi yang dipanggil
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {step.calledFunctions.map((fn) => (
                      <span
                        key={fn}
                        className="rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1 font-mono text-[11px] font-bold text-brand-700 transition hover:-translate-y-px hover:bg-brand-100"
                      >
                        {fn}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50/60 p-4">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                    <Eye className="h-3.5 w-3.5" />
                    Apa yang terjadi di balik layar
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-emerald-950/85 sm:text-[13px]">
                    {step.whatHappened}
                  </p>
                </div>
              </div>

              {/* Kolom terminal */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                  <TermIcon className="h-3.5 w-3.5" />
                  Tampilan terminal pada langkah ini
                </div>
                <MiniCode
                  code={step.terminalOutput}
                  asOutput
                  tone="success"
                  label={`main.py · langkah ${step.stepNumber}`}
                  className="max-h-[26rem] overflow-y-auto"
                />

                {/* State inspector */}
                <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-soft">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-600">
                      <Database className="h-3.5 w-3.5 text-brand-500" />
                      State inspector
                    </div>
                    <span className="rounded-lg bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-500">
                      step {step.stepNumber}
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      <span className="px-2.5 py-2">variabel</span>
                      <span className="border-l border-slate-200 px-2.5 py-2 text-right">
                        sebelum
                      </span>
                      <span className="border-l border-slate-200 px-2.5 py-2 text-right">
                        sesudah
                      </span>
                    </div>
                    {STATE_FIELDS.map((field) => {
                      const before = step.stateBefore[field.key];
                      const after = step.stateAfter[field.key];
                      const changed = before !== after;
                      return (
                        <div
                          key={field.key}
                          className={cn(
                            'grid grid-cols-[1.2fr_1fr_1fr] items-center border-t border-slate-100 font-mono text-[11px] transition-colors',
                            changed ? 'bg-aqua-50/70' : 'bg-white'
                          )}
                        >
                          <span className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-600">
                            {changed && (
                              <Zap className="h-3 w-3 shrink-0 text-aqua-500" strokeWidth={2.6} />
                            )}
                            <span className="truncate">{field.label}</span>
                          </span>
                          <span className="border-l border-slate-100 px-2.5 py-1.5 text-right font-bold text-slate-500 tabular">
                            {field.format(before)}
                          </span>
                          <span
                            className={cn(
                              'border-l border-slate-100 px-2.5 py-1.5 text-right font-extrabold tabular transition-colors',
                              changed ? 'text-brand-700' : 'text-slate-700'
                            )}
                          >
                            {field.format(after)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-500">
                    <ArrowDown className="mt-px h-3.5 w-3.5 shrink-0 text-aqua-500" />
                    Baris yang bercahaya biru adalah nilai yang benar-benar berubah karena aksi
                    pada langkah ini.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigasi bawah */}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIdx === 0}
                className="group flex cursor-pointer items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-left shadow-soft transition hover:-translate-x-0.5 hover:border-brand-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRight className="h-4 w-4 rotate-180 text-slate-400 transition group-hover:text-brand-600" />
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sebelumnya
                  </span>
                  <span className="block max-w-[16rem] truncate text-xs font-extrabold text-slate-800">
                    {currentStepIdx > 0
                      ? SIMULATION_STEPS[currentStepIdx - 1].title
                      : '—'}
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentStepIdx === SIMULATION_STEPS.length - 1}
                className="group flex cursor-pointer items-center justify-end gap-2.5 rounded-2xl bg-gradient-to-r from-brand-600 to-grape-500 px-4 py-2.5 text-right text-white shadow-lift transition hover:translate-x-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-white/70">
                    Berikutnya
                  </span>
                  <span className="block max-w-[16rem] truncate text-xs font-extrabold">
                    {currentStepIdx < SIMULATION_STEPS.length - 1
                      ? SIMULATION_STEPS[currentStepIdx + 1].title
                      : 'Selesai — coba terminalnya!'}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* ==================== TERMINAL LIVE ==================== */}
      <section className="space-y-5">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
              <TermIcon className="h-3.5 w-3.5" />
              Ruang uji langsung
            </span>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Coba Sendiri Program Pencatat{' '}
              <span className="text-gradient">Keuangan di Sini</span>
            </h2>
            <p className="mx-auto mt-1.5 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              Ketik angka menu 1 sampai 5 (atau 0 untuk keluar) seperti sedang berada di
              terminal laptopmu sungguhan.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <TerminalSimulator />
        </Reveal>

        <Reveal delay={140}>
          <div className="flex flex-col items-center justify-between gap-3 rounded-3xl border border-slate-200/80 bg-white/80 p-4 shadow-soft backdrop-blur sm:flex-row">
            <p className="text-xs leading-relaxed text-slate-600">
              <strong className="font-extrabold text-slate-800">Sudah paham alurnya?</strong>{' '}
              Langkah berikutnya adalah melihat kode utuh tiga file yang barusan kamu jalankan.
            </p>
            <Button
              size="md"
              variant="dark"
              onClick={() => {
                window.location.hash = 'project';
              }}
              className="shrink-0"
            >
              <FileCode2 className="h-4 w-4" />
              Buka Proyek Akhir
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default FlowVisualizerPage;
