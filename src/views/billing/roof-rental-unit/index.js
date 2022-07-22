import { STATE as STATUS } from '@constants/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic_edit.svg'
import { ReactComponent as IconInsert } from '@src/assets/images/svg/table/ic_insert.svg'
import { MOBILE_REGEX, EMAIL_REGEX, ROUTER_URL } from '@src/utility/constants'
import { selectThemeColors } from '@src/utility/Utils'
import Table from '@src/views/common/table/CustomDataTable'
import classnames from 'classnames'
import { func, object } from 'prop-types'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { Badge, Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as yup from 'yup'
import InsertInformation from './RoofUnitCUForm'
import PageHeader from './PageHeader'
import { getAllRoofUnit } from './store/actions'
import './styles.scss'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'

const MySweetAlert = withReactContent(SweetAlert)

const RoofUnit = ({ intl, onSubmit = () => {}, onCancel = () => {}, initValues }) => {
  const OPERATION_UNIT_STATUS_OPTS = [
    { value: OPERATION_UNIT_STATUS.INACTIVE, label: intl.formatMessage({ id: 'Active' }) },
    { value: OPERATION_UNIT_STATUS.ACTIVE, label: intl.formatMessage({ id: 'Inactive' }) }
  ]
  const initState = {
    status: OPERATION_UNIT_STATUS_OPTS[0]
  }
  const handlesubformSubmit = (value) => {
    console.log('first', value)
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

  const { handleSubmit, getValues, errors, control, register } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ValidateSchema),
    defaultValues: initValues || initState
  })

  const history = useHistory()
  const dispatch = useDispatch()
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const data = useSelector((state) => state.billingCustomer)
  useEffect(() => {
    Promise.all([
      dispatch(
        getAllRoofUnit({
          fk: '*',
          state: [STATUS.ACTIVE].toString(),
          rowsPerPage: -1
        })
      )
    ])
  }, [])
  const handleRedirectToUpdatePage = (id) => () => {
    if (id) history.push(`${ROUTER_URL.BILLING_CUSTOMER_UPDATE}?id=${id}`)
  }
  const handleDeleteCustomer = (id) => () => {
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Delete billing customer title' }),
      html: intl.formatMessage({ id: 'Delete billing information message' }),
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: intl.formatMessage({ id: 'Yes' }),
      cancelButtonText: intl.formatMessage({ id: 'No, Thanks' }),
      customClass: {
        popup: classnames({
          'sweet-alert-popup--dark': skin === 'dark',
          'sweet-popup': true
        }),
        header: 'sweet-title',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-secondary ml-1',
        actions: 'sweet-actions',
        content: 'sweet-content'
      },
      buttonsStyling: false
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        console.log(id)
      }
    })
  }
  const columns = [
    {
      name: intl.formatMessage({ id: 'No.' }),
      sortable: true,
      cell: (row, index) => index + 1,
      center: true,
      maxWidth: '50px'
    },
    {
      name: intl.formatMessage({ id: 'represent' }),
      selector: 'name',
      sortable: true,
      maxWidth: '200px'
    },
    {
      name: intl.formatMessage({ id: 'position' }),
      selector: 'position',
      center: true,
      sortable: true,
      cell: (row) => <span>{row?.position?.label}</span>,
      minWidth: '20%'
    },
    {
      name: intl.formatMessage({ id: 'Phone' }),
      selector: 'mobile',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Email' }),
      selector: 'email',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Note' }),
      selector: 'note',
      sortable: true,
      center: true
    },

    {
      name: intl.formatMessage({ id: 'Actions' }),
      selector: '#',
      cell: (row) => (
        <>
          {' '}
          <Badge onClick={handleRedirectToUpdatePage(row.id)}>
            <IconEdit id={`editBtn_${row.id}`} />
          </Badge>
          <Badge onClick={handleDeleteCustomer(row.id)}>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
        </>
      ),
      center: true
    }
  ]
  console.log('data', data)
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="12">
            {false && <PageHeader />}
            <Label className="text-header" for="exampleSelect">
              {intl.formatMessage({ id: 'General Information' })}
            </Label>
          </Col>
        </Row>

        <Row>
          <Col md="4">
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
          <Col md="4">
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
          <Col md="4">
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
          <Col md="4">
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

          <Col md="4">
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
          <Col md="4">
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
          <Col md="4">
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
          <Col md="8">
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
        <Row>
          <Col md="4">
            <Label className="text-header" for="exampleSelect">
              {intl.formatMessage({ id: 'Contact Information' })}
            </Label>
          </Col>
          <Col md={{ size: 2, order: 2, offset: 6 }}>
            <Label className="text-header" for="exampleSelect">
              <InsertInformation onSubmit={handlesubformSubmit}>
                <Button color="transparent" className="button-style">
                  <IconInsert /> {intl.formatMessage({ id: 'Add new contact' })}
                </Button>
              </InsertInformation>
            </Label>
          </Col>
        </Row>
        <Row>
          <Col className="table-height" md="12">
            <Table columns={columns} data={data?.data} className="table-height overflow-auto" />
          </Col>
        </Row>

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
