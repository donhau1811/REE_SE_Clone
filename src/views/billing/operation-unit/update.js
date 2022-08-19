import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import OperationCUForm from './OperationUnitCUForm'
import { getOperationUnitById, putOperationUnit } from './store/actions'

const UpdateOperationUnit = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isReadOnly, setIsReadOnly] = useState(true)
  const {
    company: { selectedCompany }
  } = useSelector((state) => state)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.allowUpdate) setIsReadOnly(false)
  }, [location.state?.allowUpdate])

  const { id } = useParams()
  useEffect(() => {
    dispatch(
      getOperationUnitById({
        id,
        isSavedToState: true
      })
    )
  }, [id])

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
  }

  const {
    layout: { skin }
  } = useSelector((state) => state)

  const handleUpdateOperationUnit = (values) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      dispatch(
        putOperationUnit({
          params: { ...values, state: values.state?.value, id },
          callback: () => {
            history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
          },
          intl,
          skin
        })
      )
    }
  }
  return (
    <>
      <OperationCUForm
        onSubmit={handleUpdateOperationUnit}
        onCancel={handleCancel}
        initValues={selectedCompany}
        isReadOnly={isReadOnly}
        submitText={intl.formatMessage({ id: isReadOnly ? 'Update' : 'Save' })}
      />
    </>
  )
}

UpdateOperationUnit.propTypes = {
  intl: object
}

export default injectIntl(UpdateOperationUnit)
