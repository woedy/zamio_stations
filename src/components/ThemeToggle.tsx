import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const { mode, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        inline-flex items-center justify-center
        rounded-lg border border-stroke bg-white
        text-body transition-all duration-200
        hover:bg-gray hover:text-primary
        dark:border-strokedark dark:bg-boxdark
        dark:text-bodydark dark:hover:bg-graydark
        dark:hover:text-white
        focus:outline-none focus:ring-2 focus:ring-primary/20
        ${className}
      `}
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      {mode === 'light' ? (
        <MoonIcon className={iconSizeClasses[size]} />
      ) : (
        <SunIcon className={iconSizeClasses[size]} />
      )}
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {mode === 'light' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;