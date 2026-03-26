import { useState, useEffect, useCallback } from 'react'
import {
  type Theme,
  applyTheme,
  loadTheme,
  resolveTheme,
} from '../styles/tokens'

export interface UseThemeResult {
  /** The stored preference ('light' | 'dark' | 'system'). */
  theme: Theme
  /** The resolved effective value after applying system preference. */
  resolvedTheme: 'light' | 'dark'
  /** Explicitly set a preference and persist it. */
  setTheme: (next: Theme) => void
  /** Toggle between light and dark (ignores 'system'). */
  toggleTheme: () => void
  /** True when the hook has hydrated — avoids SSR mismatch. */
  isMounted: boolean
}

/**
 * Manages theme preference with localStorage persistence and system-preference
 * syncing via a matchMedia listener.
 *
 * Sets data-theme on <html> as a side-effect, which tokens.css reads to
 * switch between the light and dark token palettes.
 */
export function useTheme(): UseThemeResult {
  const [theme, setThemeState] = useState<Theme>('system')
  const [isMounted, setIsMounted] = useState(false)

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    setThemeState(loadTheme())
    setIsMounted(true)
  }, [])

  // Re-apply whenever the stored preference changes
  useEffect(() => {
    if (!isMounted) return
    applyTheme(theme)
  }, [theme, isMounted])

  // Sync when the OS preference changes and the user has chosen 'system'
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') applyTheme('system')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      // When on 'system', resolve it first so toggle is predictable
      const current = resolveTheme(prev)
      return current === 'light' ? 'dark' : 'light'
    })
  }, [])

  return {
    theme,
    resolvedTheme: resolveTheme(theme),
    setTheme,
    toggleTheme,
    isMounted,
  }
}
