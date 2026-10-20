import React from 'react';
import { Info, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'analogy' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
  className = '',
}) => {
  const configs = {
    info: {
      border: 'border-blue-200 bg-blue-50/70 text-blue-900',
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
      defaultTitle: 'Catatan Penting',
    },
    tip: {
      border: 'border-indigo-200 bg-indigo-50/70 text-indigo-950',
      icon: <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0" />,
      defaultTitle: 'Tips Belajar',
    },
    warning: {
      border: 'border-amber-200 bg-amber-50/80 text-amber-950',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
      defaultTitle: 'Hati-hati (Kesalahan Umum)',
    },
    analogy: {
      border: 'border-purple-200 bg-purple-50/70 text-purple-950',
      icon: <Lightbulb className="w-5 h-5 text-purple-600 shrink-0" />,
      defaultTitle: 'Perumpamaan Sehari-hari',
    },
    success: {
      border: 'border-emerald-200 bg-emerald-50/70 text-emerald-950',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
      defaultTitle: 'Kunci Pemahaman',
    },
  }[type];

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 my-4 transition-all ${configs.border} ${className}`}
    >
      <div className="flex items-start gap-3">
        {configs.icon}
        <div className="flex-1 space-y-1">
          <h4 className="font-semibold text-sm sm:text-base leading-snug">
            {title || configs.defaultTitle}
          </h4>
          <div className="text-sm leading-relaxed opacity-95">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
