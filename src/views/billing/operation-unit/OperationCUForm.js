import { func, object } from 'prop-types'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import { selectThemeColors } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MOBILE_REGEX } from '@src/utility/constants'

const OperationCUForm = ({ intl, onSubmit = () => {}, onCancel = () => {}, initValues }) => {
  const OPERATION_UNIT_STATUS_OPTS = [
    { value: OPERATION_UNIT_STATUS.INACTIVE, label: intl.formatMessage({ id: 'Active' }) },
    { value: OPERATION_UNIT_STATUS.ACTIVE, label: intl.formatMessage({ id: 'Inactive' }) }
  ]
  const initState = {
    status: OPERATION_UNIT_STATUS_OPTS[0]
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

      address: yup.string().max(255, intl.formatMessage({ id: 'max-validate' })),
      mobile: yup
        .string()
        .matches(MOBILE_REGEX, intl.formatMessage({ id: 'invalid-character-validate' }))
        .max(15, intl.formatMessage({ id: 'max-validate' }))
    },
    ['name', 'code', 'taxCode', 'address', 'mobile']
  )

  const { handleSubmit, getValues, errors, control, register } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ValidateSchema),
    defaultValues: initValues || initState
  })

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="name">
                <FormattedMessage id="operation-unit-form-name" />
                <span className="text-danger">&nbsp;*</span>
              </Label>
              <Input
                id="name"
                name="name"
                autoComplete="on"
                invalid={!!errors.name}
                valid={getValues('name')?.trim() && !errors.name}
                innerRef={register()}
                placeholder={intl.formatMessage({ id: 'operation-unit-form-name-placeholder' })}
              />
              {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="code">
                <FormattedMessage id="operation-unit-form-code" />
                <span className="text-danger">&nbsp;*</span>
              </Label>
              <Input
                id="code"
                name="code"
                autoComplete="on"
                innerRef={register()}
                invalid={!!errors.code}
                valid={getValues('code')?.trim() && !errors.code}
                placeholder={intl.formatMessage({ id: 'operation-unit-form-code-placeholder' })}
              />
              {errors?.code && <FormFeedback>{errors?.code?.message}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="taxCode">
                <FormattedMessage id="operation-unit-form-taxCode" />
                <span className="text-danger">&nbsp;*</span>
              </Label>
              <Input
                id="taxCode"
                name="taxCode"
                autoComplete="on"
                innerRef={register()}
                invalid={!!errors.taxCode}
                valid={getValues('taxCode')?.trim() && !errors.taxCode}
                placeholder={intl.formatMessage({ id: 'operation-unit-form-taxCode-placeholder' })}
              />
              {errors?.taxCode && <FormFeedback>{errors?.taxCode?.message}</FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <FormGroup>
              <Label for="address">
                <FormattedMessage id="operation-unit-form-address" />
              </Label>
              <Input
                id="address"
                name="address"
                autoComplete="on"
                innerRef={register()}
                invalid={!!errors.address}
                valid={getValues('address')?.trim() && !errors.address}
                placeholder={intl.formatMessage({ id: 'operation-unit-form-address-placeholder' })}
              />
              {errors?.address && <FormFeedback>{errors?.address?.message}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="mobile">
                <FormattedMessage id="operation-unit-form-mobile" />
              </Label>
              <Input
                id="mobile"
                name="mobile"
                autoComplete="on"
                innerRef={register()}
                invalid={!!errors.mobile}
                valid={getValues('mobile')?.trim() && !errors.mobile}
                placeholder={intl.formatMessage({ id: 'operation-unit-form-mobile-placeholder' })}
              />
              {errors?.mobile && <FormFeedback>{errors?.mobile?.message}</FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="status">
                <FormattedMessage id="Status" />
              </Label>
              <Controller
                as={Select}
                control={control}
                isClearable={true}
                theme={selectThemeColors}
                name="status"
                id="status"
                innerRef={register()}
                options={OPERATION_UNIT_STATUS_OPTS}
                className="react-select"
                classNamePrefix="select"
                placeholder={intl.formatMessage({ id: 'Select a status' })}
                formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="d-flex justify-content-end align-items-center">
          <Button type="submit" color="primary" className="mr-1 px-3">
            {intl.formatMessage({ id: 'Save' })}
          </Button>{' '}
          <Button color="secondary" onClick={onCancel}>
            {intl.formatMessage({ id: 'Cancel' })}
          </Button>{' '}
        </Row>
      </Form>
    </>
  )
}

OperationCUForm.propTypes = {
  intl: object.isRequired,
  onSubmit: func,
  onCancel: func,
  initValues: object
}

export default injectIntl(OperationCUForm)
