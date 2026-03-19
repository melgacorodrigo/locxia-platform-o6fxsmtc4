import { applyAuthMiddleware } from '@/middlewares/authMiddleware'
import { applyTenantMiddleware } from '@/middlewares/tenantMiddleware'

/**
 * API Gateway Logic
 * Centralized handling for fetch requests, supporting versioning,
 * tenant-based authorization, and authentication.
 */
export class ApiGateway {
  private static version = 'v1'
  private static baseUrl = `/api/${ApiGateway.version}`

  static async request(endpoint: string, options: RequestInit = {}) {
    let headers = new Headers(options.headers)

    // Middlewares execution
    headers = applyAuthMiddleware(headers)
    headers = applyTenantMiddleware(headers)

    const config: RequestInit = {
      ...options,
      headers,
    }

    console.log(`[API Gateway] ${options.method || 'GET'} ${this.baseUrl}${endpoint}`, {
      tenant: headers.get('X-Tenant-ID'),
    })

    // In a real environment, this would call fetch(url, config)
    // Simulating a successful response for the architecture setup
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
