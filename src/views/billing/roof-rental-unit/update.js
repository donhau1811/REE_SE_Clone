import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import RoofUnit from './RoofUnitCUForm'
import { Tab, Tabs } from '@mui/material'
import ProjectTable from './ProjectTable'
import { useDispatch, useSelector } from 'react-redux'
import { getRoofVendorWithContactsById, putRoofVendors } from './store/actions/index'
const UpdateRoofRentalUnit = ({ intl }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isReadOnly, setIsReadOnly] = useState(true)
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

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
  }

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleUpdateRentalUnit = (values) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      dispatch(
        putRoofVendors({
          params: { ...values, state: values.state?.value, type: values.type?.value, id},
          callback: () => {
            history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
          },
          intl,
          skin
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
