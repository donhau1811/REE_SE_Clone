import { API_DELETE_CONTRACT, API_GET_ALL_CONTRACT_PROJECT_IDS } from '@src/utility/constants'
import axios from 'axios'
import { SET_CONTRACT_OF_BILLING_PROJECT } from '@constants/actions'
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
        console.log('err', err)
        showToast('error', err.toString())
      })
  }
}

export const deleteContractById = ({ id, callback }) => {
  return async () => {
    await axios
      .delete(`${API_DELETE_CONTRACT}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          callback?.()
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', err.toString())
      })
  }
}
