/* eslint-disable no-unused-vars */
import { func, object, string } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Input, Row, UncontrolledTooltip } from 'reactstrap'
import InputGroupAddon from 'reactstrap/es/InputGroupAddon'
import InputGroupText from 'reactstrap/es/InputGroupText'
import InputGroup from 'reactstrap/es/InputGroup'
import { ReactComponent as IconSearch } from '@src/assets/images/svg/table/ic-search.svg'
import { ReactComponent as IconFilter } from '@src/assets/images/svg/table/ic-filter.svg'
import { useHistory } from 'react-router-dom'
import { ROUTER_URL } from '@src/utility/constants'
import Filter from './Filter'
import { i } from 'react-select/dist/index-2af9c02c.esm'

const PageHeader = ({ intl, onSearch = () => {}, onFilter, searchValue }) => {
  const history = useHistory()
  const [value, setValue] = useState('')

  useEffect(() => {
    if (searchValue !== value) setValue(searchValue)
  }, [searchValue])

  const handleRedirectToAddNewPage = () => {
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT_CREATE)
  }

  const handleClickToSearch = () => {
    onSearch?.(value)
  }

  const handleSearchInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleSearchInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      onSearch?.(value)
    }
  }

  return (
    <>
      <Row className="mb-2">
        <Col lg="4" md="8" className="my-lg-0 mb-1 d-flex justify-content-end align-items-center">
          <Filter onSubmit={onFilter}>
            <span className="mr-2 " role="button">
              <IconFilter />
            </span>
          </Filter>

          <InputGroup className="input-group-merge">
            <Input
              className=""
              bsSize="sm"
              id="search-input"
              placeholder={intl.formatMessage({ id: 'operation-unit-list-search-input-placeholder' })}
              value={value}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchInputKeyDown}
            />
            <InputGroupAddon addonType="append" className="" role="button">
              <InputGroupText>
                <IconSearch onClick={handleClickToSearch} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <UncontrolledTooltip placement="top" target={`search-input`}>
            {intl.formatMessage({ id: 'operation-unit-list-search-input-placeholder' })}
          </UncontrolledTooltip>
        </Col>

        <Col lg={{ offset: 4, size: 4 }} md={4} className="d-flex justify-content-end align-items-center">
          <Button.Ripple color="primary" className="add-project" onClick={handleRedirectToAddNewPage}>
            <FormattedMessage id="Add new" />
          </Button.Ripple>
        </Col>
      </Row>
    </>
  )
}

PageHeader.propTypes = {
  intl: object.isRequired,
  onSearch: func,
  onFilter: func,
  searchValue: string
}

export default injectIntl(PageHeader)
