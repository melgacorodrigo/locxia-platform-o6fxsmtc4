import { UserRole } from '@/types/entities'

/**
 * Hierarchical RBAC Middleware
 * Restricts access based on allowed roles for a specific operation.
 */
export function checkRbac(userRole: UserRole, allowedRoles: UserRole[]) {
  if (!allowedRoles.includes(userRole)) {
    throw new Error(
      `Access Denied: Role '${userRole}' is not authorized. Required: ${allowedRoles.join(', ')}.`,
    )
  }
  return true
}
