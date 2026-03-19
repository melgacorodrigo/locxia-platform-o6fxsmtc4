import { AuditoriaService } from './auditoriaService'
import { EventDispatcherService } from './eventDispatcher'

export class RelAiAStateService {
  static async registerEvent(tenantId: string, threadId: string, eventData: any) {
    if (!tenantId) throw new Error('tenantId required')
    const event = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      thread_id: threadId,
      created_at: new Date().toISOString(),
      ...eventData,
    }
    await AuditoriaService.log(tenantId, 'REGISTER_EVENT', 'relAIA_eventos', event)
    EventDispatcherService.emit('RELAIA_STATE_CHANGE', event)
    return event
  }

  static async getThread(tenantId: string, threadId: string) {
    if (!tenantId) throw new Error('tenantId required')
    return { id: threadId, tenant_id: tenantId, state: 'QUALIFY' }
  }

  static async registerIaDecision(tenantId: string, threadId: string, decision: any) {
    if (!tenantId) throw new Error('tenantId required')
    await AuditoriaService.log(tenantId, 'IA_DECISION', 'logs_ia', {
      thread_id: threadId,
      decision,
    })
    return { success: true }
  }

  static async createContextSummary(tenantId: string, threadId: string) {
    if (!tenantId) throw new Error('tenantId required')
    return {
      threadId,
      summary: 'Client wants to rent a house in SP. Currently checking FIALO credit score.',
    }
  }

  static async getConsolidatedTimeline(tenantId: string, threadId: string) {
    if (!tenantId) throw new Error('tenantId required')
    return [
      { time: new Date(Date.now() - 5000).toISOString(), action: 'START' },
      { time: new Date().toISOString(), action: 'IDENTIFY' },
    ]
  }
}
