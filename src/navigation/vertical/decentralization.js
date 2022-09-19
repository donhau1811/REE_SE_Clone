import { ROUTER_URL } from '@constants/router'
import rightsGroup from '@src/assets/images/svg/sidebar/rightsGroup.svg'
import React from 'react'

export default [
  {
    id: 'decentralization',
    title: 'decentralization',
    icon: <img src={rightsGroup} alt='rightsGroup'/>,
    action: 'manage',
    resource: ROUTER_URL.SYSTEM_DECENTRALIZATION,
    navLink:ROUTER_URL.SYSTEM_DECENTRALIZATION
  }
]
