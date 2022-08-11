import { FormattedMessage } from 'react-intl'

export const GENERAL_STATUS = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE'
}

export const GENERAL_STATUS_OPTS = [
  { value: GENERAL_STATUS.ACTIVE, label: 'Active' },
  { value: GENERAL_STATUS.INACTIVE, label: 'Inactive' }
]

export const ENTERPRISE = 'ENTERPRISE'
export const EVN = 'EVN'
export const OTHER = 'OTHER'

export const GENERAL_CUSTOMER_TYPE = [
  {
    label: 'Doanh nghiệp',
    value: ENTERPRISE
  },
  { label: 'EVN', value: EVN },
  { label: 'Khác', value: OTHER }
]
export const POSITION_OPTIONS = [
  {
    value: 'Kế toán trưởng',
    label: 'Kế toán trưởng'
  }
]

export const TypeOfRoofVendorContract = [
  {
    value: 1,
    label: <FormattedMessage id="no-charge" />
  },
  {
    value: 2,
    label: <FormattedMessage id="monthly-rent" />
  },
  {
    value: 3,
    label: <FormattedMessage id="quarterly-rent" />
  },
  {
    value: 4,
    label: <FormattedMessage id="rent-as-percentage-of-revenue" />
  }
]

export const MONTH_OPTIONS = [
  {
    value: 1,
    label: <FormattedMessage id="This month" />
  },
  {
    value: 2,
    label: <FormattedMessage id="Next month" />
  }
]

export const POWER_BILLING_FORM_OPTIONS = [
  {
    value: 1,
    label: <FormattedMessage id="Power billing form number" values={{ number: 1 }} />
  },
  {
    value: 2,
    label: <FormattedMessage id="Power billing form number" values={{ number: 2 }} />
  },
  {
    value: 3,
    label: <FormattedMessage id="Power billing form number" values={{ number: 3 }} />
  },
  {
    value: 4,
    label: <FormattedMessage id="Power billing form number" values={{ number: 4 }} />
  },
  {
    value: 5,
    label: <FormattedMessage id="Power billing form number" values={{ number: 5 }} />
  },
  {
    value: 6,
    label: <FormattedMessage id="Power billing form number" values={{ number: 6 }} />
  },
  {
    value: 7,
    label: <FormattedMessage id="Power billing form number" values={{ number: 7 }} />
  }
]

export const DAYS_OF_MONTH_OPTIONS = Array.from(Array(31)).map((e, i) => ({ value: i + 1, label: i + 1 }))

export const END_OF_MONTH_OPTION =  {
  value: 'endOfMonth',
  label: <FormattedMessage id="End of month" />
}
