import React, { useState, cloneElement } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Col, Row } from 'reactstrap'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { object, func } from 'prop-types'
import  { ReactComponent as Carlendar }  from '@src/assets/images/svg/carlendar.svg'
import './scss/Filter.scss'
import { DISPLAY_DATE_FORMAT_CALENDAR } from '@src/utility/constants'
import {  injectIntl } from 'react-intl'

const Filter = ({intl, children, onSubmit = () => {} }) => {

  
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setstartDate] = useState()
  const [endDate, setendDate] = useState()
  const [status, setStatus] = useState()
  const handleStartDateChange = (newValue) => {
    setstartDate(newValue)
  }

  const handleEndDateChange = (newValue) => {
    setendDate(newValue)
  }

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const handleStatusChange = (e) => {

    setStatus(e.target.value)
  }

  
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        zIndex={500}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader  toggle={toggle}>{intl.formatMessage({ id: 'OperatingCompany' })}</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <Label className="text-bold" for="exampleSelect">
              {intl.formatMessage({ id: 'Status' })}
              </Label>

              <Input className='filter-input' value={status} onChange={handleStatusChange} type="select" name="select" id="exampleSelect">
                <option>{intl.formatMessage({ id: 'AllStatus' })}</option>
                <option>{intl.formatMessage({ id: 'Active' })}</option>
                <option>{intl.formatMessage({ id: 'Inactive' })}</option>
              </Input>
            </Col>
            <Col md={12} className="mt-3">
              <Label className='text-bold' for="exampleSelect">
              {intl.formatMessage({ id: 'UpdateDate' })}
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
                      inputFormat={DISPLAY_DATE_FORMAT_CALENDAR}
                      value={startDate}
                      onChange={handleStartDateChange}
                      renderInput={(params) => (
                        <TextField
                        className='border border-secondary rounded filter-input'
                          {...params}
                        />
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
                      value={endDate}
                      onChange={handleEndDateChange}
                      renderInput={(params) => (
                        <TextField
                        className='border border-secondary rounded filter-input'
                          {...params}
                        />
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
Filter.propTypes = {
  children: object,
  onSubmit: func,
  intl: object.isRequired


}

export default injectIntl(Filter)
