/* eslint-disable no-unused-vars */
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import { ReactComponent as CicleSuccess } from '@src/assets/images/svg/circle-success.svg'
import {
  API_ADD_CONTACT,
  API_ADD_CUSTOMER_V2,
  API_DELETE_CUSTOMER_V2,
  API_GET_CONTACT_BY_CUSTOMER_ID,
  API_GET_CUSTOMER_BY_ID,
  API_GET_LIST_CUSTOMER,
  API_UPDATE_CUSTOMER_V2
} from '@src/utility/constants'
import { FETCH_CUSTOMERS_REQUEST } from '@src/utility/constants/actions'
import { showToast } from '@src/utility/Utils'
import axios from 'axios'
import classNames from 'classnames'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySweetAlert = withReactContent(SweetAlert)
import { SET_SELECTED_BILLING_CUSTOMER, SET_CONTACT } from '@constants/actions'
import { handleCRUDOfContacts } from '@src/views/billing/contact/util'
import { countRequest } from '@src/redux/actions/layout'

export const getListCustomer = (params) => {
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
        fields: ['fullName', 'code', 'taxCode', 'address', 'phone'],
        type: 'contains'
      }
    }
    await axios
      .post(API_GET_LIST_CUSTOMER, payload)
      .then((response) => {
        console.log(response)
        if (response.status === 200 && response.data.data) {
          dispatch({
            type: FETCH_CUSTOMERS_REQUEST,
            data: response.data.data,
            total: response.data.count,
            params
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

export const postCustomer = ({ params, callback, skin, intl }) => {
  return async () => {
    const { contacts, ...customerPayload } = params
    await axios
      .post(API_ADD_CUSTOMER_V2, { ...customerPayload, provinceCode: 'HCM' })
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const customerId = response.data?.data?.id

          // eslint-disable-next-line no-unused-vars
          const addCusContactReq = contacts.map(({ id, ...contact }) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            axios.post(API_ADD_CONTACT, { ...contact, position: contact.position?.value, customerId, state: 'ACTIVE' })
          )
          Promise.all(addCusContactReq)
            .then(() => {
              MySweetAlert.fire({
                iconHtml: <CicleSuccess />,
                text: intl.formatMessage({ id: 'New customer is added successfully' }),
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
            })
            .catch((err) => {
              throw new Error(err.toString())
            })
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        console.log('err', err)
        MySweetAlert.fire({
          iconHtml: <CicleFailed />,
          text: err?.toString(),
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

export const putCustomer = ({ params, callback, skin, intl }) => {
  return async (dispatch, getState) => {
    const errorAlert = {
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
    }
    const { contacts, ...customerPayload } = params

    await axios
      .put(API_UPDATE_CUSTOMER_V2, { ...customerPayload, provinceCode: 'HCM' })
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          const contactsModifyRes = handleCRUDOfContacts(contacts, customerPayload.id)
          return Promise.all(contactsModifyRes)
            .then(() => {
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
            })
            .catch((err) => {
              console.log('err', err)
              MySweetAlert.fire(errorAlert)
            })
        } else {
          throw new Error(response.data?.message)
        }
      })
      .catch((err) => {
        MySweetAlert.fire(errorAlert)
      })
  }
}

export const deleteCustomer = ({ id, skin, intl, callback }) => {
  return async () => {
    await axios
      .delete(`${API_DELETE_CUSTOMER_V2}/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.data) {
          MySweetAlert.fire({
            iconHtml: <CicleSuccess />,
            text: intl.formatMessage({ id: 'Delete billing customer success' }),
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
          text: intl.formatMessage({ id: 'Delete billing customer failed' }),
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

export const getCustomerWithContactsById = ({ id, isSavedToState, callback }) => {
  return async (dispatch, getState) => {
    const getCustomerByIdReq = axios.get(`${API_GET_CUSTOMER_BY_ID}/${id}`)
    const getContactsByCusIdReq = axios.get(`${API_GET_CONTACT_BY_CUSTOMER_ID}/${id}`)
    Promise.all([getCustomerByIdReq, getContactsByCusIdReq])
      .then(([customerRes, contactRes]) => {
        if (
          customerRes.status === 200 &&
          customerRes.data?.result &&
          contactRes.status === 200 &&
          contactRes.data?.result
        ) {
          const payload = {
            ...customerRes.data?.result,
            contacts: contactRes.data?.result
          }
          if (isSavedToState) {
            dispatch({
              type: SET_SELECTED_BILLING_CUSTOMER,
              payload: customerRes.data?.result
            })
            dispatch({
              type: SET_CONTACT,
              payload: contactRes.data?.result
            })
          }
          callback?.(payload)
        } else {
          throw new Error('Something went wrong')
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}
