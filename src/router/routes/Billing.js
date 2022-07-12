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
  },
  {
    path: ROUTER_URL.BILLING_OPERATION_UNIT_CREATE,
    exact: true,
    component: lazy(() => import('../../views/billing/operation-unit/create')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_OPERATION_UNIT
    }
  },
  {
    path: ROUTER_URL.BILLING_OPERATION_UNIT_UPDATE,
    component: lazy(() => import('../../views/billing/operation-unit/update')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_OPERATION_UNIT
    }
  },
  {
    path: ROUTER_URL.BILLING_CUSTOMER,
    component: lazy(() => import('../../views/billing/customer')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_CUSTOMER
    }
  }
  // {
  //   path: ROUTER_URL.BILLING_OPERATION_UNIT_UPDATE,
  //   component: lazy(() => import('../../views/billing/customer/update')),
  //   meta: {
  //     action: 'manage',
  //     resource: ROUTER_URL.BILLING_CUSTOMER
  //   }
  // },
  // {
  //   path: ROUTER_URL.BILLING_CUSTOMER_CREATE,
  //   component: lazy(() => import('../../views/billing/customer/create')),
  //   meta: {
  //     action: 'manage',
  //     resource: ROUTER_URL.BILLING_CUSTOMER
  //   }
  // }
]
