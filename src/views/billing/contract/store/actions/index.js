import {
  API_DELETE_CONTRACT,
  API_GET_ALL_CONTRACT_PROJECT_IDS,
  API_GET_CONTRACT_BY_ID,
  API_ADD_CONTRACT,
  API_UPDATE_CONTRACT
} from '@src/utility/constants'
import axios from 'axios'
import { SET_CONTRACT_OF_BILLING_PROJECT, SET_SELECTED_CONTRACT } from '@constants/actions'
import { showToast } from '@src/utility/Utils'
import { get } from 'lodash'

export const getAllContractByProjectId = ({ id, isSavedToState, callback }) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_ALL_CONTRACT_PROJECT_IDS}?projectIds=${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const payload = get(response, 'data.data', {})
          if (isSavedToState) {
            dispatch({
              type: SET_CONTRACT_OF_BILLING_PROJECT,
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

export const deleteContractById = ({ id, callback, intl }) => {
  return async () => {
    await axios
      .delete(`${API_DELETE_CONTRACT}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
          showToast('success',  intl.formatMessage({ id: 'Delete info success' }))

          callback?.()
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        showToast('error', err.toString())
      })
  }
}

export const getContractById = ({ id }) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_CONTRACT_BY_ID}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
          dispatch({
            type: SET_SELECTED_CONTRACT,
            payload: response.data?.data
          })
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        showToast('error', err.toString())
      })
  }
}
export const postContractRoofVendor = ({ newvalue, callback, intl }) => {
  return async () => {
    await axios
      .post(`${API_ADD_CONTRACT}`, newvalue)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
          showToast('success',  intl.formatMessage({ id: 'Create info success' }))
          callback?.()
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        showToast('error', err.toString())
      })
  }
}

export const putContractRoofVendor = ({ newvalue, callback, intl }) => {
  return async () => {
    await axios
      .put(`${API_UPDATE_CONTRACT}`, newvalue)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
          showToast('success',  intl.formatMessage({ id: 'Update info success' }))
          callback?.()
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        showToast('error', err.toString())
      })
  }
}