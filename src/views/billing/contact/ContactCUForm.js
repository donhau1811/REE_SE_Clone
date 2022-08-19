import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REGEX, NUMBER_REGEX } from '@src/utility/constants'
import { func, object, bool } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import * as yup from 'yup'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { POSITION_OPTIONS } from '@src/utility/constants/billing'

function ContactCUForm({ contact, intl, onSubmit = () => {}, onCancel, isReadOnly, changeStateReadOnly }) {
  const [isOpen, setIsOpen] = useState(false)
  const validateSchema = yup.object().shape(
    {
      fullName: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(150, intl.formatMessage({ id: 'max-validate' })),
      email: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .matches(EMAIL_REGEX, intl.formatMessage({ id: 'Validate emmail' })),
      phone: yup
        .string()
        .matches(NUMBER_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
        .max(15, intl.formatMessage({ id: 'max-validate' })),
      note: yup.string().max(255, intl.formatMessage({ id: 'max-validate' }))
    },
    ['fullName', 'phone', 'note', 'email']
  )

  const { getValues, errors, register, control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(isReadOnly ? yup.object().shape({}) : validateSchema),
    defaultValues: contact || {}
  })

  const handleCancel = () => {
    setIsOpen((preState) => !preState)
    onCancel?.()
  }

  useEffect(() => {
    setIsOpen(Boolean(contact?.id))
    if (contact?.id) reset({ ...contact, position: POSITION_OPTIONS.find((item) => item.value === contact.position) })
  }, [contact?.id])

  const handleSubmitContact = (values) => {
    if (isReadOnly) {
      changeStateReadOnly(false)
    } else {
      const payload = {
        ...values,
        position: values.position?.value
      }
      if (contact?.id > 0) payload.isUpdate = true
      else payload.isCreate = true
      onSubmit?.(payload)
    }
  }
  return (
    <>
      <Modal isOpen={isOpen} className="modal-dialog-centered" backdrop="static">
        <ModalHeader>
          <FormattedMessage
            id={contact?.id !== '-1' ? (isReadOnly ? 'View info contact' : 'Update contact') : 'Add new contact'}
          />
        </ModalHeader>
        <ModalBody>
          <Form key="contact-from" className="billing-form">
            <Row>
              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="fullName">
                  <FormattedMessage id="Contact Name" />
                  <span className="text-danger">&nbsp;(*)</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  autoComplete="on"
                  invalid={!!errors.fullName}
                  valid={getValues('fullName')?.trim() && !errors.fullName}
                  innerRef={register()}
                  placeholder={intl.formatMessage({ id: 'Enter Contact Name' })}
                  disabled={isReadOnly}
                />
                {errors?.fullName && <FormFeedback>{errors?.fullName?.message}</FormFeedback>}
              </Col>
              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="position">
                  <FormattedMessage id="Position" />
                </Label>
                <Controller
                  as={Select}
                  control={control}
                  isClearable={true}
                  theme={selectThemeColors}
                  name="position"
                  id="position"
                  innerRef={register()}
                  options={POSITION_OPTIONS}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder={intl.formatMessage({ id: 'Choose position' })}
                  isDisabled={isReadOnly}
                  formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                />
                {errors?.position && <FormFeedback>{errors?.position?.message}</FormFeedback>}
              </Col>

              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="email">
                  Email
                  <span className="text-danger">&nbsp;(*)</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  autoComplete="on"
                  innerRef={register()}
                  invalid={!!errors.email}
                  valid={getValues('email')?.trim() && !errors.email}
                  placeholder={intl.formatMessage({ id: 'Enter email of contact' })}
                  disabled={isReadOnly}
                />
                {errors?.email && <FormFeedback>{errors?.email?.message}</FormFeedback>}
              </Col>
              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="phone">
                  <FormattedMessage id="operation-unit-form-mobile" />
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  autoComplete="on"
                  innerRef={register()}
                  invalid={!!errors.phone}
                  valid={!isReadOnly && getValues('phone')?.trim() && !errors.phone}
                  disabled={isReadOnly}
                  placeholder={intl.formatMessage({ id: 'Enter mobile' })}
                />
                {errors?.phone && <FormFeedback>{errors?.phone?.message}</FormFeedback>}
              </Col>

              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="status">
                  <FormattedMessage id="note" />
                </Label>
                <Input
                  id="note"
                  name="note"
                  autoComplete="on"
                  innerRef={register()}
                  invalid={!!errors.note}
                  valid={!isReadOnly && getValues('note')?.trim() && !errors.note}
                  type="textarea"
                  disabled={isReadOnly}
                />
                {errors?.note && <FormFeedback>{errors?.note?.message}</FormFeedback>}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center align-items-center">
                <Button onClick={handleSubmit(handleSubmitContact)} color="primary" className="mr-1 px-3">
                  {intl.formatMessage({ id: isReadOnly ? 'Update' : 'Finish' })}
                </Button>{' '}
                <Button color="secondary" onClick={handleCancel}>
                  {intl.formatMessage({ id: isReadOnly ? 'Close' : 'Cancel' })}
                </Button>{' '}
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

ContactCUForm.propTypes = {
  contact: object,
  intl: object,
  onSubmit: func,
  onCancel: func,
  isReadOnly: bool,
  changeStateReadOnly: func
}

export default injectIntl(ContactCUForm)
