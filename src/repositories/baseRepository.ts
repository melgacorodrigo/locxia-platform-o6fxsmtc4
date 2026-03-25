import { supabaseClient } from '@/config/supabase'

/**
 * Base Repository enforcing strict tenant isolation on all database queries.
 * Prevents cross-tenant data leaks at the ORM level.
 */
export class BaseRepository<T> {
  constructor(protected tableName: string) {}

  async findAll(tenantId: string): Promise<T[]> {
    const { data, error } = await supabaseClient
      .from(this.tableName)
      .select('*')
      .eq('tenant_id', tenantId) // Mandatory Tenant Filter

    if (error) throw error
    return data as unknown as T[]
  }

  async findById(tenantId: string, id: string): Promise<T | null> {
    const { data, error } = await supabaseClient
      .from(this.tableName)
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('id', id)

    if (error) throw error
    return (data as any)?.[0] || null
  }

  async create(tenantId: string, data: Partial<T>): Promise<T> {
    const payload = { ...data, tenant_id: tenantId }
    const { data: result, error } = await supabaseClient.from(this.tableName).insert([payload])

    if (error) throw error
    return result as unknown as T
  }

  async update(tenantId: string, id: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await supabaseClient
      .from(this.tableName)
      .update(data)
      .eq('tenant_id', tenantId)
      .eq('id', id)

    if (error) throw error
    return result as unknown as T
  }

  async delete(tenantId: string, id: string): Promise<boolean> {
    const { error } = await supabaseClient
      .from(this.tableName)
      .delete()
      .eq('tenant_id', tenantId)
      .eq('id', id)

    if (error) throw error
    return true
  }
}
