/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useForm, Controller, useFieldArray, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { selectThemeColors, showToast } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { bool, func, object, string } from 'prop-types'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import { API_CHECK_CODE_CONTRACT, API_GET_ALL_CUSTOMER, ISO_STANDARD_FORMAT } from '@src/utility/constants'
import Table from '@src/views/common/table/CustomDataTable'
import Select from 'react-select'
import axios from 'axios'
import Clock from '@src/views/billing/clock'

import { ReactComponent as Attachment } from '@src/assets/images/svg/attachment-file.svg'
import { PlusCircle, Trash2, XCircle } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomerWithContactsById } from '@src/views/billing/customer/store/actions'
import './style.scss'
import { get } from 'lodash'
import classNames from 'classnames'
import {
  DAYS_OF_MONTH_OPTIONS,
  END_OF_MONTH_OPTION,
  GENERAL_STATUS,
  MONTH_OPTIONS,
  POWER_BILLING_FORM_OPTIONS
} from '@src/utility/constants/billing'
import { ContractForm2 } from './ContractForm2'
import {
  ContractForm2Schema,
  ContractForm4Schema,
  ContractForm5Schema,
  ContractForm7Schema,
  ValidateSchemaObj
} from './ValidateSchemaObj'
import { ContractForm4 } from './ContractForm4'
import { ContractForm5 } from './ContractForm5'
import { ContractForm7 } from './ContractForm7'
import { useParams } from 'react-router-dom'
import { getBillingProjectById } from '@src/views/billing/project/store/actions'
import moment from 'moment'
import { values } from 'postcss-rtl/lib/affected-props'

const formInitValues = {
  billingCycle: [
    {
      start: { value: 1, label: 1 },
      end: END_OF_MONTH_OPTION,
      month: MONTH_OPTIONS[0]
    }
  ],
  formType: POWER_BILLING_FORM_OPTIONS[0],
  roundPrecision: 0,
  manualInputAlert: 0,
  confirmAlert: 0,
  billingAlert: 0,
  vat: 8
}

function PowerSellingCUForm({ intl, isReadOnly, initValues, submitText, onCancel, onSubmit }) {
  const {
    projects: { selectedProject: selectedBillingProject }
  } = useSelector((state) => state)

  const { setting } = useSelector((state) => state.settings)

  const { projectId } = useParams()

  const [customers, setCustomers] = useState([])

  const [validateSchemaState, setValidateSchemaState] = useState(ValidateSchemaObj)

  const dispatch = useDispatch()

  useEffect(() => {
    if (Number(projectId) !== Number(selectedBillingProject?.id)) {
      dispatch(
        getBillingProjectById({
          id: projectId,
          isSavedToState: true
        })
      )
    }
  }, [projectId])

  useEffect(async () => {
    const allCustomersRes = await axios.get(API_GET_ALL_CUSTOMER)
    const allCustomers = (allCustomersRes.data?.data).filter((item) => item.state === GENERAL_STATUS.ACTIVE)
    setCustomers(
      (allCustomers || []).map(({ id, fullName }) => ({
        value: id,
        label: fullName
      }))
    )
  }, [])
  const ValidateSchema = yup.object().shape(validateSchemaState)

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(isReadOnly ? yup.object().shape({}) : ValidateSchema),
    defaultValues: initValues || formInitValues
  })

  const { handleSubmit, getValues, errors, control, register, setValue, watch, setError, reset } = methods

  useEffect(() => {
    if (initValues?.id) {
      
      reset({
        ...initValues,
        formType: POWER_BILLING_FORM_OPTIONS.find((item) => item.value === initValues?.details?.id),
        startDate: initValues.startDate ? moment.utc(initValues.startDate).format(ISO_STANDARD_FORMAT) : null,
        endDate: initValues.endDate ? moment.utc(initValues.endDate).format(ISO_STANDARD_FORMAT) : null,
        customerId: customers.find((item) => item.value === initValues.customerId),
        ...initValues?.details,
        ...initValues?.alerts,
        peakPrice: initValues?.details?.unitPrice?.high,
        idlePrice: initValues?.details?.unitPrice?.low,
        midPointPrice: initValues?.details?.unitPrice?.medium,
        billingCycle: (initValues?.billingPeriods || []).map((item) => ({
          start: DAYS_OF_MONTH_OPTIONS.find((dayOfMonth) => dayOfMonth.value === item.startDay),
          end: item.endOfMonth
            ? END_OF_MONTH_OPTION
            : DAYS_OF_MONTH_OPTIONS.find((dayOfMonth) => dayOfMonth.value === item.endDay),
          month: item.nextMonth ? MONTH_OPTIONS[1] : MONTH_OPTIONS[0]
        })),
        currency: (setting.Currency || []).find((item) => item.value === initValues.details?.currencyUnit),
        currencyHigh: initValues?.details?.foreignUnitPrice?.high,
        currencyMedium: initValues?.details?.foreignUnitPrice?.medium,
        currencyLow: initValues?.details?.foreignUnitPrice?.low
      })
    }
  }, [initValues?.id, customers?.length, setting.Currency?.length])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'billingCycle'
  })

  const contactColumns = [
    {
      name: <FormattedMessage id="No." />,
      cell: (row, index) => index + 1,
      center: true,
      maxWidth: '50px'
    },
    {
      name: <FormattedMessage id="Fullname" />,
      selector: 'fullName',
      center: true
    },
    {
      name: <FormattedMessage id="Position" />,
      selector: 'position',
      center: true
    },
    {
      name: <FormattedMessage id="operation-unit-form-mobile" />,
      selector: 'phone',
      center: true
    },
    {
      name: 'Email',
      selector: 'email',
      center: true,
      cell: (row) => <span>{row.email}</span>
    },
    {
      name: <FormattedMessage id="note" />,
      selector: 'note',
      center: true,
      cell: (row) => <span>{row.note}</span>
    }
  ]

  useEffect(() => {
    const typeOfContract = watch('formType')?.value
    switch (typeOfContract) {
      case 2:
        setValidateSchemaState({ ...ValidateSchemaObj, ...ContractForm2Schema })
        break
      case 3:
        setValidateSchemaState({ ...ValidateSchemaObj, ...ContractForm2Schema, payoutRatio: null })
        break
      case 4:
        setValidateSchemaState({ ...ValidateSchemaObj, ...ContractForm4Schema, payoutRatio: null })
        break
      case 5:
        setValidateSchemaState({ ...ValidateSchemaObj, ...ContractForm5Schema, payoutRatio: null })
        break
      case 6:
        setValidateSchemaState({ ...ValidateSchemaObj, payoutRatio: null })
        break
      case 7:
        setValidateSchemaState({ ...ValidateSchemaObj, ...ContractForm7Schema, payoutRatio: null })
        break
      default:
        setValidateSchemaState(ValidateSchemaObj)
        break
    }
  }, [watch('formType')?.value])

  useEffect(() => {
    const customerId = watch('customerId')?.value
    if (!customerId) return
    dispatch(
      getCustomerWithContactsById({
        id: customerId,
        callback: (res) => {
          if (res) {
            setValue('taxCode', res.taxCode)
            setValue('address', res.address)
            setValue('contacts', res.contacts || [])
          }
        }
      })
    )
  }, [watch('customerId')])

  useEffect(() => {
    register('file')
    register('contacts')
    register('clocks')
  }, [register])

  const handleChangeClocks = (newClocks) => {
    setValue('clocks', newClocks)
  }

  const handleRemoveFile = (file) => (event) => {
    event.stopPropagation()
    const filesList = getValues('file')

    setValue(
      'file',
      filesList.filter((item) => item.name !== file.name),
      { shouldValidate: true }
    )
  }

  const handleChangeFiles = (event) => {
    const files = Array.from(event.target.files)
    setValue('file', files, { shouldValidate: true })
  }

  const handleRemoveCycle = (index) => () => {
    if (fields.length > 1) remove(index)
  }

  const handleAppendCycle = () => {
    append(formInitValues.billingCycle[0])
  }

  const handleSubmitForm = async (values) => {
    if (isReadOnly) {
      onSubmit?.(initValues)
      return
    }
    // check trùng  mã khách hàng
    const dataCheck = { code: values.code }
    if (initValues?.id) dataCheck.id = initValues?.id
    const checkDupCodeRes = await axios.post(API_CHECK_CODE_CONTRACT, dataCheck)
    if (checkDupCodeRes.status === 200 && checkDupCodeRes.data?.data) {
      setError('code', {
        type: 'custom',
        message: intl.formatMessage({ id: 'dubplicated-validate' }),
        shouldFocus: true
      })
      return
    }
    if (!(values.clocks || [])?.filter((item) => !item.isDelete).length > 0) {
      showToast('error', <FormattedMessage id="Need at least 1 clock to add contract. Please try again" />)
      return
    }
    console.log('values', values)
    const payload = {
      state: GENERAL_STATUS.ACTIVE,
      code: values.code,
      type: 'CUSTOMER',
      projectId,
      customerId: values.customerId?.value,
      roofVendorId: null,
      startDate: values.startDate ? moment.utc(values.startDate) : null,
      endDate: values.endDate ? moment.utc(values.endDate) : null,
      url: 'link contract pdf',
      billingPeriods: (values.billingCycle || []).map((item, index) => {
        const returnedCycle = {
          id: index + 1,
          startDay: item.start?.value,
          endDay: item.end?.value === END_OF_MONTH_OPTION.value ? 31 : item.end?.value,
          nextMonth: item.month?.value === MONTH_OPTIONS[1].value
        }
        if (item.end?.value === END_OF_MONTH_OPTION.value) {
          returnedCycle.endOfMonth = true
        }
        return returnedCycle
      }),
      alerts: {
        manualInputAlert: values.manualInputAlert,
        confirmAlert: values.confirmAlert,
        billingAlert: values.billingAlert
      }
    }
    const contractDetail = {
      id: values.formType?.value,
      name: intl.formatMessage(
        { id: 'Power billing form number' },
        {
          number: values.formType?.value
        }
      ),
      roundPrecision: values.roundPrecision,
      vat: values.vat,
      unitPrice: {
        low: values.idlePrice,
        medium: values.midPointPrice,
        high: values.peakPrice
      },
      payoutRatio: values.payoutRatio,
      lossRate: values.lossRate,
      unitPriceRate: values.unitPriceRate,
      currencyUnit: values.currency?.value,
      foreignUnitPrice: {
        low: values.currencyLow,
        medium: values.currencyMedium,
        high: values.currencyHigh
      },
      revenueShareRatio: values.revenueShareRatio,
      chargeRate: values.chargeRate
    }
    onSubmit?.({ ...payload, details: contractDetail, clocks: values.clocks })
  }

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <Row>
            <Col className="mb-2" xs={6} lg={3}>
              <Label className="general-label" for="code">
                <FormattedMessage id="Contract number" />
                <span className="text-danger">&nbsp;(*)</span>
              </Label>
              <Input
                id="code"
                name="code"
                disabled={isReadOnly}
                autoComplete="on"
                invalid={!!errors.code}
                valid={getValues('code')?.trim() && !errors.code}
                innerRef={register()}
                placeholder={intl.formatMessage({ id: 'Enter contract number' })}
              />
              {errors?.code && <FormFeedback>{errors?.code?.message}</FormFeedback>}
            </Col>
            <Col className="mb-2" xs={6} lg={2}>
              <Label className="general-label" for="startDate">
                <FormattedMessage id="Signed date" />
                <span className="text-danger">&nbsp;(*)</span>
              </Label>
              <Input
                className="custom-icon-input-date"
                type="date"
                name="startDate"
                autoComplete="on"
                disabled={isReadOnly}
                innerRef={register()}
                invalid={!!errors.startDate}
                valid={getValues('startDate')?.trim() && !errors.startDate}
              />
              {errors?.startDate && <FormFeedback>{errors?.startDate?.message}</FormFeedback>}
            </Col>
            <Col className="mb-2" xs={6} lg={2}>
              <Label className="general-label" for="endDate">
                <FormattedMessage id="Expiration date" />
                <span className="text-danger">&nbsp;(*)</span>
              </Label>
              <Input
                className="custom-icon-input-date"
                type="date"
                name="endDate"
                autoComplete="on"
                disabled={isReadOnly}
                innerRef={register()}
                invalid={!!errors.endDate}
                valid={getValues('endDate')?.trim() && !errors.endDate}
              />
              {errors?.endDate && <FormFeedback>{errors?.endDate?.message}</FormFeedback>}
            </Col>
            <Col xs={12} className=" mb-2 d-flex flex-column justify-content-end">
              <div className="d-flex align-items-end">
                <div className="mr-2">
                  {watch('file')?.map((item) => (
                    <a key={item.name} href="#" className="d-block">
                      {item.name}
                      <span className="ml-1" role="button" onClick={handleRemoveFile(item)}>
                        <XCircle size={14} color="#838A9C" />
                      </span>
                    </a>
                  ))}
                </div>
                <div className="d-flex align-items-center">
                  <Label className="file-attachment-label" for="file" role="button">
                    <span className="mr-1">
                      <Attachment />
                    </span>
                    <FormattedMessage id="Đính kèm file hợp đồng" />
                  </Label>
                  <Input
                    type="file"
                    autoComplete="on"
                    disabled={isReadOnly}
                    id="file"
                    multiple
                    onChange={handleChangeFiles}
                    className="d-none"
                  />
                </div>
              </div>
              {errors?.file && <FormFeedback className="d-block">{errors?.file?.message}</FormFeedback>}
            </Col>
          </Row>

          <Row>
            <Col className="mb-2" xs={6} lg={3}>
              <Label className="general-label" for="customerId">
                <FormattedMessage id="Customer" />
                <span className="text-danger">&nbsp;(*)</span>
              </Label>
              <Controller
                as={Select}
                control={control}
                theme={selectThemeColors}
                name="customerId"
                id="customerId"
                isDisabled={isReadOnly}
                innerRef={register()}
                options={customers}
                className="react-select"
                classNamePrefix="select"
                placeholder={intl.formatMessage({ id: 'Select customer' })}
                formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
              />
              {errors?.customerId && <FormFeedback className="d-block">{errors?.customerId?.message}</FormFeedback>}
            </Col>
            <Col className="mb-2" xs={6} lg={2}>
              <Label className="general-label" for="taxCode">
                <FormattedMessage id="operation-unit-form-taxCode" />
              </Label>
              <Input
                id="taxCode"
                name="taxCode"
                autoComplete="on"
                innerRef={register()}
                disabled
                invalid={!!errors.taxCode}
                valid={getValues('taxCode')?.trim() && !errors.taxCode}
                placeholder={intl.formatMessage({ id: 'operation-unit-form-taxCode-placeholder' })}
              />
              {errors?.taxCode && <FormFeedback>{errors?.taxCode?.message}</FormFeedback>}
            </Col>
            <Col className="mb-2" xs={6} lg={5}>
              <Label className="general-label" for="address">
                <FormattedMessage id="operation-unit-form-address" />
              </Label>
              <Input
                id="address"
                name="address"
                autoComplete="on"
                innerRef={register()}
                disabled
                invalid={!!errors.address}
                valid={getValues('address')?.trim() && !errors.address}
                placeholder={intl.formatMessage({ id: 'operation-unit-form-address-placeholder' })}
              />
              {errors?.address && <FormFeedback>{errors?.address?.message}</FormFeedback>}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Label className="general-label" for="contacts">
                <FormattedMessage id="Notification recievers" />
              </Label>
              <Table tableId="project" columns={contactColumns} data={watch('contacts')} pagination={null} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h4 className="typo-section mb-2">
                <FormattedMessage id="Power billing cycle" />
              </h4>

              {fields.map((item, index) => {
                const getValidStart = get(errors, `billingCycle[${index}].start`)
                const getValidEnd = get(errors, `billingCycle[${index}].end`)
                return (
                  <div
                    key={item.id}
                    className={classNames('d-flex align-items-center ', index !== fields.length - 1 && 'my-2')}
                  >
                    <div className="cycle-item-wrapper">
                      <Row>
                        <Col xs={12} lg="auto" className="d-flex align-items-center">
                          <Label className="general-label mb-0">
                            {`${intl.formatMessage({ id: 'Cycle' })} ${index + 1}`}
                            <span className="text-danger">&nbsp;(*)</span>
                          </Label>
                        </Col>
                        <Col xs={12} lg={3}>
                          <Controller
                            as={Select}
                            control={control}
                            theme={selectThemeColors}
                            name={`billingCycle[${index}].start`}
                            isDisabled={isReadOnly}
                            innerRef={register()}
                            options={DAYS_OF_MONTH_OPTIONS}
                            className="react-select"
                            classNamePrefix="select"
                            formatOptionLabel={(option) => <>{option.label}</>}
                            defaultValue={item.start}
                          />
                          {getValidStart && <FormFeedback>{getValidStart?.message}</FormFeedback>}
                        </Col>
                        <Col xs={12} lg={3}>
                          <Controller
                            as={Select}
                            control={control}
                            theme={selectThemeColors}
                            name={`billingCycle[${index}].end`}
                            isDisabled={isReadOnly}
                            innerRef={register()}
                            options={[...DAYS_OF_MONTH_OPTIONS, END_OF_MONTH_OPTION]}
                            className="react-select"
                            classNamePrefix="select"
                            formatOptionLabel={(option) => <>{option.label}</>}
                            defaultValue={item.end}
                          />
                          {getValidEnd && <FormFeedback>{getValidEnd?.message}</FormFeedback>}
                        </Col>
                        <Col xs={12} lg={3}>
                          <Controller
                            as={Select}
                            control={control}
                            theme={selectThemeColors}
                            name={`billingCycle[${index}].month`}
                            isDisabled={isReadOnly}
                            innerRef={register()}
                            options={MONTH_OPTIONS}
                            className="react-select"
                            classNamePrefix="select"
                            formatOptionLabel={(option) => <>{option.label}</>}
                            defaultValue={item.month}
                          />
                        </Col>
                        {fields.length > 1 && (
                          <Col xs={12} lg="auto" className="d-flex align-items-center">
                            <span role="button" onClick={handleRemoveCycle(index)}>
                              <Trash2 size={18} />
                            </span>
                          </Col>
                        )}
                      </Row>
                    </div>
                    {index === fields.length - 1 && (
                      <div className="ml-1" role="button" onClick={handleAppendCycle}>
                        <PlusCircle color="#e9eef6" fill="#0394FF" />
                      </div>
                    )}
                  </div>
                )
              })}
            </Col>
          </Row>

          <div className="divider-dashed mb-2" />
          <Row className="mb-2">
            <Col xs={12} lg={5}>
              <Row>
                <Col className="mb-2" xs={6} lg={8}>
                  <Label className="general-label" for="formType">
                    <FormattedMessage id="Power billing form" />
                    <span className="text-danger">&nbsp;(*)</span>
                  </Label>
                  <Controller
                    as={Select}
                    control={control}
                    theme={selectThemeColors}
                    name="formType"
                    isDisabled={isReadOnly}
                    innerRef={register()}
                    options={POWER_BILLING_FORM_OPTIONS}
                    className="react-select"
                    classNamePrefix="select"
                    formatOptionLabel={(option) => <>{option.label}</>}
                  />
                  {errors?.formType && <FormFeedback>{errors?.formType?.message}</FormFeedback>}
                </Col>
                <Col className="mb-2" xs={6} lg={4}>
                  <Label className="general-label" for="vat">
                    <FormattedMessage id="VAT (%)" />
                    <span className="text-danger">&nbsp;(*)</span>
                  </Label>
                  <Input
                    id="vat"
                    name="vat"
                    autoComplete="on"
                    innerRef={register()}
                    invalid={!!errors.vat}
                    valid={getValues('vat')?.trim() && !errors.vat}
                    placeholder={intl.formatMessage({ id: 'Enter' })}
                  />
                  {errors?.vat && <FormFeedback>{errors?.vat?.message}</FormFeedback>}
                </Col>
              </Row>
              <Row>
                {[1, 2].includes(watch('formType')?.value) && (
                  <Col className="mb-2" xs={6} lg={8}>
                    <Label className="general-label" for="coefficient">
                      <FormattedMessage id="Payout coefficient" />
                      <span className="text-danger">&nbsp;(*)</span>
                    </Label>
                    <Input
                      id="payoutRatio"
                      name="payoutRatio"
                      autoComplete="on"
                      innerRef={register()}
                      invalid={!!errors.payoutRatio}
                      valid={getValues('payoutRatio')?.trim() && !errors.payoutRatio}
                      placeholder={intl.formatMessage({ id: 'Enter coefficient' })}
                    />
                    {errors?.payoutRatio && <FormFeedback>{errors?.payoutRatio?.message}</FormFeedback>}
                  </Col>
                )}
                <Col className="mb-2" xs={6} lg={4}>
                  <Label className="general-label" for="roundPrecision">
                    <FormattedMessage id="Rounding" />
                    <span className="text-danger">&nbsp;(*)</span>
                  </Label>
                  <Input
                    id="roundPrecision"
                    name="roundPrecision"
                    autoComplete="on"
                    innerRef={register()}
                    invalid={!!errors.roundPrecision}
                    valid={getValues('roundPrecision')?.trim() && !errors.roundPrecision}
                    placeholder={intl.formatMessage({ id: 'Enter' })}
                  />
                  {errors?.roundPrecision && <FormFeedback>{errors?.roundPrecision?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
            <Col xs={0} lg={1} className="divider-vertical" />

            <Col xs={12} lg={{ size: 5, offset: 1 }}>
              <Row>
                <Col className="mb-2 d-flex align-items-center" xs={6} lg={9}>
                  <Label className="general-label mb-0" for="manualInputAlert">
                    <FormattedMessage id="Remind to enter power index" />
                    <span className="text-danger">&nbsp;(*)</span>
                    <span className="font-weight-normal">
                      {' '}
                      (<FormattedMessage id="day" />){' '}
                    </span>
                    <span className="form-text-sub">
                      {' '}
                      (<FormattedMessage id="from the end of cycle" />){' '}
                    </span>
                  </Label>
                </Col>
                <Col className="mb-2" xs={6} lg={3}>
                  <Input
                    id="manualInputAlert"
                    name="manualInputAlert"
                    autoComplete="on"
                    innerRef={register()}
                    invalid={!!errors.manualInputAlert}
                    valid={getValues('manualInputAlert')?.trim() && !errors.manualInputAlert}
                    placeholder={intl.formatMessage({ id: 'Enter' })}
                  />
                  {errors?.manualInputAlert && <FormFeedback>{errors?.manualInputAlert?.message}</FormFeedback>}
                </Col>
              </Row>
              <Row>
                <Col className="mb-2 d-flex align-items-center" xs={6} lg={9}>
                  <Label className="general-label mb-0" for="confirmAlert">
                    <FormattedMessage id="Remind customer to confirm" />
                    <span className="text-danger">&nbsp;(*)</span>
                    <span className="font-weight-normal">
                      {' '}
                      (<FormattedMessage id="day" />){' '}
                    </span>
                    <span className="form-text-sub">
                      {' '}
                      (<FormattedMessage id="from the end of cycle" />){' '}
                    </span>
                  </Label>
                </Col>
                <Col className="mb-2" xs={6} lg={3}>
                  <Input
                    id="confirmAlert"
                    name="confirmAlert"
                    autoComplete="on"
                    innerRef={register()}
                    invalid={!!errors.confirmAlert}
                    valid={getValues('confirmAlert')?.trim() && !errors.confirmAlert}
                    placeholder={intl.formatMessage({ id: 'Enter' })}
                  />
                  {errors?.confirmAlert && <FormFeedback>{errors?.confirmAlert?.message}</FormFeedback>}
                </Col>
              </Row>{' '}
              <Row>
                <Col className="mb-2 d-flex align-items-center" xs={6} lg={9}>
                  <Label className="general-label mb-0" for="billingAlert">
                    <FormattedMessage id="Date of payment" />
                    <span className="text-danger">&nbsp;(*)</span>
                    <span className="font-weight-normal">
                      {' '}
                      (<FormattedMessage id="day" />){' '}
                    </span>
                    <span className="form-text-sub">
                      {' '}
                      (<FormattedMessage id="from the end of cycle" />){' '}
                    </span>
                  </Label>
                </Col>
                <Col className="mb-2" xs={6} lg={3}>
                  <Input
                    id="billingAlert"
                    name="billingAlert"
                    autoComplete="on"
                    innerRef={register()}
                    invalid={!!errors.billingAlert}
                    valid={getValues('billingAlert')?.trim() && !errors.billingAlert}
                    placeholder={intl.formatMessage({ id: 'Enter' })}
                  />
                  {errors?.billingAlert && <FormFeedback>{errors?.billingAlert?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="divider-dashed mb-2" />
          <Row className="mb-2">
            <Col>
              <h4 className="typo-section mb-2">
                <FormattedMessage id="Unit price of electricity (VND)" />
              </h4>
            </Col>
          </Row>
          <Row>
            <Col className="mb-2" xs={12} lg={4}>
              <Label className="general-label" for="peakPrice">
                <FormattedMessage id="Peak" />
                <span className="text-danger">&nbsp;(*)</span>
              </Label>
              <Input
                id="peakPrice"
                name="peakPrice"
                autoComplete="on"
                innerRef={register()}
                invalid={!!errors.peakPrice}
                valid={getValues('peakPrice')?.trim() && !errors.peakPrice}
                placeholder={intl.formatMessage({ id: 'Enter price' })}
              ></Input>
              {errors?.peakPrice && <FormFeedback>{errors?.peakPrice?.message}</FormFeedback>}
            </Col>
            <Col className="mb-2" xs={12} lg={4}>
              <Label className="general-label" for="midPointPrice">
                <FormattedMessage id="Mid-point" />
                <span className="text-danger">&nbsp;(*)</span>
              </Label>
              <Input
                id="midPointPrice"
                name="midPointPrice"
                autoComplete="on"
                innerRef={register()}
                invalid={!!errors.midPointPrice}
                valid={getValues('midPointPrice')?.trim() && !errors.midPointPrice}
                placeholder={intl.formatMessage({ id: 'Enter price' })}
              />
              {errors?.midPointPrice && <FormFeedback>{errors?.midPointPrice?.message}</FormFeedback>}
            </Col>
            <Col className="mb-2" xs={12} lg={4}>
              <Label className="general-label" for="idlePrice">
                <FormattedMessage id="Idle" />
                <span className="text-danger">&nbsp;(*)</span>
              </Label>
              <Input
                id="idlePrice"
                name="idlePrice"
                autoComplete="on"
                innerRef={register()}
                invalid={!!errors.idlePrice}
                valid={getValues('idlePrice')?.trim() && !errors.idlePrice}
                placeholder={intl.formatMessage({ id: 'Enter price' })}
              />
              {errors?.idlePrice && <FormFeedback>{errors?.idlePrice?.message}</FormFeedback>}
            </Col>
          </Row>
          {[2, 3].includes(watch('formType')?.value) && <ContractForm2 />}
          {watch('formType')?.value === 4 && <ContractForm4 />}
          {watch('formType')?.value === 5 && <ContractForm5 />}
          {watch('formType')?.value === 7 && <ContractForm7 />}
          <div className="divider-dashed mb-2" />
          <Clock disabled={isReadOnly} data={watch('clocks')} onChange={handleChangeClocks} contractId={initValues?.id} />
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
      </FormProvider>
    </>
  )
}

PowerSellingCUForm.propTypes = {
  intl: object,
  isReadOnly: bool,
  submitText: string,
  initValues: object,
  onCancel: func,
  onSubmit: func
}

export default injectIntl(PowerSellingCUForm)
