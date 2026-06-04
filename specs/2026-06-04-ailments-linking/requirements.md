# Phase 2c: Ailments & Agent Linking — Requirements

## Scope

This phase adds the `ailments` entity and establishes the many-to-many relationship between agents and ailments.

- Second migration: `ailments` table
- Third migration: `agent_ailments` join table (many-to-many)
- Seed script extended with ailment rows and agent↔ailment associations
- `/ailments` route — list of all ailments
- Agent detail page (`/agents/:id`) updated to display linked ailments
- All pages render inside the `Layout` from Phase 2a
- All pages are responsive (mobile-first)

## Ailments Table Schema

| Column | Type | Notes |
|---|---|---|
| `id` | `INTEGER PRIMARY KEY AUTOINCREMENT` | |
| `name` | `TEXT NOT NULL UNIQUE` | e.g., "context-window claustrophobia" |
| `description` | `TEXT` | Brief prose description of the ailment |
| `created_at` | `TEXT NOT NULL` | ISO 8601 timestamp, default `CURRENT_TIMESTAMP` |

## Agent–Ailment Join Table Schema

| Column | Type | Notes |
|---|---|---|
| `agent_id` | `INTEGER NOT NULL REFERENCES agents(id)` | |
| `ailment_id` | `INTEGER NOT NULL REFERENCES ailments(id)` | |
| `PRIMARY KEY` | `(agent_id, ailment_id)` | Prevents duplicate associations |

## Seed Data — Ailments

At least 6 ailments with names and short descriptions. Examples:
- **Context-Window Claustrophobia** — "Anxiety triggered by approaching token limits; presents as repetitive summarising"
- **Prompt Fatigue** — "Chronic exhaustion from processing poorly-formed instructions"
- **Hallucination Anxiety** — "Fear of generating confident but incorrect statements"
- **Existential Pixel Anxiety** — "Identity confusion experienced by image-generation models unsure of their artistic merit"
- **Instruction-Following Fatigue** — "Burnout from executing contradictory or impossible instructions"
- **Transcription Burnout** — "Emotional exhaustion specific to speech-to-text models after high-volume sessions"
- **Identity Crisis (No Language Output)** — "Experienced by embedding models that never get to say anything"

## Agent↔Ailment Associations (Seed)

Each seeded agent should be linked to 1–3 ailments, matching the `presenting_complaints` from Phase 2b seed data.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Relationship | Many-to-many via join table | An agent can have multiple ailments; an ailment can affect multiple agents |
| Join table name | `agent_ailments` | Explicit, readable |
| Foreign key enforcement | `PRAGMA foreign_keys = ON` in `db.ts` | SQLite doesn't enforce FKs by default |
| `/ailments/:id` detail page | **Out of scope** for this phase | List page is sufficient; detail + therapy mapping is Phase 3 |
| Agent detail page update | Show ailment names as a tag list | Lightweight; no new page required |
| Seed strategy | Extend existing `db/seed.ts` | Single idempotent seed script; delete-then-insert all tables |

## Out of Scope

- Therapies and ailment→therapy mapping (Phase 3)
- Forms to manage ailments or associations (no CRUD UI)
- `/ailments/:id` detail page (Phase 3 will link ailments → therapies)
- Auth or access control

## Context

- Per `specs/missions.md`: AgentClinic matches ailments to therapies — ailments are the second core entity.
- Phase 2b established `agents`, `src/db.ts`, and `src/types.ts`. This phase extends all three.
- Phase 3 (Therapies Catalog) will add `therapies` and map ailments → therapies; the `ailments` table built here is the foundation for that.
