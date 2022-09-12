import { ROUTER_URL, SET_FORM_DIRTY } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import OperationCUForm from './OperationUnitCUForm'
import { getOperationUnitById, putOperationUnit } from './store/actions'
import BreadCrumbs from '@src/views/common/breadcrumbs'

const UpdateOperationUnit = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isReadOnly, setIsReadOnly] = useState(true)
  const {
    layout: { skin },

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
    history.push({
      pathname: `${ROUTER_URL.BILLING_OPERATION_UNIT}`,
      state: {
        allowUpdate: true
      }
    })
  }

  const handleUpdateOperationUnit = (values) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      dispatch(
        putOperationUnit({
          params: { ...values, state: values.state?.value, id },
          callback: () => {
            dispatch({
              type: SET_FORM_DIRTY,
              payload: false
            })
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
      />
    </>
  )
}

UpdateOperationUnit.propTypes = {
  intl: object
}

export default injectIntl(UpdateOperationUnit)

export const Navbar = () => {
  const intl = useIntl()
  const {
    company: { selectedCompany }
  } = useSelector((state) => state)

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    {
      name: intl.formatMessage({ id: 'operation-units' }),
      link: ROUTER_URL.BILLING_OPERATION_UNIT
    },
    { name: selectedCompany?.name, link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
