import { yupResolver } from '@hookform/resolvers/yup'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import { selectThemeColors } from '@src/utility/Utils'
import { bool, func, object } from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import Select from 'react-select'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import * as yup from 'yup'

const SettingsCUForm = ({ isViewed, intl, onSubmit = () => {}, onCancel = () => {}, initValues }) => {
  const OPERATION_UNIT_STATUS_OPTS = [
    { value: OPERATION_UNIT_STATUS.INACTIVE, label: intl.formatMessage({ id: 'Active' }) },
    { value: OPERATION_UNIT_STATUS.ACTIVE, label: intl.formatMessage({ id: 'Inactive' }) }
  ]
  const initState = {
    state: OPERATION_UNIT_STATUS_OPTS[0]
  }
  console.log(initState)
  console.log(initValues)
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

      explain: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(255, intl.formatMessage({ id: 'max-validate' }))
    },
    ['name', 'code', 'explain']
  )

  const { handleSubmit, getValues, errors, control, register } = useForm({
    mode: 'onChange',
    resolver: yupResolver(isViewed ? yup.object().shape({}) : ValidateSchema),
    defaultValues: initValues || initState
  })

  return (
    <>
      <Form key="customer-form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="code">
              <FormattedMessage id="Config Code" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              disabled={isViewed}
              id="code"
              name="code"
              autoComplete="on"
              innerRef={register()}
              invalid={!!errors.code}
              valid={getValues('code')?.trim() && !errors.code}
              placeholder={intl.formatMessage({ id: 'Enter Config Code' })}
            />
            {errors?.code && <FormFeedback>{errors?.code?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={4}>
            <Label className="general-label" for="name">
              <FormattedMessage id="Config Name" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              disabled={isViewed}
              id="name"
              name="name"
              autoComplete="on"
              invalid={!!errors.name}
              valid={getValues('name')?.trim() && !errors.name}
              innerRef={register()}
              placeholder={intl.formatMessage({ id: 'Enter Config Name' })}
            />
            {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
          </Col>
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
              options={OPERATION_UNIT_STATUS_OPTS}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select a status' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-2" md={8}>
            <Label className="general-label" for="address">
              <FormattedMessage id="explain" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              disabled={isViewed}
              id="explain"
              name="explain"
              autoComplete="on"
              innerRef={register()}
              invalid={!!errors.explain}
              valid={getValues('explain')?.trim() && !errors.explain}
              placeholder={intl.formatMessage({ id: 'Enter Config Explain' })}
            />
            {errors?.explain && <FormFeedback>{errors?.explain?.message}</FormFeedback>}
          </Col>
        </Row>
        <Row></Row>
        <Row className="d-flex justify-content-end align-items-center">
          <Button type="submit" color="primary" className="mr-1 px-3">
            {intl.formatMessage({ id: isViewed ? 'Update' : 'Save' })}
          </Button>{' '}
          <Button color="secondary" onClick={onCancel}>
            {intl.formatMessage({ id: 'Cancel' })}
          </Button>{' '}
        </Row>
      </Form>
    </>
  )
}

SettingsCUForm.propTypes = {
  intl: object.isRequired,
  onSubmit: func,
  onCancel: func,
  initValues: object,
  isViewed: bool
}

export default injectIntl(SettingsCUForm)
