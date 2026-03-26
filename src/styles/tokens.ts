/**
 * Type-safe references to every CSS design token defined in tokens.css.
 *
 * Usage:
 *   import { tokens, token, cssVar } from '@/styles/tokens'
 *
 *   // CSS variable reference for inline styles:
 *   style={{ color: token('color-text-primary') }}
 *
 *   // Read live computed value (client-side only):
 *   const bg = cssVar('color-bg')  // e.g. '#f9fafb'
 */

// ── Token name unions ──────────────────────────────────────────────────────

export type ColorToken =
  | 'color-bg'
  | 'color-bg-subtle'
  | 'color-surface'
  | 'color-surface-raised'
  | 'color-surface-overlay'
  | 'color-text-primary'
  | 'color-text-secondary'
  | 'color-text-tertiary'
  | 'color-text-inverse'
  | 'color-text-disabled'
  | 'color-text-link'
  | 'color-text-link-hover'
  | 'color-border'
  | 'color-border-subtle'
  | 'color-border-strong'
  | 'color-border-focus'
  | 'color-accent'
  | 'color-accent-hover'
  | 'color-accent-active'
  | 'color-accent-subtle'
  | 'color-accent-text'
  | 'color-on-accent'
  | 'color-success'
  | 'color-success-hover'
  | 'color-success-subtle'
  | 'color-success-text'
  | 'color-on-success'
  | 'color-warning'
  | 'color-warning-hover'
  | 'color-warning-subtle'
  | 'color-warning-text'
  | 'color-on-warning'
  | 'color-error'
  | 'color-error-hover'
  | 'color-error-subtle'
  | 'color-error-text'
  | 'color-on-error'
  | 'color-info'
  | 'color-info-hover'
  | 'color-info-subtle'
  | 'color-info-text'
  | 'color-on-info'

export type SpaceToken =
  | 'space-0' | 'space-px' | 'space-0-5'
  | 'space-1' | 'space-1-5'
  | 'space-2' | 'space-2-5'
  | 'space-3' | 'space-4' | 'space-5' | 'space-6'
  | 'space-8' | 'space-10' | 'space-12'
  | 'space-16' | 'space-20' | 'space-24' | 'space-32'

export type TextSizeToken =
  | 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl'
  | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl'

export type FontWeightToken =
  | 'font-weight-regular' | 'font-weight-medium'
  | 'font-weight-semibold' | 'font-weight-bold'

export type RadiusToken =
  | 'radius-none' | 'radius-sm' | 'radius-md' | 'radius-lg'
  | 'radius-xl' | 'radius-2xl' | 'radius-3xl' | 'radius-full'

export type ShadowToken =
  | 'shadow-xs' | 'shadow-sm' | 'shadow-md' | 'shadow-lg'
  | 'shadow-xl' | 'shadow-2xl' | 'shadow-inner' | 'shadow-focus'

export type TransitionToken =
  | 'transition-fast' | 'transition-base' | 'transition-slow' | 'transition-spring'

export type ZIndexToken =
  | 'z-hide' | 'z-base' | 'z-raised' | 'z-dropdown'
  | 'z-sticky' | 'z-overlay' | 'z-modal' | 'z-popover'
  | 'z-toast' | 'z-tooltip'

export type DesignToken =
  | ColorToken
  | SpaceToken
  | TextSizeToken
  | FontWeightToken
  | RadiusToken
  | ShadowToken
  | TransitionToken
  | ZIndexToken

// ── Core utilities ─────────────────────────────────────────────────────────

/**
 * Returns the CSS var() reference for a token — safe to use in inline styles
 * and anywhere a CSS value string is accepted.
 *
 * @example
 *   token('color-text-primary')  // 'var(--color-text-primary)'
 */
export function token(name: DesignToken): string {
  return `var(--${name})`
}

/**
 * Reads the live computed value of a token from the DOM.
 * Only callable in browser environments — returns '' on the server.
 *
 * @example
 *   cssVar('color-bg')  // '#f9fafb' (light) or '#0d1117' (dark)
 */
export function cssVar(name: DesignToken, element?: Element): string {
  if (typeof window === 'undefined') return ''
  const target = element ?? document.documentElement
  return getComputedStyle(target).getPropertyValue(`--${name}`).trim()
}

// ── Theme management ──────────────────────────────────────────────────────

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'opendev-theme'

/**
 * Resolves 'system' to the OS-level preference.
 * Always returns 'light' or 'dark'.
 */
export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/**
 * Applies a theme to the document root by setting data-theme.
 * Persists the user's explicit choice to localStorage.
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return

  const resolved = resolveTheme(theme)
  document.documentElement.setAttribute('data-theme', resolved)

  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // localStorage may be blocked in private browsing — non-fatal
  }
}

/**
 * Reads the persisted theme preference.
 * Falls back to 'system' when nothing is stored or storage is unavailable.
 */
export function loadTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // ignore
  }
  return 'system'
}

/**
 * Inlines a small script that applies the stored theme before first paint.
 * Paste the result into a <script> tag in your HTML <head> to eliminate
 * flash-of-unstyled-content on hard reload.
 */
export function buildAntiFlashScript(): string {
  return `(function(){
  var t;
  try { t = localStorage.getItem('${STORAGE_KEY}') } catch(e) {}
  var resolved = (t === 'dark' || (!t && matchMedia('(prefers-color-scheme:dark)').matches))
    ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', resolved);
})();`
}
