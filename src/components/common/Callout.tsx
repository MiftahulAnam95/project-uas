import React from 'react';
import {
  Info,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'analogy' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const configs = {
  info: {
    wrap: 'border-sky-200/80 bg-gradient-to-br from-sky-50/95 via-white to-white',
    bar: 'from-sky-400 to-cyan-400',
    tile: 'from-sky-500 to-cyan-400 shadow-[0_10px_24px_-10px_rgba(2,132,199,0.7)]',
    title: 'text-sky-900',
    body: 'text-sky-950/85',
    icon: Info,
    defaultTitle: 'Catatan Penting',
  },
  tip: {
    wrap: 'border-brand-200/80 bg-gradient-to-br from-brand-50/95 via-white to-white',
    bar: 'from-brand-500 to-grape-500',
    tile: 'from-brand-500 to-grape-500 shadow-[0_10px_24px_-10px_rgba(106,90,232,0.7)]',
    title: 'text-brand-900',
    body: 'text-brand-950/85',
    icon: Lightbulb,
    defaultTitle: 'Tips Belajar',
  },
  warning: {
    wrap: 'border-amber-200/90 bg-gradient-to-br from-amber-50/95 via-white to-white',
    bar: 'from-amber-400 to-orange-500',
    tile: 'from-amber-500 to-orange-400 shadow-[0_10px_24px_-10px_rgba(217,119,6,0.7)]',
    title: 'text-amber-900',
    body: 'text-amber-950/85',
    icon: AlertTriangle,
    defaultTitle: 'Hati-hati (Kesalahan Umum)',
  },
  analogy: {
    wrap: 'border-violet-200/80 bg-gradient-to-br from-violet-50/95 via-fuchsia-50/50 to-white',
    bar: 'from-violet-500 to-fuchsia-500',
    tile: 'from-violet-500 to-fuchsia-500 shadow-[0_10px_24px_-10px_rgba(147,51,234,0.7)]',
    title: 'text-violet-900',
    body: 'text-violet-950/85',
    icon: Sparkles,
    defaultTitle: 'Perumpamaan Sehari-hari',
  },
  success: {
    wrap: 'border-emerald-200/80 bg-gradient-to-br from-emerald-50/95 via-white to-white',
    bar: 'from-emerald-500 to-teal-400',
    tile: 'from-emerald-500 to-teal-400 shadow-[0_10px_24px_-10px_rgba(5,150,105,0.7)]',
    title: 'text-emerald-900',
    body: 'text-emerald-950/85',
    icon: CheckCircle2,
    defaultTitle: 'Kunci Pemahaman',
  },
} as const;

/** Kotak catatan berwarna: analogi, tips, peringatan, dan kunci pemahaman. */
export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
  className = '',
}) => {
  const c = configs[type];
  const Icon = c.icon;

  return (
    <div
      className={cn(
        'relative my-5 overflow-hidden rounded-2xl border p-4 shadow-soft transition-shadow hover:shadow-lift sm:p-5 anim-rise',
        c.wrap,
        className
      )}
    >
      {/* Strip aksen di sisi kiri */}
      <span
        aria-hidden="true"
        className={cn('absolute inset-y-0 left-0 w-1 bg-gradient-to-b', c.bar)}
      />

      <div className="flex items-start gap-3.5">
        <div
          className={cn(
            'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white',
            c.tile
          )}
        >
          <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <h4 className={cn('text-sm font-extrabold leading-snug sm:text-[15px]', c.title)}>
            {title || c.defaultTitle}
          </h4>
          <div className={cn('text-sm leading-relaxed', c.body)}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
