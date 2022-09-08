import { ReactComponent as IconCalendar } from '@src/assets/images/svg/carlendar.svg'
import { DISPLAY_DATE_FORMAT } from '@src/utility/constants'
import 'bootstrap-daterangepicker/daterangepicker.css'
import moment from 'moment'
import { bool, func, string } from 'prop-types'
import { useState } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { injectIntl } from 'react-intl'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'

const CustomDateRangePicker = ({ onChange = () => {}, disable, initValue }) => {
  const [dateValue, setDateValue] = useState(
    initValue || `${moment().format(DISPLAY_DATE_FORMAT)} - ${moment().format(DISPLAY_DATE_FORMAT)}`
  )
  const handleCallback = (start, end) => {
    setDateValue(`${start.format(DISPLAY_DATE_FORMAT)} - ${end.format(DISPLAY_DATE_FORMAT)}`)
    onChange(`${start.format(DISPLAY_DATE_FORMAT)} - ${end.format(DISPLAY_DATE_FORMAT)}`)
  }
  return (
    <>
      <InputGroup className="input-group-merge">
        <Input value={dateValue} id="Meters" name="Meters" type="text" />
        {!disable && (
          <InputGroupAddon addonType="append" className="">
            <DateRangePicker
              onCallback={handleCallback}
              initialSettings={{ startDate: moment().format(DISPLAY_DATE_FORMAT), endDate: moment().format(DISPLAY_DATE_FORMAT)}}
            >
              <div className="borderCustom">
                <InputGroupText className="no-boder">
                  <IconCalendar />
                </InputGroupText>
              </div>
            </DateRangePicker>
          </InputGroupAddon>
        )}
      </InputGroup>
    </>
  )
}

CustomDateRangePicker.propTypes = {
  onChange: func,
  disable: bool,
  initValue: string
}
export default injectIntl(CustomDateRangePicker)
