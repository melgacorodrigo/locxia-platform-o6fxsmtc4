import { PeopleService, LeadService } from '@/services/core/peopleService'
import { ImovelService } from '@/services/core/imovelService'
import { DocumentoService } from '@/services/core/documentoService'
import { ContratoService } from '@/services/core/contratoService'
import { CreditoService } from '@/services/core/creditoService'
import { RelAiAStateService } from '@/services/core/relaiaStateService'

/**
 * DataCoreController
 * Centralized API endpoints simulator for the Data Core layer.
 */
export const DataCoreController = {
  // Pessoas
  createPessoa: (tenantId: string, data: any) => PeopleService.createPessoa(tenantId, data),
  getPessoa: (tenantId: string, id: string) => PeopleService.getPessoa(tenantId, id),
  updatePessoa: (tenantId: string, id: string, data: any) =>
    PeopleService.updatePessoa(tenantId, id, data),

  // Leads
  createLead: (tenantId: string, data: any) => LeadService.createLead(tenantId, data),
  getLead: (tenantId: string, id: string) => LeadService.getLead(tenantId, id),
  updateLead: (tenantId: string, id: string, data: any) =>
    LeadService.updateLead(tenantId, id, data),

  // Imóveis
  createImovel: (tenantId: string, data: any) => ImovelService.createImovel(tenantId, data),
  getImoveis: (tenantId: string) => ImovelService.getImoveis(tenantId),
  getImovel: (tenantId: string, id: string) => ImovelService.getImovel(tenantId, id),
  updateImovel: (tenantId: string, id: string, data: any) =>
    ImovelService.updateImovel(tenantId, id, data),
  getImovelTimeline: (tenantId: string, id: string) => ImovelService.getTimeline(tenantId, id),

  // Documentos
  uploadDocumento: (tenantId: string, data: any) => DocumentoService.upload(tenantId, data),
  getDocumento: (tenantId: string, id: string) => DocumentoService.get(tenantId, id),
  getDocumentoVersoes: (tenantId: string, id: string) => DocumentoService.getVersoes(tenantId, id),

  // Contratos
  createContrato: (tenantId: string, data: any) => ContratoService.create(tenantId, data),
  updateContrato: (tenantId: string, id: string, data: any) =>
    ContratoService.update(tenantId, id, data),
  getContratoEventos: (tenantId: string, id: string) => ContratoService.getEventos(tenantId, id),

  // Credito
  solicitarCredito: (tenantId: string, data: any) => CreditoService.solicitar(tenantId, data),
  getCreditoStatus: (tenantId: string, id: string) => CreditoService.getStatus(tenantId, id),

  // RelAiA
  registerRelaiaEvent: (tenantId: string, data: any) =>
    RelAiAStateService.registerEvent(tenantId, data.threadId, data),
  getRelaiaThread: (tenantId: string, id: string) => RelAiAStateService.getThread(tenantId, id),
}
