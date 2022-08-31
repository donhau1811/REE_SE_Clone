import React, { useState, cloneElement, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Col, Row, Form } from 'reactstrap'
import { GENERAL_STATUS_OPTIS, mockUser } from '@src/utility/constants/billing'
import { useForm, Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { object, func } from 'prop-types'
import './style.scss'
import { injectIntl } from 'react-intl'
import { selectThemeColors } from '@src/utility/Utils'
import Select from 'react-select'
import { getAllRoofVendor } from '../../roof-rental-unit/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomer } from '../../customer/store/actions'

// eslint-disable-next-line no-unused-vars
const Filter = ({ intl, children, onSubmit = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { handleSubmit, control, register } = useForm({
    mode: 'onChange'
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllRoofVendor())
    dispatch(getAllCustomer())
  }, [])

  const reduxRoofVendor = useSelector((state) => state.roofUnit?.data)
  const reduxCustomer = useSelector((state) => state.billingCustomer?.data)
  const listCustomer = reduxCustomer
  .map((item) => {
    return { value: item.id, label: item.fullName }
  })
  const listRoofVendor = reduxRoofVendor
  .map((item) => {
    return { value: item.id, label: item.name }
  })
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmitFilterForm = (value) => {
    const payload = {}
    if (value.state?.value !== 'ALL_STATUS') {
      payload.state = {
        value: value.state?.value,
        type: 'exact'
      }
    }
    onSubmit?.(payload)
    toggle()
    
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} zIndex={500} aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader>{intl.formatMessage({ id: 'Filter project information' })}</ModalHeader>
        <ModalBody>
          <Form className="billing-form">
            <Row>
              <Col md={12}>
                <Label className="general-label" for="">
                  {intl.formatMessage({ id: 'Customer' })}
                </Label>
                <Controller
                  as={Select}
                  control={control}
                  theme={selectThemeColors}
                  name="customer"
                  id="customer"
                  innerRef={register()}
                  options={listCustomer}
                  className="react-select mb-2"
                  classNamePrefix="select"
                  placeholder={intl.formatMessage({ id: 'Select customer' })}
                  formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                />
              </Col>
              <Col md={12}>
                <Label className="general-label" for="">
                  {intl.formatMessage({ id: 'roof-rental-unit' })}
                </Label>
                <Controller
                  as={Select}
                  control={control}
                  theme={selectThemeColors}
                  name="roofVendor"
                  id="roofVendor"
                  innerRef={register()}
                  options={listRoofVendor}
                  className="react-select mb-2"
                  classNamePrefix="select"
                  placeholder={intl.formatMessage({ id: 'Select roof rental vendor' })}
                  formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                />
              </Col>
              <Col md={12}>
                <Label className="general-label" for="address">
                  {intl.formatMessage({ id: 'Status' })}
                </Label>
                <Controller
                  as={Select}
                  control={control}
                  theme={selectThemeColors}
                  name="state"
                  id="state"
                  innerRef={register()}
                  options={GENERAL_STATUS_OPTIS}
                  defaultValue={GENERAL_STATUS_OPTIS[0]}
                  className="react-select mb-2"
                  classNamePrefix="select"
                  placeholder={intl.formatMessage({ id: 'Select a status' })}
                  formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                />
              </Col>
              <Col md={12} className="mt-2">
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'last day of electricity bill' })}
                </Label>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Row>
                    <Col md={6}>
                      <Input autoComplete="on" type="date" className="custom-icon-input-date" />
                    </Col>

                    <Col md={6}>
                      <Input autoComplete="on" type="date" className="custom-icon-input-date" />
                    </Col>
                  </Row>
                </LocalizationProvider>
              </Col>
              <Col md={12} className="mt-2">
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'date of sending notice of electricity bill' })}
                </Label>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Row>
                    <Col md={6}>
                      <Input autoComplete="on" type="date" className="custom-icon-input-date" />
                    </Col>

                    <Col md={6}>
                      <Input autoComplete="on" type="date" className="custom-icon-input-date" />
                    </Col>
                  </Row>
                </LocalizationProvider>
              </Col>
              <Col md={12} className="mt-2">
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'date of sending notice of roof rent' })}
                </Label>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Row>
                    <Col md={6}>
                      <Input autoComplete="on" type="date" className="custom-icon-input-date" />
                    </Col>

                    <Col md={6}>
                      <Input autoComplete="on" type="date" className="custom-icon-input-date" />
                    </Col>
                  </Row>
                </LocalizationProvider>
              </Col>
              <Col md={12} className="mt-2 mb-2">
                <Label className="general-label" for="">
                  {intl.formatMessage({ id: 'Wattage' })}
                </Label>
                <Input
                  id="Wattage"
                  name="Wattage"
                  autoComplete="on"
                  innerRef={register()}
                  placeholder={intl.formatMessage({ id: 'Enter power' })}
                />
              </Col>
              <Col md={12}>
                <Label className="general-label" for="address">
                  {intl.formatMessage({ id: 'Assigned accountant' })}
                </Label>
                <Controller
                  as={Select}
                  control={control}
                  theme={selectThemeColors}
                  name="Assigned"
                  id="Assigned"
                  innerRef={register()}
                  options={mockUser}
                  className="react-select mb-2"
                  classNamePrefix="select"
                  placeholder={intl.formatMessage({ id: 'Choose assigned accountant' })}
                  formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                />
              </Col>
              <Col md={12} className="mt-2">
                <Label className="general-label" for="exampleSelect">
                  {intl.formatMessage({ id: 'Operation date' })}
                </Label>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <Row>
                    <Col md={6}>
                      <Input autoComplete="on" type="date" className="custom-icon-input-date" />
                    </Col>

                    <Col md={6}>
                      <Input autoComplete="on" type="date" className="custom-icon-input-date" />
                    </Col>
                  </Row>
                </LocalizationProvider>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit(handleSubmitFilterForm)}>
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
