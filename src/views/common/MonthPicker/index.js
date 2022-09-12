/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, Popover, PopoverBody, Tooltip } from 'reactstrap'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ReactComponent as IconCalendar } from '@src/assets/images/svg/carlendar.svg'

import 'moment/locale/vi'
import { FormattedMessage } from 'react-intl'
import { useOnClickOutside } from '@src/utility/hooks/useOnClickOutside'
import { Box, ClickAwayListener } from '@mui/material'

export default function MonthPicker() {
  const [open1, setOpen1] = useState(false)
  const [value, setValue] = useState(null)

  const handleToogleOpen = (e) => {
    e.stopPropagation()
    setOpen1((prevState) => !prevState)
  }

  const handleChange = (val) => {
    setValue(val)

    setTimeout(() => {
      console.log('focus', document.getElementById('date-picker-input'))
      document.getElementById('date-picker-input').focus()
    }, 200)
  }

  const handleCancel = () => {
    setOpen1(false)
  }
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const handleClickAway = () => {
    console.log('fyhj')
    setOpen(false)
  }
  const styles = {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    p: 1,
    bgcolor: 'background.paper'
  }

  return (
    <>
      <ClickAwayListener onClickAway={() => setTimeout(handleClickAway)} disableReactTree>
        <Box sx={{ position: 'relative' }}>
          <button type="button" onClick={handleClick}>
            Open menu dropdown
          </button>
          {open ? <Box sx={styles}>Click me, I will stay visible until you click outside.</Box> : null}
        </Box>
      </ClickAwayListener>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
        <div>
          <DatePicker
            views={['month', 'year']}
            open={open1}
            onChange={handleChange}
            value={value}
            renderInput={({ inputRef, inputProps }) => {
              return (
                <div id="1" ref={inputRef} onClick={handleToogleOpen}>
                  <InputGroup className="input-group-merge">
                    <Input
                      className=""
                      bsSize="sm"
                      id="date-picker-input"
                      defaultValue="abc"
                      {...inputProps}
                      tabindex="1"
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <IconCalendar />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                // <div ref={inputRef} className="d-flex justify-content-between ">
                //   <Input {...inputProps} className="custom-icon-input-date" />
                //   {InputProps?.endAdornment}
                // </div>
              )
            }}
          />
        </div>
      </LocalizationProvider>
    </>
  )
}
