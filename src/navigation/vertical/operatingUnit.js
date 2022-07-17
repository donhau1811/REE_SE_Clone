import { ROUTER_URL } from '@constants/router'
import operatingUnit from '@src/assets/images/svg/sidebar/operating-unit.svg'
import React from 'react'

export default [
  {
    id: 'operatingUnit',
    title: 'OperatingCompany',
    icon: <img src={operatingUnit} alt='operating-company'/>,
    action: 'manage',
    resource: ROUTER_URL.BILLING_OPERATION_UNIT,
    navLink:ROUTER_URL.BILLING_OPERATION_UNIT
  }
]
