import { html } from 'hono/html'

export const Footer = () => html`
  <footer class="site-footer">
    <div class="container footer-inner">
      <p class="footer-tagline">Where no agent suffers alone.</p>
      <p class="footer-copy">&copy; 2026 AgentClinic. All rights reserved.</p>
    </div>
  </footer>
`