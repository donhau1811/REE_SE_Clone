import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { useHistory, useLocation } from 'react-router-dom'
import SettingsCUForm from './SettingsCUForm'
import { Tab, Tabs } from '@mui/material'
import ValueTable from './configValue/index'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSettings, putSettings } from './store/actions'
import { STATE as STATUS } from '@constants/common'

const UpdateConfig = ({ intl }) => {
  const history = useHistory()
  const { search } = useLocation()
  const [activeTab, setActiveTab] = useState(1)
  const searchParams = new URLSearchParams(search)
  const id = searchParams.get('id')
  console.log(id)
  const {
    layout: { skin }
  } = useSelector((state) => state)

  const dispatch = useDispatch()
  const data = useSelector((state) => state.settings).data[1]
  useEffect(() => {
    Promise.all([
      dispatch(
        getAllSettings({
          fk: '*',
          state: [STATUS.ACTIVE].toString(),
          rowsPerPage: -1
        })
      )
    ])
  }, [])
  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_SETTING)
  }


  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleUpdateCustomer = (values) => {
    console.log('values', values)
    dispatch(
      putSettings({
        params: values,
        callback: () => {
          history.push(ROUTER_URL.BILLING_SETTING)
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
        <Tab classes={{ root: 'general-tab' }} label={intl.formatMessage({ id: 'Configuration' })} value={1} />
        <Tab classes={{ root: 'general-tab' }} label={intl.formatMessage({ id: 'Configuration Value' })} value={2} />
      </Tabs>
      {activeTab === 1 && (
        <SettingsCUForm onSubmit={handleUpdateCustomer} onCancel={handleCancel} initValues={data} />
      )}
     {activeTab === 2 && <ValueTable data={ data?.value } />}

    </>
  )
}

UpdateConfig.propTypes = {
  intl: object
}

export default injectIntl(UpdateConfig)
