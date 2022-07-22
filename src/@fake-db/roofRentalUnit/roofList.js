import mock from '../mock'
import { paginateArray } from '../utils'
import {  API_ROOF_RETAL_UNIT } from '@src/utility/constants'

const positionMockData = [
    {
      value: 1,
      label: 'Kế toán trưởng'
    }
  ]
  

const companies = [
  {
    id:1,
    name: 'Nguyen quang huy',
    position: positionMockData[0],
    mobile: '0917 478 994',
    email: 'vuong.ntm@gmail.com',
    note: 'Aliquam erat volutpat'
  },
  {
    id:2,
    name: 'Nguyen quang huy',
    position: positionMockData[0],
    mobile: '0917 478 994',
    email: 'vuong.ntm@gmail.com',
    note: 'Aliquam erat volutpat'
  },
  {
    id:3,
    name: 'Nguyen quang huy',
    position: positionMockData[0],
    mobile: '0917 478 994',
    email: 'vuong.ntm@gmail.com',
    note: 'Aliquam erat volutpat'
  },
  {
    id:4,
    name: 'Nguyen quang huy',
      position: positionMockData[0],
      mobile: '0917 478 994',
      email: 'vuong.ntm@gmail.com',
      note: 'Aliquam erat volutpat'
  },
  {
    id:5,
    name: 'Nguyen quang huy',
    position: positionMockData[0],
    mobile: '0917 478 994',
    email: 'vuong.ntm@gmail.com',
    note: 'Aliquam erat volutpat'
  },
  {
    id:6,
    name: 'Nguyen quang huy',
    position: positionMockData[0],
    mobile: '0917 478 994',
    email: 'vuong.ntm@gmail.com',
    note: 'Aliquam erat volutpat'
  }
]

mock.onDelete(`${API_ROOF_RETAL_UNIT}/:id`).reply(config => {
  return [
    200,
    {
      data: config,
      success: true
    }
  ]
})

mock.onGet(API_ROOF_RETAL_UNIT).reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = companies.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.name.toLowerCase().includes(queryLowered) ||
      item.position.toLowerCase().includes(queryLowered) ||
      item.mobile.toLowerCase().includes(queryLowered) ||
      item.email.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */
  return [
    200,
    {
      data: companies,
      paginCompany: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})

