import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import CustomerCUForm from './CustomerCUForm'
import { getCustomerWithContactsById, putCustomer } from './store/actions'
import { Tab, Tabs } from '@mui/material'
import ProjectTable from './ProjectTable'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

import BreadCrumbs from '@src/views/common/breadcrumbs'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import classNames from 'classnames'
const MySweetAlert = withReactContent(SweetAlert)

const UpdateOperationUnit = ({ intl }) => {
  const history = useHistory()

  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(1)
  const { id } = useParams()
  const location = useLocation()

  const [isReadOnly, setIsReadOnly] = useState(true)

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_CUSTOMER)
  }
  const {
    layout: { skin },
    billingCustomer: { selectedCustomer },
    billingContacts: { contacts }
  } = useSelector((state) => state)

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue)
  }
  useEffect(() => {
    if (location.state?.allowUpdate) setIsReadOnly(false)
  }, [location.state?.allowUpdate])
  useEffect(() => {
    dispatch(
      getCustomerWithContactsById({
        id,
        isSavedToState: true
      })
    )
  }, [id])

  const handleUpdateCustomer = (values) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      dispatch(
        putCustomer({
          params: { ...values, state: values.state?.value, type: values.type?.value, id },
          callback: () => {
            history.push(ROUTER_URL.BILLING_CUSTOMER)
          },
          skin,
          intl
        })
      )
    }
  }

  return (
    <>
      {' '}
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
        classes={{
          root: 'mb-2 tabs-border-bottom'
        }}
      >
        <Tab classes={{ root: 'general-tab' }} label={intl.formatMessage({ id: 'Customer info' })} value={1} />
        <Tab classes={{ root: 'general-tab' }} label={intl.formatMessage({ id: 'projects' })} value={2} />
      </Tabs>
      {activeTab === 1 && (
        <CustomerCUForm
          isViewed={isReadOnly}
          onSubmit={handleUpdateCustomer}
          onCancel={handleCancel}
          initValues={selectedCustomer}
          contacts={contacts}
          submitText={intl.formatMessage({ id: isReadOnly ? 'Update' : 'Save' })}
          cancelText={intl.formatMessage({ id: isReadOnly ? 'Back' : 'Cancel' })}
        />
      )}
      {activeTab === 2 && <ProjectTable />}
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
    billingCustomer: { selectedCustomer }
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
    { name: selectedCustomer?.fullName, link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
