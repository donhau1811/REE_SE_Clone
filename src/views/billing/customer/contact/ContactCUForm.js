import { yupResolver } from '@hookform/resolvers/yup'
import { EMAIL_REGEX, MOBILE_REGEX } from '@src/utility/constants'
import { func, object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import * as yup from 'yup'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { positionMockData } from '../mock-data'


function ContactCUForm({ contact, intl, onSubmit = () => {} }) {
  const [isOpen, setIsOpen] = useState(false)
  const ValidateSchema = yup.object().shape(
    {
      name: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(150, intl.formatMessage({ id: 'max-validate' })),
      email: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .matches(EMAIL_REGEX, intl.formatMessage({ id: 'Validate emmail' })),
      mobile: yup
        .string()
        .matches(MOBILE_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
        .max(15, intl.formatMessage({ id: 'max-validate' })),
      note: yup.string().max(255, intl.formatMessage({ id: 'max-validate' }))
    },
    ['name', 'mobile', 'note', 'email']
  )

  const { getValues, errors, register, control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ValidateSchema),
    defaultValues: contact || {}
  })

  const toggle = () => {
    setIsOpen((preState) => !preState)
  }

  useEffect(() => {
    setIsOpen(Boolean(contact?.id))
    if (contact?.id) reset(contact)
  }, [contact?.id])

  return (
    <>
      <Modal isOpen={isOpen} className="modal-dialog-centered" backdrop="static">
        <ModalHeader toggle={toggle}>
          <FormattedMessage id={contact?.id ? 'Update contact' : 'Add new contact'} />
        </ModalHeader>
        <ModalBody>
          <Form key="contact-from">
            <Row>
              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="name">
                  <FormattedMessage id="Contact Name" />
                  <span className="text-danger">&nbsp;(*)</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="on"
                  invalid={!!errors.name}
                  valid={getValues('name')?.trim() && !errors.name}
                  innerRef={register()}
                  placeholder={intl.formatMessage({ id: 'Enter Contact Name' })}
                />
                {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
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
                  options={positionMockData}
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
                <Label className="general-label" for="mobile">
                  <FormattedMessage id="operation-unit-form-mobile" />
                </Label>
                <Input
                  id="mobile"
                  name="mobile"
                  autoComplete="on"
                  innerRef={register()}
                  invalid={!!errors.mobile}
                  valid={getValues('mobile')?.trim() && !errors.mobile}
                  placeholder={intl.formatMessage({ id: 'Enter mobile' })}
                />
                {errors?.mobile && <FormFeedback>{errors?.mobile?.message}</FormFeedback>}
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

ContactCUForm.propTypes = {
  contact: object,
  intl: object,
  onSubmit: func
}

export default injectIntl(ContactCUForm)
