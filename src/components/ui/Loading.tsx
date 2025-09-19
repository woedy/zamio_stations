import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
      },
      color: {
        default: 'text-text dark:text-text',
        primary: 'text-primary dark:text-primary',
        secondary: 'text-secondary dark:text-secondary',
        white: 'text-white',
        muted: 'text-text-secondary dark:text-text-secondary',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size,
  color,
  ...props
}) => {
  return (
    <div
      className={cn(spinnerVariants({ size, color }), className)}
      {...props}
    />
  );
};

// Loading component with text
export interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  text = 'Loading...',
  size = 'md',
  className,
  fullScreen = false,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Spinner size={size} />
      {text && (
        <p className="text-sm text-text-secondary dark:text-text-secondary animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-surface dark:bg-surface rounded-lg p-8 shadow-lg border border-border dark:border-border">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      {content}
    </div>
  );
};

// Skeleton loader for content placeholders
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  rounded = false,
  lines = 1,
  ...props
}) => {
  if (lines > 1) {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'animate-pulse bg-border dark:bg-border',
              rounded ? 'rounded-full' : 'rounded',
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={{
              width: index === lines - 1 ? '75%' : width,
              height: height || '1rem',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-border dark:bg-border',
        rounded ? 'rounded-full' : 'rounded',
        className
      )}
      style={{ width, height }}
      {...props}
    />
  );
};

// Loading overlay for buttons and containers
export interface LoadingOverlayProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  spinnerSize?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  children,
  className,
  spinnerSize = 'md',
  text,
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      {loading && (
        <div className="absolute inset-0 bg-background/80 dark:bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-md z-10">
          <div className="flex flex-col items-center space-y-2">
            <Spinner size={spinnerSize} />
            {text && (
              <p className="text-xs text-text-secondary dark:text-text-secondary">
                {text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Progress bar component
export interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className,
  showLabel = false,
  size = 'md',
  color = 'primary',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    primary: 'bg-primary dark:bg-primary',
    secondary: 'bg-secondary dark:bg-secondary',
    success: 'bg-success dark:bg-success',
    warning: 'bg-warning dark:bg-warning',
    error: 'bg-error dark:bg-error',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-text-secondary dark:text-text-secondary mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn(
        'w-full bg-border dark:bg-border rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-300 ease-in-out rounded-full',
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};