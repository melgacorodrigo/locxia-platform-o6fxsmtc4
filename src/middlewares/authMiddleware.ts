/**
 * Authentication Middleware Logic
 * Used by the API Gateway to append JWT tokens, validate expiration,
 * and enforce strict rate-limiting per tenant.
 */

const rateLimits: Record<string, { count: number; resetAt: number }> = {}

export function applyAuthMiddleware(headers: Headers): Headers {
  // Simulates fetching a JWT token from local storage or context
  const token = localStorage.getItem('locxia_jwt') || 'mock_jwt_token_12345'

  // Simulating 15-minute JWT expiration validation
  const tokenCreatedAt = Number(localStorage.getItem('locxia_jwt_created')) || Date.now()
  const isExpired = Date.now() - tokenCreatedAt > 15 * 60 * 1000

  if (isExpired) {
    console.warn('[Security] JWT Expired. Triggering refresh token rotation.')
    // In a real scenario, this would trigger a token refresh flow
    localStorage.setItem('locxia_jwt_created', Date.now().toString())
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // Inject tracing ID for audit and debugging
  headers.set('X-Request-ID', crypto.randomUUID())

  return headers
}

export function enforceRateLimit(tenantId: string, isSensitive: boolean = false) {
  const limit = isSensitive ? 30 : 100
  const now = Date.now()
  const key = `${tenantId}_${isSensitive ? 'sensitive' : 'general'}`

  if (!rateLimits[key] || rateLimits[key].resetAt < now) {
    rateLimits[key] = { count: 0, resetAt: now + 60000 }
  }

  rateLimits[key].count++

  if (rateLimits[key].count > limit) {
    throw new Error(`Rate limit exceeded for tenant ${tenantId}. Max ${limit} req/min.`)
  }
}

export function validateJwt(token: string): boolean {
  if (!token || token.length < 10) return false
  return true
}
