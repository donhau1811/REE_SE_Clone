import React from 'react'
import { Col, Row, UncontrolledTooltip } from 'reactstrap'
import { FormattedMessage, injectIntl } from 'react-intl'
import { object } from 'prop-types'
import Table from '@src/views/common/table/CustomDataTable'
import { billElectricArray } from './mock-data'

const ProjectTable = ({ intl }) => {
  const columns = [
    {
      name: intl.formatMessage({ id: 'No.' }),
      sortable: true,
      cell: (row, index) => index + 1,
      center: true,
      maxWidth: '40px',
      style: { fontSize: '18px' }
    },
    {
      name: intl.formatMessage({ id: 'projectCode' }),
      selector: 'projectCode',
      sortable: true,
      maxWidth: '72px'
    },
    {
      name: intl.formatMessage({ id: 'projectName' }),
      selector: 'name',
      center: true,
      sortable: true,
      cell: (row) => <span>{row.name}</span>
    },
    {
      name: intl.formatMessage({ id: 'Address' }),
      selector: 'address',
      sortable: true,
      center: true,
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
      }
    },
    {
      name: intl.formatMessage({ id: 'PatternBillElectricity' }),
      selector: 'billElectric',
      sortable: true,
      center: true
    }
  ]

  return (
    <>
      <Row>
        <Col sm="12">
          <Table columns={columns} data={billElectricArray} />
        </Col>
      </Row>
    </>
  )
}

ProjectTable.propTypes = {
  intl: object.isRequired
}

export default injectIntl(ProjectTable)
