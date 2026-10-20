import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'gradient';
  size?: 'sm' | 'md';
  /** Titik kecil berdenyut di depan teks */
  pulse?: boolean;
  className?: string;
}

const variantStyles = {
  primary:
    'bg-brand-50 text-brand-700 border-brand-200 ring-1 ring-brand-100',
  success:
    'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-100',
  warning: 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-100',
  error: 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-100',
  neutral: 'bg-slate-100/90 text-slate-700 border-slate-200',
  gradient:
    'text-white border-transparent bg-gradient-to-r from-brand-600 via-brand-500 to-grape-500 shadow-[0_8px_18px_-8px_rgba(106,90,232,0.8)]',
} as const;

const sizeStyles = {
  sm: 'text-[11px] px-2 py-0.5 gap-1',
  md: 'text-xs sm:text-[13px] px-2.5 py-1 gap-1.5',
} as const;

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  pulse = false,
  className = '',
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-bold tracking-tight',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {pulse && (
        <span className="relative mr-0.5 flex h-1.5 w-1.5">
          <span className="pulse-ring absolute inline-flex h-full w-full rounded-full" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
