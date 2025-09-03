import { useCallback, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

type ThemeMode = 'light' | 'dark' | 'system';

const useColorMode = () => {
  const [theme, setThemeState] = useLocalStorage<ThemeMode>('theme', 'system');

  const applyTheme = useCallback((mode: ThemeMode) => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark);
    const de = document.documentElement;
    de.classList.toggle('dark', isDark);
    de.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // React to system preference changes when in 'system' mode
  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') applyTheme('system');
    };
    media.addEventListener?.('change', handler);
    return () => media.removeEventListener?.('change', handler);
  }, [theme, applyTheme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    // apply immediately
    applyTheme(mode);
  }, [applyTheme, setThemeState]);

  return [theme, setTheme] as const;
};

export default useColorMode;
