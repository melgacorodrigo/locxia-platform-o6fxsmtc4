export type UserRole = 'admin' | 'gestor' | 'atendente' | 'analista_fialo' | 'suporte' | 'IA'

export interface BaseEntity {
  id: string
  tenant_id: string
  created_at: string
  updated_at?: string
  created_by?: string
  updated_by?: string
}

// Multi-tenant core
export interface Tenant {
  id: string
  name: string
  document: string
  active: boolean
  created_at: string
}
export interface TenantSettings extends BaseEntity {
  crypto_key: string
  webhook_secret: string
  config: Record<string, any>
}
export interface TenantUser extends BaseEntity {
  user_id: string
  role: UserRole
}

// People entities
export interface User extends BaseEntity {
  email: string
  role: UserRole
}
export interface Pessoa extends BaseEntity {
  name: string
  document: string
  type: string
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
export interface Locador extends Pessoa {}
export interface Locatario extends Pessoa {}
export interface Comprador extends Pessoa {}
export interface Proprietario extends Pessoa {}
export interface Corretor extends Pessoa {
  creci?: string
}

// Property entities
export interface Imovel extends BaseEntity {
  address: string
  type: 'apartment' | 'house' | 'commercial'
  value: number
  status: 'available' | 'rented' | 'maintenance'
}
export interface ImovelCaracteristica extends BaseEntity {
  imovel_id: string
  key: string
  value: string
}
export interface ImovelEndereco extends BaseEntity {
  imovel_id: string
  street: string
  city: string
  state: string
  zip_code: string
}
export interface ImovelFoto extends BaseEntity {
  imovel_id: string
  url: string
}
export interface ImovelStatusHist extends BaseEntity {
  imovel_id: string
  status: string
}
export interface ImovelPrecificacao extends BaseEntity {
  imovel_id: string
  price: number
}
export interface ImovelContratoAtual extends BaseEntity {
  imovel_id: string
  contrato_id: string
}

// Document entities
export interface Documento extends BaseEntity {
  entity_type: 'cliente' | 'imovel' | 'contrato'
  entity_id: string
  file_url: string
  status: 'pending' | 'approved' | 'rejected'
}
export interface DocumentoVersionado extends Documento {
  version: number
}
export interface DocumentoValidacao extends BaseEntity {
  documento_id: string
  is_valid: boolean
}
export interface DocumentoOrigem extends BaseEntity {
  documento_id: string
  origin: 'API' | 'upload' | 'IA'
}
export interface DocumentoTipificado extends BaseEntity {
  documento_id: string
  type: string
}

// Contract entities
export interface Contrato extends BaseEntity {
  imovel_id: string
  locatario_id: string
  locador_id: string
  start_date: string
  end_date: string
  value: number
  status: 'active' | 'terminated' | 'pending'
}
export interface ContratoEvento extends BaseEntity {
  contrato_id: string
  event_type: string
}
export interface Minuta extends BaseEntity {
  contrato_id: string
  content: string
}
export interface Anexo extends BaseEntity {
  contrato_id: string
  url: string
}
export interface Renovacao extends BaseEntity {
  contrato_id: string
  new_end_date: string
}
export interface Reajuste extends BaseEntity {
  contrato_id: string
  new_value: number
}
export interface Rescisao extends BaseEntity {
  contrato_id: string
  reason: string
}

// Credit (FIALO) Entities
export interface Credito extends BaseEntity {
  cliente_id: string
  score: string
  approved_value: number
  status: 'analyzing' | 'approved' | 'denied'
}
export interface CreditRequest extends BaseEntity {
  cliente_id: string
  requested_amount: number
}
export interface CreditScore extends BaseEntity {
  cliente_id: string
  score_value: number
}
export interface CreditDecision extends BaseEntity {
  request_id: string
  decision: 'approved' | 'rejected'
}
export interface CreditEngineLog extends BaseEntity {
  request_id: string
  log_data: string
}
export interface ParceiroCredito extends BaseEntity {
  name: string
  api_key: string
}

// Financial Entities
export interface Financeiro extends BaseEntity {
  contrato_id: string
  type: 'receivable' | 'payable'
  amount: number
  due_date: string
  status: 'pending' | 'paid' | 'overdue'
}
export interface FinanceiroTransacao extends Financeiro {}
export interface FinanceiroSplit extends BaseEntity {
  transacao_id: string
  amount: number
  recipient_id: string
}
export interface FinanceiroRepasse extends BaseEntity {
  transacao_id: string
  status: string
}
export interface FinanceiroCobranca extends BaseEntity {
  transacao_id: string
  method: string
}
export interface FinanceiroInadimplenciaHist extends BaseEntity {
  cliente_id: string
  amount: number
}

// RelAiA Entities
export interface Interacao extends BaseEntity {
  lead_id?: string
  cliente_id?: string
  channel: 'whatsapp' | 'email' | 'call'
  content: string
}
export interface EventoRelaia extends BaseEntity {
  event_type: 'classification' | 'orchestration' | 'decision'
  confidence: number
  decision_log: string
  payload: Record<string, any>
}
export interface RelaiaThread extends BaseEntity {
  client_id: string
  state: string
}
export interface RelaiaMensagem extends BaseEntity {
  thread_id: string
  content: string
}
export interface RelaiaEvento extends EventoRelaia {
  thread_id: string
}
export interface RelaiaStateMachine extends BaseEntity {
  thread_id: string
  current_state: string
}
export interface RelaiaHumanOverride extends BaseEntity {
  thread_id: string
  user_id: string
}
export interface RelaiaTimeline extends BaseEntity {
  thread_id: string
  events: any[]
}

// Audit/Logging
export interface Auditoria extends BaseEntity {
  user_id?: string
  action: string
  target_entity?: string
  valor_antes?: any
  valor_depois?: any
  ip_origin?: string
  details?: Record<string, any>
  payload?: any
  metadata?: any
}
export interface LogIa extends BaseEntity {
  thread_id: string
  decision: string
  reasoning_context: string
  token_usage: number
  confidence: number
}
export interface LogHumanOverride extends BaseEntity {
  thread_id: string
  user_id: string
  reason: string
}
export interface SecurityAlert extends BaseEntity {
  type: 'FAILED_LOGIN' | 'CROSS_TENANT_ATTEMPT' | 'FRAUD_SUSPICION' | 'RATE_LIMIT_EXCEEDED'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  ip_origin: string
  resolved: boolean
}
export interface LogsIa extends Auditoria {}
export interface LogsIntegracao extends Auditoria {}
export interface LogsWebhook extends Auditoria {}
