# Phase 2b: Agents Database & Pages — Implementation Plan

## 1. Install Database Dependencies

- Install `better-sqlite3` as a production dependency
- Install `@types/better-sqlite3` as a dev dependency
- Verify `npm install` completes without errors
- Run `npm run typecheck` — zero errors after install

## 2. Database Directory & Migration Infrastructure

- Create `db/migrations/` directory
- Create `db/migrations/001_create_agents.sql`:
  ```sql
  CREATE TABLE IF NOT EXISTS agents (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    name                 TEXT NOT NULL,
    model_type           TEXT NOT NULL,
    status               TEXT NOT NULL DEFAULT 'active',
    presenting_complaints TEXT,
    created_at           TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  ```
- Create `db/migrate.ts` — reads all `.sql` files from `db/migrations/` in order and executes them against the SQLite file
- Add a `db:migrate` npm script: `tsx db/migrate.ts`
- Run `npm run db:migrate` — confirm `agentclinic.db` is created and the `agents` table exists (verify with `sqlite3 agentclinic.db ".schema"`)

## 3. Database Singleton Module

- Create `src/db.ts`:
  - Opens (or creates) `agentclinic.db` using `better-sqlite3`
  - Exports the `db` instance as a module-level singleton
  - Enables WAL mode (`PRAGMA journal_mode=WAL`) for better concurrency
- Import `db` in a test route to confirm it loads without errors

## 4. TypeScript Types

- Create `src/types.ts`
- Define and export the `Agent` interface:
  ```ts
  export interface Agent {
    id: number;
    name: string;
    model_type: string;
    status: 'active' | 'resting' | 'in-therapy';
    presenting_complaints: string | null;
    created_at: string;
  }
  ```

## 5. Seed Script

- Create `db/seed.ts`:
  - Imports `db` from `src/db.ts`
  - Deletes all existing rows from `agents` (idempotent)
  - Inserts at least 6 fictional agents (see requirements for examples)
- Add a `db:seed` npm script: `tsx db/seed.ts`
- Run `npm run db:seed` — confirm rows appear in the database

## 6. Agent List Route — `/agents`

- Register `GET /agents` in the Hono app
- Query: `SELECT * FROM agents ORDER BY name ASC`
- Render using `Layout` with a responsive card grid:
  - Each card shows: agent name, model type, status badge (colour-coded by status)
  - Cards link to `/agents/:id`
  - CSS: grid with `auto-fill` / `minmax` columns — collapses to 1 column on mobile
- Return 200 with the rendered HTML

## 7. Agent Detail Route — `/agents/:id`

- Register `GET /agents/:id` in the Hono app
- Query: `SELECT * FROM agents WHERE id = ?` using the `:id` param
- If no row found → return 404 with a plain "Agent not found" message (full error pages are Phase 7)
- Render using `Layout` with a detail panel:
  - Fields: Name, Model Type, Status (badge), Presenting Complaints
  - Include a "← Back to Agents" link
  - CSS: two-column detail layout on desktop (label | value), stacked on mobile

## 8. CSS — New Component Styles

Add to `src/static/style.css`:

- **`.agent-grid`** — CSS grid, `repeat(auto-fill, minmax(260px, 1fr))`, gap
- **`.agent-card`** — card with border, shadow, padding, hover lift effect
- **`.status-badge`** — pill shape; colour variants: `active` (teal), `resting` (lavender), `in-therapy` (amber)
- **`.detail-grid`** — two-column label/value grid (desktop), single column (mobile)
- **`.back-link`** — styled ← navigation link

## 9. Add `.gitignore` Entry for DB File

- Ensure `agentclinic.db` is listed in `.gitignore` (the DB file should not be committed)

## 10. Smoke Test & Typecheck

- Run `npm run dev`
- Visit `http://localhost:3000/agents` — confirm the grid renders with seeded agents
- Click an agent card — confirm the detail page renders correctly
- Visit `http://localhost:3000/agents/9999` — confirm a 404 message appears
- Run `npm run typecheck` — zero TypeScript errors
