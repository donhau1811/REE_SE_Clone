/* eslint-disable no-unused-vars */
import { ISO_DISPLAY_DATE_TIME_FORMAT, ROUTER_URL } from '@src/utility/constants'
import moment from 'moment'
import { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import ProjectCUForm from './ProjectCUForm'
import { getBillingProjectById, putProject } from './store/actions'

const UpdateOperationUnit = ({ intl }) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const [isReadOnly, setIsReadOnly] = useState(true)
  const {
    projects: { selectedProject: selectedBillingProject }
  } = useSelector((state) => state)

  const { id } = useParams()
  
  useEffect(() => {
    dispatch(
      getBillingProjectById({
        id,
        isSavedToState: true
      })
    )
  }, [id])

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT)
  }

  const handleUpdateOperationUnit = (values) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      const params = {
        name: values.name,
        code: values.code,
        address: values.address,
        startDate: values.startDate ? moment(values.startDate).format(ISO_DISPLAY_DATE_TIME_FORMAT) : null,
        userIds: (values.accountantIds || []).map((item) => item.value),
        operationCompanyId: values.companyId?.value,
        capacity: values.power || null,
        state: values.state?.value,
        id
      }
      dispatch(
        putProject({
          params,
          callback: () => {
            history.push(ROUTER_URL.BILLING_PROJECT)
          }
        })
      )
    }
  }
  return (
    <>
      <ProjectCUForm
        onSubmit={handleUpdateOperationUnit}
        onCancel={handleCancel}
        initValues={selectedBillingProject}
        isReadOnly={isReadOnly}
        submitText={intl.formatMessage({ id: isReadOnly ? 'Update' : 'Finish' })}
      />
    </>
  )
}

UpdateOperationUnit.propTypes = {
  intl: object
}

export default injectIntl(UpdateOperationUnit)
