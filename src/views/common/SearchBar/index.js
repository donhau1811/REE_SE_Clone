import { ReactComponent as IconSearch } from '@src/assets/images/svg/table/ic-search.svg'
import { func, object, string } from 'prop-types'
import { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { Input, UncontrolledTooltip } from 'reactstrap'
import InputGroup from 'reactstrap/es/InputGroup'
import InputGroupAddon from 'reactstrap/es/InputGroupAddon'
import InputGroupText from 'reactstrap/es/InputGroupText'
import './index.scss'
import classnames from 'classnames'

const SearchBar = ({ intl, onSearch = () => {}, searchValue, placeholder }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (searchValue !== value) setValue(searchValue)
  }, [searchValue])

  const handleClickToSearch = () => {
    onSearch?.(value.trim())
  }

  const handleSearchInputChange = (e) => {
    
    setValue(e?.target?.value)
  }

  const handleSearchInputKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      onSearch?.(value.trim())
    }
  }
  return (
    <>
      <InputGroup className="input-group-merge">
        <Input
          className=""
          bsSize="sm"
          id="search-input"
          placeholder={intl.formatMessage({ id: placeholder })}
          value={value}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchInputKeyDown}
          type="search"
        />
        <InputGroupAddon addonType="append" className="" role="button">
          <InputGroupText>
            <IconSearch className={classnames({ disable: (value?.length || 0) <= 0 })} onClick={handleClickToSearch} />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <UncontrolledTooltip placement="top" target={`search-input`}>
        {intl.formatMessage({ id: placeholder })}
      </UncontrolledTooltip>
    </>
  )
}

SearchBar.propTypes = {
  intl: object.isRequired,
  onSearch: func,
  searchValue: string,
  placeholder: string.isRequired
}

export default injectIntl(SearchBar)
