import mock from '../mock'
import { paginateArray } from '../utils'
import { API_BILLING_CUSTOMERS } from '@src/utility/constants'

const customers = [
  {
    id: 15,
    state: 'ACTIVE',
    fullName: '  ty Cổ phần đầu tư nước Tân Hiệp',
    avatar: null,
    phone: '',
    mobile: null,
    email: '',
    installedPower: null,
    realtimePower: null,
    todayYield: null,
    totalYield: null,
    equivalentHour: null,
    address: '64 Ấp Thới Tây 1, Xã Tân Hiệp, Huyện Hóc Môn, ',
    lat: null,
    lng: null,
    provinceName: null,
    provinceCode: '',
    code: 'NTH',
    createDate: 1634370110000,
    createDateFormatted: '2021-10-16T14:41:50+07:00',
    modifyDate: 1640682671000,
    modifyDateFormatted: '2021-12-28T16:11:11+07:00',
    projects: [],
    partnerProjects: [
      {
        id: 132,
        lat: '10.909612',
        lng: '106.586736',
        code: 'P048',
        name: 'Tân Hiệp 2',
        phone: '',
        provinceCode: 'HCM',
        provinceName: 'Ho Chi Minh city'
      }
    ],
    otherCustomerProjects: [],
    electricityCustomerProjects: [
      {
        id:1,
        projectCode:"DA29282",
        name:"Nhà ăn cảng Long An",
        address:"Đức Hòa , Long An",
        billElectric:"Mẫu 02"
      },
      {
        id:2,
        projectCode:"DA29283",
        name:"Nhà ăn cảng Long An",
        address:`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."`,
        billElectric:"Mẫu 02"
      }
    ],
    users: [
      {
        id: 69,
        avatar: null,
        fullName: 'Tong REE',
        username: 'tong@test.com'
      },
      {
        id: 71,
        avatar: null,
        fullName: 'Huy REE',
        username: 'huy@test.com'
      }
    ]
  },
  {
    id: 16,
    state: 'ACTIVE',
    fullName: '  ty Cổ phần đầu tư nước Tân Hiệp',
    avatar: null,
    phone: '',
    mobile: null,
    email: '',
    installedPower: null,
    realtimePower: null,
    todayYield: null,
    totalYield: null,
    equivalentHour: null,
    address: '64 Ấp Thới Tây 1, Xã Tân Hiệp, Huyện Hóc Môn, ',
    lat: null,
    lng: null,
    provinceName: null,
    provinceCode: '',
    code: 'NTH',
    createDate: 1634370110000,
    createDateFormatted: '2021-10-16T14:41:50+07:00',
    modifyDate: 1640682671000,
    modifyDateFormatted: '2021-12-28T16:11:11+07:00',
    projects: [],
    partnerProjects: [
      {
        id: 132,
        lat: '10.909612',
        lng: '106.586736',
        code: 'P048',
        name: 'Tân Hiệp 2',
        phone: '',
        provinceCode: 'HCM',
        provinceName: 'Ho Chi Minh city'
      }
    ],
    otherCustomerProjects: [],
    electricityCustomerProjects: [
      {
        id:1,
        projectCode:"DA29282",
        name:"Nhà ăn cảng Long An",
        address:"Đức Hòa , Long An",
        billElectric:"Mẫu 02"
      },
      {
        id:2,
        projectCode:"DA29283",
        name:"Nhà ăn cảng Long An",
        address:`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."`,
        billElectric:"Mẫu 02"
      }
    ],
    users: [
      {
        id: 69,
        avatar: null,
        fullName: 'Tong REE',
        username: 'tong@test.com'
      },
      {
        id: 71,
        avatar: null,
        fullName: 'Huy REE',
        username: 'huy@test.com'
      }
    ]
  },
  {
    id: 17,
    state: 'ACTIVE',
    fullName: '  ty Cổ phần đầu tư nước Tân Hiệp',
    avatar: null,
    phone: '',
    mobile: null,
    email: '',
    installedPower: null,
    realtimePower: null,
    todayYield: null,
    totalYield: null,
    equivalentHour: null,
    address: '64 Ấp Thới Tây 1, Xã Tân Hiệp, Huyện Hóc Môn, ',
    lat: null,
    lng: null,
    provinceName: null,
    provinceCode: '',
    code: 'NTH',
    createDate: 1634370110000,
    createDateFormatted: '2021-10-16T14:41:50+07:00',
    modifyDate: 1640682671000,
    modifyDateFormatted: '2021-12-28T16:11:11+07:00',
    projects: [],
    partnerProjects: [
      {
        id: 132,
        lat: '10.909612',
        lng: '106.586736',
        code: 'P048',
        name: 'Tân Hiệp 2',
        phone: '',
        provinceCode: 'HCM',
        provinceName: 'Ho Chi Minh city'
      }
    ],
    otherCustomerProjects: [],
    electricityCustomerProjects: [
      {
        id:1,
        projectCode:"DA29282",
        name:"Nhà ăn cảng Long An",
        address:"Đức Hòa , Long An",
        billElectric:"Mẫu 02"
      },
      {
        id:2,
        projectCode:"DA29283",
        name:"Nhà ăn cảng Long An",
        address:`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."`,
        billElectric:"Mẫu 02"
      }
    ],
    users: [
      {
        id: 69,
        avatar: null,
        fullName: 'Tong REE',
        username: 'tong@test.com'
      },
      {
        id: 71,
        avatar: null,
        fullName: 'Huy REE',
        username: 'huy@test.com'
      }
    ]
  },
  {
    id: 17,
    state: 'ACTIVE',
    fullName: '  ty Cổ phần đầu tư nước Tân Hiệp',
    avatar: null,
    phone: '',
    mobile: null,
    email: '',
    installedPower: null,
    realtimePower: null,
    todayYield: null,
    totalYield: null,
    equivalentHour: null,
    address: '64 Ấp Thới Tây 1, Xã Tân Hiệp, Huyện Hóc Môn, ',
    lat: null,
    lng: null,
    provinceName: null,
    provinceCode: '',
    code: 'NTH',
    createDate: 1634370110000,
    createDateFormatted: '2021-10-16T14:41:50+07:00',
    modifyDate: 1640682671000,
    modifyDateFormatted: '2021-12-28T16:11:11+07:00',
    projects: [],
    partnerProjects: [
      {
        id: 132,
        lat: '10.909612',
        lng: '106.586736',
        code: 'P048',
        name: 'Tân Hiệp 2',
        phone: '',
        provinceCode: 'HCM',
        provinceName: 'Ho Chi Minh city'
      }
    ],
    otherCustomerProjects: [],
    electricityCustomerProjects: [
      {
        id:1,
        projectCode:"DA29282",
        name:"Nhà ăn cảng Long An",
        address:"Đức Hòa , Long An",
        billElectric:"Mẫu 02"
      },
      {
        id:2,
        projectCode:"DA29283",
        name:"Nhà ăn cảng Long An",
        address:`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."`,
        billElectric:"Mẫu 02"
      }
    ],
    users: [
      {
        id: 69,
        avatar: null,
        fullName: 'Tong REE',
        username: 'tong@test.com'
      },
      {
        id: 71,
        avatar: null,
        fullName: 'Huy REE',
        username: 'huy@test.com'
      }
    ]
  }
]

mock.onGet(API_BILLING_CUSTOMERS).reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = customers.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.fullName.toLowerCase().includes(queryLowered) ||
      item.code.toLowerCase().includes(queryLowered) ||
      item.address.toLowerCase().includes(queryLowered) ||
      item.mobile.toLowerCase().includes(queryLowered) 
  )
  /* eslint-enable  */
  return [
    200,
    {
      data: customers,
      paginCompany: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})

