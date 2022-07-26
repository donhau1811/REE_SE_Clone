import { yupResolver } from '@hookform/resolvers/yup'
import { MOBILE_REGEX, EMAIL_REGEX } from '@src/utility/constants'
import { selectThemeColors } from '@src/utility/Utils'
import { func, object } from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import Select from 'react-select'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import Contact from './contact'
import * as yup from 'yup'
import './styles.scss'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import React, { useState, useEffect } from 'react'
import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'
import { ReactComponent as CicleFailed } from '@src/assets/images/svg/circle-failed.svg'


const MySweetAlert = withReactContent(SweetAlert)
const RoofUnit = ({ intl, onSubmit = () => {}, onCancel = () => {}, initValues }) => {
  const [contacts, setContacts] = useState([])
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const OPERATION_UNIT_STATUS_OPTS = [
    { value: OPERATION_UNIT_STATUS.INACTIVE, label: intl.formatMessage({ id: 'Active' }) },
    { value: OPERATION_UNIT_STATUS.ACTIVE, label: intl.formatMessage({ id: 'Inactive' }) }
  ]
  const initState = {
    status: OPERATION_UNIT_STATUS_OPTS[0],
    name: null,
    code: null,
    taxCode: null,
    address: null,
    mobile: null,
    note: null
  }

  const handleSubmitCustomerForm = (values) => {
    if (contacts?.length < 1) {
      return MySweetAlert.fire({
        // icon: 'success',
        iconHtml: <CicleFailed />,
        text: intl.formatMessage({ id: 'Need at least 1 contact to add customer. Please try again' }),
        customClass: {
          popup: classNames({
            'sweet-alert-popup--dark': skin === 'dark'
          }),
          confirmButton: 'btn btn-primary mt-2',
          icon: 'border-0'
        },
        width: 'max-content',
        showCloseButton: true,
        confirmButtonText: intl.formatMessage({ id: 'Try again' })
      })
    }
    onSubmit?.({
      ...values,
      contacts
    })
  }
  const handleContactformSubmit = (value) => {
    setContacts(value)
  }
  const ValidateSchema = yup.object().shape(
    {
      name: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(255, intl.formatMessage({ id: 'max-validate' })),

      code: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(15, intl.formatMessage({ id: 'max-validate' }))
        .test('dubplicated', intl.formatMessage({ id: 'dubplicated-validate' }), (value) => value !== 'aaa'),

      taxCode: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(20, intl.formatMessage({ id: 'max-validate' })),

      address: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(255, intl.formatMessage({ id: 'max-validate' })),
      mobile: yup
        .string()
        .matches(MOBILE_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
        .max(15, intl.formatMessage({ id: 'max-validate' })),
      email: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .matches(EMAIL_REGEX, {
          message: intl.formatMessage({ id: 'invalid-character-validate' }),
          excludeEmptyString: true
        })
    },
    ['name', 'code', 'taxCode', 'address', 'mobile', 'email', 'note']
  )
  useEffect(() => {
    setContacts(initValues?.contacts || [])
  }, [initValues?.contacts])

  const { handleSubmit, getValues, errors, control, register } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ValidateSchema),
    defaultValues: initValues || initState
  })

  return (
    <>
      <Form onSubmit={handleSubmit(handleSubmitCustomerForm)}>
        <Row className="mb-2">
          <Col>
            <h4 className="typo-section">
              <FormattedMessage id="General Information" />
            </h4>
          </Col>
        </Row>

        <Row>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Roof rental unit name' })} <span className="hightlight-label">&nbsp; (*)</span>
            </Label>

            <Input
              className="input"
              id="name"
              name="name"
              autoComplete="on"
              invalid={!!errors.name}
              valid={getValues('name')?.trim() && !errors.name}
              innerRef={register()}
              placeholder={intl.formatMessage({ id: 'Enter-unit-name' })}
            />
            {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Unit-code' })} <span className="hightlight-label">&nbsp; (*)</span>
            </Label>
            <Input
              className="input"
              id="code"
              name="code"
              autoComplete="on"
              innerRef={register()}
              invalid={!!errors.code}
              valid={getValues('code')?.trim() && !errors.code}
              placeholder={intl.formatMessage({ id: 'Enter-unit-code' })}
            />
            {errors?.code && <FormFeedback>{errors?.code?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'operation-unit-form-taxCode' })}{' '}
              <span className="hightlight-label">&nbsp; (*)</span>
            </Label>
            <Input
              className="input"
              id="taxCode"
              name="taxCode"
              autoComplete="on"
              innerRef={register()}
              invalid={!!errors.taxCode}
              valid={getValues('taxCode')?.trim() && !errors.taxCode}
              placeholder={intl.formatMessage({ id: 'Enter-unit-taxCode' })}
            />
            {errors?.taxCode && <FormFeedback>{errors?.taxCode?.message}</FormFeedback>}
          </Col>
        </Row>

        <Row>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Address' })} <span className="hightlight-label">&nbsp; (*)</span>
            </Label>
            <Input
              className="input"
              id="address"
              name="address"
              autoComplete="on"
              innerRef={register()}
              invalid={!!errors.address}
              valid={getValues('address')?.trim() && !errors.address}
              placeholder={intl.formatMessage({ id: 'Enter-unit-address' })}
            />
            {errors?.address && <FormFeedback>{errors?.address?.message}</FormFeedback>}
          </Col>

          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Email' })} <span className="hightlight-label">&nbsp; (*)</span>
            </Label>
            <Input
              className="input"
              type="email"
              id="email"
              name="email"
              autoComplete="on"
              innerRef={register()}
              invalid={!!errors.email}
              valid={getValues('email')?.trim() && !errors.email}
              placeholder={intl.formatMessage({ id: 'Enter-unit-email' })}
            />
            {errors?.email && <FormFeedback>{errors?.email?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'operation-unit-form-mobile' })}
            </Label>
            <Input
              className="input"
              ty
              id="mobile"
              name="mobile"
              autoComplete="on"
              innerRef={register()}
              invalid={!!errors.mobile}
              valid={getValues('mobile')?.trim() && !errors.mobile}
              placeholder={intl.formatMessage({ id: 'Enter-unit-mobile' })}
            />
            {errors?.mobile && <FormFeedback>{errors?.mobile?.message}</FormFeedback>}
          </Col>
        </Row>

        <Row>
          <Col className="mb-2" md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Status' })}
            </Label>
            <Controller
              as={Select}
              control={control}
              theme={selectThemeColors}
              name="status"
              id="status"
              innerRef={register()}
              options={OPERATION_UNIT_STATUS_OPTS}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select a status' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />
          </Col>
          <Col className="mb-2" md="8">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Note' })}
            </Label>
            <Input
              name="note"
              id="note"
              autoComplete="on"
              innerRef={register()}
              placeholder={intl.formatMessage({ id: 'Enter-unit-note' })}
            />
          </Col>
        </Row>

        <Input id="contacts" name="contacts" autoComplete="on" innerRef={register()} type="hidden" />
        <Contact onChange={handleContactformSubmit} data={contacts} />

        <Row className="d-flex justify-content-end align-items-center mt-5">
          <Button type="submit" color="primary" className="mr-1 px-3">
            {intl.formatMessage({ id: 'Save' })}
          </Button>
          <Button onClick={onCancel} color="secondary">
            {intl.formatMessage({ id: 'Cancel' })}
          </Button>
        </Row>
      </Form>
    </>
  )
}

RoofUnit.propTypes = {
  intl: object.isRequired,
  onSubmit: func,
  onCancel: func,
  initValues: object
}

export default injectIntl(RoofUnit)
