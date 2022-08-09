import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormFeedback, Col, Row, Label, Input } from 'reactstrap'
import { selectThemeColors } from '@src/utility/Utils'
import Select from 'react-select'
import { object, bool } from 'prop-types'
import { VALUE_NUMBER_DAY_OF_MONTH } from '@src/utility/constants/billing'

const MonthlyRents = ({ typeContract, isReadOnly }) => {
  const { register, errors, control, getValues } = useFormContext()
  return (
    <>
      <Row className="justify-content-between">
        <Col className="mb-3 justify-content-start d-flex align-items-center" md={3}>
          <div>
            <Label className="general-label">
              <FormattedMessage id="roof-rental-period" />
            </Label>
            &nbsp; (
            <FormattedMessage id="start-date" />)
          </div>
        </Col>
        <Col className="mb-3" md={2}>
          <Input
            id="startDate"
            name="startDate"
            disabled={isReadOnly}
            autoComplete="on"
            innerRef={register()}
            invalid={!!errors.startDate}
            valid={getValues('startDate')?.trim() && !errors.startDate}
            type="date"
            className="custom-icon-input-date"
          />
          {errors?.startDate && <FormFeedback>{errors?.startDate?.message}</FormFeedback>}
        </Col>
        <Col className="mb-3 justify-content-start d-flex align-items-center" md={3}>
          <div>
            <Label className="general-label">
              <FormattedMessage id="Notice-of-roof-rent" />
            </Label>
            &nbsp; (
            <FormattedMessage id="Date" />
            ) (
            <FormattedMessage id="from-the-last-day" />)
          </div>
        </Col>
        <Col className="mb-3" md={2}>
          <Controller
            isDisabled={isReadOnly}
            as={Select}
            control={control}
            theme={selectThemeColors}
            options={VALUE_NUMBER_DAY_OF_MONTH()}
            name="announcementDate"
            id="announcementDate"
            innerRef={register()}
            className="react-select input2"
            classNamePrefix="select"
            defaultValue={VALUE_NUMBER_DAY_OF_MONTH()[0]}
            formatOptionLabel={(option) => <> {option.label}</>}
          />
        </Col>
      </Row>
      <Row className="justify-content-between">
        <Col className="mb-3 justify-content-start d-flex align-items-center" md={3}>
          <div>
            <Label className="general-label">
              <FormattedMessage id="rental-amount" />
            </Label>
            &nbsp; (
            <FormattedMessage id={typeContract.value === 2 ? 'vnd-month' : 'vnd-quarter'} />)
          </div>
        </Col>
        <Col className="mb-3" md={2}>
          <Input
            disabled={isReadOnly}
            id="rentalAmount"
            name="rentalAmount"
            autoComplete="on"
            innerRef={register()}
            invalid={!!errors.rentalAmount}
            valid={getValues('rentalAmount')?.trim() && !errors.rentalAmount}
            defaultValue={0}
          />
          {errors?.rentalAmount && <FormFeedback>{errors?.rentalAmount?.message}</FormFeedback>}
        </Col>
        <Col className="mb-3 justify-content-start d-flex align-items-center" md={3}>
          <div>
            <Label className="general-label">
              <FormattedMessage id="confirmation-prompt" />
            </Label>
            &nbsp; (
            <FormattedMessage id="Date" />
            ) (
            <FormattedMessage id="from-the-last-day" />)
          </div>
        </Col>
        <Col className="mb-3" md={2}>
          <Controller
            as={Select}
            control={control}
            isDisabled={isReadOnly}
            options={VALUE_NUMBER_DAY_OF_MONTH()}
            theme={selectThemeColors}
            name="confirmationReminder"
            id="confirmationReminder"
            innerRef={register()}
            className="react-select input2"
            classNamePrefix="select"
            defaultValue={VALUE_NUMBER_DAY_OF_MONTH()[0]}
            formatOptionLabel={(option) => <> {option.label}</>}
          />
        </Col>
      </Row>
    </>
  )
}
MonthlyRents.propTypes = {
  typeContract: object.isRequired,
  isReadOnly: bool
}

export default injectIntl(MonthlyRents)
