import { EventDispatcherService, CoreEventName } from '@/services/core/eventDispatcher'
import { NormalizedData } from '@/types/integrations'
import { IntegrationLogRepository } from '@/repositories/integrationLogRepository'

export async function emitIntegrationEvent(
  eventName: CoreEventName,
  normalizedData: NormalizedData,
) {
  // Dispatch internal event to the rest of the application (IA Engine, RelAiA, Data Core)
  EventDispatcherService.emit(eventName, normalizedData.data)

  // Persist the event emission log in Data Core
  await IntegrationLogRepository.logEvent(
    normalizedData.tenant_id,
    normalizedData.source,
    eventName,
    normalizedData,
  )
}
