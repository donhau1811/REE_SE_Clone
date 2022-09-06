import { ReactComponent as IconCalendar } from '@src/assets/images/svg/carlendar.svg'
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css'
import { injectIntl } from 'react-intl'
import { func } from 'prop-types'

// eslint-disable-next-line no-unused-vars
const CustomDateRangePicker = ({ onChange = () => {} }) => {
  const change = (item) => {
    console.log('item', item)
    console.log('go he')
  }
  return (
    <>
      <InputGroup className="input-group-merge">
        <DateRangePicker  initialSettings={{ startDate: '01/01/2020', endDate: '01/15/2020' }}>
          <input  onChange={change} id="Meters" name="Meters" type="text" className="form-control" />
        </DateRangePicker>
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <IconCalendar />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </>
  )
}

CustomDateRangePicker.propTypes = {
  onChange: func
}
export default injectIntl(CustomDateRangePicker)
