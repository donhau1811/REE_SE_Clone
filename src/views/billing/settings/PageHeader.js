import { object } from 'prop-types'
import React from 'react'
import {  injectIntl } from 'react-intl'
import {  Col, Input, Row, UncontrolledTooltip } from 'reactstrap'
import InputGroupAddon from 'reactstrap/es/InputGroupAddon'
import InputGroupText from 'reactstrap/es/InputGroupText'
import InputGroup from 'reactstrap/es/InputGroup'
import { ReactComponent as IconSearch } from '@src/assets/images/svg/table/ic-search.svg'


const PageHeader = ({ intl }) => {


  return (
    <>
      <Row className="mb-2">
        <Col lg="4" md="8" className="my-lg-0 mb-1 d-flex justify-content-end align-items-center">


          <InputGroup className="input-group-merge">
            <Input
              className=""
              type="search"
              bsSize="sm"
              id="search-input"
              placeholder={intl.formatMessage({ id: 'operation-unit-list-search-input-placeholder' })}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <IconSearch />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <UncontrolledTooltip placement="top" target={`search-input`}>
            {intl.formatMessage({ id: 'operation-unit-list-search-input-placeholder' })}
          </UncontrolledTooltip>
        </Col>

      </Row>
    </>
  )
}

PageHeader.propTypes = {
  intl: object.isRequired
}

export default injectIntl(PageHeader)
