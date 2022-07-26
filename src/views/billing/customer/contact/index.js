import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Badge, Button, Col, Row } from 'reactstrap'
import { Plus } from 'react-feather'
import Table from '@src/views/common/table/CustomDataTable'
import NoDataCOM from './NoDataCOM'
import { array, bool, func } from 'prop-types'
import { ReactComponent as IconEdit } from '@src/assets/images/svg/table/ic-edit.svg'
import { ReactComponent as IconDelete } from '@src/assets/images/svg/table/ic-delete.svg'
import ContactCUForm from './ContactCUForm'
import { cloneDeep } from 'lodash'

const Contact = ({ data, onChange, disabled }) => {
  const [currContact, setCurrContact] = useState(null)

  const handleAddContact = () => {
    setCurrContact({
      id: "-1"
    })
  }

  const handleEditContact = (contact) => () => {
    setCurrContact(contact)
  }

  const handleDeleteContact = (contact) => () => {
    const newData = data.filter((item) => item.id !== contact.id)
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
      name: <FormattedMessage id="Contact Name" />,
      selector: 'name',
      center: true,
      cell: (row) => <span>{row.name}</span>
    },
    {
      name: <FormattedMessage id="Position" />,
      selector: 'position',
      center: true,
      cell: (row) => <span>{row.position?.label}</span>
    },
    {
      name: <FormattedMessage id="operation-unit-form-mobile" />,
      selector: 'mobile',
      center: true
    },
    {
      name: 'Email',
      selector: 'email',
      center: true,
      cell: (row) => <span>{row.email}</span>
    },
    {
      name: <FormattedMessage id="note" />,
      selector: 'note',
      center: true,
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
          <Badge onClick={handleEditContact(row)}>
            <IconEdit id={`editBtn_${row.id}`} />
          </Badge>
          <Badge onClick={handleDeleteContact(row)} disabled={disabled}>
            <IconDelete id={`deleteBtn_${row.id}`} />
          </Badge>
        </>
      )
    }
  ]

  const handleCancelContactForm = () => {
    setCurrContact({})
  }

  const handleSubmitContactForm = (values) => {
    let newData = cloneDeep(data)

    if (currContact?.id === '-1') {
      newData.push({ ...values, id: newData.length > 0 ? newData[newData.length - 1].id + 1 : 1 })
    } else {
      newData = newData.map((contact) => {
        if (contact.id === currContact?.id) return { ...contact, ...values }
        return contact
      })
    }
    setCurrContact({})
    onChange?.(newData)
  }

  return (
    <>
      <Row className="mb-2">
        <Col className=" d-flex justify-content-between align-items-center">
          <h4 className="typo-section">
            <FormattedMessage id="Contact Information" />
          </h4>

          <Button.Ripple
            disabled={disabled}
            color="primary"
            className="add-project add-contact-button"
            onClick={handleAddContact}
          >
            <Plus className="mr-1" /> <FormattedMessage id="Add new contact" />
          </Button.Ripple>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Table columns={columns} pagination={null} data={data} />
          {!data?.length > 0 && <NoDataCOM />}
        </Col>
      </Row>
      <ContactCUForm contact={currContact} onSubmit={handleSubmitContactForm} onCancel={handleCancelContactForm} />
    </>
  )
}
Contact.propTypes = {
  data: array,
  onChange: func,
  disabled: bool
}

export default Contact
