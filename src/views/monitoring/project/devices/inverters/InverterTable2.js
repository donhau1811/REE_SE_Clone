/* eslint-disable no-confusing-arrow */
// ** React Imports
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getInverters, getInverterTypes } from './store/actions'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Card, Col, Form, Input, Row } from 'reactstrap'
import Select from 'react-select'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

// Constants
import {
  // NORMAL_CHARACTER,
  renderDeviceStatus,
  ROUTER_URL,
  ROWS_PER_PAGE_OPTIONS,
  STATE
  // USER_ABILITY
} from '@constants/index'

import { useQuery } from '@hooks/useQuery'
import CP from '@src/views/common/pagination'
import { numberWithCommas } from '@utils'
import { useForm } from 'react-hook-form'

const InverterTable2 = ({ intl, openForValueModal, selectedInverters, state }) => {
  // ** Store Vars
  const dispatch = useDispatch(),
    query = useQuery(),
    projectId = query.get('projectId') || 137,
    { inverter: store } = useSelector((state) => state)

  const inverterType = useSelector((state) => state?.inverter?.data[0]?.inverterType?.manufacturer)

  // ** States
  const [currentPage, setCurrentPage] = useState(store?.params?.page),
    [rowsPerPage, setRowsPerPage] = useState(store?.params?.rowsPerPage),
    [searchValue] = useState(store?.params?.q),
    [orderBy, setOrderBy] = useState(
      store?.params?.order && store?.params?.order.length ? store?.params?.order.split(' ')[0] : 'name'
    ),
    [sortDirection, setSortDirection] = useState(
      store?.params?.order && store?.params?.order.length ? store?.params?.order.split(' ')[1] : 'asc'
    )

  //Form
  const { register, handleSubmit } = useForm()

  const { register: register2, handleSubmit: handleSubmit2 } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    const entries = Object.entries(data)
    const dataNeeded = entries.find((item) => item[1] !== '')
    const body = {
      control_type: 'power_control',
      // site: projectId,
      site: 'local-debug',
      inverter_type: inverterType,
      // device_sn: dataNeeded[0],
      device_sn: 'A2004250015',
      control_values: { absolute_output_power: dataNeeded[1], percentage_output_power: null }
    }
    console.log(body)
    axios
      .post('http://localhost:5001/api/remote/send_command_to_inverter', body)
      .then((response) => alert(response.data.status.commandExecutionStatus))
      .catch((error) => console.log(error))
  }

  const onSubmit2 = (data) => {
    const entries = Object.entries(data)
    const dataNeeded = entries.find((item) => item[1] !== '')
    const body = {
      control_type: 'power_control',
      // site: projectId,
      site: 'local-debug',
      inverter_type: inverterType,
      // device_sn: dataNeeded[0],
      device_sn: 'B2004250015',
      control_values: { absolute_output_power: null, percentage_output_power: dataNeeded[1] }
    }
    console.log(body)
    axios
      .post('http://localhost:5001/api/remote/send_command_to_inverter', body)
      .then((response) => alert(response.data.status.commandExecutionStatus))
      .catch((error) => console.log(error))
  }

  // Fetch inverter API
  const fetchInverters = (queryParam) => {
    if (!queryParam?.page) {
      setCurrentPage(1)
    }

    const initParam = {
      page: currentPage,
      rowsPerPage,
      q: searchValue,
      order: `${orderBy} ${sortDirection}`,
      state: '*',
      fk: '*',
      projectId,
      ...queryParam
    }

    // ** Set data to store
    dispatch(getInverters(initParam))
  }

  // ** Get data on mount
  useEffect(async () => {
    await Promise.all([fetchInverters(), dispatch(getInverterTypes({ rowsPerPage: -1, state: STATE.ACTIVE }))])
  }, [projectId])

  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    fetchInverters({ page: page.selected + 1 })
    setCurrentPage(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = (e) => {
    const perPage = parseInt(e.value)
    const maxPage = Math.ceil(store.total / perPage)

    if (maxPage < currentPage) {
      setCurrentPage(maxPage)
    }

    setRowsPerPage(perPage)
    fetchInverters({
      page: maxPage < currentPage ? maxPage : currentPage,
      rowsPerPage: perPage
    })
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(store?.total / rowsPerPage)

    return (
      <CP
        totalRows={store?.total || 1}
        previousLabel={''}
        nextLabel={''}
        breakLabel="..."
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName={'pagination react-paginate px-1'}
        pageRange={2}
        nextPagesClassName={'page-item next'}
        nextPagesLinkClassName={'page-link double'}
        nextPagesLabel={''}
        previousPagesClassName={'page-item prev'}
        previousPagesLinkClassName={'page-link double'}
        previousPagesLabel={''}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        handlePerPage={handlePerPage}
        displayUnit={intl.formatMessage({ id: 'Inverter' }).toLowerCase()}
      />
    )
  }

  // Custom sort function
  const customSort = async (column, direction) => {
    setOrderBy(column.selector)
    setSortDirection(direction)
    fetchInverters({ order: `${column.selector} ${direction}` })
  }

  // ** Column header
  const serverSideColumns = [
    {
      name: `${intl.formatMessage({ id: 'Choose the inverter' })}`,
      cell: (row) => {
        return row.state === STATE.ACTIVE ? (
          <Input
            type="checkbox"
            name={row.serialNumber}
            onChange={(e) => {
              const selectedInverter = row.serialNumber
              if (e.target.checked) {
                selectedInverters.push(selectedInverter)
              } else selectedInverters.pop(selectedInverter)
            }}
          />
        ) : (
          <Input type="checkbox" disabled />
        )
      },
      sortable: true,
      center: true,
      minWidth: '130px',
      maxWidth: '130px'
    },
    {
      name: '',
      selector: 'status',
      // eslint-disable-next-line react/display-name
      cell: (row) => renderDeviceStatus(row.status, row.id),
      sortable: true,
      minWidth: '50px',
      maxWidth: '50px'
    },
    {
      name: intl.formatMessage({ id: 'Device name' }),
      selector: 'name',
      // eslint-disable-next-line react/display-name
      cell: (row) => row.state === STATE.ACTIVE ? (
          <Link
            to={{
              pathname: ROUTER_URL.PROJECT_INVERTER_DETAIL,
              search: `projectId=${projectId}&deviceId=${row.id}&typeModel=${row.typeModel}`
            }}
          >
            {row.name}
          </Link>
        ) : (
          row.name
        ),
      sortable: true,
      minWidth: '50px'
    },
    {
      name: intl.formatMessage({ id: 'Serial number' }),
      selector: 'serialNumber',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: `${intl.formatMessage({ id: 'Rated power' })} (kW)`,
      selector: 'nominalActivePower',
      cell: (row) => (row?.inverterType?.power ? numberWithCommas(row?.inverterType?.power / 1000) : '-'),
      sortable: true,
      center: true,
      minWidth: '130px',
      maxWidth: '130px'
    },
    {
      name: `${intl.formatMessage({ id: 'Realtime power' })} (kW)`,
      selector: 'todayActivePower',
      cell: (row) => numberWithCommas(row?.todayActivePower / 1000),
      sortable: true,
      center: true,
      minWidth: '130px',
      maxWidth: '130px'
    },
    {
      name: `${intl.formatMessage({ id: 'Capacity limit' })} (W)`,
      cell: (row) => {
        return row.state === STATE.ACTIVE ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="number"
              name={row.serialNumber}
              {...register(`${row.serialNumber}`)}
              // ref will only get you a reference to the Input component, use innerRef to get a reference to the DOM input (for things like focus management).
              innerRef={register}
            />
          </Form>
        ) : (
          <Input type="number" disabled />
        )
      },
      sortable: true,
      center: true,
      minWidth: '130px',
      maxWidth: '130px'
    },
    {
      name: `${intl.formatMessage({ id: 'Rate limit' })} (%)`,
      cell: (row) => {
        return row.state === STATE.ACTIVE ? (
          <Form onSubmit={handleSubmit2(onSubmit2)}>
            <Input type="number" name={row.serialNumber} {...register2(`${row.serialNumber}`)} innerRef={register2} />
          </Form>
        ) : (
          <Input type="number" disabled />
        )
      },
      sortable: true,
      center: true,
      minWidth: '130px',
      maxWidth: '130px'
    },
    {
      name: intl.formatMessage({ id: 'Status' }),
      selector: 'activated',
      // eslint-disable-next-line react/display-name
      cell: (row) => {
        return row.state === STATE.ACTIVE ? (
          <div className="text-success">
            <FormattedMessage id="Active" />
          </div>
        ) : (
          <div className="text-dark">
            <FormattedMessage id="Inactive" />
          </div>
        )
      },
      sortable: true,
      center: true,
      minWidth: '200px',
      maxWidth: '200px'
    }
  ]

  const visibilityState = state === true ? 'visible' : 'hidden'

  const options2 = [
    { value: 'site', label: 'Dự án' },
    { value: 'device', label: 'Thiết bị' }
  ]

  const options3 = [
    { value: 'absolute_output_power', label: 'Tuyệt đối' },
    { value: 'percentage_output_power', label: 'Tỷ lệ' }
  ]

  return (
    <Card>
      <Row className="mt-1 mb-1">
        <Col md='9' style={{ visibility: visibilityState, display: 'flex' }}>
          <Select classnames options={options2} placeholder="Chọn loại giảm"></Select>
          <Select options={options3} placeholder="Phương thức giới hạn"></Select>
        </Col>

        <Col md="3" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button.Ripple color="primary" onClick={openForValueModal}>
            Cấu hình
          </Button.Ripple>
          <Button.Ripple color="primary">Đặt lịch</Button.Ripple>
        </Col>
      </Row>

      <DataTable
        noHeader
        pagination
        paginationServer
        striped
        className={classnames('react-dataTable react-dataTable--inverters hover', {
          'overflow-hidden': store?.data?.length <= 0
        })}
        fixedHeader
        fixedHeaderScrollHeight="calc(100vh - 400px)"
        columns={serverSideColumns}
        sortIcon={<ChevronDown size={10} />}
        paginationComponent={CustomPagination}
        data={store?.data || []}
        persistTableHead
        noDataComponent={''}
        onSort={customSort}
        sortServer
        defaultSortAsc={sortDirection === 'asc'}
        defaultSortField={orderBy}
      />
    </Card>
  )
}

InverterTable2.propTypes = {
  intl: PropTypes.object.isRequired,
  openForValueModal: PropTypes.func.isRequired,
  selectedInverters: PropTypes.array.isRequired,
  state: PropTypes.bool.isRequired
}

export default injectIntl(InverterTable2)
