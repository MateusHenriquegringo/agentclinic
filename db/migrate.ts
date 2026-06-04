import Database from 'better-sqlite3'
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const DB_PATH = resolve('./agentclinic.db')
const MIGRATIONS_DIR = resolve('./db/migrations')

const db = new Database(DB_PATH)

// Ensure migrations tracking table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS _migrations (
    filename TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`)

// Read and apply all .sql files in order, skipping already-applied ones
const applied = new Set(
  (db.prepare('SELECT filename FROM _migrations').all() as { filename: string }[])
    .map((r) => r.filename)
)

const files = readdirSync(MIGRATIONS_DIR)
  .filter((f) => f.endsWith('.sql'))
  .sort()

for (const file of files) {
  if (applied.has(file)) {
    console.log(`  skip  ${file} (already applied)`)
    continue
  }
  const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf-8')
  db.exec(sql)
  db.prepare('INSERT INTO _migrations (filename) VALUES (?)').run(file)
  console.log(`  apply ${file}`)
}

db.close()
console.log('Migrations complete.')
