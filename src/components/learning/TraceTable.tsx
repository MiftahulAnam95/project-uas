import React, { useEffect, useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Table2 } from 'lucide-react';
import { TraceTableData } from '../../types';
import { cn } from '../../utils/cn';

interface TraceTableProps {
  data: TraceTableData;
}

export const TraceTable: React.FC<TraceTableProps> = ({ data }) => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (step >= data.steps.length - 1) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => Math.min(s + 1, data.steps.length - 1)), 1400);
    return () => clearTimeout(timer);
  }, [playing, step, data.steps.length]);

  const current = data.steps[step];

  return (
    <section className="my-6 overflow-hidden rounded-3xl border border-sky-200/80 bg-white shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-aqua-50/60 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-aqua-400 text-white shadow-sm">
            <Table2 className="h-4.5 w-4.5" strokeWidth={2.3} />
          </span>
          <div className="leading-tight">
            <h3 className="text-sm font-extrabold tracking-tight text-slate-900">
              Tabel jejak (trace table)
            </h3>
            <p className="text-[11px] text-slate-500">{data.title}</p>
          </div>
        </div>
        <span className="rounded-full border border-sky-200 bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-sky-700 tabular">
          Langkah {step + 1}/{data.steps.length}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <p className="text-xs leading-relaxed text-slate-600">{data.description}</p>

        <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[640px] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
                <th className="border-b border-slate-200 px-2.5 py-2 font-extrabold">#</th>
                <th className="border-b border-slate-200 px-2.5 py-2 font-extrabold">Kode</th>
                <th className="border-b border-slate-200 px-2.5 py-2 font-extrabold">Kondisi / hasil</th>
                <th className="border-b border-slate-200 px-2.5 py-2 font-extrabold">Variabel</th>
                <th className="border-b border-slate-200 px-2.5 py-2 font-extrabold">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {data.steps.map((s, index) => (
                <tr
                  key={index}
                  className={cn(
                    'align-top transition-colors',
                    index === step
                      ? 'bg-sky-50/80'
                      : index < step
                      ? 'bg-emerald-50/30'
                      : 'bg-white'
                  )}
                >
                  <td className="border-b border-slate-100 px-2.5 py-2 font-mono text-[10px] text-slate-400">
                    {index + 1}
                  </td>
                  <td className="border-b border-slate-100 px-2.5 py-2 font-mono text-[11px] text-slate-800">
                    {s.code}
                  </td>
                  <td className="border-b border-slate-100 px-2.5 py-2 text-[11px] text-slate-600">
                    {s.condition && (
                      <span className="font-mono text-[10px] text-slate-500">{s.condition} → </span>
                    )}
                    {s.result && (
                      <span
                        className={cn(
                          'font-bold',
                          s.result === 'True'
                            ? 'text-emerald-700'
                            : s.result === 'False'
                            ? 'text-rose-700'
                            : 'text-sky-700'
                        )}
                      >
                        {s.result}
                      </span>
                    )}
                  </td>
                  <td className="border-b border-slate-100 px-2.5 py-2">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(s.variables).map(([key, value]) => (
                        <span
                          key={key}
                          className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-700"
                        >
                          {key} = {value}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="border-b border-slate-100 px-2.5 py-2 text-[11px] text-slate-600">
                    {s.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 rounded-2xl border border-sky-100 bg-sky-50/60 p-3">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700">
            Langkah {step + 1}: {current.code}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-700">{current.note}</p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep((s) => Math.max(0, s - 1));
            }}
            disabled={step === 0}
            className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Sebelumnya
          </button>
          <button
            type="button"
            onClick={() => {
              if (step >= data.steps.length - 1) setStep(0);
              setPlaying(!playing);
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-aqua-400 px-3.5 py-1.5 text-[11px] font-extrabold text-white shadow-sm transition hover:brightness-110"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? 'Jeda' : 'Putar animasi'}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep((s) => Math.min(data.steps.length - 1, s + 1));
            }}
            disabled={step >= data.steps.length - 1}
            className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Berikutnya <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep(0);
            }}
            className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Ulang
          </button>
        </div>
      </div>
    </section>
  );
};

export default TraceTable;
