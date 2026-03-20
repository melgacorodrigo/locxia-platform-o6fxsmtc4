import { IntegrationProvider } from '@/types/integrations'

// Direct mapping of external fields to Data Core schema
export const Mappers: Record<IntegrationProvider, (data: any) => any> = {
  Tecimob: (data: any) => ({
    id: data.codigo || data.id,
    type: data.tipo,
    status: data.situacao,
    leads: data.leads,
    photos: data.fotos,
    appointments: data.agendamentos,
  }),
  CanalPro: (data: any) => ({
    id: data.lead_id,
    origin: data.portal || 'Zap', // Zap, VivaReal, OLX
    contactName: data.nome,
    contactPhone: data.telefone,
    status: data.status,
  }),
  Superlogica: (data: any) => ({
    contractId: data.id_contrato,
    financials: data.cobrancas,
    defaults: data.inadimplencia,
    transfers: data.repasses,
    client: data.cliente,
  }),
  PJBank: (data: any) => ({
    slipId: data.id_boleto,
    splits: data.splits,
    transfers: data.transferencias,
    conciliation: data.conciliacao,
    status: data.status_pagamento,
  }),
  Cora: (data: any) => ({
    chargeId: data.charge_id,
    receipts: data.recebimentos,
    statement: data.extrato,
    status: data.status,
  }),
  Alude: (data: any) => ({
    analysisId: data.analysis_id,
    preAnalysis: data.pre_analise,
    documents: data.documentos,
  }),
  Serasa: (data: any) => ({
    document: data.cpf_cnpj,
    score: data.score,
    risk: data.risk_level,
    pendencies: data.pendencies,
    fraudAlert: data.fraud_alert,
  }),
  PortoSeguro: (data: any) => ({
    policyId: data.policy_id,
    creditApproved: data.approved,
    warranty: data.garantia,
    technicalOpinion: data.parecer_tecnico,
  }),
  Dihub: (data: any) => ({
    certificateId: data.cert_id,
    status: data.status,
    documents: data.documentos,
    reports: data.relatorios,
  }),
  RiosVistorias: (data: any) => ({
    inspectionId: data.inspection_id,
    reportUrl: data.report,
    photos: data.photos,
    status: data.status,
  }),
}
