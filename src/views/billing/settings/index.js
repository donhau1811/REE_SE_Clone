
import { STATE as STATUS } from '@constants/common'
import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import {  ROUTER_URL } from '@src/utility/constants'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import Table from '@src/views/common/table/CustomDataTable'
import { object } from 'prop-types'
import { useEffect } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Badge, Col, Row, UncontrolledTooltip } from 'reactstrap'
import PageHeader from './PageHeader'
import { getAllSettings } from './store/actions'

const OperationUnit = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.settings)

  useEffect(() => {
    Promise.all([
      dispatch(
        getAllSettings({
          fk: '*',
          state: [STATUS.ACTIVE].toString(),
          rowsPerPage: -1
        })
      )
    ])
  }, [])

  const handleRedirectToUpdatePage = (id) => () => {
    if (id) history.push(`${ROUTER_URL.BILLING_SETTING_VIEW}?id=${id}`)
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
      name: intl.formatMessage({ id: 'Config Code' }),
      selector: 'code',
      sortable: true,
      center: true,
      maxWidth: '100px'
    },
    {
      name: intl.formatMessage({ id: 'Config Name' }),
      sortable: true,
      selector: 'name',
      cell: (row) => <span>{row.name}</span>,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'explain' }),
      selector: 'explain',
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Status' }),
      center: true,
      selector: 'state',
      sortable: true,
      cell: (row) => {
        return row.state.value === OPERATION_UNIT_STATUS.ACTIVE ? (
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
