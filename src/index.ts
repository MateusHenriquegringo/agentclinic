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
      title: 'AgentClinic',
      children: html`
        <h2>Welcome</h2>
        <p>AgentClinic is open for business</p>
      `
    })
  )
})

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`)
})
