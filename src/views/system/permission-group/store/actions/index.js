import {
  API_GET_ALL_PERMISSION,
  SET_ALL_PERMISSION,
  API_GET_ALL_USER_FEATURE,
  SET_ALL_USER_FEATURE,
  API_GET_ALL_USER_ACTION,
  SET_ALL_USER_ACTION,
  GET_ROLES,
  FETCH_ROLE_REQUEST,
  GET_ROLE_PERMISION_BY_ROLE_ID,
  SET_SELECTED_ROOF_VENDOR
} from '@src/utility/constants'
import { showToast } from '@src/utility/Utils'
import axios from 'axios'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'

export const getRoles = () => {
  return async (dispatch) => {
    await axios
      .get(GET_ROLES)
      .then((response) => {
        if (response?.status === 200 && response?.data?.data) {
          dispatch({
            type: FETCH_ROLE_REQUEST,
            data: response.data.data,
            total: response.data.count
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

export const getAllPermission = () => {
  return async (dispatch) => {
    await axios
      .get(API_GET_ALL_PERMISSION)
      .then((response) => {
        if (response?.status === 200 && response?.data?.data) {
          dispatch({
            type: SET_ALL_PERMISSION,
            payload: response.data.data
          })
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', <FormattedMessage id="Something went wrong" />)
      })
  }
}

export const getAllUserFeature = () => {
  return async (dispatch) => {
    await axios
      .get(API_GET_ALL_USER_FEATURE)
      .then((response) => {
        if (response?.status === 200 && response?.data?.data) {
          dispatch({
            type: SET_ALL_USER_FEATURE,
            payload: response.data.data
          })
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', <FormattedMessage id="Something went wrong" />)
      })
  }
}
export const getAllUserAction = () => {
  return async (dispatch) => {
    await axios
      .get(API_GET_ALL_USER_ACTION)
      .then((response) => {
        if (response?.status === 200 && response?.data?.data) {
          dispatch({
            type: SET_ALL_USER_ACTION,
            payload: response.data.data
          })
        } else {
          throw new Error(response.data.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', <FormattedMessage id="Something went wrong" />)
      })
  }
}
// export const getRoofVendor = (params) => {
//   return async (dispatch) => {
//     const { pagination = {}, searchValue, ...rest } = params
//     const payload = {
//       ...rest,
//       limit: pagination.rowsPerPage,
//       offset: pagination.rowsPerPage * (pagination.currentPage - 1)
//     }
//     if (searchValue?.trim()) {
//       payload.searchValue = {
//         value: searchValue,
//         fields: ['name', 'code', 'phone', 'taxCode', 'address', 'phone'],
//         type: 'contains'
//       }
//     }
//     await axios
//       .post(API_GET_ROOF_VENDOR, payload)
//       .then((response) => {
//         if (response?.status === 200 && response?.data?.data) {
//           dispatch({
//             type: FETCH_ROOF_RENTAL_UNIT_REQUEST,
//             data: response.data.data,
//             total: response.data.count,
//             params
//           })
//         } else {
//           throw new Error(response.data.message)
//         }
//       })
//       .catch((err) => {
//         console.log('err', err)
//       })
//   }
// }

// export const deleteBillingRoofRentalUnit = ({ id, callback }) => {
//   return async () => {
//     await axios
//       .delete(`${API_DELETE_ROOF_VENDORS}/${id}`)
//       .then((response) => {
//         if (response.status === 200 && response.data?.data) {
//           showToast('success', <FormattedMessage id="Delete info success" />)

//           callback?.()
//         } else {
//           showToast('error', response.data?.message)
//         }
//       })
//       .catch(() => {
//         showToast('error', <FormattedMessage id="data delete failed, please try again" />)
//       })
//   }
// }

export const getPermisionRoleByRoleId = ({ id, isSavedToState, callback }) => {
  return async (dispatch) => {
    await axios
      .get(`${GET_ROLE_PERMISION_BY_ROLE_ID}/${id}`)
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
