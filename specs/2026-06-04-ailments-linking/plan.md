# Phase 2c: Ailments & Agent Linking — Implementation Plan

## 1. Enable Foreign Key Enforcement

- In `src/db.ts`, after opening the database connection, add:
  ```ts
  db.pragma('foreign_keys = ON');
  ```
- This ensures referential integrity on all join table inserts

## 2. Ailments Migration

- Create `db/migrations/002_create_ailments.sql`:
  ```sql
  CREATE TABLE IF NOT EXISTS ailments (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  ```
- Run `npm run db:migrate` — confirm the `ailments` table is created

## 3. Agent–Ailment Join Table Migration

- Create `db/migrations/003_create_agent_ailments.sql`:
  ```sql
  CREATE TABLE IF NOT EXISTS agent_ailments (
    agent_id   INTEGER NOT NULL REFERENCES agents(id),
    ailment_id INTEGER NOT NULL REFERENCES ailments(id),
    PRIMARY KEY (agent_id, ailment_id)
  );
  ```
- Run `npm run db:migrate` — confirm the `agent_ailments` table is created
- Verify re-running migrations is still idempotent

## 4. TypeScript Types

- In `src/types.ts`, add and export:
  ```ts
  export interface Ailment {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
  }
  ```

## 5. Extend Seed Script

- In `db/seed.ts`, after agents are inserted:
  - Delete all rows from `agent_ailments`, then `ailments` (respecting FK order)
  - Insert at least 6 ailments (see requirements for examples)
  - Insert agent↔ailment associations: each agent gets 1–3 ailments matching their presenting complaints
- Run `npm run db:seed` — confirm ailments and associations are present in the database

## 6. Ailments List Route — `/ailments`

- Register `GET /ailments` in the Hono app
- Query: `SELECT * FROM ailments ORDER BY name ASC`
- Render using `Layout` with a simple list or card grid:
  - Each item shows: ailment name, short description (truncated if long)
  - CSS: same `.agent-grid` / card pattern from Phase 2b, or a styled `<ul>` list
- Return 200 with the rendered HTML

## 7. Update Agent Detail Page — Show Linked Ailments

- In the `/agents/:id` handler, add a second query:
  ```sql
  SELECT a.* FROM ailments a
  JOIN agent_ailments aa ON aa.ailment_id = a.id
  WHERE aa.agent_id = ?
  ```
- Pass the resulting ailments array to the detail page component
- Render ailments as a tag/pill list below the existing agent fields
- If the agent has no linked ailments, render "No ailments on record"

## 8. CSS — Ailment-Specific Styles

Add to `src/static/style.css`:

- **`.ailment-tag`** — pill/chip shape; muted lavender background, dark text; small font size
- **`.ailment-tag-list`** — flex wrap container for multiple tags
- **`.ailment-card`** — reuse or extend `.agent-card` styles for the ailments list page

## 9. Smoke Test & Typecheck

- Run `npm run dev`
- Visit `http://localhost:3000/ailments` — confirm list renders with seeded ailments
- Visit `http://localhost:3000/agents/1` — confirm the ailments tag list appears under the agent's details
- Visit an agent with no ailments (if any) — confirm "No ailments on record" message appears
- Run `npm run typecheck` — zero TypeScript errors
