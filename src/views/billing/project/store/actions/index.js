import {
  API_GET_NEW_PROJECT

} from '@src/utility/constants'
import axios from 'axios'
import { FETCH_PROJECT_REQUEST } from '@constants/actions'

export const getListProject = (params = {}) => {
  return async (dispatch) => {
    const { pagination = {}, ...rest } = params
    const payload = {
      ...rest,
      limit: pagination.rowsPerPage,
      offset: pagination.rowsPerPage * (pagination.currentPage - 1)
    }


    await axios
      .get(API_GET_NEW_PROJECT, payload)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          dispatch({
            type: FETCH_PROJECT_REQUEST,
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
