import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeConfig {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  typography: {
    fontFamily: string;
    sizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
  };
}

interface ThemeContextType {
  theme: ThemeConfig;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const THEME_STORAGE_KEY = 'zamio-theme-mode';
const THEME_SYNC_EVENT = 'zamio-theme-sync';

// Default theme configurations
const lightTheme: ThemeConfig = {
  mode: 'light',
  colors: {
    primary: '#14002C',
    secondary: '#80CAEE',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1C2434',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    error: '#D34053',
    warning: '#FFA70B',
    success: '#219653',
    info: '#259AE6',
  },
  typography: {
    fontFamily: 'Satoshi, sans-serif',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
};

const darkTheme: ThemeConfig = {
  mode: 'dark',
  colors: {
    primary: '#AA00BA',
    secondary: '#80CAEE',
    background: '#0b1220',
    surface: '#1A222C',
    text: '#FFFFFF',
    textSecondary: '#AEB7C0',
    border: '#2E3A47',
    error: '#FF6766',
    warning: '#FFBA00',
    success: '#10B981',
    info: '#259AE6',
  },
  typography: {
    fontFamily: 'Satoshi, sans-serif',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'light',
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    
    return defaultMode;
  });

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem(THEME_STORAGE_KEY, newMode);
    
    // Apply theme to document
    applyThemeToDocument(newMode);
    
    // Sync across applications
    window.dispatchEvent(new CustomEvent(THEME_SYNC_EVENT, { 
      detail: { mode: newMode } 
    }));
  };

  const toggleTheme = () => {
    setTheme(mode === 'light' ? 'dark' : 'light');
  };

  const applyThemeToDocument = (themeMode: ThemeMode) => {
    const root = document.documentElement;
    
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply CSS custom properties for dynamic theming
    const themeConfig = themeMode === 'dark' ? darkTheme : lightTheme;
    
    root.style.setProperty('--color-primary', themeConfig.colors.primary);
    root.style.setProperty('--color-secondary', themeConfig.colors.secondary);
    root.style.setProperty('--color-background', themeConfig.colors.background);
    root.style.setProperty('--color-surface', themeConfig.colors.surface);
    root.style.setProperty('--color-text', themeConfig.colors.text);
    root.style.setProperty('--color-text-secondary', themeConfig.colors.textSecondary);
    root.style.setProperty('--color-border', themeConfig.colors.border);
    root.style.setProperty('--color-error', themeConfig.colors.error);
    root.style.setProperty('--color-warning', themeConfig.colors.warning);
    root.style.setProperty('--color-success', themeConfig.colors.success);
    root.style.setProperty('--color-info', themeConfig.colors.info);
  };

  // Listen for theme changes from other applications
  useEffect(() => {
    const handleThemeSync = (event: CustomEvent) => {
      const { mode: syncedMode } = event.detail;
      if (syncedMode !== mode) {
        setMode(syncedMode);
        applyThemeToDocument(syncedMode);
      }
    };

    window.addEventListener(THEME_SYNC_EVENT, handleThemeSync as EventListener);
    
    return () => {
      window.removeEventListener(THEME_SYNC_EVENT, handleThemeSync as EventListener);
    };
  }, [mode]);

  // Apply theme on mount and mode change
  useEffect(() => {
    applyThemeToDocument(mode);
  }, [mode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        // Only auto-switch if user hasn't manually set a preference
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (!storedTheme) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, []);

  const value: ThemeContextType = {
    theme,
    mode,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;