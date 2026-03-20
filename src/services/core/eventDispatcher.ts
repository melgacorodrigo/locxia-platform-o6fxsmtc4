export type CoreEventName =
  | 'NEW_LEAD'
  | 'UPDATE_LEAD'
  | 'NEW_IMOVEL'
  | 'UPDATE_IMOVEL'
  | 'DOCUMENT_RECEIVED'
  | 'DOCUMENT_VALIDATED'
  | 'DOCUMENT_REJECTED'
  | 'PENDING_DOCUMENT'
  | 'NEW_DOCUMENT'
  | 'CREDIT_REQUESTED'
  | 'CREDIT_APPROVED'
  | 'CREDIT_REJECTED'
  | 'CREDIT_RESULT'
  | 'CONTRACT_CREATED'
  | 'NEW_CONTRACT'
  | 'CONTRACT_RENEWAL'
  | 'HUMAN_OVERRIDE_START'
  | 'HUMAN_OVERRIDE_END'
  | 'RELAIA_STATE_CHANGE'
  | 'PAYMENT_RECEIVED'
  | 'PAYMENT_FAILED'
  | 'VISIT_SCHEDULED'
  | 'VISTORIA_CONCLUDED'
  | 'FINANCIAL_UPDATE'
  | 'INTEGRATION_ERROR'

type Listener = (payload: any) => void

/**
 * EventDispatcherService
 * Internal synchronous/asynchronous event dispatcher for decoupled inter-module communication.
 */
export class EventDispatcherService {
  private static listeners: Record<string, Listener[]> = {}

  static on(event: CoreEventName, listener: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(listener)
  }

  static emit(event: CoreEventName, payload: any) {
    console.log(`[EventDispatcher] 📢 Emitting ${event}`, payload)
    if (this.listeners[event]) {
      this.listeners[event].forEach((fn) => {
        try {
          fn(payload)
        } catch (error) {
          console.error(`[EventDispatcher] Error in listener for ${event}:`, error)
        }
      })
    }
  }
}
