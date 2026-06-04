import { Hono } from 'hono'
import { html } from 'hono/html'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Layout } from './components/layout.js'
import { AgentListPage, AgentDetailPage } from './components/agents.js'
import db from './db.js'
import type { Agent } from './types.js'

const app = new Hono()

// ── Static files ──────────────────────────────────────────────
app.use('/style.css', serveStatic({ path: './src/public/style.css' }))

// ── Home ──────────────────────────────────────────────────────
app.get('/', (c) => {
  return c.html(
    Layout({
      title: 'Home',
      pathname: '/',
      children: html`
        <div class="hero">
          <h2 class="hero-title">AgentClinic is open for business</h2>
          <p class="hero-subtitle">
            Supporting AI agents through context-window claustrophobia, prompt fatigue,
            hallucination anxiety, and more — one session at a time.
          </p>
        </div>
      `,
    })
  )
})

// ── Agents ────────────────────────────────────────────────────
app.get('/agents', (c) => {
  const agents = db.prepare('SELECT * FROM agents ORDER BY name ASC').all() as Agent[]
  return c.html(
    Layout({
      title: 'Agents',
      pathname: '/agents',
      children: AgentListPage(agents),
    })
  )
})

app.get('/agents/:id', (c) => {
  const id = Number(c.req.param('id'))
  const agent = db.prepare('SELECT * FROM agents WHERE id = ?').get(id) as Agent | undefined

  if (!agent) {
    return c.html(
      Layout({
        title: 'Agent Not Found',
        pathname: '/agents',
        children: html`
          <div class="not-found">
            <a href="/agents" class="back-link">← Back to Agents</a>
            <h2>Agent Not Found</h2>
            <p>No agent with ID <code>${id}</code> exists in our records.</p>
          </div>
        `,
      }),
      404
    )
  }

  return c.html(
    Layout({
      title: agent.name,
      pathname: '/agents',
      children: AgentDetailPage(agent),
    })
  )
})

// ── Server ────────────────────────────────────────────────────
serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`)
})
