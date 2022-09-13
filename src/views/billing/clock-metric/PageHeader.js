import { func, object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, injectIntl, useIntl } from 'react-intl'
import { Button, Col, Label, Row } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { Form } from 'element-react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../project/store/actions'
import { GENERAL_STATUS } from '@src/utility/constants/billing'
import { getAllCustomer, getListCustomerByProjectId } from '../customer/store/actions'
import { getAllClock, getClockByCustomerAndProjectId } from './store/actions'
import moment from 'moment'
import { DISPLAY_DATE_FORMAT_CALENDAR, ISO_STANDARD_FORMAT } from '@src/utility/constants'
import { DateRangePicker } from 'element-react/next'

// eslint-disable-next-line no-unused-vars, react/prop-types
const PageHeader = ({ onFilter, filterValue, setSelectedClock }) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { control, register, watch, handleSubmit, setValue, getValues } = useForm()
  const [picker, setPicker] = useState([new Date(), new Date()])
  useEffect(() => {
    dispatch(getProjects())
    dispatch(getAllCustomer())
    dispatch(getAllClock())
  }, [])
  const project = useSelector((state) => state.projects.data)
  const custommer = useSelector((state) => state.billingCustomer.data)
  const clock = useSelector((state) => state.billingMeter.data)
  const labelProject = project
    .filter((item) => item.state === GENERAL_STATUS.ACTIVE)
    .map((item) => {
      return { value: item.id, label: item.name }
    })
  const labelCustomer = custommer.map((item) => {
    return { value: item.customerId ? item.customerId : item.id, label: item.fullName }
  })
  const labelClock = clock.map((item) => {
    return { value: item.seri, label: item.name, contractId: item.contractId }
  })

  useEffect(() => {
    if (watch('project')?.value) dispatch(getListCustomerByProjectId({ id: watch('project')?.value }))
  }, [watch('project')])

  useEffect(() => {
    dispatch(
      getClockByCustomerAndProjectId({ projectIds: watch('project')?.value, customerIds: watch('customer')?.value })
    )
  }, [watch('customer'), watch('project')])

  useEffect(() => {
    setValue('clock', labelClock[0])
  }, [watch('customer'), clock])
  useEffect(() => {
    setSelectedClock(getValues('clock')?.contractId)
  }, [watch('clock')])

  const handleFilter = (value) => {
    const newData = {
      serialNumber: value?.clock?.value,
      fromDate: moment(picker[0])?.format(ISO_STANDARD_FORMAT),
      toDate: moment(picker[1])?.format(ISO_STANDARD_FORMAT)
    }
    onFilter(newData)
  }
  const handleChange = (value) => {
    if (value) {
      setPicker(value)
    } 
  }
  return (
    <>
      <Form className="billing-form">
        <Row className="mb-2 justify-content-bettwen">
          <Col md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Project' })}
            </Label>
            <Controller
              as={Select}
              control={control}
              options={labelProject}
              theme={selectThemeColors}
              name="project"
              id="project"
              innerRef={register()}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select projects' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
              noOptionsMessage={() => <FormattedMessage id="There are no records to display" />}
            />
          </Col>
          <Col md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Customer' })}
            </Label>
            <Controller
              as={Select}
              options={labelCustomer}
              control={control}
              theme={selectThemeColors}
              name="customer"
              id="customer"
              innerRef={register()}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select customer' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
              noOptionsMessage={() => <FormattedMessage id="There are no records to display" />}
            />
          </Col>
        </Row>
        <Row className="mb-2 justify-content-bettwen">
          <Col md="4">
            <Label className="general-label" for="">
              {intl.formatMessage({ id: 'Time' })}
            </Label>
            <DateRangePicker
              showClearDate={false}
              autoComplete="on"
              value={picker}
              name="dateRange"
              id="dateRange"
              className="input-group"
              onChange={handleChange}
              disabledDate={(time) => time.getTime() > Date.now()}
              format={DISPLAY_DATE_FORMAT_CALENDAR}
              firstDayOfWeek={1}
            />
          </Col>
          <Col md="4">
            <Label className="general-label" for="">
              {intl.formatMessage({ id: 'Meters' })}
            </Label>
            <Controller
              as={Select}
              control={control}
              options={labelClock}
              theme={selectThemeColors}
              name="clock"
              id="clock"
              innerRef={register()}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select clock' })}
              formatOptionLabel={(option) => <>{intl.formatMessage({ id: option.label })}</>}
              noOptionsMessage={() => <FormattedMessage id="There are no records to display" />}
            />
          </Col>

          <Col lg={{ size: 3 }} md={3} className="d-flex align-items-center mt-2">
            <Button.Ripple color="primary" className="add-project" onClick={handleSubmit(handleFilter)}>
              <FormattedMessage id="Filter data" />
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </>
  )
}

PageHeader.propTypes = {
  intl: object.isRequired,
  onSearch: func,
  onFilter: func,
  filterValue: object,
  setSelectedClock: func
}

export default injectIntl(PageHeader)
