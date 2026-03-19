export const DashboardController = {
  getOverview: async (tenantId: string) => {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 400))
    return {
      tenantId,
      totalLeads: 1245,
      activeChats: 42,
      relaiaPendencies: 5,
      creditApprovals: 312,
      vacant: 45,
      leased: 105,
      delinquencyRate: 2.4,
    }
  },

  getRecentLeads: async (tenantId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [
      {
        id: 'L-101',
        name: 'João Silva',
        source: 'WhatsApp',
        qualification: 'Score A',
        status: 'qualified',
      },
      {
        id: 'L-102',
        name: 'Maria Souza',
        source: 'Website',
        qualification: 'Score B',
        status: 'contacted',
      },
      {
        id: 'L-103',
        name: 'Carlos Alves',
        source: 'Portal PRO',
        qualification: 'Pending',
        status: 'new',
      },
      {
        id: 'L-104',
        name: 'Ana Clara',
        source: 'WhatsApp',
        qualification: 'Score A',
        status: 'qualified',
      },
    ]
  },

  getPropertyContracts: async (tenantId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [
      { id: 'P-501', address: 'Av Paulista, 1000', phase: 'Assinatura', tenant: 'Roberto M.' },
      { id: 'P-502', address: 'Rua Augusta, 500', phase: 'Análise FIALO', tenant: 'Beatriz S.' },
      {
        id: 'P-503',
        address: 'Rua Oscar Freire, 120',
        phase: 'Entrega de Chaves',
        tenant: 'João S.',
      },
    ]
  },

  getActivityFeed: async (tenantId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return [
      {
        id: 1,
        type: 'relaia',
        title: 'Lead Qualificado (Score A)',
        desc: 'RelAiA filtrou João Silva.',
        time: 'Há 5 min',
      },
      {
        id: 2,
        type: 'audit',
        title: 'Documento Validado OCR',
        desc: 'CNH de Maria Souza aprovada.',
        time: 'Há 15 min',
      },
      {
        id: 3,
        type: 'fialo',
        title: 'Intervenção Humana',
        desc: 'Análise de crédito requer revisão manual.',
        time: 'Há 45 min',
      },
      {
        id: 4,
        type: 'erp',
        title: 'Sync Superlógica',
        desc: 'Contrato #492 sincronizado com sucesso.',
        time: 'Há 1h',
      },
    ]
  },

  getErpStatus: async (tenantId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return {
      lastSync: new Date().toISOString(),
      successfulTrails: 24,
      pendingTrails: 0,
      status: 'healthy',
    }
  },
}
