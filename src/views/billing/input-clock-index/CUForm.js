/* eslint-disable no-unused-vars */
import { bool, func, object, string } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors, showToast } from '@src/utility/Utils'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  API_GET_ALL_PROJECT,
  API_GET_CONTRACT_BY_CUSTOMER_ID,
  API_GET_LIST_CUSTOMER_BY_PROJECT_ID,
  CHECK_DUPLICATE_OPRERATION_UNIT_CODE,
  SET_FORM_DIRTY
} from '@src/utility/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const CUForm = ({ intl, onSubmit = () => {}, onCancel = () => {}, initValues, isReadOnly }) => {
  const initState = {}
  const dispatch = useDispatch()
  const [projects, setProjects] = useState([])
  const [customers, setCustomers] = useState([])
  const [currContract, setCurrContract] = useState({})

  const ValidateSchema = yup.object().shape({
    projectId: yup.object().required(intl.formatMessage({ id: 'required-validate' })),
    customerId: yup.object().required(intl.formatMessage({ id: 'required-validate' })),
    startDate: yup.string().required(intl.formatMessage({ id: 'required-validate' })),
    endDate: yup.string().required(intl.formatMessage({ id: 'required-validate' }))
  })

  useEffect(async () => {
    try {
      const projectRes = await axios.get(API_GET_ALL_PROJECT)
      if (projectRes.status === 200 && projectRes.data.data) {
        setProjects(
          (projectRes.data.data || []).map((item) => ({
            value: item.id,
            label: item.name
          }))
        )
      }
    } catch (error) {
      showToast('error', error.toString())
    }
  }, [])

  const {
    handleSubmit,
    getValues,
    errors,
    control,
    register,
    reset,
    setError,
    formState: { isDirty },
    watch,
    setValue
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(isReadOnly ? yup.object().shape({}) : ValidateSchema),
    defaultValues: initValues || initState
  })
  useEffect(() => {
    dispatch({
      type: SET_FORM_DIRTY,
      payload: isDirty
    })
  }, [isDirty])
  useEffect(() => {
    reset(initValues)
  }, [initValues])

  useEffect(async () => {
    setValue('customerId', null)
    if (!watch('projectId')?.value) {
      return
    }
    try {
      const customersRes = await axios.get(`${API_GET_LIST_CUSTOMER_BY_PROJECT_ID}/${watch('projectId').value}`)
      if (customersRes.status === 200 && customersRes.data.data) {
        setCustomers(
          (customersRes.data.data || []).map((item) => ({
            value: item.customerId,
            label: item.fullName
          }))
        )
      }
    } catch (error) {
      showToast('error', error.toString())
    }
  }, [watch('projectId')?.value])

  useEffect(async () => {
    if (!watch('customerId')?.value) {
      return
    }
    try {
      const contractsRes = await axios.get(`${API_GET_CONTRACT_BY_CUSTOMER_ID}/${watch('customerId').value}`)
      if (contractsRes.status === 200 && contractsRes.data.data) {
        setCurrContract(contractsRes.data?.data?.find((item) => Number(item.projectId) === Number(watch('projectId')?.value)) || {})
      }
    } catch (error) {
      showToast('error', error.toString())
    }
  }, [watch('customerId')?.value])

  const handleSubmitOperationUnitForm = async (values) => {
    if (isReadOnly) {
      onSubmit?.(initValues)
      return
    }
    try {
      const dataCheck = { code: values.code }
      if (initValues?.id) dataCheck.id = initValues?.id
      const checkDupCodeRes = await axios.post(CHECK_DUPLICATE_OPRERATION_UNIT_CODE, dataCheck)
      if (checkDupCodeRes.status === 200 && checkDupCodeRes.data?.data) {
        setError('code', { type: 'custom', message: intl.formatMessage({ id: 'dubplicated-validate' }) })
        return
      }
    } catch (err) {
      const alert = initValues?.id
        ? 'Failed to update data. Please try again'
        : 'Failed to create data. Please try again'
      showToast(
        'error',
        intl.formatMessage({
          id: alert
        })
      )
      return
    }
    dispatch({
      type: SET_FORM_DIRTY,
      payload: false
    })
    onSubmit?.(values)
  }
  const handleCancel = () => {
    onCancel?.(isDirty)
  }

  return (
    <>
      <Form className="billing-form" onSubmit={handleSubmit(handleSubmitOperationUnitForm)}>
        <Row>
          <Col className="mb-2" md={5}>
            <Label className="general-label" for="projectId">
              <FormattedMessage id="Project" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Controller
              as={Select}
              control={control}
              theme={selectThemeColors}
              name="projectId"
              id="projectId"
              isDisabled={isReadOnly}
              innerRef={register()}
              options={projects}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select projects' })}
              formatOptionLabel={(option) => <>{option.label}</>}
            />
            {errors?.projectId && <FormFeedback>{errors?.projectId?.message}</FormFeedback>}
          </Col>
          <Col className="mb-2" md={{ size: 5, offset: 2 }}>
            <Label className="general-label" for="customerId">
              <FormattedMessage id="Customers" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Controller
              as={Select}
              control={control}
              theme={selectThemeColors}
              name="customerId"
              id="customerId"
              isDisabled={isReadOnly}
              innerRef={register()}
              options={customers}
              className="react-select"
              classNamePrefix="select"
              placeholder={intl.formatMessage({ id: 'Select customer' })}
              formatOptionLabel={(option) => <>{option.label}</>}
            />
            {errors?.customerId && <FormFeedback>{errors?.customerId?.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col className="mb-2" md={12}>
            <Label className="general-label">
              <FormattedMessage id="Power billing cycle" />
              <span className="text-danger">&nbsp;(*)</span>
            </Label>
            <Row>
              <Col className="mb-2 " md={2}>
                <Input
                  className="custom-icon-input-date"
                  type="date"
                  name="startDate"
                  autoComplete="on"
                  disabled={isReadOnly}
                  innerRef={register()}
                  invalid={!isReadOnly && !!errors.startDate}
                  valid={!isReadOnly && getValues('startDate')?.trim() && !errors.startDate}
                />
                {errors?.startDate && <FormFeedback>{errors?.startDate?.message}</FormFeedback>}
              </Col>
              <Col className="mb-2 d-flex justify-content-center align-items-center" md={1}>
                -
              </Col>
              <Col className="mb-2" md={2}>
                <Input
                  className="custom-icon-input-date"
                  type="date"
                  name="endDate"
                  autoComplete="on"
                  disabled={isReadOnly}
                  innerRef={register()}
                  invalid={!isReadOnly && !!errors.endDate}
                  valid={!isReadOnly && getValues('endDate')?.trim() && !errors.endDate}
                />
                {errors?.endDate && <FormFeedback>{errors?.endDate?.message}</FormFeedback>}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="d-flex justify-content-end align-items-center">
          <Button type="submit" color="primary" className="mr-1 px-3">
            {intl.formatMessage({ id: isReadOnly ? 'Update' : 'Save' })}
          </Button>{' '}
          <Button color="secondary" onClick={handleCancel}>
            {intl.formatMessage({ id: isReadOnly ? 'Back' : 'Cancel' })}
          </Button>{' '}
        </Row>
      </Form>
    </>
  )
}

CUForm.propTypes = {
  intl: object.isRequired,
  onSubmit: func,
  onCancel: func,
  initValues: object,
  isReadOnly: bool,
  submitText: string
}

export default injectIntl(CUForm)
