import { ISO_DISPLAY_DATE_TIME_FORMAT, ROUTER_URL } from '@src/utility/constants'
import moment from 'moment'
import { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import ProjectCUForm from './ProjectCUForm'
import { getBillingProjectById, putProject } from './store/actions'
import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import '@src/@core/scss/billing-sweet-alert.scss'
import withReactContent from 'sweetalert2-react-content'
import BreadCrumbs from '@src/views/common/breadcrumbs'

const MySweetAlert = withReactContent(SweetAlert)

const UpdateOperationUnit = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isReadOnly, setIsReadOnly] = useState(true)

  const location = useLocation()

  const {
    projects: { selectedProject: selectedBillingProject }
  } = useSelector((state) => state)

  const { id } = useParams()

  useEffect(() => {
    if (location.state?.allowUpdate) setIsReadOnly(false)
  }, [location.state?.allowUpdate])

  useEffect(() => {
    dispatch(
      getBillingProjectById({
        id,
        isSavedToState: true
      })
    )
  }, [id])

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_PROJECT)
  }

  const handleUpdateOperationUnit = (values) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      const params = {
        name: values.name,
        code: values.code,
        address: values.address,
        startDate: values.startDate ? moment(values.startDate).format(ISO_DISPLAY_DATE_TIME_FORMAT) : null,
        userIds: (values.accountantIds || []).map((item) => item.value),
        operationCompanyId: values.companyId?.value,
        capacity: values.power || null,
        state: values.state?.value,
        id
      }
      dispatch(
        putProject({
          params,
          callback: () => {
            history.push(ROUTER_URL.BILLING_PROJECT)
          }
        })
      )
    }
  }
  return (
    <>
      <ProjectCUForm
        onSubmit={handleUpdateOperationUnit}
        onCancel={handleCancel}
        initValues={selectedBillingProject}
        isReadOnly={isReadOnly}
        submitText={intl.formatMessage({
          id: location.state?.isFromCreateStep ? 'Finish' : isReadOnly ? 'Update' : 'Save'
        })}
        cancelButton={location.state?.isFromCreateStep && null}
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
    form: { isFormGlobalDirty },
    projects: { selectedProject: selectedBillingProject }
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
    { name: selectedBillingProject?.name, link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
