import { bool, func, object, string } from 'prop-types'
import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import { selectThemeColors } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CHECK_DUPLICATE_OPRERATION_UNIT_CODE, MOBILE_REGEX } from '@src/utility/constants'
import { debounce } from 'lodash'
import axios from 'axios'

const OperationCUForm = ({ intl, onSubmit = () => {}, onCancel = () => {}, initValues, isReadOnly, submitText }) => {
  const OPERATION_UNIT_STATUS_OPTS = [
    { value: OPERATION_UNIT_STATUS.ACTIVE, label: intl.formatMessage({ id: 'Active' }) },
    { value: OPERATION_UNIT_STATUS.INACTIVE, label: intl.formatMessage({ id: 'Inactive' }) }
  ]
  const initState = {
    state: OPERATION_UNIT_STATUS_OPTS[0]
  }

  const validationFunction = async (params, resolve) => {
    try {
      const response = await axios.post(CHECK_DUPLICATE_OPRERATION_UNIT_CODE, { ...params, isNotCount: true })

      resolve(!(response.status === 200 && response.data.data))
    } catch (error) {
      resolve(false)
    }
  }

  const validationDebounced = debounce(validationFunction, 500)

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
        .test('dubplicated', intl.formatMessage({ id: 'dubplicated-validate' }), (value) => {
          if (!value?.trim()) return false

          const checkParams = {
            code: value
          }
          console.log('initValues', initValues?.id)
          if (initValues?.id > 0) checkParams.id = initValues?.id
          return new Promise((resolve) => validationDebounced(checkParams, resolve))
        }),

      taxCode: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(20, intl.formatMessage({ id: 'max-validate' })),

      address: yup.string().max(255, intl.formatMessage({ id: 'max-validate' })),
      phone: yup
        .string()
        .matches(MOBILE_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
        .max(15, intl.formatMessage({ id: 'max-validate' }))
    },
    ['name', 'code', 'taxCode', 'address', 'phone']
  )

  const { handleSubmit, getValues, errors, control, register, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(isReadOnly ? yup.object().shape({}) : ValidateSchema),
    defaultValues: initValues || initState
  })

  useEffect(() => {
    reset({ ...initValues, state: OPERATION_UNIT_STATUS_OPTS.find((item) => item.value === initValues?.state) })
  }, [initValues])

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="name">
              <FormattedMessage id="operation-unit-form-name" />
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
              placeholder={intl.formatMessage({ id: 'operation-unit-form-name-placeholder' })}
            />
            {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="code">
              <FormattedMessage id="operation-unit-form-code" />
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
              placeholder={intl.formatMessage({ id: 'operation-unit-form-code-placeholder' })}
            />
            {errors?.code && <FormFeedback>{errors?.code?.message}</FormFeedback>}
          </Col>
          <Col md={4}>
            <Label className="general-label" for="taxCode">
              <FormattedMessage id="operation-unit-form-taxCode" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="taxCode"
              name="taxCode"
              autoComplete="on"
              innerRef={register()}
              disabled={isReadOnly}
              invalid={!!errors.taxCode}
              valid={getValues('taxCode')?.trim() && !errors.taxCode}
              placeholder={intl.formatMessage({ id: 'operation-unit-form-taxCode-placeholder' })}
            />
            {errors?.taxCode && <FormFeedback>{errors?.taxCode?.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col className="mb-2" md={8}>
            <Label className="general-label" for="address">
              <FormattedMessage id="operation-unit-form-address" />
            </Label>
            <Input
              id="address"
              name="address"
              autoComplete="on"
              innerRef={register()}
              disabled={isReadOnly}
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
              disabled={isReadOnly}
              innerRef={register()}
              invalid={!!errors.phone}
              valid={getValues('phone')?.trim() && !errors.phone}
              placeholder={intl.formatMessage({ id: 'operation-unit-form-mobile-placeholder' })}
            />
            {errors?.phone && <FormFeedback>{errors?.phone?.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="status">
              <FormattedMessage id="Status" />
            </Label>
            <Controller
              as={Select}
              control={control}
              theme={selectThemeColors}
              name="state"
              id="state"
              isDisabled={isReadOnly}
              innerRef={register()}
              options={OPERATION_UNIT_STATUS_OPTS}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select a status' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />
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

OperationCUForm.propTypes = {
  intl: object.isRequired,
  onSubmit: func,
  onCancel: func,
  initValues: object,
  isReadOnly: bool,
  submitText: string
}

export default injectIntl(OperationCUForm)
