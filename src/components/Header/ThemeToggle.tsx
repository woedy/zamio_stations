import useColorMode from '../../hooks/useColorMode';

const ThemeToggle = () => {
  const [theme, setTheme] = useColorMode();

  const select = (mode: 'light' | 'dark' | 'system') => () => setTheme(mode);

  return (
    <li className="relative">
      <div className="inline-flex items-center rounded-full bg-stroke dark:bg-meta-4 p-0.5">
        <button
          aria-label="Light mode"
          onClick={select('light')}
          className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 transition-colors duration-150 ${
            theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-body dark:text-bodydark'
          }`}
        >
          <img src={new URL('../../images/icon/icon-sun.svg', import.meta.url).toString()} alt="" className="h-3.5 w-3.5" />
          Light
        </button>
        <button
          aria-label="System theme"
          onClick={select('system')}
          className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 transition-colors duration-150 ${
            theme === 'system' ? 'bg-white text-black shadow-sm' : 'text-body dark:text-bodydark'
          }`}
        >
          {/* simple monitor icon */}
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          System
        </button>
        <button
          aria-label="Dark mode"
          onClick={select('dark')}
          className={`px-2.5 py-1 rounded-full text-xs flex items-center gap-1 transition-colors duration-150 ${
            theme === 'dark' ? 'bg-white text-black shadow-sm' : 'text-body dark:text-bodydark'
          }`}
        >
          <img src={new URL('../../images/icon/icon-moon.svg', import.meta.url).toString()} alt="" className="h-3.5 w-3.5" />
          Dark
        </button>
      </div>
    </li>
  );
};

export default ThemeToggle;

