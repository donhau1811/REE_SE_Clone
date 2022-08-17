import { ROUTER_URL } from '@constants/router'
import roof from '@src/assets/images/svg/sidebar/roof.svg'
import React from 'react'

export default [
  {
    id: 'roofRentalCompany',
    title: 'Roof Rental Company',
    icon: <img src={roof} alt='Roof Rental Company'/>,
    action: 'manage',
    resource: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT,
    navLink: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT
  }
]
