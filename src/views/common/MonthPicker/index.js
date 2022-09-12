import React, { useContext, useEffect, useState } from 'react'
import {  Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
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
  const [valueState, setValueState] = useState()

  useEffect(() => {
    if (value !== valueState) setValueState(value)
  }, [value])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setValueState(valueState)
    onChange?.(valueState)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleChangeDate = (newValue) => {
    setValueState(newValue)
  }

  const handleKeyPress = (e) => {
    e.preventDefault()
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
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <IconCalendar />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <StaticDatePicker
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
