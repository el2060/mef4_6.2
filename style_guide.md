---
title: MotherDuck.com‑Inspired Style Guide
version: 1.1.0
lastUpdated: 2025-11-11
summary: Original, inspired-by guide using IBM Plex Mono, warm neutrals, rounded shapes, and friendly motion.
status: stable
owners:
  - Design Systems
  - Frontend Platform
---

# MotherDuck.com‑Inspired Style Guide

This system emphasizes clarity, friendliness, and technical professionalism. It uses IBM Plex Mono for all typography, generous 8px spacing, a warm off‑white canvas, bold accents, and rounded components. It's ideal for analytics and modern web apps.

> Note: Inspired by motherduck.com's overall aesthetic. No copied assets or copy.

---

## Table of Contents

- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Motion & Transitions](#motion--transitions)
- [Shadows & Elevation](#shadows--elevation)
- [Borders & Radii](#borders--radii)
- [Components](#components)
- [Scrollbars](#scrollbars)
- [Accessibility](#accessibility)
- [Design Tokens](#design-tokens)
  - [CSS Variables](#css-variables)
  - [Tokens JSON](#tokens-json)
  - [Tailwind Config Snippet](#tailwind-config-snippet)
- [CSS Reset / Globals](#css-reset--globals)
- [Examples](#examples)
- [Changelog](#changelog)

---

## Color Palette

Foundational (warm, approachable):
- Background Main: `#F4EFEA` (paper-like)
- Surface / Card: `#FFFFFF`
- Cloud Gray: `#F1F1F1` (alt panels, tracks)
- Text Primary: `#383838`

Accents (bold + pastel):
- Blue (Primary CTA): `#007AFF`
- Blue Hover (Darker): `#005FA3`
- Teal: `#21AD93`
- Turquoise: `#20BBAA`
- Bright Yellow: `#FFE100`
- Soft Yellow: `#FFDE00`
- Coral Red: `#FF6E6C`
- Soft Blues: `#6DBEFC`, `#AEDCF8`
- Pastel Pink: `#FFD7D1`
- Aqua: `#79FFFF`
- Scrollbar Thumb: `#888888`

Semantic mapping:
- Info: Blue `#007AFF`
- Success: Teal `#21AD93`
- Warning: Bright Yellow `#FFE100` (ensure dark text)
- Error: Coral `#FF6E6C`
- Border Default: `#D3D3D3` (inputs) or `#E5E5E5` (cards subtle)

Contrast guidance:
- On yellows, use text >= `#383838` and keep body text ≥ AA contrast (4.5:1).
- Use overlays on images/gradients for legibility.

---

## Typography

- Font: IBM Plex Mono everywhere
  - `'IBM Plex Mono', Menlo, Consolas, 'Liberation Mono', monospace`
- Weights: 400 (regular), 600 (semibold), 700 (bold)
- Scale:
  - H1: 2.5rem (40px), 700
  - H2: 2rem (32px), 600
  - H3: 1.5rem (24px), 600
  - Body: 1.125rem (18px), 400
  - Small: 0.875rem (14px), 400
  - Label/Button: 1rem (16px), 700, uppercase
- Line-height:
  - Headings: 1.2
  - Body: 1.5–1.6
- Head include:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  ```
- Content rules:
  - Sentence case for headings.
  - Max line length: 66–80ch (marketing), up to 100–120ch (docs).

---

## Spacing & Layout

- Base unit: 8px
- Scale: 8, 16, 24, 32, 48, 56, 64, 80px
- Card padding: 24px
- Section gap: 70px (mobile), 90px (desktop)
- Containers: 720px (narrow), 1080px (standard), 1280–1440px (wide)
- Grid: 12 columns, 24px gutter desktop / 16px mobile

Header metrics (tokens):
- Header (mobile): 70px
- Header (desktop): 90px
- Eyebrow banner (mobile): 70px
- Eyebrow banner (desktop): 55px

---

## Motion & Transitions

- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Timing: 200ms for hover/focus; 250–300ms for entrances
- Hover: subtle elevation/color; Active: slight press (reduce shadow)
- Reduced motion: honor `prefers-reduced-motion: reduce` (disable non-essential movement)

---

## Shadows & Elevation

- Card: `0 4px 16px rgba(44,51,91,0.07)` (primary)
- Hover card: add `0 8px 24px rgba(44,51,91,0.10)`
- Focus halo: `0 0 0 3px rgba(0,122,255,0.35)`

---

## Borders & Radii

- Cards/Buttons: 16px
- Inputs/Badges: 12px
- Pills: 999px

---

## Components

Cards/Containers:
- bg: `#FFFFFF` (or `#F4EFEA` for alt)
- border: `1px solid #E5E5E5`
- radius: 16px
- padding: 24px
- shadow: `0 4px 16px rgba(44,51,91,0.07)`
- font: IBM Plex Mono

Buttons:
- Primary: bg `#007AFF`, text `#FFFFFF`, radius 16px, px-6 py-2, 700, uppercase
- Hover: `#005FA3`, add small shadow
- Secondary: white bg, border `#D3D3D3`, text `#383838`
- Destructive: bg `#FF6E6C`, text `#FFFFFF`
- Disabled: 50–60% opacity, no elevation

Inputs:
- radius 12px, px-4 py-2
- border `1px solid #D3D3D3`
- bg `#FFFFFF` or `#F7F7F7`
- focus: border `#007AFF`, ring/halo focus visible

Badges/Tags:
- radius 12px (or pill)
- fill: yellow/teal/coral; mono uppercase; small size

Tables:
- row height: 48px (40px dense)
- zebra: `#F9F9F9` / white
- head weight: 600
- hover row: `#F1F1F1`
- grid: 1px `#EAEAEA` horizontal

Code Blocks:
- bg: `#0D1B2A`; border: `#162331`
- font: IBM Plex Mono; size: 14px
- copy button: subtle ghost

Nav/Header:
- sticky; warm bg `#F4EFEA` → add subtle bottom border on scroll
- link spacing: 24px
- active link: underline or bottom bar 2px blue

---

## Scrollbars

- Size: 5px
- Thumb: `#888888`
- Track: `#F1F1F1`

---

## Accessibility

- Contrast: AA for text; on yellows keep ≥18px text or add darker overlay
- Focus: always visible; never remove outlines; use halo
- Reduced motion: respect system preference
- Color independence: don't rely on color alone (icons/labels)
- Keyboard: logical tab order; skip links

---

## Design Tokens

### CSS Variables

```css
:root {
  /* Brand */
  --md-bg: #F4EFEA;
  --md-surface: #FFFFFF;
  --md-cloud: #F1F1F1;

  --md-text: #383838;

  --md-blue: #007AFF;
  --md-blue-hover: #005FA3;
  --md-teal: #21AD93;
  --md-turquoise: #20BBAA;
  --md-yellow: #FFE100;
  --md-yellow-soft: #FFDE00;
  --md-coral: #FF6E6C;
  --md-blue-soft-1: #6DBEFC;
  --md-blue-soft-2: #AEDCF8;
  --md-pink-soft: #FFD7D1;
  --md-aqua: #79FFFF;

  /* Borders */
  --md-border: #D3D3D3;
  --md-border-subtle: #E5E5E5;

  /* Typography */
  --font-mono: "IBM Plex Mono", Menlo, Consolas, "Liberation Mono", monospace;

  --fs-h1: 2.5rem;  /* 40px */
  --fs-h2: 2rem;    /* 32px */
  --fs-h3: 1.5rem;  /* 24px */
  --fs-body: 1.125rem; /* 18px */
  --fs-small: 0.875rem; /* 14px */
  --fs-label: 1rem; /* 16px */

  --lh-heading: 1.2;
  --lh-body: 1.55;

  /* Spacing */
  --space-1: 8px; --space-2: 16px; --space-3: 24px; --space-4: 32px; --space-5: 48px; --space-6: 56px; --space-7: 64px; --space-8: 80px;

  /* Radii */
  --radius-xl: 16px;
  --radius-lg: 12px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-card: 0 4px 16px rgba(44,51,91,0.07);
  --shadow-hover: 0 8px 24px rgba(44,51,91,0.10);
  --shadow-focus: 0 0 0 3px rgba(0,122,255,0.35);

  /* Motion */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --t-fast: 200ms;
  --t-med: 250ms;

  /* Header */
  --header-mobile: 70px;
  --header-desktop: 90px;
  --eyebrow-mobile: 70px;
  --eyebrow-desktop: 55px;
}

/* Example buttons */
.btn {
  font-family: var(--font-mono);
  font-size: var(--fs-label);
  font-weight: 700;
  text-transform: uppercase;
  padding: 10px 16px;
  border-radius: var(--radius-xl);
  border: 1px solid transparent;
  transition: background var(--t-fast) var(--ease), box-shadow var(--t-fast) var(--ease), transform var(--t-fast) var(--ease);
}
.btn-primary { background: var(--md-blue); color: #fff; }
.btn-primary:hover { background: var(--md-blue-hover); box-shadow: var(--shadow-card); }
.btn-secondary { background: #fff; color: var(--md-text); border-color: var(--md-border); }
.btn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }

/* Inputs */
.input {
  font-family: var(--font-mono);
  padding: 10px 14px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--md-border);
  background: #fff;
  transition: border-color var(--t-fast) var(--ease), box-shadow var(--t-fast) var(--ease);
}
.input:focus { border-color: var(--md-blue); box-shadow: var(--shadow-focus); }

/* Cards */
.card {
  background: var(--md-surface);
  border: 1px solid var(--md-border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-3);
  box-shadow: var(--shadow-card);
}
.card:hover { box-shadow: var(--shadow-hover); }
```

### Tokens JSON

```json
{
  "color": {
    "bg": { "main": "#F4EFEA", "surface": "#FFFFFF", "cloud": "#F1F1F1" },
    "text": { "primary": "#383838" },
    "accent": {
      "blue": "#007AFF",
      "blueHover": "#005FA3",
      "teal": "#21AD93",
      "turquoise": "#20BBAA",
      "yellow": "#FFE100",
      "yellowSoft": "#FFDE00",
      "coral": "#FF6E6C",
      "blueSoft1": "#6DBEFC",
      "blueSoft2": "#AEDCF8",
      "pinkSoft": "#FFD7D1",
      "aqua": "#79FFFF"
    },
    "border": { "default": "#D3D3D3", "subtle": "#E5E5E5" }
  },
  "font": {
    "family": { "mono": "IBM Plex Mono" },
    "sizeRem": { "h1": 2.5, "h2": 2, "h3": 1.5, "body": 1.125, "small": 0.875, "label": 1 },
    "lineHeight": { "heading": 1.2, "body": 1.55 },
    "weight": { "regular": 400, "semibold": 600, "bold": 700 }
  },
  "radiusPx": { "xl": 16, "lg": 12, "pill": 999 },
  "shadow": {
    "card": "0 4px 16px rgba(44,51,91,0.07)",
    "hover": "0 8px 24px rgba(44,51,91,0.10)",
    "focus": "0 0 0 3px rgba(0,122,255,0.35)"
  },
  "spacePx": { "1": 8, "2": 16, "3": 24, "4": 32, "5": 48, "6": 56, "7": 64, "8": 80 },
  "headerPx": { "mobile": 70, "desktop": 90, "eyebrowMobile": 70, "eyebrowDesktop": 55 }
}
```

### Tailwind Config Snippet

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        plexmono: ['"IBM Plex Mono"', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace']
      },
      colors: {
        md: {
          bg: '#F4EFEA',
          surface: '#FFFFFF',
          cloud: '#F1F1F1',
          text: '#383838',
          blue: '#007AFF',
          blueHover: '#005FA3',
          teal: '#21AD93',
          turquoise: '#20BBAA',
          yellow: '#FFE100',
          yellowSoft: '#FFDE00',
          coral: '#FF6E6C',
          blueSoft1: '#6DBEFC',
          blueSoft2: '#AEDCF8',
          pinkSoft: '#FFD7D1',
          aqua: '#79FFFF',
          border: '#D3D3D3',
          borderSubtle: '#E5E5E5'
        }
      },
      borderRadius: { xl: '16px', lg: '12px', pill: '999px' },
      boxShadow: {
        card: '0 4px 16px rgba(44,51,91,0.07)',
        hover: '0 8px 24px rgba(44,51,91,0.10)',
        focus: '0 0 0 3px rgba(0,122,255,0.35)'
      },
      transitionTimingFunction: {
        pleasant: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  }
}
```

---

## CSS Reset / Globals

```css
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small,
strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form,
label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
textarea, video, button, input {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: 'IBM Plex Mono', Menlo, Consolas, 'Liberation Mono', monospace;
  vertical-align: baseline;
  text-decoration: none;
}
body {
  line-height: 1.5;
  background-color: #F4EFEA;
  color: #383838;
  min-height: 100vh;
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-thumb { background: #888888; }
::-webkit-scrollbar-track { background: #F1F1F1; }
```

---

## Examples

Tailwind examples:
```html
<button class="bg-[#007aff] hover:bg-[#005fa3] text-white font-plexmono font-bold uppercase rounded-xl px-6 py-2 shadow transition-[background,box-shadow] duration-200">
  Confirm
</button>

<div class="bg-white rounded-xl shadow-card p-6 border border-[#E5E5E5] font-plexmono">
  <h3 class="text-2xl font-bold mb-2">Pulse Instance</h3>
  <p class="text-gray-700">Perfect for analytics tasks</p>
</div>

<input class="bg-white rounded-lg px-4 py-2 border border-[#D3D3D3] focus:border-[#007AFF] focus:outline-none focus:ring-0 font-plexmono" />

<span class="bg-[#FFE100] text-[#383838] rounded-full px-3 py-1 text-xs font-semibold font-plexmono uppercase">HIGHLIGHT</span>
```

Section example:
```html
<section class="bg-[#FF6E6C]/10 py-16 text-center font-plexmono">
  <h2 class="text-4xl font-bold mb-6">Why this system?</h2>
  <p class="text-lg">Cloud-friendly analytics UI patterns with a warm, inviting feel.</p>
</section>
```

---

## Changelog

- 1.1.0 (2025‑11‑11)
  - Added semantic mapping, tokens JSON, Tailwind config, and accessibility guidance.
  - Clarified motion, elevation, and header metrics.
- 1.0.0 (2025‑11‑10)
  - Initial draft based on warm canvas, IBM Plex Mono, and rounded components.

---

Reference: https://motherduck.com (visual inspiration only)
