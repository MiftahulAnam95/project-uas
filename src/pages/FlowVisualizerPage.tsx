import React, { useState } from 'react';
import { 
  Activity, 
  ArrowRight, 
  Database, 
  Eye, 
  Terminal as TermIcon, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  Layers
} from 'lucide-react';
import { SIMULATION_STEPS } from '../data/flowSteps';
import { TerminalSimulator } from '../components/learning/TerminalSimulator';

export const FlowVisualizerPage: React.FC = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const step = SIMULATION_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < SIMULATION_STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const formatRupiah = (val: number) => {
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 space-y-12">
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Bab 7 & Simulasi Visual Alur Program</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Visualisasi Alur Kerja Program & Perubahan Data
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Lihat bagaimana input pengguna mengalir melalui 3 file Python (main.py, pencatat.py, dan laporan.py), serta amati perubahan isi variabel memori secara langsung di setiap langkah.
        </p>
      </div>

      {/* 3 Files Architecture Roles Visual Diagram */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>Diagram Hubungan Tiga File (Separation of Concerns)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* main.py */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                main.py
              </span>
              <TermIcon className="w-4 h-4 text-amber-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Resepsionis & Pengendali Menu</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menerima ketikan pengguna dari terminal, lalu memanggil fungsi di pencatat.py dan menyerahkan hasilnya ke laporan.py.
            </p>
          </div>

          {/* pencatat.py */}
          <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
                pencatat.py
              </span>
              <Database className="w-4 h-4 text-indigo-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Akuntan & Basis Data Memori</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menyimpan anggaran, list transaksi, menghitung jatah harian (//), sisa saldo (-), dan total pengeluaran.
            </p>
          </div>

          {/* laporan.py */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                laporan.py
              </span>
              <Eye className="w-4 h-4 text-emerald-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Desainer Tampilan & Validasi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mengubah angka jadi format "Rp 100.000", mengecek status AMAN vs BOROS, dan memvalidasi ketikan agar tidak crash.
            </p>
          </div>
        </div>

        {/* Simplified Flowchart Strip */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max text-xs text-slate-700">
            <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold">Mulai</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-medium">Atur Anggaran [1]</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-medium">Tampilkan Menu</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 font-medium">Pengguna Pilih Opsi</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-indigo-100 border border-indigo-300 text-indigo-950 font-medium">Jalankan Fungsi</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-950 font-medium">Perbarui & Tampilkan</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold">Keluar [0]</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Interactive Skenario Trace */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Skenario Nyata Modul: Anggaran Mahasiswa Rp3.000.000</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {step.title}
            </h2>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              title="Langkah sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-600 px-2">
              Langkah {currentStepIdx + 1} dari {SIMULATION_STEPS.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentStepIdx === SIMULATION_STEPS.length - 1}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              title="Langkah berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
          {SIMULATION_STEPS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                currentStepIdx === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              Langkah {s.stepNumber}
            </button>
          ))}
        </div>

        {/* Step Explanation & File In Charge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-indigo-700">File yang Bertugas:</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-indigo-300 text-indigo-900">
                  {step.activeFile}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {step.fileRoleInStep}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Aksi & Masukan Pengguna:
              </h4>
              <p className="text-sm font-medium text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {step.actionDescription}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Fungsi yang Dipanggil:
              </h4>
              <div className="space-y-1 font-mono text-xs text-indigo-700">
                {step.calledFunctions.map((fn, idx) => (
                  <div key={idx} className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    &bull; {fn}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
              <h4 className="text-xs font-bold uppercase text-emerald-900 mb-1">
                Apa yang Terjadi di Balik Layar:
              </h4>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {step.whatHappened}
              </p>
            </div>
          </div>

          {/* Terminal Output Snapshot for this step */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <TermIcon className="w-3.5 h-3.5 text-slate-600" />
              Tampilan Terminal pada Langkah Ini:
            </h4>
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner leading-relaxed">
              <pre className="whitespace-pre-wrap">{step.terminalOutput}</pre>
            </div>
          </div>
        </div>

        {/* State Inspector: Before vs After */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
            <Database className="w-4 h-4 text-indigo-600" />
            <span>State Inspector (Perubahan Data di Memori Sebelum vs Sesudah Aksi)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Keadaan Sebelum Aksi:</span>
                <span className="text-[11px] font-mono text-slate-400">Step {step.stepNumber} (Pre)</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-200/80 pb-1">
                  <span className="text-slate-500">anggaran_bulanan:</span>
                  <span className="font-bold text-slate-800">{formatRupiah(step.stateBefore.anggaran)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1">
                  <span className="text-slate-500">jatah_harian:</span>
                  <span className="font-bold text-slate-800">{formatRupiah(step.stateBefore.jatahHarian)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1">
                  <span className="text-slate-500">hari_aktif:</span>
                  <span className="font-bold text-indigo-600">Hari ke-{step.stateBefore.hariAktif}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1">
                  <span className="text-slate-500">pengeluaran_hari_ini:</span>
                  <span className="font-bold text-slate-800">{formatRupiah(step.stateBefore.pengeluaranHariIni)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1">
                  <span className="text-slate-500">total_pengeluaran:</span>
                  <span className="font-bold text-slate-800">{formatRupiah(step.stateBefore.totalKeluar)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1">
                  <span className="text-slate-500">sisa_saldo:</span>
                  <span className="font-bold text-slate-800">{formatRupiah(step.stateBefore.sisaSaldo)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">status:</span>
                  <span className="font-bold text-slate-700 text-[11px]">{step.stateBefore.status}</span>
                </div>
              </div>
            </div>

            {/* After Box */}
            <div className="bg-indigo-50/50 border border-indigo-200 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold text-indigo-700 uppercase flex items-center justify-between">
                <span>Keadaan Sesudah Aksi:</span>
                <span className="text-[11px] font-mono text-indigo-500">Step {step.stepNumber} (Post)</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-indigo-100 pb-1">
                  <span className="text-slate-500">anggaran_bulanan:</span>
                  <span className="font-bold text-slate-900">{formatRupiah(step.stateAfter.anggaran)}</span>
                </div>
                <div className="flex justify-between border-b border-indigo-100 pb-1">
                  <span className="text-slate-500">jatah_harian:</span>
                  <span className="font-bold text-slate-900">{formatRupiah(step.stateAfter.jatahHarian)}</span>
                </div>
                <div className="flex justify-between border-b border-indigo-100 pb-1">
                  <span className="text-slate-500">hari_aktif:</span>
                  <span className="font-bold text-indigo-700">Hari ke-{step.stateAfter.hariAktif}</span>
                </div>
                <div className="flex justify-between border-b border-indigo-100 pb-1">
                  <span className="text-slate-500">pengeluaran_hari_ini:</span>
                  <span className={`font-bold ${
                    step.stateAfter.pengeluaranHariIni > step.stateAfter.jatahHarian ? 'text-rose-600' : 'text-slate-900'
                  }`}>
                    {formatRupiah(step.stateAfter.pengeluaranHariIni)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-indigo-100 pb-1">
                  <span className="text-slate-500">total_pengeluaran:</span>
                  <span className="font-bold text-slate-900">{formatRupiah(step.stateAfter.totalKeluar)}</span>
                </div>
                <div className="flex justify-between border-b border-indigo-100 pb-1">
                  <span className="text-slate-500">sisa_saldo:</span>
                  <span className="font-bold text-emerald-700">{formatRupiah(step.stateAfter.sisaSaldo)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">status:</span>
                  <span className={`font-bold text-[11px] ${
                    step.stateAfter.status.includes('BOROS')
                      ? 'text-rose-600'
                      : step.stateAfter.status.includes('WASPADA')
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}>
                    {step.stateAfter.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Interactive Terminal Sandbox */}
      <div className="space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <TermIcon className="w-3.5 h-3.5" />
            <span>Ruang Uji Langsung</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Coba Sendiri Program Pencatat Keuangan di Sini
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ketik angka menu 1 sampai 5 (atau 0 untuk keluar) seperti sedang berada di terminal laptopmu sungguhan.
          </p>
        </div>

        <TerminalSimulator />
      </div>
    </div>
  );
};
