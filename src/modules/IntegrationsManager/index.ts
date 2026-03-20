import { Scheduler } from '@/integrations-engine/scheduler'
import { WebhookEndpoints } from '@/integrations-engine/webhook'

export const IntegrationsManagerModule = {
  name: 'Integrations Manager',
  version: '1.0.0',
  init: () => {
    console.log('-> Initializing Integrations Manager Engine...')

    // Start background sync jobs
    Scheduler.startAll()

    // Expose mock endpoints globally for testing/demonstration in the frontend architecture
    ;(window as any).locxiaWebhooks = WebhookEndpoints
  },
}
