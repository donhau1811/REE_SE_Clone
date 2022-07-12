import React, { useState, cloneElement } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Col, Row } from 'reactstrap'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { object } from 'prop-types'
import  { ReactComponent as carlendar }  from '@src/assets/images/svg/carlendar.svg'

const Fillter = ({ children }) => {
  const [modalStatus, setModalStatus] = useState(false)
  const [startDate, setstartDate] = useState()
  const [endDate, setendDate] = useState()

  const handleStartDateChange = (newValue) => {
    setstartDate(newValue)
  }

  const handleEndDateChange = (newValue) => {
    setendDate(newValue)
  }

  const toggle = () => {
    setModalStatus(!modalStatus)
  }

  return (
    <>
      <Modal
        isOpen={modalStatus}
        toggle={toggle}
        zIndex={500}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={toggle}>Lọc Thông Tin Công Ty Vận Hành</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <Label style={{ fontWeight: 'bold', color:'#000000' }} for="exampleSelect">
                Trạng thái
              </Label>

              <Input type="select" name="select" id="exampleSelect">
                <option>Tất cả trạng thái</option>
                <option>Hoàn thành</option>
                <option>Chưa hoàn </option>
              </Input>
            </Col>
            <Col md={12} className="mt-3">
              <Label style={{ fontWeight: 'bold', color:'#000000' }} for="exampleSelect">
                Ngày cập nhật
              </Label>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Row>
                  <Col md={6}>
                    <DesktopDatePicker
                       components={{
                        OpenPickerIcon: carlendar
                      }}
                      inputVariant="outlined"
                      label=""
                      inputFormat="MM/dd/yyyy"
                      value={startDate}
                      onChange={handleStartDateChange}
                      renderInput={(params) => (
                        <TextField
                          style={{ border: '1px solid rgba(0, 0, 0, 0.25)', borderRadius: '3px' }}
                          {...params}
                        />
                      )}
                    />
                  </Col>

                  <Col md={6}>
                    <DesktopDatePicker
                      components={{
                        OpenPickerIcon: carlendar
                      }}
                      label=""
                      inputFormat="MM/dd/yyyy"
                      value={endDate}
                      onChange={handleEndDateChange}
                      renderInput={(params) => (
                        <TextField
                          style={{ border: '1px solid rgba(0, 0, 0, 0.25)', borderRadius: '3px' }}
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
          <Button color="primary" onClick={toggle}>
            Hoàn tất
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Hủy bỏ
          </Button>
        </ModalFooter>
      </Modal>
      {cloneElement(children, { onClick: toggle })}
    </>
  )
}
Fillter.propTypes = {
  children: object
}

export default Fillter
