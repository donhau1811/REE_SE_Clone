import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import CustomerCUForm from './CustomerCUForm'
import { getCustomerWithContactsById, putCustomer } from './store/actions'
import { Tab, Tabs } from '@mui/material'
import ProjectTable from './ProjectTable'

const UpdateOperationUnit = ({ intl }) => {
  const history = useHistory()

  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(1)
  const { id } = useParams()

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
