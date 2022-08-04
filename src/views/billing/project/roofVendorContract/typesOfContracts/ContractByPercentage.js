import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormFeedback, Col, Row, Label } from 'reactstrap'
import { selectThemeColors } from '@src/utility/Utils'
import Select from 'react-select'

let valueNumberOfDay = []
for (let i = 0; i <= 31; i++) {
  valueNumberOfDay = [...valueNumberOfDay, { value: i, label: i }]
}
const ContractByPercentage = () => {
  const { register, errors, control } = useFormContext()
  return (
    <>
      <Row>
        <Col className="mb-3" md={2}>
          <Label className="general-label" >
            <FormattedMessage id="turnover-rate" />
          </Label>
        </Col>
        <Col className="mb-3" md={3}>
        <Controller
            as={Select}
            control={control}
            options={valueNumberOfDay}
            theme={selectThemeColors}
            name="percentTurnover"
            id="percentTurnover"
            innerRef={register()}
            className="react-select input-select"
            classNamePrefix="select"
            defaultValue={valueNumberOfDay[0]}
            formatOptionLabel={(option) => <> {option.label}</>}
          />
          {errors?.rentalAmount && <FormFeedback>{errors?.rentalAmount?.message}</FormFeedback>}
        </Col>
        <hr className='hrhorizontal45'/>
        <Col className="mb-3" md={4}>
          <Label className="general-label">
            <FormattedMessage id="confirmation-prompt" />
          </Label>
          &nbsp; (
          <FormattedMessage id="Date" />
          ) (
          <FormattedMessage id="From-date-sending-notice" />)
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
            defaultValue={valueNumberOfDay[0]}
            formatOptionLabel={(option) => <> {option.label}</>}
          />
        </Col>
      </Row>
    </>
  )
}
ContractByPercentage.propTypes = {
}

export default injectIntl(ContractByPercentage)
