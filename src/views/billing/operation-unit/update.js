import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { mockData } from './mock-data'
import OperationCUForm from './OperationUnitCUForm'
import { putOperationUnit } from './store/actions'

const UpdateOperationUnit = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)
  const id = searchParams.get('id')
  console.log('id', id)
  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
  }

  const {
    layout: { skin }
  } = useSelector((state) => state)

  const handleUpdateOperationUnit = (values) => {
    console.log('values', values)
    dispatch(
      putOperationUnit({
        params: values,
        callback: () => {
          history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
        },
        intl,
        skin
      })
    )
  }
  return (
    <>
      <OperationCUForm onSubmit={handleUpdateOperationUnit} onCancel={handleCancel} initValues={mockData} />
    </>
  )
}

UpdateOperationUnit.propTypes = {
  intl: object
}

export default injectIntl(UpdateOperationUnit)
