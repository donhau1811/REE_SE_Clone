import classNames from 'classnames'
import { array, func } from 'prop-types'
import React from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import Pagination from './Pagination'

const Table = ({ data, columns, onSort, ...rest }) => {
  return (
    <>
      <DataTable
        noHeader
        pagination
        paginationServer
        className={classNames('react-dataTable react-dataTable--customers hover', {
          'overflow-hidden': data?.length <= 0
        })}
        fixedHeader
        fixedHeaderScrollHeight="calc(100vh - 340px)"
        columns={columns}
        sortIcon={<ChevronDown size={10} />}
        paginationComponent={Pagination}
        data={data || []}
        persistTableHead
        noDataComponent={''}
        onSort={onSort}
        sortServer
        {...rest}
      />
    </>
  )
}

Table.propTypes = {
  data: array.isRequired,
  columns: array.isRequired,
  onSort: func
}

export default Table
