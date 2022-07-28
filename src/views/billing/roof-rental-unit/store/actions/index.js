import {
  API_DELETE_ROOF_VENDORS,
  API_GET_ROOF_VENDOR_BY_ID,
  API_GET_ROOF_VENDOR,
  API_CREATE_ROOF_VENDOR,
  API_UPDATE_ROOF_VENDOR,
  API_CHECK_CODE_ROOF_VENDORS
} from '@src/utility/constants'
import { FETCH_ROOF_RENTAL_UNIT_REQUEST, SET_SELECTED_ROOF_VENDOR } from '@src/utility/constants/actions'
import axios from 'axios'
import classNames from 'classnames'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import { ReactComponent as CicleSuccess } from '@src/assets/images/svg/circle-success.svg'
import { get } from 'lodash'

const MySweetAlert = withReactContent(SweetAlert)

export const getAllRoofUnit = (params) => {
  return async (dispatch) => {
    const { pagination = {}, searchValue, ...rest } = params
    const payload = {
      ...rest,
      limit: pagination.rowsPerPage,
      offset: pagination.rowsPerPage * (pagination.currentPage - 1)
    }
    if (searchValue?.trim()) {
      payload.searchValue = {
        value: searchValue,
        fields: ['name', 'code', 'phone', 'taxCode', 'address', 'phone'],
        type: 'contains'
      }
    }
    await axios
      .post(API_GET_ROOF_VENDOR, payload)
      .then((response) => {
        if (response?.status === 200 && response?.data?.data) {
          dispatch({
            type: FETCH_ROOF_RENTAL_UNIT_REQUEST,
            data: response.data.data,
            total: response.data.count,
            params
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

export const deleteBillingRoofRentalUnit = ({ id, skin, intl, callback }) => {
  return async () => {
    await axios
      .delete(`${API_DELETE_ROOF_VENDORS}/${id}`)
      .then((response) => {
        if (response.data) {
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
          }).then(() => {
            callback?.()
          })
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
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

export const getRoofVendorById = ({ id, isSavedToState, callback }) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_ROOF_VENDOR_BY_ID}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const payload = get(response, 'data.data', {})
          if (isSavedToState) {
            dispatch({
              type: SET_SELECTED_ROOF_VENDOR,
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
      })
  }
}

export const postRoofVendors = ({ params, callback, skin, intl }) => {
  return async () => {
    await axios.post(API_CHECK_CODE_ROOF_VENDORS, { code: params?.code }).then((response) => {
      if (!response.data?.data) {
        axios
          .post(API_CREATE_ROOF_VENDOR, params)
          .then((response) => {
            if (response.status === 200 && response.data?.data) {
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
              }).then(() => {
                 callback?.(false)
              })
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
      } else {
        callback?.(true)
      }
    })
  }

}
export const putRoofVendors = ({ params, callback, intl, skin }) => {
  return async () => {
    await axios
      .put(API_UPDATE_ROOF_VENDOR, params)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
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
          }).then(() => {
            callback?.()
          })
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
