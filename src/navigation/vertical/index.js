// ** Navigation sections imports
import dashboards from './dashboards'
import monitoring from './monitoring'
import report from './report'
import settings from './settings'

// ** Merge & Export
export default [...dashboards, ...monitoring, ...report, ...settings]
