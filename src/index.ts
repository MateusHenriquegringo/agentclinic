import { Hono } from 'hono'
import { html } from 'hono/html'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Layout } from './components/layout'

const app = new Hono()

app.use('/style.css', serveStatic({ path: './src/public/style.css' }))

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
      `
    })
  )
})

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`)
})
