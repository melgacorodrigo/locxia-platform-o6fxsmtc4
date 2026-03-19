export interface BaseEntity {
  id: string
  tenant_id: string
  created_at: string
}

export interface Tenant {
  id: string
  name: string
  document: string
  active: boolean
  created_at: string
}

export interface User extends BaseEntity {
  email: string
  role: 'admin' | 'manager' | 'broker'
}

export interface Lead extends BaseEntity {
  name: string
  phone: string
  status: 'new' | 'contacted' | 'qualified' | 'lost'
}

export interface Cliente extends BaseEntity {
  type: 'locador' | 'locatario' | 'fiador'
  name: string
  document: string
}

export interface Imovel extends BaseEntity {
  address: string
  type: 'apartment' | 'house' | 'commercial'
  value: number
  status: 'available' | 'rented' | 'maintenance'
}

export interface Documento extends BaseEntity {
  entity_type: 'cliente' | 'imovel' | 'contrato'
  entity_id: string
  file_url: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface Contrato extends BaseEntity {
  imovel_id: string
  locatario_id: string
  locador_id: string
  start_date: string
  end_date: string
  value: number
  status: 'active' | 'terminated' | 'pending'
}

export interface Credito extends BaseEntity {
  cliente_id: string
  score: string
  approved_value: number
  status: 'analyzing' | 'approved' | 'denied'
}

export interface Financeiro extends BaseEntity {
  contrato_id: string
  type: 'receivable' | 'payable'
  amount: number
  due_date: string
  status: 'pending' | 'paid' | 'overdue'
}

export interface Interacao extends BaseEntity {
  lead_id?: string
  cliente_id?: string
  channel: 'whatsapp' | 'email' | 'call'
  content: string
}

export interface Auditoria extends BaseEntity {
  user_id: string
  action: string
  details: Record<string, any>
}

export interface EventoRelaia extends BaseEntity {
  event_type: 'classification' | 'orchestration' | 'decision'
  confidence: number
  decision_log: string
  payload: Record<string, any>
}
