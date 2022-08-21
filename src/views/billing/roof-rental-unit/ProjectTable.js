import React, { useEffect, useState } from 'react'
import { Col, Row, UncontrolledTooltip } from 'reactstrap'
import { FormattedMessage, injectIntl } from 'react-intl'
import { object } from 'prop-types'
import Table from '@src/views/common/table/CustomDataTable'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getListProjectByRoofVendorId } from '../project/store/actions'

const ProjectTable = ({ intl }) => {
  const { id } = useParams()
  const [projects, setProjects] = useState([])
  const dispatch = useDispatch()
  const [pagination, setPagination] = useState({ rowsPerPage: 25, currentPage: 1 })
  const [params, setParams] = useState({
    sortBy: 'code',
    sortDirection: 'asc'
  })

  const [total, setTotal] = useState(0)

  const fetchListProject = (payload = {}) => {
    const tempPayload = {
      roofVendorId: id,
      pagination,
      params,
      ...payload
    }
    dispatch(
      getListProjectByRoofVendorId({
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
    fetchListProject()
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
      sortable: true,
      cell: (row, index) => index + 1,
      center: true,
      maxWidth: '40px'
    },
    {
      name: intl.formatMessage({ id: 'projectCode' }),
      selector: 'code',
      sortable: true,
      maxWidth: '125px'
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
      selector: 'billElectric',
      cell: (row) => {
        const details = JSON.parse(row.contractDetails)
        return <span>{details?.id || ''}</span>
      }
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
