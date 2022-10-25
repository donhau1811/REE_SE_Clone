/* eslint-disable no-return-assign */
import React, { useState } from 'react'
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

const ModalForFiltering = ({ modalForFiltering, setModalForFiltering }) => {
  const [select1, setSelect1] = useState()
  const [select2, setSelect2] = useState()
  const [select3, setSelect3] = useState()
  const [listOfInverters, setListOfInverters] = useState([])

  const listOfProjects = useSelector((state) => state?.auth?.userData?.user?.projects)
  const options1 = []
  const options2 = []
  const options3 = [
    { value: 'ACTIVE', label: 'Hoạt động' },
    { value: 'INACTIVE', label: 'Không hoạt động' }
  ]

  for (let i = 0; i < listOfProjects?.length; i++) {
    const value = `${listOfProjects[i].id}`
    const label = `${listOfProjects[i].name}`
    const option1 = { value, label }
    options1.push(option1)
  }

  const handleChange1 = (choice) => {
    setSelect1(choice.value)
    axios
      .get(
        `https://rsm2021-d3bzmmng.an.gateway.dev/glf_device?page=1&rowsPerPage=25&order=name%20asc&state=%2A&fk=%2A&projectId=${choice.value}&typeDevice=2`
      )
      .then((response) => {
        const dataNeeded = response.data.data
        setListOfInverters(dataNeeded)
      })
      .catch((error) => console.log(error))
  }

  for (let i = 0; i < listOfInverters.length; i++) {
    const value = listOfInverters[i].serialNumber
    const label = listOfInverters[i].name
    const option2 = { value, label }
    options2.push(option2)
  }

  const toggle = () => {
    setModalForFiltering(false)
    console.log(select1)
    console.log(select2)
    console.log(select3)
  }

  return (
    <>
      <Modal isOpen={modalForFiltering} backdrop="static" className="modal-dialog-centered">
        <ModalHeader toggle={toggle}>LỌC DỮ LIỆU</ModalHeader>
        <ModalBody>
          <Label for="project">Dự án</Label>
          <Select options={options1} onChange={handleChange1} defaultValue={options1[0]} />
          <Label for="devices">Thiết bị</Label>
          <Select options={options2} onChange={(choice) => setSelect2(choice.value)} />
          <Label for="status">Trạng thái</Label>
          <Select options={options3} onChange={(choice) => setSelect3(choice.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            CANCEL
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

ModalForFiltering.propTypes = {
  modalForFiltering: PropTypes.bool.isRequired,
  setModalForFiltering: PropTypes.func.isRequired
}

export default ModalForFiltering
