import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import OperationCUForm from './SettingsCUForm'
import { postOperationUnit } from './store/actions'

const CreateOperationUnit = ({ intl }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const handleAddOperationUnit = (values) => {
    console.log('values', values)
    dispatch(
      postOperationUnit({
        params: values,
        callback: () => {
          history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
        },
        skin,
        intl
      })
    )
  }

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
  }
  return <OperationCUForm onSubmit={handleAddOperationUnit} onCancel={handleCancel} />
}

CreateOperationUnit.propTypes = {
  intl: object
}

export default injectIntl(CreateOperationUnit)
