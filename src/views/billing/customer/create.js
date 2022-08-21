import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CustomerCUForm from './CustomerCUForm'
import { postCustomer } from './store/actions'

import BreadCrumbs from '@src/views/common/breadcrumbs'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import classNames from 'classnames'
const MySweetAlert = withReactContent(SweetAlert)

const CreateCustomerCOM = ({ intl }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const handleAddCustomer = (values) => {
    dispatch(
      postCustomer({
        params: { ...values, state: values.state?.value, type: values.type?.value },
        callback: () => {
          history.push(ROUTER_URL.BILLING_CUSTOMER)
        },
        intl,
        skin
      })
    )
  }

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_CUSTOMER)
  }
  return <CustomerCUForm onCancel={handleCancel} onSubmit={handleAddCustomer} />
}

CreateCustomerCOM.propTypes = {
  intl: object
}

export default injectIntl(CreateCustomerCOM)

export const Navbar = () => {
  const {
    layout: { skin },
    form: { isFormGlobalDirty }
  } = useSelector((state) => state)
  const intl = useIntl()
  const history = useHistory()

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
          history.push(ROUTER_URL.BILLING_CUSTOMER)
        }
      })
    }
    history.push(ROUTER_URL.BILLING_CUSTOMER)
  }

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    {
      name: intl.formatMessage({ id: 'customers' }),
      innerProps: { tag: 'a', href: '#', onClick: handleBreadCrumbsRedirct }
    },
    {
      name: intl.formatMessage({ id: 'create-customer' }),
      link: ''
    }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
