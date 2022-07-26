import React, { useState, useEffect } from 'react'
import {
  FormFeedback,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Col,
  Row,
  Form
} from 'reactstrap'
import { object, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import { EMAIL_REGEX } from '@src/utility/constants'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import * as yup from 'yup'
import { selectThemeColors } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { positionMockData } from '../../customer/mock-data'

const InsertInformation = ({ contact, intl, onSubmit = () => {}, onCancel }) => {
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
        .matches(EMAIL_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
    },
    ['name', 'position', 'phone', 'email', 'note']
  )

  const { handleSubmit, getValues, errors, control, register, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ValidateSchema),
    defaultValues: contact || {}
  })

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const handleCancel = () => {
    setIsOpen(false)
    onCancel?.()
  }

  useEffect(() => {
    setIsOpen(Boolean(contact?.id))
    if (contact?.id) reset(contact)
  }, [contact?.id])

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} zIndex={500} aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader>{intl.formatMessage({ id: 'Update contact' })}</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col className="mb-2" md={12}>
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'represent' })} <span className="hightlight-label">&nbsp; (*)</span>
                </Label>

                <Input
                  id="name"
                  name="name"
                  autoComplete="on"
                  invalid={!!errors.name}
                  valid={getValues('name')?.trim() && !errors.name}
                  innerRef={register()}
                  placeholder={intl.formatMessage({ id: 'Enter-name-represent' })}
                />
                {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
              </Col>
              <Col className="mb-2" md={12}>
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'position' })}
                </Label>

                <Controller
                  as={Select}
                  control={control}
                  theme={selectThemeColors}
                  name="position"
                  id="position"
                  innerRef={register()}
                  options={positionMockData}
                  className="react-select input"
                  classNamePrefix="select"
                  placeholder={intl.formatMessage({ id: 'Enter-position-represent' })}
                  formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                />
              </Col>
              <Col className="mb-2" md={12}>
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'Email' })} <span className="hightlight-label">&nbsp; (*)</span>
                </Label>
                <Input
                  className="input"
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="on"
                  innerRef={register()}
                  invalid={!!errors.email}
                  valid={getValues('email')?.trim() && !errors.email}
                  placeholder={intl.formatMessage({ id: 'Enter-unit-email' })}
                />
                {errors?.email && <FormFeedback>{errors?.email?.message}</FormFeedback>}
              </Col>
              <Col className="mb-2" md={12}>
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'Phone' })}
                </Label>

                <Input
                  className="input"
                  id="phone"
                  name="phone"
                  autoComplete="on"
                  innerRef={register()}
                  placeholder={intl.formatMessage({ id: 'Enter-unit-email' })}
                />
              </Col>
              <Col className="mb-2" md={12}>
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'Note' })}
                </Label>
                <Input
                  className="textarea"
                  placeholder={intl.formatMessage({ id: 'Enter-unit-note' })}
                  id="note"
                  type="textarea"
                  name="note"
                  autoComplete="on"
                  innerRef={register()}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-end align-items-center mt-3">
              <Button type="button" color="primary" className="mr-1 px-3" onClick={handleSubmit(onSubmit)}>
                {intl.formatMessage({ id: 'Save' })}
              </Button>
              <Button onClick={handleCancel} color="secondary">
                {intl.formatMessage({ id: 'Cancel' })}
              </Button>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  )
}
InsertInformation.propTypes = {
  onSubmit: func,
  intl: object.isRequired,
  initValues: object,
  contact: object,
  onCancel: func
}

export default injectIntl(InsertInformation)
