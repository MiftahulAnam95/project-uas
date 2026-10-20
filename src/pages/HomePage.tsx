import React from 'react';
import { Play, Activity, ArrowRight, ShieldCheck, Terminal, ClipboardCheck, CheckCircle2, FileCode, Users, Layers, Cpu } from 'lucide-react';
import { ActiveTab } from '../components/layout/Navbar';
import { ChapterId } from '../types';
import { CHAPTERS } from '../data/lessons';

interface HomePageProps {
  onNavigateTab: (tab: ActiveTab, chapterId?: ChapterId) => void;
  completedCount: number;
  totalChapters: number;
  lastVisitedChapter: ChapterId;
  percentage: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateTab,
  completedCount,
  totalChapters,
  lastVisitedChapter,
  percentage,
}) => {
  const lastChapterMeta = CHAPTERS.find((c) => c.id === lastVisitedChapter) || CHAPTERS[0];

  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-900/10 via-slate-50 to-slate-50 border border-indigo-100 p-6 sm:p-12 lg:p-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-bold border border-indigo-200">
            <ClipboardCheck className="w-4 h-4 text-indigo-600" />
            <span>Tugas Project UAS — Platform Belajar Interaktif</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Belajar Python dari Nol, Sampai Bisa Membuat Program Sendiri.
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Mulai dari mengenal apa itu program, memahami variabel dan percabangan, sampai membuat program pencatat keuangan mahasiswa. Semuanya dijelaskan langkah demi langkah, tanpa harus punya pengalaman coding sebelumnya.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigateTab('chapter', lastVisitedChapter)}
              className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>
                {completedCount > 0 ? `Lanjutkan Belajar: Bab ${lastChapterMeta.number}` : 'Mulai Belajar Sekarang'}
              </span>
            </button>

            <button
              onClick={() => onNavigateTab('flow')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-2xl font-semibold text-base transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>Coba Simulasi Alur Program</span>
            </button>
          </div>

          {/* Quick Progress Banner if already started */}
          {completedCount > 0 && (
            <div className="pt-4 max-w-md mx-auto">
              <div className="p-3.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-indigo-200/80 shadow-xs flex items-center justify-between text-left">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Progresmu Tersimpan di Perangkat Ini
                  </div>
                  <div className="text-xs text-indigo-600 font-semibold">
                    {completedCount} dari {totalChapters} bab selesai ({percentage}%)
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('chapter', lastVisitedChapter)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hero Code & Terminal Preview Mockup */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span className="ml-2 font-mono text-slate-300">keuangan_mahasiswa / main.py</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono">Python 3.11</span>
          </div>
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
            <div className="text-slate-300 space-y-1 overflow-x-auto">
              <div className="text-slate-500"># 1. Menghitung jatah harian mahasiswa</div>
              <div><span className="text-rose-400">def</span> <span className="text-sky-300">hitung_jatah</span>(anggaran, hari=30):</div>
              <div className="pl-4"><span className="text-rose-400">return</span> anggaran // hari</div>
              <div className="pt-2 text-slate-500"># 2. Cek status belanja hari ini</div>
              <div><span className="text-rose-400">if</span> pengeluaran_hari &gt; jatah_harian:</div>
              <div className="pl-4"><span className="text-sky-300">print</span>(<span className="text-amber-300">"Status: BOROS!"</span>)</div>
            </div>
            <div className="bg-black/80 rounded-xl p-4 border border-slate-800 text-slate-300 text-xs flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-slate-500">$ python main.py</div>
                <div className="text-emerald-400 font-semibold">=============================================</div>
                <div className="text-white font-bold">  RINGKASAN KEUANGAN MAHASISWA</div>
                <div className="text-slate-400">  Anggaran : Rp 3.000.000 (30 Hari)</div>
                <div className="text-slate-400">  Jatah    : Rp 100.000 / hari</div>
                <div className="text-amber-300">  Status   : BOROS! (Pengeluaran Rp 125.000)</div>
                <div className="text-emerald-400 font-semibold">=============================================</div>
              </div>
              <div className="pt-3 text-[11px] text-slate-400 italic">
                ✓ Menghubungkan 3 file: pencatat.py, laporan.py, dan main.py
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            Target Pembaca
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Untuk Siapa Modul Belajar Ini Dibuat?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Dirancang khusus tanpa asumsi bahwa kamu sudah pernah membuat program sebelumnya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              Mahasiswa Baru Semester Awal
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sedang mengambil mata kuliah Dasar Pemrograman atau Algoritma dan butuh penjelasan bahasa Indonesia yang ramah dan mudah dimengerti.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              Pemula Non-IT Tanpa Pengalaman
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Berasal dari jurusan non-teknik atau baru pertama kali melihat teks editor, ingin menguasai logika koding melalui studi kasus nyata.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-2">
              Siap Presentasi Tugas Akhir
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ingin memahami setiap baris kodenya dengan tuntas agar dapat menjawab pertanyaan dosen dengan percaya diri tanpa rasa gugup.
            </p>
          </div>
        </div>
      </section>

      {/* What You Will Learn (Highlights) */}
      <section className="bg-slate-100/70 rounded-3xl p-6 sm:p-12 max-w-6xl mx-auto border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Isi Pembelajaran
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Hal-hal yang Akan Kamu Pahami
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Bukan sekadar menyalin kode, kamu akan memahami logika di balik setiap bagian:
            </p>
            <div className="space-y-3 pt-2">
              {[
                '9 pondasi dasar Python (print, variabel, input, rumus, if/else, list, dict, fungsi, import)',
                'Prinsip modularitas: mengapa membagi kode ke 3 file membuat hidupmu jauh lebih mudah',
                'Cara memvalidasi input agar program tidak crash saat pengguna salah ketik',
                'Melacak perubahan data di memori dari Hari 1 hingga Hari 30',
                'Membaca pesan error Python tanpa panik dan memperbaikinya',
                'Strategi presentasi dan bocoran jawaban pertanyaan dosen penguji',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Architecture Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Arsitektur Proyek Akhir (3 File)</span>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-mono text-xs font-bold text-indigo-600">1. pencatat.py</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Menyimpan anggaran, list transaksi, dan menghitung sisa saldo serta jatah harian.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-mono text-xs font-bold text-emerald-600">2. laporan.py</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Memformat mata uang Rupiah, memeriksa status aman/boros, dan memvalidasi input.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-mono text-xs font-bold text-amber-600">3. main.py</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Menyajikan menu utama di terminal, menerima input pengguna, dan menghubungkan fungsi.
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('project')}
              className="w-full mt-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCode className="w-4 h-4" />
              <span>Lihat Kode Sumber Utuh</span>
            </button>
          </div>
        </div>
      </section>

      {/* 11 Chapters Learning Roadmap */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Kurikulum Terstruktur
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Peta Perjalanan Belajar 11 Bab
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Disusun secara berurutan sesuai modul resmi: dari perkenalan santai hingga tips presentasi di depan dosen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHAPTERS.map((chap) => (
            <div
              key={chap.id}
              onClick={() => onNavigateTab('chapter', chap.id)}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Bab {chap.number}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                  {chap.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {chap.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{chap.sections.length} Sub-Materi</span>
                <span className="font-semibold text-indigo-600 group-hover:underline">
                  Pelajari &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Terminal Simulator Teaser */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <div className="p-8 bg-indigo-900 text-white rounded-3xl shadow-xl space-y-4">
          <Terminal className="w-10 h-10 text-indigo-300 mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-black">
            Ingin Mencoba Langsung Programnya?
          </h3>
          <p className="text-indigo-200 text-sm sm:text-base max-w-xl mx-auto">
            Kamu tidak perlu menginstal Python sekarang jika hanya ingin mencoba! Gunakan terminal simulator interaktif kami untuk melihat bagaimana program bekerja secara nyata.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('flow')}
              className="px-6 py-3 bg-white text-indigo-900 hover:bg-indigo-50 rounded-xl font-bold text-sm shadow-md transition active:scale-95 cursor-pointer"
            >
              Buka Simulasi Alur Program Sekarang
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
