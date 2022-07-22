import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import RoofUnit from './RoofUnitCUForm'

const CreateRoofRentalUnit = ({ intl }) => {
  const history = useHistory()

  const handleAddCustomer = (values) => {
    console.log(values, intl)
  }

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_CUSTOMER)
  }
  return (
    <>
      <RoofUnit onCancel={handleCancel} onSubmit={handleAddCustomer} />
    </>
  )
}

CreateRoofRentalUnit.propTypes = {
  intl: object
}

export default injectIntl(CreateRoofRentalUnit)
