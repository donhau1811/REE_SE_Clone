import React, { useEffect, useState } from 'react'
import { Col, Row, UncontrolledTooltip } from 'reactstrap'
import { FormattedMessage, injectIntl } from 'react-intl'
import { object } from 'prop-types'
import Table from '@src/views/common/table/CustomDataTable'

import { ROWS_PER_PAGE_DEFAULT } from '@src/utility/constants'
import { useDispatch } from 'react-redux'
import { getListProjectByCustomerId } from '../project/store/actions'
import { useParams } from 'react-router-dom'

const ProjectTable = ({ intl }) => {
  const [pagination, setPagination] = useState()
  const [params, setParams] = useState()

  const [total, setTotal] = useState(0)
  const { id } = useParams()
  const [projects, setProjects] = useState([])
  const dispatch = useDispatch()

  const fetchListProject = (payload = {}) => {
    const tempPayload = {
      customerId: id,
      pagination,
      params,
      ...payload
    }
    dispatch(
      getListProjectByCustomerId({
        payload: tempPayload,

        callback: (res) => {
          setProjects(res.data || [])
          setTotal(res?.count || 0)
          setPagination(tempPayload.pagination)
          setParams(tempPayload.params)
        }
      })
    )
  }

  useEffect(() => {
    fetchListProject({
      params: { sortBy: 'code', sortDirection: 'asc' },
      pagination: { rowsPerPage: ROWS_PER_PAGE_DEFAULT, currentPage: 1 }
    })
  }, [])

  const handleChangePage = (e) => {
    fetchListProject({
      pagination: {
        ...pagination,
        currentPage: e.selected + 1
      }
    })
  }

  const handlePerPageChange = (e) => {
    fetchListProject({
      pagination: {
        rowsPerPage: e.value,
        currentPage: 1
      }
    })
  }

  const handleSort = (column, direction) => {
    fetchListProject({
      params: {
        sortBy: column.selector,
        sortDirection: direction
      }
    })
  }
  const columns = [
    {
      name: intl.formatMessage({ id: 'No.' }),
      cell: (row, index) => index + 1,
      maxWidth: '40px',
      center: true
    },
    {
      name: intl.formatMessage({ id: 'projectCode' }),
      selector: 'code',
      sortable: true,
      maxWidth: '150px'
    },
    {
      name: intl.formatMessage({ id: 'projectName' }),
      selector: 'name',

      sortable: true,
      cell: (row) => <span>{row.name}</span>
    },
    {
      name: intl.formatMessage({ id: 'Address' }),
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
      }
    },
    {
      name: intl.formatMessage({ id: 'PatternBillElectricity' }),
      selector: 'contractName',
      sortable: true
    }
  ]

  return (
    <>
      <Row>
        <Col sm="12">
          <Table
            columns={columns}
            data={projects}
            total={total}
            onPageChange={handleChangePage}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            defaultSortAsc={params?.sortDirection === 'asc'}
            defaultSortField={params?.sortBy}
            keyField="contractId"
            {...pagination}
          />
        </Col>
      </Row>
    </>
  )
}

ProjectTable.propTypes = {
  intl: object.isRequired
}

export default injectIntl(ProjectTable)
