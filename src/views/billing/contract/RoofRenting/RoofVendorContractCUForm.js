import { yupResolver } from '@hookform/resolvers/yup'
import { NUMBER_REGEX, REAL_NUMBER } from '@src/utility/constants'
import { TypeOfRoofVendorContract as type } from '@src/utility/constants/billing'
import { selectThemeColors } from '@src/utility/Utils'
import Table from '@src/views/common/table/CustomDataTable'
import { bool, func, object, string } from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import * as yup from 'yup'
import { getAllRoofVendor, getRoofVendorWithContactsById } from '../../roof-rental-unit/store/actions'
import ContractByPercentage from './typesOfContracts/ContractByPercentage'
import MonthlyRent from './typesOfContracts/CyclicalContract'

const RoofVendorContractCUForm = ({ intl, onCancel, initValues, isReadOnly, onSubmit }) => {


  const defaultValues = {
    contractType: type[0]
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

  const dispatch = useDispatch()

  const {
    billingContacts: { contacts }
  } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getAllRoofVendor())
  }, [])

  const { data } = useSelector((state) => state.roofUnit)

  const listOfRoofvendor = data.map((item) => {
    return { value: item.id, label: item.name }
  })

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
  const { handleSubmit, getValues, errors, control, register, reset, watch, setValue } = methods

  const typeContract = watch('contractType', type[0])

  const selectRoofVendor = watch(
    'roofVendorName',
    listOfRoofvendor.find((item) => item.value === initValues?.roofId)
  )
  useEffect(() => {
    setValue('roofVendorName', selectRoofVendor)
    setValue('taxCode', data.find((item) => item.id === selectRoofVendor?.value)?.taxCode)
    setValue('address', data.find((item) => item.id === selectRoofVendor?.value)?.address)
    if (selectRoofVendor) {
      dispatch(getRoofVendorWithContactsById({ id: selectRoofVendor?.value, isSavedToState: true }))
    }
  }, [selectRoofVendor])
  const isCyclicalContract = useMemo(() => typeContract.value === 2 || typeContract.value === 3, [typeContract])

  useEffect(() => {
    // thay đổi valid tùy theo các subform
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
          }),
        announcementDate: yup
          .string()
          .required(intl.formatMessage({ id: 'required-validate' }))
          .max(2, intl.formatMessage({ id: 'max-validate' }))
          .matches(NUMBER_REGEX, {
            // lấy kiểu số  thực
            message: intl.formatMessage({ id: 'invalid-character-validate' }),
            excludeEmptyString: true
          }),
        confirmationReminder: yup
          .string()
          .required(intl.formatMessage({ id: 'required-validate' }))
          .max(2, intl.formatMessage({ id: 'max-validate' }))
          .matches(NUMBER_REGEX, {
            // lấy kiểu số  thực
            message: intl.formatMessage({ id: 'invalid-character-validate' }),
            excludeEmptyString: true
          }),
        startDate: yup
        .string()
        .required(intl.formatMessage({ id: 'required-validate' }))
        .max(10, intl.formatMessage({ id: 'max-validate' }))


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
          }),
        confirmationReminder: yup
          .string()
          .required(intl.formatMessage({ id: 'required-validate' }))
          .max(2, intl.formatMessage({ id: 'max-validate' }))
          .matches(NUMBER_REGEX, {
            // lấy kiểu số  thực
            message: intl.formatMessage({ id: 'invalid-character-validate' }),
            excludeEmptyString: true
          })
      })
    }
  }, [typeContract])

  useEffect(() => {
    const contractValue = {
      ...initValues,
      roofVendorName: listOfRoofvendor.find((item) => item.value === initValues?.roofId),
      contractType: type.find((item) => item.value === initValues?.typeContract)
    }
    reset(contractValue)
  }, [initValues])

  const handleProcessFormData = (value) => {
    const newValue = {
      ...value,
      state: 'ACTIVE',
      code: value?.contractCode,
      type: 'ROOF_VENDOR',
      projectId: 1,
      roofVendorId: value?.roofVendorName?.value,
      startDate: value?.effectiveDate,
      endDate: value?.expirationDate,
      url: 'link contract pdf',
      alerts: {
        confirmAlert: value?.confirmationReminder,
        billingAlert: value?.announcementDate
      },
      details: {
        id: value?.contractType?.value,
        name: value?.contractType?.label,
        rentalAmount: value?.rentalAmount,
        percent: value?.percentTurnover,
        startDate:value?.startDate
      }
    }
    onSubmit?.(newValue)
  }
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleProcessFormData)}>
        <Row>
          <Col className="mb-3" md={3} xs={12} lg={4}>
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
          <Col md={2} xs={12} lg={2}>
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
          <Col  md={2} xs={12} lg={2}>
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
        <Row>
          <Col className="mb-3" md={3} xs={12} lg={4}>
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

          <Col md={2} xs={12} lg={2}>
            <Label className="general-label">
              <FormattedMessage id="operation-unit-form-taxCode" />
            </Label>
            <Input id="taxCode" name="taxCode" innerRef={register()} autoComplete="on" disabled={true} />
          </Col>

          <Col md={6} xs={12} lg={6}>
            <Label className="general-label">
              <FormattedMessage id="operation-unit-form-address" />
            </Label>
            <Input id="address" name="address" innerRef={register()} autoComplete="on" disabled={true} />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Label className="general-label">
              <FormattedMessage id="notification-recipients" />
            </Label>
            <Table columns={columns} pagination={null} data={contacts} />
          </Col>
        </Row>
        <Row>
          <div className="divider-dashed mb-2" />
        </Row>
        <Row>
          <Col className="mb-3" md={3} xs={12} lg={4}>
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
              options={type}
              id="contractType"
              autoComplete="on"
              innerRef={register()}
              className="react-select"
              classNamePrefix="select"
              valid={!!getValues('contractType')?.value}
              invalid={!!errors.contractType}
              formatOptionLabel={(option) => <> {option.label}</>}
            />
          </Col>
        </Row>
        {isCyclicalContract && <MonthlyRent isReadOnly={isReadOnly} typeContract={typeContract} />}
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
