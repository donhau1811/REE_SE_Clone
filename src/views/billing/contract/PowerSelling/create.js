import { ROUTER_URL } from '@src/utility/constants'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import CUForm from './CUForm'

export default function PowerSellingCreateCOM() {
  const history = useHistory()
  const { projectId } = useParams()

  const handleCancel = () => {
    history.push(`${ROUTER_URL.BILLING_PROJECT}/${projectId}`)
  }
  return (
    <>
      <CUForm onCancel={handleCancel} />
    </>
  )
}
