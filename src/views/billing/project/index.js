import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import { DISPLAY_DATE_FORMAT, ROUTER_URL, ROWS_PER_PAGE_DEFAULT } from '@src/utility/constants'
import Table from '@src/views/common/table/CustomDataTable'
import classnames from 'classnames'
import moment from 'moment'
import { object } from 'prop-types'
import { useEffect } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Badge, Col, Row, UncontrolledTooltip } from 'reactstrap'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PageHeader from './PageHeader'
import { deleteProject, getListProject } from './store/actions/index'

const MySweetAlert = withReactContent(SweetAlert)

const Project = ({ intl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { data, params, total } = useSelector((state) => state.projects)

  const { pagination = {}, searchValue } = params

  const {
    layout: { skin }
  } = useSelector((state) => state)

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

  const handlePerPageChange = (e) => {
    fetchProject({
      pagination: {
        rowsPerPage: e.value,
        currentPage: 1
      }
    })
  }

  const handleSearch = (value) => {
    fetchProject({
      pagination: {
        ...pagination,
        currentPage: 1
      },
      searchValue: value
    })
  }

  const handleFilter = (value) => {
    fetchProject({
      pagination: {
        ...pagination,
        currentPage: 1
      },
      searchValue: '',
      filterValue: value
    })
  }

  const handleDeleteProject = (id) => () => {
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Delete operating customer title' }),
      text: intl.formatMessage({ id: 'Delete billing information message' }),
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
          deleteProject({
            id,
            skin,
            intl,
            callback: () => {
              fetchProject()
            }
          })
        )
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
      selector: 'customerCompany',
      sortable: true,
      center: true,
      minWidth: '200px'
    },

    {
      name: intl.formatMessage({ id: 'Manager' }),
      selector: 'manager',
      sortable: true,
      minWidth: '200px',
      center: true
    },

    {
      name: intl.formatMessage({ id: 'Operation date' }),
      selector: 'operationDate',
      sortable: true,
      minWidth: '200px',
      cell: (row) => moment(row.modifiedDate).format(DISPLAY_DATE_FORMAT),
      center: true
    },
    {
      name: intl.formatMessage({ id: 'Wattage' }),
      selector: 'wattage',
      sortable: true,
      cell: (row) => `${row.wattage} kWh`,
      center: true
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
            <IconDelete onClick={handleDeleteProject(row.id)} id={`deleteBtn_${row.id}`} />
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
          <PageHeader onSearch={handleSearch} onFilter={handleFilter} searchValue={searchValue} />
          <Table
            tableId="project"
            columns={columns}
            data={data}
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

Project.propTypes = {
  intl: object.isRequired
}

export default injectIntl(Project)
