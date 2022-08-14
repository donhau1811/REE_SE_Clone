/* eslint-disable no-unused-vars */
import { ISO_STANDARD_FORMAT, ROUTER_URL } from '@src/utility/constants'
import moment from 'moment'
import { object } from 'prop-types'
import { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getContractById, putContractRoofVendor } from '../store/actions'
import RoofVendorContractCUForm from './RoofVendorContractCUForm'
import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import '@src/@core/scss/billing-sweet-alert.scss'
import withReactContent from 'sweetalert2-react-content'
import { getBillingProjectById } from '../../project/store/actions'

const MySweetAlert = withReactContent(SweetAlert)
const UpdateRoofVendorContract = ({ intl }) => {
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const {
    projects: { selectedProject: selectedBillingProject }
  } = useSelector((state) => state)

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
      typeContract: selectedContract.details?.id,
      percentTurnover: selectedContract.details?.percent,
      confirmationReminder: selectedContract.alerts?.confirmAlert,
      announcementDate: selectedContract.alerts?.billingAlert,
      startDate: moment(selectedContract.details?.startDate).utc().format(ISO_STANDARD_FORMAT),
      rentalAmount: selectedContract.details?.rentalAmount,
      id: selectedContract.id
    })
  }, [selectedContract])

  const handleCancel = () => {
    if (!isReadOnly) {
      return MySweetAlert.fire({
        title: intl.formatMessage({ id: 'Cancel' }),
        text: intl.formatMessage({ id: 'You want to cancel update' }),
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
          cancelButton: 'btn btn-outline-secondary ml-1',
          actions: 'sweet-actions',
          content: 'sweet-content'
        },
        buttonsStyling: false
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          history.push({
            pathname: `${ROUTER_URL.BILLING_PROJECT}/${projectId}`,
            state: {
              allowUpdate: true
            }
          })
        }
      })
    }
    history.push({
      pathname: `${ROUTER_URL.BILLING_PROJECT}/${projectId}`,
      state: {
        allowUpdate: true
      }
    })
  }
  const handleUpdateRoofVendorContract = (value) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      const { address, taxCode, contractCode, effectiveDate, expirationDate, contractType, ...newvalue } = value
      newvalue.id = Number(id)
      dispatch(
        putContractRoofVendor({
          newvalue,
          intl,
          callback: () => {
            history.push({
              pathname: `${ROUTER_URL.BILLING_PROJECT}/${projectId}`,
              state: {
                allowUpdate: true
              }
            })
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
