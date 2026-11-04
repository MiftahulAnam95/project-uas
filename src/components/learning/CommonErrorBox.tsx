import React from 'react';
import { AlertTriangle, Wrench, Bug, CheckCircle2 } from 'lucide-react';
import { CommonError } from '../../types';
import { MiniCode } from '../code-block/MiniCode';

interface CommonErrorBoxProps {
  error: CommonError;
  title?: string;
}

export const CommonErrorBox: React.FC<CommonErrorBoxProps> = ({
  error,
  title = 'Awas, ini sering salah',
}) => {
  return (
    <section className="my-6 overflow-hidden rounded-3xl border border-rose-200/80 bg-gradient-to-br from-rose-50/90 via-white to-white shadow-soft">
      <div className="flex items-center gap-2.5 border-b border-rose-100 bg-rose-50/70 px-4 py-3 sm:px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-sm">
          <AlertTriangle className="h-4.5 w-4.5" strokeWidth={2.3} />
        </span>
        <div className="leading-tight">
          <h3 className="text-sm font-extrabold tracking-tight text-slate-900">{title}</h3>
          <p className="text-[11px] text-slate-500">Kenali pesan errornya, lalu perbaiki.</p>
        </div>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="rounded-2xl border border-rose-200 bg-rose-950 p-3">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-300">
            <Bug className="h-3.5 w-3.5" /> Pesan error
          </div>
          <pre className="mt-1 overflow-x-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-rose-200 sm:text-xs">
            {error.message}
          </pre>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Kenapa terjadi?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">{error.cause}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3">
            <div className="flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 text-emerald-600" />
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                Cara memperbaiki
              </p>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">{error.fix}</p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div>
            <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
              Kode yang salah
            </p>
            <MiniCode code={error.badCode} label="sebelum" tone="danger" />
          </div>
          <div>
            <p className="mb-1.5 flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> Setelah diperbaiki
            </p>
            <MiniCode code={error.goodCode} label="sesudah" tone="success" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonErrorBox;
