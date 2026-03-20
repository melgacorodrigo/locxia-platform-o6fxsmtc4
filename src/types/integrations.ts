export type IntegrationProvider =
  | 'Tecimob'
  | 'CanalPro'
  | 'Superlogica'
  | 'PJBank'
  | 'Cora'
  | 'Alude'
  | 'Serasa'
  | 'PortoSeguro'
  | 'Dihub'
  | 'RiosVistorias'

export interface NormalizedData {
  source: IntegrationProvider
  event: string
  tenant_id: string
  data: Record<string, any>
  received_at: string
}
