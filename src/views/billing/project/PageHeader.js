/* eslint-disable no-unused-vars */
import { ReactComponent as IconSearch } from '@src/assets/images/svg/table/ic-search.svg'
import { ROUTER_URL } from '@src/utility/constants'
import { func, object, string } from 'prop-types'
import { useEffect, useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { Button, Col, Input, Row, UncontrolledTooltip } from 'reactstrap'
import InputGroup from 'reactstrap/es/InputGroup'
import InputGroupAddon from 'reactstrap/es/InputGroupAddon'
import InputGroupText from 'reactstrap/es/InputGroupText'

const PageHeader = ({ intl, onSearch = () => {}, searchValue }) => {
  const history = useHistory()
  const [value, setValue] = useState('')

  useEffect(() => {
    if (searchValue !== value) setValue(searchValue)
  }, [searchValue])

  const handleRedirectToAddNewPage = () => {
    history.push(ROUTER_URL.BILLING_PROJECT_CREATE)
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
          {/*  <SearchBar onSearch={onSearch} searchValue={searchValue} placeholder={'project-list-search-input-placeholder'}/>
           */}
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
