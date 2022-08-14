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
import { injectIntl } from 'react-intl'
import { object } from 'prop-types'

const MySweetAlert = withReactContent(SweetAlert)
function PowerSellingUpdateCOM({ intl }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const {
    layout: { skin }
  } = useSelector((state) => state)

  const handleCancel = () => {
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Cancel' }),
      text: intl.formatMessage({ id: 'You want to cancel add new' }),
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
        cancelButton: 'btn btn-outline-secondary ml-1',
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
