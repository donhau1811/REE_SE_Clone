// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import customer from '@src/views/settings/customers/store/reducer'
import billingCustomer from '@src/views/billing/customer/store/reducer'
import customerProject from '@src/views/monitoring/projects/store/reducer'
import project from '@src/views/settings/projects/store/reducer'
import user from '@src/views/settings/users/store/reducer'
import meter from '@src/views/monitoring/project/devices/meters/store/reducer'
import inverter from '@src/views/monitoring/project/devices/inverters/store/reducer'
import panel from '@src/views/monitoring/project/devices/panels/store/reducer'
import deviceTypeInverter from '@src/views/settings/device-types/inverter/store/reducer'
import deviceTypePanel from '@src/views/settings/device-types/panel/store/reducer'
import sensorSetting from '@src/views/monitoring/project/store/reducer'
import device from '@src/views/monitoring/project/devices/store/reducer'
import monitoringMeter from '@src/views/monitoring/devices/meter/store/reducer'
import monitoringInverter from '@src/views/monitoring/devices/inverter/store/reducer'
import alert from '@src/views/alert/store/reducer'
import report from '@src/views/report/store/reducer'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  customer,
  customerProject,
  project,
  device,
  meter,
  inverter,
  panel,
  user,
  monitoringMeter,
  monitoringInverter,
  alert,
  report,
  deviceTypeInverter,
  deviceTypePanel,
  sensorSetting,
  billingCustomer
})

export default rootReducer
