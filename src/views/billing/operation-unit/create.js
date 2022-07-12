import { ROUTER_URL } from '@src/utility/constants'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import OperationCUForm from './OperationCUForm'
import { postOperationUnit } from './store/actions'

const CreateOperationUnit = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleAddOperationUnit = (values) => {
    console.log('values', values)
    dispatch(
      postOperationUnit({
        params: values,
        callback: () => {
          history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
        }
      })
    )
  }

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
  }
  return <OperationCUForm onSubmit={handleAddOperationUnit} onCancel={handleCancel} />
}

export default injectIntl(CreateOperationUnit)
