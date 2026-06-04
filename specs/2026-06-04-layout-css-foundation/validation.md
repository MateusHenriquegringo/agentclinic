# Phase 2a: Layout & CSS Foundation — Validation

## Acceptance Criteria

The implementation is considered successful and ready to merge if **all** of the following pass:

---

### 1. Server & Static Files

- [ ] `npm run dev` starts without errors
- [ ] `GET /style.css` returns a `200 OK` with `Content-Type: text/css`
- [ ] `npm run typecheck` completes with **zero TypeScript errors**

---

### 2. Layout Structure

- [ ] Visiting `http://localhost:3000/` renders a full HTML page (not just a text string)
- [ ] The page `<head>` includes:
  - `<meta charset="UTF-8">`
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  - A `<link>` to the Google Font (Inter or Outfit)
  - A `<link rel="stylesheet" href="/style.css">`
  - A `<title>` tag
- [ ] The page `<body>` contains a `<header>`, `<nav>`, `<main>`, and `<footer>` element

---

### 3. Navigation

- [ ] The `<nav>` contains links to: `/` (Home), `/agents`, `/ailments`, `/appointments`, `/dashboard`
- [ ] All nav links are rendered as `<a>` elements (not buttons or spans)

---

### 4. Visual Design

- [ ] The Google Font (Inter or Outfit) is visibly applied to the page body text
- [ ] The header has a styled background (gradient or solid color from the teal/lavender palette) — not the browser default
- [ ] The footer is visually distinct from the main content area

---

### 5. Responsive Behavior

- [ ] At viewport width **320px**: layout is single-column; no horizontal overflow; nav items are readable
- [ ] At viewport width **768px**: layout adapts (e.g., nav links display horizontally or more compactly)
- [ ] At viewport width **1280px**: content is centered with a `max-width` container; not stretched full-width
- [ ] No content is clipped or hidden on any of the above viewport sizes

---

### 6. CSS Design System

- [ ] `style.css` defines CSS custom properties on `:root` for at least: color tokens, spacing tokens, and font-family
- [ ] No inline `style=""` attributes are used in the Layout component (all styling via CSS classes or custom properties)

---

### 7. Home Route Integrity

- [ ] The existing "AgentClinic is open for business" content is still present on `/`
- [ ] The content renders inside `<main>`, wrapped by the full layout

---

## Ready to Merge Checklist

- [ ] All acceptance criteria above are checked
- [ ] No console errors in the browser DevTools
- [ ] PR description references this validation document
