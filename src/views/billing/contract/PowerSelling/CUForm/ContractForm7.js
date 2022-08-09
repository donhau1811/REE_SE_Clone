import { object } from 'prop-types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Col, FormFeedback, Input, Label, Row } from 'reactstrap'

const ContractForm7COM = ({ intl }) => {
  const { register, errors, getValues } = useFormContext()

  return (
    <Row>
      <Col className="mb-2" xs={12} lg={4}>
        <Label className="general-label" for="chargeRate">
          <FormattedMessage id="Charge coefficient" />
        </Label>
        <Input
          id="chargeRate"
          name="chargeRate"
          autoComplete="on"
          innerRef={register()}
          invalid={!!errors.chargeRate}
          valid={getValues('chargeRate')?.trim() && !errors.chargeRate}
          type="number"
          placeholder={intl.formatMessage({ id: 'Enter rate' })}

        />
        {errors?.chargeRate && <FormFeedback className="d-block">{errors?.chargeRate?.message}</FormFeedback>}
      </Col>
    </Row>
  )
}

ContractForm7COM.propTypes = {
  intl: object
}

export const ContractForm7 = injectIntl(ContractForm7COM)
