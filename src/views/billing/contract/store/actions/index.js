import {
  API_ADD_CONTRACT,
  API_DELETE_CONTRACT,
  API_GET_ALL_CONTRACT_PROJECT_ID,
  API_GET_CONTRACT_BY_ID,
  API_UPDATE_CONTRACT
} from '@src/utility/constants'
import axios from 'axios'
import { SET_CONTRACT_OF_BILLING_PROJECT, SET_SELECTED_CONTRACT } from '@constants/actions'
import { showToast } from '@src/utility/Utils'
import { get } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { handleCRUDOfClocks } from '../../util'

export const getAllContractByProjectId = ({ id, isSavedToState, callback }) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_ALL_CONTRACT_PROJECT_ID}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const payload = get(response, 'data.data', {})
          if (isSavedToState) {
            dispatch({
              type: SET_CONTRACT_OF_BILLING_PROJECT,
              payload
            })
          }
          callback?.(response.data.data)
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        showToast('error', err.toString())
      })
  }
}

export const deleteContractById = ({ id, callback, intl }) => {
  return async () => {
    await axios
      .delete(`${API_DELETE_CONTRACT}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
          showToast('success', intl.formatMessage({ id: 'Delete info success' }))

          callback?.()
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch(() => {
        showToast('error', intl.formatMessage({ id: 'data delete failed, please try again' }))
      })
  }
}

export const postCustomerContract = ({ payload: { clocks, ...params }, callback }) => {
  return async () => {
    await axios
      .post(API_ADD_CONTRACT, params)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const contactsModifyRes = handleCRUDOfClocks({ clocks, contractId: response.data.data?.id })
          Promise.all(contactsModifyRes)
            .then(() => {
              showToast('success', <FormattedMessage id="Create new data successfully" />)

              callback?.()
            })
            .catch((err) => {
              console.log('err', err)
              showToast('error', <FormattedMessage id="Failed to create data. Please try again" />)
            })
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', <FormattedMessage id="Failed to create data. Please try again" />)
      })
  }
}
export const getContractById = ({ id }) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_CONTRACT_BY_ID}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
          dispatch({
            type: SET_SELECTED_CONTRACT,
            payload: response.data?.data
          })
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        showToast('error', err.toString())
      })
  }
}

export const putCustomerContract = ({ payload: { clocks, ...params }, callback }) => {
  return async () => {
    await axios
      .put(API_UPDATE_CONTRACT, params)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const contactsModifyRes = handleCRUDOfClocks({ clocks, contractId: params.id })
          Promise.all(contactsModifyRes)
            .then(() => {
              showToast('success', <FormattedMessage id="Data is updated successfully" />)
              callback?.()
            })
            .catch((err) => {
              console.log('err', err)
              showToast('error', <FormattedMessage id="Failed to update data. Please try again" />)
            })
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', <FormattedMessage id="Failed to update data. Please try again" />)
      })
  }
}
export const postContractRoofVendor = ({ newvalue, callback, intl }) => {
  return async () => {
    await axios
      .post(`${API_ADD_CONTRACT}`, newvalue)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
          showToast('success', intl.formatMessage({ id: 'Create info success' }))
          callback?.()
        } else {
          console.log('err')
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', intl.formatMessage({ id: 'data create failed, please try again' }))
      })
  }
}
export const putContractRoofVendor = ({ newvalue, callback, intl }) => {
  return async () => {
    await axios
      .put(`${API_UPDATE_CONTRACT}`, newvalue)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
          showToast('success', intl.formatMessage({ id: 'Update info success' }))
          callback?.()
        } else {
          console.log('err')
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        showToast('error', intl.formatMessage({ id: 'data update failed, please try again' }))
      })
  }
}
