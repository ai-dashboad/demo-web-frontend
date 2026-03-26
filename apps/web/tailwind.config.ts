import type { Config } from 'tailwindcss';
import {
  themeColors,
  themeBorderRadius,
  themeBoxShadow,
  themeTransition,
} from './src/design-tokens/tailwind-theme';

export default {
  // Class strategy: we toggle `.dark` on <html> via ThemeProvider.
  // This overrides Tailwind's media-query dark mode so user preference
  // persists across OS theme changes.
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],

  theme: {
    // Override (not extend) colours so raw hex classes like `bg-red-500`
    // are unavailable — components must use semantic tokens.
    colors: themeColors,

    // Extend so Tailwind's default spacing, typography, etc. are preserved.
    extend: {
      borderRadius: themeBorderRadius,
      boxShadow:    themeBoxShadow,
      transitionProperty: {
        // Sensible default that covers colour, border, shadow, opacity
        DEFAULT: 'color, background-color, border-color, box-shadow, opacity, transform',
      },
      transitionDuration: {
        fast:   'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow:   'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'ease-spring': 'var(--ease-spring)',
      },
    },
  },

  plugins: [],
} satisfies Config;
