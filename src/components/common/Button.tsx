import React from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'dark' | 'soft' | 'ghost' | 'white';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Efek kilau sapuan saat hover */
  shine?: boolean;
  full?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  dark: 'btn-dark',
  soft: 'btn-soft',
  ghost: 'btn-ghost',
  white:
    'bg-white text-brand-800 border border-white/70 shadow-[0_10px_28px_-12px_rgba(2,6,23,0.7)] hover:bg-brand-50',
};

const sizeClass: Record<Size, string> = {
  sm: 'text-xs px-3.5 py-2 rounded-xl gap-1.5',
  md: 'text-sm px-5 py-2.5 rounded-2xl gap-2',
  lg: 'text-sm sm:text-base px-7 py-3.5 rounded-2xl gap-2.5',
};

/** Tombol dengan gaya konsisten di seluruh aplikasi. */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  shine = true,
  full = false,
  className = '',
  children,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      {...rest}
      className={cn(
        'btn',
        variantClass[variant],
        sizeClass[size],
        shine && 'shine',
        full && 'w-full',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
