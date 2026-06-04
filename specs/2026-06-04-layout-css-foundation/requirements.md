# Phase 2a: Layout & CSS Foundation — Requirements

## Scope

This phase establishes the shared visual shell that every future page will render inside.
No data, no database, no new routes — purely structure and style.

- Create a shared `Layout` JSX component (header, nav, main, footer)
- Build a comprehensive CSS design system using custom properties (variables) for colors, spacing, and typography
- Load a Google Font (Inter or Outfit) via `<link>` in the layout `<head>`
- Apply a **mobile-first responsive** strategy — single column on small screens, expanding to multi-column layouts on wider viewports
- Update the existing `/` home route to render inside the new layout (keeping content minimal: hello message only)
- Nav includes links to: Home (`/`), Agents (`/agents`), Ailments (`/ailments`), Appointments (`/appointments`), Dashboard (`/dashboard`) — even if those routes don't exist yet (they may 404)
- All static CSS is served as plain CSS files; no preprocessors or build step

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Phase split | 2a / 2b / 2c | Phase 2 is too large for a single reviewable slice; this phase focuses only on layout and CSS foundation |
| CSS architecture | CSS custom properties only | Portable, maintainable, no preprocessors; aligns with `specs/tech-stack.md` |
| Responsive strategy | Mobile-first | Single column → multi-column via `min-width` media queries |
| Typography | Google Font via `<link>` (Inter or Outfit) | Modern, readable, premium feel over system fonts |
| Visual theme | Whimsical-clinical | Soft whites, muted teals and lavenders — wellness spa meets hospital |
| Home page update | Wrap existing route in layout | Update `/` to use the `Layout` component; keep content minimal |
| Nav links | All four future routes included | `Agents`, `Ailments`, `Appointments`, `Dashboard` as placeholder links |
| CSS file location | `src/static/style.css` | Served by Hono's static file middleware |

## Out of Scope

- SQLite / any database setup (that's Phase 2b)
- Any new routes beyond `/` (that's Phase 2b and 2c)
- Vitest / testing setup
- ESLint / Prettier configuration
- Therapies, Appointments, or Dashboard content

## Context

- Per `specs/missions.md`: AgentClinic is whimsical but professional — AI agents need support, staff need a clean interface. Mary really wants a nice dashboard (coming in Phase 5).
- Per `specs/tech-stack.md`: Server-side TypeScript with Hono JSX; plain CSS with custom properties; no React, no build step for styles.
- Phase 1 established Hono running on Node.js with a working `/` route. This phase wraps that in a proper UI shell.
- The layout established here will be the foundation for every page in Phases 2b through 7.
