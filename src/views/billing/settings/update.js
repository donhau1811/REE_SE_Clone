import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import SettingsCUForm from './SettingsCUForm'
import { Tab, Tabs } from '@mui/material'
import ValueTable from './configValue/index'
import { useDispatch, useSelector } from 'react-redux'
import { getBillingSettingById } from './store/actions'

const UpdateConfig = ({ intl }) => {
  const history = useHistory()
  const [activeTab, setActiveTab] = useState(1)

  const {
    settings: { selectedSetting }
  } = useSelector((state) => state)

  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    dispatch(
      getBillingSettingById({
        id,
        isSavedToState: true
      })
    )
  }, [id])
  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_SETTING)
  }

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue)
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
      {activeTab === 1 && <SettingsCUForm isViewed onCancel={handleCancel} initValues={selectedSetting} />}
      {activeTab === 2 && <ValueTable configId={id} />}
    </>
  )
}

UpdateConfig.propTypes = {
  intl: object
}

export default injectIntl(UpdateConfig)
