import {
  API_GET_NEW_PROJECT,
  API_CREATE_PROJECT,
  API_UPDATE_PROJECT,
  API_GET_PROJECT_BY_ID,
  API_DELETE_PROJECTS
} from '@src/utility/constants'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import SweetAlert from 'sweetalert2'
import { ReactComponent as CicleSuccess } from '@src/assets/images/svg/circle-success.svg'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import classNames from 'classnames'
import { FETCH_PROJECT_REQUEST, SET_SELECTED_PROJECT } from '@constants/actions'
import { get } from 'lodash'

const MySweetAlert = withReactContent(SweetAlert)

export const postProject = ({ params, callback, skin, intl }) => {
  return async () => {
    await axios
      .post(API_CREATE_PROJECT, params)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'Project is added successfully' }),
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
export const putProject = ({ params, callback, intl, skin }) => {
  return async () => {
    await axios
      .put(API_UPDATE_PROJECT, params)
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

export const getListProject = (params = {}) => {
  return async (dispatch) => {
    const { pagination = {}, searchValue, ...rest } = params
    const payload = {
      ...rest,
      limit: pagination.rowsPerPage,
      offset: pagination.rowsPerPage * (pagination.currentPage - 1)
    }
    if (searchValue?.trim()) {
      payload.searchValue = {
        value: searchValue,
        fields: ['name', 'code', 'taxCode', 'address', 'phone'],
        type: 'contains'
      }
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

export const deleteProject = ({ id, skin, intl, callback }) => {
  return async () => {
    await axios
      .delete(`${API_DELETE_PROJECTS}`, { data: { id } })
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'Delete project successfully' }),
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
          text: intl.formatMessage({ id: 'Delete project failed' }),
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

export const getProjectById = ({ id, isSavedToState, callback }) => {
  return async (dispatch) => {
    await axios
      .get(`${API_GET_PROJECT_BY_ID}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const payload = get(response, 'data.data', {})
          if (isSavedToState) {
            console.log('dàvhg')
            dispatch({
              type: SET_SELECTED_PROJECT,
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
