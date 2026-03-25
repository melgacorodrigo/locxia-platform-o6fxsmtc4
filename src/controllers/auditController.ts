import { Auditoria, LogIa, LogHumanOverride, SecurityAlert } from '@/types/entities'

/**
 * AuditController
 * Handles core endpoints to expose isolated audit logs to the Dashboard.
 */
export const AuditController = {
  getLogs: async (tenantId: string): Promise<Auditoria[]> => {
    return [
      {
        id: 'a1',
        tenant_id: tenantId,
        created_at: new Date().toISOString(),
        action: 'UPDATE',
        target_entity: 'Imovel',
        valor_antes: { status: 'available' },
        valor_depois: { status: 'rented' },
        ip_origin: '192.168.1.1',
        user_id: 'u123',
      },
      {
        id: 'a2',
        tenant_id: tenantId,
        created_at: new Date(Date.now() - 3600000).toISOString(),
        action: 'CREATE',
        target_entity: 'Contrato',
        valor_antes: null,
        valor_depois: { value: 2500 },
        ip_origin: '10.0.0.5',
        user_id: 'u123',
      },
      {
        id: 'a3',
        tenant_id: tenantId,
        created_at: new Date(Date.now() - 7200000).toISOString(),
        action: 'DELETE',
        target_entity: 'Documento',
        valor_antes: { status: 'rejected' },
        valor_depois: null,
        ip_origin: '10.0.0.8',
        user_id: 'u456',
      },
    ]
  },

  getIaLogs: async (tenantId: string): Promise<LogIa[]> => {
    return [
      {
        id: 'ia1',
        tenant_id: tenantId,
        created_at: new Date().toISOString(),
        thread_id: 'th_1',
        decision: 'ADVANCED_TO_CONTRACT',
        reasoning_context:
          'Credit approved, all docs validated via OCR. Triggering contract drafting.',
        token_usage: 1450,
        confidence: 0.98,
      },
      {
        id: 'ia2',
        tenant_id: tenantId,
        created_at: new Date(Date.now() - 14400000).toISOString(),
        thread_id: 'th_2',
        decision: 'TRIGGERED_HUMAN_HANDOFF',
        reasoning_context: 'User requested manual review of FIALO score due to low income.',
        token_usage: 850,
        confidence: 0.95,
      },
      {
        id: 'ia3',
        tenant_id: tenantId,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        thread_id: 'th_3',
        decision: 'BLOCKED_WORKFLOW',
        reasoning_context: 'Severe fraud indicator detected on RG OCR mismatch.',
        token_usage: 1200,
        confidence: 0.99,
      },
    ]
  },

  getHumanOverrideLogs: async (tenantId: string): Promise<LogHumanOverride[]> => {
    return [
      {
        id: 'ho1',
        tenant_id: tenantId,
        created_at: new Date().toISOString(),
        thread_id: 'th_2',
        user_id: 'u456',
        reason: 'Analista assumiu para revisar score manual FIALO e aplicar exceção de fiador.',
      },
      {
        id: 'ho2',
        tenant_id: tenantId,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        thread_id: 'th_4',
        user_id: 'u789',
        reason: 'Atendimento escalado via WhatsApp (Procon mention).',
      },
    ]
  },

  getSecurityAlerts: async (tenantId: string): Promise<SecurityAlert[]> => {
    return [
      {
        id: 'sa1',
        tenant_id: tenantId,
        created_at: new Date().toISOString(),
        type: 'CROSS_TENANT_ATTEMPT',
        message: 'Token de t1 tentou acessar recurso isolado de t2',
        severity: 'critical',
        ip_origin: '200.15.45.88',
        resolved: false,
      },
      {
        id: 'sa2',
        tenant_id: tenantId,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        type: 'FAILED_LOGIN',
        message: '5 tentativas falhas de login (Brute-force suspect)',
        severity: 'medium',
        ip_origin: '189.10.20.30',
        resolved: true,
      },
      {
        id: 'sa3',
        tenant_id: tenantId,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        type: 'FRAUD_SUSPICION',
        message: 'Invalid HMAC signature on Tecimob webhook',
        severity: 'high',
        ip_origin: '54.23.11.90',
        resolved: false,
      },
    ]
  },
}
