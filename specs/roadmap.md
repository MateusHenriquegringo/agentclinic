# Roadmap

Phases are intentionally small — each one is a shippable slice of work, independently reviewable and testable.

---

## Phase 1 — Hello Hono (Complete)
- [x] Install and configure Hono with `tsx` dev server
- [x] Single `/` route returning "AgentClinic is open for business"
- [x] Confirm TypeScript types work end-to-end

## Phase 2 — Layout, Agents & Ailments
- Server-side JSX layout component (header, nav, main, footer)
- Basic CSS (custom properties, reset, typography, responsive design foundation)
- All UIs must be responsive by design (mobile-friendly and desktop-optimized)
- All routes render inside the shared layout
- SQLite database + first migration (`agents` table)
- Seed a handful of fictional agents
- `/agents` page listing all agents (responsive grid/list view)
- `/agents/:id` page showing a single agent's profile (responsive details layout)
  - Name, model type, current status, presenting complaints
- `ailments` table + seed data (e.g., "context-window claustrophobia", "prompt fatigue")
- `/ailments` list page
- Link agents to one or more ailments

## Phase 3 — Therapies Catalog
- `therapies` table + seed data
- `/therapies` list page
- Map ailments → recommended therapies

## Phase 4 — Appointment Booking
- `appointments` table (agent, therapist, datetime, status)
- Form to book an appointment from an agent's detail page (responsive forms)
- Basic validation and confirmation page

## Phase 5 — Staff Dashboard
- `/dashboard` with summary counts: agents, open appointments, ailments in-flight
- Simple table views for staff to manage records (responsive tables / card fallback)
- Mary's dashboard is now real

## Phase 6 — Polish & Accessibility
- Semantic HTML audit
- Keyboard navigation and focus styles

## Phase 7 — Hardening
- Error pages (404, 500)
- Input sanitization on all forms
- Basic logging middleware

---

Later phases (not yet planned): auth, email notifications, therapist profiles, reporting.
