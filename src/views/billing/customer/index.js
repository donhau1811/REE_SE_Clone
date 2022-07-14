import React from 'react'
import { Col, Row } from 'reactstrap'
import { injectIntl } from 'react-intl'
import { object } from 'prop-types'
import Table from '@src/views/common/table/CustomDataTable'
import { billElectricArray } from './mock-data'
import './scss/Filter.scss'
import { Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  customWidth: {
    maxWidth: 500,
    fontSize:16,
    background:'#ffffff',
    borderRadius:'3px',
    color:"#486077"
  }
}))

const ProjectTable = ({ intl }) => {
  const classes = useStyles()

  const columns = [
    {
      name: intl.formatMessage({ id: 'No.' }),
      sortable: true,
      cell: (row, index) => index + 1,
      center: true,
      maxWidth: '40px',
      style: { fontSize: '18px' }
    },
    {
      name: intl.formatMessage({ id: 'projectCode' }),
      selector: 'projectCode',
      sortable: true,
      maxWidth: '72px'
    },
    {
      name: intl.formatMessage({ id: 'projectName' }),
      selector: 'name',
      center: true,
      sortable: true,
      cell: (row) => <span>{row.name}</span>
    },
    {
      name: intl.formatMessage({ id: 'Address' }),
      selector: 'address',
      sortable: true,
      center: true,
      cell: (row) => {
        return (
          <>
            <div id={`view_name${row.id}`}>
              {row?.address?.length > 150 ? (
                <Tooltip classes={{ tooltip: classes.customWidth }} title={row.address}>
                  <div className="text">{row.address.slice(0, 150)}...</div>
                </Tooltip>
              ) : (
                row.address
              )}
            </div>
          </>
        )
      }
    },
    {
      name: intl.formatMessage({ id: 'PatternBillElectricity' }),
      selector: 'billElectric',
      sortable: true,
      center: true
    }
  ]

  return (
    <>
      <Row>
        <Col sm="12">
          <Table columns={columns} data={billElectricArray} />
        </Col>
      </Row>
    </>
  )
}

ProjectTable.propTypes = {
  intl: object.isRequired
}

export default injectIntl(ProjectTable)
