import { yupResolver } from '@hookform/resolvers/yup'
import { API_GET_BILLING_SETTING_VALUE_BY_SETTING_ID } from '@src/utility/constants'
import { func, object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import * as yup from 'yup'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import axios from 'axios'

function ContactCUForm({ clock, intl, onSubmit = () => {}, onCancel }) {
  const [isOpen, setIsOpen] = useState(false)
  const [typesOfClock, setTypesOfClock] = useState([])
  const [manufacturerList, setManufacturerList] = useState([])

  useEffect(async () => {
    const [clockTypesRes, manufacturerListRes] = await Promise.all([
      axios.get(`${API_GET_BILLING_SETTING_VALUE_BY_SETTING_ID}/6`),
      axios.get(`${API_GET_BILLING_SETTING_VALUE_BY_SETTING_ID}/7`)
    ])

    if (clockTypesRes.status === 200 && clockTypesRes.data.data) {
      setTypesOfClock(
        (clockTypesRes.data.data || []).map((item) => ({
          value: item.value,
          label: item.value
        }))
      )
    }
    if (manufacturerListRes.status === 200 && manufacturerListRes.data.data) {
      setManufacturerList(
        (manufacturerListRes.data.data || []).map((item) => ({
          value: item.value,
          label: item.value
        }))
      )
    }
  }, [])

  const validateSchema = yup.object().shape({
    name: yup
      .string()
      .required(intl.formatMessage({ id: 'required-validate' }))
      .max(100, intl.formatMessage({ id: 'max-validate' })),
    serialNumber: yup
      .string()
      .required(intl.formatMessage({ id: 'required-validate' }))
      .max(50, intl.formatMessage({ id: 'max-validate' })),
    typeOfClock: yup.object().required(intl.formatMessage({ id: 'required-validate' }))
  })

  const { getValues, errors, register, control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validateSchema),
    defaultValues: clock || {}
  })

  const handleCancel = () => {
    setIsOpen((preState) => !preState)
    onCancel?.()
  }

  useEffect(() => {
    setIsOpen(Boolean(clock?.id))
    if (clock?.id) {
      reset({
        ...clock,
        manufacturer: (manufacturerList || []).find((item) => item.value === clock?.manufacturer),
        typeOfClock: (typesOfClock || []).find((item) => item.value === clock?.typeOfClock)
      })
    }
  }, [clock?.id, typesOfClock, manufacturerList])

  const handleSubmitContact = (values) => {
    const payload = {
      ...values,
      manufacturer: values.manufacturer?.value,
      typeOfClock: values.typeOfClock?.value
    }
    if (clock?.id > 0) payload.isUpdate = true
    else payload.isCreate = true
    onSubmit?.(payload)
  }

  return (
    <>
      <Modal isOpen={isOpen} className="modal-dialog-centered" backdrop="static">
        <ModalHeader>
          <FormattedMessage id={clock?.id > 0 ? 'Update clock' : 'Add new clock'} />
        </ModalHeader>
        <ModalBody>
          <Form key="clock-from">
            <Row>
              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="name">
                  <FormattedMessage id="Device name" />
                  <span className="text-danger">&nbsp;(*)</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="on"
                  invalid={!!errors.name}
                  valid={getValues('name')?.trim() && !errors.name}
                  innerRef={register()}
                  placeholder={intl.formatMessage({ id: 'Enter device name' })}
                />
                {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
              </Col>
              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="serialNumber">
                  Seri
                  <span className="text-danger">&nbsp;(*)</span>
                </Label>
                <Input
                  id="serialNumber"
                  name="serialNumber"
                  autoComplete="on"
                  invalid={!!errors.serialNumber}
                  valid={getValues('serialNumber')?.trim() && !errors.serialNumber}
                  innerRef={register()}
                  placeholder={intl.formatMessage({ id: 'Enter serial number' })}
                />
                {errors?.serialNumber && <FormFeedback>{errors?.serialNumber?.message}</FormFeedback>}
              </Col>

              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="typeOfClock">
                  <FormattedMessage id="Type of clock" />
                  <span className="text-danger">&nbsp;(*)</span>
                </Label>
                <Controller
                  as={Select}
                  control={control}
                  isClearable={true}
                  theme={selectThemeColors}
                  name="typeOfClock"
                  id="typeOfClock"
                  innerRef={register()}
                  options={typesOfClock}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder={intl.formatMessage({ id: 'Choose type of clock' })}
                  formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                />
                {errors?.typeOfClock && <FormFeedback className="d-block">{errors?.typeOfClock?.message}</FormFeedback>}
              </Col>
              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="phone">
                  <FormattedMessage id="Manufacturer" />
                </Label>
                <Controller
                  as={Select}
                  control={control}
                  isClearable={true}
                  theme={selectThemeColors}
                  name="manufacturer"
                  id="manufacturer"
                  innerRef={register()}
                  options={manufacturerList}
                  className="react-select"
                  classNamePrefix="select"
                  placeholder={intl.formatMessage({ id: 'Choose manufacturer' })}
                  formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                />
                {errors?.manufacturer && (
                  <FormFeedback className="d-block">{errors?.manufacturer?.message}</FormFeedback>
                )}
              </Col>

              <Col className="mb-2" xs={12}>
                <Label className="general-label" for="status">
                  <FormattedMessage id="Inspection valid until" />
                </Label>
                <Input
                  id="qualityVerifyDate"
                  name="qualityVerifyDate"
                  autoComplete="on"
                  innerRef={register()}
                  invalid={!!errors.qualityVerifyDate}
                  valid={getValues('qualityVerifyDate')?.trim() && !errors.qualityVerifyDate}
                  type="date"
                  className="custom-icon-input-date"
                />
                {errors?.qualityVerifyDate && <FormFeedback>{errors?.qualityVerifyDate?.message}</FormFeedback>}
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
  clock: object,
  intl: object,
  onSubmit: func,
  onCancel: func
}

export default injectIntl(ContactCUForm)
