import { ROUTER_URL } from '@src/utility/constants'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getContractById, putCustomerContract } from '../store/actions'
import CUForm from './CUForm'
import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import '@src/@core/scss/billing-sweet-alert.scss'
import withReactContent from 'sweetalert2-react-content'
import { injectIntl } from 'react-intl'
import { object } from 'prop-types'

const MySweetAlert = withReactContent(SweetAlert)

function PowerSellingCreateCOM({ intl }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { projectId, id } = useParams()
  const {
    projectContracts: { selectedContract }
  } = useSelector((state) => state)
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const [isReadOnly, setIsReadOnly] = useState(true)

  const handleCancel = () => {
    if (!isReadOnly) {
      return MySweetAlert.fire({
        title: intl.formatMessage({ id: 'Cancel' }),
        text: intl.formatMessage({ id: 'You want to cancel update' }),
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
    history.push({
      pathname: `${ROUTER_URL.BILLING_PROJECT}/${projectId}`,
      state: {
        allowUpdate: true
      }
    })
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
