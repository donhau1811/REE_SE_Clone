import { API_COMPANY_UNIT, API_OPERATION_UNIT } from '@src/utility/constants'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import SweetAlert from 'sweetalert2'
import { ReactComponent as CicleSuccess } from '@src/assets/images/svg/circle-success.svg'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import classNames from 'classnames'
import { FETCH_COMPANY_REQUEST } from '@src/utility/constants/billing'

const MySweetAlert = withReactContent(SweetAlert)

export const postOperationUnit = ({ params, callback, skin, intl }) => {
  return async () => {
    await axios
      .post(API_OPERATION_UNIT, { params })
      .then((response) => {
        if (response.data && response.data.status && response.data.data) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'Operation unit is added successfully' }),
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
export const putOperationUnit = ({ params, callback, intl, skin }) => {
  return async () => {
    await axios
      .put(API_OPERATION_UNIT, { params })
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
        console.log('err', err)
      })
  }
}
