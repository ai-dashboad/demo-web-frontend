/**
 * Hook for reading and toggling the active colour theme.
 *
 * Theme preference is stored in localStorage and applied by adding/removing
 * the `dark` class on <html>. The class must be present before first paint
 * to avoid flash-of-wrong-theme; the inline script in index.html handles
 * that — this hook syncs the React state with that class.
 */
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'opendev-theme';

function resolveEffectiveTheme(preference: Theme): 'light' | 'dark' {
  if (preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return preference;
}

function applyThemeClass(effective: 'light' | 'dark'): void {
  const root = document.documentElement;
  root.classList.toggle('dark', effective === 'dark');
  root.classList.toggle('light', effective === 'light');
}

export function useTheme() {
  const [preference, setPreference] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored ?? 'system';
  });

  const effectiveTheme = resolveEffectiveTheme(preference);

  // Apply the class on mount and whenever the preference changes.
  useEffect(() => {
    applyThemeClass(effectiveTheme);
  }, [effectiveTheme]);

  // Keep in sync when OS theme changes while preference is 'system'.
  useEffect(() => {
    if (preference !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyThemeClass(resolveEffectiveTheme('system'));
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [preference]);

  const setTheme = useCallback((next: Theme) => {
    setPreference(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return { preference, effectiveTheme, setTheme } as const;
}
