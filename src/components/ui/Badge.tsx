import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-white hover:bg-primary/80 dark:bg-primary dark:text-white dark:hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-white hover:bg-secondary/80 dark:bg-secondary dark:text-white dark:hover:bg-secondary/80',
        destructive: 'border-transparent bg-error text-white hover:bg-error/80 dark:bg-error dark:text-white dark:hover:bg-error/80',
        success: 'border-transparent bg-success text-white hover:bg-success/80 dark:bg-success dark:text-white dark:hover:bg-success/80',
        warning: 'border-transparent bg-warning text-white hover:bg-warning/80 dark:bg-warning dark:text-white dark:hover:bg-warning/80',
        info: 'border-transparent bg-info text-white hover:bg-info/80 dark:bg-info dark:text-white dark:hover:bg-info/80',
        outline: 'border-border text-text dark:border-border dark:text-text',
        ghost: 'border-transparent text-text hover:bg-surface dark:text-text dark:hover:bg-surface',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };