import { ROUTER_URL } from '@constants/router'
import configuration from '@src/assets/images/svg/sidebar/master-data.svg'
import React from 'react'

export default [
  {
    id: 'configuration',
    title: 'Configuration',
    icon: <img src={configuration} alt='configuration'/>,
    action: 'manage',
    resource: ROUTER_URL.BILLING_SETTING,
    navLink: ROUTER_URL.BILLING_SETTING
  }
]
