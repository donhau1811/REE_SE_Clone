import { lazy } from 'react'
import { ROUTER_URL } from '@constants/router'

export const SystemRoutes = [
  {
    path: ROUTER_URL.SYSTEM_RIGHTS_GROUP,
    exact: true,
    component: lazy(() => import('../../views/system/rights-group')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.SYSTEM_RIGHTS_GROUP
    }
  },
  {
    path: ROUTER_URL.SYSTEM_RIGHTS_GROUP_UPDATE,
    exact: true,
    component: lazy(() => import('../../views/system/rights-group/update')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.SYSTEM_RIGHTS_GROUP
    }
  }


]
