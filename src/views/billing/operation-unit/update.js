import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import OperationCUForm from './OperationUnitCUForm'
import { getOperationUnitById, putOperationUnit } from './store/actions'
import BreadCrumbs from '@src/views/common/breadcrumbs'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import classNames from 'classnames'
const MySweetAlert = withReactContent(SweetAlert)

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

  const handleCancel = (isDirty) => {
    if (isDirty) {
      return MySweetAlert.fire({
        title: intl.formatMessage({ id: 'Cancel confirmation' }),
        text: intl.formatMessage({ id: 'Are you sure to cancel?' }),
        showCancelButton: true,
        confirmButtonText: intl.formatMessage({ id: 'Yes' }),
        cancelButtonText: intl.formatMessage({ id: 'No, Thanks' }),
        customClass: {
          popup: classNames({
            'sweet-alert-popup--dark': skin === 'dark',
            'sweet-popup': true
          }),
          header: 'sweet-title',
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary ml-1',
          actions: 'sweet-actions',
          content: 'sweet-content'
        },
        buttonsStyling: false
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          history.push({
            pathname: `${ROUTER_URL.BILLING_OPERATION_UNIT}`,
            state: {
              allowUpdate: true
            }
          })
        }
      })
    }
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

export const Navbar = () => {
  const {
    layout: { skin },
    form: { isFormGlobalDirty }
  } = useSelector((state) => state)
  const intl = useIntl()
  const history = useHistory()
  const {
    company: { selectedCompany }
  } = useSelector((state) => state)
  const handleBreadCrumbsRedirct = (event) => {
    event.preventDefault()
    if (isFormGlobalDirty) {
      return MySweetAlert.fire({
        title: intl.formatMessage({ id: 'Cancel confirmation' }),
        text: intl.formatMessage({ id: 'Are you sure to cancel?' }),
        showCancelButton: true,
        confirmButtonText: intl.formatMessage({ id: 'Yes' }),
        cancelButtonText: intl.formatMessage({ id: 'No, Thanks' }),
        customClass: {
          popup: classNames({
            'sweet-alert-popup--dark': skin === 'dark',
            'sweet-popup': true
          }),
          header: 'sweet-title',
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary ml-1',
          actions: 'sweet-actions',
          content: 'sweet-content'
        },
        buttonsStyling: false
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
        }
      })
    }
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
  }

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    {
      name: intl.formatMessage({ id: 'operation-units' }),
      innerProps: { tag: 'a', href: '#', onClick: handleBreadCrumbsRedirct }
    },
    { name: selectedCompany?.name, link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
