
import { ROUTER_URL } from '@src/utility/constants'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { mockData } from './mock-data'
import OperationCUForm from './OperationCUForm'
import { putOperationUnit } from './store/actions'

const UpdateOperationUnit = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const id = searchParams.get('id')
  console.log('id', id)
  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
  }

  const handleUpdateOperationUnit = (values) => {
    console.log('values', values)
    dispatch(
        putOperationUnit({
        params: values,
        callback: () => {
          history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
        }
      })
    )
  }
  return <OperationCUForm onSubmit={handleUpdateOperationUnit} onCancel={handleCancel} initValues={mockData} />
}

export default UpdateOperationUnit
