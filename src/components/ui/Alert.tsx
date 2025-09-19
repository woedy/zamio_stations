import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-text border-border dark:bg-background dark:text-text dark:border-border',
        destructive: 'border-error/50 text-error bg-error/10 dark:border-error dark:text-error dark:bg-error/10 [&>svg]:text-error',
        success: 'border-success/50 text-success bg-success/10 dark:border-success dark:text-success dark:bg-success/10 [&>svg]:text-success',
        warning: 'border-warning/50 text-warning bg-warning/10 dark:border-warning dark:text-warning dark:bg-warning/10 [&>svg]:text-warning',
        info: 'border-info/50 text-info bg-info/10 dark:border-info dark:text-info dark:bg-info/10 [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));

Alert.displayName = 'Alert';

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));

AlertDescription.displayName = 'AlertDescription';

// Icon components for different alert types
const AlertIcon: React.FC<{ variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info' }> = ({ variant = 'default' }) => {
  const iconClass = 'h-4 w-4';
  
  switch (variant) {
    case 'success':
      return <CheckCircleIcon className={iconClass} />;
    case 'warning':
      return <ExclamationTriangleIcon className={iconClass} />;
    case 'destructive':
      return <XCircleIcon className={iconClass} />;
    case 'info':
      return <InformationCircleIcon className={iconClass} />;
    default:
      return <InformationCircleIcon className={iconClass} />;
  }
};

export { Alert, AlertTitle, AlertDescription, AlertIcon };