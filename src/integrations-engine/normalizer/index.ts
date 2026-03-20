import { NormalizedData, IntegrationProvider } from '@/types/integrations'
import { Mappers } from '../mapper'

export function normalizeData(
  provider: IntegrationProvider,
  event: string,
  tenantId: string,
  rawData: any,
): NormalizedData {
  const mapper = Mappers[provider]
  const mappedData = mapper ? mapper(rawData) : rawData

  return {
    source: provider,
    event,
    tenant_id: tenantId,
    data: mappedData,
    received_at: new Date().toISOString(),
  }
}
