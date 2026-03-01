import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolved: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', setTheme: () => {}, resolved: 'dark' });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const s = localStorage.getItem('findamproject-settings');
      if (s) return JSON.parse(s).theme || 'dark';
    } catch {}
    return 'dark';
  });

  const [systemDark, setSystemDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', resolved === 'light');
  }, [resolved]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      const s = JSON.parse(localStorage.getItem('findamproject-settings') || '{}');
      s.theme = t;
      localStorage.setItem('findamproject-settings', JSON.stringify(s));
    } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
