# Phase 2b: Agents Database & Pages — Validation

## Acceptance Criteria

The implementation is considered successful and ready to merge if **all** of the following pass:

---

### 1. Dependencies & Typecheck

- [ ] `npm install` completes with no errors
- [ ] `npm run typecheck` completes with **zero TypeScript errors**
- [ ] `better-sqlite3` and `@types/better-sqlite3` appear in `package.json`

---

### 2. Database & Migrations

- [ ] Running `npm run db:migrate` creates `agentclinic.db` without errors
- [ ] The `agents` table exists with columns: `id`, `name`, `model_type`, `status`, `presenting_complaints`, `created_at`
- [ ] Re-running `npm run db:migrate` is **idempotent** — no errors, no duplicate tables
- [ ] `agentclinic.db` is listed in `.gitignore` and not tracked by git

---

### 3. Seed Data

- [ ] Running `npm run db:seed` completes without errors
- [ ] At least **6 agents** are present in the database after seeding
- [ ] Re-running `npm run db:seed` is idempotent — no duplicate rows
- [ ] Each agent has a non-null `name`, `model_type`, and `status`

---

### 4. `/agents` List Page

- [ ] `GET /agents` returns HTTP `200`
- [ ] The page renders inside the shared `Layout` (header, nav, main, footer present)
- [ ] All seeded agents are listed on the page
- [ ] Each agent entry displays: name, model type, status badge
- [ ] Each entry links to `/agents/:id` for that agent
- [ ] At viewport **320px**: cards display in a single column with no horizontal overflow
- [ ] At viewport **1024px**: cards display in a multi-column grid

---

### 5. `/agents/:id` Detail Page

- [ ] `GET /agents/1` (a valid ID) returns HTTP `200`
- [ ] The page renders inside the shared `Layout`
- [ ] The page displays: Name, Model Type, Status (badge), Presenting Complaints
- [ ] A "← Back to Agents" link is present and navigates to `/agents`
- [ ] At viewport **320px**: detail fields are stacked (single column)
- [ ] At viewport **1024px**: detail fields display in a two-column (label | value) layout

---

### 6. 404 Handling

- [ ] `GET /agents/9999` (non-existent ID) returns HTTP `404`
- [ ] The response body contains a readable "not found" message (does not crash the server)

---

### 7. Status Badge Styles

- [ ] `active` status renders with a visually distinct style (e.g., teal)
- [ ] `resting` status renders with a visually distinct style (e.g., lavender)
- [ ] `in-therapy` status renders with a visually distinct style (e.g., amber)

---

## Ready to Merge Checklist

- [ ] All acceptance criteria above are checked
- [ ] No unhandled exceptions visible in the server console during normal navigation
- [ ] No console errors in browser DevTools during normal navigation
- [ ] PR description references this validation document
