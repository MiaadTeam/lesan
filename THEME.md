# THEME.md - Lesan Design System: "Linear Look"

## Overview

We are implementing a **dark, glassy, ultra-modern** design inspired by the **"Linear Look"** trend. This style is characterized by:

- Deep, cinematic dark backgrounds
- Colorful blurry glows and spotlights
- Bento box grid layouts
- Glassmorphism (frosted glass cards)
- Super-thin 1px borders with subtle highlights
- Subtle gradient text effects
- Grid background patterns
- Circuitry-style connecting lines
- Smooth, physics-based animations

**Reference Sites:**
- [Linear](https://linear.app)
- [AuthKit](https://authkit.com)
- [Vercel](https://vercel.com)
- [Raycast](https://raycast.com)
- [Supabase](https://supabase.com)

**Inspiration Images:** See `@ignoreAssets/` folder for visual references.

---

## Color Palette

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#000000` | Deepest background (pure black) |
| `--bg-secondary` | `#09090B` | Slightly elevated surfaces |
| `--bg-tertiary` | `#111113` | Cards, modals, elevated panels |
| `--bg-glass` | `rgba(17, 17, 19, 0.6)` | Glassmorphic surfaces |
| `--bg-glass-hover` | `rgba(17, 17, 19, 0.8)` | Glass surfaces on hover |

### Accents & Glows
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-cyan` | `#22D3EE` | Primary accent, cyan glow |
| `--accent-purple` | `#A855F7` | Secondary accent, purple glow |
| `--accent-blue` | `#3B82F6` | Tertiary accent, blue glow |
| `--accent-emerald` | `#10B981` | Success states, performance metrics |
| `--glow-cyan` | `rgba(34, 211, 238, 0.4)` | Cyan ambient glow |
| `--glow-purple` | `rgba(168, 85, 247, 0.3)` | Purple ambient glow |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#FFFFFF` | Headings, important text |
| `--text-secondary` | `#A1A1AA` | Body text, descriptions |
| `--text-muted` | `#52525B` | Subtle text, metadata |
| `--text-gradient-start` | `#FFFFFF` | Gradient text start |
| `--text-gradient-end` | `#A1A1AA` | Gradient text end |

### Borders & Dividers
| Token | Hex | Usage |
|-------|-----|-------|
| `--border-subtle` | `rgba(255, 255, 255, 0.06)` | Very subtle borders |
| `--border-default` | `rgba(255, 255, 255, 0.1)` | Standard borders |
| `--border-highlight` | `rgba(255, 255, 255, 0.2)` | Highlighted borders |
| `--border-glow` | `rgba(34, 211, 238, 0.3)` | Glowing borders |

---

## Typography

### Font Families
- **Primary:** `Geist Sans` (or `Inter` as fallback)
  - Modern, geometric sans-serif
  - Used for headings, body text, UI elements
- **Monospace:** `Geist Mono` (or `JetBrains Mono` as fallback)
  - Used for code blocks, technical labels, metrics

### Type Scale
| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Display | `72px` | `800` | Hero headline |
| H1 | `48px` | `700` | Section headings |
| H2 | `32px` | `600` | Sub-section headings |
| H3 | `24px` | `600` | Card titles |
| H4 | `20px` | `500` | Small headings |
| Body | `16px` | `400` | Paragraph text |
| Small | `14px` | `400` | Metadata, captions |
| Code | `14px` | `400` | Code snippets |

### Letter Spacing
- Headings: `-0.02em` (tight tracking)
- Body: `0` (normal)
- Labels/Tags: `0.05em` (slight expansion)

---

## Layout System

### Grid Pattern
- **Background:** Subtle dot grid or line grid at very low opacity (`0.02-0.05`)
- **Size:** `40px` grid size for dot grid, `80px` for line grid
- **Color:** White or cyan tint at extremely low opacity
- **Purpose:** Adds structure and depth without distraction

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | `4px` | Tight gaps |
| `space-2` | `8px` | Icon gaps |
| `space-3` | `12px` | Small padding |
| `space-4` | `16px` | Default padding |
| `space-5` | `24px` | Card padding |
| `space-6` | `32px` | Section gaps |
| `space-7` | `48px` | Large sections |
| `space-8` | `64px` | Section separators |
| `space-9` | `96px` | Major section breaks |

### Container
- **Max Width:** `1200px`
- **Padding:** `24px` mobile, `48px` desktop
- **Centered:** Yes, with auto margins

---

## Components

### Glass Cards (Primary Component)
```
Background: rgba(17, 17, 19, 0.6)
Backdrop-filter: blur(12px)
Border: 1px solid rgba(255, 255, 255, 0.06)
Border-radius: 12px
Padding: 24px
Box-shadow: 
  0 0 0 1px rgba(255, 255, 255, 0.02),
  0 20px 40px rgba(0, 0, 0, 0.4)
Hover:
  Border-color: rgba(255, 255, 255, 0.12)
  Box-shadow: 
    0 0 0 1px rgba(34, 211, 238, 0.1),
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(34, 211, 238, 0.1)
  Transform: translateY(-2px)
Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Bento Grid
- **Layout:** CSS Grid with varying column spans
- **Gap:** `16px`
- **Cards:** Glass Cards with varying sizes
- **Highlight:** Some cards have subtle gradient borders

### Buttons
#### Primary Button
```
Background: linear-gradient(135deg, #22D3EE, #3B82F6)
Color: #000000
Font-weight: 600
Padding: 12px 24px
Border-radius: 8px
Box-shadow: 0 0 20px rgba(34, 211, 238, 0.3)
Hover: 
  Box-shadow: 0 0 40px rgba(34, 211, 238, 0.5)
  Transform: translateY(-1px)
```

#### Secondary Button
```
Background: transparent
Border: 1px solid rgba(255, 255, 255, 0.1)
Color: #FFFFFF
Padding: 12px 24px
Border-radius: 8px
Hover:
  Background: rgba(255, 255, 255, 0.05)
  Border-color: rgba(255, 255, 255, 0.2)
```

### Tags/Badges
```
Background: rgba(255, 255, 255, 0.05)
Border: 1px solid rgba(255, 255, 255, 0.08)
Color: #A1A1AA
Font-size: 12px
Font-weight: 500
Padding: 4px 12px
Border-radius: 9999px
```

---

## Hero Section Design

### Layout
- **Height:** `100vh` minimum, centered content
- **Background:** Pure black (`#000000`) with subtle grid pattern
- **Spotlight Effect:** Large radial gradient glow behind content
  ```
  background: radial-gradient(
    circle at 50% 50%,
    rgba(34, 211, 238, 0.15) 0%,
    rgba(168, 85, 247, 0.08) 30%,
    transparent 70%
  )
  ```

### Content Structure
1. **Eyebrow Tag:** Small badge above headline
   - Example: "v2.0 Released"
   - Style: Cyan border, transparent background

2. **Headline:** Large display text
   - Example: "The New Way to Build"
   - Style: White, gradient text effect, tight tracking
   - Size: `72px` desktop, `40px` mobile

3. **Subheadline:** Description text
   - Example: "GraphQL-like flexibility with unmatched performance."
   - Style: Secondary text color (`#A1A1AA`)
   - Size: `20px`, max-width `600px`

4. **CTA Buttons:** Primary + Secondary
   - Primary: "Get Started" (cyan gradient)
   - Secondary: "View on GitHub" (ghost button)

5. **Install Command:** Terminal-style block
   - Style: Glass card with monospace font
   - Content: `npm install @lesan/sdk`

6. **Social Proof:** Stars, version info
   - Style: Row of small badges

---

## Feature Cards (Bento Grid)

### Layout
- **Grid:** `3-column` on desktop, `2-column` tablet, `1-column` mobile
- **Card Sizes:** Mix of small, medium, and large cards
- **Gap:** `16px`

### Card Types
1. **Small Feature Card**
   - Icon + Title + Short description
   - Size: `1x1` grid

2. **Medium Feature Card**
   - Icon + Title + Description + Code snippet
   - Size: `2x1` grid

3. **Large Showcase Card**
   - Title + Description + Screenshot/illustration
   - Size: `2x2` or `3x1` grid

### Card Content Example
```
Icon: Lightning bolt (cyan colored)
Title: "Extreme Performance"
Description: "Much faster than traditional ORMs or GraphQL with client-driven projections."
Tag: "10x Faster"
```

---

## Animation & Motion

### Principles
- **Smooth, physics-based motion** (ease-out, ease-in-out)
- **Staggered reveals** for lists and grids
- **Subtle, ambient glows** (no flashing or rapid movement)
- **Scroll-triggered animations** using Intersection Observer

### Key Animations
| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Fade In Up | `0.6s` | `cubic-bezier(0.4, 0, 0.2, 1)` | Scroll into view |
| Glow Pulse | `3s` | `ease-in-out` | Infinite loop |
| Border Highlight | `0.3s` | `ease` | Hover |
| Scale Up | `0.2s` | `ease-out` | Hover |
| Stagger Children | `0.1s` delay each | `ease-out` | Parent enters view |

### CSS Variables for Animation
```css
--duration-fast: 0.15s;
--duration-normal: 0.3s;
--duration-slow: 0.6s;
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Border & Glow Effects

### Border Highlight Animation
Some cards have an animated border highlight that travels around the border:
```css
.card--highlight::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(34, 211, 238, 0.5),
    transparent
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: border-travel 3s linear infinite;
}
```

### Ambient Glow
Large, soft glows behind major sections:
```css
.ambient-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(34, 211, 238, 0.15) 0%,
    transparent 70%
  );
  filter: blur(80px);
  pointer-events: none;
}
```

---

## Code Blocks

### Styling
```
Background: #09090B
Border: 1px solid rgba(255, 255, 255, 0.06)
Border-radius: 12px
Font-family: Geist Mono
Font-size: 14px
Line-height: 1.6
Padding: 20px
```

### Syntax Highlighting
- Use a custom Prism theme with dark background
- Keywords: Cyan (`#22D3EE`)
- Strings: Emerald (`#10B981`)
- Functions: Purple (`#A855F7`)
- Comments: Muted (`#52525B`)

---

## Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | `< 640px` | Single column, smaller text, stacked layout |
| Tablet | `640px - 1024px` | 2-column grids, medium text |
| Desktop | `1024px+` | Full layout, large text, all effects |
| Wide | `1400px+` | Max container width, comfortable spacing |

---

## Performance Considerations

1. **Backdrop-filter** is GPU-intensive; use sparingly on mobile
2. **Large radial gradients** should be static images when possible
3. **Animations** should use `transform` and `opacity` only
4. **Fonts** should be preloaded or use `font-display: swap`
5. **Images** should be WebP format with fallbacks

---

## Implementation Files

### CSS Custom Properties
All tokens should be defined as CSS custom properties in:
- `website/src/css/custom.css`

### Component Styles
- `website/src/components/HeroSection/` - Hero section
- `website/src/components/GlassCard/` - Reusable glass card
- `website/src/components/BentoGrid/` - Bento grid layout
- `website/src/components/FeatureCard/` - Feature cards
- `website/src/components/TerminalBlock/` - Code install block
- `website/src/components/AmbientGlow/` - Background glow effects

### Global Styles
- Typography
- Animations
- Grid background
- Scrollbar styling

---

## Assets Needed

### Images
- [ ] Lesan logo (SVG, white and colored versions)
- [ ] Hero screenshot/illustration
- [ ] Feature illustrations (3-6)
- [ ] Performance benchmark chart

### Icons
- [ ] Lightning bolt (performance)
- [ ] Shield (type safety)
- [ ] Arrows (bidirectional relations)
- [ ] Database (MongoDB)
- [ ] Code brackets (TypeScript)
- [ ] Speedometer (benchmarks)

### Fonts
- [ ] Geist Sans (via CDN or local)
- [ ] Geist Mono (via CDN or local)

---

## Checklist

- [ ] Define all CSS custom properties
- [ ] Set up typography system
- [ ] Create glass card component
- [ ] Create bento grid layout
- [ ] Build hero section with spotlight
- [ ] Add ambient glow effects
- [ ] Implement border highlight animations
- [ ] Create feature cards with icons
- [ ] Style terminal/install block
- [ ] Add scroll-triggered animations
- [ ] Implement responsive breakpoints
- [ ] Test on mobile devices
- [ ] Optimize performance (reduce backdrop-filter on mobile)
- [ ] Add loading states/skeleton screens

---

**Last Updated:** 2026-05-12
**Status:** Planning Complete - Ready for Implementation
