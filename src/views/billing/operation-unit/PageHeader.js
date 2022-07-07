import { object } from 'prop-types'
import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Input, Row, UncontrolledTooltip } from 'reactstrap'
import InputGroupAddon from 'reactstrap/es/InputGroupAddon'
import InputGroupText from 'reactstrap/es/InputGroupText'
import InputGroup from 'reactstrap/es/InputGroup'
import { ReactComponent as IconSearch } from '@src/assets/images/svg/table/ic-search.svg'
import { ReactComponent as IconFilter } from '@src/assets/images/svg/table/ic-filter.svg'
import { useHistory } from 'react-router-dom'
import { ROUTER_URL } from '@src/utility/constants'

const PageHeader = ({ intl }) => {
  const history = useHistory()

  const handleRedirectToAddNewPage = () => {
    history.push(ROUTER_URL.BILLING_OPERATION_UNIT_CREATE)
  }
  return (
    <>
      <Row className="mb-1">
        <Col lg="4" md="8" className="my-lg-0 mb-1 d-flex justify-content-end align-items-center">
          <span className="mr-2">
            <IconFilter />
          </span>
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
  intl: object.isRequired
}

export default injectIntl(PageHeader)
