import { EventDispatcherService, CoreEventName } from '@/services/core/eventDispatcher'
import { AIBrainDecisionEngine } from './decisionEngine'
import { AIBrainInsightsEngine } from './insightsEngine'

export class AIBrainOrchestrator {
  private static listeningEvents: CoreEventName[] = [
    'lead_novo',
    'lead_sem_atendimento',
    'documento_recebido',
    'doc_invalido',
    'credito_solicitado',
    'credito_aprovado',
    'credito_reprovado',
    'fraude_detectada',
    'vistoria_concluida',
    'inadimplencia',
    'mensagem_whatsapp',
    'override_humano',
    'override_resolvido',
  ]

  static init() {
    console.log('-> Starting AI Brain Orchestrator...')

    this.listeningEvents.forEach((eventName) => {
      EventDispatcherService.on(eventName, async (payload) => {
        // 1. Process Logic & Automation Decisions
        await AIBrainDecisionEngine.processEvent(eventName, payload)

        // 2. Generate Real-time Business Insights
        await AIBrainInsightsEngine.analyzeEvent(eventName, payload)
      })
    })

    console.log('-> AI Brain listening to system events.')
  }

  // Helper method to simulate incoming events for UI demonstration
  static simulateEvent(eventName: CoreEventName, payload: any = {}) {
    EventDispatcherService.emit(eventName, {
      tenant_id: 't1',
      timestamp: new Date().toISOString(),
      ...payload,
    })
  }
}
