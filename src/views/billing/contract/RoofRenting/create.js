/* eslint-disable no-unused-vars */
import React from 'react'
import { injectIntl } from 'react-intl'
import { object } from 'prop-types'
import { useHistory } from 'react-router-dom'
import RoofVendorContractCUForm from './RoofVendorContractCUForm'

const CreateRoofVendorContract = ({ intl }) => {
  const history = useHistory()

  const handleAddRoofVendorContract = (values) => console.log('Insert values', values)
  const handleCancel = () => {
    history.push('')
  }
  return (
    <>
     <RoofVendorContractCUForm onCancel={handleCancel} onSubmit={handleAddRoofVendorContract} />
    </>
  )

}
CreateRoofVendorContract.propTypes = {
    intl: object
  }
export default injectIntl(CreateRoofVendorContract)
