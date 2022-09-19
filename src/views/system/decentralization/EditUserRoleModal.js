import React, { useState, cloneElement } from 'react'
import { Button, Modal, ModalBody, ModalFooter, Col, Row, Label, Input, Form } from 'reactstrap'
import { selectThemeColors } from '@src/utility/Utils'
import { object, func } from 'prop-types'
import { FormattedMessage, injectIntl, useIntl } from 'react-intl'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

const EditUserRoleModal = ({ children, onSubmit = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { control } = useForm({
    mode: 'onChange'
  })
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const intl = useIntl()
  const handleSubmitFilterForm = () => {
    const payload = {}

    onSubmit?.(payload)
    toggle()
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} zIndex={500} aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalBody>
        <Form className="billing-form" >

          <Row>
            <Col md={6} className="mt-1">
              <p>Họ & tên người sử dụng</p>
            </Col>
            <Col md={6} className="mt-1">
              <p className='full-name-label'>Nguyễn Thị Thành</p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mt-1">
              <Label className="general-label" for="exampleSelect">
                {intl.formatMessage({ id: 'Curent Role' })}
              </Label>
              <Input id="curentRole" disabled name="curentRole" className="input" />
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mt-1">
              <Label className="general-label" for="exampleSelect">
                {intl.formatMessage({ id: 'Curent Role' })}
              </Label>
              <Controller
                as={Select}
                control={control}
                theme={selectThemeColors}
                name="newRole"
                id="newRole"
                options={[]}
                className="react-select"
                classNamePrefix="select"
                placeholder={intl.formatMessage({ id: 'Select Role' })}
                formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                noOptionsMessage={() => <FormattedMessage id="There are no records to display" />}
              />
            </Col>
          </Row>
          </Form>
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
EditUserRoleModal.propTypes = {
  children: object,
  onSubmit: func
}

export default injectIntl(EditUserRoleModal)
