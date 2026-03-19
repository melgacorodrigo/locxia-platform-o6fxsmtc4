/**
 * DashboardController
 * Aggregation logic to provide consolidated views across modules.
 */
export const DashboardController = {
  getOverview: async (tenantId: string) => {
    return {
      tenantId,
      totalLeads: 124,
      totalContracts: 45,
      activeProperties: 312,
    }
  },

  getKpis: async (tenantId: string) => {
    return {
      conversionRate: '18.5%',
      avgTicket: 2450,
      timeToContract: '4.2 days',
    }
  },

  getRecentLeads: async (tenantId: string) => {
    return [
      { id: 'l1', name: 'João Silva', status: 'new' },
      { id: 'l2', name: 'Maria Souza', status: 'qualified' },
      { id: 'l3', name: 'Pedro Alves', status: 'contacted' },
    ]
  },

  getPendingCredits: async (tenantId: string) => {
    return [
      { id: 'c1', client: 'Carlos', status: 'analyzing' },
      { id: 'c2', client: 'Beatriz', status: 'analyzing' },
    ]
  },

  getPropertyStatus: async (tenantId: string) => {
    return {
      available: 150,
      rented: 152,
      maintenance: 10,
    }
  },

  getRelaiaAtendimentos: async (tenantId: string) => {
    return [
      { id: 'r1', state: 'QUALIFY', client: 'Ana Clara' },
      { id: 'r2', state: 'COLLECT_DOCS', client: 'Roberto' },
    ]
  },
}
