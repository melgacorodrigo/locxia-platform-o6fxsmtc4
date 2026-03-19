import { AuditoriaService } from './auditoriaService'
import { EventDispatcherService } from './eventDispatcher'
import { Documento } from '@/types/entities'

export class DocumentoService {
  static async upload(tenantId: string, data: Partial<Documento>): Promise<Documento> {
    if (!tenantId) throw new Error('tenantId required')
    const doc = {
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      created_at: new Date().toISOString(),
      ...data,
    } as Documento
    await AuditoriaService.log(tenantId, 'UPLOAD', 'documentos', doc)
    EventDispatcherService.emit('DOCUMENT_RECEIVED', doc)
    return doc
  }

  static async get(tenantId: string, id: string): Promise<Partial<Documento>> {
    if (!tenantId) throw new Error('tenantId required')
    return { id, tenant_id: tenantId, status: 'approved' }
  }

  static async getVersoes(tenantId: string, id: string) {
    if (!tenantId) throw new Error('tenantId required')
    return [
      { id, version: 1, created_at: new Date(Date.now() - 86400000).toISOString() },
      { id, version: 2, created_at: new Date().toISOString() },
    ]
  }
}
