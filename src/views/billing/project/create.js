/* eslint-disable no-unused-vars */
import { ISO_DISPLAY_DATE_TIME_FORMAT, ROUTER_URL } from '@src/utility/constants'
import moment from 'moment'
import { object } from 'prop-types'
import React from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ProjectCUForm from './ProjectCUForm'
import { postProject } from './store/actions'
import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import '@src/@core/scss/billing-sweet-alert.scss'
import withReactContent from 'sweetalert2-react-content'
import BreadCrumbs from '@src/views/common/breadcrumbs'

const MySweetAlert = withReactContent(SweetAlert)

const CreateProject = ({ intl }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    layout: { skin }
  } = useSelector((state) => state)

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_PROJECT)
  }

  const handleCreateProject = (newProject) => {
    const params = {
      name: newProject.name,
      code: newProject.code,
      address: newProject.address,
      startDate: newProject.startDate ? moment(newProject.startDate).format(ISO_DISPLAY_DATE_TIME_FORMAT) : null,
      userIds: (newProject.accountantIds || []).map((item) => item.value),
      operationCompanyId: newProject.companyId?.value,
      capacity: Number(newProject.power) || null,
      state: 'ACTIVE'
    }

    dispatch(
      postProject({
        params,
        callback: (res) => {
          history.push({
            pathname: `${ROUTER_URL.BILLING_PROJECT}/${res.id}`,
            state: { isFromCreateStep: true, allowUpdate: true }
          })
        }
      })
    )
  }
  return <ProjectCUForm onCancel={handleCancel} onSubmit={handleCreateProject} />
}

CreateProject.propTypes = {
  intl: object
}

export default injectIntl(CreateProject)

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
    { name: intl.formatMessage({ id: 'project management' }) },
    {
      name: intl.formatMessage({ id: 'project' }),
      innerProps: { tag: 'a', href: '#', onClick: handleBreadCrumbsRedirct }
    },
    { name: intl.formatMessage({ id: 'create-project' }) }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
