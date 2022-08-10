import { ROUTER_URL } from '@src/utility/constants'
import { object } from 'prop-types'
import React from 'react'
import { injectIntl } from 'react-intl'
// import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ProjectCUForm from './ProjectCUForm'

const CreateProject = () => {
  //   const dispatch = useDispatch()
  const history = useHistory()
  //   const {
  //     layout: { skin }
  //   } = useSelector((state) => state)

  const handleCancel = () => {
    history.push(ROUTER_URL.BILLING_PROJECT)
  }
  return <ProjectCUForm onCancel={handleCancel} />
}

CreateProject.propTypes = {
  intl: object
}

export default injectIntl(CreateProject)
