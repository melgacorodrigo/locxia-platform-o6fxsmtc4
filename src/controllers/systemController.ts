import { TenantRepository } from '@/repositories/tenantRepository'

const tenantRepo = new TenantRepository()

/**
 * System Controller
 * Handles core validation endpoints for the gateway routing.
 */
export const SystemController = {
  // GET /health
  healthCheck: async () => {
    return {
      status: 'online',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      modules: 'loaded',
      database: 'connected',
    }
  },

  // GET /tenants
  getTenants: async () => {
    return await tenantRepo.findAll()
  },

  // POST /tenants
  createTenant: async (data: { name: string; document?: string }) => {
    if (!data.name) throw new Error('Tenant name is required')
    return await tenantRepo.create(data)
  },
}
