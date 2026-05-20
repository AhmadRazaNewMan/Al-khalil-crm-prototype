// =============================================
// Al Khail CRM — Shared Design Tokens
// Navy + Gold + White brand palette
// =============================================

// Brand — Navy primary, Gold accent
export const brand = {
  primary: '#C8A75B',           // Gold accent — CTAs, active highlights
  primaryDeep: '#0B1F3A',       // Navy — active icon/text on white
  primarySoft: '#FBF6EC',       // Light gold tint — selected backgrounds
  primarySoftBorder: '#EDD9A3',
  secondary: '#1E3A5F',         // Secondary navy — gradient end, hover
  navy: '#0B1F3A',              // Deep navy — sidebar, dark surfaces
  navyLight: '#1E3A5F',         // Lighter navy
  gold: '#C8A75B',
  goldLight: '#DDB96A',
  gradient: 'linear-gradient(135deg,#C8A75B 0%,#DDB96A 100%)',
  gradientHover: 'linear-gradient(135deg,#B8943A 0%,#C8A75B 100%)',
  navyGradient: 'linear-gradient(135deg,#0B1F3A 0%,#1E3A5F 100%)',
}

// Neutrals — clean, white-based, no purple tint
export const ink = {
  100: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceTint: '#F5F7FA',
  panel: '#F5F7FA',
  panelBorder: '#E2E8F0',
  row: '#F8FAFC',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',
  text: '#1F2937',
  textSecondary: '#4B5563',
  textMuted: '#6B7280',
  textFaint: '#9CA3AF',
}

// Semantic — unchanged (green, amber, red, blue)
export const semantic = {
  success: '#3F9B2F', successSoft: '#EEF8EC', successBorder: '#CDE9C6',
  warning: '#C8821E', warningSoft: '#FDF4E6', warningBorder: '#F2DDB8',
  danger:  '#C53B28', dangerSoft:  '#FCEDEB', dangerBorder:  '#F3CFC9',
  info:    '#3D63D8', infoSoft:    '#EDF1FC', infoBorder:    '#CFDAF5',
}

// Elevation
export const elevation = {
  flat: 'none',
  card: '0 1px 2px rgba(15,32,58,0.04), 0 1px 3px rgba(15,32,58,0.05)',
  cardHover: '0 6px 16px rgba(15,32,58,0.09), 0 2px 6px rgba(15,32,58,0.05)',
  pop: '0 10px 30px rgba(15,32,58,0.14), 0 2px 8px rgba(15,32,58,0.08)',
  modal: '0 20px 56px rgba(15,32,58,0.22)',
  brandGlow: '0 8px 22px rgba(200,167,91,0.28)',
}

export const type = {
  display:  { fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 },
  h1:       { fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em',  lineHeight: 1.2  },
  h2:       { fontSize: 19, fontWeight: 650, letterSpacing: '-0.015em', lineHeight: 1.25 },
  cardTitle:{ fontSize: 15, fontWeight: 650, letterSpacing: '-0.01em',  lineHeight: 1.3  },
  body:     { fontSize: 14, fontWeight: 450, letterSpacing: '0',        lineHeight: 1.55 },
  bodyStrong:{fontSize: 14, fontWeight: 600, letterSpacing: '0',        lineHeight: 1.5  },
  label:    { fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',   lineHeight: 1.2, textTransform: 'uppercase' },
  caption:  { fontSize: 12, fontWeight: 500, letterSpacing: '0',        lineHeight: 1.4  },
  metric:   { fontSize: 28, fontWeight: 750, letterSpacing: '-0.03em',  lineHeight: 1.0  },
}

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 56 }

export const radius = { sm: 8, md: 12, lg: 16, xl: 20, pill: 9999 }

export const focusRing = '0 0 0 3px rgba(200,167,91,0.34)'

export const card = {
  background: ink.surface,
  border: `1px solid ${ink.border}`,
  borderRadius: radius.lg,
  boxShadow: elevation.card,
}

export const btnPrimary = {
  background: brand.gradient,
  color: '#fff',
  border: 'none',
  borderRadius: radius.pill,
  fontWeight: 600,
  fontSize: 13,
  fontFamily: 'inherit',
  cursor: 'pointer',
  boxShadow: elevation.brandGlow,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
}

export const btnSecondary = {
  background: ink.surface,
  color: ink.text,
  border: `1px solid ${ink.borderStrong}`,
  borderRadius: radius.pill,
  fontWeight: 600,
  fontSize: 13,
  fontFamily: 'inherit',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
}

export const btnGhost = {
  background: 'transparent',
  color: ink.textSecondary,
  border: '1px solid transparent',
  borderRadius: radius.md,
  fontWeight: 550,
  fontSize: 13,
  fontFamily: 'inherit',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
}
