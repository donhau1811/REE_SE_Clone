import { API_CUSTOMER_V2 } from '@src/utility/constants'
import axios from 'axios'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ReactComponent as CicleSuccess } from '@src/assets/images/svg/circle-success.svg'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import classNames from 'classnames'

const MySweetAlert = withReactContent(SweetAlert)

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
