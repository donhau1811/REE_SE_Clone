/* eslint-disable no-unused-vars */
import { NUMBER_REGEX, REAL_NUMBER } from '@src/utility/constants'
import { FormattedMessage } from 'react-intl'
import * as yup from 'yup'

export const ValidateSchemaObj = {
  code: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(50, <FormattedMessage id="max-validate" />),
  startDate: yup.string().required(<FormattedMessage id="required-validate" />),
  endDate: yup.string().required(<FormattedMessage id="required-validate" />),
  // file: yup.array().required(<FormattedMessage id="required-validate" />),
  customerId: yup.object().required(<FormattedMessage id="required-validate" />),
  billingCycle: yup.array().of(
    yup.object().shape({
      start: yup.object().required(<FormattedMessage id="required-validate" />),
      end: yup.object().required(<FormattedMessage id="required-validate" />)
    })
  ),
  manualInputAlert: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(2, <FormattedMessage id="max-validate" />)
    .matches(NUMBER_REGEX, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  confirmAlert: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(2, <FormattedMessage id="max-validate" />)
    .matches(NUMBER_REGEX, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  billingAlert: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(2, <FormattedMessage id="max-validate" />)
    .matches(NUMBER_REGEX, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  roundPrecision: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(2, <FormattedMessage id="max-validate" />)
    .matches(NUMBER_REGEX, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  vat: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  peakPrice: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(16, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  midPointPrice: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(16, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  idlePrice: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(16, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  clocks: yup.array(),
  formType: yup.object()
}

export const ContractForm2Schema = {
  lossRate: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  payoutRatio: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    })
}
export const ContractForm3Schema = {
  lossRate: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    })
}

export const ContractForm1Schema = {
  payoutRatio: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(4, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    })
}
export const ContractForm4Schema = {
  unitPriceRate: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(16, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  currency: yup.object().required(<FormattedMessage id="required-validate" />),
  currencyHigh: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(16, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  currencyMedium: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(16, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    }),
  currencyLow: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(16, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    })
}

export const ContractForm5Schema = {
  revenueShareRatio: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(16, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    })
}
export const ContractForm7Schema = {
  chargeRate: yup
    .string()
    .required(<FormattedMessage id="required-validate" />)
    .max(16, <FormattedMessage id="max-validate" />)
    .matches(REAL_NUMBER, {
      message: <FormattedMessage id="invalid-character-validate" />
    })
}
