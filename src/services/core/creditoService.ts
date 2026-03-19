import { AuditoriaService } from './auditoriaService'
import { EventDispatcherService } from './eventDispatcher'
import { CreditRequest, FinanceiroTransacao } from '@/types/entities'

export class CreditoService {
  static async solicitar(tenantId: string, data: Partial<CreditRequest>): Promise<CreditRequest> {
    if (!tenantId) throw new Error('tenantId required')
    const req = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      created_at: new Date().toISOString(),
      status: 'pending',
      ...data,
    } as unknown as CreditRequest
    await AuditoriaService.log(tenantId, 'REQUEST', 'credit_requests', req)
    EventDispatcherService.emit('CREDIT_REQUESTED', req)
    return req
  }

  static async getStatus(tenantId: string, id: string) {
    if (!tenantId) throw new Error('tenantId required')
    return { id, tenant_id: tenantId, status: 'analyzing' }
  }
}

export class FinanceiroService {
  static async createTransacao(
    tenantId: string,
    data: Partial<FinanceiroTransacao>,
  ): Promise<FinanceiroTransacao> {
    if (!tenantId) throw new Error('tenantId required')
    const transacao = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      created_at: new Date().toISOString(),
      ...data,
    } as FinanceiroTransacao
    await AuditoriaService.log(tenantId, 'CREATE', 'financeiro_transacoes', transacao)
    return transacao
  }
}
