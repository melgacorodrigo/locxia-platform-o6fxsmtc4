import { create } from 'zustand'
import { UserRole } from '@/types/entities'

export interface Tenant {
  id: string
  name: string
}

export interface AppState {
  tenantId: string
  setTenantId: (id: string) => void
  tenants: Tenant[]
  userRole: UserRole
  setUserRole: (role: UserRole) => void
}

const useMainStore = create<AppState>((set) => ({
  tenantId: 't1',
  setTenantId: (id) => set({ tenantId: id }),
  tenants: [
    { id: 't1', name: 'LOCXIA Imóveis SP' },
    { id: 't2', name: 'FIALO Garantidora' },
    { id: 't3', name: 'Grupo Moradas Sul' },
  ],
  userRole: 'admin',
  setUserRole: (role) => set({ userRole: role }),
}))

export default useMainStore
