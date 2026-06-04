# Phase 2a: Layout & CSS Foundation — Implementation Plan

## 1. Serve Static Files

- Configure Hono's `serveStatic` middleware to serve files from `src/static/`
- Create the `src/static/` directory
- Verify `GET /style.css` returns the stylesheet (even if empty at first)

## 2. CSS Design System

Create `src/static/style.css` with:

- **Reset**: box-sizing, margin/padding zero, sensible defaults
- **Custom properties** (`:root`): color palette (soft whites, muted teals, lavenders), spacing scale, font-size scale, border-radius tokens, shadow tokens
- **Typography**: load Inter (or Outfit) from Google Fonts via `@import` or `<link>`; set `font-family`, `line-height`, and heading scale
- **Base styles**: `body`, `a`, `ul`, `img` defaults
- **Layout utilities**: `.container` (centered, max-width, horizontal padding), responsive variants

## 3. Layout JSX Component

Create `src/components/Layout.tsx`:

- Accepts `{ title?: string; children: any }` props
- Renders full HTML document: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`
- `<head>` includes: charset, viewport meta, Google Fonts `<link>`, stylesheet `<link>`, `<title>`
- `<body>` renders:
  - `<Header>` — clinic name/logo mark, tagline
  - `<Nav>` — links: Home, Agents, Ailments, Appointments, Dashboard
  - `<main>` — `{children}`
  - `<Footer>` — tagline / small print

## 4. Header, Nav & Footer Sub-components

Create (in same file or separate files under `src/components/`):

- **`Header`**: `<header>` with clinic name styled prominently, a small whimsical sub-tagline
- **`Nav`**: `<nav>` with `<ul>` of `<li><a>` links; highlight active route if possible (use `pathname` from context, or leave static for now)
- **`Footer`**: `<footer>` with copyright line and tagline

## 5. Update Home Route

In `src/index.ts` (or wherever the `/` route lives):

- Import `Layout`
- Wrap the existing response content inside `<Layout title="Home">…</Layout>`
- Ensure the page renders correctly in browser

## 6. CSS — Responsive Layout

Add to `style.css`:

- Mobile-first base styles (single column, full-width nav)
- `@media (min-width: 640px)` — small tablet breakpoint adjustments
- `@media (min-width: 1024px)` — desktop: max-width container, horizontal nav, multi-column support classes

## 7. CSS — Component Styles

Style each layout region:

- **Header**: background teal/lavender gradient, white text, padding
- **Nav**: horizontal flex on desktop, stacked on mobile; hover states on links
- **Main**: `<main>` padding, min-height to push footer down
- **Footer**: subtle background, small text, centered

## 8. Manual Verification

- Run `npm run dev`; open `http://localhost:3000/`
- Resize browser window: confirm layout collapses gracefully to mobile
- Check nav links are present (they may 404 — that is expected)
- Run `npm run typecheck` — zero TypeScript errors
