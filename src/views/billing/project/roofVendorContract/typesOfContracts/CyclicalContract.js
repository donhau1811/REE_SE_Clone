import React, { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormFeedback, Col, Row, Label, Input } from 'reactstrap'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DISPLAY_DATE_FORMAT } from '@src/utility/constants'
import { ReactComponent as Carlendar } from '@src/assets/images/svg/carlendar.svg'
import TextField from '@mui/material/TextField'
import { selectThemeColors } from '@src/utility/Utils'
import Select from 'react-select'
import { object } from 'prop-types'

let valueNumberOfDay = []
for (let i = 0; i <= 31; i++) {
  valueNumberOfDay = [...valueNumberOfDay, { value: i, label: i }]
}
// eslint-disable-next-line no-unused-vars
const MonthlyRents = ({typeContract}) => {
  const { register, errors, control, getValues } = useFormContext()
  const [startDate, setStartDate] = useState(new Date())
  return (
    <>
      <Row className="justify-content-center">
        <Col className="mb-2" md={3}>
          <Label className="general-label">
            <FormattedMessage id="roof-rental-period" />
          </Label>
          &nbsp; (
          <FormattedMessage id="start-date" />)
        </Col>
        <Col className="mb-3" md={3}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              theme={selectThemeColors}
              components={{
                OpenPickerIcon: Carlendar
              }}
              inputVariant="outlined"
              inputFormat={DISPLAY_DATE_FORMAT}
              value={startDate}
              className="input"
              onChange={(value) => setStartDate(value)}
              renderInput={(params) => <TextField  className="border border-secondary rounded input" {...params} />}
            />
            {errors?.test && <FormFeedback>{errors?.test?.message}</FormFeedback>}
          </LocalizationProvider>
          <Input
            value={startDate}
            id="startDate"
            name="startDate"
            autoComplete="on"
            innerRef={register()}
            hidden={true}
          />
        </Col>
        <Col className="mb-3" md={3}>
          <Label className="general-label" >
            <FormattedMessage id="Notice-of-roof-rent" />
          </Label>
          &nbsp; (
          <FormattedMessage id="Date" />
          ) (
          <FormattedMessage id="from-the-last-day" />)
        </Col>
        <Col className="mb-3" md={2}>
          <Controller
            as={Select}
            control={control}
            theme={selectThemeColors}
            options={valueNumberOfDay}
            name="announcementDate"
            id="announcementDate"
            innerRef={register()}
            className="react-select input2"
            classNamePrefix="select"
            defaultValue={valueNumberOfDay[0]}
            formatOptionLabel={(option) => <> {option.label}</>}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="mb-3" md={3}>
          <Label className="general-label" >
            <FormattedMessage id="rental-amount" />
          </Label>
          &nbsp; (
          <FormattedMessage id={typeContract.value === 2 ? 'vnd-month' : 'vnd-quarter'} />)
        </Col>
        <Col className="mb-3" md={3}>
          <Input
            id="rentalAmount"
            name="rentalAmount"
            autoComplete="on"
            innerRef={register()}
            invalid={!!errors.rentalAmount}
            valid={getValues('rentalAmount')?.trim() && !errors.taxCode}
            defaultValue={0}
            className="input"
          />
          {errors?.rentalAmount && <FormFeedback>{errors?.rentalAmount?.message}</FormFeedback>}
        </Col>
        <Col className="mb-3" md={3}>
          <Label className="general-label" >
            <FormattedMessage id="confirmation-prompt" />
          </Label>
          &nbsp; (
          <FormattedMessage id="Date" />
          ) (
          <FormattedMessage id="from-the-last-day" />)
        </Col>
        <Col className="mb-3" md={2}>
          <Controller
            as={Select}
            control={control}
            options={valueNumberOfDay}
            theme={selectThemeColors}
            name="confirmationReminder"
            id="confirmationReminder"
            innerRef={register()}
            className="react-select input2"
            classNamePrefix="select"
            defaultValue={valueNumberOfDay}
            formatOptionLabel={(option) => <> {option.label}</>}
          />
        </Col>
      </Row>
    </>
  )
}
MonthlyRents.propTypes = {
  typeContract: object.isRequired
}

export default injectIntl(MonthlyRents)
