/**
 * Tailwind theme extension using the design token CSS variables.
 *
 * Consumed by tailwind.config.ts. Using CSS variable references means
 * Tailwind utility classes automatically respect the active theme
 * (light / dark) without needing Tailwind's own dark: variant for colours.
 *
 * Example output: `bg-bg-base` → `background-color: var(--color-bg-base)`
 */

const cssVar = (name: string) => `var(--color-${name})`;
const shadowVar = (name: string) => `var(--shadow-${name})`;
const radiusVar = (name: string) => `var(--radius-${name})`;

export const themeColors = {
  // Backgrounds
  'bg-base':    cssVar('bg-base'),
  'bg-subtle':  cssVar('bg-subtle'),
  'bg-muted':   cssVar('bg-muted'),
  'bg-inverse': cssVar('bg-inverse'),

  // Surfaces
  'surface-default': cssVar('surface-default'),
  'surface-raised':  cssVar('surface-raised'),
  'surface-overlay': cssVar('surface-overlay'),
  'surface-sunken':  cssVar('surface-sunken'),

  // Borders (used in border-color utilities)
  'border-default': cssVar('border-default'),
  'border-subtle':  cssVar('border-subtle'),
  'border-strong':  cssVar('border-strong'),
  'border-focus':   cssVar('border-focus'),

  // Text
  'text-primary':    cssVar('text-primary'),
  'text-secondary':  cssVar('text-secondary'),
  'text-tertiary':   cssVar('text-tertiary'),
  'text-disabled':   cssVar('text-disabled'),
  'text-inverse':    cssVar('text-inverse'),
  'text-link':       cssVar('text-link'),
  'text-link-hover': cssVar('text-link-hover'),

  // Brand
  'brand-default': cssVar('brand-default'),
  'brand-hover':   cssVar('brand-hover'),
  'brand-active':  cssVar('brand-active'),
  'brand-subtle':  cssVar('brand-subtle'),
  'brand-text':    cssVar('brand-text'),

  // Success
  'success-default': cssVar('success-default'),
  'success-subtle':  cssVar('success-subtle'),
  'success-text':    cssVar('success-text'),

  // Warning
  'warning-default': cssVar('warning-default'),
  'warning-subtle':  cssVar('warning-subtle'),
  'warning-text':    cssVar('warning-text'),

  // Danger
  'danger-default': cssVar('danger-default'),
  'danger-hover':   cssVar('danger-hover'),
  'danger-subtle':  cssVar('danger-subtle'),
  'danger-text':    cssVar('danger-text'),

  // Info
  'info-default': cssVar('info-default'),
  'info-subtle':  cssVar('info-subtle'),
  'info-text':    cssVar('info-text'),
} as const;

export const themeBorderRadius = {
  none: radiusVar('none'),
  sm:   radiusVar('sm'),
  DEFAULT: radiusVar('base'),
  md:   radiusVar('md'),
  lg:   radiusVar('lg'),
  xl:   radiusVar('xl'),
  '2xl': radiusVar('2xl'),
  '3xl': radiusVar('3xl'),
  full: radiusVar('full'),
} as const;

export const themeBoxShadow = {
  none:       shadowVar('none'),
  xs:         shadowVar('xs'),
  sm:         shadowVar('sm'),
  DEFAULT:    shadowVar('base'),
  md:         shadowVar('md'),
  lg:         shadowVar('lg'),
  xl:         shadowVar('xl'),
  inner:      shadowVar('inner'),
  'focus-ring': shadowVar('focus-ring'),
} as const;

export const themeTransition = {
  none: 'none',
  fast: 'all var(--duration-fast) var(--ease-out)',
  DEFAULT: 'all var(--duration-normal) var(--ease-in-out)',
  slow: 'all var(--duration-slow) var(--ease-in-out)',
} as const;
