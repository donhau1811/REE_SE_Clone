const BASE_API_URL = process.env.REACT_APP_BASE_API_URL
const BASE_API_URL_V2 = process.env.REACT_APP_BASE_API_URL_V2

export const API_GET_USERS = `${BASE_API_URL}/glf_user`
export const API_GET_USERS_ACTIVITIES = `${BASE_API_URL}/glf_activity`
export const API_GET_USER_INFO = `${BASE_API_URL}/glf_user`
export const API_POST_USER_INFO = `${BASE_API_URL}/glf_user`
export const API_PUT_USER_INFO = `${BASE_API_URL}/glf_user`
export const API_DELETE_USER = `${BASE_API_URL}/glf_user`
export const API_GET_SYSTEM_ALERT_SETTING = `${BASE_API_URL}/glf_user_setting`
export const API_POST_SYSTEM_ALERT_SETTING = `${BASE_API_URL}/glf_user_setting`
export const API_GET_GENERAL_SETTING = `${BASE_API_URL}/glf_user_general_setting`
export const API_POST_GENERAL_SETTING = `${BASE_API_URL}/glf_user_general_setting`
export const API_PUT_GENERAL_SETTING = `${BASE_API_URL}/glf_user_general_setting`
export const API_CHANGE_PASSWORD = `${BASE_API_URL}/glf_change_password`
export const API_RESET_PASSWORD = `${BASE_API_URL}/glf_reset_password`
export const API_POST_MEDIA = `${BASE_API_URL}/glf_media`

export const API_GET_SENSOR = `${BASE_API_URL}/glf_sensor`

export const API_GET_PROJECTS = `${BASE_API_URL}/glf_project`
export const API_GET_PROJECT = `${BASE_API_URL}/glf_project`
export const API_POST_PROJECT = `${BASE_API_URL}/glf_project`
export const API_PUT_PROJECT = `${BASE_API_URL}/glf_project`
export const API_DELETE_PROJECT = `${BASE_API_URL}/glf_project`
export const API_GET_PROJECT_BY_CUSTOMER = `${BASE_API_URL}/glf_project`
export const API_GET_PROJECT_MONITORING = `${BASE_API_URL}/glf_monitoring_project`

export const API_GET_CUSTOMERS = `${BASE_API_URL}/glf_customer`
export const API_GET_CUSTOMER = `${BASE_API_URL}/glf_customer`
export const API_POST_CUSTOMER = `${BASE_API_URL}/glf_customer`
export const API_PUT_CUSTOMER = `${BASE_API_URL}/glf_customer`
export const API_DELETE_CUSTOMER = `${BASE_API_URL}/glf_customer`

export const API_GET_DEVICE_TYPE_INVERTERS = `${BASE_API_URL}/glf_inverter_type`
export const API_POST_DEVICE_TYPE_INVERTER = `${BASE_API_URL}/glf_inverter_type`
export const API_PUT_DEVICE_TYPE_INVERTER = `${BASE_API_URL}/glf_inverter_type`

export const API_GET_DEVICE_TYPE_PANELS = `${BASE_API_URL}/glf_panel_type`
export const API_POST_DEVICE_TYPE_PANEL = `${BASE_API_URL}/glf_panel_type`
export const API_PUT_DEVICE_TYPE_PANEL = `${BASE_API_URL}/glf_panel_type`

export const API_GET_DEVICES = `${BASE_API_URL}/glf_device`
export const API_GET_DEVICE = `${BASE_API_URL}/glf_device`
export const API_POST_DEVICE = `${BASE_API_URL}/glf_device`
export const API_POST_AUTO_DEVICE = `${BASE_API_URL}/glf_auto_device`
export const API_PUT_DEVICE = `${BASE_API_URL}/glf_device`
export const API_DELETE_DEVICE = `${BASE_API_URL}/glf_device`

export const API_GET_METERS = `${BASE_API_URL}/glf_device`
export const API_GET_METER = `${BASE_API_URL}/glf_device`
export const API_POST_METER = `${BASE_API_URL}/glf_device`
export const API_PUT_METER = `${BASE_API_URL}/glf_device`
export const API_DELETE_METER = `${BASE_API_URL}/glf_device`

export const API_GET_INVERTERS = `${BASE_API_URL}/glf_device`
export const API_GET_INVERTER = `${BASE_API_URL}/glf_device`
export const API_POST_INVERTER = `${BASE_API_URL}/glf_device`
export const API_PUT_INVERTER = `${BASE_API_URL}/glf_device`
export const API_DELETE_INVERTER = `${BASE_API_URL}/glf_device`

export const API_GET_PANELS = `${BASE_API_URL}/glf_device`
export const API_GET_PANEL = `${BASE_API_URL}/glf_device`
export const API_POST_PANEL = `${BASE_API_URL}/glf_device`
export const API_PUT_PANEL = `${BASE_API_URL}/glf_device`
export const API_DELETE_PANEL = `${BASE_API_URL}/glf_device`

export const API_GET_MONITORING_METERS = `${BASE_API_URL}/glf_monitoring`
export const API_GET_MONITORING_METER = `${BASE_API_URL}/glf_monitoring`
export const API_POST_MONITORING_METER = `${BASE_API_URL}/glf_monitoring`
export const API_PUT_MONITORING_METER = `${BASE_API_URL}/glf_monitoring`
export const API_DELETE_MONITORING_METER = `${BASE_API_URL}/glf_monitoring`

export const API_GET_MONITORING_INVERTERS = `${BASE_API_URL}/glf_monitoring`
export const API_GET_MONITORING_INVERTER = `${BASE_API_URL}/glf_monitoring`
export const API_GET_LATEST_MONITORING_INVERTER_BY_ID = `${BASE_API_URL}/glf_monitoring`
export const API_POST_MONITORING_INVERTER = `${BASE_API_URL}/glf_monitoring`
export const API_PUT_MONITORING_INVERTER = `${BASE_API_URL}/glf_monitoring`
export const API_DELETE_MONITORING_INVERTER = `${BASE_API_URL}/glf_monitoring`
export const API_GET_DAILY_YIELD = `${BASE_API_URL}/glf_monitoring_stats`

export const API_GET_MONITORING_PROJECT_CHART = `${BASE_API_URL}/glf_monitoring_chart`
export const API_GET_CHART_FILTER_TEMPLATE = `${BASE_API_URL}/glf_user_filter`
export const API_POST_CHART_FILTER_TEMPLATE = `${BASE_API_URL}/glf_user_filter`
export const API_PUT_CHART_FILTER_TEMPLATE = `${BASE_API_URL}/glf_user_filter`
export const API_DELETE_CHART_FILTER_TEMPLATE = `${BASE_API_URL}/glf_user_filter`

export const API_GET_GROUP = `${BASE_API_URL}/glf_group`

export const API_GET_AUTO_CREATE_PROJECT = `${BASE_API_URL}/glf_auto_project`
export const API_POST_AUTO_CREATE_PROJECT = `${BASE_API_URL}/glf_auto_project`
export const API_PUT_AUTO_CREATE_PROJECT = `${BASE_API_URL}/glf_auto_project`
export const API_GET_PENDING_DELETE_PROJECT = `${BASE_API_URL}/glf_confirm_project`
export const API_DELETE_APPROVE_DELETE_PROJECT = `${BASE_API_URL}/glf_confirm_project`
export const API_GET_PENDING_APPROVE_PROJECT = `${BASE_API_URL}/glf_confirm_project`
export const API_PUT_APPROVE_PENDING_APPROVE_PROJECT = `${BASE_API_URL}/glf_confirm_project`

export const API_GET_ALERTS = `${BASE_API_URL}/glf_alert`
export const API_POST_ALERTS = `${BASE_API_URL}/glf_alert`
export const API_PUT_ALERTS = `${BASE_API_URL}/glf_alert`
export const API_GET_ALERT_NOTES = `${BASE_API_URL}/glf_note_alert`
export const API_POST_ALERT_NOTE = `${BASE_API_URL}/glf_note_alert`

export const API_POST_FIREBASE = `${BASE_API_URL}/glf_firebase`
export const API_GET_MONITORING_LOCATIONS = `${BASE_API_URL}/glf_monitoring_locations`
export const API_GET_ELECTRICITY = `${BASE_API_URL}/glf_electricity`

export const API_GET_EFF_FOR_CHART = `${BASE_API_URL}/glf_monitoring_chart`

export const API_GET_PROJECTS_QUANTITY_REPORT = `${BASE_API_URL}/glf_quantity_report`
export const API_GET_PROJECTS_OPERATIONAL_REPORT = `${BASE_API_URL}/glf_operational_report`
export const API_GET_GENERAL_REPORT = `${BASE_API_URL}/glf_summary_report`

export const API_GET_INDUSTRIAL_AREAS = `${BASE_API_URL}/glf_industrial`
export const API_GET_INVESTORS = `${BASE_API_URL}/glf_investor`
export const API_GET_YIELD_CHART = `${BASE_API_URL}/glf_monitoring_yield_chart`

export const API_GET_INVERTER_TYPES = `${BASE_API_URL}/glf_inverter_type`
export const API_GET_PANEL_TYPES = `${BASE_API_URL}/glf_panel_type`


export const API_GET_OPERATION_UNIT = `${BASE_API_URL_V2}/operation-company/search`
export const CHECK_DUPLICATE_OPRERATION_UNIT_CODE = `${BASE_API_URL_V2}/operation-company/check-code`
export const API_CREATE_OPERATION_UNIT = `${BASE_API_URL_V2}/operation-company/create`
export const API_UPDATE_OPERATION_UNIT = `${BASE_API_URL_V2}/operation-company/update`
export const API_GET_OPERATION_UNIT_BY_ID = `${BASE_API_URL_V2}/operation-company/id`
export const API_DELETE_OPERATING_COMPANY = `${BASE_API_URL_V2}/operation-company/delete`

export const API_CUSTOMER_V2 = `${BASE_API_URL}/glf_customer_v2`


export const API_DELETE_BILLING_CUSTOMER = `${BASE_API_URL}/api/v1/billing/customer`

export const API_BILLING_CUSTOMERS = `${BASE_API_URL}/api/v1/customers`

export const API_ROOF_RETAL_UNIT = `${BASE_API_URL}/api/v1/billing/roof`

export const API_CONTACT_ROOF_RETAL_UNIT = `${BASE_API_URL}/api/v1/billing/roof-contact`

export const API_DELETE_ROOF_RETAL_UNIT = `${BASE_API_URL}/api/v1/billing/customer`

