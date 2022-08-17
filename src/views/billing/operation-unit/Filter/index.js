import React, { useState, cloneElement } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Col, Row } from 'reactstrap'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'

import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { object, func } from 'prop-types'
import { ReactComponent as Carlendar } from '@src/assets/images/svg/carlendar.svg'
import './style.scss'
import { DISPLAY_DATE_FORMAT } from '@src/utility/constants'
import { injectIntl } from 'react-intl'
import moment from 'moment'

const Filter = ({ intl, children, onSubmit = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [status, setStatus] = useState('')
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue)
  }

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue)
  }

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const handleSubmitFilterForm = () => {
    const payload = {}
    if (startDate && endDate) {
      payload.modifyDate = {
        value: {
          start: moment(startDate),
          end: moment(endDate)
        },
        type: 'dateRange'
      }
    }
    payload.state = {
      value: status,
      type: 'exact'
    }

    onSubmit?.(payload)
    toggle()
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} zIndex={500} aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader>{intl.formatMessage({ id: 'Filter operation  company' })}</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <Label className="general-label" for="address">
                {intl.formatMessage({ id: 'Status' })}
              </Label>
              <Input value={status} onChange={handleStatusChange} type="select" name="select" id="exampleSelect">
                <option value="">{intl.formatMessage({ id: 'AllStatus' })}</option>
                <option value={OPERATION_UNIT_STATUS.ACTIVE}>{intl.formatMessage({ id: 'Active' })}</option>
                <option value={OPERATION_UNIT_STATUS.INACTIVE}>{intl.formatMessage({ id: 'Inactive' })}</option>
              </Input>
            </Col>
            <Col md={12} className="mt-3">
              <Label className="general-label" for="exampleSelect">
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
                      inputFormat={DISPLAY_DATE_FORMAT}
                      value={startDate}
                      onChange={handleStartDateChange}
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
                      value={endDate}
                      onChange={handleEndDateChange}
                      renderInput={(params) => <TextField className="border border-secondary rounded" {...params} />}
                      inputVariant="outlined"
                    />
                  </Col>
                </Row>
              </LocalizationProvider>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmitFilterForm}>
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
