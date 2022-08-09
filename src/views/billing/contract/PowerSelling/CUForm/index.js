import React, { useEffect, useState } from 'react'
import { useForm, Controller, useFieldArray, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { selectThemeColors } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { bool, func, object, string } from 'prop-types'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import { API_GET_ALL_CUSTOMER } from '@src/utility/constants'
import Table from '@src/views/common/table/CustomDataTable'
import Select from 'react-select'
import axios from 'axios'
import Clock from '@src/views/billing/clock'

import { ReactComponent as Attachment } from '@src/assets/images/svg/attachment-file.svg'
import { PlusCircle, Trash2, XCircle } from 'react-feather'
import { useDispatch } from 'react-redux'
import { getCustomerWithContactsById } from '@src/views/billing/customer/store/actions'
import './style.scss'
import { get } from 'lodash'
import classNames from 'classnames'
import { MONTH_OPTIONS, POWER_BILLING_FORM_OPTIONS } from '@src/utility/constants/billing'
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

function PowerSellingCUForm({ intl, isReadOnly, initValues, submitText, onCancel }) {
  const [customers, setCustomers] = useState([])

  const [validateSchemaState, setValidateSchemaState] = useState(ValidateSchemaObj)

  const dispatch = useDispatch()

  useEffect(async () => {
    const allCustomersRes = await axios.get(API_GET_ALL_CUSTOMER)
    const allCustomers = allCustomersRes.data?.data
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
    defaultValues: initValues || {
      billingCycle: [
        {
          start: 1,
          end: 31,
          month: MONTH_OPTIONS[0]
        }
      ],
      formType: POWER_BILLING_FORM_OPTIONS[3],
      round: 0,
      reminderToEnterIndex: 0,
      reminderCusToConfirm: 0,
      dateOfPayment: 0,
      vat: 8
    }
  })

  const { handleSubmit, getValues, errors, control, register, setValue, watch } = methods

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
      case 3:
        setValidateSchemaState({ ...ValidateSchemaObj, ...ContractForm2Schema })
        break
      case 4:
        setValidateSchemaState({ ...ValidateSchemaObj, ...ContractForm4Schema })
        break
      case 5:
        setValidateSchemaState({ ...ValidateSchemaObj, ...ContractForm5Schema })
        break
      case 7:
        setValidateSchemaState({ ...ValidateSchemaObj, ...ContractForm7Schema })
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
    append({
      start: 1,
      end: 31,
      month: MONTH_OPTIONS[0]
    })
  }
  const handleSubmitForm = (values) => {
    console.log('values', values)
  }
  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <Row>
            <Col className="mb-2" xs={6} lg={3}>
              <Label className="general-label" for="contractId">
                <FormattedMessage id="Contract number" />
                <span className="text-danger">&nbsp;(*)</span>
              </Label>
              <Input
                id="contractId"
                name="contractId"
                disabled={isReadOnly}
                autoComplete="on"
                invalid={!!errors.contractId}
                valid={getValues('contractId')?.trim() && !errors.contractId}
                innerRef={register()}
                placeholder={intl.formatMessage({ id: 'Enter contract number' })}
              />
              {errors?.contractId && <FormFeedback>{errors?.contractId?.message}</FormFeedback>}
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
                          <Input
                            name={`billingCycle[${index}].start`}
                            type="number"
                            disabled={isReadOnly}
                            autoComplete="on"
                            innerRef={register({ valueAsNumber: true })}
                            defaultValue={item.start}
                            invalid={!!getValidStart}
                            valid={getValues(`billingCycle[${index}].start`) && !getValidStart}
                          />
                          {getValidStart && <FormFeedback>{getValidStart?.message}</FormFeedback>}
                        </Col>
                        <Col xs={12} lg={3}>
                          <Input
                            name={`billingCycle[${index}].end`}
                            type="number"
                            disabled={isReadOnly}
                            autoComplete="on"
                            innerRef={register()}
                            defaultValue={item.end}
                            invalid={!!getValidEnd}
                            valid={getValues(`billingCycle[${index}].end`)?.trim() && !getValidEnd}
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
                <Col className="mb-2" xs={6} lg={8}>
                  <Label className="general-label" for="coefficient">
                    <FormattedMessage id="Payout coefficient" />
                  </Label>
                  <Input
                    id="coefficient"
                    name="coefficient"
                    autoComplete="on"
                    type="number"
                    innerRef={register()}
                    invalid={!!errors.coefficient}
                    valid={getValues('coefficient')?.trim() && !errors.coefficient}
                    placeholder={intl.formatMessage({ id: 'Enter coefficient' })}
                  />
                  {errors?.coefficient && <FormFeedback>{errors?.coefficient?.message}</FormFeedback>}
                </Col>
                <Col className="mb-2" xs={6} lg={4}>
                  <Label className="general-label" for="round">
                    <FormattedMessage id="Rounding" />
                  </Label>
                  <Input
                    id="round"
                    name="round"
                    autoComplete="on"
                    type="number"
                    innerRef={register()}
                    invalid={!!errors.round}
                    valid={getValues('round')?.trim() && !errors.round}
                    placeholder={intl.formatMessage({ id: 'Enter' })}
                  />
                  {errors?.round && <FormFeedback>{errors?.round?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
            <Col xs={0} lg={1} className="divider-vertical" />

            <Col xs={12} lg={{ size: 5, offset: 1 }}>
              <Row>
                <Col className="mb-2 d-flex align-items-center" xs={6} lg={9}>
                  <Label className="general-label mb-0" for="reminderToEnterIndex">
                    <FormattedMessage id="Remind to enter power index" />
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
                    id="reminderToEnterIndex"
                    name="reminderToEnterIndex"
                    autoComplete="on"
                    type="number"
                    innerRef={register()}
                    invalid={!!errors.reminderToEnterIndex}
                    valid={getValues('reminderToEnterIndex')?.trim() && !errors.reminderToEnterIndex}
                    placeholder={intl.formatMessage({ id: 'Enter' })}
                  />
                  {errors?.reminderToEnterIndex && <FormFeedback>{errors?.reminderToEnterIndex?.message}</FormFeedback>}
                </Col>
              </Row>
              <Row>
                <Col className="mb-2 d-flex align-items-center" xs={6} lg={9}>
                  <Label className="general-label mb-0" for="reminderCusToConfirm">
                    <FormattedMessage id="Remind customer to confirm" />
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
                    id="reminderCusToConfirm"
                    name="reminderCusToConfirm"
                    autoComplete="on"
                    type="number"
                    innerRef={register()}
                    invalid={!!errors.reminderCusToConfirm}
                    valid={getValues('reminderCusToConfirm')?.trim() && !errors.reminderCusToConfirm}
                    placeholder={intl.formatMessage({ id: 'Enter' })}
                  />
                  {errors?.reminderCusToConfirm && <FormFeedback>{errors?.reminderCusToConfirm?.message}</FormFeedback>}
                </Col>
              </Row>{' '}
              <Row>
                <Col className="mb-2 d-flex align-items-center" xs={6} lg={9}>
                  <Label className="general-label mb-0" for="dateOfPayment">
                    <FormattedMessage id="Date of payment" />
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
                    id="dateOfPayment"
                    name="dateOfPayment"
                    autoComplete="on"
                    type="number"
                    innerRef={register()}
                    invalid={!!errors.dateOfPayment}
                    valid={getValues('dateOfPayment')?.trim() && !errors.dateOfPayment}
                    placeholder={intl.formatMessage({ id: 'Enter' })}
                  />
                  {errors?.reminderToEnterIndex && <FormFeedback>{errors?.reminderToEnterIndex?.message}</FormFeedback>}
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
                {/* <span className="text-danger">&nbsp;(*)</span> */}
              </Label>
              <Input
                id="peakPrice"
                name="peakPrice"
                autoComplete="on"
                innerRef={register()}
                invalid={!!errors.peakPrice}
                valid={getValues('peakPrice')?.trim() && !errors.peakPrice}
                placeholder={intl.formatMessage({ id: 'Enter price' })}
                type="number"
              ></Input>
              {errors?.peakPrice && <FormFeedback>{errors?.peakPrice?.message}</FormFeedback>}
            </Col>
            <Col className="mb-2" xs={12} lg={4}>
              <Label className="general-label" for="midPointPrice">
                <FormattedMessage id="Mid-point" />
                {/* <span className="text-danger">&nbsp;(*)</span> */}
              </Label>
              <Input
                id="midPointPrice"
                name="midPointPrice"
                autoComplete="on"
                type="number"
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
                {/* <span className="text-danger">&nbsp;(*)</span> */}
              </Label>
              <Input
                id="idlePrice"
                name="idlePrice"
                autoComplete="on"
                type="number"
                innerRef={register()}
                invalid={!!errors.idlePrice}
                valid={getValues('idlePrice')?.trim() && !errors.idlePrice}
                placeholder={intl.formatMessage({ id: 'Enter price' })}
              />
              {errors?.idlePrice && <FormFeedback>{errors?.idlePrice?.message}</FormFeedback>}
            </Col>
          </Row>
          {[2, 3].includes(watch('formType').value) && <ContractForm2 />}
          {watch('formType').value === 4 && <ContractForm4 />}
          {watch('formType').value === 5 && <ContractForm5 />}
          {watch('formType').value === 7 && <ContractForm7 />}
          <div className="divider-dashed mb-2" />
          <Clock disabled={isReadOnly} data={watch('clocks')} onChange={handleChangeClocks} />
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
  onCancel: func
}

export default injectIntl(PowerSellingCUForm)
