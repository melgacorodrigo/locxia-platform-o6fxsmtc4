import { AuditoriaService } from './auditoriaService'
import { EventDispatcherService } from './eventDispatcher'
import { Contrato } from '@/types/entities'

export class ContratoService {
  static async create(tenantId: string, data: Partial<Contrato>): Promise<Contrato> {
    if (!tenantId) throw new Error('tenantId required')
    const contrato = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      created_at: new Date().toISOString(),
      ...data,
    } as Contrato
    await AuditoriaService.log(tenantId, 'CREATE', 'contratos', contrato)
    EventDispatcherService.emit('CONTRACT_CREATED', contrato)
    return contrato
  }

  static async update(
    tenantId: string,
    id: string,
    data: Partial<Contrato>,
  ): Promise<Partial<Contrato>> {
    if (!tenantId) throw new Error('tenantId required')
    const contrato = { id, tenant_id: tenantId, ...data }
    await AuditoriaService.log(tenantId, 'UPDATE', 'contratos', contrato)
    return contrato
  }

  static async getEventos(tenantId: string, id: string) {
    if (!tenantId) throw new Error('tenantId required')
    return [{ id: 'e1', type: 'SIGNATURE_REQUESTED', date: new Date().toISOString() }]
  }
}
