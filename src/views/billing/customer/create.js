import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CustomerCUForm from './CustomerCUForm'
import { postCustomer } from './store/actions'

const CreateCustomerCOM = ({ intl }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const handleAddCustomer = (values) => {
    dispatch(
      postCustomer({
        params: values,
        callback: () => {
          history.push(ROUTER_URL.BILLING_CUSTOMER)
        },
        intl,
        skin
      })
    )
  }

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_CUSTOMER)
  }
  return (
    <>
      <CustomerCUForm onCancel={handleCancel} onSubmit={handleAddCustomer} />
    </>
  )
}

CreateCustomerCOM.propTypes = {
  intl: object
}

export default injectIntl(CreateCustomerCOM)
