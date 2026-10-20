import React, { useEffect } from 'react';
import { X, AlertTriangle, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  variant = 'primary',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDanger = variant === 'danger';
  const Icon = isDanger ? AlertTriangle : Sparkles;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 anim-fade"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-md overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_40px_90px_-30px_rgba(2,6,23,0.7)] anim-pop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Pita gradasi atas */}
        <div
          aria-hidden="true"
          className={cn(
            'h-1.5 w-full bg-gradient-to-r',
            isDanger
              ? 'from-rose-500 via-orange-400 to-rose-500'
              : 'from-brand-500 via-grape-500 to-aqua-400'
          )}
        />

        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white',
                  isDanger
                    ? 'from-rose-500 to-orange-500 shadow-[0_12px_28px_-12px_rgba(225,29,72,0.8)]'
                    : 'from-brand-500 to-grape-500 shadow-[0_12px_28px_-12px_rgba(106,90,232,0.8)]'
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <h3
                id="modal-title"
                className="pt-1.5 text-base font-extrabold tracking-tight text-slate-900 sm:text-lg"
              >
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              aria-label="Tutup dialog"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">{message}</p>

          <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:justify-end">
            <Button variant="soft" size="md" onClick={onClose} className="sm:px-5">
              {cancelText}
            </Button>
            <Button
              size="md"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={cn(
                isDanger &&
                  'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 shadow-[0_10px_24px_-10px_rgba(225,29,72,0.8)]'
              )}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
