import { RelaiaAPI } from '@/services/api/relaiaApi'
import { RelaiaEngine } from '@/services/ai/relaiaEngine'

export const RelAiAModule = {
  name: 'RelAiA Core (AI Interaction & Human Override)',
  version: '2.0.0',
  init: () => {
    console.log('-> Initializing RelAiA Core Engine (v2.0.0)...')
    console.log('-> Loading 12-state State Machine Engine...')
    console.log('-> Webhook listener ready for Meta WhatsApp API.')
  },
  api: RelaiaAPI,
  engine: RelaiaEngine,
}
