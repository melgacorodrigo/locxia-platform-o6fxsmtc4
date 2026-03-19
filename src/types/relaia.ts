export type RelaiaState =
  | 'START'
  | 'IDENTIFY'
  | 'QUALIFY'
  | 'COLLECT_DOCS'
  | 'CREDIT_CHECK'
  | 'RISK_REVIEW'
  | 'HUMAN_OVERRIDE'
  | 'WAITING_HUMAN'
  | 'HUMAN_RESOLVED'
  | 'CONTRACT_STAGE'
  | 'FINALIZATION'
  | 'DONE'

export interface RelaiaMessage {
  id: string
  thread_id: string
  sender: 'user' | 'ai' | 'human' | 'system'
  text: string
  timestamp: string
}

export interface RelaiaThread {
  id: string
  tenant_id: string
  client_id: string
  client_name: string
  state: RelaiaState
  messages: RelaiaMessage[]
  urgency: 'low' | 'medium' | 'high'
  updated_at: string
}

export interface HumanTask {
  id: string
  thread_id: string
  reason: string
  status: 'pending' | 'resolved'
  created_at: string
}

export interface RelaiaLog {
  id: string
  thread_id: string
  time: string
  action: string
  result: string
  confidence: string
  type: 'LOGS_RELAIA' | 'LOGS_IA_DECISIONS' | 'LOGS_WEBHOOKS'
}
