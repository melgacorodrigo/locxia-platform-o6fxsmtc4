import { Auditoria } from '@/types/entities'

/**
 * AuditoriaService
 * Centralized logging and audit trail service enforcing strict tenant isolation.
 * Tracks data modifications, who did it, what changed, and IP origin.
 */
export class AuditoriaService {
  static async log(
    tenantId: string,
    action: string,
    targetEntity: string,
    payload: any,
    metadata?: any,
    userId: string = 'system',
    valorAntes?: any,
    valorDepois?: any,
    ipOrigin: string = '127.0.0.1',
  ): Promise<Auditoria> {
    if (!tenantId) {
      throw new Error('Multi-tenant isolation requires a valid tenantId')
    }

    const logEntry: Auditoria = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      user_id: userId,
      action,
      target_entity: targetEntity,
      valor_antes: valorAntes,
      valor_depois: valorDepois,
      ip_origin: ipOrigin,
      payload,
      metadata,
      created_at: new Date().toISOString(),
    }

    // Mock persistence
    console.log(`[AuditoriaService] 📝 ${action} on ${targetEntity} by ${userId} (IP: ${ipOrigin})`)
    return logEntry
  }
}
