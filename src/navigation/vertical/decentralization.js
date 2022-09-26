import { ROUTER_URL } from '@constants/router'
import permision from '@src/assets/images/svg/permision.svg'
import React from 'react'

export default [
  {
    id: 'user-role',
    title: 'user-role',
    icon: <img src={permision} alt='rightsGroup'/>,
    action: 'manage',
    resource: ROUTER_URL.SYSTEM_DECENTRALIZATION,
    navLink:ROUTER_URL.SYSTEM_DECENTRALIZATION
  }
]
