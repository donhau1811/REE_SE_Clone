import { lazy } from 'react'
import { ROUTER_URL } from '@constants/router'

export const SystemRoutes = [
  {
    path: ROUTER_URL.SYSTEM_PERMISSION_GROUP,
    exact: true,
    component: lazy(() => import('../../views/system/permission-group/index')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.SYSTEM_PERMISSION_GROUP,
      navLink: ROUTER_URL.SYSTEM_PERMISSION_GROUP

    }
  },
  {
    path: ROUTER_URL.SYSTEM_PERMISSION_GROUP_UPDATE,
    exact: true,
    navbar: require('../../views/system/permission-group/update')?.Navbar,
    component: lazy(() => import('../../views/system/permission-group/update')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.SYSTEM_PERMISSION_GROUP,
      navLink: ROUTER_URL.SYSTEM_PERMISSION_GROUP

    }
  },
  {
    path: ROUTER_URL.SYSTEM_DECENTRALIZATION,
    exact: true,
    component: lazy(() => import('../../views/system/user-role/index')),
    meta: {
      action: 'manage',
      resource: ROUTER_URL.SYSTEM_DECENTRALIZATION,
      navLink: ROUTER_URL.SYSTEM_DECENTRALIZATION

    }
  }


]
