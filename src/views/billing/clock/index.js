import React, { useEffect, useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Badge, Button, Col, Row } from 'reactstrap'
import { Plus } from 'react-feather'
import Table from '@src/views/common/table/CustomDataTable'
import { array, bool, func, object, string } from 'prop-types'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import ClockCUForm from './ClockCUForm'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { DISPLAY_DATE_FORMAT, SET_CLOCK } from '@src/utility/constants'
import { useDispatch, useSelector } from 'react-redux'

import SweetAlert from 'sweetalert2'
import classNames from 'classnames'
import '@src/@core/scss/billing-sweet-alert.scss'
import withReactContent from 'sweetalert2-react-content'
import { getAllClockByContractId } from './store/actions'

const MySweetAlert = withReactContent(SweetAlert)

const Clock = ({ data, onChange, disabled, intl, contractId }) => {
  const {
    layout: { skin }
  } = useSelector((state) => state)

  const dispatch = useDispatch()

  const [currClock, setCurrClock] = useState(null)
  const handleAddClock = () => {
    setCurrClock({
      id: -1
    })
  }

  useEffect(() => {
    if (contractId > 0) {
      dispatch(
        getAllClockByContractId({
          id: contractId,
          isSavedToState: true
        })
      )
    } else {
      dispatch({
        type: SET_CLOCK,
        payload: []
      })
    }
  }, [contractId])

  const handleEditClock = (clock) => () => {
    setCurrClock(clock)
  }

  const handleDeleteClock = (clock) => () => {
    MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Delete operating customer title' }),
      text: intl.formatMessage({ id: 'Delete billing information message' }),
      showCancelButton: true,
      confirmButtonText: intl.formatMessage({ id: 'Yes' }),
      cancelButtonText: intl.formatMessage({ id: 'No, Thanks' }),
      customClass: {
        popup: classNames({
          'sweet-alert-popup--dark': skin === 'dark',
          'sweet-popup': true
        }),
        header: 'sweet-title',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-secondary ml-1',
        actions: 'sweet-actions',
        content: 'sweet-content'
      },
      buttonsStyling: false
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        const newData = data.reduce((array, item) => {
          if (item.id !== clock.id) return [...array, item]
          if (item.isCreate) return array
          return [...array, { ...item, isDelete: true }]
        }, [])
        onChange?.(newData)
      }
    })
  }

  const columns = [
    {
      name: <FormattedMessage id="No." />,
      cell: (row, index) => index + 1,
      center: true,
      maxWidth: '50px'
    },
    {
      name: <FormattedMessage id="Device name" />,
      selector: 'name',

      center: true
    },
    {
      name: <FormattedMessage id="Serial number of clock" />,
      selector: 'seri',

      center: true
    },
    {
      name: <FormattedMessage id="Type of clock" />,
      selector: 'type',

      center: true
    },
    {
      name: <FormattedMessage id="Manufacturer" />,
      selector: 'manufacturer',
      center: true
    },
    {
      name: <FormattedMessage id="Inspection valid until" />,
      selector: 'inspectionDate',
      center: true,

      cell: (row) => <span>{!!row.inspectionDate && moment(row.inspectionDate).format(DISPLAY_DATE_FORMAT)}</span>
    },
    {
      name: <FormattedMessage id="Actions" />,
      selector: '#',
      center: true,
      isHidden: disabled,
      cell: (row) => (
        <>
          {' '}
          <Badge onClick={handleEditClock(row)}>
            <IconEdit id={`editBtn_${row.id}`} />
          </Badge>
          <Badge onClick={handleDeleteClock(row)}>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
        </>
      )
    }
  ]

  // const handleCancelClockForm = () => {
  //   setCurrClock({})
  // }

  const handleCancelClockForm = () => {
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Cancel' }),
      text: intl.formatMessage({ id: 'You want to cancel create/update' }),
      showCancelButton: true,
      confirmButtonText: intl.formatMessage({ id: 'Yes' }),
      cancelButtonText: intl.formatMessage({ id: 'No, Thanks' }),
      customClass: {
        popup: classNames({
          'sweet-alert-popup--dark': skin === 'dark',
          'sweet-popup': true
        }),
        header: 'sweet-title',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-secondary ml-1',
        actions: 'sweet-actions',
        content: 'sweet-content'
      },
      buttonsStyling: false
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        setCurrClock({})
      }
    })
  }

  const handleSubmitClockForm = (values) => {
    let newData = cloneDeep(data) || []

    if (currClock?.id === -1) {
      newData.push({ ...values, id: -Number(new Date().getTime()) })
    } else {
      newData = newData.map((clock) => {
        if (clock.id === currClock?.id) return { ...clock, ...values }
        return clock
      })
    }
    setCurrClock({})
    onChange?.(newData)
  }

  return (
    <>
      <Row className="mb-2">
        <Col className=" d-flex justify-content-between align-items-center">
          <h4 className="typo-section">
            <FormattedMessage id="List of clock" />
          </h4>

          <Button.Ripple
            disabled={disabled}
            color="primary"
            className="add-project add-contact-button"
            onClick={handleAddClock}
          >
            <Plus className="mr-1" /> <FormattedMessage id="Add new clock" />
          </Button.Ripple>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Table columns={columns} pagination={null} data={data?.filter((item) => !item.isDelete) || []} />
        </Col>
      </Row>
      <ClockCUForm clock={currClock} onSubmit={handleSubmitClockForm} onCancel={handleCancelClockForm} />
    </>
  )
}
Clock.propTypes = {
  data: array,
  onChange: func,
  disabled: bool,
  contractId: string,
  intl: object
}

export default injectIntl(Clock)
