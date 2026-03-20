import { supabaseClient } from '@/config/supabase'

export class IntegrationLogRepository {
  static async logIntegration(tenantId: string, source: string, action: string, payload: any) {
    return supabaseClient
      .from('logs_integracoes')
      .insert([
        { tenant_id: tenantId, source, action, payload, created_at: new Date().toISOString() },
      ])
  }

  static async logFailure(tenantId: string, source: string, error: string, payload: any) {
    return supabaseClient
      .from('logs_integracoes_falhas')
      .insert([
        { tenant_id: tenantId, source, error, payload, created_at: new Date().toISOString() },
      ])
  }

  static async logWebhook(tenantId: string, source: string, raw_payload: any) {
    return supabaseClient
      .from('logs_webhooks')
      .insert([{ tenant_id: tenantId, source, raw_payload, created_at: new Date().toISOString() }])
  }

  static async logEvent(
    tenantId: string,
    source: string,
    event_type: string,
    normalized_data: any,
  ) {
    return supabaseClient.from('integracoes_eventos').insert([
      {
        tenant_id: tenantId,
        source,
        event_type,
        normalized_data,
        created_at: new Date().toISOString(),
      },
    ])
  }
}
