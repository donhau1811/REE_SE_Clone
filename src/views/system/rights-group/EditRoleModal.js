import React, { useState, cloneElement } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from 'reactstrap'
import { selectThemeColors } from '@src/utility/Utils'
import { object, func } from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

const EditRoleModal = ({ intl, children, onSubmit = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { control } = useForm({
    mode: 'onChange'
  })
  const toggle = () => {
    setIsOpen(!isOpen)
  }


  const handleSubmitFilterForm = () => {
    const payload = {}

    onSubmit?.(payload)
    toggle()
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} zIndex={500} aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader>{intl.formatMessage({ id: 'Choose Role' })}</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={9} className="mt-1">
              <Controller
                as={Select}
                control={control}
                theme={selectThemeColors}
                name="state"
                id="state"
                options={[]}
                className="react-select"
                classNamePrefix="select"
                placeholder={intl.formatMessage({ id: 'Choose Feature' })}
                formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                noOptionsMessage={() => <FormattedMessage id="There are no records to display" />}
              />
            </Col>
            <Col md={1} className="mt-1">
            <Button.Ripple color="primary" className="add-project">
            <FormattedMessage id="Find" />
          </Button.Ripple>
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
EditRoleModal.propTypes = {
  children: object,
  onSubmit: func,
  intl: object.isRequired
}

export default injectIntl(EditRoleModal)
