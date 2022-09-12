import { ROUTER_URL } from '@constants/router'
import electric from '@src/assets/images/svg/sidebar/icon-electric.svg'
import React from 'react'

export default [
  {
    id: 'electricity-index',
    title: 'electricity-index',
    icon: <img src={electric} alt='electric'/>,
    children: [
      {
        id: 'clock-index',
        title: 'clock-index',
        action: 'manage',
        resource: ROUTER_URL.BILLING_METRIC_CLOCK,
        navLink: ROUTER_URL.BILLING_METRIC_CLOCK
      },
      {
        id: 'manual-input-index',
        title: 'manual-input-index',
        action: 'manage',
        resource: ROUTER_URL.BILLING_MANUAL_INPUT_METRIC_CLOCK,
        navLink: ROUTER_URL.BILLING_MANUAL_INPUT_METRIC_CLOCK
      }
    ]
  }
]
