import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kartu transparan berkaca (default) atau putih penuh */
  solid?: boolean;
  /** Angkat + bayangan lebih dalam saat hover */
  hover?: boolean;
  /** Garis gradasi tipis di tepi atas */
  accent?: boolean;
  rounded?: 'xl' | '2xl' | '3xl' | '4xl';
}

const roundedClass = {
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  '4xl': 'rounded-4xl',
} as const;

/** Permukaan kartu standar — dipakai agar bayangan & tepi konsisten. */
export const Card: React.FC<CardProps> = ({
  solid = false,
  hover = false,
  accent = false,
  rounded = '3xl',
  className = '',
  children,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={cn(
        solid ? 'surface-solid' : 'surface',
        roundedClass[rounded],
        hover && 'lift',
        accent && 'accent-top',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
