import { ROUTER_URL } from '@constants/router'
import customer from '@src/assets/images/svg/sidebar/customer.svg'
import React from 'react'

export default [
  {
    id: 'roofRentalUnit',
    title: 'Roof Rental Unit',
    icon: <img src={customer} alt='Roof Rental Unit'/>,
    action: 'manage',
    resource: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT,
    navLink: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT
  }
]
