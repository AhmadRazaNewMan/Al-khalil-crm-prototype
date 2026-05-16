# Design System Inspired by Cohere

## 1. Visual Theme & Atmosphere

Cohere's design system embodies a modern, forward-thinking aesthetic rooted in deep purples and vibrant gradients that evoke innovation and technological sophistication. The visual identity blends minimalist clarity with dynamic visual elements—particularly through the use of layered gradients and organic shapes that suggest complexity rendered beautifully. The atmosphere is premium yet approachable, corporate yet creative, with a strong emphasis on dark backgrounds that make bright accents pop and command attention. White and neutral text provides crisp legibility against rich dark canvases, while strategic use of electric purples (#7670C5, #D18EE2) and warm accent colors (#FF7759) create visual hierarchy and guide user focus through energetic contrast.

**Key Characteristics**
- Deep, dark foundation with rich purple gradients creating visual depth
- High contrast between dark backgrounds and bright white/light text for clarity
- Vibrant accent colors (magenta, electric purple, coral) used sparingly for emphasis
- Clean, geometric typography with generous spacing and breathing room
- Sophisticated use of layered, organic 3D visual elements in hero sections
- Premium feel achieved through refined color restraint and strategic accent placement
- Tech-forward and trustworthy without being cold or clinical

## 2. Color Palette & Roles

### Primary
- **Navy/Deep Purple Base** (`#17171C`): Primary background color for page foundations and dark surfaces
- **Dark Charcoal** (`#2F2F37`): Secondary background for slightly elevated surfaces and contrast layers

### Accent Colors
- **Electric Purple** (`#7670C5`): Primary interactive accent and focus states
- **Magenta** (`#D18EE2`): Vibrant accent for special highlights and gradient components
- **Coral/Orange** (`#FF7759`): Warm accent for secondary CTAs and supporting highlights
- **Royal Blue** (`#4C6EE6`): Primary brand accent for CTAs and interactive elements

### Interactive
- **White Button** (`#FFFFFF`): Primary call-to-action buttons with dark text
- **Ghost/Transparent** (`#000000` with 0% opacity): Transparent overlays and overlay states

### Neutral Scale
- **White** (`#FFFFFF`): Primary text, buttons, and high-contrast elements
- **Off-White** (`#FAFAFA`): Subtle background tints and card backgrounds
- **Light Gray** (`#E5E7EB`): Borders, dividers, and subtle background separation
- **Medium Gray** (`#BBBBC3`): Secondary text and muted labels
- **Dark Gray** (`#75758A`): Tertiary text and placeholder content

### Surface & Borders
- **Border Light** (`#E5E7EB`): Default borders and dividers on light backgrounds
- **Border Medium** (`#BBBBC3`): Secondary borders for nested elements

### Semantic / Status
- **Error/Danger** (`#CA492D`): Error states, warnings, and destructive actions
- **Success** (`#5EA538`): Confirmation messages, successful completions, and positive states

## 3. Typography Rules

### Font Family
**Primary:** CohereText (fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)
**Secondary:** Unica77 Cohere Web (fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display/H1 | CohereText | 72px | 400 | 72px | 0px | Page hero and primary headlines |
| Heading/H2 | Unica77 Cohere Web | 60px | 400 | 60px | 0px | Major section headers |
| Subheading/H3 | Unica77 Cohere Web | 48px | 400 | 57.6px | 0px | Secondary section headers |
| Heading/H4 | Unica77 Cohere Web | 32px | 400 | 38.4px | 0px | Card titles and tertiary headers |
| Body | Unica77 Cohere Web | 14px | 400 | 19.6px | 0px | Body text and paragraph content |
| Label/Span | Unica77 Cohere Web | 16px | 400 | 24px | 0px | Labels, meta text, and inline content |
| Button | Unica77 Cohere Web | 16px | 400 | 24px | 0px | Button and CTA text |
| Caption | Unica77 Cohere Web | 14px | 400 | 19.6px | 0px | Small captions and helper text |

### Principles
- Use consistent font-weight of 400 (regular) throughout the system for clean, modern appearance
- Maintain generous line-height ratios (1.0–1.7x font size) to ensure readability and spaciousness
- Reserve CohereText (primary font) exclusively for large, impactful display-level typography
- Apply Unica77 Cohere Web for all body, navigation, and component-level text
- Headings use 1:1 font-size to line-height ratio for bold, assertive presence
- Body text employs 1.4x line-height multiplier for comfortable reading
- Never reduce line-height below 1.2x the font size for accessibility and readability

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** `#FFFFFF`
- **Text Color:** `#17171C`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Unica77 Cohere Web
- **Padding:** `12px 24px`
- **Border Radius:** `9999px`
- **Border:** `0px solid transparent`
- **Box Shadow:** `none`
- **Height:** `auto`
- **Width:** `fit-content`
- **Line Height:** `24px`
- **Hover State:** Opacity `0.9`, subtle background darkening to `#F2F2F2`
- **Active State:** Background `#E5E7EB`, text remains `#17171C`
- **Focus State:** Outline `2px solid #4C6EE6` with `4px` offset

#### Secondary Button (Transparent/Ghost)
- **Background:** `transparent`
- **Text Color:** `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Unica77 Cohere Web
- **Padding:** `12px 24px`
- **Border Radius:** `9999px`
- **Border:** `1px solid #FFFFFF`
- **Box Shadow:** `none`
- **Height:** `auto`
- **Width:** `fit-content`
- **Line Height:** `24px`
- **Hover State:** Background `rgba(255, 255, 255, 0.1)`, text `#FFFFFF`
- **Active State:** Background `rgba(255, 255, 255, 0.2)`

#### Minimal/Link Button
- **Background:** `transparent`
- **Text Color:** `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Unica77 Cohere Web
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `none`
- **Box Shadow:** `none`
- **Hover State:** Text opacity `0.8` with underline `1px solid #FFFFFF`
- **Active State:** Text color `#D18EE2`

### Cards & Containers

#### Base Card
- **Background:** `transparent` or `rgba(47, 47, 55, 0.5)` for elevated depth
- **Text Color:** `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Unica77 Cohere Web
- **Padding:** `40px 36px`
- **Border Radius:** `22px`
- **Border:** `1px solid rgba(229, 231, 235, 0.2)`
- **Box Shadow:** `0px 4px 12px rgba(0, 0, 0, 0.2)`
- **Line Height:** `24px`

#### Gradient Overlay Card
- **Background:** Linear gradient from `#7670C5` to `#D18EE2`
- **Text Color:** `#FFFFFF`
- **Padding:** `40px 36px`
- **Border Radius:** `22px`
- **Border:** `1px solid rgba(255, 255, 255, 0.2)`
- **Box Shadow:** `0px 8px 24px rgba(118, 112, 197, 0.3)`

### Inputs & Forms

#### Text Input
- **Background:** `transparent`
- **Text Color:** `#FFFFFF`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Font Family:** Unica77 Cohere Web
- **Padding:** `12px 16px`
- **Border Radius:** `4px`
- **Border:** `1px solid #E5E7EB`
- **Box Shadow:** `none`
- **Line Height:** `21px`
- **Placeholder Color:** `#BBBBC3`
- **Focus State:** Border `1px solid #4C6EE6`, box-shadow `0px 0px 0px 3px rgba(76, 110, 230, 0.1)`
- **Error State:** Border `1px solid #CA492D`, box-shadow `0px 0px 0px 3px rgba(202, 73, 45, 0.1)`

### Navigation

#### Header Navigation
- **Background:** `rgba(0, 0, 0, 0)` or translucent dark overlay on scroll
- **Text Color:** `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Unica77 Cohere Web
- **Padding:** `16px 40px` (vertical/horizontal)
- **Border Radius:** `0px`
- **Border:** `none`
- **Box Shadow:** `none`
- **Height:** `75px`
- **Line Height:** `24px`
- **Link States:** Default `#FFFFFF`, hover `#D18EE2`, active `#4C6EE6`

#### Navigation Link
- **Background:** `transparent`
- **Text Color:** `#FFFFFF`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Unica77 Cohere Web
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `none`
- **Hover State:** Text color transitions to `#D18EE2`
- **Active State:** Text color `#4C6EE6` with bottom border `2px solid #4C6EE6`

### Links

#### Inline Link
- **Background:** `transparent`
- **Text Color:** `#4C6EE6`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Unica77 Cohere Web
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `none`
- **Text Decoration:** `none` by default
- **Line Height:** `24px`
- **Hover State:** Text color `#7670C5`, text-decoration `underline 1px solid #7670C5`
- **Active State:** Text color `#D18EE2`
- **Visited State:** Text color `#7670C5`

## 5. Layout Principles

### Spacing System
**Base Unit:** `4px`

**Scale:**
- `4px`: Micro spacing, internal component gaps, tight grouping
- `8px`: Tight padding, small component spacing
- `12px`: Default padding for compact elements
- `16px`: Standard padding for buttons and inputs
- `20px`: Section padding, generous internal spacing
- `24px`: Card internal padding, moderate section gaps
- `28px`: Gap between related content sections
- `36px`: Internal card padding, larger component spacing
- `40px`: Section horizontal padding, major content margins
- `60px`: Large vertical section spacing, major layout breaks

**Usage Context:** Use multiples of 4px for all spacing values. Apply 12px–16px for interactive components (buttons, inputs), 24px–36px for card and container padding, 40px–60px for section-to-section spacing.

### Grid & Container
- **Max Width:** `1440px` for full-width container
- **Horizontal Padding:** `40px` on sides for desktop, scale to `20px` for tablet, `16px` for mobile
- **Column Strategy:** 12-column grid system; major content typically spans 8–10 columns with 1–2 column gutters
- **Section Patterns:** Full-width hero (dark background), contained content sections with max-width wrapper, alternating dark/light backgrounds for visual rhythm

### Whitespace Philosophy
Embrace generous whitespace as a design principle. Space is not merely empty; it provides visual rest, aids cognitive processing, and emphasizes important content. Minimum spacing between major layout blocks is `40px` vertically. Text-heavy sections benefit from 1.5–2x the standard padding. Allow breathing room around interactive elements; never crowd buttons or inputs unnecessarily.

### Border Radius Scale
- `0px`: Navigation bars, input field bases, minimal UI elements
- `4px`: Form inputs, small component corners
- `8px`: Image corners, subtle rounded appearance
- `12px`: Card corners, larger UI modules
- `20px`: Image overlays, prominent visual elements
- `22px`: Card containers, hero section images
- `9999px`: Fully rounded pills for buttons and badge-style components

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow, solid background | Base backgrounds, text overlays, minimal UI |
| Raised (1) | `0px 4px 12px rgba(0, 0, 0, 0.2)` | Cards, floating elements, subtle depth |
| Elevated (2) | `0px 8px 24px rgba(0, 0, 0, 0.3)` | Modals, dropdowns, significant depth |
| Floating (3) | `0px 12px 32px rgba(0, 0, 0, 0.4)` | Tooltips, popovers, maximum visual prominence |
| Gradient Glow (Special) | `0px 8px 24px rgba(118, 112, 197, 0.3)` | Gradient cards, accent containers |

**Shadow Philosophy:** Shadows in this system are used conservatively and serve functional purposes—primarily to establish elevation hierarchy and separate containers from backgrounds. Soft, diffused shadows (`rgba(0, 0, 0, 0.2–0.4)`) maintain the premium aesthetic without introducing harsh contrast. Gradient-based accent cards receive warm purple glows that harmonize with the brand palette. On dark backgrounds, shadows are more prominent to create clear separation; on light backgrounds, shadows are subtler to maintain refinement.

## 7. Do's and Don'ts

### Do
- Use `#FFFFFF` for primary text on dark backgrounds for maximum contrast and legibility
- Leverage white buttons (`#FFFFFF` background) as the primary CTA on dark backgrounds
- Apply purple accents (`#7670C5`, `#D18EE2`) sparingly to maintain visual hierarchy
- Maintain minimum `12px` padding inside all interactive components
- Use rounded button borders (`9999px`) for all primary call-to-action buttons
- Apply transparent or semi-transparent cards (`rgba(47, 47, 55, 0.5)`) for layered depth
- Include adequate focus states with `#4C6EE6` outlines for keyboard navigation
- Size button padding to `12px 24px` as the standard for consistency
- Apply `22px` border radius to card containers for cohesive roundness
- Use gradient overlays (purple-to-magenta) for promotional or highlight sections

### Don't
- Never use text colors below `#75758A` (medium gray) on dark backgrounds without ensuring 4.5:1 contrast ratio
- Don't apply heavy shadows (`0px 20px 60px`) that create visual clutter
- Avoid using multiple competing accent colors in a single layout section
- Don't reduce button padding below `12px` vertical or `16px` horizontal
- Never mix border-radius styles inconsistently; maintain either `9999px` for buttons or `4px` for inputs system-wide
- Don't overlay white text directly on light backgrounds without sufficient background contrast
- Avoid applying gradients to non-accent containers; reserve gradients for special emphasis
- Don't use error red (`#CA492D`) outside of error states and destructive actions
- Never increase line-height below `1.2x` font size; prioritize readability over compact layouts
- Don't apply box-shadows on every element; reserve shadows for elevation and modal contexts only

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Primary Changes | Layout |
|-----------------|-------|-----------------|--------|
| Mobile | 320px–479px | Single column, full-width content, 16px horizontal padding | Stack all sections vertically, reduce H1 to 48px, button padding `10px 16px` |
| Tablet | 480px–1023px | Two-column layout, 20px horizontal padding, reduce typography by 1 size | Hero spans full width, cards in 2-column grid, H2 to 48px |
| Desktop | 1024px–1439px | Three-column grid available, 40px horizontal padding, standard typography | Multi-column layouts, standard card grids, full typography hierarchy |
| Large Desktop | 1440px+ | Max-width container `1440px` centered, full spacing scale | Content centering, full spacing scale, standard hierarchy |

### Touch Targets
- **Minimum interactive element size:** `44px × 44px` (buttons, links, navigation items)
- **Button padding minimum:** `12px` vertical, `16px` horizontal, resulting in ~44px height
- **Spacing between touch targets:** Minimum `8px` gap to prevent accidental interaction
- **Form input height:** Minimum `40px` for comfortable touch interaction
- **Navigation link padding:** `16px` minimum around text for adequate tap area

### Collapsing Strategy
- **Hero sections:** Scale typography proportionally; H1 reduces from `72px` (desktop) to `48px` (tablet) to `36px` (mobile)
- **Multi-column grids:** Collapse to 2 columns at tablet breakpoint, single column at mobile
- **Horizontal navigation:** Convert to hamburger menu pattern below `768px` width
- **Card layouts:** Maintain card width proportions; allow horizontal scroll on mobile if needed
- **Spacing reduction:** Apply `20px` horizontal padding on tablet, `16px` on mobile; maintain vertical spacing relationships
- **Typography scaling:** Reduce body text from `16px` (span/label) to `14px` on mobile; keep H1 proportional with minimum `36px`

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** White (`#FFFFFF`) with dark text `#17171C`
- **Secondary CTA:** Ghost (`transparent`) with white text `#FFFFFF` and white border
- **Background:** Navy/Deep Purple (`#17171C`)
- **Secondary Background:** Dark Charcoal (`#2F2F37`)
- **Text (Primary):** White (`#FFFFFF`)
- **Text (Secondary):** Medium Gray (`#75758A`)
- **Accent (Electric):** Electric Purple (`#7670C5`)
- **Accent (Vibrant):** Magenta (`#D18EE2`)
- **Accent (Warm):** Coral (`#FF7759`)
- **Border/Divider:** Light Gray (`#E5E7EB`)
- **Error State:** Danger Red (`#CA492D`)
- **Success State:** Green (`#5EA538`)
- **Focus Outline:** Royal Blue (`#4C6EE6`)

### Iteration Guide

1. **Always apply padding `12px 24px` to primary buttons** with `9999px` border-radius and `#FFFFFF` background, text color `#17171C`
2. **Use white (`#FFFFFF`) text on all dark backgrounds** (`#17171C`, `#2F2F37`) for accessibility and visual clarity
3. **Reserve purple accents** (`#7670C5`, `#D18EE2`) for interactive states, focus states, and gradient overlays only
4. **Apply `22px` border-radius to all card containers** for consistent, refined corners; use `4px` for form inputs
5. **Maintain minimum line-height of `1.4x` font-size** (e.g., `24px` line-height for `16px` font); never collapse typography vertically
6. **Build grid layouts with 40px horizontal padding on desktop**, reducing to `20px` on tablet and `16px` on mobile
7. **Include focus-visible outlines (`2px solid #4C6EE6`)** on all interactive elements for keyboard navigation accessibility
8. **Use subtle shadows sparingly** (`0px 4px 12px rgba(0, 0, 0, 0.2)` for cards); avoid heavy shadows outside modal/elevated contexts
9. **Implement gradient cards with linear gradient from `#7670C5` to `#D18EE2`** for special emphasis sections; pair with `0px 8px 24px rgba(118, 112, 197, 0.3)` shadow
10. **Collapse multi-column layouts to 2 columns at `1024px` breakpoint**, then 1 column below `480px`; scale typography proportionally (H1: 72px → 48px → 36px)