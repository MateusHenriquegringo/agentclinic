import { html } from 'hono/html'

export const Header = () => html`
  <header class="site-header">
    <div class="header-inner container">
      <a href="/" class="site-logo">
        <span class="logo-mark">🏥</span>
        <span class="logo-text">AgentClinic</span>
      </a>
      <p class="site-tagline">Because every agent deserves a listening ear</p>
    </div>
  </header>
`