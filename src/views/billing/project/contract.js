import { Tab, Tabs } from '@mui/material'
import { object } from 'prop-types'
import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import PowerSelling from '../contract/PowerSelling/List'
import RoofRenting from '../contract/RoofRenting/List'

function ContractCOM({ intl }) {
  const [activeTab, setActiveTab] = useState(1)

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue)
  }
  return (
    <>
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
        classes={{
          root: 'mb-2 tabs-border-bottom'
        }}
      >
        <Tab
          classes={{ root: 'general-tab' }}
          label={intl.formatMessage({ id: 'Power Selling Agreement' })}
          value={1}
        />
        <Tab
          classes={{ root: 'general-tab' }}
          label={intl.formatMessage({ id: 'Contract of Roof Renting' })}
          value={2}
        />
      </Tabs>
      {activeTab === 1 && <PowerSelling />}
      {activeTab === 2 && <RoofRenting />}
    </>
  )
}

ContractCOM.propTypes = {
  intl: object
}

export default injectIntl(ContractCOM)
