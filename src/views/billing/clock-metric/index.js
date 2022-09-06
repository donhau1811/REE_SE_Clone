import {
  ROWS_PER_PAGE_DEFAULT,
  SET_OPERATION_UNIT_PARAMS
} from '@src/utility/constants'
import { object } from 'prop-types'
import { useEffect } from 'react'
import {  injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import {  Col, Row } from 'reactstrap'
import PageHeader from './PageHeader'
import { getListOperationUnit } from './store/actions/index'
import Table from '@src/views/common/table/CustomDataTable'

const OperationUnit = ({ intl }) => {
  const dispatch = useDispatch()
  const { data, params, total } = useSelector((state) => state.company)

  const { pagination = {}, searchValue, filterValue = {} } = params


  const fetchOperationUnit = (payload) => {
    dispatch(
      getListOperationUnit({
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
    fetchOperationUnit(initParams)
    return () => {
      dispatch({
        type: SET_OPERATION_UNIT_PARAMS,
        payload: initParams
      })
    }
  }, [])


  const handleChangePage = (e) => {
    fetchOperationUnit({
      pagination: {
        ...pagination,
        currentPage: e.selected + 1
      }
    })
  }

  const handlePerPageChange = (e) => {
    fetchOperationUnit({
      pagination: {
        rowsPerPage: e.value,
        currentPage: 1
      }
    })
  }


  const handleSort = (column, direction) => {
    fetchOperationUnit({
      sortBy: column.selector,
      sortDirection: direction
    })
  }
  const columns = [
    {
      name: intl.formatMessage({ id: 'Time' }),
      // eslint-disable-next-line no-mixed-operators
      cell: (row, index) => index + (pagination?.currentPage - 1) * pagination.rowsPerPage + 1,
      maxWidth: '50px'
    },
    {
      name: intl.formatMessage({ id: 'meters' }),
      selector: 'code',
      sortable: true
    },
    {
      name: 'Seri',
      sortable: true,
      selector: 'name'
    },
    {
      name: intl.formatMessage({ id: 'Coefficient' }),
      selector: 'taxCode',
      sortable: true,
      center:true
    },
    {
      name: intl.formatMessage({ id: 'Price list' }),
      selector: 'address',
      sortable: true,
      center:true

    },
    {
      name: intl.formatMessage({ id: 'Index p delivered' }),
      selector: 'address',
      sortable: true,
      center:true

    },
    {
      name: intl.formatMessage({ id: 'P index received' }),
      selector: 'address',
      sortable: true,
      center:true

    },
    {
      name: intl.formatMessage({ id: 'Index q delivered' }),
      selector: 'address',
      sortable: true,
      center:true

    },
    {
      name: intl.formatMessage({ id: 'Q index received' }),
      selector: 'address',
      sortable: true,
      center:true

    },
    {
      name: intl.formatMessage({ id: 'P max' }),
      selector: 'phone',
      sortable: true
    },
    {
      name: intl.formatMessage({ id: 'Time P max' }),
      selector: 'phone',
      sortable: true
    }
  
  ]
  return (
    <>
      <Row>
        <Col sm="12">
        <PageHeader   />

          <Table
            tableId="operation-unit"
            columns={columns}
            data={data}
            total={total}
            onPageChange={handleChangePage}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            isSearching={searchValue?.trim() || filterValue !== {}}
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
