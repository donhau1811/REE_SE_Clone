import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useState, useEffect } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import RoofUnit from './RoofUnitCUForm'
import { Tab, Tabs } from '@mui/material'
import ProjectTable from './ProjectTable'
import { useDispatch, useSelector } from 'react-redux'
import { getRoofVendorWithContactsById, putRoofVendors } from './store/actions/index'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import BreadCrumbs from '@src/views/common/breadcrumbs'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import classNames from 'classnames'
const MySweetAlert = withReactContent(SweetAlert)

const UpdateRoofRentalUnit = ({ intl }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isReadOnly, setIsReadOnly] = useState(true)
  const location = useLocation()
  useEffect(() => {
    if (location.state?.allowUpdate) setIsReadOnly(false)
  }, [location.state?.allowUpdate])

  const {
    layout: { skin },
    roofUnit: { selectedRoofVendor },
    billingContacts: { contacts }
  } = useSelector((state) => state)

  const [activeTab, setActiveTab] = useState(1)
  const { id } = useParams()
  useEffect(() => {
    dispatch(
      getRoofVendorWithContactsById({
        id,
        isSavedToState: true
      })
    )
  }, [id])

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleUpdateRentalUnit = (values) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      dispatch(
        putRoofVendors({
          params: { ...values, state: values.state?.value, type: values.type?.value, id },
          callback: () => {
            history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
          },
          intl,
          skin
        })
      )
    }
  }
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
            pathname: `${ROUTER_URL.BILLING_ROOF_RENTAL_UNIT}`,
            state: {
              allowUpdate: true
            }
          })
        }
      })
    }
    history.push({
      pathname: `${ROUTER_URL.BILLING_ROOF_RENTAL_UNIT}`,
      state: {
        allowUpdate: true
      }
    })
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
        <Tab classes={{ root: 'general-tab' }} label={intl.formatMessage({ id: 'Roof Vendors info' })} value={1} />
        <Tab classes={{ root: 'general-tab' }} label={intl.formatMessage({ id: 'projects' })} value={2} />
      </Tabs>
      {activeTab === 1 && (
        <RoofUnit
          isReadOnly={isReadOnly}
          onSubmit={handleUpdateRentalUnit}
          onCancel={handleCancel}
          initValues={selectedRoofVendor}
          contacts={contacts}
        />
      )}
      {activeTab === 2 && <ProjectTable />}
    </>
  )
}

UpdateRoofRentalUnit.propTypes = {
  intl: object
}

export default injectIntl(UpdateRoofRentalUnit)

export const Navbar = () => {
  const {
    layout: { skin },
    form: { isFormGlobalDirty },
    company: { selectedCompany }
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
          history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
        }
      })
    }
    history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
  }

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    {
      name: intl.formatMessage({ id: 'roof-rental-unit' }),
      innerProps: { tag: 'a', href: '#', onClick: handleBreadCrumbsRedirct }
    },
    { name: selectedCompany?.name, link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
