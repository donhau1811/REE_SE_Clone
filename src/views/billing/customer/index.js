import { STATE as STATUS } from '@constants/common'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import { ROUTER_URL } from '@src/utility/constants'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import Table from '@src/views/common/table/CustomDataTable'
import classnames from 'classnames'
import { object } from 'prop-types'
import { useEffect } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Badge, Col, Row, UncontrolledTooltip } from 'reactstrap'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PageHeader from './PageHeader'
import { deleteBillingCustomer, getAllCustomer } from './store/actions'
import './styles.scss'

const MySweetAlert = withReactContent(SweetAlert)

const OperationUnit = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const data = useSelector((state) => state.billingCustomer)
  useEffect(() => {
    Promise.all([
      dispatch(
        getAllCustomer({
          fk: '*',
          state: [STATUS.ACTIVE].toString(),
          rowsPerPage: -1
        })
      )
    ])
  }, [])
  const handleRedirectToUpdatePage = (id) => () => {
    if (id) history.push(`${ROUTER_URL.BILLING_CUSTOMER_VIEW}?id=${id}`)
  }
  const handleDeleteCustomer = (id) => () => {
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Delete billing customer title' }),
      html: intl.formatMessage({ id: 'Delete billing customer message' }),
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
        dispatch(deleteBillingCustomer({
          id,
          skin,
          intl
        }))
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
      name: intl.formatMessage({ id: 'Customer Code' }),
      selector: 'code',
      sortable: true,
      maxWidth: '100px'
    },
    {
      name: intl.formatMessage({ id: 'Customer Company' }),
      selector: 'fullName',
      center: true,
      sortable: true,
      cell: (row) => <span>{row.fullName}</span>,
      minWidth: '360px'
    },
    {
      name: intl.formatMessage({ id: 'Company Type Short' }),
      selector: 'type',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'billing-customer-list-taxCode' }),
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
      selector: 'state',
      sortable: true,
      center: true,
      minWidth: '150px',
      cell: (row) => {
        return row.state === OPERATION_UNIT_STATUS.ACTIVE ? (
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
          <Badge onClick={handleDeleteCustomer(row.id)}>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
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
          <Table columns={columns} data={data?.data || []}  />
        </Col>
      </Row>
    </>
  )
}

OperationUnit.propTypes = {
  intl: object.isRequired
}

export default injectIntl(OperationUnit)
