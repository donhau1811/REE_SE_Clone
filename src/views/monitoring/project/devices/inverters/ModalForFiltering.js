/* eslint-disable no-return-assign */
import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Select from 'react-select'
// import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useQueryState } from '@src/utility/hooks/useQueryState'
import { getInverters } from './store/actions'
import axios from 'axios'

const ModalForFiltering = ({ modalForFiltering, setModalForFiltering }) => {
  // const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()

  const toggle = () => {
    setModalForFiltering(!modalForFiltering)
  }

  const [select1, setSelect1] = useQueryState('projectId')
  const [select2, setSelect2] = useState()
  const [select3, setSelect3] = useState()
  const [listOfInverters, setListOfInverters] = useState('')

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

  const handleChange2 = (choice) => {
    setSelect2(choice.label)
  }

  const handleChange3 = (choice) => {
    setSelect3(choice.value)
  }

  const fetchInverters = () => {
    const initParam = {
      q: select2,
      state: select3,
      projectId: select1
    }

    dispatch(getInverters(initParam))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchInverters()
    toggle()
    console.log(select1, select2, select3)
  }

  return (
    <Modal isOpen={modalForFiltering} backdrop="static" className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>LỌC DỮ LIỆU</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="project">
              <h5>Dự án</h5>
            </Label>
            <Select options={options1} onChange={handleChange1} defaultValue={options1[0]} />
          </FormGroup>
          <FormGroup>
            <Label for="devices">
              <h5>Thiết bị</h5>
            </Label>
            <Select options={options2} onChange={handleChange2} />
          </FormGroup>
          <FormGroup>
            <Label for="status">
              <h5>Trạng thái</h5>
            </Label>
            <Select options={options3} onChange={handleChange3} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            ĐỒNG Ý LÀM VỢ ANH NHÉ
          </Button>
          <Button color="secondary" onClick={toggle}>
            CANCEL
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

ModalForFiltering.propTypes = {
  modalForFiltering: PropTypes.bool.isRequired,
  setModalForFiltering: PropTypes.func.isRequired
}

export default ModalForFiltering
