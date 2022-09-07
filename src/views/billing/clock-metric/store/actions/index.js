import { API_FILLTER_METERS, API_FILLTER_METERS_METRIC, FETCH_METER_REQUEST } from '@src/utility/constants'
import axios from 'axios'
import { get } from 'lodash'

export const getClockByCustomerAndProjectId = (params = {}) => {
  return async (dispatch) => {
    const {  projectIds, customerIds, ...rest } = params

    const payload = {
      ...rest,
      filterValue: {
        projectId: projectIds,
        customerId: customerIds
      }
    }

    await axios
      .post(API_FILLTER_METERS, payload)
      .then((response) => {
        console.log('reponse', response)
        if (response.status === 200 && response.data.data) {
          const payload = get(response, 'data.data', {})
          console.log(payload)
          dispatch({
            type: FETCH_METER_REQUEST,
            payload
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


export const getClockMetricBySeri = (params = {}) => {
  return async (dispatch) => {
    const {  serialNumbers, fromDates, toDates, ...rest } = params

    const payload = {
      ...rest,
      filterValue: {
        serialNumber: serialNumbers,
        fromDate: fromDates,
        toDate: toDates
      }
    }

    await axios
      .post(API_FILLTER_METERS_METRIC, payload)
      .then((response) => {
        console.log('reponse', response)
        if (response.status === 200 && response.data.data) {
          const payload = get(response, 'data.data', {})
          console.log(payload)
          dispatch({
            type: FETCH_METER_REQUEST,
            payload
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
