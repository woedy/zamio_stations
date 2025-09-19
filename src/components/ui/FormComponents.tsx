import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from './Icon';

// Enhanced Input Component
const inputVariants = cva(
  'flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border dark:bg-background dark:text-text dark:placeholder:text-text-secondary',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-error focus-visible:ring-error',
        success: 'border-success focus-visible:ring-success',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: IconName;
  rightIcon?: IconName;
  error?: string;
  success?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    size,
    type = 'text',
    leftIcon,
    rightIcon,
    error,
    success,
    helperText,
    label,
    required,
    id,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const actualType = type === 'password' && showPassword ? 'text' : type;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;
    const actualVariant = hasError ? 'error' : hasSuccess ? 'success' : variant;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text dark:text-text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Icon name={leftIcon} size="sm" color="muted" />
            </div>
          )}
          
          <input
            id={inputId}
            type={actualType}
            className={cn(
              inputVariants({ variant: actualVariant, size }),
              leftIcon && 'pl-10',
              (rightIcon || type === 'password') && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {type === 'password' && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text dark:text-text-secondary dark:hover:text-text"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? 'hide' : 'view'} size="sm" />
            </button>
          )}
          
          {rightIcon && type !== 'password' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name={rightIcon} size="sm" color="muted" />
            </div>
          )}
        </div>
        
        {(error || success || helperText) && (
          <div className="space-y-1">
            {error && (
              <p className="text-sm text-error dark:text-error flex items-center gap-1">
                <Icon name="error" size="xs" color="error" />
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-sm text-success dark:text-success flex items-center gap-1">
                <Icon name="success" size="xs" color="success" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-sm text-text-secondary dark:text-text-secondary">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Enhanced Textarea Component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  success?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    error,
    success,
    helperText,
    label,
    required,
    id,
    ...props
  }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-text dark:text-text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border dark:bg-background dark:text-text dark:placeholder:text-text-secondary',
            hasError && 'border-error focus-visible:ring-error',
            hasSuccess && 'border-success focus-visible:ring-success',
            className
          )}
          ref={ref}
          {...props}
        />
        
        {(error || success || helperText) && (
          <div className="space-y-1">
            {error && (
              <p className="text-sm text-error dark:text-error flex items-center gap-1">
                <Icon name="error" size="xs" color="error" />
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-sm text-success dark:text-success flex items-center gap-1">
                <Icon name="success" size="xs" color="success" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-sm text-text-secondary dark:text-text-secondary">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Enhanced Select Component
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  success?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    options,
    placeholder,
    error,
    success,
    helperText,
    label,
    required,
    size = 'default',
    id,
    ...props
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    const sizeClasses = {
      sm: 'h-8 px-2 text-xs',
      default: 'h-10 px-3',
      lg: 'h-12 px-4 text-base',
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-text dark:text-text leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              'flex w-full rounded-md border border-border bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border dark:bg-background dark:text-text appearance-none pr-10',
              sizeClasses[size],
              hasError && 'border-error focus-visible:ring-error',
              hasSuccess && 'border-success focus-visible:ring-success',
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Icon name="chevron-down" size="sm" color="muted" />
          </div>
        </div>
        
        {(error || success || helperText) && (
          <div className="space-y-1">
            {error && (
              <p className="text-sm text-error dark:text-error flex items-center gap-1">
                <Icon name="error" size="xs" color="error" />
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-sm text-success dark:text-success flex items-center gap-1">
                <Icon name="success" size="xs" color="success" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-sm text-text-secondary dark:text-text-secondary">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Checkbox Component
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'default' | 'lg';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    label,
    description,
    error,
    size = 'default',
    id,
    ...props
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      sm: 'w-3 h-3',
      default: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    return (
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <input
            id={checkboxId}
            type="checkbox"
            className={cn(
              'rounded border border-border bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border dark:bg-background',
              sizeClasses[size],
              error && 'border-error',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {(label || description) && (
            <div className="flex-1 space-y-1">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className="text-sm font-medium text-text dark:text-text leading-none cursor-pointer"
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-sm text-text-secondary dark:text-text-secondary">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-error dark:text-error flex items-center gap-1">
            <Icon name="error" size="xs" color="error" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Radio Group Component
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  label,
  error,
  helperText,
  required,
  className,
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <div className="text-sm font-medium text-text dark:text-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </div>
      )}
      
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-2">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              defaultChecked={defaultValue === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={option.disabled}
              className={cn(
                'w-4 h-4 text-primary border border-border bg-background focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-border dark:bg-background',
                error && 'border-error'
              )}
            />
            
            <div className="flex-1 space-y-1">
              <label
                htmlFor={`${name}-${option.value}`}
                className="text-sm font-medium text-text dark:text-text leading-none cursor-pointer"
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-sm text-text-secondary dark:text-text-secondary">
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {(error || helperText) && (
        <div className="space-y-1">
          {error && (
            <p className="text-sm text-error dark:text-error flex items-center gap-1">
              <Icon name="error" size="xs" color="error" />
              {error}
            </p>
          )}
          {helperText && !error && (
            <p className="text-sm text-text-secondary dark:text-text-secondary">
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};