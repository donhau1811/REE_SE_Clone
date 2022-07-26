import React, { useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Badge, Button, Col, Row } from 'reactstrap'
import Table from '@src/views/common/table/CustomDataTable'
import { array, bool, func, object } from 'prop-types'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import ValueCUForm from './ValueCUForm'
import { cloneDeep } from 'lodash'
import { GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import withReactContent from 'sweetalert2-react-content'
import classnames from 'classnames'
import SweetAlert from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSettingsValue } from '../store/actions/index'

const MySweetAlert = withReactContent(SweetAlert)

const ValueTable = ({ data, onChange, disabled, intl}) => {
  const [currValue, setCurrentValue] = useState(null)
  const dispatch = useDispatch()
  const {
    layout: { skin }
  } = useSelector((state) => state)
  const handleAddValue = () => {
    setCurrentValue({
      id: new Date()
    })
  }
  const handleEditValue = (Value) => () => {
    setCurrentValue(Value)
  }

  const handleDeleteValue = (Value) => () => {
    const id = Value.id
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Delete billing customer title' }),
      html: intl.formatMessage({ id: 'Delete billing settings message' }),
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: intl.formatMessage({ id: 'Yes' }),
      cancelButtonText: intl.formatMessage({ id: 'No, Thanks' }),
      customClass: {
        popup: classnames({
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
        dispatch(deleteSettingsValue({
          id,
          skin,
          intl
        }))
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
      name: <FormattedMessage id="Config Name" />,
      selector: 'name',
      center: true,
      cell: (row) => <span>{row.name}</span>
    },
    {
      name: <FormattedMessage id="Configuration Value" />,
      selector: 'value',
      center: true,
      cell: (row) => <span>{row.value}</span>
    },
    {
      name: <FormattedMessage id="explain" />,
      selector: 'explain',
      center: true
    },
    {
      name:<FormattedMessage id="Status" />,
      center: true,
      selector: 'status',
      sortable: true,
      cell: (row) => {
        return row.state?.value === OPERATION_UNIT_STATUS.ACTIVE ? (
          <Badge pill color="light-success">
            <FormattedMessage id="Active" />
          </Badge>
        ) : (
          <Badge pill color="light-muted">
            <FormattedMessage id="Inactive" />
          </Badge>
        )
      }
    },
    {
      name: <FormattedMessage id="Actions" />,
      selector: '#',
      center: true,
      isHidden: disabled,
      cell: (row) => (
        <>
          {' '}
          <Badge onClick={handleEditValue(row)}>
            <IconEdit id={`editBtn_${row.id}`} />
          </Badge>
          <Badge onClick={handleDeleteValue(row)} >
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
        </>
      )
    }
  ]

  const handleSubmitValueForm = (values) => {
    let newData = cloneDeep(data)

    if (currValue?.id === '-1') {
      newData.push({ ...values, id: newData.length > 0 ? newData[newData.length - 1].id + 1 : 1 })
    } else {
      newData = newData.map((Value) => {
        if (Value.id === currValue?.id) return { ...Value, ...values }
        return Value
      })
    }
    setCurrentValue({})
    onChange?.(newData)
  }

  return (
    <>
      <Row className="mb-2">
        <Col className=" d-flex justify-content-between align-items-center">
          <h4 className="typo-section">
          </h4>

          <Button.Ripple
            disabled={disabled}
            color="primary"
            className="add-project add-Value-button"
            onClick={handleAddValue}
          >
        <FormattedMessage id="Add new" />
          </Button.Ripple>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Table columns={columns} pagination={null} data={ data } />
        </Col>
      </Row>
      <ValueCUForm value={currValue} onSubmit={handleSubmitValueForm}  />
    </>
  )
}
ValueTable.propTypes = {
  data: array,
  onChange: func,
  disabled: bool,
  intl: object.isRequired

}

export default injectIntl(ValueTable)
