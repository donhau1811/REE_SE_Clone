/* eslint-disable no-unused-vars */

import { ROUTER_URL, SET_FORM_DIRTY } from '@src/utility/constants'
import BreadCrumbs from '@src/views/common/breadcrumbs'
import { object } from 'prop-types'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import CUForm from './CUForm'

const CreateInputClockIndex = ({ intl }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const handleAddOperationUnit = (values) => {
    console.log('values', values)
  }

  const handleCancel = () => {
    history.push({
      pathname: `${ROUTER_URL.BILLING_MANUAL_INPUT_METRIC_CLOCK}`,
      state: {
        allowUpdate: true
      }
    })
  }

  return <CUForm onSubmit={handleAddOperationUnit} onCancel={handleCancel} />
}

CreateInputClockIndex.propTypes = {
  intl: object
}

export default injectIntl(CreateInputClockIndex)

export const Navbar = () => {
  const intl = useIntl()

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    {
      name: intl.formatMessage({ id: 'electricity-index' }),
      link: ''
    },
    {
      name: intl.formatMessage({ id: 'manual-input-index' }),
      link: ROUTER_URL.BILLING_MANUAL_INPUT_METRIC_CLOCK
    },
    {
      name: intl.formatMessage({ id: 'Add manual input index' }),
      link: ''
    }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
