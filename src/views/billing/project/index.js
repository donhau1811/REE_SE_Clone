import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import { ROUTER_URL, ROWS_PER_PAGE_DEFAULT } from '@src/utility/constants'
import { GENERAL_STATUS as PROJECT_STATUS } from '@src/utility/constants/billing'
import Table from '@src/views/common/table/CustomDataTable'
import { object } from 'prop-types'
import { useEffect } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Badge, Col, Row, UncontrolledTooltip } from 'reactstrap'
import PageHeader from './PageHeader'
import { getListProject } from './store/actions/index'


const Project = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { data, params, total } = useSelector((state) => state.projects)

  const { pagination = {}, searchValue } = params


  const fetchProject = (payload) => {
    dispatch(
      getListProject({
        ...params,
        ...payload
      })
    )
  }

  useEffect(() => {
    fetchProject({
      pagination: {
        rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        currentPage: 1,
        sortBy: 'code',
        sortDirection: 'asc'
      }
    })
  }, [])

  const handleRedirectToUpdatePage = (id) => () => {
    if (id) history.push(`${ROUTER_URL.BILLING_PROJECT}/${id}`)
  }
  const handleChangePage = (e) => {
    fetchProject({
      pagination: {
        ...pagination,
        currentPage: e.selected + 1
      }
    })
  }

  const handleNumberPerPageChange = (e) => {
    fetchProject({
      pagination: {
        rowsPerPage: e.value,
        currentPage: 1
      }
    })
  }


  const handleSort = (column, direction) => {
    fetchProject({
      sortBy: column.selector,
      sortDirection: direction
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
      name: intl.formatMessage({ id: 'Project code' }),
      selector: 'code',
      sortable: true,
      center: true,
      minWidth: '100px'
    },
    {
      name: intl.formatMessage({ id: 'Project Name' }),
      sortable: true,
      selector: 'name',
      cell: (row) => <span>{row.name}</span>,
      center: true,
      minWidth: '100px'
    },
    {
      name: intl.formatMessage({ id: 'Address' }),
      selector: 'address',
      sortable: true,
      minWidth: '350px',
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
      name: intl.formatMessage({ id: 'Customer Company' }),
      selector: 'companyName',
      sortable: true,
      center: true,
      minWidth: '200px'
    },

    {
      name: intl.formatMessage({ id: 'Manager' }),
      selector: 'manager',
      sortable: true,
      minWidth: '200px',
      center: true,
      cell: () => <span>{'Trần Văn Việt Anh'}</span>
    },

    {
      name: intl.formatMessage({ id: 'Status' }),
      selector: 'state',
      sortable: true,
      center: true,
      minWidth: '150px',
      cell: (row) => {
        return row.state === PROJECT_STATUS.ACTIVE ? (
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
            <FormattedMessage id="Edit Project" />
          </UncontrolledTooltip>
          <Badge>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
          <UncontrolledTooltip placement="auto" target={`deleteBtn_${row.id}`}>
            <FormattedMessage id="Delete Project" />
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
          <PageHeader searchValue={searchValue} />
          <Table
            tableId="project"
            columns={columns}
            data={data}
            total={total}
            onPageChange={handleChangePage}
            onPerPageChange={handleNumberPerPageChange}
            onSort={handleSort}
            {...pagination}
          />
        </Col>
      </Row>
    </>
  )
}

Project.propTypes = {
  intl: object.isRequired
}

export default injectIntl(Project)
