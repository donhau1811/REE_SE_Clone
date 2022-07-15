import mock from '../mock'
import { paginateArray } from '../utils'
import { OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import { API_COMPANY_UNIT } from '@src/utility/constants'

const companies = [
  {
    id:1,
    name: 'Công ty CP năng lượng Ánh Dương',
    code: 'C001',
    taxCode: '034749292',
    address: '134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 ',
    mobile: '028 238 4478',
    status: {
      value: OPERATION_UNIT_STATUS.ACTIVE,
      label: 'Hoạt động'
    },
    modifiedDate: '06/10/2000'
  },
  {
    id:2,
    name: 'Công ty CP năng lượng Ánh Mặt Trời',
    code: 'C001',
    taxCode: '034749292',
    address: '134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 ',
    mobile: '028 238 4478',
    status: {
      value: OPERATION_UNIT_STATUS.INACTIVE,
      label: 'Không Hoạt động'
    },
    modifiedDate: '06/10/2000'
  },
  {
    id:3,
    name: 'Công ty CP năng lượng Ánh Mặt Trời',
    code: 'C001',
    taxCode: '034749292',
    address: '134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 ',
    mobile: '028 238 4478',
    status: {
        value: OPERATION_UNIT_STATUS.ACTIVE,
        label: 'Hoạt động'
    },
    modifiedDate: '06/10/2000'
  },
  {
    id:4,
    name: 'Công ty CP năng lượng Ánh Mặt Trời',
    code: 'C001',
    taxCode: '034749292',
    address: '134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 ',
    mobile: '028 238 4478',
    status: {
        value: OPERATION_UNIT_STATUS.ACTIVE,
        label: 'Hoạt động'
    },
    modifiedDate: '06/10/2000'
  },
  {
    id:5,
    name: 'Công ty CP năng lượng Ánh Mặt Trời',
    code: 'C001',
    taxCode: '034749292',
    address: '134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 ',
    mobile: '028 238 4478',
    status: {
        value: OPERATION_UNIT_STATUS.ACTIVE,
        label: 'Hoạt động'
    },
    modifiedDate: '06/10/2000'
  },
  {
    id:6,
    name: 'Công ty CP năng lượng Ánh Mặt Trời',
    code: 'C001',
    taxCode: '034749292',
    address: '134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 134 Điện Biên Phủ, Đakao, Q1 ',
    mobile: '028 238 4478',
    status: {
        value: OPERATION_UNIT_STATUS.ACTIVE,
        label: 'Hoạt động'
    },
    modifiedDate: '06/10/2000'
  }
]

mock.onGet(API_COMPANY_UNIT).reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = companies.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.name.toLowerCase().includes(queryLowered) ||
      item.code.toLowerCase().includes(queryLowered) ||
      item.taxCode.toLowerCase().includes(queryLowered) ||
      item.address.toLowerCase().includes(queryLowered) ||
      item.mobile.toLowerCase().includes(queryLowered) 
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

