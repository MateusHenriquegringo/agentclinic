# Phase 2c: Ailments & Agent Linking — Validation

## Acceptance Criteria

The implementation is considered successful and ready to merge if **all** of the following pass:

---

### 1. Typecheck

- [ ] `npm run typecheck` completes with **zero TypeScript errors**
- [ ] `Ailment` type is exported from `src/types.ts`

---

### 2. Migrations

- [ ] Running `npm run db:migrate` after Phase 2b creates the `ailments` and `agent_ailments` tables without errors
- [ ] Re-running `npm run db:migrate` is **idempotent** — no errors on re-run
- [ ] `ailments` table has columns: `id`, `name`, `description`, `created_at`
- [ ] `agent_ailments` table has columns: `agent_id`, `ailment_id` with a composite primary key
- [ ] Foreign key pragma is enabled in `src/db.ts` (`PRAGMA foreign_keys = ON`)

---

### 3. Seed Data

- [ ] Running `npm run db:seed` completes without errors
- [ ] At least **6 ailments** are present in the database after seeding
- [ ] At least **one agent↔ailment association** exists per seeded agent
- [ ] Re-running `npm run db:seed` is idempotent — no duplicate rows, no FK errors

---

### 4. `/ailments` List Page

- [ ] `GET /ailments` returns HTTP `200`
- [ ] The page renders inside the shared `Layout` (header, nav, main, footer present)
- [ ] All seeded ailments are listed
- [ ] Each ailment displays its name and description (or a truncated version)
- [ ] At viewport **320px**: list/cards display in a single column with no horizontal overflow
- [ ] At viewport **1024px**: list/cards display in a multi-column layout

---

### 5. Agent Detail Page — Ailments Section

- [ ] `GET /agents/1` (a valid agent with linked ailments) renders ailment names as tags/pills
- [ ] The ailment tags appear visually distinct from the main detail fields
- [ ] Visiting an agent with no linked ailments shows a "No ailments on record" message (or equivalent)
- [ ] Ailment tags do **not** link to `/ailments/:id` (that's Phase 3 scope)

---

### 6. Foreign Key Integrity

- [ ] Attempting to insert an `agent_ailments` row with a non-existent `agent_id` raises a SQLite error (confirms FKs are enforced)
- [ ] Attempting to insert an `agent_ailments` row with a non-existent `ailment_id` raises a SQLite error

---

### 7. CSS — Ailment Tags

- [ ] Ailment tags render as pill/chip shapes (rounded, padded)
- [ ] Tags use the lavender colour token from the CSS design system
- [ ] Tags wrap correctly when an agent has multiple ailments on narrow viewports

---

## Ready to Merge Checklist

- [ ] All acceptance criteria above are checked
- [ ] No unhandled exceptions visible in the server console during normal navigation
- [ ] No console errors in browser DevTools during normal navigation
- [ ] PR description references this validation document
- [ ] Phase 2 (2a + 2b + 2c) is fully complete — roadmap can be updated to mark Phase 2 as done
