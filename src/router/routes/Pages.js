import { lazy } from 'react'
import { ROUTER_URL } from '@constants/router'

const PagesRoutes = [
  {
    path: ROUTER_URL.LOGIN,
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/pages/authentication/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/pages/authentication/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/reset-password',
    component: lazy(() => import('../../views/pages/authentication/ResetPasswordV1')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: ROUTER_URL.ACCOUNT_SETTING,
    component: lazy(() => import('../../views/pages/account-settings')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.ACCOUNT_SETTING
    }
  },
  {
    path: ROUTER_URL.CHANGE_PASSWORD,
    component: lazy(() => import('../../views/pages/change-password')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.CHANGE_PASSWORD
    }
  },
  {
    path: '/misc/not-authorized',
    component: lazy(() => import('../../views/pages/misc/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/maintenance',
    component: lazy(() => import('../../views/pages/misc/Maintenance')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/error',
    component: lazy(() => import('../../views/pages/misc/Error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default PagesRoutes
