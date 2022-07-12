export const mockData = {
  id: 15,
  state: 'ACTIVE',
  fullName: 'Công ty Cổ phần đầu tư nước Tân Hiệp',
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
  electricityCustomerProjects: [],
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
export const operationUnitArray = [mockData, mockData, mockData].map((item, index) => ({ ...item, id: index + 1 }))
