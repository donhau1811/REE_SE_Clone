// ** Routes Imports
import PagesRoutes from './Pages'
import DashboardRoutes from './Dashboards'
import SettingsRoutes from './Settings'
import { MonitoringRoutes } from './Monitoring'
import { AlertRoutes } from './Alert'
import { ReportRoutes } from './Report'
import SwaggerRoutes from './Swagger'

// ** Document title
const TemplateTitle = '%s - REE Solar Monitoring'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...PagesRoutes,
  ...AlertRoutes,
  ...MonitoringRoutes,
  ...ReportRoutes,
  ...SettingsRoutes,
  ...SwaggerRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
