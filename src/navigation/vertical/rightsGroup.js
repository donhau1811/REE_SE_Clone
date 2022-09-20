import { ROUTER_URL } from '@constants/router'
import rightsGroup from '@src/assets/images/svg/sidebar/rightsGroup.svg'
import React from 'react'

export default [
  {
    id: 'permission-group',
    title: 'permission-group',
    icon: <img src={rightsGroup} alt='rightsGroup'/>,
    action: 'manage',
    resource: ROUTER_URL.SYSTEM_PERMISSION_GROUP,
    navLink:ROUTER_URL.SYSTEM_PERMISSION_GROUP
  }
]
