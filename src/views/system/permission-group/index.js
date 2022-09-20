import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'
import Table from '@src/views/common/table/CustomDataTable'
import { useEffect, useState } from 'react'
import { FormattedMessage, injectIntl, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Badge, Col, Row, UncontrolledTooltip } from 'reactstrap'
import PageHeader from './PageHeader'
import './styles.scss'
import { DISPLAY_DATE_FORMAT, ROUTER_URL } from '@src/utility/constants'
import { getRoles } from './store/actions'
import moment from 'moment'

const RoofVendor = () => {
  const [dataSearch, setDataSearch] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const { roles, params, total } = useSelector((state) => state.systemRole)

  useEffect(() => {
    setDataSearch(roles)
  }, [roles])

  const fetchRole = (initParams) => {
    dispatch(getRoles(initParams))
  }
  const intl = useIntl()
  useEffect(() => {
    fetchRole()
  }, [])

  const handleSearch = (value) => {
    const dataAfterFilter = roles.filter(
      (item) => item?.name?.toUpperCase()?.includes(value.toUpperCase()) ||
        item?.code?.toUpperCase()?.includes(value.toUpperCase())
    )
    setDataSearch(dataAfterFilter)
    setSearchValue(value)
  }

  const handleRedirectToUpdatePage = (id) => () => {
    if (id) {
      history.push({
        pathname: `${ROUTER_URL.SYSTEM_PERMISSION_GROUP}/${id}`,
        state: {
          allowUpdate: true
        }
      })
    }
  }

  const handleRedirectToViewPage = (id) => () => {
    if (id) {
      history.push(`${ROUTER_URL.SYSTEM_PERMISSION_GROUP}/${id}`)
    }
  }
  const handleChangeValueSearch = (value) => {
    setSearchValue(value)
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
      maxWidth: '180px'
    },
    {
      name: intl.formatMessage({ id: 'Rights group name' }),
      selector: 'name'
    },
    {
      name: intl.formatMessage({ id: 'Created by' }),
      selector: '',
      maxWidth: '200px',
      cell: () => 'System'
    },

    {
      name: intl.formatMessage({ id: 'CreatedDate' }),
      selector: 'createDate',
      maxWidth: '200px',
      cell: (row) => moment(row.createDate).format(DISPLAY_DATE_FORMAT)
    },

    {
      name: intl.formatMessage({ id: 'Application features' }),
      cell: (row) => (row.featuresApply?.length > 100
          ? row.featuresApply
          : `${row.featuresApply?.substring(1, 100)}...`)
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
          <PageHeader
            handleChangeValueSearch={handleChangeValueSearch}
            onSearch={handleSearch}
            searchValue={searchValue}
          />
          <Table
            pagination={false}
            columns={columns}
            data={dataSearch}
            total={total}
            defaultSortAsc={params?.sortDirection === 'asc'}
            isSearching={searchValue?.trim()}
            noDataTitle={intl.formatMessage({ id: 'There are no records to display' })}
          />
        </Col>
      </Row>
    </>
  )
}

RoofVendor.propTypes = {}

export default injectIntl(RoofVendor)
