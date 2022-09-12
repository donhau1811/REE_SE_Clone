import { object } from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import PageHeader from './PageHeader'
import Table from '@src/views/common/table/CustomDataTable'
import { getClockMetricBySeri } from './store/actions'
import moment from 'moment'
import { numberWithCommas } from '@src/utility/Utils'
import { useState } from 'react'

const ClockMetric = ({ intl }) => {
  const dispatch = useDispatch()
  const { meterMetric, params, total } = useSelector((state) => state.billingMeter)
  const [isSearching, setIsSearching] = useState(false)
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
    setIsSearching(true)
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
      cell: (row) => moment(row.createDate).format('DD/MM/YYYY H:mm:ss'),
      minWidth: '200px',
      sortable: true,
      selector: 'createDate'
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
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Price list' }),
      selector: 'address',
      sortable: true,
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Index p delivered' }),
      selector: 'totalActiveEnergy',
      sortable: true,
      center: true,
      cell: (row) => numberWithCommas(row.totalActiveEnergy.value / 100)
    },
    {
      name: intl.formatMessage({ id: 'P index received' }),
      sortable: true,
      center: true,
      selector: 'totalActiveEnergySub',

      cell: (row) => numberWithCommas(row.totalActiveEnergySub.value / 100)
    },
    {
      name: intl.formatMessage({ id: 'Index q delivered' }),
      cell: (row) => numberWithCommas(row.totalReactiveEnergyPlusLag.value / 100),
      sortable: true,
      center: true,
      selector: 'totalReactiveEnergyPlusLag'
    },
    {
      name: intl.formatMessage({ id: 'Q index received' }),
      cell: (row) => numberWithCommas(row.totalReactiveEnergySubLead.value / 100),
      sortable: true,
      center: true,
      selector: 'totalReactiveEnergySubLead'
    },
    {
      name: intl.formatMessage({ id: 'P max' }),
      selector: 'totalActiveMdPlus',
      sortable: true,

      cell: (row) => numberWithCommas(row.totalActiveMdPlus.value / 100)
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
            isSearching={JSON.stringify({}) !== "{}"}
            {...pagination}
            noDataTitle={<FormattedMessage id={!isSearching ? 'No data metric' : 'Not found any result. Please try again'} />}
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
