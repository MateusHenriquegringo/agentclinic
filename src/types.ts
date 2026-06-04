export interface Agent {
  id: number
  name: string
  model_type: string
  status: 'active' | 'resting' | 'in-therapy'
  presenting_complaints: string | null
  created_at: string
}

export interface Ailment {
  id: number
  name: string
  description: string | null
  created_at: string
}
