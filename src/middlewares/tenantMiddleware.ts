/**
 * Tenant Isolation Middleware
 * Ensures that every outgoing request is tagged with the active tenant ID,
 * preventing cross-tenant data leakage.
 */

export function applyTenantMiddleware(headers: Headers): Headers {
  // Simulates fetching the active tenant ID
  // In a real scenario, this is managed securely in the session or Zustand store
  const tenantId = localStorage.getItem('locxia_active_tenant') || 't1'

  headers.set('X-Tenant-ID', tenantId)

  return headers
}

export function extractTenantId(req: Request): string {
  // Placeholder for backend/gateway extracting tenant ID from request
  return req.headers.get('X-Tenant-ID') || 'unknown'
}
