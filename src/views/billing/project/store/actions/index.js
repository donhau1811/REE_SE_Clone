import {
  API_CREATE_PROJECT,
  API_GET_NEW_PROJECT,
  API_GET_PROJECT_BY_ID,
  API_UPDATE_PROJECT
} from '@src/utility/constants'
import axios from 'axios'
import { FETCH_PROJECT_REQUEST, SET_SELECTED_BILLING_PROJECT } from '@constants/actions'
import { showToast } from '@src/utility/Utils'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'

export const getListProject = (params = {}) => {
  return async (dispatch) => {
    const { pagination = {}, ...rest } = params
    const payload = {
      ...rest,
      limit: pagination.rowsPerPage,
      offset: pagination.rowsPerPage * (pagination.currentPage - 1)
    }

    await axios
      .get(API_GET_NEW_PROJECT, payload)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          dispatch({
            type: FETCH_PROJECT_REQUEST,
            data: response.data.data,
            total: response.data.count,
            params
          })
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}

export const postProject = ({ params, callback }) => {
  return async () => {
    await axios
      .post(API_CREATE_PROJECT, params)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          showToast('success', <FormattedMessage id="Create new data successfully" />)
          if (callback) callback()
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', <FormattedMessage id="Failed to update data. Please try again" />)
      })
  }
}

export const putProject = ({ params, callback }) => {
  return async () => {
    await axios
      .put(API_UPDATE_PROJECT, params)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          showToast('success', <FormattedMessage id="Data is updated successfully" />)
          callback?.()
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', <FormattedMessage id="Failed to update data. Please try again" />)
      })
  }
}

export const getBillingProjectById = ({ id, isSavedToState, callback }) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_PROJECT_BY_ID}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const payload = get(response, 'data.data', {})
          if (isSavedToState) {
            dispatch({
              type: SET_SELECTED_BILLING_PROJECT,
              payload
            })
          }
          callback?.(response.data.data)
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        showToast('error', err.toString())
      })
  }
}
