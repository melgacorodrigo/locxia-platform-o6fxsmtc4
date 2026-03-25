import { applyAuthMiddleware, enforceRateLimit } from '@/middlewares/authMiddleware'
import { applyTenantMiddleware } from '@/middlewares/tenantMiddleware'
import { AuditController } from '@/controllers/auditController'

/**
 * API Gateway Logic
 * Centralized handling for fetch requests, supporting versioning,
 * strict multi-tenant authorization, and rate limiting.
 */
export class ApiGateway {
  private static version = 'v1'
  private static baseUrl = `/api/${ApiGateway.version}`

  static async request(endpoint: string, options: RequestInit = {}) {
    let headers = new Headers(options.headers)

    // Security Middlewares execution
    headers = applyAuthMiddleware(headers)
    headers = applyTenantMiddleware(headers)

    const tenantId = headers.get('X-Tenant-ID') || 'unknown'
    const isSensitive =
      endpoint.includes('/security') || endpoint.includes('/crypto') || endpoint.includes('/audit')

    // Enforce API Rate Limiting per tenant
    enforceRateLimit(tenantId, isSensitive)

    console.log(`[API Gateway] ${options.method || 'GET'} ${this.baseUrl}${endpoint}`, {
      tenant: tenantId,
      reqId: headers.get('X-Request-ID'),
    })

    // --- Mock Interceptors for Dashboard UI ---
    if (endpoint.startsWith('/audit/logs')) {
      return { ok: true, status: 200, json: async () => AuditController.getLogs(tenantId) }
    }
    if (endpoint.startsWith('/audit/ia')) {
      return { ok: true, status: 200, json: async () => AuditController.getIaLogs(tenantId) }
    }
    if (endpoint.startsWith('/audit/human-override')) {
      return {
        ok: true,
        status: 200,
        json: async () => AuditController.getHumanOverrideLogs(tenantId),
      }
    }
    if (endpoint.startsWith('/security/alerts')) {
      return {
        ok: true,
        status: 200,
        json: async () => AuditController.getSecurityAlerts(tenantId),
      }
    }

    // In a real environment, this would call fetch(url, config)
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true, message: 'Mock gateway response' }),
    }
  }

  static async get(endpoint: string, options: RequestInit = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  static async post(endpoint: string, data: any, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  }
}
