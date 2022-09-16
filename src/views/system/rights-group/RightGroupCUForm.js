/* eslint-disable react/jsx-key */
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import Table from '@src/views/common/table/CustomDataTable'
import { object, bool } from 'prop-types'
import { useEffect } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Col, Input, Label, Row } from 'reactstrap'
import { getPermisionRoleByRoleId, getRoofVendor } from './store/actions'
import './styles.scss'
import { ROWS_PER_PAGE_DEFAULT, SET_ROOF_RENTAL_UNIT_PARAMS } from '@src/utility/constants'
import { ReactComponent as IconX } from '@src/assets/images/svg/table/X.svg'
import EditRoleModal from './EditRoleModal'
import {  useParams } from 'react-router-dom'

const mockDt = [
  { name: 'Quản lý đơn vị cho thuê mái', Role: ['View', 'Update', 'Seen'] },
  { name: 'Quản lý khách hàng', Role: ['View', 'Update', 'Seen'] }
]
const RoofVendor = ({ intl, isReadOnly }) => {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const { data, params } = useSelector((state) => state.roofUnit)
  const { id } = useParams()
  const fetchRoofVendor = (payload) => {
    dispatch(
      getPermisionRoleByRoleId({
        ...id
        ...params,
        ...payload
      })
    )
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
            <IconX className="ml-2 icon-x" id={`deleteBtn_${row.id}`} />

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
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
        </>
      ),
      center: true
    }
  ]

  return (
    <>
      <Row className="mt-1 justify-content-md-between">
        <Col className="mb-2" md="3">
          <Label className="general-label" for="exampleSelect">
            {intl.formatMessage({ id: 'Rights group code' })}
          </Label>
          <Input className="input" id="name" name="name" autoComplete="on" />
        </Col>
        <Col className="mb-2" md="3">
          <Label className="general-label" for="exampleSelect">
            {intl.formatMessage({ id: 'Rights group name' })}
          </Label>
          <Input className="input" id="name" name="name" autoComplete="on" />
        </Col>
        <Col className="mb-2" md="3">
          <Label className="general-label" for="exampleSelect">
            {intl.formatMessage({ id: 'CreatedDate' })}
          </Label>
          <Input className="input" id="name" name="name" autoComplete="on" />
        </Col>
        <Col className="mb-2" md="3">
          <Label className="general-label" for="exampleSelect">
            {intl.formatMessage({ id: 'Created by' })}
          </Label>
          <Input className="input" id="name" name="name" autoComplete="on" />
        </Col>
      </Row>
      <Row className="d-flex justify-content-end">
        <Col md={4} className="d-flex justify-content-end">
            <EditRoleModal>
          <Button.Ripple color="primary" className="add-project btn-choose">
            <FormattedMessage id="Choose Role" />
          </Button.Ripple>
          </EditRoleModal>
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
          <Button color="secondary">{intl.formatMessage({ id: isReadOnly ? 'Back' : 'Cancel' })}</Button>
        </Col>
      </Row>
    </>
  )
}

RoofVendor.propTypes = {
  intl: object.isRequired,
  isReadOnly: bool
}

export default injectIntl(RoofVendor)
