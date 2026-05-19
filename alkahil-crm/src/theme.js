// =============================================
// Al Khail CRM — Shared Design Tokens
// Product register · committed purple brand · tinted neutrals
// =============================================

// Brand — committed primary. Purple carries identity (CTA, active, focus, selection).
export const brand = {
  primary: '#6C5CE0',          // strengthened from #7670C5 for contrast + presence
  primaryDeep: '#5A49C9',
  primarySoft: '#F1EFFB',      // tinted surface for selected/active backgrounds
  primarySoftBorder: '#DDD7F5',
  magenta: '#C77BDB',
  gradient: 'linear-gradient(135deg,#6C5CE0 0%,#9B6FDB 55%,#C77BDB 100%)',
  gradientHover: 'linear-gradient(135deg,#5A49C9 0%,#8A5ECF 55%,#B86BCF 100%)',
}

// Neutrals — tinted toward the brand hue, never pure #000 / #fff.
export const ink = {
  100: '#FDFCFE', // page-level pop / inverted text
  surface: '#FFFFFF',
  surfaceTint: '#FAF9FE',
  panel: '#F5F3F0',          // established warm-stone secondary neutral (sidebar/panels)
  panelBorder: '#E8E3DC',
  row: '#FAFAFE',
  border: '#E7E4F0',
  borderStrong: '#D6D1E6',
  text: '#1A1626',           // primary text  (≈15:1 on white)
  textSecondary: '#54506A',  // secondary     (≈7:1)
  textMuted: '#6E6982',      // muted, still AA 4.5:1 on white  (was #888 → failed)
  textFaint: '#9A95AC',      // timestamps / decorative only, never load-bearing
}

// Semantic — state colors with soft backgrounds for badges/pills.
export const semantic = {
  success: '#3F9B2F', successSoft: '#EEF8EC', successBorder: '#CDE9C6',
  warning: '#C8821E', warningSoft: '#FDF4E6', warningBorder: '#F2DDB8',
  danger:  '#C53B28', dangerSoft:  '#FCEDEB', dangerBorder:  '#F3CFC9',
  info:    '#3D63D8', infoSoft:    '#EDF1FC', infoBorder:    '#CFDAF5',
}

// Elevation — soft, brand-tinted shadows. Subtle on light surfaces.
export const elevation = {
  flat: 'none',
  card: '0 1px 2px rgba(26,22,38,0.04), 0 1px 3px rgba(26,22,38,0.05)',
  cardHover: '0 6px 16px rgba(26,22,38,0.09), 0 2px 6px rgba(26,22,38,0.05)',
  pop: '0 10px 30px rgba(26,22,38,0.14), 0 2px 8px rgba(26,22,38,0.08)',
  modal: '0 20px 56px rgba(26,22,38,0.22)',
  brandGlow: '0 8px 22px rgba(108,92,224,0.28)',
}

// Typography — fixed rem-ish px scale, weight + size contrast.
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

// 4px spacing scale.
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 56 }

export const radius = { sm: 8, md: 12, lg: 16, xl: 20, pill: 9999 }

export const focusRing = '0 0 0 3px rgba(108,92,224,0.34)'

// Reusable component recipes ----------------------------------------

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
