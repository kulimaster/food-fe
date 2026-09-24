---
name: Vitality Core
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#005ac2'
  on-tertiary: '#ffffff'
  tertiary-container: '#71a1ff'
  on-tertiary-container: '#00367a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-padding: 20px
  gutter: 16px
---

## Brand & Style

The design system is centered on a **Modern / Corporate** aesthetic with a strong emphasis on clarity, vitality, and clinical reliability. It targets health-conscious individuals who require a high-performance tool that feels encouraging rather than overwhelming.

The visual narrative uses a "clean-plate" philosophy: expansive whitespace, high-fidelity card components, and a sophisticated use of color to categorize complex nutritional data. The emotional response should be one of "organized wellness"—making the act of tracking feel as healthy as the nutrition itself. We utilize subtle depth through soft shadows and a systematic approach to rounding that feels organic yet precise.

## Colors

The palette is anchored by **Emerald Green**, symbolizing health and successful goal completion. For nutritional tracking, we employ a functional color system to differentiate macro-nutrients:
- **Emerald (Primary):** Used for Calorie Goals and "Success" states.
- **Blue (Tertiary):** Dedicated to Protein to evoke stability and strength.
- **Orange (Secondary):** Assigned to Carbohydrates for energy.
- **Yellow/Amber:** Utilized for Fats.
- **Violet:** Designated for Fiber.

The background is a cool, light neutral to ensure the vibrant macro colors pop without causing visual fatigue.

## Typography

This design system utilizes **Inter** exclusively to maintain a functional, systematic, and highly readable interface. 

- **Weight Strategy:** Use Bold (700) for primary metrics and Semibold (600) for section headers. 
- **Scale:** Large display sizes are reserved for "Daily Calorie Balance" to provide immediate feedback.
- **Accessibility:** Label styles use slightly increased letter spacing and higher weights to ensure legibility when used in tight spaces like progress ring centers or small macro chips.

## Layout & Spacing

The layout follows an **8px linear scale** for consistent rhythm. 

- **Grid:** On mobile, use a 4-column fluid grid with 20px side margins. On desktop, transition to a 12-column fixed grid centered at 1140px.
- **Card Spacing:** Internal padding for data cards should default to `lg` (24px) to provide breathable space for charts and macro breakdowns.
- **Stacking:** Use `md` (16px) vertical spacing between grouped list items (e.g., food logs) and `xl` (32px) between major content sections.

## Elevation & Depth

We use **Ambient Shadows** to create a sense of tactile layers. Depth is used functionally:
- **Level 0 (Canvas):** The base background color (`#F8FAFC`).
- **Level 1 (Cards):** Pure white background with a very soft, diffused shadow: `0px 4px 20px rgba(0, 0, 0, 0.05)`. This is the primary surface for food logs and macro summaries.
- **Level 2 (Modals/Floating Actions):** Elevated with a more pronounced shadow: `0px 10px 30px rgba(0, 0, 0, 0.08)` to indicate temporary interaction.

Avoid heavy borders; use light neutral strokes (`#E2E8F0`) only when elements need to be differentiated on a white surface.

## Shapes

The shape language is **Rounded**, reflecting the soft and approachable nature of wellness. 
- **Standard Cards:** Use `rounded-lg` (1rem / 16px).
- **Progress Bars:** Use fully pill-shaped (100px) caps for a modern, fluid feel.
- **Buttons:** Use `rounded-lg` (1rem / 16px) to match card containers, creating a cohesive visual unit when buttons are nested inside cards.
- **Form Inputs:** Consistent with buttons at `rounded-lg`.

## Components

### Buttons
- **Primary:** Filled Emerald Green with white text. High-contrast and bold.
- **Secondary:** Ghost style with an Emerald Green border and text for less urgent actions like "Add Note."

### Cards & Progress Indicators
- **Macro Cards:** Use a Level 1 elevation. Include a top-accent border or a small circular progress ring using the specific macro tokens (e.g., Blue for Protein).
- **Progress Bars:** Use a high-contrast background for the "track" (e.g., `Slate-100`) and the vibrant macro color for the "fill." Ensure the fill has a subtle inner glow or gradient to look "vibrant."

### Lists
- **Food Log Items:** Use a simple horizontal layout with a left-aligned icon or color-dot representing the category, followed by name and calories. Use a subtle bottom border (`#F1F5F9`) between items.

### Input Fields
- **Search/Entry:** Large, clean fields with Level 1 elevation when focused. Use `Inter-md` for placeholder text in a muted neutral.

### Chips
- **Category Chips:** Use a light tint of the macro color (10% opacity) for the background and the full-strength color for the text (e.g., Light blue background with Dark blue text for "High Protein").