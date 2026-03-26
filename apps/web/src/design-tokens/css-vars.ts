/**
 * Generates CSS custom property declarations from a semantic palette.
 * Used by the build-time script and unit tests — not imported at runtime.
 */
import { type SemanticPalette, borderRadius, shadows, spacing } from './tokens';

/** Convert camelCase token name to kebab-case CSS variable name. */
export function toKebab(name: string): string {
  return name.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}

/**
 * Emit a `:root { ... }` or `.dark { ... }` block from a semantic palette.
 * Returns only the variable declarations (no wrapping selector).
 */
export function paletteToVars(palette: SemanticPalette): string {
  return Object.entries(palette)
    .map(([key, value]) => `  --color-${toKebab(key)}: ${value};`)
    .join('\n');
}

/** Emit spacing custom properties. */
export function spacingToVars(): string {
  return Object.entries(spacing)
    .map(([key, value]) => `  --spacing-${key}: ${value};`)
    .join('\n');
}

/** Emit border-radius custom properties. */
export function borderRadiusToVars(): string {
  return Object.entries(borderRadius)
    .map(([key, value]) => `  --radius-${key}: ${value};`)
    .join('\n');
}

/** Emit shadow custom properties. */
export function shadowsToVars(): string {
  return Object.entries(shadows)
    .map(([key, value]) => `  --shadow-${key}: ${value};`)
    .join('\n');
}
