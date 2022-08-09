import { FormattedMessage } from 'react-intl'
import * as yup from 'yup'

export const ValidateSchemaObj = {
  // contractId: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(50, <FormattedMessage id="max-validate" />),
  // startDate: yup.string().required(<FormattedMessage id="required-validate" />),
  // endDate: yup.string().required(<FormattedMessage id="required-validate" />),
  // // file: yup.array().required(<FormattedMessage id="required-validate" />),
  // customerId: yup.object().required(<FormattedMessage id="required-validate" />),
  // billingCycle: yup.array().of(
  //   yup.object().shape({
  //     start: yup
  //       .string()
  //       .required(<FormattedMessage id="required-validate" />)
  //       .test('limit', <FormattedMessage id="invalid-format-validate" />, (value) => {
  //         return Number(value) >= 1 && Number(value) <= 31
  //       }),
  //     end: yup
  //       .string()
  //       .required(<FormattedMessage id="required-validate" />)
  //       .test('limit', <FormattedMessage id="invalid-format-validate" />, (value) => {
  //         return Number(value) >= 1 && Number(value) <= 31
  //       })
  //   })
  // ),
  // reminderToEnterIndex: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(2, <FormattedMessage id="max-validate" />),
  // reminderCusToConfirm: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(2, <FormattedMessage id="max-validate" />),
  // dateOfPayment: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(2, <FormattedMessage id="max-validate" />),
  // round: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(2, <FormattedMessage id="max-validate" />),
  // vat: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(4, <FormattedMessage id="max-validate" />),
  // peakPrice: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(16, <FormattedMessage id="max-validate" />),
  // midPointPrice: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(16, <FormattedMessage id="max-validate" />),
  // idlePrice: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(16, <FormattedMessage id="max-validate" />),
  // coefficient: yup
  //   .string()
  //   .required(<FormattedMessage id="required-validate" />)
  //   .max(4, <FormattedMessage id="max-validate" />)
}

export const ContractForm2Schema = {
  lossRate: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />)
}
export const ContractForm4Schema = {
  EVNCoefficient: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />),
  currency: yup.object().required(<FormattedMessage id="required-validate" />),
  currencyHigh: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />),
  currencyMedium: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />),
  currencyLow: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />)
}

export const ContractForm5Schema = {
  revenueShareRatio: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />)
}
export const ContractForm7Schema = {
  chargeRate: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />)
}
