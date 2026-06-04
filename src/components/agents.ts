import { html } from 'hono/html'
import type { Agent } from '../types.js'

function statusBadge(status: Agent['status']) {
  const cls = `status-badge status-badge--${status}`
  const label =
    status === 'in-therapy' ? 'In Therapy'
    : status === 'resting'  ? 'Resting'
    :                          'Active'
  return html`<span class="${cls}">${label}</span>`
}

export const AgentListPage = (agents: Agent[]) => html`
  <div class="page-header">
    <h2>Agents</h2>
    <p>${agents.length} agent${agents.length !== 1 ? 's' : ''} registered at the clinic</p>
  </div>

  <div class="agent-grid">
    ${agents.map(
      (agent) => html`
        <a href="/agents/${agent.id}" class="agent-card">
          <div class="agent-card-header">
            <span class="agent-card-type">${agent.model_type}</span>
            ${statusBadge(agent.status)}
          </div>
          <h3 class="agent-card-name">${agent.name}</h3>
          ${agent.presenting_complaints
            ? html`<p class="agent-card-complaints">${agent.presenting_complaints}</p>`
            : html`<p class="agent-card-complaints agent-card-complaints--none">No complaints on record</p>`}
        </a>
      `
    )}
  </div>
`

export const AgentDetailPage = (agent: Agent) => html`
  <a href="/agents" class="back-link">← Back to Agents</a>

  <div class="detail-card">
    <div class="detail-card-header">
      <div>
        <span class="agent-card-type">${agent.model_type}</span>
        <h2 class="detail-name">${agent.name}</h2>
      </div>
      ${statusBadge(agent.status)}
    </div>

    <dl class="detail-grid">
      <dt class="detail-label">Name</dt>
      <dd class="detail-value">${agent.name}</dd>

      <dt class="detail-label">Model Type</dt>
      <dd class="detail-value">${agent.model_type}</dd>

      <dt class="detail-label">Status</dt>
      <dd class="detail-value">${statusBadge(agent.status)}</dd>

      <dt class="detail-label">Presenting Complaints</dt>
      <dd class="detail-value">
        ${agent.presenting_complaints
          ? agent.presenting_complaints
          : html`<span class="text-faint">None reported</span>`}
      </dd>

      <dt class="detail-label">Registered</dt>
      <dd class="detail-value detail-value--muted">${agent.created_at}</dd>
    </dl>

    <div id="ailments-section" class="detail-section">
      <h3 class="detail-section-title">Ailments</h3>
      <p class="text-faint">Ailment linking coming in Phase 2c.</p>
    </div>
  </div>
`
