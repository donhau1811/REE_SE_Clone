import React, { useState, cloneElement } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Col, Row } from 'reactstrap'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { object, func } from 'prop-types'
import { ReactComponent as Carlendar } from '@src/assets/images/svg/carlendar.svg'
import './style.scss'
import { DISPLAY_DATE_FORMAT } from '@src/utility/constants'
import { injectIntl } from 'react-intl'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS, GENERAL_CUSTOMER_TYPE } from '@src/utility/constants/billing'
import moment from 'moment'

const intitValue = {
  type: 'all',
  state: 'all',
  fromCreatedDate: new Date(),
  toCreatedDate:  new Date(),
  fromModifyDate:  new Date(),
  toModifyDate:  new Date()
}

const FilterCustomer = ({ intl, children, onSubmit = () => {} }) => {
  const [formData, setFormData] = useState(intitValue)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const handleChange = (type) => (e) => {
    let value
    if (e?.target) value = e?.target?.value
    else {
      value = moment(e)
    }

    setFormData((prevState) => ({
      ...prevState,
      [type]: value
    }))
  }

  const handleSubmit = () => {
    const { state, type, fromCreatedDate, toCreatedDate, fromModifyDate, toModifyDate } = formData
    const payload = {}
    if (state !== 'all') {
      payload.state = {
        value: state,
        type: 'exact'
      }
    }
    if (type !== 'all') {
      payload.type = {
        value: type,
        type: 'exact'
      }
    }

    if (fromCreatedDate || toCreatedDate) {

      payload.createDate = {
        value: {
          start: formData.fromCreatedDate ? moment(formData.fromCreatedDate).utc() : null,
          end: formData.toCreatedDate ? moment(formData.toCreatedDate).utc() : null
        },
        type: 'dateRange'
      }
    }
    if (fromModifyDate || toModifyDate) {
      payload.modifyDate = {
        value: {
          start: formData.fromModifyDate ? moment(formData.fromModifyDate).utc() : null,
          end: formData.toModifyDate ? moment(formData.toModifyDate).utc() : null
        },
        type: 'dateRange'
      }
    }
    onSubmit?.(payload)
    toggle()
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} zIndex={500} aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader>{intl.formatMessage({ id: 'FIlterCustomer' })}</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12} className="mb-2">
              <Label className="general-label" for="exampleSelect">
                {intl.formatMessage({ id: 'Company-Types' })}
              </Label>

              <Input value={formData.type} onChange={handleChange('type')} type="select" name="type" id="exampleSelect">
                <option value="all">{intl.formatMessage({ id: 'All-customer' })}</option>
                {GENERAL_CUSTOMER_TYPE.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </Input>
            </Col>
            <Col md={12} className="mb-2">
              <Label className="general-label" for="exampleSelect">
                {intl.formatMessage({ id: 'Status' })}
              </Label>

              <Input
                value={formData.state}
                onChange={handleChange('state')}
                type="select"
                name="state"
                id="exampleSelect"
              >
                <option value="all">{intl.formatMessage({ id: 'AllStatus' })}</option>
                <option value={OPERATION_UNIT_STATUS.ACTIVE}>{intl.formatMessage({ id: 'Active' })}</option>
                <option value={OPERATION_UNIT_STATUS.INACTIVE}>{intl.formatMessage({ id: 'Inactive' })}</option>
              </Input>
            </Col>
            <Col md={12}>
              <Label className="general-label" for="exampleSelect">
                {intl.formatMessage({ id: 'CreatedDate' })}
              </Label>

              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Row className="mb-2">
                  <Col md={6}>
                    <DesktopDatePicker
                      components={{
                        OpenPickerIcon: Carlendar
                      }}
                      inputVariant="outlined"
                      label=""
                      name="fromCreatedDate"
                      inputFormat={DISPLAY_DATE_FORMAT}
                      value={formData.fromCreatedDate}
                      onChange={handleChange('fromCreatedDate')}
                      renderInput={(params) => <TextField className="border border-secondary rounded " {...params} />}
                    />
                  </Col>

                  <Col md={6}>
                    <DesktopDatePicker
                      components={{
                        OpenPickerIcon: Carlendar
                      }}
                      label=""
                      inputFormat={DISPLAY_DATE_FORMAT}
                      value={formData.toCreatedDate}
                      name="toCreatedDate"
                      onChange={handleChange('toCreatedDate')}
                      renderInput={(params) => <TextField className="border border-secondary rounded " {...params} />}
                      inputVariant="outlined"
                    />
                  </Col>
                </Row>
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'ModifyDate' })}
                </Label>
                <Row>
                  <Col md={6}>
                    <DesktopDatePicker
                      components={{
                        OpenPickerIcon: Carlendar
                      }}
                      inputVariant="outlined"
                      label=""
                      inputFormat={DISPLAY_DATE_FORMAT}
                      value={formData.fromModifyDate}
                      onChange={handleChange('fromModifyDate')}
                      renderInput={(params) => <TextField className="border border-secondary rounded " {...params} />}
                    />
                  </Col>

                  <Col md={6}>
                    <DesktopDatePicker
                      components={{
                        OpenPickerIcon: Carlendar
                      }}
                      label=""
                      inputFormat={DISPLAY_DATE_FORMAT}
                      value={formData.toModifyDate}
                      onChange={handleChange('toModifyDate')}
                      renderInput={(params) => <TextField className="border border-secondary rounded " {...params} />}
                      inputVariant="outlined"
                    />
                  </Col>
                </Row>
              </LocalizationProvider>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            {intl.formatMessage({ id: 'Finish' })}
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            {intl.formatMessage({ id: 'Cancel' })}
          </Button>
        </ModalFooter>
      </Modal>
      {cloneElement(children, { onClick: toggle })}
    </>
  )
}
FilterCustomer.propTypes = {
  children: object,
  onSubmit: func,
  intl: object.isRequired
}

export default injectIntl(FilterCustomer)
