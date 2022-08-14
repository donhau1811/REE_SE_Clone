import { ROUTER_URL } from '@src/utility/constants'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getContractById, putCustomerContract } from '../store/actions'
import CUForm from './CUForm'

export default function PowerSellingCreateCOM() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { projectId, id } = useParams()
  const {
    projectContracts: { selectedContract }
  } = useSelector((state) => state)

  const handleCancel = () => {
    history.push(`${ROUTER_URL.BILLING_PROJECT}/${projectId}`)
  }

  useEffect(() => {
    dispatch(
      getContractById({
        id,
        isSavedToState: true
      })
    )
  }, [id])

  const handleSubmitCustomerContract = (payload) => {
    dispatch(
      putCustomerContract({
        payload: { ...payload, id: Number(id) },
        callback: () => {}
      })
    )
  }
  return (
    <>
      <CUForm onCancel={handleCancel} onSubmit={handleSubmitCustomerContract} initValues={selectedContract} />
    </>
  )
}
