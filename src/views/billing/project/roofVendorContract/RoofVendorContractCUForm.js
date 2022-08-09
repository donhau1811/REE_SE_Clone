import { func, object, string, bool } from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { REAL_NUMBER } from '@src/utility/constants'
import Table from '@src/views/common/table/CustomDataTable'
import MonthlyRent from './typesOfContracts/CyclicalContract'
import ContractByPercentage from './typesOfContracts/ContractByPercentage'
import './style.scss'
import { mockRoofVendor } from './mock'
import { VALUE_NUMBER_DAY_OF_MONTH } from '@src/utility/constants/billing'

const RoofVendorContractCUForm = ({ intl, onCancel = () => {}, initValues, isReadOnly, onSubmit = () => {} }) => {
  const TypeOfRoofVendorContract = [
    { value: 1, label: intl.formatMessage({ id: 'no-charge' }) },
    { value: 2, label: intl.formatMessage({ id: 'monthly-rent' }) },
    { value: 3, label: intl.formatMessage({ id: 'quarterly-rent' }) },
    { value: 4, label: intl.formatMessage({ id: 'rent-as-percentage-of-revenue' }) }
  ]

  const listOfRoofvendor = mockRoofVendor.map((item) => {
    return { value: item.id, label: item.roofVendorName }
  })

  const defaultValues = {
    contractType: TypeOfRoofVendorContract[0]
  }
  const defaultValid = {
    roofVendorName: yup.object().shape({
      label: yup.string().required(intl.formatMessage({ id: 'required-validate' })),
      value: yup.string().required(intl.formatMessage({ id: 'required-validate' }))
    }),
    contractCode: yup
      .string()
      .required(intl.formatMessage({ id: 'required-validate' }))
      .max(50, intl.formatMessage({ id: 'max-validate' })),
    effectiveDate: yup.string().required(intl.formatMessage({ id: 'required-validate' })),
    expirationDate: yup.string().required(intl.formatMessage({ id: 'required-validate' }))
  }
  const [validForm, setValidForm] = useState(defaultValid)
  const columns = [
    {
      name: <FormattedMessage id="No." />,
      cell: (row, index) => index + 1,
      center: true,
      maxWidth: '50px'
    },
    {
      name: <FormattedMessage id="Contact Name" />,
      selector: 'fullName',
      center: true
    },
    {
      name: <FormattedMessage id="Position" />,
      selector: 'position',
      center: true
    },
    {
      name: <FormattedMessage id="operation-unit-form-mobile" />,
      selector: 'phone',
      center: true
    },
    {
      name: 'Email',
      selector: 'email',
      center: true,
      cell: (row) => <span>{row.email}</span>
    },
    {
      name: <FormattedMessage id="note" />,
      selector: 'note',
      center: true,
      cell: (row) => <span>{row.note}</span>
    }
  ]

  const ValidateSchema = yup.object().shape(validForm)
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(isReadOnly ? yup.object().shape({}) : ValidateSchema),
    defaultValues: initValues || defaultValues
  })

  const { handleSubmit, getValues, errors, control, register, reset, watch } = methods
  const typeContract = watch('contractType', TypeOfRoofVendorContract[0])
  const isCyclicalContract = useMemo(() => typeContract.value === 2 || typeContract.value === 3, [typeContract])
  useEffect(() => {
    setValidForm(defaultValid)
    if (isCyclicalContract) {
      setValidForm({
        ...defaultValid,
        rentalAmount: yup
          .string()
          .required(intl.formatMessage({ id: 'required-validate' }))
          .max(16, intl.formatMessage({ id: 'max-validate' }))
          .matches(REAL_NUMBER, {
            // lấy kiểu số  thực
            message: intl.formatMessage({ id: 'invalid-character-validate' }),
            excludeEmptyString: true
          })
      })
    } else if (typeContract.value === 4) {
      setValidForm({
        ...defaultValid,
        percentTurnover: yup
          .string()
          .required(intl.formatMessage({ id: 'required-validate' }))
          .max(16, intl.formatMessage({ id: 'max-validate' }))
          .matches(REAL_NUMBER, {
            message: intl.formatMessage({ id: 'invalid-character-validate' }),
            excludeEmptyString: true
          })
      })
    }
  }, [typeContract])
  useEffect(() => {
    const contractValue = {
      ...initValues,
      roofVendorName: listOfRoofvendor.find((item) => item.label === initValues?.roofVendorName),
      contractType: TypeOfRoofVendorContract.find((item) => item.value === initValues?.typeContract),
      announcementDate: VALUE_NUMBER_DAY_OF_MONTH.find((item) => item.label === initValues?.announcementDate),
      confirmationReminder: VALUE_NUMBER_DAY_OF_MONTH.find((item) => item.label === initValues?.confirmationReminder)
    }
    reset(contractValue)
  }, [initValues?.id])

  const handleBeforeSubmit = (value) => {
    const newValue = {
      ...value,
      roofVendorName: value?.roofVendorName?.label,
      contractType: value?.contractType?.label,
      announcementDate: value?.announcementDate?.label,
      confirmationReminder: value?.confirmationReminder?.label
    }
    onSubmit?.(newValue)
  }
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleBeforeSubmit)}>
        <Row>
          <Col className="mb-3" md={3}>
            <Label className="general-label">
              <FormattedMessage id="contract-code" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="contractCode"
              name="contractCode"
              autoComplete="on"
              disabled={isReadOnly}
              innerRef={register()}
              invalid={!!errors.contractCode}
              valid={getValues('contractCode')?.trim() && !errors.contractCode}
              placeholder={intl.formatMessage({ id: 'Enter the contract code' })}
            />
            {errors?.contractCode && <FormFeedback>{errors?.contractCode?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={2}>
            <Label className="general-label" for="status">
              <FormattedMessage id="effectiveDate" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input
              id="effectiveDate"
              name="effectiveDate"
              disabled={isReadOnly}
              autoComplete="on"
              innerRef={register()}
              invalid={!!errors.effectiveDate}
              valid={getValues('effectiveDate')?.trim() && !errors.effectiveDate}
              type="date"
              className="custom-icon-input-date"
            />
            {errors?.effectiveDate && <FormFeedback>{errors?.effectiveDate?.message}</FormFeedback>}
          </Col>
          <Col className="mb-3" md={2}>
            <Label className="general-label">
              <FormattedMessage id="expirationDate" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>

            <Input
              id="expirationDate"
              name="expirationDate"
              disabled={isReadOnly}
              autoComplete="on"
              innerRef={register()}
              invalid={!!errors.expirationDate}
              valid={getValues('expirationDate')?.trim() && !errors.expirationDate}
              type="date"
              className="custom-icon-input-date"
            />
            {errors?.expirationDate && <FormFeedback>{errors?.expirationDate?.message}</FormFeedback>}
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col className="mb-3" md={3}>
            <Label className="general-label">
              <FormattedMessage id="Roof rental unit name" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Controller
              as={Select}
              control={control}
              isDisabled={isReadOnly}
              theme={selectThemeColors}
              name="roofVendorName"
              options={listOfRoofvendor}
              id="roofVendorName"
              autoComplete="on"
              innerRef={register()}
              className="react-select"
              classNamePrefix="select"
              valid={!!getValues('roofVendorName')?.value}
              invalid={!!errors.roofVendorName}
              placeholder={intl.formatMessage({ id: 'Select roof rental vendor' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />
            {!!errors?.roofVendorName && (
              <FormFeedback className="d-block">{errors?.roofVendorName?.value?.message}</FormFeedback>
            )}
          </Col>

          <Col md={2}>
            <Label className="general-label">
              <FormattedMessage id="operation-unit-form-taxCode" />
            </Label>
            <Input id="taxCode" name="taxCode" innerRef={register()} autoComplete="on" disabled={true} />
          </Col>

          <Col md={5}>
            <Label className="general-label">
              <FormattedMessage id="operation-unit-form-address" />
            </Label>
            <Input id="address" name="address" innerRef={register()} autoComplete="on" disabled={true} />
          </Col>
          <Col className="d-flex align-items-center mb-1" md={2}>
            <Button type="button" color="primary" className="mr-1">
              {intl.formatMessage({ id: 'update-info' })}
            </Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Label className="general-label">
              <FormattedMessage id="notification-recipients" />
            </Label>
            <Table columns={columns} pagination={null} data={[{}]} />
          </Col>
        </Row>
        <Row>
          <hr className="hr" />
        </Row>
        <Row>
          <Col className="mb-3" md={3}>
            <Label className="general-label">
              <FormattedMessage id="roof-rental-contract-type" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Controller
              as={Select}
              control={control}
              isDisabled={isReadOnly}
              theme={selectThemeColors}
              name="contractType"
              options={TypeOfRoofVendorContract}
              id="contractType"
              autoComplete="on"
              innerRef={register()}
              className="react-select"
              classNamePrefix="select"
              valid={!!getValues('contractType')?.value}
              invalid={!!errors.contractType}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />
          </Col>
        </Row>
        {isCyclicalContract && <MonthlyRent isReadOnly={isReadOnly} intl typeContract={typeContract} />}
        {typeContract.value === 4 && <ContractByPercentage isReadOnly={isReadOnly} />}
        <Row className="d-flex justify-content-end align-items-center">
          <Button type="submit" color="primary" className="mr-1 px-3">
            {intl.formatMessage({ id: isReadOnly ? 'Update' : 'Save' })}
          </Button>{' '}
          <Button color="secondary" onClick={onCancel}>
            {intl.formatMessage({ id: 'Cancel' })}
          </Button>{' '}
        </Row>
      </Form>
    </FormProvider>
  )
}

RoofVendorContractCUForm.propTypes = {
  intl: object.isRequired,
  onSubmit: func,
  onCancel: func,
  initValues: object,
  submitText: string,
  isReadOnly: bool
}

export default injectIntl(RoofVendorContractCUForm)
