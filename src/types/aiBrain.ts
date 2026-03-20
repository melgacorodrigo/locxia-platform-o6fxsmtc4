export type InsightSeverity = 'Low' | 'Medium' | 'High' | 'Critical'

export type InsightCategory =
  | 'operacional'
  | 'financeiro'
  | 'credito'
  | 'imobiliario'
  | 'seguranca'
  | 'geral'

export interface Insight {
  id: string
  tenant_id: string
  title: string
  description: string
  severity: InsightSeverity
  category: InsightCategory
  recommendation: string
  timestamp: string
  isRead: boolean
}

export interface DecisionLog {
  id: string
  event: string
  action_taken: string
  reasoning: string
  timestamp: string
}
