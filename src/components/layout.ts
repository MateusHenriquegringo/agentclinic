import { html } from 'hono/html'
import { Main } from './main'
import { Footer } from './footer'
import { Header } from './header'
import { Nav } from './nav'

export const Layout = (props: { title?: string; children: any; pathname?: string }) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="AgentClinic — a full-service wellness platform for AI agents in need of support." />
      <title>${props.title ? `${props.title} | AgentClinic` : 'AgentClinic'}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      ${Header()}
      ${Nav(props.pathname)}
      ${Main(props.children)}
      ${Footer()}
    </body>
  </html>
`
