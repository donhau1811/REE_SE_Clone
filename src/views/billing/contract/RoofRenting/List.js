import { array, bool, func, object } from 'prop-types'
import React from 'react'
import { Plus } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import Table from '@src/views/common/table/CustomDataTable'
import { Badge, Button, Col, Row } from 'reactstrap'
import moment from 'moment'
import { DISPLAY_DATE_FORMAT, ROUTER_URL } from '@src/utility/constants'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import NoDataCOM from '@src/views/common/NoDataCOM'
import { useHistory, useParams } from 'react-router-dom'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'

function RoofRenting({ disabled, intl, data, onDelete }) {
  const { id } = useParams()

  const history = useHistory()
  const handleDeleteContract = (contractItem) => () => {
    onDelete?.(contractItem)
  }
  const handleRedirectUpdatePage = (idUpdate, allowUpdate) => () => {
    if (idUpdate) {
      history.push({
        pathname: ROUTER_URL.BILLING_PROJECT_UPDATE_ROOF_VENDOR.replace(':projectId', id).replace(':id', idUpdate),
        state: {
          allowUpdate
        }
      })
    }
  }
  const columns = [
    {
      name: intl.formatMessage({ id: 'No.' }),
      cell: (row, index) => index + 1,
      center: true,
      maxWidth: '50px'
    },
    {
      name: intl.formatMessage({ id: 'Contract number' }),
      selector: 'code',
      center: true,
      minWidth: '200px'
    },
    {
      name: intl.formatMessage({ id: 'Signed date' }),
      selector: 'startDate',
      cell: (row) => <span>{moment(row.startDate).format(DISPLAY_DATE_FORMAT)}</span>,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Unit-code' }),
      selector: 'customerCode',
      center: true,
      cell: (row) => <span>{row?.roofVendor?.code}</span>
    },
    {
      name: intl.formatMessage({ id: 'Roof rental unit name' }),
      selector: 'companyName',
      center: true,
      minWidth: '300px',
      cell: (row) => <span>{row?.roofVendor?.name}</span>
    },
    {
      name: intl.formatMessage({ id: 'billing-customer-list-taxCode' }),
      selector: 'taxCode',
      center: true,
      cell: (row) => <span>{row?.roofVendor?.taxCode}</span>
    },
    {
      name: intl.formatMessage({ id: 'Address' }),
      selector: 'address',
      center: true,
      minWidth: '350px',
      cell: (row) => <span>{row?.roofVendor?.address}</span>
    },
    {
      name: intl.formatMessage({ id: 'Actions' }),
      selector: '#',
      center: true,
      isHidden: disabled,
      cell: (row) => (
        <>
          {' '}
          <Badge onClick={handleRedirectUpdatePage(row.id)}>
            <IconView id={`editBtn_${row.id}`} />
          </Badge>
          <Badge>
            <IconEdit id={`editBtn_${row.id}`} onClick={handleRedirectUpdatePage(row.id, true)} />
          </Badge>
          <Badge onClick={handleDeleteContract(row)}>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
        </>
      )
    }
  ]
  const handleRedirectToCreateContract = () => {
    history.push(ROUTER_URL.BILLING_PROJECT_CREATE_ROOF_VENDOR.replace(':projectId', id))
  }
  return (
    <>
      {' '}
      <Row className="mb-2 ">
        <Col className="d-flex justify-content-between align-items-end mb-2" xs={12}>
          <h4 className="typo-section">
            <FormattedMessage id="Contract of Roof Renting" />
          </h4>

          <Button.Ripple
            disabled={disabled}
            color="primary"
            className="add-project add-contact-button"
            onClick={handleRedirectToCreateContract}
          >
            <Plus className="mr-1" /> <FormattedMessage id="Add roof renting contract" />
          </Button.Ripple>
        </Col>
        <Col xs={12}>
          <Table tableId="project" columns={columns} data={data} pagination={null} />
          {!data?.length > 0 && (
            <NoDataCOM title={<FormattedMessage id="Add notification of electricity fee now or later" />} />
          )}
        </Col>
      </Row>
    </>
  )
}

RoofRenting.propTypes = {
  intl: object,
  disabled: bool,
  data: array,
  onDelete: func
}

export default injectIntl(RoofRenting)
