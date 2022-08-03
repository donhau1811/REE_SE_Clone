/* eslint-disable no-unused-vars */
import { bool, func, object, string } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { selectThemeColors } from '@src/utility/Utils'
import { API_GET_ALL_OPERATION_UNIT, NUMBER_REGEX } from '@src/utility/constants'
import axios from 'axios'
import { accountantOptions } from './contants'
import Contract from './Contract'

const ProjectCUForm = ({ intl, onSubmit = () => {}, onCancel = () => {}, initValues, isReadOnly, submitText }) => {
  const initState = {}
  const [companies, setCompanies] = useState([])
  useEffect(async () => {
    const allCompaniesRes = await axios.get(API_GET_ALL_OPERATION_UNIT)
    const allCompanies = allCompaniesRes.data?.data
    setCompanies(
      (allCompanies || []).map(({ id, name }) => ({
        value: id,
        label: name
      }))
    )

  }, [])

  const ValidateSchema = yup.object().shape(
    {
      name: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(150, intl.formatMessage({ id: 'max-validate' })),

      code: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(20, intl.formatMessage({ id: 'max-validate' })),

      address: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(255, intl.formatMessage({ id: 'max-validate' })),
      companyId: yup.object().required(intl.formatMessage({ id: 'required-validate' })),
      accountantIds: yup.array().required(intl.formatMessage({ id: 'required-validate' })),
      power: yup
        .string()
        .matches(NUMBER_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
        .max(16, intl.formatMessage({ id: 'max-validate' }))
    },
    ['name', 'code', 'companyId', 'address', 'accountantIds', 'power']
  )

  const { handleSubmit, getValues, errors, control, register, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(isReadOnly ? yup.object().shape({}) : ValidateSchema),
    defaultValues: initValues || initState
  })


  useEffect(() => {
    reset({ ...initValues })
  }, [initValues])

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
              <FormattedMessage id="Projects" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="name"
              name="name"
              disabled={isReadOnly}
              autoComplete="on"
              invalid={!!errors.name}
              valid={getValues('name')?.trim() && !errors.name}
              innerRef={register()}
              placeholder={intl.formatMessage({ id: 'Enter project name' })}
            />
            {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="code">
              <FormattedMessage id="Project code" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="code"
              name="code"
              autoComplete="on"
              innerRef={register()}
              disabled={isReadOnly}
              invalid={!!errors.code}
              valid={getValues('code')?.trim() && !errors.code}
              placeholder={intl.formatMessage({ id: 'Enter project code' })}
            />
            {errors?.code && <FormFeedback>{errors?.code?.message}</FormFeedback>}
          </Col>
          <Col md={4}>
            <Label className="general-label" for="companyId">
              <FormattedMessage id="operation-units" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Controller
              options={companies}
              as={Select}
              control={control}
              theme={selectThemeColors}
              name="companyId"
              id="companyId"
              isDisabled={isReadOnly}
              innerRef={register()}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Choose operation unit' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />

            {errors?.companyId && <FormFeedback className="d-block">{errors?.companyId?.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="accountantIds">
              <FormattedMessage id="Assigned accountant" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Controller
              as={Select}
              control={control}
              theme={selectThemeColors}
              name="accountantIds"
              id="accountantIds"
              isDisabled={isReadOnly}
              isMulti
              options={accountantOptions}
              innerRef={register()}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Choose assigned accountant' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />

            {errors?.accountantIds && <FormFeedback className="d-block">{errors?.accountantIds?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={8}>
            <Label className="general-label" for="address">
              <FormattedMessage id="operation-unit-form-address" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="address"
              name="address"
              autoComplete="on"
              disabled={isReadOnly}
              innerRef={register()}
              invalid={!!errors.address}
              valid={getValues('address')?.trim() && !errors.address}
              placeholder={intl.formatMessage({ id: 'Enter address' })}
            />
            {errors?.address && <FormFeedback>{errors?.address?.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="startDate">
              <FormattedMessage id="Operation date" />
            </Label>

            <Input
              className="custom-icon-input-date"
              bsSize="sm"
              type="date"
              name="startDate"
              autoComplete="on"
              disabled={isReadOnly}
              innerRef={register()}
              invalid={!!errors.startDate}
              valid={getValues('startDate')?.trim() && !errors.startDate}
              placeholder={intl.formatMessage({ id: 'Enter address' })}
            />
          </Col>{' '}
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="power">
              <FormattedMessage id="Project power" />
            </Label>

            <Input
              className="custom-icon-input-date"
              name="power"
              autoComplete="on"
              disabled={isReadOnly}
              innerRef={register()}
              invalid={!!errors.power}
              valid={getValues('power')?.trim() && !errors.power}
              placeholder={intl.formatMessage({ id: 'Enter power' })}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Contract />
          </Col>
        </Row>
        <Row className="d-flex justify-content-end align-items-center">
          <Button type="submit" color="primary" className="mr-1 px-3">
            {submitText || intl.formatMessage({ id: 'Save' })}
          </Button>{' '}
          <Button color="secondary" onClick={onCancel}>
            {intl.formatMessage({ id: 'Cancel' })}
          </Button>{' '}
        </Row>
      </Form>
    </>
  )
}

ProjectCUForm.propTypes = {
  intl: object.isRequired,
  onSubmit: func,
  onCancel: func,
  initValues: object,
  isReadOnly: bool,
  submitText: string
}

export default injectIntl(ProjectCUForm)
