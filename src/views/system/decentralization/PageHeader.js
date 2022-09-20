import { object, string, func } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, injectIntl, useIntl } from 'react-intl'
import { Col, Row } from 'reactstrap'
import Select from 'react-select'
import SearchBar from '@src/views/common/SearchBar'
import { Controller, useForm } from 'react-hook-form'
import { selectThemeColors } from '@src/utility/Utils'

const PageHeader = ({ onSearch = () => {}, searchValue }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (searchValue !== value) setValue(searchValue)
  }, [searchValue])
  const intl = useIntl()

  const { control, register } = useForm({
    mode: 'onChange'
  })
  return (
    <>
      <Row className="mb-2">
        <Col lg="3" md="6" className="">
          <Controller
            as={Select}
            control={control}
            theme={selectThemeColors}
            name="state"
            id="state"
            innerRef={register()}
            className="react-select"
            classNamePrefix="select"
            placeholder={intl.formatMessage({ id: 'permission-group' })}
            formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
            noOptionsMessage={() => <FormattedMessage id="There are no records to display" />}
          />
        </Col>
        <Col lg="4" md="8" className="my-lg-0 mb-1 d-flex justify-content-end align-items-center">
          <SearchBar
            onSearch={onSearch}
            searchValue={searchValue}
            placeholder={'Find by user'}
          />
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
