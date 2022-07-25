import { API_DELETE_ROOF_RETAL_UNIT, API_ROOF_RETAL_UNIT } from '@src/utility/constants'
import { FETCH_ROOF_RENTAL_UNIT_REQUEST } from '@src/utility/constants/actions'
import { showToast } from '@src/utility/Utils'
import axios from 'axios'
import classNames from 'classnames'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import { ReactComponent as CicleSuccess } from '@src/assets/images/svg/circle-success.svg'
const MySweetAlert = withReactContent(SweetAlert)

export const getAllRoofUnit = (params) => {
  return async (dispatch) => {
    await axios
      .get(API_ROOF_RETAL_UNIT, { params })
      .then((response) => {
        if (response.data && response.data.data) {
          dispatch({
            type: FETCH_ROOF_RENTAL_UNIT_REQUEST,
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

export const deleteBillingRoofRentalUnit = ({ id, skin, intl }) => {
  return async (dispatch) => {
    await axios
      .delete(`${API_DELETE_ROOF_RETAL_UNIT}/${id}`)
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
            type: FETCH_ROOF_RENTAL_UNIT_REQUEST,
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
          text: intl.formatMessage({ id: 'Delete billing roof rental unit' }),
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
