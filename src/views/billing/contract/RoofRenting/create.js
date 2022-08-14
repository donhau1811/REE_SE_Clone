/* eslint-disable no-unused-vars */
import { object } from 'prop-types'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { postContractRoofVendor } from '../store/actions'
import RoofVendorContractCUForm from './RoofVendorContractCUForm'
import { ROUTER_URL } from '@src/utility/constants'
import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import '@src/@core/scss/billing-sweet-alert.scss'
import withReactContent from 'sweetalert2-react-content'
import { getBillingProjectById } from '../../project/store/actions'
import React, { useEffect } from 'react'

const MySweetAlert = withReactContent(SweetAlert)
const CreateRoofVendorContract = ({ intl }) => {
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const {
    projects: { selectedProject: selectedBillingProject }
  } = useSelector((state) => state)
  const history = useHistory()
  const { projectId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (Number(projectId) !== Number(selectedBillingProject?.id)) {
      dispatch(
        getBillingProjectById({
          id: projectId,
          isSavedToState: true
        })
      )
    }
  }, [projectId])

  const handleAddRoofVendorContract = (values) => {
    const { address, taxCode, contractCode, effectiveDate, expirationDate, contractType, ...newvalue } = values
    dispatch(
      postContractRoofVendor({
        newvalue,
        intl,
        callback: () => {
          history.push(`${ROUTER_URL.BILLING_PROJECT_UPDATE}`.replace(':id', projectId))
        }
      })
    )
  }
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
        history.push(`${ROUTER_URL.BILLING_PROJECT_UPDATE}`.replace(':id', projectId))
      }
    })
  }
  return (
    <>
      <RoofVendorContractCUForm onCancel={handleCancel} onSubmit={handleAddRoofVendorContract} />
    </>
  )
}
CreateRoofVendorContract.propTypes = {
  intl: object
}
export default injectIntl(CreateRoofVendorContract)
