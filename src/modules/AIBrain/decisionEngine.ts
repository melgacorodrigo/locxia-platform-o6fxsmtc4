import { AuditoriaService } from '@/services/core/auditoriaService'
import useRelaiaStore from '@/stores/useRelaiaStore'
import { EventDispatcherService } from '@/services/core/eventDispatcher'

export class AIBrainDecisionEngine {
  static async processEvent(event: string, payload: any) {
    console.log(`[AIBrain] ⚙️ Processing Decision for event: ${event}`)
    const tenantId = payload?.tenant_id || 't1'

    let actionTaken = 'None'
    let reasoning = 'No explicit rule matched the event context.'

    try {
      switch (event) {
        case 'override_humano':
          if (payload?.threadId) {
            useRelaiaStore.getState().startHumanOverride(payload.threadId)
            actionTaken = 'TRIGGERED_HUMAN_HANDOFF'
            reasoning = 'Event requested explicit human intervention. RelAiA paused.'
          }
          break

        case 'override_resolvido':
          if (payload?.threadId) {
            useRelaiaStore.getState().resolveHumanOverride(payload.threadId)
            actionTaken = 'RESUMED_AI_CONTROL'
            reasoning = 'Human resolved the task. AI context resumed.'
          }
          break

        case 'doc_invalido':
          actionTaken = 'REQUESTED_DOCUMENT_RETRY'
          reasoning = 'OCR failed validation. Firing automation to ask client again.'
          if (payload?.threadId) {
            useRelaiaStore
              .getState()
              .sendMessage(
                payload.threadId,
                'A imagem do documento ficou um pouco borrada. Pode enviar novamente com mais luz?',
                'ai',
              )
          }
          break

        case 'fraude_detectada':
          actionTaken = 'BLOCKED_WORKFLOW'
          reasoning = 'Severe fraud indicator detected. Halted all automated progressions.'
          break

        case 'inadimplencia':
          actionTaken = 'STARTED_COLLECTION_FLOW'
          reasoning = 'Financial delay triggers soft-collection via RelAiA.'
          break

        case 'credito_aprovado':
          actionTaken = 'ADVANCED_TO_CONTRACT'
          reasoning = 'Credit approved by engine, automatically pushing to contract generation.'
          break
      }

      if (actionTaken !== 'None') {
        await AuditoriaService.log(tenantId, 'AI_DECISION_EXECUTED', 'ai_brain', {
          event,
          actionTaken,
          reasoning,
        })
      }
    } catch (error) {
      console.error('[AIBrain] Decision Engine Error:', error)
    }
  }
}
