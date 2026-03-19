import { AuditoriaService } from './auditoriaService'
import { Imovel } from '@/types/entities'

export class ImovelService {
  static async createImovel(tenantId: string, data: Partial<Imovel>): Promise<Imovel> {
    if (!tenantId) throw new Error('tenantId required')
    const imovel = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      created_at: new Date().toISOString(),
      ...data,
    } as Imovel
    await AuditoriaService.log(tenantId, 'CREATE', 'imoveis', imovel)
    return imovel
  }

  static async getImoveis(tenantId: string): Promise<Partial<Imovel>[]> {
    if (!tenantId) throw new Error('tenantId required')
    return [
      { id: 'i1', tenant_id: tenantId, address: 'Av Paulista, 1000' },
      { id: 'i2', tenant_id: tenantId, address: 'Rua Augusta, 500' },
    ]
  }

  static async getImovel(tenantId: string, id: string): Promise<Partial<Imovel>> {
    if (!tenantId) throw new Error('tenantId required')
    return { id, tenant_id: tenantId, address: 'Av Paulista, 1000' }
  }

  static async updateImovel(
    tenantId: string,
    id: string,
    data: Partial<Imovel>,
  ): Promise<Partial<Imovel>> {
    if (!tenantId) throw new Error('tenantId required')
    const imovel = { id, tenant_id: tenantId, ...data }
    await AuditoriaService.log(tenantId, 'UPDATE', 'imoveis', imovel)
    return imovel
  }

  static async getTimeline(tenantId: string, id: string) {
    if (!tenantId) throw new Error('tenantId required')
    return [
      { event: 'CREATED', date: new Date(Date.now() - 86400000).toISOString() },
      { event: 'UPDATED', date: new Date().toISOString() },
    ]
  }
}
