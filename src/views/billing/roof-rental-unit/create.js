import '@src/@core/scss/billing-sweet-alert.scss'
import { ROUTER_URL } from '@src/utility/constants'
import BreadCrumbs from '@src/views/common/breadcrumbs'
import classNames from 'classnames'
import { object } from 'prop-types'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import RoofUnit from './RoofUnitCUForm'
import { postRoofVendors } from './store/actions'

const MySweetAlert = withReactContent(SweetAlert)
const CreateRoofRentalUnit = ({ intl }) => {
  const history = useHistory()
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const handleAddRoofVendors = (values) => {
    dispatch(
      postRoofVendors({
        params: { ...values, state: values?.state?.value, type: values.type?.value },
        callback: () => {
            history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
        },
        skin,
        intl
      })
    )
  }

  const handleCancel = (isDirty) => {
    if (isDirty) {
      return MySweetAlert.fire({
        title: intl.formatMessage({ id: 'Cancel confirmation' }),
        text: intl.formatMessage({ id: 'Are you sure to cancel?' }),
        showCancelButton: true,
        confirmButtonText: intl.formatMessage({ id: 'Yes' }),
        cancelButtonText: intl.formatMessage({ id: 'No, Thanks' }),
        customClass: {
          popup: classNames({
            'sweet-alert-popup--dark': skin === 'dark',
            'sweet-popup': true
          }),
          header: 'sweet-title',
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary ml-1',
          actions: 'sweet-actions',
          content: 'sweet-content'
        },
        buttonsStyling: false
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          history.push({
            pathname: `${ROUTER_URL.BILLING_ROOF_RENTAL_UNIT}`,
            state: {
              allowUpdate: true
            }
          })
        }
      })
    }
    history.push({
      pathname: `${ROUTER_URL.BILLING_ROOF_RENTAL_UNIT}`,
      state: {
        allowUpdate: true
      }
    })
  }
  return (
    <>
      <RoofUnit onCancel={handleCancel} onSubmit={handleAddRoofVendors} />
    </>
  )
}

CreateRoofRentalUnit.propTypes = {
  intl: object
}

export default injectIntl(CreateRoofRentalUnit)


export const Navbar = () => {
  const {
    layout: { skin },
    form: { isFormGlobalDirty }
  } = useSelector((state) => state)
  const intl = useIntl()
  const history = useHistory()

  const handleBreadCrumbsRedirct = (event) => {
    event.preventDefault()
    if (isFormGlobalDirty) {
      return MySweetAlert.fire({
        title: intl.formatMessage({ id: 'Cancel confirmation' }),
        text: intl.formatMessage({ id: 'Are you sure to cancel?' }),
        showCancelButton: true,
        confirmButtonText: intl.formatMessage({ id: 'Yes' }),
        cancelButtonText: intl.formatMessage({ id: 'No, Thanks' }),
        customClass: {
          popup: classNames({
            'sweet-alert-popup--dark': skin === 'dark',
            'sweet-popup': true
          }),
          header: 'sweet-title',
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary ml-1',
          actions: 'sweet-actions',
          content: 'sweet-content'
        },
        buttonsStyling: false
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
        }
      })
    }
    history.push(ROUTER_URL.BILLING_ROOF_RENTAL_UNIT)
  }

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    { name: intl.formatMessage({ id: 'roof-rental-unit' }), 
    innerProps: { tag: 'a', href: '#', onClick: handleBreadCrumbsRedirct }},
    { name: intl.formatMessage({ id: 'create-rental-unit' }), link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
