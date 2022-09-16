import { ROUTER_URL, SET_FORM_DIRTY } from '@src/utility/constants'
import { object } from 'prop-types'
import React, { useState, useEffect } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useHistory, useParams } from 'react-router-dom'
import RightGroupCUForm from './RightGroupCUForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRoofVendorWithContactsById, putRoofVendors } from './store/actions/index'
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
    layout: { skin },
    roofUnit: { selectedRoofVendor },
    billingContacts: { contacts }
  } = useSelector((state) => state)

  const { id } = useParams()
  useEffect(() => {
    dispatch(
      getRoofVendorWithContactsById({
        id,
        isSavedToState: true
      })
    )
  }, [id])


  const handleUpdateRentalUnit = (values) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      dispatch(
        putRoofVendors({
          params: { ...values, state: values.state?.value, type: values.type?.value, id },
          callback: () => {
            dispatch({
              type: SET_FORM_DIRTY,
              payload: false
            })
            history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
          },
          intl,
          skin
        })
      )
    }
  }
  const handleCancel = () => {
    history.push({
      pathname: `${ROUTER_URL.BILLING_ROOF_RENTAL_UNIT}`,
      state: {
        allowUpdate: true
      }
    })
  }
  return (
    <>
      <RightGroupCUForm
        isReadOnly={isReadOnly}
        onSubmit={handleUpdateRentalUnit}
        onCancel={handleCancel}
        initValues={selectedRoofVendor}
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
  const {
    roofUnit: { selectedRoofVendor }
  } = useSelector((state) => state)
  const intl = useIntl()

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    {
      name: intl.formatMessage({ id: 'roof-rental-unit' }),
      link: ROUTER_URL.BILLING_ROOF_RENTAL_UNIT
    },
    { name: selectedRoofVendor?.name, link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
