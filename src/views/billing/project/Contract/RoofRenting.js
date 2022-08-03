import { bool, object } from 'prop-types'
import React from 'react'
import { Plus } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import Table from '@src/views/common/table/CustomDataTable'
import { Badge, Button, Col, Row } from 'reactstrap'
import { PowerSellingContractData } from '../mock-data'
import moment from 'moment'
import { DISPLAY_DATE_FORMAT } from '@src/utility/constants'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import NoDataCOM from '@src/views/common/NoDataCOM'

function RoofRenting({ disabled, intl }) {
  const columns = [
    {
      name: intl.formatMessage({ id: 'No.' }),
      cell: (row, index) => index + 1,
      center: true,
      maxWidth: '50px'
    },
    {
      name: intl.formatMessage({ id: 'Contract number' }),
      selector: 'contractID',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Signed date' }),
      selector: 'signedDate',
      cell: (row) => <span>{moment(row.signedDate).format(DISPLAY_DATE_FORMAT)}</span>,
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Unit-code' }),
      selector: 'customerCode',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Roof rental unit name' }),
      selector: 'companyName',
      sortable: true,
      center: true,
      minWidth: '100px'
    },
    {
      name: intl.formatMessage({ id: 'billing-customer-list-taxCode' }),
      selector: 'taxCode',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Address' }),
      selector: 'address',
      cell: (row) => <span> {row.address}</span>,
      sortable: true,
      center: true,
      minWidth: '350px'
    },
    {
      name: intl.formatMessage({ id: 'Actions' }),
      selector: '#',
      center: true,
      cell: (row) => (
        <>
          {' '}
          <Badge>
            <IconView id={`editBtn_${row.id}`} />
          </Badge>
          <Badge>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
        </>
      )
    }
  ]
  return (
    <>
      {' '}
      <Row className="mb-2 ">
        <Col className="d-flex justify-content-between align-items-end mb-2" xs={12}>
          <h4 className="typo-section">
            <FormattedMessage id="Contract of Roof Renting" />
          </h4>

          <Button.Ripple disabled={disabled} color="primary" className="add-project add-contact-button">
            <Plus className="mr-1" /> <FormattedMessage id="Add roof renting contract" />
          </Button.Ripple>
        </Col>
        <Col xs={12}>
          <Table tableId="project" columns={columns} data={PowerSellingContractData} pagination={null} />
          {!PowerSellingContractData?.length > 0 && <NoDataCOM title={<FormattedMessage id="Add notification of electricity fee now or later" />} />}
        </Col>
      </Row>
    </>
  )
}

RoofRenting.propTypes = {
  intl: object,
  disabled: bool
}

export default injectIntl(RoofRenting)
