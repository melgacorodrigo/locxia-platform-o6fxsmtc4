import { normalizeData } from '../normalizer'
import { emitIntegrationEvent } from '../events'
import { IntegrationLogRepository } from '@/repositories/integrationLogRepository'
import { IntegrationProvider } from '@/types/integrations'
import { CoreEventName } from '@/services/core/eventDispatcher'
import { AlertsService } from '@/services/core/alertsService'

export class WebhookHandler {
  static validateSignature(
    tenantId: string,
    provider: IntegrationProvider,
    signature: string,
    timestamp: number,
  ) {
    if (!signature) throw new Error(`[Webhook] Missing security signature for ${provider}`)

    // Anti-replay check: reject requests older than 5 minutes
    const now = Date.now()
    if (now - timestamp > 5 * 60 * 1000) {
      AlertsService.emitSecurityAlert(
        tenantId,
        'FRAUD_SUSPICION',
        'medium',
        `Replay attack detected on ${provider} webhook`,
      )
      throw new Error(`[Webhook] Anti-replay triggered. Payload too old.`)
    }

    // Mock HMAC signature validation
    const expectedSignature = `hmac_${provider}_${timestamp}`
    if (signature !== expectedSignature && signature !== 'mock_sig') {
      AlertsService.emitSecurityAlert(
        tenantId,
        'FRAUD_SUSPICION',
        'high',
        `Invalid HMAC signature on ${provider} webhook`,
      )
      throw new Error(`[Webhook] Signature mismatch`)
    }
    return true
  }

  static async process(
    tenantId: string,
    provider: IntegrationProvider,
    payload: any,
    signature: string,
    timestamp: number,
    targetEvent: CoreEventName,
  ) {
    try {
      // 1. Validate incoming security signature & anti-replay
      this.validateSignature(tenantId, provider, signature, timestamp)

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
  '/integrations/tecimob/webhook': (
    tenantId: string,
    payload: any,
    signature: string,
    timestamp: number,
  ) => WebhookHandler.process(tenantId, 'Tecimob', payload, signature, timestamp, 'NEW_LEAD'),

  '/integrations/canalpro/webhook': (
    tenantId: string,
    payload: any,
    signature: string,
    timestamp: number,
  ) => WebhookHandler.process(tenantId, 'CanalPro', payload, signature, timestamp, 'NEW_LEAD'),

  '/integrations/pjbank/webhook': (
    tenantId: string,
    payload: any,
    signature: string,
    timestamp: number,
  ) =>
    WebhookHandler.process(tenantId, 'PJBank', payload, signature, timestamp, 'PAYMENT_RECEIVED'),

  '/integrations/riosvistorias/webhook': (
    tenantId: string,
    payload: any,
    signature: string,
    timestamp: number,
  ) =>
    WebhookHandler.process(
      tenantId,
      'RiosVistorias',
      payload,
      signature,
      timestamp,
      'VISTORIA_CONCLUDED',
    ),
}
