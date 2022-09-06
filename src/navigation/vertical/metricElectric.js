import { ROUTER_URL } from '@constants/router'
import electric from '@src/assets/images/svg/sidebar/icon-electric.svg'
import React from 'react'

export default [
  {
    id: 'metricElectric',
    title: 'metricElectric',
    icon: <img src={electric} alt='electric'/>,
    children: [
      {
        id: 'metricClock',
        title: 'metricClock',
        action: 'manage',
        resource: ROUTER_URL.BILLING_METRIC_CLOCK,
        navLink: ROUTER_URL.BILLING_METRIC_CLOCK
      }
    ]
  }
]
