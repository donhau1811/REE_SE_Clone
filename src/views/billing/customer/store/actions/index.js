import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import { ReactComponent as CicleSuccess } from '@src/assets/images/svg/circle-success.svg'
import { API_BILLING_CUSTOMERS, API_CUSTOMER_V2, API_DELETE_BILLING_CUSTOMER } from '@src/utility/constants'
import { FETCH_CUSTOMERS_REQUEST } from '@src/utility/constants/actions'
import { showToast } from '@src/utility/Utils'
import axios from 'axios'
import classNames from 'classnames'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySweetAlert = withReactContent(SweetAlert)

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


export const postCustomer = ({ params, callback, skin, intl }) => {
  return async () => {
    await axios
      .post(API_CUSTOMER_V2, { params })
      .then((response) => {
        if (response.data && response.data.status && response.data.data) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'New customer is added successfully' }),
            customClass: {
              popup: classNames({
                'sweet-alert-popup--dark': skin === 'dark'
              }),
              confirmButton: 'btn btn-primary mt-2',
              icon: 'border-0'
            },
            width: 'max-content',
            showCloseButton: true,
            confirmButtonText: 'OK'
          })
          if (callback) callback()
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        MySweetAlert.fire({
          iconHtml: <CicleFailed />,
          text: intl.formatMessage({ id: 'Failed to update data. Please try again' }),
          customClass: {
            popup: classNames({
              'sweet-alert-popup--dark': skin === 'dark'
            }),
            confirmButton: 'btn btn-primary mt-2',
            icon: 'border-0'
          },
          width: 'max-content',
          showCloseButton: true,
          confirmButtonText: intl.formatMessage({ id: 'Try again' })
        })
      })
  }
}

export const putCustomer = ({ params, callback, skin, intl }) => {
  return async () => {
    await axios
      .put(API_CUSTOMER_V2, { params })
      .then((response) => {
        if (response.data && response.data.status && response.data.data) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'Data is updated successfully' }),
            customClass: {
              popup: classNames({
                'sweet-alert-popup--dark': skin === 'dark'
              }),
              confirmButton: 'btn btn-primary mt-2',
              icon: 'border-0'
            },
            width: 'max-content',
            showCloseButton: true,
            confirmButtonText: 'OK'
          })
          if (callback) callback()
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        MySweetAlert.fire({
          iconHtml: <CicleFailed />,
          text: intl.formatMessage({ id: 'Failed to update data. Please try again' }),
          customClass: {
            popup: classNames({
              'sweet-alert-popup--dark': skin === 'dark'
            }),
            confirmButton: 'btn btn-primary mt-2',
            icon: 'border-0'
          },
          width: 'max-content',
          showCloseButton: true,
          confirmButtonText: intl.formatMessage({ id: 'Try again' })
        })
      })
  }
}

export const deleteBillingCustomer = ({ id, skin, intl }) => {
  return async (dispatch) => {
    await axios
      .delete(`${API_DELETE_BILLING_CUSTOMER}/${id}`)
      .then((response) => {
        if (response.data && response.data.success) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'Delete billing customer success' }),
            customClass: {
              popup: classNames({
                'sweet-alert-popup--dark': skin === 'dark'
              }),
              confirmButton: 'btn btn-primary mt-2',
              icon: 'border-0'
            },
            width: 'max-content',
            showCloseButton: true,
            confirmButtonText: 'OK'
          })
          dispatch({
            type: FETCH_CUSTOMERS_REQUEST,
            data: response.data.data,
            total: response.data.total
          })
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch(() => {
        MySweetAlert.fire({
          iconHtml: <CicleFailed />,
          text: intl.formatMessage({ id: 'Delete billing customer failed' }),
          customClass: {
            popup: classNames({
              'sweet-alert-popup--dark': skin === 'dark'
            }),
            confirmButton: 'btn btn-primary mt-2',
            icon: 'border-0'
          },
          width: 'max-content',
          showCloseButton: true,
          confirmButtonText: intl.formatMessage({ id: 'Try again' })
        })
      })
  }
}
