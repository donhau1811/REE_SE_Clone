import mock from './mock'
import './autoComplete/autoComplete'
import './navbar/navbarSearch'
import './pages/account-settings'
import './cards/card-analytics'
import './cards/card-statistics'
import './jwt'
import './tables/datatables'
import './tables/user-data'
import './operationUnit/companyList'

mock.onAny().passThrough()
