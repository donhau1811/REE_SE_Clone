import { func, object, string } from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MOBILE_REGEX } from '@src/utility/constants'
import Table from '@src/views/common/table/CustomDataTable'
import MonthlyRent from './typesOfContracts/CyclicalContract'
import ContractByPercentage from './typesOfContracts/ContractByPercentage'
import './style.scss'

const initArray = ['contractCode', 'effectiveDate', 'roofVendorName', 'contractType']

const RoofVendorContractCUForm = ({ intl, onCancel = () => {}, initValues, submitText }) => {
  const TypeOfRoofVendorContract = [
    { value: 1, label: intl.formatMessage({ id: 'no-charge' }) },
    { value: 2, label: intl.formatMessage({ id: 'monthly-rent' }) },
    { value: 3, label: intl.formatMessage({ id: 'quarterly-rent' }) },
    { value: 4, label: intl.formatMessage({ id: 'rent-as-percentage-of-revenue' }) }
  ]

  const [typeContract, settypeContract] = useState(TypeOfRoofVendorContract[0])
  const [validForm, setValidForm] = useState(null)
  const [arrayForm, setArrayForm] = useState(initArray)

  const isCyclicalContract = useMemo(() => typeContract.value === 2 || typeContract.value === 3, [typeContract])

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
  useEffect(() => {
    setValidForm({
      roofVendorName: yup.object().shape({
        label: yup.string().required(intl.formatMessage({ id: 'required-validate' })),
        value: yup.string().required(intl.formatMessage({ id: 'required-validate' }))
      })
    })
    if (isCyclicalContract) {
      setValidForm({
        ...validForm,
        rentalAmount: yup
          .string()
          .required(intl.formatMessage({ id: 'required-validate' }))
          .max(16, intl.formatMessage({ id: 'max-validate' }))
          .matches(MOBILE_REGEX, { // lấy kiểu số  thực
            message: intl.formatMessage({ id: 'invalid-character-validate' }),
            excludeEmptyString: true
          })
      })
      setArrayForm(...initArray, 'startDate', 'announcementDate', 'rentalAmount', 'confirmationReminder')
    } else if (typeContract.value === 4) {
      setArrayForm(...initArray, 'percentTurnover', 'confirmationReminder')
    }
  }, [typeContract])
  const ValidateSchema = yup.object().shape(validForm, arrayForm)
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(ValidateSchema),
    defaultValues: initValues
  })

  const { handleSubmit, getValues, errors, control, register, reset } = methods
  useEffect(() => {
    reset({ ...initValues })
  }, [initValues])

  const submit = (data) => {
    data.typeContract = typeContract
    console.log('=========submit===========', data)
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(submit)}>
        <Row>
          <Col className="mb-3" md={3}>
            <Label className="general-label" >
              <FormattedMessage id="contract-code" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Input id="contractCode" name="contractCode" autoComplete="on" disabled={true} innerRef={register()} />
          </Col>
          <Col className="mb-3" md={2}>
            <Label className="general-label">
              <FormattedMessage id="effective-date" />
            </Label>
            <Input id="effectiveDate" name="effectiveDate" autoComplete="on" disabled={true} innerRef={register()} />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3" md={3}>
            <Label className="general-label" >
              <FormattedMessage id="Roof rental unit name" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Controller
              as={Select}
              control={control}
              theme={selectThemeColors}
              name="roofVendorName"
              options={TypeOfRoofVendorContract}
              id="roofVendorName"
              autoComplete="on"
              innerRef={register()}
              className="react-select"
              classNamePrefix="select"
              valid={!!getValues('roofVendorName')?.value}
              invalid={!!errors.roofVendorName}
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
            <Input id="taxCode" name="taxCode" autoComplete="on" disabled={true} />
          </Col>

          <Col md={4}>
            <Label className="general-label">
              <FormattedMessage id="operation-unit-form-address" />
            </Label>
            <Input id="address" name="address" autoComplete="on" disabled={true} />
          </Col>
          <Col className="mt-2" md={3}>
            <Button type="" color="primary" className="mr-1 px-5">
              {intl.formatMessage({ id: 'update-info' })}
            </Button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Label className="general-label" >
              <FormattedMessage id="notification-recipients" />
            </Label>
            <Table  columns={columns} pagination={null} data={[{}]} />
          </Col>
        </Row>
        <Row>
          <hr className='hr'/>
        </Row>
        <Row>
          <Col className="mb-3" md={3}>
            <Label className="general-label" >
              <FormattedMessage id="roof-rental-contract-type" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Controller
              control={control}
              name="contractType"
              id="contractType"
              options={TypeOfRoofVendorContract}
              innerRef={register()}
              defaultValues={TypeOfRoofVendorContract[0]}
              render={({ field }) => (
                <Select
                  classNamePrefix="select"
                  className="react-select"
                  theme={selectThemeColors}
                  options={TypeOfRoofVendorContract}
                  {...field}
                  label="Text field"
                  onChange={(value) => settypeContract(value)}
                />
              )}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            />
          </Col>
        </Row>
        {isCyclicalContract && <MonthlyRent intl typeContract={typeContract} />}
        {typeContract.value === 4 && <ContractByPercentage />}
        <Row className="d-flex justify-content-end align-items-center">
          <Button type="submit" color="primary" className="mr-1 px-3">
            {submitText || intl.formatMessage({ id: 'Save' })}
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
  submitText: string
}

export default injectIntl(RoofVendorContractCUForm)
