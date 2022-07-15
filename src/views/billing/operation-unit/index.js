import React, { useEffect } from 'react'
import { Col, Row, UncontrolledTooltip, Badge } from 'reactstrap'
import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import { FormattedMessage, injectIntl } from 'react-intl'
import { object } from 'prop-types'
import Table from '@src/views/common/table/CustomDataTable'
import { OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import moment from 'moment'
import { DISPLAY_DATE_FORMAT, ROUTER_URL } from '@src/utility/constants'
import { useHistory } from 'react-router-dom'
import PageHeader from './PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCompany } from './store/actions/index'
import { STATE as STATUS } from '@constants/common'


const OperationUnit = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.company)

  useEffect(() => {
    Promise.all([
      dispatch(
        getAllCompany({
          fk: '*',
          state: [STATUS.ACTIVE].toString(),
          rowsPerPage: -1
        })
      )
    ])
  }, [])

  const handleRedirectToUpdatePage = (id) => () => {
    if (id) history.push(`${ROUTER_URL.BILLING_OPERATION_UNIT_UPDATE}?id=${id}`)
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
      name: intl.formatMessage({ id: 'operation-unit-form-code' }),
      selector: 'code',
      sortable: true,
      center: true,
      maxWidth: '100px'
    },
    {
      name: intl.formatMessage({ id: 'operation-unit-form-name' }),
      selector: 'name',
      cell: (row) => <span>{row.name}</span>,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'operation-unit-form-taxCode' }),
      selector: 'taxCode',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'operation-unit-form-address' }),
      selector: 'address',
      sortable: true,
      cell: (row) => {
        return (
          <>
            <div id={`view_name${row.id}`}>
              {row?.address?.length > 150 ? `${row.address.slice(0, 150)}...` : row.address}
            </div>
            {row?.address?.length > 150 && (
              <UncontrolledTooltip placement="auto" target={`view_name${row.id}`}>
                <FormattedMessage id={row.address} />
              </UncontrolledTooltip>
            )}
          </>
        )
      },
      minWidth: '320px'
    },
    {
      name: intl.formatMessage({ id: 'operation-unit-form-mobile' }),
      selector: 'mobile',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Status' }),
      selector: 'status',
      sortable: true,
      cell: (row) => {
        return row.status?.value === OPERATION_UNIT_STATUS.ACTIVE ? (
          <Badge pill color="light-success">
            <FormattedMessage id="Active" />
          </Badge>
        ) : (
          <Badge pill color="light-muted">
            <FormattedMessage id="Inactive" />
          </Badge>
        )
      }
    },
    {
      name: intl.formatMessage({ id: 'Update Date' }),
      selector: 'modifiedDate',
      sortable: true,
      cell: (row) => moment(row.modifiedDate).format(DISPLAY_DATE_FORMAT),
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Actions' }),
      selector: '#',
      cell: (row) => (
        <>
          {' '}
          <Badge onClick={handleRedirectToUpdatePage(row.id)}>
            <IconView id={`editBtn_${row.id}`} />
          </Badge>
          <UncontrolledTooltip placement="auto" target={`editBtn_${row.id}`}>
            <FormattedMessage id="Edit Operation Unit" />
          </UncontrolledTooltip>
          <Badge>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
          <UncontrolledTooltip placement="auto" target={`deleteBtn_${row.id}`}>
            <FormattedMessage id="Delete Operation Unit" />
          </UncontrolledTooltip>
        </>
      ),
      center: true
    }
  ]
  return (
    <>
 
      <Row>
        <Col sm="12">
          <PageHeader />
          <Table columns={columns} data={data.data} />
        </Col>
      </Row>
    </>
  )
}

OperationUnit.propTypes = {
  intl: object.isRequired
}

export default injectIntl(OperationUnit)
