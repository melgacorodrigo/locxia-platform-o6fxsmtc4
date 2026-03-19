import { Tenant } from '@/types/entities'

/**
 * Specific repository for Tenants (Global entity).
 * This entity generally bypasses standard tenant isolation since it manages the tenants themselves.
 */
export class TenantRepository {
  private static mockTenants: Tenant[] = [
    {
      id: 't1',
      name: 'LOCXIA Imóveis SP',
      document: '11.222.333/0001-44',
      active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 't2',
      name: 'FIALO Garantidora',
      document: '55.666.777/0001-88',
      active: true,
      created_at: new Date().toISOString(),
    },
  ]

  async findAll(): Promise<Tenant[]> {
    return TenantRepository.mockTenants
  }

  async create(data: Partial<Tenant>): Promise<Tenant> {
    const newTenant: Tenant = {
      id: `t${Date.now()}`,
      name: data.name || 'New Tenant',
      document: data.document || '',
      active: true,
      created_at: new Date().toISOString(),
    }
    TenantRepository.mockTenants.push(newTenant)
    return newTenant
  }
}
