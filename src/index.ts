import { Hono } from 'hono'
import { html } from 'hono/html'
import { serve } from '@hono/node-server'

const app = new Hono()

app.get('/', (c) => {
  return c.html(
    html`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>AgentClinic</title>
        </head>
        <body>
          <h1>AgentClinic</h1>
          <p>AgentClinic is open for business</p>
        </body>
      </html>`
  )
})

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`)
})
