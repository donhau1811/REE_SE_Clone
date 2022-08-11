import { API_GET_BILLING_SETTING_VALUE_BY_CODE } from '@src/utility/constants'
import axios from 'axios'
import { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Col, FormFeedback, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { GENERAL_STATUS } from '@src/utility/constants/billing'

const ContractForm4COM = ({ intl }) => {
  const [currencyList, setCurrencyList] = useState([])

  useEffect(async () => {
    const allCurrencyRes = await axios.get(`${API_GET_BILLING_SETTING_VALUE_BY_CODE}/Currency`)
    if (allCurrencyRes.status === 200 && allCurrencyRes.data.data?.values) {
      setCurrencyList(
        (allCurrencyRes.data.data?.values || [])
          .filter((item) => item.state === GENERAL_STATUS.ACTIVE)
          .map((item) => ({
            value: item.value,
            label: item.value
          }))
      )
    }
  }, [])
  const { register, errors, getValues, control } = useFormContext()

  return (
    <>
      <Row>
        <Col className="mb-2" xs={12} lg={4}>
          <Label className="general-label" for="EVNCoefficient">
            <FormattedMessage id="EVN cost coefficient" />
            <span className="text-danger">&nbsp;(*)</span>
          </Label>
          <Input
            id="EVNCoefficient"
            name="EVNCoefficient"
            autoComplete="on"
            innerRef={register()}
            invalid={!!errors.EVNCoefficient}
            valid={getValues('EVNCoefficient')?.trim() && !errors.EVNCoefficient}
            placeholder={intl.formatMessage({ id: 'Enter rate' })}
            min="0"
          />
          {errors?.EVNCoefficient && <FormFeedback className="d-block">{errors?.EVNCoefficient?.message}</FormFeedback>}
        </Col>
      </Row>
      <div className="divider-dashed mb-2" />
      <Row>
        <Col>
          <h4 className="typo-section mb-2">
            <FormattedMessage id="EXCHANGE PRICE" />
          </h4>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="mb-2" xs={12} lg={4}>
          <Label className="general-label" for="currency">
            <FormattedMessage id="Currency" />
            <span className="text-danger">&nbsp;(*)</span>
          </Label>
          <Controller
            as={Select}
            control={control}
            theme={selectThemeColors}
            name="currency"
            id="currency"
            innerRef={register()}
            options={currencyList}
            className="react-select"
            classNamePrefix="select"
            placeholder={intl.formatMessage({ id: 'Choose currency' })}
            formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
          />
          {errors?.currency && <FormFeedback className="d-block">{errors?.currency?.message}</FormFeedback>}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="mb-2" xs={12} lg={4}>
          <Label className="general-label" for="currency">
            <FormattedMessage id="Peak" />
            <span className="text-danger">&nbsp;(*)</span>
          </Label>
          <Input
            id="currencyHigh"
            name="currencyHigh"
            autoComplete="on"
            innerRef={register()}
            invalid={!!errors.currencyHigh}
            valid={getValues('currencyHigh')?.trim() && !errors.currencyHigh}
            placeholder={intl.formatMessage({ id: 'Enter rate' })}
            min="0"
          />
          {errors?.currencyHigh && <FormFeedback className="d-block">{errors?.currencyHigh?.message}</FormFeedback>}
        </Col>
        <Col className="mb-2" xs={12} lg={4}>
          <Label className="general-label" for="currencyMedium">
            <FormattedMessage id="Mid-point" />
            <span className="text-danger">&nbsp;(*)</span>
          </Label>
          <Input
            id="currencyMedium"
            name="currencyMedium"
            autoComplete="on"
            innerRef={register()}
            invalid={!!errors.currencyMedium}
            valid={getValues('currencyMedium')?.trim() && !errors.currencyMedium}
            placeholder={intl.formatMessage({ id: 'Enter rate' })}
            min="0"
          />
          {errors?.currencyMedium && <FormFeedback className="d-block">{errors?.currencyMedium?.message}</FormFeedback>}
        </Col>
        <Col className="mb-2" xs={12} lg={4}>
          <Label className="general-label" for="currencyLow">
            <FormattedMessage id="Idle" />
            <span className="text-danger">&nbsp;(*)</span>
          </Label>
          <Input
            id="currencyLow"
            name="currencyLow"
            autoComplete="on"
            innerRef={register()}
            invalid={!!errors.currencyLow}
            valid={getValues('currencyLow')?.trim() && !errors.currencyLow}
            placeholder={intl.formatMessage({ id: 'Enter rate' })}
            min="0"
          />
          {errors?.currencyLow && <FormFeedback className="d-block">{errors?.currencyLow?.message}</FormFeedback>}
        </Col>
      </Row>
    </>
  )
}

ContractForm4COM.propTypes = {
  intl: object
}

export const ContractForm4 = injectIntl(ContractForm4COM)
