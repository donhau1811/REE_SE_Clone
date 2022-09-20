/* eslint-disable react/jsx-key */
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import Table from '@src/views/common/table/CustomDataTable'
import { object, bool, func } from 'prop-types'
import { useEffect } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Col, Form, Input, Label, Row } from 'reactstrap'
import { getPermisionRoleByRoleId } from './store/actions'
import './styles.scss'
import { DISPLAY_DATE_FORMAT, ROWS_PER_PAGE_DEFAULT, SET_ROOF_RENTAL_UNIT_PARAMS } from '@src/utility/constants'
import { ReactComponent as IconX } from '@src/assets/images/svg/table/X.svg'
import EditRoleModal from './EditRoleModal'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'
const MySweetAlert = withReactContent(SweetAlert)

const mockDt = [
  { name: 'Quản lý đơn vị cho thuê mái', Role: ['View', 'Update', 'Seen'] },
  { name: 'Quản lý khách hàng', Role: ['View', 'Update', 'Seen'] }
]
const RightGroupCUForm = ({ intl, isReadOnly, onSubmit = () => {}, onCancel = () => {}, initValues }) => {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const { data, params } = useSelector((state) => state.roofUnit)
  const { id } = useParams()
  const {
    handleSubmit,
    formState: { isDirty }
  } = useForm({
    mode: 'onChange'
  })
  const {
    layout: { skin }
  } = useSelector((state) => state)

  const fetchRoofVendor = (payload) => {
    dispatch(
      getPermisionRoleByRoleId({
        ...params,
        ...payload,
        id
      })
    )
  }
  const handleDeleteFeature = (id) => () => {
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Delete billing customer title' }),
      html: intl.formatMessage({ id: 'Delete Feature message' }),
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
        console.log('delete', id)
      }
    })
  }
  useEffect(() => {
    const initParams = {
      pagination: {
        rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        currentPage: 1
      },
      sortBy: 'code',
      sortDirection: 'asc'
    }
    fetchRoofVendor(initParams)
    return () => {
      // hainm check
      dispatch({
        type: SET_ROOF_RENTAL_UNIT_PARAMS,
        payload: initParams
      })
    }
  }, [])

  const columns = [
    {
      name: intl.formatMessage({ id: 'Feature' }),
      cell: (row) => row.name,
      center: true,
      minWidth: '150px'
    },
    {
      name: intl.formatMessage({ id: 'Role' }),
      sortable: true,
      minWidth: '900px',
      cell: (row) => row.Role.map((item) => (
          <Badge pill className="mr-2 badges ">
            {item}
            {!isReadOnly && <IconX className="ml-2 icon-x" id={`rmBtn_${row.id}`} />}
          </Badge>
        ))
    },

    {
      name: intl.formatMessage({ id: 'Actions' }),
      selector: '#',
      cell: (row) => (
        <>
          {' '}
          <Badge>
            {!isReadOnly && <IconDelete onClick={handleDeleteFeature(row.id)} id={`deleteBtn_${row.id}`} />}
          </Badge>
        </>
      ),
      center: true
    }
  ]
  const handleCancel = () => {
    onCancel?.(isDirty)
  }

  const handlSubmitPermisionForm = async (values) => {
    if (isReadOnly) {
      onSubmit?.(initValues)
      return
    }

    onSubmit?.({
      ...values
    })
  }

  return (
    <Form className="billing-form" onSubmit={handleSubmit(handlSubmitPermisionForm)}>
      <Row className="mt-1 justify-content-md-between">
        <Col className="mb-2" md="3">
          <Label className="general-label" for="exampleSelect">
            {intl.formatMessage({ id: 'Rights group code' })}
          </Label>
          <Input disabled className="input" id="name" name="name" autoComplete="on" />
        </Col>
        <Col className="mb-2" md="3">
          <Label className="general-label" for="exampleSelect">
            {intl.formatMessage({ id: 'Rights group name' })}
          </Label>
          <Input disabled={isReadOnly} className="input" id="name" name="name" autoComplete="on" />
        </Col>
        <Col className="mb-2" md="3">
          <Label className="general-label" for="exampleSelect">
            {intl.formatMessage({ id: 'CreatedDate' })}
          </Label>
          <Input disabled defaultValue={moment().format(DISPLAY_DATE_FORMAT)} className="input" id="name" name="name" autoComplete="on" />
        </Col>
        <Col className="mb-2" md="3">
          <Label className="general-label" for="exampleSelect">
            {intl.formatMessage({ id: 'Created by' })}
          </Label>
          <Input disabled defaultValue={"System"} className="input" id="name" name="name" autoComplete="on" />
        </Col>
      </Row>
      <Row className="d-flex justify-content-end">
        <Col md={4} className="d-flex justify-content-end">
          {!isReadOnly && (
            <EditRoleModal>
              <Button.Ripple color="primary" className="add-project btn-choose">
                <FormattedMessage id="Choose Role" />
              </Button.Ripple>
            </EditRoleModal>
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm="12">
          <Table pagination={false} columns={columns} data={mockDt} />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end align-items-center mt-5 mb-2">
          <Button type="submit" color="primary" className="mr-1 px-3">
            {intl.formatMessage({ id: isReadOnly ? 'Update' : 'Save' })}
          </Button>
          <Button onClick={handleCancel} color="secondary">
            {intl.formatMessage({ id: isReadOnly ? 'Back' : 'Cancel' })}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

RightGroupCUForm.propTypes = {
  intl: object.isRequired,
  isReadOnly: bool,
  onSubmit: func,
  onCancel: func,
  initValues: object
}

export default injectIntl(RightGroupCUForm)
