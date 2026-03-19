import { Auditoria } from '@/types/entities'

/**
 * AuditoriaService
 * Centralized logging and audit trail service enforcing strict tenant isolation.
 */
export class AuditoriaService {
  static async log(
    tenantId: string,
    action: string,
    targetEntity: string,
    payload: any,
    metadata?: any,
  ): Promise<Auditoria> {
    if (!tenantId) {
      throw new Error('Multi-tenant isolation requires a valid tenantId')
    }

    const logEntry: Auditoria = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      action,
      target_entity: targetEntity,
      payload,
      metadata,
      created_at: new Date().toISOString(),
    }

    // Mock persistence
    console.log(`[AuditoriaService] 📝 ${action} on ${targetEntity} for tenant ${tenantId}`)
    return logEntry
  }
}
