import { ROUTER_URL } from '@src/utility/constants'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { getContractById, putCustomerContract } from '../store/actions'
import CUForm from './CUForm'
import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import '@src/@core/scss/billing-sweet-alert.scss'
import withReactContent from 'sweetalert2-react-content'
import { injectIntl, useIntl } from 'react-intl'
import { object } from 'prop-types'
import BreadCrumbs from '@src/views/common/breadcrumbs'

const MySweetAlert = withReactContent(SweetAlert)

function PowerSellingCreateCOM({ intl }) {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const { projectId, id } = useParams()
  const {
    projectContracts: { selectedContract }
  } = useSelector((state) => state)

  const [isReadOnly, setIsReadOnly] = useState(true)

  useEffect(() => {
    if (location.state?.allowUpdate) setIsReadOnly(false)
  }, [location.state?.allowUpdate])

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
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      dispatch(
        putCustomerContract({
          payload: { ...payload, id: Number(id) },
          callback: () => {
            history.push(`${ROUTER_URL.BILLING_PROJECT}/${projectId}`)
          }
        })
      )
    }
  }

  return (
    <>
      <CUForm
        isReadOnly={isReadOnly}
        onCancel={handleCancel}
        onSubmit={handleSubmitCustomerContract}
        initValues={selectedContract}
        submitText={intl.formatMessage({ id: isReadOnly ? 'Update' : 'Save' })}
        cancelText={intl.formatMessage({ id: isReadOnly ? 'Back' : 'Cancel' })}
      />
    </>
  )
}

PowerSellingCreateCOM.propTypes = {
  intl: object
}

export default injectIntl(PowerSellingCreateCOM)

export const Navbar = () => {
  const {
    layout: { skin },
    form: { isFormGlobalDirty },
    projects: { selectedProject: selectedBillingProject },
    projectContracts : {selectedContract : selectedContract}

  } = useSelector((state) => state)
  const intl = useIntl()
  const history = useHistory()

  const handleBreadCrumbsRedirct = (pathname) => (event) => {
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
          history.push(pathname)
        }
      })
    }
    history.push(pathname)
  }

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    { name: intl.formatMessage({ id: 'project management' }), link: '' },
    {
      name: intl.formatMessage({ id: 'project' }),
      innerProps: { tag: 'a', href: '#', onClick: handleBreadCrumbsRedirct(ROUTER_URL.BILLING_PROJECT) }
    },
    {
      name: selectedBillingProject?.name,
      innerProps: {
        tag: 'a',
        href: '#',
        onClick: handleBreadCrumbsRedirct(`${ROUTER_URL.BILLING_PROJECT}/${selectedBillingProject?.id}`)
      }
    },
    { name: selectedContract?.code}
  ]

  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
