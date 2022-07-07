import React from 'react'
import { Card, Col, Row, UncontrolledTooltip, Badge } from 'reactstrap'

import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import { FormattedMessage, injectIntl } from 'react-intl'
import { object } from 'prop-types'
import Table from '@src/views/common/table/CustomDataTable'
import { operationUnitArray } from './mock-data'
import { OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import moment from 'moment'
import { DISPLAY_DATE_FORMAT, ROUTER_URL } from '@src/utility/constants'
import { useHistory } from 'react-router-dom'
import PageHeader from './PageHeader'

const OperationUnit = ({ intl }) => {
  const history = useHistory()

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
      cell: (row) => <span>{row.name}</span>
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
            <UncontrolledTooltip placement="auto" target={`view_name${row.id}`}>
              <FormattedMessage id={row.address} />
            </UncontrolledTooltip>
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
      selector: '#',
      sortable: true,
      cell: () => moment().format(DISPLAY_DATE_FORMAT),
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Actions' }),
      selector: '#',
      sortable: true,
      cell: (row) => (
        <>
          {' '}
          <Badge onClick={handleRedirectToUpdatePage(row.id)}>
            <IconEdit id={`editBtn_${row.id}`} />
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
          <Card className="p-2 mb-0">
            <PageHeader />
            <Table columns={columns} data={operationUnitArray} />
          </Card>
        </Col>
      </Row>
    </>
  )
}

OperationUnit.propTypes = {
  intl: object.isRequired
}

export default injectIntl(OperationUnit)
