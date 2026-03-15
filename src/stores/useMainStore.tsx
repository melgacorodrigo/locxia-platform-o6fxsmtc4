import React, { createContext, useContext, useState } from 'react'

export interface Tenant {
  id: string
  name: string
}

export interface AppState {
  tenantId: string
  setTenantId: (id: string) => void
  tenants: Tenant[]
}

const MainContext = createContext<AppState | null>(null)

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [tenantId, setTenantId] = useState('t1')

  const tenants = [
    { id: 't1', name: 'LOCXIA Imóveis SP' },
    { id: 't2', name: 'FIALO Garantidora' },
    { id: 't3', name: 'Grupo Moradas Sul' },
  ]

  return React.createElement(
    MainContext.Provider,
    { value: { tenantId, setTenantId, tenants } },
    children,
  )
}

export default function useMainStore() {
  const ctx = useContext(MainContext)
  if (!ctx) throw new Error('useMainStore must be used within MainProvider')
  return ctx
}
