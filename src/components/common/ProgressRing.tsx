import React, { useId } from 'react';
import { cn } from '../../utils/cn';

interface ProgressRingProps {
  /** 0 - 100 */
  value: number;
  size?: number;
  stroke?: number;
  label?: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
}

/** Cincin progres SVG dengan gradasi + animasi halus. */
export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 44,
  stroke = 5,
  label,
  className = '',
  from = '#6a5ae8',
  to = '#22d3ee',
}) => {
  const gradientId = `ring-${useId().replace(/:/g, '')}`;
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const done = clamped >= 100;

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={done ? '#10b981' : from} />
            <stop offset="100%" stopColor={done ? '#22d3ee' : to} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-slate-200"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      {label !== undefined && (
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold tabular text-slate-800">
          {label}
        </span>
      )}
    </div>
  );
};

export default ProgressRing;
