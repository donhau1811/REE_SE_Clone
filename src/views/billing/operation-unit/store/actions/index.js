import { API_OPERATION_UNIT } from '@src/utility/constants'
import { showToast } from '@src/utility/Utils'
import axios from 'axios'

export const postOperationUnit = ({ params, callback }) => {
  return async () => {
    await axios
      .post(API_OPERATION_UNIT, { params })
      .then((response) => {
        if (response.data && response.data.status && response.data.data) {
          showToast('success', response.data.message)
          if (callback) callback()
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch((err) => {
        showToast('error', `${err.response ? err.response.data.message : err.message}`)
      })
  }
}
export const putOperationUnit = ({ params, callback }) => {
  return async () => {
    await axios
      .put(API_OPERATION_UNIT, { params })
      .then((response) => {
        if (response.data && response.data.status && response.data.data) {
          showToast('success', response.data.message)
          if (callback) callback()
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch((err) => {
        showToast('error', `${err.response ? err.response.data.message : err.message}`)
      })
  }
}
