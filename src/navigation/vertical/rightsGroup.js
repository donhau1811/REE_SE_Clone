import { ROUTER_URL } from '@constants/router'
import role from '@src/assets/images/svg/role.svg'
import React from 'react'

export default [
  {
    id: 'permission-group',
    title: 'permission-group',
    icon: <img src={role} alt='rightsGroup'/>,
    action: 'manage',
    resource: ROUTER_URL.SYSTEM_PERMISSION_GROUP,
    navLink:ROUTER_URL.SYSTEM_PERMISSION_GROUP
  }
]
