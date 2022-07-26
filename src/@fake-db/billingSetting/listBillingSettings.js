import mock from '../mock'
import { paginateArray } from '../utils'
import { API_BILLING_SETTING } from '@src/utility/constants'
import { GENERAL_STATUS } from '@src/utility/constants/billing'

const setting = [
  {
    id: 1,
    state: { value: GENERAL_STATUS.ACTIVE, label: 'Hoạt động' },
    name: 'Loại khách hàng',
    code: 'cus_type',
    explain:'Cac loại khách hàng của RSE',
    value: [
      {
        id: 1,
        name: 'LOẠI KHÁCH HÀNG ',
        value: 'Doanh ngiệp',
        explain: 'Cac loại khách hàng của RSE',
        state:{ value: GENERAL_STATUS.ACTIVE, label: 'Hoạt động' }
      },
      {
        id: 2,
        name: 'LOẠI KHÁCH HÀNG',
        value: 'CHỦ ĐẦU TƯ ',
        explain: 'Cac loại khách hàng của RSE',
        state: { value: GENERAL_STATUS.ACTIVE, label: 'Hoạt động' }
      }
    ]
  },
  {
    id: 2,
    state: { value: GENERAL_STATUS.ACTIVE, label: 'Hoạt động' },
    name: 'Loại khách hàng',
    code: 'cus_type',
    explain:'Cac loại khách hàng của RSE',
    value: [
      {
        id: 1,
        name: 'LOẠI KHÁCH HÀNG ',
        value: 'Doanh ngiệp',
        explain: 'Cac loại khách hàng của RSE',
        state:{ value: GENERAL_STATUS.ACTIVE, label: 'Hoạt động' }
      },
      {
        id: 2,
        name: 'LOẠI KHÁCH HÀNG',
        value: 'CHỦ ĐẦU TƯ ',
        explain: 'Cac loại khách hàng của RSE',
        state: { value: GENERAL_STATUS.ACTIVE, label: 'Hoạt động' }
      }
    ]
  }

]

mock.onGet(API_BILLING_SETTING).reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = setting.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.name.toLowerCase().includes(queryLowered) ||
      item.value.toLowerCase().includes(queryLowered) ||
      item.state.toLowerCase().includes(queryLowered) 
  )
  /* eslint-enable  */
  return [
    200,
    {
      data: setting,
      paginCompany: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})

