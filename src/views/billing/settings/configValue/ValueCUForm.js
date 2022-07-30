import { yupResolver } from '@hookform/resolvers/yup'
import { func, object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import * as yup from 'yup'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'

function ValueCUForm({ value, intl, onSubmit = () => {}, onCancel }) {
  const CONFIG_VALUE_STATUS_OPTS = [
    { value: OPERATION_UNIT_STATUS.ACTIVE, label: intl.formatMessage({ id: 'Active' }) },
    { value: OPERATION_UNIT_STATUS.INACTIVE, label: intl.formatMessage({ id: 'Inactive' }) }
  ]
  const [isOpen, setIsOpen] = useState(false)

  const validateSchema = yup.object().shape(
    {
      value: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(225, intl.formatMessage({ id: 'max-validate' }))
    },
    ['value', 'description']
  )
  const initState = {
    state: CONFIG_VALUE_STATUS_OPTS[0]
  }
  const { getValues, errors, register, control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validateSchema),
    defaultValues: value || initState
  })
  const toggle = () => {
    setIsOpen((preState) => !preState)
    onCancel?.()
  }

  useEffect(() => {
    setIsOpen(Boolean(value?.id))
    if (value?.id) reset({ ...value, state: CONFIG_VALUE_STATUS_OPTS.find((item) => item.value === value?.state) })
  }, [value?.id])

  return (
    <>
      <Modal isOpen={isOpen} className="modal-dialog-centered" backdrop="static">
        <ModalHeader>
          <FormattedMessage id={value?.id ? 'Update new config value' : 'Add new config value'} />
        </ModalHeader>
        <ModalBody>
          <Form key="value-from">
            <Row>
              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="name">
                  <FormattedMessage id="Config Name" />
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="on"
                  disabled
                  invalid={!!errors.name}
                  valid={getValues('name')?.trim() && !errors.name}
                  innerRef={register()}
                  placeholder={intl.formatMessage({ id: 'Enter Config Name' })}
                />
                {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
              </Col>

              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="value">
                  <FormattedMessage id="Configuration Value" />
                  <span className="text-danger">&nbsp;(*)</span>
                </Label>
                <Input
                  id="value"
                  name="value"
                  autoComplete="on"
                  innerRef={register()}
                  invalid={!!errors.value}
                  valid={getValues('value')?.trim() && !errors.value}
                  placeholder={intl.formatMessage({ id: 'Enter Configuration Value' })}
                />
                {errors?.value && <FormFeedback>{errors?.value?.message}</FormFeedback>}
              </Col>
              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="Status">
                  <FormattedMessage id="Status" />
                </Label>
                <Controller
                  as={Select}
                  control={control}
                  theme={selectThemeColors}
                  name="state"
                  id="state"
                  innerRef={register()}
                  options={CONFIG_VALUE_STATUS_OPTS}
                  className="react-select"
                  classNamePrefix="select"
                  formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                />
                {errors?.state && <FormFeedback>{errors?.state?.message}</FormFeedback>}
              </Col>

              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="explain">
                  <FormattedMessage id="explain" />
                </Label>
                <Input
                  id="description"
                  name="description"
                  autoComplete="on"
                  innerRef={register()}
                  invalid={!!errors.note}
                  valid={getValues('description')?.trim() && !errors.description}
                  placeholder={intl.formatMessage({ id: 'Enter Config Explain' })}
                  type="textarea"
                />
                {errors?.description && <FormFeedback>{errors?.description?.message}</FormFeedback>}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end align-items-center">
                <Button onClick={handleSubmit(onSubmit)} color="primary" className="mr-1 px-3">
                  {intl.formatMessage({ id: 'Save' })}
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                  {intl.formatMessage({ id: 'Cancel' })}
                </Button>{' '}
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

ValueCUForm.propTypes = {
  value: object,
  intl: object,
  onSubmit: func,
  onCancel: func
}

export default injectIntl(ValueCUForm)
