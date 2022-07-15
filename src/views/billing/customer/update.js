import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import CustomerCUForm from './CustomerCUForm'
import { mockUpdateForm } from './mock-data'
import { putCustomer } from './store/actions'
import { Tab, Tabs } from '@mui/material'
import ProjectTable from './ProjectTable'

const UpdateOperationUnit = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const [activeTab, setActiveTab] = useState(1)
  const searchParams = new URLSearchParams(search)
  const id = searchParams.get('id')
  console.log('id', id)
  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_CUSTOMER)
  }
  const {
    layout: { skin }
  } = useSelector((state) => state)

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleUpdateCustomer = (values) => {
    console.log('values', values)
    dispatch(
      putCustomer({
        params: values,
        callback: () => {
          history.push(ROUTER_URL.BILLING_CUSTOMER)
        },
        skin,
        intl
      })
    )
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
        <CustomerCUForm onSubmit={handleUpdateCustomer} onCancel={handleCancel} initValues={mockUpdateForm} />
      )}
      {activeTab === 2 && <ProjectTable />}
    </>
  )
}

UpdateOperationUnit.propTypes = {
  intl: object
}

export default injectIntl(UpdateOperationUnit)
