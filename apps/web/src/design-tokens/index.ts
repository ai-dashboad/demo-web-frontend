/**
 * Public API for the design token system.
 * Import from here, not from individual token files.
 */
export {
  ColorPrimitive,
  lightPalette,
  darkPalette,
  spacing,
  borderRadius,
  shadows,
  fontSizes,
  fontWeights,
  zIndex,
  durations,
  easings,
} from './tokens';

export type {
  SemanticPalette,
  ColorPrimitiveName,
  SpacingKey,
  BorderRadiusKey,
  ShadowKey,
  ZIndexKey,
} from './tokens';
