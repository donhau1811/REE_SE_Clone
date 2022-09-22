/* eslint-disable no-unused-vars */
import React, { useState, cloneElement, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input } from 'reactstrap'
import { convertPermissionCodeToLabel, selectThemeColors } from '@src/utility/Utils'
import { object, func, array } from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPermission, getAllUserAction, getAllUserFeature } from './store/actions'

const EditRoleModal = ({ intl, children, onSubmit = () => {}, permissions }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const [featureValue, setFeatureValue] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const [values, setValues] = useState([])

  const { allPermission, allUserFeature, allUserAction } = useSelector((state) => state.permissionGroup)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen) {
      setValues(permissions)
    } else {
      setValues([])
    }
  }, [isOpen])

  useEffect(() => {
    Promise.all([dispatch(getAllUserFeature()), dispatch(getAllPermission()), dispatch(getAllUserAction())])
  }, [])

  useEffect(() => {
    if (!featureValue?.value) {
      setSearchValue(null)
    }
  }, [featureValue?.value])

  const handleSubmitFilterForm = () => {
    onSubmit?.(values)
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
  const handleDeleteOrCreatePermission = (per, tValues, checked) => {
    let newValues = tValues
    // check xem co ton tai tog
    const isExistInValues = tValues.find((item) => item.id === per.id)
    if (checked) {
      // them 1 action cua 1 feature
      if (isExistInValues) {
        if (isExistInValues.isDelete) {
          delete isExistInValues.isDelete
          newValues = tValues.map((item) => (item.id === per.id ? isExistInValues : item))
        }
      } else {
        newValues = [...tValues, { ...per, isCreate: true }]
      }
    } else {
      // xoa action cua 1 feature
      if (isExistInValues.isCreate) {
        newValues = tValues.filter((item) => item.id !== per.id)
      } else {
        newValues = tValues.map((item) => (item.id === per.id ? { ...item, isDelete: true } : item))
      }
    }
    return newValues
  }
  const handleChangeFeatureGroup = (featureCode) => (event) => {
    let newValues = []
    const changePerItem = allPermission.filter((item) => item.feature === featureCode)

    newValues = changePerItem.reduce((array, value) => {
      return handleDeleteOrCreatePermission(value, array, event.target.checked)
    }, values)

    setValues(newValues)
  }

  const handleChangeFeaturePermission = (_per) => (event) => {
    const newValues = handleDeleteOrCreatePermission(_per, values, event.target.checked)
    setValues(newValues)
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
              {(renderListFeature || []).map((feature, fIndex) => {
                return (
                  <>
                    <div key={feature.id}>
                      <Input
                        type="checkbox"
                        className="custom-checked-input"
                        checked={Boolean(values.find((item) => item.feature === feature.code && !item.isDelete))}
                        onChange={handleChangeFeatureGroup(feature.code)}
                      />
                      <Label className="general-label feature-label" for="name">
                        {feature.name}
                      </Label>
                    </div>
                    <Row>
                      {(allPermission || [])
                        .filter((item) => item.feature === feature.code)
                        .map((per) => {
                          return (
                            <Col md={2} key={per.id}>
                              <Input
                                type="checkbox"
                                className="custom-checked-input"
                                checked={Boolean(values.find((item) => item.id === per.id && !item.isDelete))}
                                onChange={handleChangeFeaturePermission(per)}
                              />
                              <Label className="general-label font-weight-normal" for="name">
                                {convertPermissionCodeToLabel(per.action)}
                              </Label>
                            </Col>
                          )
                        })}
                    </Row>
                    {fIndex !== renderListFeature?.length - 1 && <div className="divider-dashed mt-2 mb-2" />}
                  </>
                )
              })}
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
  intl: object.isRequired,
  permissions: array
}

export default injectIntl(EditRoleModal)
