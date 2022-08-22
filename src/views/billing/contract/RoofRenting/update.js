import { ISO_STANDARD_FORMAT, ROUTER_URL } from '@src/utility/constants'
import moment from 'moment'
import { object } from 'prop-types'
import { useEffect, useState } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { getContractById, putContractRoofVendor } from '../store/actions'
import RoofVendorContractCUForm from './RoofVendorContractCUForm'
import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import '@src/@core/scss/billing-sweet-alert.scss'
import withReactContent from 'sweetalert2-react-content'
import { getBillingProjectById } from '../../project/store/actions'
import BreadCrumbs from '@src/views/common/breadcrumbs'

const MySweetAlert = withReactContent(SweetAlert)
const UpdateRoofVendorContract = ({ intl }) => {
  const {
    projects: { selectedProject: selectedBillingProject }
  } = useSelector((state) => state)
  const location = useLocation()

  const dispatch = useDispatch()
  const history = useHistory()
  const [isReadOnly, setIsReadOnly] = useState(true)
  const { id } = useParams()
  const [cleanData, setCleanData] = useState({})
  const { projectId } = useParams()
  useEffect(() => {
    dispatch(getContractById({ id }))
  }, [id])

  useEffect(() => {
    if (location.state?.allowUpdate) setIsReadOnly(false)
  }, [location.state?.allowUpdate])

  useEffect(() => {
    if (Number(projectId) !== Number(selectedBillingProject?.id)) {
      dispatch(
        getBillingProjectById({
          id: projectId,
          isSavedToState: true
        })
      )
    }
  }, [projectId])
  const { selectedContract } = useSelector((state) => state.projectContracts)
  useEffect(() => {
    setCleanData({
      contractCode: selectedContract.code,
      effectiveDate: moment(selectedContract.startDate).utc().format(ISO_STANDARD_FORMAT),
      expirationDate: moment(selectedContract.endDate).utc().format(ISO_STANDARD_FORMAT),
      roofId: selectedContract.roofVendorId,
      typeContract: Number(selectedContract.details?.id),
      percentTurnover: selectedContract.details?.percent,
      confirmationReminder: selectedContract.alerts?.confirmAlert,
      announcementDate: selectedContract.alerts?.billingAlert,
      startDate: moment(selectedContract.details?.startDate).utc().format(ISO_STANDARD_FORMAT),
      rentalAmount: selectedContract.details?.rentalAmount,
      id: selectedContract.id
    })
  }, [selectedContract])

  const handleCancel = () => {
    history.push(
    `${ROUTER_URL.BILLING_PROJECT}/${projectId}`
    )
  }
  const handleUpdateRoofVendorContract = (value) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      // eslint-disable-next-line no-unused-vars
      const { address, taxCode, contractCode, effectiveDate, expirationDate, contractType, ...newvalue } = value
      newvalue.id = Number(id)
      dispatch(
        putContractRoofVendor({
          newvalue,
          intl,
          callback: () => {
            history.push(
         `${ROUTER_URL.BILLING_PROJECT}/${projectId}`
        
            )
          }
        })
      )
    }
  }
  return (
    <RoofVendorContractCUForm
      isReadOnly={isReadOnly}
      onCancel={handleCancel}
      onSubmit={handleUpdateRoofVendorContract}
      initValues={cleanData}
    />
  )
}
UpdateRoofVendorContract.propTypes = {
  intl: object
}

export default injectIntl(UpdateRoofVendorContract)

export const Navbar = () => {
  const {
    layout: { skin },
    form: { isFormGlobalDirty },
    projects: { selectedProject: selectedBillingProject }
  } = useSelector((state) => state)
  const intl = useIntl()
  const history = useHistory()

  const handleBreadCrumbsRedirct = (pathname) => (event) => {
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
          history.push(pathname)
        }
      })
    }
    history.push(pathname)
  }

  const tempItems = [
    { name: intl.formatMessage({ id: 'billing' }), link: '' },
    { name: intl.formatMessage({ id: 'project management' }), link: '' },
    {
      name: intl.formatMessage({ id: 'project' }),
      innerProps: { tag: 'a', href: '#', onClick: handleBreadCrumbsRedirct(ROUTER_URL.BILLING_PROJECT) }
    },
    {
      name: selectedBillingProject?.name,
      innerProps: {
        tag: 'a',
        href: '#',
        onClick: handleBreadCrumbsRedirct(`${ROUTER_URL.BILLING_PROJECT}/${selectedBillingProject?.id}`)
      }
    },
    { name: intl.formatMessage({ id: 'Update roof renting contract' }), link: '' }
  ]
  return (
    <>
      <BreadCrumbs breadCrumbItems={tempItems} />
    </>
  )
}
