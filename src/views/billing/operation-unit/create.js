import { ROUTER_URL } from '@src/utility/constants'
import BreadCrumbs from '@src/views/common/breadcrumbs'
import classNames from 'classnames'
import { object } from 'prop-types'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import OperationCUForm from './OperationUnitCUForm'
import { postOperationUnit } from './store/actions'

const MySweetAlert = withReactContent(SweetAlert)

const CreateOperationUnit = ({ intl }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const handleAddOperationUnit = (values) => {
    dispatch(
      postOperationUnit({
        params: { ...values, state: values.state?.value },
        callback: () => {
          history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
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
            pathname: `${ROUTER_URL.BILLING_OPERATION_UNIT}`,
            state: {
              allowUpdate: true
            }
          })
        }
      })
    }
    history.push({
      pathname: `${ROUTER_URL.BILLING_OPERATION_UNIT}`,
      state: {
        allowUpdate: true
      }
    })
  }

  return <OperationCUForm onSubmit={handleAddOperationUnit} onCancel={handleCancel} />
}

CreateOperationUnit.propTypes = {
  intl: object
}

export default injectIntl(CreateOperationUnit)

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
          history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
        }
      })
    }
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
  }

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    { name: intl.formatMessage({ id: 'operation-units' }), 
    innerProps: { tag: 'a', href: '#', onClick: handleBreadCrumbsRedirct }},
    {
      name: intl.formatMessage({ id: 'create-operation-unit' }),
      link: '' }
    
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
