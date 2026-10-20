import React from 'react';
import {
  Play,
  Activity,
  ArrowRight,
  ShieldCheck,
  Terminal,
  ClipboardCheck,
  CheckCircle2,
  FileCode,
  Users,
  Layers,
  Cpu,
  Sparkles,
  BookOpen,
  Bug,
  BookMarked,
  Target,
  Zap,
  GraduationCap,
  Rocket,
} from 'lucide-react';
import { ActiveTab } from '../components/layout/Navbar';
import { ChapterId } from '../types';
import { CHAPTERS } from '../data/lessons';
import { accentForChapter } from '../theme/accents';
import { Reveal } from '../components/common/Reveal';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { TypingTerminal } from '../components/common/TypingTerminal';
import { cn } from '../utils/cn';

interface HomePageProps {
  onNavigateTab: (tab: ActiveTab, chapterId?: ChapterId) => void;
  completedCount: number;
  totalChapters: number;
  lastVisitedChapter: ChapterId;
  percentage: number;
  completedChapters?: ChapterId[];
}

const HERO_STATS = [
  { icon: BookOpen, value: '11', label: 'Bab terstruktur', tile: 'from-brand-500 to-grape-500' },
  { icon: Zap, value: '30+', label: 'Latihan & kuis', tile: 'from-amber-500 to-orange-400' },
  { icon: Bug, value: '6', label: 'Panduan error', tile: 'from-rose-500 to-pink-500' },
  { icon: BookMarked, value: '30+', label: 'Istilah dikamus', tile: 'from-teal-500 to-emerald-400' },
];

const LEARNING_STEPS = [
  {
    icon: BookOpen,
    title: 'Baca penjelasannya',
    desc: 'Bahasa Indonesia sehari-hari plus perumpamaan nyata — bukan istilah textbook yang bikin pusing.',
    tile: 'from-brand-500 to-grape-500',
  },
  {
    icon: Terminal,
    title: 'Lihat kodenya hidup',
    desc: 'Setiap contoh bisa dijalankan langsung di browser, lengkap dengan penjelasan per baris.',
    tile: 'from-sky-500 to-cyan-400',
  },
  {
    icon: Target,
    title: 'Uji dengan latihan',
    desc: 'Tebak output, lengkapi kode, susun urutan alur, lalu tutup bab dengan kuis singkat.',
    tile: 'from-amber-500 to-orange-400',
  },
  {
    icon: Rocket,
    title: 'Rakit proyek akhirnya',
    desc: 'Gabungkan semuanya jadi program pencatat keuangan 3 file yang siap kamu presentasikan.',
    tile: 'from-emerald-500 to-teal-400',
  },
];

const AUDIENCE = [
  {
    icon: Users,
    title: 'Mahasiswa Baru Semester Awal',
    desc: 'Sedang mengambil mata kuliah Dasar Pemrograman atau Algoritma dan butuh penjelasan bahasa Indonesia yang ramah dan mudah dimengerti.',
    tile: 'from-brand-500 to-blue-500',
    glow: 'group-hover:shadow-[0_18px_40px_-18px_rgba(79,70,229,0.7)]',
  },
  {
    icon: Cpu,
    title: 'Pemula Non-IT Tanpa Pengalaman',
    desc: 'Berasal dari jurusan non-teknik atau baru pertama kali melihat teks editor, ingin menguasai logika koding melalui studi kasus nyata.',
    tile: 'from-emerald-500 to-teal-400',
    glow: 'group-hover:shadow-[0_18px_40px_-18px_rgba(5,150,105,0.7)]',
  },
  {
    icon: GraduationCap,
    title: 'Siap Presentasi Tugas Akhir',
    desc: 'Ingin memahami setiap baris kodenya dengan tuntas agar dapat menjawab pertanyaan dosen dengan percaya diri tanpa rasa gugup.',
    tile: 'from-fuchsia-500 to-violet-500',
    glow: 'group-hover:shadow-[0_18px_40px_-18px_rgba(192,38,211,0.7)]',
  },
];

const OUTCOMES = [
  '9 pondasi dasar Python (print, variabel, input, rumus, if/else, list, dict, fungsi, import)',
  'Prinsip modularitas: mengapa membagi kode ke 3 file membuat hidupmu jauh lebih mudah',
  'Cara memvalidasi input agar program tidak crash saat pengguna salah ketik',
  'Melacak perubahan data di memori dari Hari 1 hingga Hari 30',
  'Membaca pesan error Python tanpa panik dan memperbaikinya',
  'Strategi presentasi dan bocoran jawaban pertanyaan dosen penguji',
];

const FILES = [
  {
    name: 'pencatat.py',
    order: 1,
    desc: 'Menyimpan anggaran, list transaksi, dan menghitung sisa saldo serta jatah harian.',
    tile: 'from-brand-500 to-blue-500',
    text: 'text-brand-700',
    ring: 'ring-brand-100',
  },
  {
    name: 'laporan.py',
    order: 2,
    desc: 'Memformat mata uang Rupiah, memeriksa status aman/boros, dan memvalidasi input.',
    tile: 'from-emerald-500 to-teal-400',
    text: 'text-emerald-700',
    ring: 'ring-emerald-100',
  },
  {
    name: 'main.py',
    order: 3,
    desc: 'Menyajikan menu utama di terminal, menerima input pengguna, dan menghubungkan fungsi.',
    tile: 'from-amber-500 to-orange-400',
    text: 'text-amber-700',
    ring: 'ring-amber-100',
  },
];

const MARQUEE_ITEMS = [
  'print()',
  'variabel',
  'input()',
  'if / elif / else',
  'list',
  'dictionary',
  'def fungsi()',
  'import module',
  'f-string',
  'try / except',
  'Rp 3.000.000 // 30',
  'while True',
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateTab,
  completedCount,
  totalChapters,
  lastVisitedChapter,
  percentage,
  completedChapters = [],
}) => {
  const lastChapterMeta =
    CHAPTERS.find((c) => c.id === lastVisitedChapter) || CHAPTERS[0];

  return (
    <div className="space-y-16 py-6 sm:space-y-24 sm:py-10">
      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden rounded-5xl border border-white/70 bg-white/55 p-5 shadow-soft backdrop-blur-xl sm:p-8 lg:p-12">
        {/* Dekorasi latar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-brand-300/35 blur-3xl anim-float-slow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-aqua-300/30 blur-3xl anim-float"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-grape-300/25 blur-3xl"
        />
        <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative grid items-center gap-10 lg:grid-cols-12">
          {/* Kolom teks */}
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur anim-rise">
              <span className="relative flex h-1.5 w-1.5 text-brand-500">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              <ClipboardCheck className="h-3.5 w-3.5" />
              Tugas Project UAS · Belajar Interaktif
            </div>

            <h1
              className="text-[2rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 anim-rise sm:text-5xl lg:text-[3.4rem]"
              style={{ animationDelay: '60ms' }}
            >
              Belajar Python dari Nol, Sampai Bisa{' '}
              <span className="text-gradient">Membuat Program Sendiri.</span>
            </h1>

            <p
              className="max-w-xl text-sm leading-relaxed text-slate-600 anim-rise sm:text-base"
              style={{ animationDelay: '120ms' }}
            >
              Mulai dari mengenal apa itu program, memahami variabel dan percabangan,
              sampai membuat <strong className="font-bold text-slate-800">program pencatat
              keuangan mahasiswa</strong>. Dijelaskan langkah demi langkah, tanpa perlu
              pengalaman coding sebelumnya.
            </p>

            {/* CTA */}
            <div
              className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center anim-rise"
              style={{ animationDelay: '180ms' }}
            >
              <Button
                size="lg"
                onClick={() => onNavigateTab('chapter', lastVisitedChapter)}
                className="w-full sm:w-auto"
              >
                <Play className="h-4 w-4 fill-current" />
                {completedCount > 0
                  ? `Lanjutkan Bab ${lastChapterMeta.number}`
                  : 'Mulai Belajar Sekarang'}
              </Button>

              <Button
                size="lg"
                variant="soft"
                onClick={() => onNavigateTab('flow')}
                className="w-full sm:w-auto"
              >
                <Activity className="h-4 w-4 text-brand-600" />
                Coba Simulasi Alur
              </Button>
            </div>

            {/* Progres berjalan */}
            {completedCount > 0 && (
              <div className="max-w-md anim-rise" style={{ animationDelay: '240ms' }}>
                <div className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/85 p-3 shadow-soft backdrop-blur">
                  <div className="h-10 w-1.5 shrink-0 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="w-full rounded-full bg-gradient-to-b from-brand-500 to-aqua-400 transition-[height] duration-700"
                      style={{ height: `${percentage}%` }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-extrabold text-slate-800">
                      Progresmu tersimpan di perangkat ini
                    </div>
                    <div className="text-[11px] font-semibold text-brand-600 tabular">
                      {completedCount} dari {totalChapters} bab selesai · {percentage}%
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('chapter', lastVisitedChapter)}
                    className="shrink-0 cursor-pointer rounded-xl bg-brand-600 px-3 py-1.5 text-[11px] font-extrabold text-white transition hover:bg-brand-700 active:scale-95"
                  >
                    Lanjutkan
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Kolom visual: terminal yang mengetik sendiri */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Kartu kode kecil mengambang */}
              <div className="absolute -left-2 -top-6 z-20 hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 px-3 py-2 font-mono text-[11px] shadow-lift backdrop-blur anim-float sm:block">
                <span className="text-rose-400">def</span>{' '}
                <span className="text-sky-300">hitung_jatah</span>
                <span className="text-slate-300">(anggaran, hari=</span>
                <span className="text-amber-300">30</span>
                <span className="text-slate-300">):</span>
              </div>
              <div
                className="absolute -bottom-5 -right-1 z-20 hidden items-center gap-1.5 rounded-2xl border border-emerald-200 bg-white px-3 py-2 text-[11px] font-extrabold text-emerald-700 shadow-lift anim-float-slow sm:flex"
                style={{ animationDelay: '1.2s' }}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Status: AMAN ✓
              </div>

              <TypingTerminal />
            </div>
          </div>
        </div>

        {/* Statistik singkat */}
        <div className="relative mt-10 grid grid-cols-2 gap-3 sm:mt-12 lg:grid-cols-4">
          {HERO_STATS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={idx * 70} className="h-full">
                <div className="group flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white">
                  <span
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 group-hover:scale-105',
                      s.tile
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.3} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-lg font-extrabold tabular text-slate-900">
                      {s.value}
                    </span>
                    <span className="block text-[11px] font-semibold text-slate-500">
                      {s.label}
                    </span>
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================================================================== */}
      {/* MARQUEE ISTILAH                                                    */}
      {/* ================================================================== */}
      <div className="mask-fade-x relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
        <div
          className="flex w-max gap-3 py-1"
          style={{ animation: 'uas-marquee 42s linear infinite' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="flex items-center gap-3 whitespace-nowrap rounded-full border border-slate-200/80 bg-white/70 px-4 py-1.5 font-mono text-[11px] font-medium text-slate-500 shadow-soft backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-aqua-400" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ================================================================== */}
      {/* CARA BELAJAR                                                       */}
      {/* ================================================================== */}
      <section className="max-w-6xl mx-auto px-0 sm:px-4">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Alurnya jelas"
            icon={Sparkles}
            title={
              <>
                Empat Langkah yang Berulang di{' '}
                <span className="text-gradient">Setiap Bab</span>
              </>
            }
            description="Kamu tidak akan dilepas begitu saja dengan tumpukan kode. Setiap bab mengikuti ritme yang sama supaya otakmu punya pola."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LEARNING_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={idx * 90} className="h-full">
                <Card hover className="group relative h-full p-5">
                  <span className="absolute right-4 top-3 text-5xl font-extrabold text-slate-100 transition-colors group-hover:text-brand-50">
                    {idx + 1}
                  </span>
                  <span
                    className={cn(
                      'relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105',
                      step.tile
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="relative mt-4 text-[15px] font-extrabold tracking-tight text-slate-900">
                    {step.title}
                  </h3>
                  <p className="relative mt-1.5 text-xs leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================================================================== */}
      {/* TARGET PEMBACA                                                     */}
      {/* ================================================================== */}
      <section className="max-w-6xl mx-auto px-0 sm:px-4">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Target pembaca"
            icon={Users}
            title="Untuk Siapa Modul Belajar Ini Dibuat?"
            description="Dirancang khusus tanpa asumsi bahwa kamu sudah pernah membuat program sebelumnya."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {AUDIENCE.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 100} className="h-full">
                <Card
                  hover
                  accent
                  className={cn(
                    'group h-full p-6 transition-shadow duration-300',
                    item.glow
                  )}
                >
                  <span
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6',
                      item.tile
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.1} />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================================================================== */}
      {/* ISI PEMBELAJARAN + ARSITEKTUR                                      */}
      {/* ================================================================== */}
      <section className="max-w-6xl mx-auto px-0 sm:px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl border border-slate-200/80 bg-white/75 p-6 shadow-soft backdrop-blur-xl sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-aqua-200/30 blur-3xl"
            />
            <div className="relative grid items-start gap-10 lg:grid-cols-2">
              <div className="space-y-5">
                <SectionHeading
                  eyebrow="Isi pembelajaran"
                  icon={Layers}
                  title="Hal-hal yang Akan Kamu Pahami"
                  description="Bukan sekadar menyalin kode — kamu akan paham logika di balik setiap bagiannya."
                />

                <ul className="space-y-2.5 pt-1">
                  {OUTCOMES.map((item, idx) => (
                    <Reveal as="li" key={item} delay={idx * 55}>
                      <span className="group flex items-start gap-3 rounded-2xl border border-transparent p-2.5 transition hover:border-brand-100 hover:bg-brand-50/60">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-sm transition-transform group-hover:scale-110">
                          <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* Kartu arsitektur 3 file */}
              <Reveal delay={120}>
                <Card solid className="p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-grape-500 text-white shadow-sm">
                      <Layers className="h-4.5 w-4.5" strokeWidth={2.2} />
                    </span>
                    <div className="leading-tight">
                      <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-600">
                        Arsitektur proyek akhir
                      </div>
                      <div className="text-sm font-extrabold text-slate-900">
                        Tiga file, satu program utuh
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-5 space-y-3">
                    {/* Garis penghubung antar file */}
                    <span
                      aria-hidden="true"
                      className="absolute left-[1.35rem] top-4 bottom-6 w-px bg-gradient-to-b from-brand-300 via-emerald-300 to-amber-300"
                    />
                    {FILES.map((file) => (
                      <div
                        key={file.name}
                        className={cn(
                          'group relative flex gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift'
                        )}
                      >
                        <span
                          className={cn(
                            'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-[11px] font-extrabold text-white shadow-sm',
                            file.tile
                          )}
                        >
                          {file.order}
                        </span>
                        <div className="min-w-0">
                          <div className={cn('font-mono text-xs font-bold', file.text)}>
                            {file.name}
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                            {file.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="dark"
                    size="md"
                    full
                    className="mt-5"
                    onClick={() => onNavigateTab('project')}
                  >
                    <FileCode className="h-4 w-4" />
                    Lihat Kode Sumber Utuh
                  </Button>
                </Card>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================================================================== */}
      {/* PETA 11 BAB                                                        */}
      {/* ================================================================== */}
      <section className="max-w-6xl mx-auto px-0 sm:px-4">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Kurikulum terstruktur"
            icon={BookOpen}
            title={
              <>
                Peta Perjalanan Belajar <span className="text-gradient">11 Bab</span>
              </>
            }
            description="Disusun berurutan sesuai modul resmi: dari perkenalan santai sampai tips presentasi di depan dosen."
            aside={
              <div className="mx-auto mt-3 flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-bold text-slate-600 shadow-soft backdrop-blur sm:mt-0">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                {completedCount}/{totalChapters} bab kamu selesaikan
              </div>
            }
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((chap, idx) => {
            const accent = accentForChapter(chap.number);
            const done = completedChapters.includes(chap.id);
            return (
              <Reveal key={chap.id} delay={(idx % 3) * 80} className="h-full">
                <button
                  type="button"
                  onClick={() => onNavigateTab('chapter', chap.id)}
                  className={cn(
                    'group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border bg-white/85 p-5 text-left shadow-soft backdrop-blur transition-all duration-300',
                    'hover:-translate-y-1 hover:bg-white hover:shadow-lift',
                    done ? 'border-emerald-200' : 'border-slate-200/80 hover:border-brand-200'
                  )}
                >
                  {/* Nomor besar sebagai watermark */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute -right-3 -top-6 text-[5.5rem] font-extrabold leading-none text-slate-900/[0.045] transition-all duration-500 group-hover:scale-110 group-hover:text-slate-900/[0.07]'
                    )}
                  >
                    {chap.number}
                  </span>

                  <div className="relative flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider',
                        done
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : cn(accent.chip)
                      )}
                    >
                      {done ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                          Selesai
                        </>
                      ) : (
                        <>Bab {chap.number}</>
                      )}
                    </span>
                    <span
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-gradient-to-br group-hover:text-white',
                        accent.iconTile
                      )}
                    >
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} />
                    </span>
                  </div>

                  <h3 className="relative mt-3 text-[15px] font-extrabold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-brand-700">
                    {chap.title}
                  </h3>
                  <p className="relative mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {chap.subtitle}
                  </p>

                  <div className="relative mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                      <Layers className="h-3 w-3" />
                      {chap.sections.length} sub-materi
                    </span>
                    <span className={cn('text-[11px] font-extrabold', accent.text)}>
                      Pelajari →
                    </span>
                  </div>

                  {/* Bar aksen bawah saat hover */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100',
                      accent.bar
                    )}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================================================================== */}
      {/* CTA SIMULATOR                                                      */}
      {/* ================================================================== */}
      <section className="max-w-5xl mx-auto px-0 sm:px-4">
        <Reveal>
          <div className="aurora relative overflow-hidden rounded-5xl p-7 text-center text-white shadow-[0_36px_80px_-40px_rgba(15,23,42,0.9)] sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-aqua-400/20 blur-3xl anim-float"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-grape-500/25 blur-3xl anim-float-slow"
            />

            <div className="relative z-10 space-y-4">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-aqua-400 to-brand-500 text-white shadow-[0_18px_40px_-14px_rgba(34,211,238,0.9)] anim-float">
                <Terminal className="h-7 w-7" strokeWidth={2.2} />
              </span>

              <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
                Ingin Mencoba Langsung <span className="text-gradient-light">Programnya?</span>
              </h2>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Tidak perlu memasang Python sekarang kalau cuma ingin mencoba. Pakai terminal
                simulator interaktif kami untuk melihat bagaimana program bekerja secara nyata.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                <Button
                  size="lg"
                  variant="white"
                  onClick={() => onNavigateTab('flow')}
                  className="w-full sm:w-auto"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Buka Simulasi Alur Program
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => onNavigateTab('debugging')}
                  className="w-full border border-white/15 bg-white/[0.07] text-white backdrop-blur hover:bg-white/[0.14] hover:text-white sm:w-auto"
                >
                  <ShieldCheck className="h-4 w-4 text-rose-300" />
                  Pelajari Cara Baca Error
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
