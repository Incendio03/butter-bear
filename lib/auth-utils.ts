import { USER_ROLES, type UserRole } from './roles'

export function getRoleBasedRedirect(role: UserRole): string {
  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
    case USER_ROLES.ADMIN:
      return '/admin/dashboard'
    case USER_ROLES.VENDOR:
      return '/vendor/dashboard'
    case USER_ROLES.CUSTOMER:
      return '/customer/dashboard'
    default:
      return '/'
  }
}

// You can add more auth-related utilities here later
export function getDisplayName(role: UserRole): string {
  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
      return 'Super Administrator'
    case USER_ROLES.ADMIN:
      return 'Administrator'
    case USER_ROLES.VENDOR:
      return 'Vendor'
    case USER_ROLES.CUSTOMER:
      return 'Customer'
    default:
      return 'User'
  }
}