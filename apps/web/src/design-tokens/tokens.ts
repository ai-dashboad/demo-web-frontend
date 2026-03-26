/**
 * Design token definitions — single source of truth for all design values.
 * CSS custom properties are derived from these at build time (tokens.css).
 * Use these constants for non-CSS contexts (e.g. canvas, chart colours).
 */

export const ColorPrimitive = {
  // Neutral scale
  neutral0:   '#ffffff',
  neutral50:  '#f9fafb',
  neutral100: '#f3f4f6',
  neutral200: '#e5e7eb',
  neutral300: '#d1d5db',
  neutral400: '#9ca3af',
  neutral500: '#6b7280',
  neutral600: '#4b5563',
  neutral700: '#374151',
  neutral800: '#1f2937',
  neutral900: '#111827',
  neutral950: '#030712',

  // Brand — indigo
  brand50:  '#eef2ff',
  brand100: '#e0e7ff',
  brand200: '#c7d2fe',
  brand300: '#a5b4fc',
  brand400: '#818cf8',
  brand500: '#6366f1',
  brand600: '#4f46e5',
  brand700: '#4338ca',
  brand800: '#3730a3',
  brand900: '#312e81',
  brand950: '#1e1b4b',

  // Semantic — success (green)
  success50:  '#f0fdf4',
  success100: '#dcfce7',
  success200: '#bbf7d0',
  success400: '#4ade80',
  success500: '#22c55e',
  success600: '#16a34a',
  success700: '#15803d',
  success900: '#14532d',

  // Semantic — warning (amber)
  warning50:  '#fffbeb',
  warning100: '#fef3c7',
  warning200: '#fde68a',
  warning400: '#fbbf24',
  warning500: '#f59e0b',
  warning600: '#d97706',
  warning700: '#b45309',
  warning900: '#78350f',

  // Semantic — danger (red)
  danger50:  '#fff1f2',
  danger100: '#ffe4e6',
  danger200: '#fecdd3',
  danger400: '#fb7185',
  danger500: '#f43f5e',
  danger600: '#e11d48',
  danger700: '#be123c',
  danger900: '#881337',

  // Semantic — info (sky)
  info50:  '#f0f9ff',
  info100: '#e0f2fe',
  info200: '#bae6fd',
  info400: '#38bdf8',
  info500: '#0ea5e9',
  info600: '#0284c7',
  info700: '#0369a1',
  info900: '#0c4a6e',
} as const;

export type ColorPrimitiveName = keyof typeof ColorPrimitive;

// ---------------------------------------------------------------------------
// Semantic colour aliases — map intent to primitive tokens.
// These are the values that get emitted as CSS custom properties.
// ---------------------------------------------------------------------------

export interface SemanticPalette {
  // Backgrounds
  bgBase: string;
  bgSubtle: string;
  bgMuted: string;
  bgInverse: string;

  // Surfaces (cards, panels, modals)
  surfaceDefault: string;
  surfaceRaised: string;
  surfaceOverlay: string;
  surfaceSunken: string;

  // Borders
  borderDefault: string;
  borderSubtle: string;
  borderStrong: string;
  borderFocus: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string;
  textLink: string;
  textLinkHover: string;

  // Brand
  brandDefault: string;
  brandHover: string;
  brandActive: string;
  brandSubtle: string;
  brandText: string;

  // Feedback — success
  successDefault: string;
  successSubtle: string;
  successText: string;

  // Feedback — warning
  warningDefault: string;
  warningSubtle: string;
  warningText: string;

  // Feedback — danger
  dangerDefault: string;
  dangerHover: string;
  dangerSubtle: string;
  dangerText: string;

  // Feedback — info
  infoDefault: string;
  infoSubtle: string;
  infoText: string;
}

export const lightPalette: SemanticPalette = {
  bgBase:    ColorPrimitive.neutral0,
  bgSubtle:  ColorPrimitive.neutral50,
  bgMuted:   ColorPrimitive.neutral100,
  bgInverse: ColorPrimitive.neutral900,

  surfaceDefault: ColorPrimitive.neutral0,
  surfaceRaised:  ColorPrimitive.neutral0,
  surfaceOverlay: ColorPrimitive.neutral0,
  surfaceSunken:  ColorPrimitive.neutral50,

  borderDefault: ColorPrimitive.neutral200,
  borderSubtle:  ColorPrimitive.neutral100,
  borderStrong:  ColorPrimitive.neutral400,
  borderFocus:   ColorPrimitive.brand500,

  textPrimary:   ColorPrimitive.neutral900,
  textSecondary: ColorPrimitive.neutral600,
  textTertiary:  ColorPrimitive.neutral400,
  textDisabled:  ColorPrimitive.neutral300,
  textInverse:   ColorPrimitive.neutral0,
  textLink:      ColorPrimitive.brand600,
  textLinkHover: ColorPrimitive.brand700,

  brandDefault: ColorPrimitive.brand600,
  brandHover:   ColorPrimitive.brand700,
  brandActive:  ColorPrimitive.brand800,
  brandSubtle:  ColorPrimitive.brand50,
  brandText:    ColorPrimitive.neutral0,

  successDefault: ColorPrimitive.success600,
  successSubtle:  ColorPrimitive.success50,
  successText:    ColorPrimitive.success700,

  warningDefault: ColorPrimitive.warning500,
  warningSubtle:  ColorPrimitive.warning50,
  warningText:    ColorPrimitive.warning700,

  dangerDefault: ColorPrimitive.danger600,
  dangerHover:   ColorPrimitive.danger700,
  dangerSubtle:  ColorPrimitive.danger50,
  dangerText:    ColorPrimitive.danger700,

  infoDefault: ColorPrimitive.info600,
  infoSubtle:  ColorPrimitive.info50,
  infoText:    ColorPrimitive.info700,
};

export const darkPalette: SemanticPalette = {
  bgBase:    ColorPrimitive.neutral950,
  bgSubtle:  ColorPrimitive.neutral900,
  bgMuted:   ColorPrimitive.neutral800,
  bgInverse: ColorPrimitive.neutral0,

  surfaceDefault: ColorPrimitive.neutral900,
  surfaceRaised:  ColorPrimitive.neutral800,
  surfaceOverlay: ColorPrimitive.neutral800,
  surfaceSunken:  ColorPrimitive.neutral950,

  borderDefault: ColorPrimitive.neutral700,
  borderSubtle:  ColorPrimitive.neutral800,
  borderStrong:  ColorPrimitive.neutral500,
  borderFocus:   ColorPrimitive.brand400,

  textPrimary:   ColorPrimitive.neutral50,
  textSecondary: ColorPrimitive.neutral400,
  textTertiary:  ColorPrimitive.neutral500,
  textDisabled:  ColorPrimitive.neutral700,
  textInverse:   ColorPrimitive.neutral900,
  textLink:      ColorPrimitive.brand400,
  textLinkHover: ColorPrimitive.brand300,

  brandDefault: ColorPrimitive.brand500,
  brandHover:   ColorPrimitive.brand400,
  brandActive:  ColorPrimitive.brand300,
  brandSubtle:  ColorPrimitive.brand950,
  brandText:    ColorPrimitive.neutral0,

  successDefault: ColorPrimitive.success500,
  successSubtle:  '#052e16',  // custom dark surface — no primitive equivalent
  successText:    ColorPrimitive.success400,

  warningDefault: ColorPrimitive.warning400,
  warningSubtle:  '#451a03',
  warningText:    ColorPrimitive.warning400,

  dangerDefault: ColorPrimitive.danger500,
  dangerHover:   ColorPrimitive.danger400,
  dangerSubtle:  '#4c0519',
  dangerText:    ColorPrimitive.danger400,

  infoDefault: ColorPrimitive.info500,
  infoSubtle:  '#082f49',
  infoText:    ColorPrimitive.info400,
};

// ---------------------------------------------------------------------------
// Spacing scale — 4 px base grid
// ---------------------------------------------------------------------------

export const spacing = {
  px:   '1px',
  0:    '0px',
  0.5:  '2px',
  1:    '4px',
  1.5:  '6px',
  2:    '8px',
  2.5:  '10px',
  3:    '12px',
  3.5:  '14px',
  4:    '16px',
  5:    '20px',
  6:    '24px',
  7:    '28px',
  8:    '32px',
  9:    '36px',
  10:   '40px',
  11:   '44px',
  12:   '48px',
  14:   '56px',
  16:   '64px',
  20:   '80px',
  24:   '96px',
  28:   '112px',
  32:   '128px',
  36:   '144px',
  40:   '160px',
  44:   '176px',
  48:   '192px',
  52:   '208px',
  56:   '224px',
  60:   '240px',
  64:   '256px',
  72:   '288px',
  80:   '320px',
  96:   '384px',
} as const;

export type SpacingKey = keyof typeof spacing;

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

export const borderRadius = {
  none: '0px',
  sm:   '2px',
  base: '4px',
  md:   '6px',
  lg:   '8px',
  xl:   '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
} as const;

export type BorderRadiusKey = keyof typeof borderRadius;

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

export const shadows = {
  none: 'none',
  xs:   '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm:   '0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)',
  base: '0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)',
  md:   '0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)',
  lg:   '0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)',
  xl:   '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  // Inset / inner shadow for sunken elements
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  // Focus ring — use with `box-shadow` to avoid layout shift
  focusRing: '0 0 0 3px rgb(99 102 241 / 0.45)',
} as const;

export type ShadowKey = keyof typeof shadows;

// ---------------------------------------------------------------------------
// Typography scale (font-size / line-height pairs)
// ---------------------------------------------------------------------------

export const fontSizes = {
  xs:   ['0.75rem',  { lineHeight: '1rem' }],
  sm:   ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem',     { lineHeight: '1.5rem' }],
  lg:   ['1.125rem', { lineHeight: '1.75rem' }],
  xl:   ['1.25rem',  { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem',  { lineHeight: '2rem' }],
  '3xl': ['1.875rem',{ lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem',    { lineHeight: '1' }],
} as const;

export const fontWeights = {
  normal:   '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
} as const;

// ---------------------------------------------------------------------------
// Z-index stacking order
// ---------------------------------------------------------------------------

export const zIndex = {
  hide:    '-1',
  auto:    'auto',
  base:    '0',
  raised:  '1',
  dropdown: '1000',
  sticky:   '1100',
  overlay:  '1200',
  modal:    '1300',
  popover:  '1400',
  toast:    '1500',
  tooltip:  '1600',
} as const;

export type ZIndexKey = keyof typeof zIndex;

// ---------------------------------------------------------------------------
// Transition durations
// ---------------------------------------------------------------------------

export const durations = {
  instant: '0ms',
  fast:    '100ms',
  normal:  '200ms',
  slow:    '300ms',
  lazy:    '500ms',
} as const;

export const easings = {
  linear:    'linear',
  easeIn:    'cubic-bezier(0.4, 0, 1, 1)',
  easeOut:   'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
