import { AuditoriaService } from './auditoriaService'
import { EventDispatcherService } from './eventDispatcher'
import { Pessoa, Lead } from '@/types/entities'

export class PeopleService {
  static async createPessoa(tenantId: string, data: Partial<Pessoa>): Promise<Pessoa> {
    if (!tenantId) throw new Error('tenantId required')
    const pessoa = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      created_at: new Date().toISOString(),
      ...data,
    } as Pessoa
    await AuditoriaService.log(tenantId, 'CREATE', 'pessoas', pessoa)
    return pessoa
  }

  static async getPessoa(tenantId: string, id: string): Promise<Partial<Pessoa>> {
    if (!tenantId) throw new Error('tenantId required')
    return { id, tenant_id: tenantId, name: 'Mock Pessoa' }
  }

  static async updatePessoa(
    tenantId: string,
    id: string,
    data: Partial<Pessoa>,
  ): Promise<Partial<Pessoa>> {
    if (!tenantId) throw new Error('tenantId required')
    const pessoa = { id, tenant_id: tenantId, ...data }
    await AuditoriaService.log(tenantId, 'UPDATE', 'pessoas', pessoa)
    return pessoa
  }
}

export class LeadService {
  static async createLead(tenantId: string, data: Partial<Lead>): Promise<Lead> {
    if (!tenantId) throw new Error('tenantId required')
    const lead = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      created_at: new Date().toISOString(),
      ...data,
    } as Lead
    await AuditoriaService.log(tenantId, 'CREATE', 'leads', lead)
    EventDispatcherService.emit('NEW_LEAD', lead)
    return lead
  }

  static async updateLead(
    tenantId: string,
    id: string,
    data: Partial<Lead>,
  ): Promise<Partial<Lead>> {
    if (!tenantId) throw new Error('tenantId required')
    const lead = { id, tenant_id: tenantId, ...data }
    await AuditoriaService.log(tenantId, 'UPDATE', 'leads', lead)
    EventDispatcherService.emit('UPDATE_LEAD', lead)
    return lead
  }

  static async getLead(tenantId: string, id: string): Promise<Partial<Lead>> {
    if (!tenantId) throw new Error('tenantId required')
    return { id, tenant_id: tenantId, name: 'Mock Lead' }
  }
}
