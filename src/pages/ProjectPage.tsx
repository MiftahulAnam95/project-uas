import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  FolderTree, 
  FileCode, 
  Copy, 
  Check, 
  CheckSquare, 
  Square, 
  Sparkles, 
  Terminal, 
  Layers
} from 'lucide-react';
import { PROJECT_FILES } from '../data/codeFiles';
import { CodeBlock } from '../components/code-block/CodeBlock';
import { ChapterId } from '../types';
import { ActiveTab } from '../components/layout/Navbar';

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

export const ProjectPage: React.FC<ProjectPageProps> = ({
  checklistItems,
  onToggleChecklist,
  onNavigateTab,
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string>('pencatat.py');
  const [copiedAll, setCopiedAll] = useState(false);

  const activeFile = PROJECT_FILES[selectedFileName] || PROJECT_FILES['pencatat.py'];

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // fallback
    }
  };

  const completedChecklistCount = CHECKLIST_CRITERIA.filter((c) =>
    checklistItems.includes(c.id)
  ).length;

  const isAllChecklistDone = completedChecklistCount === CHECKLIST_CRITERIA.length;

  const handleItemToggle = (id: string) => {
    onToggleChecklist(id);
    if (!checklistItems.includes(id) && completedChecklistCount + 1 === CHECKLIST_CRITERIA.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Proyek Akhir & Kode Sumber Lengkap</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Program Pencatat Keuangan Mahasiswa (Utuh)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Berikut adalah struktur berkas utuh yang siap kamu salin ke komputermu, simpan di dalam folder <code>keuangan_mahasiswa/</code>, dan jalankan melalui terminal.
        </p>
      </div>

      {/* Directory Tree & File Selector */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Struktur Berkas Proyek: <span className="font-mono text-indigo-700">keuangan_mahasiswa/</span>
            </h2>
          </div>

          <button
            onClick={handleCopyAll}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition active:scale-95 cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Kode {selectedFileName} Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Seluruh {selectedFileName}</span>
              </>
            )}
          </button>
        </div>

        {/* File Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.values(PROJECT_FILES).map((file) => {
            const isSelected = file.name === selectedFileName;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFileName(file.name)}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-400 shadow-sm ring-1 ring-indigo-400'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-900">
                      {file.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">
                    File ke-{file.order}
                  </span>
                </div>
                <div className="text-xs text-slate-600 line-clamp-1">
                  {file.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected File Description & Role Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-indigo-700">Tanggung Jawab File:</span>
            <span className="text-xs font-bold text-slate-900">{activeFile.role}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {activeFile.description}
          </p>
        </div>

        {/* Full Code Block Viewer */}
        <CodeBlock
          code={activeFile.code}
          filename={activeFile.name}
          title={`Kode Sumber Lengkap ${activeFile.name}`}
          isSimulated={true}
        />

        {/* Functions List in Selected File */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Daftar Fungsi dalam {activeFile.name}:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeFile.functions.map((fn, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1 text-xs"
              >
                <div className="font-mono font-bold text-indigo-700">{fn.name}</div>
                <div className="text-slate-600">{fn.purpose}</div>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  Param: {fn.parameters} &bull; Return: {fn.returns}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Run Locally Tutorial */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Terminal className="w-4 h-4" />
          <span>Panduan Menjalankan Program di Komputer Sendiri</span>
        </div>
        <h3 className="text-xl font-bold text-white">
          Langkah demi Langkah Menjalankan Tiga File Ini di Terminal
        </h3>
        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <li>Buat folder baru bernama <code className="text-emerald-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">keuangan_mahasiswa</code> di komputer kamu.</li>
          <li>Buat 3 file teks kosong: <code className="text-emerald-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">pencatat.py</code>, <code className="text-emerald-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">laporan.py</code>, dan <code className="text-emerald-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">main.py</code> di dalam folder tersebut.</li>
          <li>Salin dan tempelkan seluruh kode dari masing-masing tab di atas ke file yang bersangkutan, lalu simpan (Ctrl+S / Cmd+S).</li>
          <li>Buka Command Prompt atau Terminal di dalam folder tersebut.</li>
          <li>Ketik: <code className="text-amber-300 font-mono font-bold bg-slate-950 px-2 py-1 rounded">python main.py</code> lalu tekan Enter!</li>
        </ol>
      </div>

      {/* Self-Evaluation Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
              <CheckSquare className="w-4 h-4" />
              <span>Evaluasi Mandiri (Self-Assessment)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Checklist Pemahaman Program
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Centang setiap poin di bawah ini jika kamu sudah merasa benar-benar memahaminya.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">Capaian:</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-600">
              {completedChecklistCount} / {CHECKLIST_CRITERIA.length}
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-2.5">
          {CHECKLIST_CRITERIA.map((crit) => {
            const isChecked = checklistItems.includes(crit.id);
            return (
              <button
                key={crit.id}
                onClick={() => handleItemToggle(crit.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'font-semibold' : ''}`}>
                  {crit.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Completion Celebration Card */}
        {isAllChecklistDone && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl animate-in fade-in duration-300 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-300 fill-amber-300" />
              <h3 className="text-lg sm:text-xl font-black">
                Selamat! Kamu Sudah Menyelesaikan Perjalanan Belajar! 🎉
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed max-w-2xl">
              Kamu telah menguasai seluruh konsep: dari variabel hingga arsitektur 3 file program pencatat keuangan mahasiswa. Kamu siap mempresentasikan hasil karyamu di depan kelas atau dosen!
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigateTab('chapter', 'bab-11')}
                className="px-4 py-2 bg-white text-emerald-900 font-bold rounded-xl text-xs hover:bg-emerald-50 shadow-sm transition"
              >
                Baca Tips Presentasi (Bab 11) &rarr;
              </button>
              <button
                onClick={() => onNavigateTab('chapter', 'bab-1')}
                className="px-4 py-2 bg-emerald-700 text-white font-semibold rounded-xl text-xs hover:bg-emerald-800 transition"
              >
                Ulangi Materi dari Awal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
