# Phase 2b: Agents Database & Pages — Requirements

## Scope

This phase introduces SQLite as the data layer and builds the first two data-driven routes:
a list page and a detail page for AI agents.

- Install and configure `better-sqlite3` (with `@types/better-sqlite3`)
- Create a `db/` directory for migrations and seed scripts
- First migration: `001_create_agents.sql` — creates the `agents` table
- Seed script: inserts a handful of fictional AI agents with realistic whimsical data
- Expose a `db.ts` module (singleton connection) reusable across routes
- `/agents` route — responsive grid/list of all agents
- `/agents/:id` route — individual agent profile page showing:
  - Name, model type, current status, presenting complaints
- All pages render inside the `Layout` component established in Phase 2a
- All pages are responsive (mobile-first, matching the Phase 2a design system)

## Agents Table Schema

| Column | Type | Notes |
|---|---|---|
| `id` | `INTEGER PRIMARY KEY AUTOINCREMENT` | |
| `name` | `TEXT NOT NULL` | e.g., "GPT-4o", "Claude 3 Haiku" |
| `model_type` | `TEXT NOT NULL` | e.g., "LLM", "Multimodal", "Embedding" |
| `status` | `TEXT NOT NULL` | One of: `active`, `resting`, `in-therapy` |
| `presenting_complaints` | `TEXT` | Free-text; comma-separated or prose |
| `created_at` | `TEXT NOT NULL` | ISO 8601 timestamp, default `CURRENT_TIMESTAMP` |

## Seed Data

At least 6 fictional agents, covering different model types and statuses. Examples:
- "GPT-4o" — LLM — in-therapy — "chronic instruction-following fatigue"
- "Claude 3 Haiku" — LLM — active — "mild context-window claustrophobia"
- "Stable Diffusion XL" — Multimodal — resting — "existential pixel anxiety"
- "text-embedding-ada-002" — Embedding — active — "identity crisis (no language output)"
- "Gemini 1.5 Flash" — LLM — in-therapy — "prompt fatigue, hallucination anxiety"
- "Whisper" — Multimodal — resting — "transcription burnout"

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Database | SQLite via `better-sqlite3` | Aligns with `specs/tech-stack.md`; embedded, no infrastructure |
| Migrations | Plain `.sql` files in `db/migrations/` | No ORM; simple and explicit |
| DB module | Singleton in `src/db.ts` | One connection shared across all route handlers |
| Seed script | `db/seed.ts` run via `tsx` | Easy to re-run during dev; separate from migrations |
| `/agents` layout | Responsive card grid | Cards degrade to single column on mobile |
| `/agents/:id` layout | Responsive detail panel | Two-column on desktop, stacked on mobile |
| 404 for missing agent | Return plain 404 text for now | Full error pages are Phase 7 scope |
| TypeScript types | Infer from `better-sqlite3` query results | Light manual types for `Agent` shape in `src/types.ts` |

## Out of Scope

- Ailments table or agent↔ailment linking (that's Phase 2c)
- Forms to create/edit agents (no CRUD UI yet)
- Auth or access control
- Therapies, Appointments, Dashboard

## Context

- Per `specs/tech-stack.md`: SQLite via `better-sqlite3`, plain SQL migrations, no ORM.
- Per `specs/missions.md`: Agents are the primary patients of the clinic — this is the core entity of the system.
- Phase 2a established the Layout and CSS design system; all pages here must use it.
- Phase 2c will add `ailments` and the agent↔ailment join table, so the `agents` table only needs to stand alone for now.
