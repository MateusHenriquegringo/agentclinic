import { html } from 'hono/html'

export const Nav = (pathname: string = '/') => html`
  <nav class="site-nav">
    <ul class="nav-list">
      <li><a href="/" class="${pathname === '/' ? 'nav-link nav-link--active' : 'nav-link'}">Home</a></li>
      <li><a href="/agents" class="${pathname.startsWith('/agents') ? 'nav-link nav-link--active' : 'nav-link'}">Agents</a></li>
      <li><a href="/ailments" class="${pathname.startsWith('/ailments') ? 'nav-link nav-link--active' : 'nav-link'}">Ailments</a></li>
      <li><a href="/appointments" class="${pathname.startsWith('/appointments') ? 'nav-link nav-link--active' : 'nav-link'}">Appointments</a></li>
      <li><a href="/dashboard" class="${pathname.startsWith('/dashboard') ? 'nav-link nav-link--active' : 'nav-link'}">Dashboard</a></li>
    </ul>
  </nav>
`
