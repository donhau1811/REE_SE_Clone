import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import RoofUnit from './RoofUnitCUForm'
import { useDispatch, useSelector } from 'react-redux'
import { postRoofVendors } from './store/actions'

const CreateRoofRentalUnit = ({ intl }) => {
  const history = useHistory()
  const [isDuplicateCode, setIsDuplicateCode] = useState(false)
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const handleAddRoofVendors = (values) => {
    dispatch(
      postRoofVendors({
        params: { ...values, state: values?.state?.value },
        callback: (value) => {
          if (!value) {
            history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
          }
          setIsDuplicateCode(value)
        },
        skin,
        intl
      })
    )
  }

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
  }
  return (
    <>
      <RoofUnit isDuplicateCode={isDuplicateCode} onCancel={handleCancel} onSubmit={handleAddRoofVendors} />
    </>
  )
}

CreateRoofRentalUnit.propTypes = {
  intl: object
}

export default injectIntl(CreateRoofRentalUnit)
