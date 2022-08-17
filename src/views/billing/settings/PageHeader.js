import { func, object, string } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { Col, Input, Row, UncontrolledTooltip } from 'reactstrap'
import InputGroupAddon from 'reactstrap/es/InputGroupAddon'
import InputGroupText from 'reactstrap/es/InputGroupText'
import InputGroup from 'reactstrap/es/InputGroup'
import { ReactComponent as IconSearch } from '@src/assets/images/svg/table/ic-search.svg'

const PageHeader = ({ intl, searchValue, onSearch }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (searchValue !== value) setValue(searchValue)
  }, [searchValue])

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
          <InputGroup className="input-group-merge">
            <Input
              className=""
              bsSize="sm"
              id="search-input"
              placeholder={intl.formatMessage({ id: 'find by code name settings' })}
              value={value}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchInputKeyDown}
            />
            <InputGroupAddon addonType="append" role="button" >
              <InputGroupText>
                <IconSearch  onClick={handleClickToSearch} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <UncontrolledTooltip placement="top" target={`search-input`}>
            {intl.formatMessage({ id: 'find by code name settings' })}
          </UncontrolledTooltip>
        </Col>
      </Row>
    </>
  )
}

PageHeader.propTypes = {
  intl: object.isRequired,
  searchValue: string,
  onSearch: func
}

export default injectIntl(PageHeader)
