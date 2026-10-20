import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Tombol mengambang "kembali ke atas" yang muncul setelah halaman digulir. */
export const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollTop = window.scrollY;
        const height =
          document.documentElement.scrollHeight - window.innerHeight || 1;
        setProgress(Math.min(100, (scrollTop / height) * 100));
        setShow(scrollTop > 520);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const circumference = 2 * Math.PI * 20;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke atas halaman"
      title="Kembali ke atas"
      className={cn(
        'group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_16px_36px_-12px_rgba(74,60,170,0.9)] transition-all duration-300 cursor-pointer',
        'bg-gradient-to-br from-brand-600 via-brand-500 to-grape-500',
        show
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-6 scale-90 opacity-0'
      )}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          style={{ transition: 'stroke-dashoffset 120ms linear' }}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
};

export default BackToTop;
