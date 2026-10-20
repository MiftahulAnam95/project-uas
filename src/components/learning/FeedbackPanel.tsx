import React from 'react';
import { CheckCircle2, XCircle, RotateCcw, PartyPopper } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FeedbackPanelProps {
  correct: boolean;
  heading?: string;
  children?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  /** Tampilkan gaya "menang besar" saat benar */
  celebrate?: boolean;
}

/** Panel umpan balik setelah pengguna menjawab: benar (hijau) atau belum (merah). */
export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  correct,
  heading,
  children,
  onRetry,
  retryLabel = 'Coba Lagi',
  celebrate = false,
}) => {
  return (
    <div
      role="status"
      className={cn(
        'relative mt-4 overflow-hidden rounded-3xl border p-4 anim-rise sm:p-5',
        correct
          ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50/60'
          : 'border-rose-200 bg-gradient-to-br from-rose-50 via-white to-orange-50/50 anim-shake'
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm',
            correct
              ? 'from-emerald-500 to-teal-400 shadow-[0_10px_22px_-12px_rgba(5,150,105,0.9)]'
              : 'from-rose-500 to-orange-400 shadow-[0_10px_22px_-12px_rgba(225,29,72,0.9)]'
          )}
        >
          {correct ? (
            celebrate ? (
              <PartyPopper className="h-4.5 w-4.5" strokeWidth={2.2} />
            ) : (
              <CheckCircle2 className="h-4.5 w-4.5" strokeWidth={2.4} />
            )
          ) : (
            <XCircle className="h-4.5 w-4.5" strokeWidth={2.4} />
          )}
        </span>

        <div className="min-w-0 flex-1 space-y-1.5">
          <h5
            className={cn(
              'text-sm font-extrabold tracking-tight',
              correct ? 'text-emerald-900' : 'text-rose-900'
            )}
          >
            {heading ||
              (correct
                ? 'Jawabanmu tepat! 🎉'
                : 'Belum tepat — tidak apa-apa, cek alasannya di bawah.')}
          </h5>
          {children && (
            <div
              className={cn(
                'text-xs leading-relaxed sm:text-sm',
                correct ? 'text-emerald-950/85' : 'text-rose-950/85'
              )}
            >
              {children}
            </div>
          )}

          {onRetry && !correct && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-1 inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-rose-200 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold text-rose-700 shadow-soft transition hover:-translate-y-px hover:bg-rose-100 active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {retryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPanel;
