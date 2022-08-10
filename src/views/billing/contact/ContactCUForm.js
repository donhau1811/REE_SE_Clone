import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REGEX, NUMBER_REGEX } from '@src/utility/constants'
import { func, object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import * as yup from 'yup'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { POSITION_OPTIONS } from '@src/utility/constants/billing'

function ContactCUForm({ contact, intl, onSubmit = () => {}, onCancel }) {
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
    resolver: yupResolver(validateSchema),
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
    const payload = {
      ...values,
      position: values.position?.value
    }
    if (contact?.id > 0) payload.isUpdate = true
    else payload.isCreate = true
    onSubmit?.(payload)
  }

  return (
    <>
      <Modal isOpen={isOpen} className="modal-dialog-centered" backdrop="static">
        <ModalHeader>
          <FormattedMessage id={contact?.id ? 'Update contact' : 'Add new contact'} />
        </ModalHeader>
        <ModalBody>
          <Form key="contact-from">
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
                  valid={getValues('phone')?.trim() && !errors.phone}
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
                  valid={getValues('address')?.trim() && !errors.note}
                  type="textarea"
                />
                {errors?.note && <FormFeedback>{errors?.note?.message}</FormFeedback>}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end align-items-center">
                <Button onClick={handleSubmit(handleSubmitContact)} color="primary" className="mr-1 px-3">
                  {intl.formatMessage({ id: 'Finish' })}
                </Button>{' '}
                <Button color="secondary" onClick={handleCancel}>
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

ContactCUForm.propTypes = {
  contact: object,
  intl: object,
  onSubmit: func,
  onCancel: func
}

export default injectIntl(ContactCUForm)
