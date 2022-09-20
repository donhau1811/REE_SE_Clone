import React, { useState, cloneElement, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input } from 'reactstrap'
import { selectThemeColors } from '@src/utility/Utils'
import { object, func } from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPermission, getAllUserAction, getAllUserFeature } from './store/actions'

const EditRoleModal = ({ intl, children, onSubmit = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const [featureValue, setFeatureValue] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const { allPermission, allUserFeature, allUserAction } = useSelector((state) => state.permissionGroup)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    Promise.all([dispatch(getAllUserFeature()), dispatch(getAllPermission()), dispatch(getAllUserAction())])
  }, [])

  useEffect(() => {
    if (!featureValue?.value) {
      setSearchValue(null)
    }
  }, [featureValue?.value])

  const handleSubmitFilterForm = () => {
    const payload = {}

    onSubmit?.(payload)
    toggle()
  }

  const renderListFeature = searchValue?.value
    ? (allUserFeature || []).filter((item) => item.code === searchValue.value)
    : allUserFeature

  const handleChangeFeatureValue = (value) => {
    setFeatureValue(value)
  }
  const handleFilterFeature = () => {
    setSearchValue(featureValue)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        zIndex={500}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <ModalHeader>{intl.formatMessage({ id: 'Choose Role' })}</ModalHeader>
        <ModalBody>
          <Row className="mb-2">
            <Col md={10} className="mt-1">
              <Select
                theme={selectThemeColors}
                options={(allUserFeature || []).map((item) => ({
                  label: item.name,
                  value: item.code
                }))}
                value={featureValue}
                onChange={handleChangeFeatureValue}
                isClearable
                className="react-select"
                classNamePrefix="select"
                placeholder={intl.formatMessage({ id: 'Choose Feature' })}
                formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
                noOptionsMessage={() => <FormattedMessage id="There are no records to display" />}
              />
            </Col>
            <Col md={2} className="mt-1">
              <Button.Ripple color="primary" className="add-project" onClick={handleFilterFeature}>
                <FormattedMessage id="Find" />
              </Button.Ripple>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {(renderListFeature || []).map((feature, fIndex) => (
                <>
                  <div key={feature.id}>
                    <Input type="checkbox" className="custom-checked-input" />
                    <Label className="general-label feature-label" for="name">
                      {feature.name}
                    </Label>
                  </div>
                  <p>
                    {(allPermission || [])
                      .filter((item) => item.feature === feature.code)
                      .map((per) => (
                        <span key={per.id} className="mr-2 text-nowrap">
                          <Input type="checkbox" className="custom-checked-input" />
                          <Label className="general-label font-weight-normal" for="name">
                            {allUserAction.find((action) => action.code === per.action)?.name}
                          </Label>
                        </span>
                      ))}
                  </p>
                  {fIndex !== renderListFeature?.length - 1 && <div className="divider-dashed mt-2 mb-2" />}
                </>
              ))}
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
