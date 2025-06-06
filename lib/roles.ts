export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export const ROLE_PERMISSIONS: Record<UserRole, string[]>= {
  [USER_ROLES.CUSTOMER]: [
    'browse_products',
    'purchase',
    'review_products',
    'manage_profile'
  ],
  [USER_ROLES.VENDOR]: [
    'browse_products',
    'manage_own_products',
    'view_own_orders',
    'manage_inventory'
  ],
  [USER_ROLES.ADMIN]: [
    'manage_users',
    'manage_products',
    'view_analytics',
    'system_settings'
  ],
  [USER_ROLES.SUPER_ADMIN]: ['*'] // All permissions
} as const

export function hasPermission(userRole: UserRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole]
  return permissions.includes('*') || permissions.includes(permission)
}

export function canAccessAdminPanel(userRole: UserRole): boolean {
  return userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.SUPER_ADMIN
}

export function isVendorOrHigher(userRole: UserRole): boolean {
  const allowedRoles: UserRole[] = [USER_ROLES.VENDOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN]
  return allowedRoles.includes(userRole)
}