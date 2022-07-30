import React, { useEffect, useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Badge, Button, Col, Row } from 'reactstrap'
import Table from '@src/views/common/table/CustomDataTable'
import { array, bool, func, object, string } from 'prop-types'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import ValueCUForm from './ValueCUForm'
import { GENERAL_STATUS, GENERAL_STATUS as OPERATION_UNIT_STATUS } from '@src/utility/constants/billing'
import withReactContent from 'sweetalert2-react-content'
import classnames from 'classnames'
import SweetAlert from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSettingsValue, postSettingsValue, putSettingsValue } from '../store/actions/index'
import './styles.scss'
import { useParams } from 'react-router-dom'

const mockData = [
  {
    id: 1,
    state: 'ACTIVE',
    value: 'Doanh nghiệp',
    description: 'test description',
    configKeyId: 1,
    createDate: '2022-07-30T08:27:34.000Z',
    createBy: 0,
    modifyDate: '2022-07-30T08:27:34.000Z',
    modifyBy: 0
  }
]

const MySweetAlert = withReactContent(SweetAlert)

const ValueTable = ({ configKeyId, disabled, intl }) => {
  const [currValue, setCurrentValue] = useState(null)
  const dispatch = useDispatch()
  const {
    layout: { skin },
    settings: { selectedSetting }
  } = useSelector((state) => state)
  const { id } = useParams()
  const fetchConfigValue = () => {
    console.log('fetch')
  }

  useEffect(() => {
    fetchConfigValue()
  }, [id])
  const handleAddValue = () => {
    setCurrentValue({
      id: '-1',
      name: selectedSetting?.name,
      state: GENERAL_STATUS.ACTIVE
    })
  }

  const handleEditValue = (changeValue) => () => {
    setCurrentValue({ ...changeValue, name: selectedSetting?.name })
  }

  const handleCancelValueForm = () => {
    setCurrentValue({})
  }

  const handleCallbackForm = () => {
    fetchConfigValue()
    handleCancelValueForm()
  }

  const handleDeleteValue = (valueRow) => () => {
    const id = valueRow.id
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Delete billing customer title' }),
      html: intl.formatMessage({ id: 'Delete billing settings message' }),
      showCancelButton: true,
      confirmButtonText: intl.formatMessage({ id: 'Yes' }),
      cancelButtonText: intl.formatMessage({ id: 'No, Thanks' }),
      customClass: {
        popup: classnames({
          'sweet-alert-popup--dark': skin === 'dark',
          'sweet-popup': true
        }),
        header: 'sweet-title border-bottom',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-secondary ml-1',
        actions: 'sweet-actions',
        content: 'sweet-content'
      },
      buttonsStyling: false
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(
          deleteSettingsValue({
            id,
            callback: handleCallbackForm,
            skin,
            intl
          })
        )
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
      cell: () => <span>{selectedSetting.name}</span>
    },
    {
      name: <FormattedMessage id="Configuration Value" />,
      selector: 'value',
      center: true,
      cell: (row) => <span>{row.value}</span>
    },
    {
      name: <FormattedMessage id="explain" />,
      selector: 'description',
      center: true
    },
    {
      name: <FormattedMessage id="Status" />,
      center: true,
      selector: 'status',
      sortable: true,
      cell: (row) => {
        return row.state === OPERATION_UNIT_STATUS.ACTIVE ? (
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
          <Badge onClick={handleDeleteValue(row)}>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
        </>
      )
    }
  ]

  const handleSubmitValueForm = (values) => {
    const payload = {
      state: values.state?.value,
      value: values.value,
      description: values.description,
      configKeyId
    }
    console.log('values', values)

    if (currValue?.id === '-1') {
      dispatch(
        postSettingsValue({
          params: payload,
          callback: handleCallbackForm,
          skin,
          intl
        })
      )
    } else {
      dispatch(
        putSettingsValue({
          params: { ...payload, id: currValue?.id },
          callback: handleCallbackForm,
          skin,
          intl
        })
      )
    }
  }

  return (
    <>
      <Row className="mb-2">
        <Col className=" d-flex justify-content-between align-items-center">
          <h4 className="typo-section"></h4>

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
          <Table columns={columns} pagination={null} data={mockData} />
        </Col>
      </Row>
      <ValueCUForm value={currValue} onSubmit={handleSubmitValueForm} onCancel={handleCancelValueForm} />
    </>
  )
}
ValueTable.propTypes = {
  data: array,
  onChange: func,
  disabled: bool,
  intl: object.isRequired,
  configKeyId: string.isRequired
}

export default injectIntl(ValueTable)
