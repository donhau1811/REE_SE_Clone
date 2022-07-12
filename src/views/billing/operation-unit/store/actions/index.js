import { API_OPERATION_UNIT } from '@src/utility/constants'
import { showToast } from '@src/utility/Utils'
import axios from 'axios'
import { FormattedMessage } from 'react-intl'

export const  postOperationUnit = ({ params, callback }) => {
  return async () => {
    await axios
      .post(API_OPERATION_UNIT, { params })
      .then((response) => {
        if (response.data && response.data.status && response.data.data) {
          showToast('success', response.data.message)
          callback?.()
        } else {
          throw new Error(response.data?.message || <FormattedMessage id="Something went wrong"  />)
        }
      })
      .catch((err) => {
        showToast('error', err.toString())
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
          callback?.()
        } else {
          throw new Error(response.data?.message || <FormattedMessage id="Something went wrong"  />)
        }
      })
      .catch((err) => {
        showToast('error', err.toString())
      })
  }
}
