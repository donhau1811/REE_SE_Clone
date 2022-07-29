import classNames from 'classnames'
import { array, func, number } from 'prop-types'
import React from 'react'
import DataTable from 'react-data-table-component'
import { Code } from 'react-feather'
import Pagination from './Pagination'
import './style.scss'

const Table = ({
  data,
  columns,
  onSort,
  total,
  rowsPerPage = 10,
  currentPage = 1,
  rowsPerPageOptions,
  onPerPageChange,
  onPageChange,
  ...rest
}) => {
  const paginationProps = {
    total,
    rowsPerPage,
    currentPage,
    rowsPerPageOptions,
    handlePerPage: onPerPageChange,
    onPageChange
  }

  const PaginationCOM = () => <Pagination {...paginationProps} />

  return (
    <>
      <DataTable
      
        noHeader
        pagination
        paginationServer
        className={classNames(`react-dataTable react-dataTable--projects hover`, {
          'overflow-hidden': data?.length <= 0
        })}
        fixedHeader
        fixedHeaderScrollHeight="calc(100vh - 340px)"
        columns={columns.filter((item) => !item.isHidden)}
        sortIcon={
          <div className="custom-sort-icon">
            <Code />
          </div>
        }
        paginationComponent={PaginationCOM}
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
  onSort: func,
  total: number,
  rowsPerPage: number,
  currentPage: number,
  rowsPerPageOptions: array,
  onPerPageChange: func,
  onPageChange: func
}

export default Table
