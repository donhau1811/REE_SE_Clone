/* eslint-disable no-unused-vars */
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
  SET_SELECTED_ROOF_VENDOR,
  API_GET_ROLE_BY_ROLE_ID,
  SET_SELECTED_ROLE,
  API_UPDATE_ROLE_BY_ROLE_ID
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

export const getRoleByRoleId = ({ id, isSavedToState, callback }) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_ROLE_BY_ROLE_ID}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const payload = get(response, 'data.data', {})
          if (isSavedToState) {
            dispatch({
              type: SET_SELECTED_ROLE,
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

export const putRoleGroup = ({ payload, callback }) => {
  return async (dispatch, getState) => {
    const state = getState()
    const {
      permissionGroup: { selectedRole }
    } = state
    console.log('payload', payload)
    console.log('state', selectedRole)
    const { permissions } = payload
    const requests = []
    if (payload.name !== selectedRole.name) {
      requests.push(
        axios.put(API_UPDATE_ROLE_BY_ROLE_ID, {
          id: payload.id,
          name: payload.name,
          state: 'ACTIVE'
        })
      )
    }
    const deletePayload = permissions.filter((item) => item.isDelete)

    console.log(
      'permissions',
      permissions.filter((item) => item.isDelete || item.isCreate)
    )

    await Promise.all(requests)
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', <FormattedMessage id="Something went wrong" />)
      })
  }
}
