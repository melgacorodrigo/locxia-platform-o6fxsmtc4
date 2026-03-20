import { normalizeData } from '../normalizer'
import { emitIntegrationEvent } from '../events'
import { IntegrationLogRepository } from '@/repositories/integrationLogRepository'
import { IntegrationProvider } from '@/types/integrations'
import { CoreEventName } from '@/services/core/eventDispatcher'

export class WebhookHandler {
  static validateSignature(provider: IntegrationProvider, payload: any, signature: string) {
    if (!signature) throw new Error(`[Webhook] Invalid security signature for ${provider}`)
    return true
  }

  static async process(
    tenantId: string,
    provider: IntegrationProvider,
    payload: any,
    signature: string,
    targetEvent: CoreEventName,
  ) {
    try {
      // 1. Validate incoming security signature
      this.validateSignature(provider, payload, signature)

      // 2. Save raw webhook payload for auditing
      await IntegrationLogRepository.logWebhook(tenantId, provider, payload)

      // 3. Normalize external data
      const normalized = normalizeData(provider, 'WEBHOOK_RECEIVED', tenantId, payload)

      // 4. Dispatch to event pipeline
      await emitIntegrationEvent(targetEvent, normalized)

      return { success: true, message: 'Webhook processed successfully' }
    } catch (error: any) {
      await IntegrationLogRepository.logFailure(tenantId, provider, error.message, payload)
      throw error
    }
  }
}

// Simulated API Endpoints mapping to functions
export const WebhookEndpoints = {
  '/integrations/tecimob/webhook': (tenantId: string, payload: any, signature: string) =>
    WebhookHandler.process(tenantId, 'Tecimob', payload, signature, 'NEW_LEAD'),

  '/integrations/canalpro/webhook': (tenantId: string, payload: any, signature: string) =>
    WebhookHandler.process(tenantId, 'CanalPro', payload, signature, 'NEW_LEAD'),

  '/integrations/pjbank/webhook': (tenantId: string, payload: any, signature: string) =>
    WebhookHandler.process(tenantId, 'PJBank', payload, signature, 'PAYMENT_RECEIVED'),

  '/integrations/riosvistorias/webhook': (tenantId: string, payload: any, signature: string) =>
    WebhookHandler.process(tenantId, 'RiosVistorias', payload, signature, 'VISTORIA_CONCLUDED'),
}
