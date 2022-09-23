import React, { useContext, useState } from 'react'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ReactComponent as IconCalendar } from '@src/assets/images/svg/carlendar.svg'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { Popover } from '@mui/material'
import { any, func } from 'prop-types'
import moment from 'moment'
import { IntlContext } from '@src/utility/context/Internationalization'
import 'moment/locale/vi'

export default function MonthPicker({ value, onChange }) {
  const intlContext = useContext(IntlContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const [valueState, setValueState] = useState(value)
  const [isOpen, setIsOpen] = useState(true)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    onChange?.(valueState)

  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const handleChangeDate = (newValue) => {
    onChange?.(valueState)
    setValueState(newValue)
  }
  const handleKeyPress = (e) => {
    e.preventDefault()
  }
  const handleYearChange = (value) => {
    onChange?.(value)

    setValueState(value)
    setIsOpen(false)
  }
  const handleOpenPopover = () => {
    setIsOpen(true)
  }
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={intlContext.locale}>
        <InputGroup className="input-group-merge" onClick={handleClick}>
          <Input
            className=""
            bsSize="sm"
            id="date-picker-input"
            tabindex="1"
            onKeyDown={handleKeyPress}
            value={moment(valueState).format('MM/YYYY')}
            onChange={handleYearChange}
            onClick={handleOpenPopover}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <IconCalendar onClick={handleOpenPopover} />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <Popover
          id={id}
          open={open && isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <StaticDatePicker
            onYearChange={handleYearChange}
            onClose={handleClose}
            views={['month', 'year']}
            displayStaticWrapperAs="desktop"
            value={valueState}
            openTo="month"
            onChange={handleChangeDate}
          />
        </Popover>
      </LocalizationProvider>
    </>
  )
}

MonthPicker.propTypes = {
  value: any,
  onChange: func
}
