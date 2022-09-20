/* eslint-disable no-unused-vars */
import { ROUTER_URL, SET_FORM_DIRTY } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useState, useEffect } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import RightGroupCUForm from './RightGroupCUForm'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import BreadCrumbs from '@src/views/common/breadcrumbs'

const UpdateRightsGroup = ({ intl }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isReadOnly, setIsReadOnly] = useState(true)
  const location = useLocation()
  useEffect(() => {
    if (location.state?.allowUpdate) setIsReadOnly(false)
  }, [location.state?.allowUpdate])
  const {
    billingContacts: { contacts }
  } = useSelector((state) => state)
  const { id } = useParams()
  useEffect(() => {
   
  }, [id])


  const handleUpdateRightsGroup = () => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      dispatch(

      )
    }
  }
  const handleCancel = () => {
    history.push({
      pathname: `${ROUTER_URL.SYSTEM_PERMISSION_GROUP}`,
      state: {
        allowUpdate: true
      }
    })
  }
  return (
    <>
      <RightGroupCUForm
        isReadOnly={isReadOnly}
        onSubmit={handleUpdateRightsGroup}
        onCancel={handleCancel}
        contacts={contacts}
      />
    </>
  )
}

UpdateRightsGroup.propTypes = {
  intl: object
}

export default injectIntl(UpdateRightsGroup)

export const Navbar = () => {

  const intl = useIntl()

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    {
      name: intl.formatMessage({ id: 'permission-group' }),
      link: ROUTER_URL.SYSTEM_PERMISSION_GROUP
    },
    { name: '?', link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
