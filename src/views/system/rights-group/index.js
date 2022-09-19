import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'
import Table from '@src/views/common/table/CustomDataTable'
import { useEffect } from 'react'
import { FormattedMessage, injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Badge, Col, Row, UncontrolledTooltip } from 'reactstrap'
import PageHeader from './PageHeader'
import './styles.scss'
import { ROUTER_URL, ROWS_PER_PAGE_DEFAULT, SET_ROOF_RENTAL_UNIT_PARAMS } from '@src/utility/constants'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const RoofVendor = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const { data, params, total } = useSelector((state) => state.roofUnit)

  const { pagination = {}, searchValue } = params || {}

  const fetchRole = () => {}
  const intl = useIntl()
  useEffect(() => {
    const initParams = {
      pagination: {
        rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        currentPage: 1
      },
      sortBy: 'code',
      sortDirection: 'asc'
    }
    fetchRole(initParams)
    return () => {
      // hainm check
      dispatch({
        type: SET_ROOF_RENTAL_UNIT_PARAMS,
        payload: initParams
      })
    }
  }, [])
  const handleChangePage = (e) => {
    fetchRole({
      pagination: {
        ...pagination,
        currentPage: e.selected + 1
      }
    })
  }

  const handlePerPageChange = (e) => {
    fetchRole({
      pagination: {
        rowsPerPage: e.value,
        currentPage: 1
      }
    })
  }

  const handleSearch = (value) => {
    fetchRole({
      pagination: {
        ...pagination,
        currentPage: 1
      },
      searchValue: value
    })
  }
  const handleSort = (column, direction) => {
    fetchRole({
      sortBy: column.selector,
      sortDirection: direction
    })
  }
  const handleRedirectToUpdatePage = (id) => () => {
    if (id) {
      history.push({
        pathname: `${ROUTER_URL.BILLING_ROOF_RENTAL_UNIT}/${id}`,
        state: {
          allowUpdate: true
        }
      })
    }
  }

  const handleRedirectToViewPage = (id) => () => {
    if (id) {
      history.push(`${ROUTER_URL.BILLING_ROOF_RENTAL_UNIT}/${id}`)
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
      name: intl.formatMessage({ id: 'Rights group code' }),
      selector: 'code',
      sortable: true,
      maxWidth: '180px'
    },
    {
      name: intl.formatMessage({ id: 'Rights group name' }),
      selector: 'name',
      sortable: true,
      cell: (row) => <Link to={`${ROUTER_URL.BILLING_ROOF_RENTAL_UNIT}/${row.id}`}>{row?.name}</Link>
    },
    {
      name: intl.formatMessage({ id: 'Created by' }),
      selector: 'taxCode',
      sortable: true,
      maxWidth: '200px'
    },

    {
      name: intl.formatMessage({ id: 'CreatedDate' }),
      selector: 'address',
      sortable: true,
      maxWidth: '200px'
    },

    {
      name: intl.formatMessage({ id: 'Role' }),
      selector: 'phone',
      sortable: true
    },

    {
      name: intl.formatMessage({ id: 'Actions' }),
      selector: '#',
      cell: (row) => (
        <>
          {' '}
          <Badge onClick={handleRedirectToViewPage(row.id)}>
            <IconView id={`editBtn_${row.id}`} />
          </Badge>
          <UncontrolledTooltip placement="auto" target={`editBtn_${row.id}`}>
            <FormattedMessage id="View Project" />
          </UncontrolledTooltip>
          <Badge onClick={handleRedirectToUpdatePage(row.id)}>
            <IconEdit id={`updateBtn_${row.id}`} />
          </Badge>
          <UncontrolledTooltip placement="auto" target={`updateBtn_${row.id}`}>
            <FormattedMessage id="Update Project" />
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
          <PageHeader onSearch={handleSearch} searchValue={searchValue} />
          <Table
            columns={columns}
            data={{}}
            total={total}
            onPageChange={handleChangePage}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            defaultSortAsc={params?.sortDirection === 'asc'}
            isSearching={searchValue?.trim()}
            {...pagination}
            noDataTitle={intl.formatMessage({ id: 'There are no records to display' })}
          />
        </Col>
      </Row>
    </>
  )
}

RoofVendor.propTypes = {
}

export default injectIntl(RoofVendor)
