import Database from 'better-sqlite3'
import { resolve } from 'node:path'

const DB_PATH = resolve('./agentclinic.db')

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

export default db
