import { API_BILLING_CUSTOMERS } from '@src/utility/constants'
import { showToast } from '@src/utility/Utils'
import axios from 'axios'
import { FETCH_CUSTOMERS_REQUEST } from '@src/utility/constants/billing'

export const postCustomersUnit = ({ params, callback }) => {
  return async () => {
    await axios
      .post(API_BILLING_CUSTOMERS, { params })
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
export const putCustomersUnit = ({ params, callback }) => {
  return async () => {
    await axios
      .put(API_BILLING_CUSTOMERS, { params })
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

export const getAllCustomer = (params) => {
  return async (dispatch) => {
    await axios
      .get(API_BILLING_CUSTOMERS, { params })
      .then((response) => {
        console.log(response)
        if (response.data && response.data.data) {
          dispatch({
            type: FETCH_CUSTOMERS_REQUEST,
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
