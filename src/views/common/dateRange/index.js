import { ReactComponent as IconCalendar } from '@src/assets/images/svg/carlendar.svg'
import 'bootstrap-daterangepicker/daterangepicker.css'
import moment from 'moment'
import { bool, func, string } from 'prop-types'
import { useState } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { injectIntl } from 'react-intl'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'

const CustomDateRangePicker = ({ onChange = () => {}, disable, initValue }) => {
  const [dateValue, setDateValue] = useState(
    initValue || `${moment().format('DD/MM/YYYY')} - ${moment().format('DD/MM/YYYY')}`
  )
  const handleCallback = (start, end) => {
    setDateValue(`${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}`)
    onChange(`${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}`)
  }
  return (
    <>
      <InputGroup className="input-group-merge">
        <Input value={dateValue} id="Meters" name="Meters" type="text" />
        {!disable && (
          <InputGroupAddon addonType="append" className="">
            <DateRangePicker
              onCallback={handleCallback}
              initialSettings={{ startDate: '01/01/2020', endDate: '01/15/2020' }}
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
