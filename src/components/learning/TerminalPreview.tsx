import React, { useMemo, useState } from 'react';
import { Terminal, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { cn } from '../../utils/cn';

const COLOR_OPTIONS = [
  { id: 'hijau', label: 'Hijau', hex: '#22c55e', ansi: '92' },
  { id: 'kuning', label: 'Kuning', hex: '#eab308', ansi: '93' },
  { id: 'merah', label: 'Merah', hex: '#ef4444', ansi: '91' },
  { id: 'cyan', label: 'Cyan', hex: '#22d3ee', ansi: '96' },
  { id: 'putih', label: 'Putih', hex: '#f8fafc', ansi: '97' },
] as const;

const WIDTH = 64;

export const TerminalPreview: React.FC = () => {
  const [title, setTitle] = useState('PENCATAT KEUANGAN MAHASISWA');
  const [color, setColor] = useState<(typeof COLOR_OPTIONS)[number]['id']>('hijau');
  const [barLength, setBarLength] = useState(20);
  const [value, setValue] = useState(85000);
  const [max, setMax] = useState(100000);
  const [mode, setMode] = useState<'after' | 'before'>('after');

  const activeColor = COLOR_OPTIONS.find((c) => c.id === color) ?? COLOR_OPTIONS[0];
  const ratio = max > 0 ? value / max : 0;
  const filled = Math.max(0, Math.min(barLength, Math.round(ratio * barLength)));
  const percent = Math.round(ratio * 100);
  const status = ratio > 1 ? 'BOROS!' : ratio >= 0.8 ? 'HATI-HATI' : 'AMAN';
  const statusColor = ratio > 1 ? '#ef4444' : ratio >= 0.8 ? '#eab308' : '#22c55e';

  const titleLine = useMemo(() => {
    const inner = WIDTH - 2;
    const text = title.slice(0, inner);
    return '║' + text.padStart(Math.floor((inner + text.length) / 2)).padEnd(inner) + '║';
  }, [title]);

  const reset = () => {
    setTitle('PENCATAT KEUANGAN MAHASISWA');
    setColor('hijau');
    setBarLength(20);
    setValue(85000);
    setMax(100000);
    setMode('after');
  };

  return (
    <section className="my-6 overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-950 shadow-[0_28px_60px_-30px_rgba(2,6,23,0.85)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950">
            <Terminal className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <h3 className="text-sm font-extrabold text-white">Pratinjau terminal interaktif</h3>
            <p className="text-[10px] text-slate-400">
              Simulasi HTML/CSS tampilan.py. Python tidak berjalan di browser.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-300 transition hover:bg-slate-700"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
        <div className="space-y-3 border-b border-slate-800 bg-slate-900/40 p-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Pengaturan
          </div>

          <label className="block">
            <span className="mb-1 block text-[10px] font-bold text-slate-400">Judul</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-400"
              maxLength={WIDTH - 2}
            />
          </label>

          <div>
            <span className="mb-1 block text-[10px] font-bold text-slate-400">Warna judul</span>
            <div className="flex flex-wrap gap-1.5">
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setColor(option.id)}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-bold transition',
                    color === option.id
                      ? 'border-white/60 bg-white/10 text-white'
                      : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:bg-slate-800'
                  )}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: option.hex }} />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1 flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span>Lebar bar</span>
              <span className="font-mono text-emerald-300">{barLength}</span>
            </span>
            <input
              type="range"
              min={10}
              max={40}
              value={barLength}
              onChange={(e) => setBarLength(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="mb-1 block text-[10px] font-bold text-slate-400">Nilai</span>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-400"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-bold text-slate-400">Maksimal</span>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-400"
              />
            </label>
          </div>

          <div>
            <span className="mb-1 block text-[10px] font-bold text-slate-400">Tampilan</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setMode('before')}
                className={cn(
                  'flex-1 cursor-pointer rounded-lg border px-2 py-1 text-[10px] font-bold transition',
                  mode === 'before'
                    ? 'border-slate-500 bg-slate-700 text-white'
                    : 'border-slate-700 bg-slate-800/60 text-slate-400'
                )}
              >
                Sebelum
              </button>
              <button
                type="button"
                onClick={() => setMode('after')}
                className={cn(
                  'flex-1 cursor-pointer rounded-lg border px-2 py-1 text-[10px] font-bold transition',
                  mode === 'after'
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200'
                    : 'border-slate-700 bg-slate-800/60 text-slate-400'
                )}
              >
                Sesudah
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <div className="min-w-[560px] rounded-xl border border-slate-800 bg-[#05070f] p-3 font-mono text-[11px] leading-relaxed text-slate-300 sm:text-xs">
            {mode === 'before' ? (
              <div className="space-y-1">
                <p className="text-slate-500">RINGKASAN</p>
                <p>Saldo: Rp{Math.max(0, max - value).toLocaleString('id-ID')}</p>
                <p>Jatah: Rp{max.toLocaleString('id-ID')}</p>
                <p>Pengeluaran: Rp{value.toLocaleString('id-ID')}</p>
                <p>Status: {status}</p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="text-slate-500">╔{'═'.repeat(WIDTH - 2)}╗</div>
                <div style={{ color: activeColor.hex }}>
                  {titleLine}
                </div>
                <div className="text-slate-500">╚{'═'.repeat(WIDTH - 2)}╝</div>
                <div className="mt-2 text-slate-500">
                  ┌─ RINGKASAN {'─'.repeat(Math.max(0, WIDTH - 14))}┐
                </div>
                <div className="text-slate-500">
                  │ Saldo sekarang{' '}
                  <span className="text-slate-200">
                    Rp{Math.max(0, max - value).toLocaleString('id-ID')}
                  </span>
                  {' '.repeat(20)}
                  │
                </div>
                <div className="text-slate-500">
                  │{' '}
                  <span style={{ color: activeColor.hex }}>
                    {'█'.repeat(filled)}
                    <span className="text-slate-600">{'░'.repeat(Math.max(0, barLength - filled))}</span>
                  </span>{' '}
                  <span style={{ color: statusColor }}>{percent}%</span> dari anggaran
                </div>
                <div className="text-slate-500">
                  │ Pengeluaran hari ini{' '}
                  <span style={{ color: statusColor }}>Rp{value.toLocaleString('id-ID')}</span>
                </div>
                <div className="text-slate-500">
                  │{' '}
                  <span style={{ color: statusColor }}>
                    {'█'.repeat(filled)}
                    <span className="text-slate-600">{'░'.repeat(Math.max(0, barLength - filled))}</span>
                  </span>{' '}
                  <span style={{ color: statusColor }}>{percent}%</span> dari jatah
                </div>
                <div className="text-slate-500">
                  └{'─'.repeat(WIDTH - 2)}┘
                </div>
                <div className="mt-1">
                  <span style={{ color: statusColor }}>┌─ {status} </span>
                  <span className="text-slate-500">{'─'.repeat(Math.max(0, WIDTH - status.length - 5))}┐</span>
                </div>
                <div className="text-slate-500">
                  │ Status hari ini{' '}
                  <span style={{ color: statusColor }}>{status}</span>
                </div>
                <div className="text-slate-500">└{'─'.repeat(WIDTH - 2)}┘</div>
              </div>
            )}
          </div>
          <p className="mt-2 text-[10px] text-slate-500">
            Kode warna ANSI yang dipakai: <span className="font-mono text-emerald-300">\033[{activeColor.ansi}m</span>{' '}
            … <span className="font-mono text-emerald-300">\033[0m</span>. Di terminal sungguhan, warna
            ini muncul; di browser, simulasi CSS dipakai.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TerminalPreview;
