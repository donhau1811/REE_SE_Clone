import { ROUTER_URL } from '@src/utility/constants'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { postCustomerContract } from '../store/actions'
import CUForm from './CUForm'

export default function PowerSellingUpdateCOM() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { projectId } = useParams()

  const handleCancel = () => {
    history.push(`${ROUTER_URL.BILLING_PROJECT}/${projectId}`)
  }

  const handleSubmitCustomerContract = (payload) => {
    dispatch(
      postCustomerContract({
        payload,
        callback: () => {}
      })
    )
  }
  return (
    <>
      <CUForm onCancel={handleCancel} onSubmit={handleSubmitCustomerContract} />
    </>
  )
}
