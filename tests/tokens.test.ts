import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  token,
  cssVar,
  resolveTheme,
  applyTheme,
  loadTheme,
  buildAntiFlashScript,
  type Theme,
} from '../src/styles/tokens'

// ── token() ────────────────────────────────────────────────────────────────

describe('token()', () => {
  it('should wrap a color token in a CSS var() reference', () => {
    expect(token('color-bg')).toBe('var(--color-bg)')
  })

  it('should wrap a spacing token in a CSS var() reference', () => {
    expect(token('space-4')).toBe('var(--space-4)')
  })

  it('should wrap a shadow token in a CSS var() reference', () => {
    expect(token('shadow-md')).toBe('var(--shadow-md)')
  })

  it('should wrap a radius token in a CSS var() reference', () => {
    expect(token('radius-full')).toBe('var(--radius-full)')
  })

  it('should wrap a transition token in a CSS var() reference', () => {
    expect(token('transition-base')).toBe('var(--transition-base)')
  })

  it('should wrap a z-index token in a CSS var() reference', () => {
    expect(token('z-modal')).toBe('var(--z-modal)')
  })
})

// ── cssVar() ───────────────────────────────────────────────────────────────

describe('cssVar()', () => {
  it('should return empty string on the server (no window)', () => {
    const original = globalThis.window
    // @ts-expect-error intentional undefined
    delete globalThis.window
    expect(cssVar('color-bg')).toBe('')
    globalThis.window = original
  })

  it('should call getComputedStyle on documentElement by default', () => {
    const mockValue = '#f9fafb'
    const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (_prop: string) => ` ${mockValue} `,
    } as unknown as CSSStyleDeclaration)

    const result = cssVar('color-bg')
    expect(result).toBe(mockValue)
    expect(spy).toHaveBeenCalledWith(document.documentElement)
    spy.mockRestore()
  })

  it('should call getComputedStyle on a provided element', () => {
    const el = document.createElement('div')
    const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => '#111827',
    } as unknown as CSSStyleDeclaration)

    cssVar('color-text-primary', el)
    expect(spy).toHaveBeenCalledWith(el)
    spy.mockRestore()
  })
})

// ── resolveTheme() ─────────────────────────────────────────────────────────

describe('resolveTheme()', () => {
  it('should return light when theme is light', () => {
    expect(resolveTheme('light')).toBe('light')
  })

  it('should return dark when theme is dark', () => {
    expect(resolveTheme('dark')).toBe('dark')
  })

  it('should resolve system to dark when OS prefers dark', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
    } as unknown as MediaQueryList)
    expect(resolveTheme('system')).toBe('dark')
  })

  it('should resolve system to light when OS prefers light', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as unknown as MediaQueryList)
    expect(resolveTheme('system')).toBe('light')
  })
})

// ── applyTheme() ───────────────────────────────────────────────────────────

describe('applyTheme()', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    localStorage.clear()
  })

  it('should set data-theme="light" on documentElement for light theme', () => {
    applyTheme('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('should set data-theme="dark" on documentElement for dark theme', () => {
    applyTheme('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('should persist the theme preference to localStorage', () => {
    applyTheme('dark')
    expect(localStorage.getItem('opendev-theme')).toBe('dark')
  })

  it('should persist system preference as "system" in localStorage', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: false } as unknown as MediaQueryList)
    applyTheme('system')
    expect(localStorage.getItem('opendev-theme')).toBe('system')
  })

  it('should not throw when localStorage is unavailable', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage full')
    })
    expect(() => applyTheme('light')).not.toThrow()
    spy.mockRestore()
  })
})

// ── loadTheme() ────────────────────────────────────────────────────────────

describe('loadTheme()', () => {
  beforeEach(() => localStorage.clear())

  it('should return "system" when nothing is stored', () => {
    expect(loadTheme()).toBe('system')
  })

  it('should return the stored "dark" preference', () => {
    localStorage.setItem('opendev-theme', 'dark')
    expect(loadTheme()).toBe('dark')
  })

  it('should return the stored "light" preference', () => {
    localStorage.setItem('opendev-theme', 'light')
    expect(loadTheme()).toBe('light')
  })

  it('should return the stored "system" preference', () => {
    localStorage.setItem('opendev-theme', 'system')
    expect(loadTheme()).toBe('system')
  })

  it('should return "system" when the stored value is unrecognized', () => {
    localStorage.setItem('opendev-theme', 'sepia')
    expect(loadTheme()).toBe('system')
  })

  it('should return "system" when localStorage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('access denied')
    })
    expect(loadTheme()).toBe('system')
  })
})

// ── buildAntiFlashScript() ─────────────────────────────────────────────────

describe('buildAntiFlashScript()', () => {
  it('should return a non-empty string', () => {
    expect(buildAntiFlashScript().length).toBeGreaterThan(0)
  })

  it('should reference the correct localStorage key', () => {
    expect(buildAntiFlashScript()).toContain('opendev-theme')
  })

  it('should reference setAttribute with data-theme', () => {
    expect(buildAntiFlashScript()).toContain('data-theme')
  })

  it('should produce valid executable JavaScript', () => {
    const script = buildAntiFlashScript()
    // Wrapping in a function to validate syntax without executing side effects
    expect(() => new Function(script)).not.toThrow()
  })
})
