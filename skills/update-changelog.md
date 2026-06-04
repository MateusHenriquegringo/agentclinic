# Skill: Update Changelog

This skill details the procedure to maintain and update the `CHANGELOG.md` file in the root of the project. This skill must be manually invoked and executed before merging any branches or completing a phase of work.

## Objective
Maintain a chronological record of changes grouped by date under `CHANGELOG.md` in the project root.

---

## Execution Steps

### Step 1: Run the Automated script
To automatically extract git history and merge new commits:
```bash
npm run changelog
```
This script will parse Git commits, detect dates, read the existing [CHANGELOG.md](file:///home/mateusderossi/Documents/personal/agentclinic/CHANGELOG.md), and append/merge new entries under their respective dates.

If you prefer to perform it manually, follow Step 2.

### Step 2: Manual Verify / Initialize (Fallback)
Examine the git log to identify new commits that have not yet been recorded in `CHANGELOG.md`.
Run the following command to get the commits from today (or since the last update):
```bash
git log --since="midnight" --date=short --format="%ad: %s"
```
Or to get all commits that are not yet referenced in the file.

### Step 3: Format and Update the File
1. Open [CHANGELOG.md](file:///home/mateusderossi/Documents/personal/agentclinic/CHANGELOG.md).
2. For each date containing new changes:
   - If the date heading already exists (e.g., `## YYYY-MM-DD`), append the new bullet points under it.
   - If the date heading does not exist, create it at the top of the changelog (below the main `# Changelog` title) and add the bullet points.
3. Clean up the commit messages to be human-readable, professional, and clear. Avoid duplicate entries.

---

## Verification
1. Ensure the file compiles with clean Markdown format.
2. Confirm all changes from the current branch or phase are correctly reflected under the correct date.
