import { IntegrationLogRepository } from '@/repositories/integrationLogRepository'
import { emitIntegrationEvent } from '../events'
import { IntegrationProvider } from '@/types/integrations'

export async function withRetry<T>(
  tenantId: string,
  provider: IntegrationProvider,
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> {
  try {
    return await operation()
  } catch (error: any) {
    if (retries > 0) {
      console.warn(`[Integrations Engine] Error in ${provider}, retrying in ${delay}ms...`, error)
      await new Promise((resolve) => setTimeout(resolve, delay))
      // Exponential backoff
      return withRetry(tenantId, provider, operation, retries - 1, delay * 2)
    } else {
      console.error(`[Integrations Engine] Operation failed for ${provider} after retries.`)

      // Log failure strictly bound to tenant
      await IntegrationLogRepository.logFailure(
        tenantId,
        provider,
        error.message || 'Unknown error',
        {},
      )

      // Alert internal system
      await emitIntegrationEvent('INTEGRATION_ERROR', {
        source: provider,
        event: 'ERROR',
        tenant_id: tenantId,
        data: { error: error.message },
        received_at: new Date().toISOString(),
      })

      throw error
    }
  }
}
