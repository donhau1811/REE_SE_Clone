export const GENERAL_STATUS = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE'
}

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
let valueNumberOfDay = []
for (let i = 0; i <= 31; i++) {
  valueNumberOfDay = [...valueNumberOfDay, { value: i, label: i }]
}
export const VALUE_NUMBER_DAY_OF_MONTH = valueNumberOfDay
