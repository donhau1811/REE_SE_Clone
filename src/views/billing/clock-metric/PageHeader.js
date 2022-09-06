import { func, object, string } from 'prop-types'
import React, { useEffect } from 'react'
import { FormattedMessage, injectIntl, useIntl } from 'react-intl'
import { Button, Col, Label, Row } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { selectThemeColors } from '@src/utility/Utils'
import { Form } from 'element-react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../project/store/actions'
import { GENERAL_STATUS } from '@src/utility/constants/billing'
import { getListCustomerByProjectId } from '../customer/store/actions'
import 'bootstrap-daterangepicker/daterangepicker.css'
import SelectWithCheckBox from '@src/views/common/SelectWithCheckBox'
import CustomDateRangePicker from '@src/views/common/dateRange'
const PageHeader = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { control, register, watch, handleSubmit } = useForm()

  useEffect(() => {
    dispatch(getProjects())
  }, [])
  const project = useSelector((state) => state.projects.data)
  const custommer = useSelector((state) => state.billingCustomer.data)

  const labelProject = project
    .filter((item) => item.state === GENERAL_STATUS.ACTIVE)
    .map((item) => {
      return { value: item.id, label: item.name }
    })

  const labelCustomer = custommer.map((item) => {
    return { value: item.customerId, label: item.fullName }
  })

  useEffect(() => {
    console.log(watch('project')?.value)
    if (watch('project')?.value) dispatch(getListCustomerByProjectId({ id: watch('project')?.value }))
  }, [watch('project')])
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
            />
          </Col>
        </Row>
        <Row className="mb-2 justify-content-bettwen">
          <Col md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Meters' })}
            </Label>
            <Controller
              as={CustomDateRangePicker}
              control={control}
              theme={selectThemeColors}
              name="dateRange"
              id="dateRange"
              render={({
                field: { onChange, onBlur, value, ref }
              }) => (
                <CustomDateRangePicker      
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                          checked={value}
                  inputRef={ref}
                />
              )}
              
            />
          </Col>
          <Col md="4">
            <Label className="general-label" for="exampleSelect">
              {intl.formatMessage({ id: 'Meters' })}
            </Label>
            <SelectWithCheckBox intl={intl} options={[{}, {}]} value={[]} setSelectedProjects={() => {}} />
          </Col>

          <Col lg={{ size: 3 }} md={3} className="d-flex align-items-center mt-2">
            <Button.Ripple
              color="primary"
              className="add-project"
              onClick={handleSubmit((value) => console.log(value))}
            >
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
  searchValue: string
}

export default injectIntl(PageHeader)
