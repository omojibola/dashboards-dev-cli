import * as React from 'react';
import { cn } from '../lib/utils';

type Variant = 'default' | 'secondary' | 'ghost';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(({ className, variant = 'default', ...props }, ref) => {
  const base =
    'inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition';
  const styles: Record<Variant, string> = {
    default: 'bg-black text-white hover:opacity-90',
    secondary: 'bg-gray-100 hover:bg-gray-200',
    ghost: 'hover:bg-gray-100',
  };
  return (
    <button
      ref={ref}
      className={cn(base, styles[variant], className)}
      {...props}
    />
  );
});
Button.displayName = 'Button';
