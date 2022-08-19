import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Badge, Button, Col, Row, UncontrolledTooltip } from 'reactstrap'
import { Plus } from 'react-feather'
import Table from '@src/views/common/table/CustomDataTable'
import { array, bool, func } from 'prop-types'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import ContactCUForm from './ContactCUForm'
import { cloneDeep } from 'lodash'
import { showToast } from '@src/utility/Utils'
import SweetAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { ReactComponent as IconView } from '@src/assets/images/svg/table/ic-view.svg'

const MySweetAlert = withReactContent(SweetAlert)

const Contact = ({ data, onChange, disabled }) => {
  const intl = useIntl()
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [currContact, setCurrContact] = useState(null)
  const handleAddContact = () => {
    setCurrContact({
      id: '-1'
    })
    setIsReadOnly(false)
  }
  const {
    layout: { skin }
  } = useSelector((state) => state)

  const handleRedirectToViewPage = (contact) => () => {
    setCurrContact(contact)
    setIsReadOnly(true)
  }
  const handleRedirectToUpdatePage = (contact) => () => {
    setCurrContact(contact)
    setIsReadOnly(false)
  }

  const handleDeleteContact = (contact) => () => {
    return MySweetAlert.fire({
      title: intl.formatMessage({ id: 'Delete billing customer title' }),
      html: intl.formatMessage({ id: 'Delete billing information message' }),
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
        const newData = data.reduce((array, item) => {
          if (item.id !== contact.id) return [...array, item]
          if (item.isCreate) return array
          return [...array, { ...item, isDelete: true }]
        }, [])
        showToast('success', <FormattedMessage id="delete contact success" />)
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
      name: <FormattedMessage id="Contact Name" />,
      selector: 'fullName'
    },
    {
      name: <FormattedMessage id="Position" />,
      selector: 'position'
    },
    {
      name: <FormattedMessage id="operation-unit-form-mobile" />,
      selector: 'phone'
    },
    {
      name: 'Email',
      selector: 'email',
      cell: (row) => <span>{row.email}</span>
    },
    {
      name: <FormattedMessage id="note" />,
      selector: 'note',
      cell: (row) => <span>{row.note}</span>
    },
    {
      name: <FormattedMessage id="Actions" />,
      selector: '#',
      center: true,
      isHidden: disabled,
      cell: (row) => (
        <>
          {' '}
          <Badge onClick={handleRedirectToViewPage(row)}>
            <IconView id={`editBtn_${row.id}`} />
          </Badge>
          <UncontrolledTooltip placement="auto" target={`editBtn_${row.id}`}>
            <FormattedMessage id="View Project" />
          </UncontrolledTooltip>
          <Badge onClick={handleRedirectToUpdatePage(row)}>
            <IconEdit id={`updateBtn_${row.id}`} />
          </Badge>
          <UncontrolledTooltip placement="auto" target={`updateBtn_${row.id}`}>
            <FormattedMessage id="Update Project" />
          </UncontrolledTooltip>
          <Badge onClick={handleDeleteContact(row.id)}>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
          <UncontrolledTooltip placement="auto" target={`deleteBtn_${row.id}`}>
            <FormattedMessage id="Delete Project" />
          </UncontrolledTooltip>
        </>
      )
    }
  ]

  const handleCancelContactForm = () => {
    setCurrContact({})
  }

  const handleSubmitContactForm = (values) => {
    if (isReadOnly) {
      setIsReadOnly(false)
    } else {
      let newData = cloneDeep(data) || []

      if (currContact?.id === '-1') {
        newData.push({ ...values, id: -Number(new Date().getTime()) })
        showToast('success', <FormattedMessage id="create contact success" />)
      } else {
        showToast('success', <FormattedMessage id="update contact success" />)

        newData = newData.map((contact) => {
          if (contact.id === currContact?.id) return { ...contact, ...values }
          return contact
        })
      }
      setCurrContact({})
      onChange?.(newData)
    }
  }

  return (
    <>
      <Row className="mb-2">
        <Col className=" d-flex justify-content-between align-items-center">
          <h4 className="typo-section">
            <FormattedMessage id="Contact Information" />
          </h4>

          {!disabled && (
            <Button.Ripple
              disabled={disabled}
              color="primary"
              className="add-project add-contact-button"
              onClick={handleAddContact}
            >
              <Plus className="mr-1" /> <FormattedMessage id="Add new contact" />
            </Button.Ripple>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Table
            columns={columns}
            pagination={null}
            data={data?.filter((item) => !item.isDelete) || []}
            noDataTitle={<FormattedMessage id="Add contact info to create new customer" />}
          />
        </Col>
      </Row>
      <ContactCUForm
        isReadOnly={isReadOnly}
        contact={currContact}
        onSubmit={handleSubmitContactForm}
        onCancel={handleCancelContactForm}
      />
    </>
  )
}
Contact.propTypes = {
  data: array,
  onChange: func,
  disabled: bool
}

export default Contact
