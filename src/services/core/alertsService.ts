import { SecurityAlert } from '@/types/entities'
import { EventDispatcherService } from './eventDispatcher'
import { AuditoriaService } from './auditoriaService'

/**
 * AlertsService
 * Real-time detection and notification of suspicious behaviors.
 */
export class AlertsService {
  static async emitSecurityAlert(
    tenantId: string,
    type: SecurityAlert['type'],
    severity: SecurityAlert['severity'],
    message: string,
    ipOrigin: string = 'unknown',
  ): Promise<SecurityAlert> {
    const alert: SecurityAlert = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      type,
      severity,
      message,
      ip_origin: ipOrigin,
      resolved: false,
      created_at: new Date().toISOString(),
    }

    console.warn(`[SECURITY ALERT 🚨] [${severity.toUpperCase()}] ${type}: ${message}`)

    // Dispatch to global event bus (e.g., to notify WebSockets/Dashboard)
    EventDispatcherService.emit('SECURITY_ALERT', alert)

    // Log via immutable audit trail
    await AuditoriaService.log(
      tenantId,
      'SECURITY_ALERT_EMITTED',
      'Security',
      { type, severity, message },
      null,
      'system',
      null,
      null,
      ipOrigin,
    )

    return alert
  }
}
