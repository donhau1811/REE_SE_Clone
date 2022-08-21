import { object } from 'prop-types'
import { injectIntl, useIntl } from 'react-intl'
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
import BreadCrumbs from '@src/views/common/breadcrumbs'

const MySweetAlert = withReactContent(SweetAlert)
const CreateRoofVendorContract = ({ intl }) => {
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
    // eslint-disable-next-line no-unused-vars
    const { address, taxCode, contractCode, effectiveDate, expirationDate, contractType, ...newvalue } = values
    dispatch(
      postContractRoofVendor({
        newvalue,
        intl,
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
  const handleCancel = () => {
    history.push({
      pathname: `${ROUTER_URL.BILLING_PROJECT}/${projectId}`,
      state: {
        allowUpdate: true
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

export const Navbar = () => {
  const {
    layout: { skin },
    form: { isFormGlobalDirty },
    projects: { selectedProject: selectedBillingProject }
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
    { name: intl.formatMessage({ id: 'Add roof renting contract' }), link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
