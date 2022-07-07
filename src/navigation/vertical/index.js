// ** Navigation sections imports
import dashboards from './dashboards'
import monitoring from './monitoring'
import report from './report'
import settings from './settings'

// billing
import operatingUnit from './operatingUnit'
import configuration from './configuration'
import customer from './customer'

const solarMonitoringItems = [...dashboards, ...monitoring, ...report, ...settings]
const billingInvoicesItems = [...operatingUnit, ...configuration, ...customer]

const solarMonitoring = [
    {
        id: 'solarMonitoring',
        title: 'SolarMonitoring',
        children: [...solarMonitoringItems]
    }
]

const billing = [
    {
        id: 'billingInvoices',
        title: 'BillingInvoice',
        children: [...billingInvoicesItems]
    }
]
// ** Merge & Export
export default [...solarMonitoring, ...billing]