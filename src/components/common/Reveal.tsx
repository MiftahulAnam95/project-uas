import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

interface RevealProps {
  children: React.ReactNode;
  /** Tunda (ms) — dipakai untuk efek berjenjang */
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  /** Sekali muncul tetap terlihat (default true) */
  once?: boolean;
}

/**
 * Pembungkus animasi "muncul saat di-scroll".
 * Memakai IntersectionObserver sehingga hemat performa,
 * dan otomatis non-aktif bila pengguna meminta reduced-motion.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = '',
  as = 'div',
  once = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Elemen yang sudah terlewat (di atas viewport) ikut ditampilkan
          const passed = entry.boundingClientRect.top < 0;
          if (entry.isIntersecting || passed) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
