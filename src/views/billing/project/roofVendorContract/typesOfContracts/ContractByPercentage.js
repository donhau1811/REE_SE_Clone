import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormFeedback, Col, Row, Label, Input } from 'reactstrap'
import { selectThemeColors } from '@src/utility/Utils'
import Select from 'react-select'
import {bool} from 'prop-types'
import { VALUE_NUMBER_DAY_OF_MONTH } from '@src/utility/constants/billing'

const ContractByPercentage = ({isReadOnly}) => {
  const { register, errors, control, getValues } = useFormContext()
  return (
    <>
      <Row className="justify-content-between">
        <Col className="mb-3 d-flex align-items-center" md={2}>
          <Label className="general-label" >
            <FormattedMessage id="turnover-rate" />
          </Label>
        </Col>
        <Col className="mb-3" md={2}>
        <Input
            disabled={isReadOnly}
            id="percentTurnover"
            name="percentTurnover"
            autoComplete="on"
            innerRef={register()}
            invalid={!!errors.percentTurnover}
            valid={getValues('percentTurnover')?.trim() && !errors.percentTurnover}
            defaultValue={0}
          />
          {errors?.percentTurnover && <FormFeedback>{errors?.percentTurnover?.message}</FormFeedback>}
        </Col>
        <hr className='hrhorizontal45'/>
        <Col className="mb-3 d-flex align-items-center" md={4}>
          <div>
          <Label className="general-label">
            <FormattedMessage id="confirmation-prompt" />
          </Label>
          &nbsp; (
          <FormattedMessage id="Date" />
          ) (
          <FormattedMessage id="From-date-sending-notice" />)
          </div>
        </Col>
        <Col className="mb-3" md={2}>
          <Controller
            isDisabled={isReadOnly}
            as={Select}
            control={control}
            options={VALUE_NUMBER_DAY_OF_MONTH}
            theme={selectThemeColors}
            name="confirmationReminder"
            id="confirmationReminder"
            innerRef={register()}
            className="react-select input2"
            classNamePrefix="select"
            defaultValue={VALUE_NUMBER_DAY_OF_MONTH[0]}
            formatOptionLabel={(option) => <> {option.label}</>}
          />
        </Col>
      </Row>
    </>
  )
}
ContractByPercentage.propTypes = {
  isReadOnly:bool
}

export default injectIntl(ContractByPercentage)
