import React from 'react'
import { Button, Card, Col, Row, Input, UncontrolledTooltip } from 'reactstrap'
import InputGroupAddon from 'reactstrap/es/InputGroupAddon'
import InputGroupText from 'reactstrap/es/InputGroupText'
import InputGroup from 'reactstrap/es/InputGroup'
import { ReactComponent as IconSearch } from '@src/assets/images/svg/table/ic-search.svg'
import { ReactComponent as IconFilter } from '@src/assets/images/svg/table/ic-filter.svg'

import { FormattedMessage, injectIntl } from 'react-intl'
import { object } from 'prop-types'
import Table from '@src/views/common/table/CustomDataTable'

const OperationUnit = ({ intl }) => {
  return (
    <>
      <Row>
        <Col sm="12">
          <Card className="p-2 mb-0">
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
                <Button.Ripple color="primary" className="add-project">
                  <FormattedMessage id="Add customer" />
                </Button.Ripple>
              </Col>
            </Row>
           <Table />
       
          </Card>
        </Col>
      </Row>
    </>
  )
}

OperationUnit.propTypes = {
  intl: object.isRequired
}

export default injectIntl(OperationUnit)
