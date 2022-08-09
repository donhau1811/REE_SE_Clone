import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Badge, Button, Col, Row } from 'reactstrap'
import { Plus } from 'react-feather'
import Table from '@src/views/common/table/CustomDataTable'
import NoDataCOM from '@src/views/common/NoDataCOM'
import { array, bool, func } from 'prop-types'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import ClockCUForm from './ClockCUForm'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { DISPLAY_DATE_FORMAT } from '@src/utility/constants'

const Contact = ({ data, onChange, disabled }) => {

  const [currClock, setCurrClock] = useState(null)
  const handleAddClock = () => {
    setCurrClock({
      id: -1
    })
  }

  const handleEditClock = (clock) => () => {
    setCurrClock(clock)
  }

  const handleDeleteClock = (clock) => () => {
    const newData = data.reduce((array, item) => {
      if (item.id !== clock.id) return [...array, item]
      if (item.isCreate) return array
      return [...array, { ...item, isDelete: true }]
    }, [])
    onChange?.(newData)
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
      sortable: true,
      center: true
    },
    {
      name: <FormattedMessage id="Serial number of clock" />,
      selector: 'serialNumber',
      sortable: true,
      center: true
    },
    {
      name: <FormattedMessage id="Type of clock" />,
      selector: 'typeOfClock',
      sortable: true,
      center: true
    },
    {
      name: <FormattedMessage id="Manufacturer" />,
      selector: 'manufacturer',
      center: true,
      sortable: true
    },
    {
      name: <FormattedMessage id="Inspection valid until" />,
      selector: 'qualityVerifyDate',
      center: true,
      sortable: true,
      cell: (row) => <span>{!!row.qualityVerifyDate && moment(row.qualityVerifyDate).format(DISPLAY_DATE_FORMAT)}</span>
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
          <Badge onClick={handleDeleteClock(row)} disabled={disabled}>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
        </>
      )
    }
  ]

  const handleCancelClockForm = () => {
    setCurrClock({})
  }

  const handleSubmitClockForm = (values) => {
    let newData = cloneDeep(data) || []

    if (currClock?.id === -1) {
      newData.push({ ...values, id: -Number(new Date().getTime()) })
    } else {
      newData = newData.map((contact) => {
        if (contact.id === currClock?.id) return { ...contact, ...values }
        return contact
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
          {!data?.length > 0 && <NoDataCOM />}
        </Col>
      </Row>
      <ClockCUForm clock={currClock} onSubmit={handleSubmitClockForm} onCancel={handleCancelClockForm} />
    </>
  )
}
Contact.propTypes = {
  data: array,
  onChange: func,
  disabled: bool
}

export default Contact
