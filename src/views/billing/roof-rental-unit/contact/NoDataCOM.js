import React from 'react'
import { ReactComponent as NoDataIcon } from '@src/assets/images/svg/no-data.svg'
import './styles.scss'
import { FormattedMessage } from 'react-intl'

const NoDataCOM = () => {
  return (
    <>
      <div className="customer-contact-no-data">
        <NoDataIcon key='acb' />
        <div className="no-data-title mt-2 font-weight-bolder">
          {' '}
          <FormattedMessage id="No data" />
        </div>
        <div className="no-data-title mt-2">
          {' '}
          <FormattedMessage id="Add contact info to create new roof rental unit" />
        </div>
      </div>
    </>
  )
}

export default NoDataCOM
