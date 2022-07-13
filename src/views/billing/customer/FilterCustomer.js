import React, { useState, cloneElement } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Col, Row } from 'reactstrap'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { object, func } from 'prop-types'
import { ReactComponent as Carlendar } from '@src/assets/images/svg/carlendar.svg'
import './scss/Filter.scss'
import { DISPLAY_DATE_FORMAT_CALENDAR } from '@src/utility/constants'
import { injectIntl } from 'react-intl'

const intitValue = {
  customerType: '',
  status: '',
  fromCreatedDate: new Date(),
  toCreatedDate: new Date(),
  fromModifyDate: new Date(),
  toModifyDate: new Date()
}

const FilterCustomer = ({ intl, children, onSubmit = () => {} }) => {
  const [formData, setFormData] = useState(intitValue)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const handleChange = (type) => (e) => {
    let value
    if (e.target) value = e.target.value
    else {
      value = new Date(e)
    }

    setFormData((prevState) => ({
      ...prevState,
      [type]: value
    }))
     
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} zIndex={500} aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader toggle={toggle}>{intl.formatMessage({ id: 'FIlterCustomer' })}</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <Label className="text-bold" for="exampleSelect">
                {intl.formatMessage({ id: 'Company-Types' })}
              </Label>

              <Input
                className="filter-input"
                value={formData.customerType}
                onChange={handleChange('customerType')}
                type="select"
                name="customerType"
                id="exampleSelect"
              >
                <option>{intl.formatMessage({ id: 'All-customer' })}</option>
                <option>{intl.formatMessage({ id: 'Active' })}</option>
                <option>{intl.formatMessage({ id: 'Inactive' })}</option>
              </Input>
            </Col>
            <Col md={12}>
              <Label className="text-bold" for="exampleSelect">
                {intl.formatMessage({ id: 'Status' })}
              </Label>

              <Input
                className="filter-input"
                value={formData.status}
                onChange={handleChange('status')}
                type="select"
                name="status"
                id="exampleSelect"
              >
                <option>{intl.formatMessage({ id: 'AllStatus' })}</option>
                <option>{intl.formatMessage({ id: 'Active' })}</option>
                <option>{intl.formatMessage({ id: 'Inactive' })}</option>
              </Input>
            </Col>
            <Col md={12} className="mt-3">
              <Label className="text-bold" for="exampleSelect">
                {intl.formatMessage({ id: 'CreatedDate' })}
              </Label>

              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Row>
                  <Col md={6}>
                    <DesktopDatePicker
                      components={{
                        OpenPickerIcon: Carlendar
                      }}
                      inputVariant="outlined"
                      label=""
                      name="fromCreatedDate"
                      inputFormat={DISPLAY_DATE_FORMAT_CALENDAR}
                      value={formData.fromCreatedDate}
                      onChange={handleChange('fromCreatedDate')}
                      renderInput={(params) => (
                        <TextField className="border border-secondary rounded filter-input" {...params} />
                      )}
                    />
                  </Col>

                  <Col md={6}>
                    <DesktopDatePicker
                      components={{
                        OpenPickerIcon: Carlendar
                      }}
                      label=""
                      inputFormat={DISPLAY_DATE_FORMAT_CALENDAR}
                      value={formData.toCreatedDate}
                      name="toCreatedDate"
                      onChange={handleChange('toCreatedDate')}
                      renderInput={(params) => (
                        <TextField className="border border-secondary rounded filter-input" {...params} />
                      )}
                      inputVariant="outlined"
                    />
                  </Col>
                </Row>
                <Label className="text-bold" for="exampleSelect">
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
                      inputFormat={DISPLAY_DATE_FORMAT_CALENDAR}
                      value={formData.fromModifyDate}
                      onChange={handleChange('fromModifyDate')}
                      renderInput={(params) => (
                        <TextField className="border border-secondary rounded filter-input" {...params} />
                      )}
                    />
                  </Col>

                  <Col md={6}>
                    <DesktopDatePicker
                      components={{
                        OpenPickerIcon: Carlendar
                      }}
                      label=""
                      inputFormat={DISPLAY_DATE_FORMAT_CALENDAR}
                      value={formData.toModifyDate}
                      onChange={handleChange('toModifyDate')}
                      renderInput={(params) => (
                        <TextField className="border border-secondary rounded filter-input" {...params} />
                      )}
                      inputVariant="outlined"
                    />
                  </Col>
                </Row>
              </LocalizationProvider>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>
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
