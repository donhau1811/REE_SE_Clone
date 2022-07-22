import { API_ROOF_RETAL_UNIT } from '@src/utility/constants'
import { FETCH_ROOF_RENTAL_UNIT_REQUEST } from '@src/utility/constants/actions'
import { showToast } from '@src/utility/Utils'
import axios from 'axios'


export const getAllRoofUnit = (params) => {
  return async (dispatch) => {
    await axios
      .get(API_ROOF_RETAL_UNIT, { params })
      .then((response) => {
        console.log(response)
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

