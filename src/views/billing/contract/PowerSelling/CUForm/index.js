/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'
import { selectThemeColors } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { bool, func, object, string } from 'prop-types'
import { Button, Col, DropdownItem, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import { API_GET_ALL_CUSTOMER } from '@src/utility/constants'
import Table from '@src/views/common/table/CustomDataTable'
import Select from 'react-select'
import axios from 'axios'

import { ReactComponent as Attachment } from '@src/assets/images/svg/attachment-file.svg'
import { PlusCircle, Trash2, XCircle } from 'react-feather'
import { useDispatch } from 'react-redux'
import { getCustomerWithContactsById } from '@src/views/billing/customer/store/actions'
import './style.scss'
import { get } from 'lodash'
import classNames from 'classnames'

function PowerSellingCUForm({ intl, isReadOnly, initValues, submitText, onCancel }) {
  const MONTH_OPTIONS = [
    {
      value: 1,
      label: intl.formatMessage({ id: 'This month' })
    },
    {
      value: 2,
      label: intl.formatMessage({ id: 'Next month' })
    }
  ]
  const [customers, setCustomers] = useState([])
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
  const ValidateSchema = yup.object().shape(
    {
      contractId: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(50, intl.formatMessage({ id: 'max-validate' })),
      file: yup.array().required(intl.formatMessage({ id: 'required-validate' })),
      customerId: yup.object().required(intl.formatMessage({ id: 'required-validate' })),
      billingCycle: yup.array().of(
        yup.object().shape({
          start: yup.number().test('limit', intl.formatMessage({ id: 'invalid-format-validate' }), (value) => {
            return value >= 1 && value <= 31
          }),
          end: yup.number().test('limit', intl.formatMessage({ id: 'invalid-format-validate' }), (value) => {
            return value >= 1 && value <= 31
          })
        })
      )
    }
  )

  const { handleSubmit, getValues, errors, control, register, setValue, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(isReadOnly ? yup.object().shape({}) : ValidateSchema),
    defaultValues: initValues || {
      billingCycle: [
        {
          start: 1,
          end: 31,
          month: MONTH_OPTIONS[0]
        }
      ]
    }
  })

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
  }, [register])

  console.log('waerdf', watch('billingCycle'))

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

  console.log('fsdf', errors)

  return (
    <>
      <Form onSubmit={handleSubmit()}>
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
          <Col xs={12} lg={7} className=" mb-2 d-flex flex-column justify-content-end">
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
          <Col className="mb-2 d-flex align-items-end" xs={6} lg={2}>
            <Button type="submit" color="primary" className=" px-3 btn-block">
              {submitText || intl.formatMessage({ id: 'Update information' })}
            </Button>{' '}
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Label className="general-label" for="address">
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
              console.log('item', item)

              const getValidStart = get(errors, `billingCycle[${index}].start`)
              const getValidEnd = get(errors, `billingCycle[${index}].end`)
              console.log('getValidStart', getValues(`billingCycle[${index}].start`))
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
                          min="0"
                          disabled={isReadOnly}
                          autoComplete="on"
                          innerRef={register()}
                          defaultValue={item.start}
                          invalid={!!getValidStart}
                          valid={getValues(`billingCycle[${index}].start`)?.trim() && !getValidStart}
                        />
                        {getValidStart && <FormFeedback>{getValidStart?.message}</FormFeedback>}
                      </Col>
                      <Col xs={12} lg={3}>
                        <Input
                          name={`billingCycle[${index}].end`}
                          type="number"
                          min="0"
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
                          formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
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
        <Row>
          <Col xs={12} lg={6}>
              
          </Col>
          <Col xs={12} lg={6}></Col>
        </Row>

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

PowerSellingCUForm.propTypes = {
  intl: object,
  isReadOnly: bool,
  submitText: string,
  initValues: object,
  onCancel: func
}

export default injectIntl(PowerSellingCUForm)
