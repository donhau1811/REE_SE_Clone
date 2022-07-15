import { API_OPERATION_UNIT, API_COMPANY_UNIT } from '@src/utility/constants'
import { showToast } from '@src/utility/Utils'
import { FETCH_COMPANY_REQUEST } from '@src/utility/constants/billing'
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

export const getAllCompany = (params) => {
  return async (dispatch) => {
    await axios
      .get(API_COMPANY_UNIT, { params })
      .then((response) => {
        if (response.data && response.data.data) {
          dispatch({
            type: FETCH_COMPANY_REQUEST,
            data: response.data.data,
            total: response.data.total
          })
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch((err) => {
        showToast('error', `${err.response ? err.response.data.message : err.message}`)
      })
  }
}
