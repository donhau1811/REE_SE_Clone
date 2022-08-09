import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RoofVendorContractCUForm from './RoofVendorContractCUForm'
import { object } from 'prop-types'
import { injectIntl } from 'react-intl'
import { mockContract } from './mock'

// eslint-disable-next-line no-unused-vars
const UpdateRoofVendorContract = ({ intl }) => {
  const history = useHistory()
  const [isReadOnly, setIsReadOnly] = useState(true)
  const { id } = useParams()
  useEffect(() => {
    console.log('fetch data !!')
  }, [id])
  const handleCancel = () => {
    history.push()
  }
  const handleUpdateRoofVendorContract = (value) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      console.log('update infomation !!', value)
    }
  }
  return (
    <RoofVendorContractCUForm
      isReadOnly={isReadOnly}
      onCancel={handleCancel}
      onSubmit={handleUpdateRoofVendorContract}
      initValues={{ ...mockContract[0], ...mockContract[0].typeContract, ...mockContract[0].roofVendor }}
    />
  )
}
UpdateRoofVendorContract.propTypes = {
  intl: object
}

export default injectIntl(UpdateRoofVendorContract)
