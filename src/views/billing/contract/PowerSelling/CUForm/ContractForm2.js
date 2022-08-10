import { object } from 'prop-types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Col, FormFeedback, Input, Label, Row } from 'reactstrap'

const ContractForm2COM = ({ intl }) => {
  const { register, errors, getValues } = useFormContext()

  return (
    <Row>
      <Col className="mb-2" xs={12} lg={4}>
        <Label className="general-label" for="typeOfClock">
          <FormattedMessage id="Loss rate through transformer (%)" />
        </Label>
        <Input
          id="lossRate"
          name="lossRate"
          autoComplete="on"
          innerRef={register()}
          invalid={!!errors.lossRate}
          valid={getValues('lossRate')?.trim() && !errors.lossRate}
          type="number"
          placeholder={intl.formatMessage({ id: 'Enter rate' })}
        />
        {errors?.lossRate && <FormFeedback className="d-block">{errors?.lossRate?.message}</FormFeedback>}
      </Col>
    </Row>
  )
}

ContractForm2COM.propTypes = {
  intl: object
}

export const ContractForm2 = injectIntl(ContractForm2COM)
