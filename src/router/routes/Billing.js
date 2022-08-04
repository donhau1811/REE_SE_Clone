import { lazy } from 'react'
import { ROUTER_URL } from '@constants/router'

export const BillingRoutes = [
  {
    path: ROUTER_URL.BILLING_OPERATION_UNIT,
    exact: true,
    component: lazy(() => import('../../views/billing/operation-unit')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_OPERATION_UNIT,
      navLink: ROUTER_URL.BILLING_OPERATION_UNIT
    }
  },
  {
    path: ROUTER_URL.BILLING_OPERATION_UNIT_CREATE,
    exact: true,
    component: lazy(() => import('../../views/billing/operation-unit/create')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_OPERATION_UNIT,
      navLink: ROUTER_URL.BILLING_OPERATION_UNIT
    }
  },
  {
    path: ROUTER_URL.BILLING_OPERATION_UNIT_UPDATE,
    component: lazy(() => import('../../views/billing/operation-unit/update')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_OPERATION_UNIT,
      navLink: ROUTER_URL.BILLING_OPERATION_UNIT
    }
  },
  {
    path: ROUTER_URL.BILLING_CUSTOMER,
    component: lazy(() => import('../../views/billing/customer')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_CUSTOMER,
      navLink: ROUTER_URL.BILLING_CUSTOMER
    }
  },
  {
    path: ROUTER_URL.BILLING_CUSTOMER,
    component: lazy(() => import('../../views/billing/customer')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_CUSTOMER,
      navLink: ROUTER_URL.BILLING_CUSTOMER
    }
  },
  {
    path: ROUTER_URL.BILLING_CUSTOMER_UPDATE,
    component: lazy(() => import('../../views/billing/customer/update')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_CUSTOMER,
      navLink: ROUTER_URL.BILLING_CUSTOMER
    }
  },
  {
    path: ROUTER_URL.BILLING_CUSTOMER_CREATE,
    exact: true,
    component: lazy(() => import('../../views/billing/customer/create')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_CUSTOMER,
      navLink: ROUTER_URL.BILLING_CUSTOMER
    }
  },
  {
    path: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT,
    component: lazy(() => import('../../views/billing/roof-rental-unit/index')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT,
      navLink: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT
    }
  },
  {
    path: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT_CREATE,
    component: lazy(() => import('../../views/billing/roof-rental-unit/create')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT,
      navLink: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT
    }
  },
  {
    path: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT_UPDATE,
    component: lazy(() => import('../../views/billing/roof-rental-unit/update')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT,
      navLink: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT
    }
  },
  {
    path: ROUTER_URL.BILLING_SETTING,
    component: lazy(() => import('../../views/billing/settings/index')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_SETTING,
      navLink: ROUTER_URL.BILLING_SETTING
    }
  },
  {
    path: ROUTER_URL.BILLING_SETTING_UPDATE,
    component: lazy(() => import('../../views/billing/settings/update')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_SETTING,
      navLink: ROUTER_URL.BILLING_SETTING
    }
  },
  {
    path: ROUTER_URL.BILLING_PROJECT,
    component: lazy(() => import('../../views/billing/project/index')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_PROJECT,
      navLink: ROUTER_URL.BILLING_PROJECT
    }
  },
  {
    path: ROUTER_URL.BILLING_PROJECT_CREATE_ROOF_VENDOR,
    component: lazy(() => import('../../views/billing/project/roofVendorContract/RoofVendorContractCUForm')),
    exact: true,
    meta: {
      action: 'manage',
      resource: ROUTER_URL.BILLING_PROJECT_CREATE_ROOF_VENDOR,
      navLink: ROUTER_URL.BILLING_PROJECT_CREATE_ROOF_VENDOR
    }
  }
]
