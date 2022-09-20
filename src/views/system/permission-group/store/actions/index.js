import {
  GET_ROLES,
 GET_ROLE_PERMISION_BY_ROLE_ID
} from '@src/utility/constants'
import { FETCH_ROLE_REQUEST, SET_SELECTED_ROOF_VENDOR } from '@src/utility/constants/actions'
import axios from 'axios'
import { get } from 'lodash'

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
