import { lazy } from 'react'
import { ROUTER_URL } from '@constants/router'

export const BillingRoutes = [
  {
    path: ROUTER_URL.BILLING_OPERATION_UNIT,
    exact: true,
    component: lazy(() => import('../../views/billing/operation-unit')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_OPERATION_UNIT
    }
  }
]
