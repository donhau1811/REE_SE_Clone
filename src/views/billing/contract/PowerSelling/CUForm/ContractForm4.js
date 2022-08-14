import { object } from 'prop-types'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Col, FormFeedback, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { getSettingValuesByCode } from '@src/views/billing/settings/store/actions'

const ContractForm4COM = ({ intl }) => {
  const { setting } = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(
      getSettingValuesByCode({
        isSavedToState: true,
        code: 'Currency'
      })
    )
  }, [])
  const { register, errors, getValues, control } = useFormContext()

  return (
    <>
      <Row>
        <Col className="mb-2" xs={12} lg={4}>
          <Label className="general-label" for="unitPriceRate">
            <FormattedMessage id="EVN cost coefficient" />
            <span className="text-danger">&nbsp;(*)</span>
          </Label>
          <Input
            id="unitPriceRate"
            name="unitPriceRate"
            autoComplete="on"
            innerRef={register()}
            invalid={!!errors.unitPriceRate}
            valid={getValues('unitPriceRate')?.trim() && !errors.unitPriceRate}
            placeholder={intl.formatMessage({ id: 'Enter rate' })}
            min="0"
          />
          {errors?.unitPriceRate && <FormFeedback className="d-block">{errors?.unitPriceRate?.message}</FormFeedback>}
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
            options={setting.Currency || []}
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
