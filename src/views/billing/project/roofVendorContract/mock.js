export const typeContract = [
  {
    typeContract: 1
  },
  {
    typeContract: 2,
    startDate: '1995-06-10',
    announcementDate: 3,
    rentalAmount: 20,
    confirmationReminder: 5
  },
  {
    typeContract: 3,
    startDate: '1995-06-10',
    announcementDate: 7,
    rentalAmount: 40,
    confirmationReminder: 9
  },
  {
    typeContract: 4,
    percentTurnover: 20,
    confirmationReminder: 5
  }
]
export const mockRoofVendor = [
  {
    id: 1,
    roofVendorName: 'CTY TNHH LONG THÀNH 1',
    taxCode: 'DX124XD',
    address: 'Việt nam'
  },
  {
    id: 2,
    roofVendorName: 'CTY TNHH LONG THÀNH 2',
    taxCode: 'DX124XD',
    address: 'Việt nam'
  }
]

export const mockContract = [
  {
    id: 1,
    contractCode: 'DA29282',
    effectiveDate: '1995-06-10',
    expirationDate: '1995-06-10',
    typeContract: typeContract[1],
    roofVendor: mockRoofVendor[0]
  },
  {
    id: 2,
    contractCode: 'DA29283',
    effectiveDate: '1995-06-10',
    expirationDate: '1995-06-10',

    typeContract: typeContract[3],
    roofVendor: mockRoofVendor[1]
  }
]
