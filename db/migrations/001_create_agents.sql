CREATE TABLE IF NOT EXISTS agents (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  name                  TEXT NOT NULL,
  model_type            TEXT NOT NULL,
  status                TEXT NOT NULL DEFAULT 'active',
  presenting_complaints TEXT,
  created_at            TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
