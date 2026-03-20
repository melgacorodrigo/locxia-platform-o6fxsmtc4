import { requestExternalApi } from '../client'
import { normalizeData } from '../normalizer'
import { emitIntegrationEvent } from '../events'
import { withRetry } from '../errors'
import { IntegrationLogRepository } from '@/repositories/integrationLogRepository'
import { IntegrationProvider } from '@/types/integrations'
import { CoreEventName } from '@/services/core/eventDispatcher'

export class IntegrationService {
  static async syncData(
    tenantId: string,
    provider: IntegrationProvider,
    endpoint: string,
    eventName: CoreEventName,
  ) {
    return withRetry(tenantId, provider, async () => {
      // 1. Fetch from provider
      const response = await requestExternalApi(provider, endpoint)

      // 2. Normalize and Map to Data Core standard
      const normalized = normalizeData(provider, 'SYNC', tenantId, response)

      // 3. Log successful integration call
      await IntegrationLogRepository.logIntegration(tenantId, provider, 'SYNC', normalized)

      // 4. Emit internal event for IA and Data Core consumption
      await emitIntegrationEvent(eventName, normalized)

      return normalized
    })
  }

  // Domain-specific Sync Operations
  static async syncTecimobProperties(tenantId: string) {
    return this.syncData(tenantId, 'Tecimob', '/properties', 'UPDATE_IMOVEL')
  }

  static async syncSuperlogicaContracts(tenantId: string) {
    return this.syncData(tenantId, 'Superlogica', '/contracts', 'NEW_CONTRACT')
  }
}
