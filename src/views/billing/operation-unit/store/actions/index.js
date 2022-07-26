import {
  API_GET_OPERATION_UNIT,
  API_CREATE_OPERATION_UNIT,
  API_DELETE_OPERATING_COMPANY,
  API_GET_OPERATION_UNIT_BY_ID,
  API_UPDATE_OPERATION_UNIT
} from '@src/utility/constants'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import SweetAlert from 'sweetalert2'
import { ReactComponent as CicleSuccess } from '@src/assets/images/svg/circle-success.svg'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import classNames from 'classnames'
import { FETCH_COMPANY_REQUEST, SET_SELECTED_OPERATION_UNIT } from '@constants/actions'
import { get } from 'lodash'

const MySweetAlert = withReactContent(SweetAlert)

export const postOperationUnit = ({ params, callback, skin, intl }) => {
  return async () => {
    await axios
      .post(API_CREATE_OPERATION_UNIT, params)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
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
            if (callback) callback()
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
export const putOperationUnit = ({ params, callback, intl, skin }) => {
  return async () => {
    await axios
      .put(API_UPDATE_OPERATION_UNIT, params)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
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

export const getListOperationUnit = (params = {}) => {
  return async (dispatch) => {
    console.log('params', params)
    const { pagination = {}, searchValue, filterValue, ...rest } = params
    const payload = {
      ...rest,
      limit: pagination.rowsPerPage,
      offset: pagination.rowsPerPage * (pagination.currentPage - 1)
    }
    if (searchValue?.trim()) {
      payload.searchValue = {
        name: {
          value: searchValue,
          type: 'contains'
        },
        code: {
          value: searchValue,
          type: 'contains'
        },
        taxCode: {
          value: searchValue,
          type: 'contains'
        },
        address: {
          value: searchValue,
          type: 'contains'
        },
        phone: {
          value: searchValue,
          type: 'contains'
        }
      }
    }
    if (filterValue) {
      payload.searchValue = {
        ...payload.searchValue,
        ...filterValue
      }
    }

    await axios
      .post(API_GET_OPERATION_UNIT, payload)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          dispatch({
            type: FETCH_COMPANY_REQUEST,
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

export const deleteOperationUnit = ({ id, skin, intl, callback }) => {
  return async () => {
    await axios
      .delete(`${API_DELETE_OPERATING_COMPANY}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'Delete operating customer success' }),
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
      .catch(() => {
        MySweetAlert.fire({
          iconHtml: <CicleFailed />,
          text: intl.formatMessage({ id: 'Delete operating customer failed' }),
          customClass: {
            popup: classNames({
              'sweet-alert-popup--dark': skin === 'dark'
            }),
            confirmButton: 'btn btn-primary mt-2',
            icon: 'border-0'
          },
          width: 'max-content',
          showCloseButton: true,
          confirmButtonText: intl.formatMessage({ id: 'Yes' })
        })
      })
  }
}

export const getOperationUnitById = ({ id, isSavedToState, callback }) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_OPERATION_UNIT_BY_ID}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const payload = get(response, 'data.data', {})
          if (isSavedToState) {
            console.log('dàvhg')
            dispatch({
              type: SET_SELECTED_OPERATION_UNIT,
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
