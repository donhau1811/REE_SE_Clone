import { object } from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import PageHeader from './PageHeader'
import Table from '@src/views/common/table/CustomDataTable'
import { getClockMetricBySeri } from './store/actions'
import moment from 'moment'

const ClockMetric = ({ intl }) => {
  const dispatch = useDispatch()
  const { meterMetric, params, total } = useSelector((state) => state.billingMeter)

  const { pagination = {}, filterValue = {} } = params
  const fetchClockMetrics = (payload) => {
    dispatch(
      getClockMetricBySeri({
        ...params,
        ...payload
      })
    )
  }

  const handleChangePage = (e) => {
    fetchClockMetrics({
      pagination: {
        ...pagination,
        currentPage: e.selected + 1
      }
    })
  }

  const handlePerPageChange = (e) => {
    fetchClockMetrics({
      pagination: {
        rowsPerPage: e.value,
        currentPage: 1
      }
    })
  }

  const handleSort = (column, direction) => {
    fetchClockMetrics({
      sortBy: column.selector,
      sortDirection: direction
    })
  }
  const handleFilter = (value) => {
    fetchClockMetrics({
      pagination: {
        ...pagination,
        currentPage: 1
      },
      filterValue: value
    })
  }
  const columns = [
    {
      name: intl.formatMessage({ id: 'Time' }),
      // eslint-disable-next-line no-mixed-operators
      cell: (row) => moment(row.createDate).format('DD/MM/YYYY')
    },
    {
      name: intl.formatMessage({ id: 'meters' }),
      selector: 'modelDevice',
      sortable: true
    },
    {
      name: 'Seri',
      sortable: true,
      selector: 'serialNumber'
    },
    {
      name: intl.formatMessage({ id: 'Coefficient' }),
      sortable: true,
      center: true,
      cell : (row) => row.totalActiveEnergy.value
    },
    {
      name: intl.formatMessage({ id: 'Price list' }),
      selector: 'address',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Index p delivered' }),
      selector: 'address',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'P index received' }),
      selector: 'address',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Index q delivered' }),
      selector: 'address',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Q index received' }),
      selector: 'address',
      sortable: true,
      center: true
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
          <PageHeader onFilter={handleFilter} filterValue={filterValue} />

          <Table
            tableId="operation-unit"
            columns={columns}
            data={meterMetric}
            total={total}
            onPageChange={handleChangePage}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            isSearching={filterValue !== {}}
            {...pagination}
            noDataTitle={<FormattedMessage id="No data metric" />}
          />
        </Col>
      </Row>
    </>
  )
}

ClockMetric.propTypes = {
  intl: object.isRequired
}

export default injectIntl(ClockMetric)
