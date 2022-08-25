import { yupResolver } from '@hookform/resolvers/yup'
import { NUMBER_REGEX, EMAIL_REGEX, SET_FORM_DIRTY } from '@src/utility/constants'
import { selectThemeColors, showToast } from '@src/utility/Utils'
import { func, object, bool } from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import Select from 'react-select'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import Contact from '../contact'
import * as yup from 'yup'
import './styles.scss'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import React, { useState, useEffect } from 'react'
import { checkDuplicate } from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import classNames from 'classnames'
import SweetAlert from 'sweetalert2'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import { handleCRUDOfContacts } from '../contact/util'
import { getContactListByRoofVendorId } from '../contact/store/actions'

const MySweetAlert = withReactContent(SweetAlert)

const RoofUnit = ({ intl, onSubmit = () => {}, onCancel = () => {}, initValues, isReadOnly, contacts }) => {
  const [contactsRoofVendor, setContactsRoofVendor] = useState([])
  const OPERATION_UNIT_STATUS_OPTS = [
    { value: OPERATION_UNIT_STATUS.ACTIVE, label: intl.formatMessage({ id: 'Active' }) },
    { value: OPERATION_UNIT_STATUS.INACTIVE, label: intl.formatMessage({ id: 'Inactive' }) }
  ]
  const initState = {
    state: OPERATION_UNIT_STATUS_OPTS[0],
    name: null,
    code: null,
    taxCode: null,
    address: null,
    phone: null,
    note: null
  }
  const dispatch = useDispatch()

  const {
    layout: { skin }
  } = useSelector((state) => state)

  // const handleContactformSubmit = (value) => {
  //   setContactsRoofVendor(value)
  // }

  const handleContactformSubmit = async (changeContacts, changeId, callback) => {
    const changeItem = changeContacts.filter((item) => item.id === changeId)
    if (Number(initValues?.id) > 0) {
      try {
        Promise.all(handleCRUDOfContacts({ contacts: changeItem, roofVendorId: initValues.id })).then(() => {
          dispatch(
            getContactListByRoofVendorId({
              id: initValues?.id,
              isSavedToState: true,
              callback
            })
          )
        })
      } catch (error) {
        if (changeId < 0) {
          showToast('error', <FormattedMessage id="data create failed, please try again" />)
        } else {
          if (changeItem[0]?.isDelete) {
            showToast('error', <FormattedMessage id="data delete failed, please try again" />)
          }
          if (changeItem[0]?.isUpdate) {
            showToast('error', <FormattedMessage id="data update failed, please try again" />)
          }
        }
      }
    } else {
      setContactsRoofVendor(changeContacts)
    }
  }

  const ValidateSchema = yup.object().shape(
    {
      name: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(255, intl.formatMessage({ id: 'max-validate' })),

      code: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(15, intl.formatMessage({ id: 'max-validate' }))
        .test('dubplicated', intl.formatMessage({ id: 'dubplicated-validate' }), (value) => value !== 'aaa'),

      taxCode: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(20, intl.formatMessage({ id: 'max-validate' })),

      address: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(255, intl.formatMessage({ id: 'max-validate' })),
      phone: yup
        .string()
        .matches(NUMBER_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
        .max(15, intl.formatMessage({ id: 'max-validate' })),
      email: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .matches(EMAIL_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
    },
    ['name', 'code', 'taxCode', 'address', 'phone', 'email', 'note', 'state']
  )

  useEffect(() => {
    setContactsRoofVendor(contacts)
  }, [contacts])

  const {
    handleSubmit,
    getValues,
    errors,
    control,
    register,
    reset,
    setError,
    formState: { isDirty }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(isReadOnly ? yup.object().shape({}) : ValidateSchema),
    defaultValues: initValues || initState
  })
  useEffect(() => {
    dispatch({
      type: SET_FORM_DIRTY,
      payload: isDirty
    })
  }, [isDirty])
  useEffect(() => {
    reset({ ...initValues, state: OPERATION_UNIT_STATUS_OPTS.find((item) => item.value === initValues?.state) })
  }, [initValues])
  const handleSubmitRoofVendorsForm = async (values) => {
    if (isReadOnly) {
      onSubmit?.(initValues)
      return
    }
    try {
      const isDupicateCode = await checkDuplicate({
        params: { code: values.code },
        id: initValues?.id,
        intl
      })
      if (initValues?.code !== values.code && isDupicateCode) {
        setError(
          'code',
          { type: 'focus', message: intl.formatMessage({ id: 'dubplicated-validate' }) },
          { shouldFocus: true }
        )
        return
      }
    } catch (err) {
      const alert = initValues?.id
        ? 'Failed to update data. Please try again'
        : 'Failed to create data. Please try again'
      showToast(
        'error',
        intl.formatMessage({
          id: alert
        })
      )
      return
    }
    if (!contactsRoofVendor?.filter((item) => !item.isDelete).length > 0) {
      return MySweetAlert.fire({
        // icon: 'success',
        iconHtml: <CicleFailed />,
        text: intl.formatMessage({ id: 'Need at least 1 contact to add customer. Please try again' }),
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
    }
    onSubmit?.({
      ...values,
      contacts: contactsRoofVendor
    })
  }
  const handleCancel = () => {
    onCancel?.(isDirty)
  }

  return (
    <>
      <Form className="billing-form" onSubmit={handleSubmit(handleSubmitRoofVendorsForm)}>
        <Row className="mb-2">
          <Col>
            <h4 className="typo-section">
              <FormattedMessage id="General Information" />
            </h4>
          </Col>
        </Row>

        <Row>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Roof rental unit name' })} <span className="hightlight-label">&nbsp; (*)</span>
            </Label>

            <Input
              className="input"
              id="name"
              disabled={isReadOnly}
              name="name"
              autoComplete="on"
              invalid={!isReadOnly && !!errors.name}
              valid={!isReadOnly && getValues('name')?.trim() && !errors.name}
              innerRef={register()}
              placeholder={intl.formatMessage({ id: 'Enter-unit-name' })}
            />
            {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Unit-code' })} <span className="hightlight-label">&nbsp; (*)</span>
            </Label>
            <Input
              className="input"
              id="code"
              disabled={isReadOnly}
              name="code"
              autoComplete="on"
              innerRef={register()}
              invalid={!isReadOnly && !!errors.code}
              valid={!isReadOnly && getValues('code')?.trim() && !errors.code}
              placeholder={intl.formatMessage({ id: 'Enter-unit-code' })}
            />
            {errors?.code && <FormFeedback>{errors?.code?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'operation-unit-form-taxCode' })}{' '}
              <span className="hightlight-label">&nbsp; (*)</span>
            </Label>
            <Input
              className="input"
              id="taxCode"
              disabled={isReadOnly}
              name="taxCode"
              autoComplete="on"
              innerRef={register()}
              invalid={!isReadOnly && !!errors.taxCode}
              valid={!isReadOnly && getValues('taxCode')?.trim() && !errors.taxCode}
              placeholder={intl.formatMessage({ id: 'Enter-unit-taxCode' })}
            />
            {errors?.taxCode && <FormFeedback>{errors?.taxCode?.message}</FormFeedback>}
          </Col>
        </Row>

        <Row>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Address' })} <span className="hightlight-label">&nbsp; (*)</span>
            </Label>
            <Input
              className="input"
              id="address"
              disabled={isReadOnly}
              name="address"
              autoComplete="on"
              innerRef={register()}
              invalid={!isReadOnly && !!errors.address}
              valid={!isReadOnly && getValues('address')?.trim() && !errors.address}
              placeholder={intl.formatMessage({ id: 'Enter-unit-address' })}
            />
            {errors?.address && <FormFeedback>{errors?.address?.message}</FormFeedback>}
          </Col>

          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Email' })} <span className="hightlight-label">&nbsp; (*)</span>
            </Label>
            <Input
              className="input"
              type="email"
              id="email"
              disabled={isReadOnly}
              name="email"
              autoComplete="on"
              innerRef={register()}
              invalid={!isReadOnly && !!errors.email}
              valid={!isReadOnly && getValues('email')?.trim() && !errors.email}
              placeholder={intl.formatMessage({ id: 'Enter-unit-email' })}
            />
            {errors?.email && <FormFeedback>{errors?.email?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'operation-unit-form-phone' })}
            </Label>
            <Input
              className="input"
              ty
              id="phone"
              name="phone"
              disabled={isReadOnly}
              autoComplete="on"
              innerRef={register()}
              invalid={!isReadOnly && !!errors.phone}
              valid={!isReadOnly && getValues('phone')?.trim() && !errors.phone}
              placeholder={intl.formatMessage({ id: 'Enter-unit-phone' })}
            />
            {errors?.phone && <FormFeedback>{errors?.phone?.message}</FormFeedback>}
          </Col>
        </Row>

        <Row>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Status' })}
            </Label>
            <Controller
              as={Select}
              isDisabled={isReadOnly}
              control={control}
              theme={selectThemeColors}
              name="state"
              id="state"
              innerRef={register()}
              options={OPERATION_UNIT_STATUS_OPTS}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select a status' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />
          </Col>
          <Col className="mb-2" md="8">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Note' })}
            </Label>
            <Input
              name="note"
              id="note"
              autoComplete="on"
              disabled={isReadOnly}
              innerRef={register()}
              placeholder={intl.formatMessage({ id: 'Enter-unit-note' })}
            />
          </Col>
        </Row>

        <Input id="contacts" name="contacts" autoComplete="on" innerRef={register()} type="hidden" />
        <Contact disabled={isReadOnly} onChange={handleContactformSubmit} data={contactsRoofVendor} />

        <Row>
          <Col className="d-flex justify-content-end align-items-center mt-5 mb-2">
            <Button type="submit" color="primary" className="mr-1 px-3">
              {intl.formatMessage({ id: isReadOnly ? 'Update' : 'Save' })}
            </Button>
            <Button onClick={handleCancel} color="secondary">
              {intl.formatMessage({ id: isReadOnly ? 'Back' : 'Cancel' })}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

RoofUnit.propTypes = {
  intl: object.isRequired,
  onSubmit: func,
  onCancel: func,
  initValues: object,
  isReadOnly: bool,
  contacts: object
}

export default injectIntl(RoofUnit)
