import { API_BILLING_SETTING } from '@src/utility/constants'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import SweetAlert from 'sweetalert2'
import { ReactComponent as CicleSuccess } from '@src/assets/images/svg/circle-success.svg'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import classNames from 'classnames'
import { FETCH_SETTINGS_REQUEST } from '@constants/actions'

const MySweetAlert = withReactContent(SweetAlert)

export const postSettingsValue = ({ params, callback, skin, intl }) => {
  return async () => {
    await axios
      .post(API_BILLING_SETTING, { params })
      .then((response) => {
        if (response.data && response.data.status && response.data.data) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'Settings is added successfully' }),
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
export const putSettingsValue = ({ params, callback, intl, skin }) => {
  return async () => {
    await axios
      .put(API_BILLING_SETTING, { params })
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

          callback?.()
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
export const putSettings = ({ params, callback, intl, skin }) => {
  return async () => {
    await axios
      .put(API_BILLING_SETTING, { params })
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

          callback?.()
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

export const getAllSettings = (params) => {
  return async (dispatch) => {
    await axios
      .get(API_BILLING_SETTING, { params })
      .then((response) => {
        if (response.data && response.data.data) {
          dispatch({
            type: FETCH_SETTINGS_REQUEST,
            data: response.data.data,
            total: response.data.total
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

export const deleteSettingsValue = ({ id, skin, intl }) => {
  return async (dispatch) => {
    await axios
      .delete(`${API_BILLING_SETTING}/${id}`)
      .then((response) => {
        if (response.data && response.data.success) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'Delete settings success' }),
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
            type: FETCH_SETTINGS_REQUEST,
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
          text: intl.formatMessage({ id: 'Delete settings failure' }),
          customClass: {
            popup: classNames({
              'sweet-alert-popup--dark': skin === 'dark'
            }),
            confirmButton: 'btn btn-primary mt-2',
            icon: 'border-0'
          },
          width: 'max-content',
          showCloseButton: true,
          confirmButtonText: intl.formatMessage({ id: 'Yes' })
        })
      })
  }
}