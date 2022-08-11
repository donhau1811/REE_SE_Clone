/* eslint-disable no-unused-vars */
import { ISO_DISPLAY_DATE_TIME_FORMAT, ROUTER_URL } from '@src/utility/constants'
import moment from 'moment'
import { object } from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ProjectCUForm from './ProjectCUForm'
import { postProject } from './store/actions'

const CreateProject = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_PROJECT)
  }

  const handleCreateProject = (newProject) => {
    const params = {
      name: newProject.name,
      code: newProject.code,
      address: newProject.address,
      startDate: newProject.startDate ? moment(newProject.startDate).format(ISO_DISPLAY_DATE_TIME_FORMAT) : null,
      userIds: (newProject.accountantIds || []).map((item) => item.value),
      operationCompanyId: newProject.companyId?.value,
      capacity: newProject.power || null,
      state: 'ACTIVE'
    }

    dispatch(
      postProject({
        params,
        callback: () => {
          handleCancel()
        }
      })
    )
  }
  return <ProjectCUForm onCancel={handleCancel} onSubmit={handleCreateProject} />
}

CreateProject.propTypes = {
  intl: object
}

export default injectIntl(CreateProject)
