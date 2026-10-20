import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  align?: 'left' | 'center';
  className?: string;
  /** Konten tambahan di sisi kanan (mis. tombol) */
  aside?: React.ReactNode;
}

/** Judul seksi yang konsisten: eyebrow kecil + judul besar + deskripsi. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  icon: Icon,
  align = 'left',
  className = '',
  aside,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center text-center',
        className
      )}
    >
      <div className={cn('space-y-2', align === 'center' && 'mx-auto max-w-2xl')}>
        {eyebrow && (
          <div
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-700',
              align === 'center' && 'mx-auto'
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5 text-brand-500" />}
            <span>{eyebrow}</span>
          </div>
        )}
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl lg:text-[1.75rem]">
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
};

export default SectionHeading;
