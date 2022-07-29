import { array, bool, func, object, string } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { API_CHECK_DUPLICATE_CUSTOMER_CODE, MOBILE_REGEX } from '@src/utility/constants'
import { GENERAL_CUSTOMER_TYPE, GENERAL_STATUS } from '@src/utility/constants/billing'
import SweetAlert from 'sweetalert2'
import './styles.scss'
import Contact from '../contact'
import withReactContent from 'sweetalert2-react-content'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'
import axios from 'axios'
import { isEqual } from 'lodash'

const MySweetAlert = withReactContent(SweetAlert)

const OperationCUForm = ({
  intl,
  isViewed,
  onSubmit = () => {},
  onCancel = () => {},
  initValues,
  submitText,
  contacts
}) => {
  const [contactsState, setContactsState] = useState([])

  const CUSTOMER_STATUS_OPTS = [
    { value: GENERAL_STATUS.ACTIVE, label: intl.formatMessage({ id: 'Active' }) },
    { value: GENERAL_STATUS.INACTIVE, label: intl.formatMessage({ id: 'Inactive' }) }
  ]

  const {
    layout: { skin }
  } = useSelector((state) => state)
  const initState = {
    type: GENERAL_CUSTOMER_TYPE[0],
    fullName: null,
    code: null,
    taxCode: null,
    address: null,
    phone: null,
    state: CUSTOMER_STATUS_OPTS[0],
    note: null
  }

  const ValidateSchema = yup.object().shape(
    {
      fullName: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(150, intl.formatMessage({ id: 'max-validate' })),

      code: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(15, intl.formatMessage({ id: 'max-validate' })),
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
        .matches(MOBILE_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
        .max(15, intl.formatMessage({ id: 'max-validate' })),
      note: yup.string().max(255, intl.formatMessage({ id: 'max-validate' }))
    },
    ['fullName', 'code', 'taxCode', 'address', 'phone', 'note']
  )

  const { handleSubmit, getValues, errors, control, reset, register, setError } = useForm({
    mode: 'onChange',
    resolver: yupResolver(isViewed ? yup.object().shape({}) : ValidateSchema),
    defaultValues: initValues || initState
  })

  useEffect(() => {
    const tempValues = {
      ...initValues,
      state: CUSTOMER_STATUS_OPTS.find((item) => item.value === initValues.state),
      type: GENERAL_CUSTOMER_TYPE.find((item) => item.value === initValues.type)
    }
    reset(tempValues)
  }, [initValues?.id])

  useEffect(() => {
    if (!isEqual(contacts, contactsState)) {
      setContactsState(contacts)
    }
  }, [contacts])

  const handleSubmitContactForm = (values) => {
    setContactsState(values)
  }

  const handleSubmitCustomerForm = async (values) => {
    // check trùng  mã khách hàng
    const dataCheck = { code: values.code }
    if (initValues?.id) dataCheck.id = initValues?.id
    const checkDupCodeRes = await axios.post(API_CHECK_DUPLICATE_CUSTOMER_CODE, dataCheck)
    if (checkDupCodeRes.status === 200 && checkDupCodeRes.data?.data) {
      setError('code', { type: 'custom', message: intl.formatMessage({ id: 'dubplicated-validate' }) })
      return
    }
    if (!contactsState?.filter((item) => !item.isDelete).length > 0) {
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
      contacts: contactsState
    })
  }
  return (
    <>
      <Form key="customer-form" onSubmit={handleSubmit(handleSubmitCustomerForm)}>
        <Row className="mb-2">
          <Col>
            <h4 className="typo-section">
              <FormattedMessage id="General Information" />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="name">
              <FormattedMessage id="Company name" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              disabled={isViewed}
              autoComplete="on"
              invalid={!!errors.fullName}
              valid={getValues('fullName')?.trim() && !errors.fullName}
              innerRef={register()}
              placeholder={intl.formatMessage({ id: 'operation-unit-form-name-placeholder' })}
            />
            {errors?.fullName && <FormFeedback>{errors?.fullName?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="code">
              <FormattedMessage id="Customer Code" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="code"
              name="code"
              autoComplete="on"
              disabled={isViewed}
              innerRef={register()}
              invalid={!!errors.code}
              valid={getValues('code')?.trim() && !errors.code}
              placeholder={intl.formatMessage({ id: 'Enter Customer Code' })}
            />
            {errors?.code && <FormFeedback>{errors?.code?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="type">
              <FormattedMessage id="Company Type" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Controller
              as={Select}
              control={control}
              theme={selectThemeColors}
              name="type"
              id="type"
              isDisabled={isViewed}
              innerRef={register()}
              options={GENERAL_CUSTOMER_TYPE}
              className="react-select"
              classNamePrefix="select"
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />
            {errors?.type && <FormFeedback>{errors?.type?.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="taxCode">
              <FormattedMessage id="operation-unit-form-taxCode" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="taxCode"
              name="taxCode"
              autoComplete="on"
              innerRef={register()}
              disabled={isViewed}
              invalid={!!errors.taxCode}
              valid={getValues('taxCode')?.trim() && !errors.taxCode}
              placeholder={intl.formatMessage({ id: 'operation-unit-form-taxCode-placeholder' })}
            />
            {errors?.taxCode && <FormFeedback>{errors?.taxCode?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="address">
              <FormattedMessage id="operation-unit-form-address" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="address"
              name="address"
              autoComplete="on"
              innerRef={register()}
              disabled={isViewed}
              invalid={!!errors.address}
              valid={getValues('address')?.trim() && !errors.address}
              placeholder={intl.formatMessage({ id: 'operation-unit-form-address-placeholder' })}
            />
            {errors?.address && <FormFeedback>{errors?.address?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="phone">
              <FormattedMessage id="operation-unit-form-mobile" />
            </Label>
            <Input
              id="phone"
              name="phone"
              autoComplete="on"
              innerRef={register()}
              disabled={isViewed}
              invalid={!!errors.phone}
              valid={getValues('phone')?.trim() && !errors.phone}
              placeholder={intl.formatMessage({ id: 'operation-unit-form-mobile-placeholder' })}
            />
            {errors?.phone && <FormFeedback>{errors?.phone?.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="state">
              <FormattedMessage id="Status" />
            </Label>
            <Controller
              as={Select}
              control={control}
              theme={selectThemeColors}
              name="state"
              id="state"
              isDisabled={isViewed}
              innerRef={register()}
              options={CUSTOMER_STATUS_OPTS}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select a status' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />
          </Col>
          <Col className="mb-2" md={8}>
            <Label className="general-label" for="status">
              <FormattedMessage id="note" />
            </Label>
            <Input
              id="note"
              name="note"
              autoComplete="on"
              disabled={isViewed}
              innerRef={register()}
              invalid={!!errors.note}
              valid={getValues('note')?.trim() && !errors.note}
              placeholder={intl.formatMessage({ id: 'Please enter note' })}
            />
            {errors?.note && <FormFeedback>{errors?.note?.message}</FormFeedback>}
          </Col>
        </Row>
        <Contact disabled={isViewed} onChange={handleSubmitContactForm} data={contactsState} />

        <Row>
          <Col className="d-flex justify-content-end align-items-center">
            <Button type="submit" color="primary" className="mr-1 px-3">
              {submitText || intl.formatMessage({ id: 'Save' })}
            </Button>{' '}
            <Button color="secondary" onClick={onCancel}>
              {intl.formatMessage({ id: 'Cancel' })}
            </Button>{' '}
          </Col>
        </Row>
      </Form>
    </>
  )
}

OperationCUForm.propTypes = {
  intl: object.isRequired,
  onSubmit: func,
  onCancel: func,
  initValues: object,
  submitText: string,
  isViewed: bool,
  contacts: array
}

export default injectIntl(OperationCUForm)
