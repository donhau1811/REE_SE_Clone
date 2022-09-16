import { ROUTER_URL } from '@constants/router'
import rightsGroup from '@src/assets/images/svg/sidebar/rightsGroup.svg'
import React from 'react'

export default [
  {
    id: 'rights-group',
    title: 'rights-group',
    icon: <img src={rightsGroup} alt='rightsGroup'/>,
    action: 'manage',
    resource: ROUTER_URL.SYSTEM_RIGHTS_GROUP,
    navLink:ROUTER_URL.SYSTEM_RIGHTS_GROUP
  }
]
