import {
  API_FILLTER_METERS,
  API_FILLTER_METERS_METRIC,
  FETCH_METER_METRIC_REQUEST,
  FETCH_METER_REQUEST,
  ROWS_PER_PAGE_DEFAULT
} from '@src/utility/constants'
import axios from 'axios'
import { get } from 'lodash'

export const getClockByCustomerAndProjectId = (params = {}) => {
  return async (dispatch) => {
    const { projectIds, customerIds, ...rest } = params

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
    const pagination = params?.pagination || {
      rowsPerPage: ROWS_PER_PAGE_DEFAULT,
      currentPage: 1
    }
    const { filterValue, ...rest } = params

    const payload = {
      ...rest,
      filterValue,
      rowsPerPage: pagination?.rowsPerPage,
      page: pagination?.rowsPerPage * (pagination?.currentPage - 1),
      sortBy: 'serialNumber',
      sortDirection: 'asc'
    }

    await axios
      .post(API_FILLTER_METERS_METRIC, payload)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const data = get(response, 'data.data', [])
          const totalRow = get(response, 'data.totalRow', 0)      
          dispatch({
            type: FETCH_METER_METRIC_REQUEST,
            data,
            payload,
            totalRow
          
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
