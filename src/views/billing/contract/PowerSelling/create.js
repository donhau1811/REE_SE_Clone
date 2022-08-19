import { ROUTER_URL } from '@src/utility/constants'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { postCustomerContract } from '../store/actions'
import CUForm from './CUForm'
import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import '@src/@core/scss/billing-sweet-alert.scss'
import withReactContent from 'sweetalert2-react-content'
import { injectIntl, useIntl } from 'react-intl'
import { object } from 'prop-types'
import BreadCrumbs from '@src/views/common/breadcrumbs'

const MySweetAlert = withReactContent(SweetAlert)

function PowerSellingUpdateCOM({ intl }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const {
    layout: { skin }
  } = useSelector((state) => state)

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
            pathname: `${ROUTER_URL.BILLING_PROJECT}/${projectId}`,
            state: {
              allowUpdate: true
            }
          })
        }
      })
    }
    history.push({
      pathname: `${ROUTER_URL.BILLING_PROJECT}/${projectId}`,
      state: {
        allowUpdate: true
      }
    })
  }

  const handleSubmitCustomerContract = (payload) => {
    dispatch(
      postCustomerContract({
        payload,
        callback: () => {
          history.push({
            pathname: `${ROUTER_URL.BILLING_PROJECT}/${projectId}`,
            state: {
              allowUpdate: true
            }
          })
        }
      })
    )
  }
  return (
    <>
      <CUForm onCancel={handleCancel} onSubmit={handleSubmitCustomerContract} />
    </>
  )
}

PowerSellingUpdateCOM.propTypes = {
  intl: object
}

export default injectIntl(PowerSellingUpdateCOM)

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
          history.push(ROUTER_URL.BILLING_PROJECT)
        }
      })
    }
    history.push(ROUTER_URL.BILLING_PROJECT)
  }

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    { name: intl.formatMessage({ id: 'project management' }), link: '' },
    {
      name: intl.formatMessage({ id: 'project' }),
      innerProps: { tag: 'a', href: '#', onClick: handleBreadCrumbsRedirct }
    },
    { name: intl.formatMessage({ id: 'power-selling-contract' }), link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
