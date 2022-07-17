import { ROUTER_URL } from '@constants/router'
import customer from '@src/assets/images/svg/sidebar/customer.svg'
import React from 'react'

export default [
  {
    id: 'customer',
    title: 'Customer',
    icon: <img src={customer} alt='customer'/>,
    action: 'manage',
    resource: ROUTER_URL.BILLING_CUSTOMER,
    navLink: ROUTER_URL.BILLING_CUSTOMER
  }
]
