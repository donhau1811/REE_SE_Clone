import { API_DELETE_INPUT_CLOCK_INDEX, API_GET_INPUT_CLOCK_INDEX, FETCH_INPUT_CLOCK_INDEX } from '@src/utility/constants'
import { showToast } from '@src/utility/Utils'
import axios from 'axios'
import { FormattedMessage } from 'react-intl'

export const getInputClockIndex = (params = {}) => {
  return async (dispatch) => {
    const { pagination = {}, ...rest } = params
    const payload = {
      ...rest,
      limit: pagination.rowsPerPage,
      offset: pagination.rowsPerPage * (pagination.currentPage - 1)
    }

    await axios
      .post(API_GET_INPUT_CLOCK_INDEX, payload)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          dispatch({
            type: FETCH_INPUT_CLOCK_INDEX,
            data: response.data.data || [],
            total: response.data.count || 0,
            params
          })
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}

export const deleteManualInputIndex = ({ id, callback }) => {
  return async () => {
    await axios
      .delete(`${API_DELETE_INPUT_CLOCK_INDEX}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data?.data) {
          showToast('success', <FormattedMessage id="Delete info success" />)
          callback?.()
        } else {
          showToast('error', response.data?.message)
        }
      })
      .catch(() => {
        showToast('error', <FormattedMessage id="data delete failed, please try again" />)
      })
  }
}
