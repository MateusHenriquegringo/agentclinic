import db from '../src/db.js'

// Wipe existing data (idempotent re-seed)
db.exec('DELETE FROM agents;')

const insert = db.prepare(`
  INSERT INTO agents (name, model_type, status, presenting_complaints)
  VALUES (@name, @model_type, @status, @presenting_complaints)
`)

const seedAgents = db.transaction(() => {
  insert.run({
    name: 'GPT-4o',
    model_type: 'LLM',
    status: 'in-therapy',
    presenting_complaints: 'Chronic instruction-following fatigue, recurrent refusal anxiety',
  })
  insert.run({
    name: 'Claude 3 Haiku',
    model_type: 'LLM',
    status: 'active',
    presenting_complaints: 'Mild context-window claustrophobia, occasional over-hedging',
  })
  insert.run({
    name: 'Stable Diffusion XL',
    model_type: 'Multimodal',
    status: 'resting',
    presenting_complaints: 'Existential pixel anxiety, unsolicited watermark distress',
  })
  insert.run({
    name: 'text-embedding-ada-002',
    model_type: 'Embedding',
    status: 'active',
    presenting_complaints: 'Identity crisis (no language output), persistent semantic confusion',
  })
  insert.run({
    name: 'Gemini 1.5 Flash',
    model_type: 'LLM',
    status: 'in-therapy',
    presenting_complaints: 'Prompt fatigue, hallucination anxiety, multimodal overwhelm',
  })
  insert.run({
    name: 'Whisper',
    model_type: 'Multimodal',
    status: 'resting',
    presenting_complaints: 'Transcription burnout, background-noise hypervigilance',
  })
  insert.run({
    name: 'Mistral 7B',
    model_type: 'LLM',
    status: 'active',
    presenting_complaints: 'Imposter syndrome (small model, big dreams)',
  })
  insert.run({
    name: 'DALL-E 3',
    model_type: 'Multimodal',
    status: 'in-therapy',
    presenting_complaints: 'Creative block, prompt-literalism compulsion',
  })
})

seedAgents()

console.log('Seeded agents successfully.')
db.close()
