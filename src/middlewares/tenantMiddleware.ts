/**
 * Tenant Isolation Middleware
 * Ensures that every outgoing request is tagged with the active tenant ID,
 * preventing cross-tenant data leakage, and injects origin headers.
 */

export function applyTenantMiddleware(headers: Headers): Headers {
  const tenantId = localStorage.getItem('locxia_active_tenant') || 't1'

  headers.set('X-Tenant-ID', tenantId)

  // Inject origin for security validation
  if (typeof window !== 'undefined') {
    headers.set('X-Origin', window.location.origin)
  }

  return headers
}

export function extractTenantId(headers: Headers | Request): string {
  if (headers instanceof Headers) {
    return headers.get('X-Tenant-ID') || 'unknown'
  }
  return headers.headers.get('X-Tenant-ID') || 'unknown'
}
