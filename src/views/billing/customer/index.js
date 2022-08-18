import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import { GENERAL_CUSTOMER_TYPE, GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import { ROUTER_URL, ROWS_PER_PAGE_DEFAULT, SET_CUSTOMER_PARAMS } from '@src/utility/constants'
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
import { deleteCustomer, getListCustomer } from './store/actions'
import './styles.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const MySweetAlert = withReactContent(SweetAlert)

const OperationUnit = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    layout: { skin }
  } = useSelector((state) => state)

  const { data, params, total } = useSelector((state) => state.billingCustomer)

  const { pagination = {}, searchValue } = params

  const fetchListCustomers = (payload) => {
    dispatch(
      getListCustomer({
        ...params,
        ...payload
      })
    )
  }
  useEffect(() => {
    const initParamsToFetch = {
      pagination: {
        rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        currentPage: 1
      },
      sortBy: 'code',
      sortDirection: 'asc'
    }
    fetchListCustomers(initParamsToFetch)
    return () => {
      dispatch({
        type: SET_CUSTOMER_PARAMS,
        payload: initParamsToFetch
      })
    }
  }, [])
  const handleRedirectToUpdatePage = (id) => () => {
    if (id) history.push(`${ROUTER_URL.BILLING_CUSTOMER}/${id}`)
  }

  const handleChangePage = (e) => {
    fetchListCustomers({
      pagination: {
        ...pagination,
        currentPage: e.selected + 1
      }
    })
  }

  const handlePerPageChange = (e) => {
    fetchListCustomers({
      pagination: {
        rowsPerPage: e.value,
        currentPage: 1
      }
    })
  }

  const handleSort = (column, direction) => {
    fetchListCustomers({
      sortBy: column.selector,
      sortDirection: direction
    })
  }
  const handleDeleteCustomer = (id) => () => {
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Delete billing customer title' }),
      html: intl.formatMessage({ id: 'Delete billing customer message' }),
      showCancelButton: true,
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
        dispatch(
          deleteCustomer({
            id,
            skin,
            intl,
            callback: () => {
              fetchListCustomers()
            }
          })
        )
      }
    })
  }
  const handleSearch = (value) => {
    fetchListCustomers({
      pagination: {
        ...pagination,
        currentPage: 1
      },
      searchValue: value
    })
  }
  const handleFilter = (value) => {
    fetchListCustomers({
      pagination: {
        ...pagination,
        currentPage: 1
      },
      searchValue: '',
      filterValue: value
    })
  }
  const columns = [
    {
      name: intl.formatMessage({ id: 'No.' }),
      // eslint-disable-next-line no-mixed-operators
      cell: (row, index) => index + (pagination?.currentPage - 1) * pagination.rowsPerPage + 1,
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

      sortable: true,
      cell: (row) => <Link to={`${ROUTER_URL.BILLING_CUSTOMER}/${row.id}`}>{row?.fullName}</Link>,
      minWidth: '360px'
    },
    {
      name: intl.formatMessage({ id: 'Company Type Short' }),
      selector: 'type',
      sortable: true,

      cell: (row) => <span>{GENERAL_CUSTOMER_TYPE.find((item) => item.value === row.type)?.label}</span>,
      minWidth: '150px'
    },
    {
      name: intl.formatMessage({ id: 'billing-customer-list-taxCode' }),
      selector: 'taxCode',
      sortable: true
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
      selector: 'phone',
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
          <Badge pill color="light-success" className="custom-bagde">
            <FormattedMessage id="Active" />
          </Badge>
        ) : (
          <Badge pill color="light-muted" className="custom-bagde">
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
          <PageHeader onFilter={handleFilter} onSearch={handleSearch} searchValue={searchValue} />
          <Table
            columns={columns}
            data={data || []}
            total={total}
            onPageChange={handleChangePage}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            defaultSortAsc={false}
            {...pagination}
          />
        </Col>
      </Row>
    </>
  )
}

OperationUnit.propTypes = {
  intl: object.isRequired
}

export default injectIntl(OperationUnit)
