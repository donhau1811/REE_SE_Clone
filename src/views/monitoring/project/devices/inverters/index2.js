// ** React Imports
import { Fragment, useState } from 'react'
import { useQueryState } from '@src/utility/hooks/useQueryState'

import { useSelector } from 'react-redux'

// ** Third Party Components
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import { Col, Row, Form, Input } from 'reactstrap'
// import { useForm } from 'react-hook-form'

// ** Tables
import InverterTable2 from './InverterTable2'
// import axios from 'axios'
import ModalForCommonValue from './ModalForCommonValue'

const Inverters2 = () => {
  const [userChoice, setUserChoice] = useQueryState('projectId')
  const [values, setValues] = useState()
  const [modalForCommonValue, setModalForCommonValue] = useState(false)
  const [selectedInverters, setSelecterInverters] = useState([])

  const openForValueModal = () => {
    setModalForCommonValue(true)
    setSelecterInverters(selectedInverters)
  }

  const listOfProjects = useSelector((state) => state?.auth?.userData?.user?.projects)
  const options = []

  for (let i = 0; i < listOfProjects?.length; i++) {
    const value = `${listOfProjects[i].id}`
    const label = `${listOfProjects[i].name}`
    const option = { value, label }
    options.push(option)
  }

  //Handle control power of whole site
  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      control_type: 'power_control',
      site: userChoice,
      control_values: {
        absolute_output_power: null,
        percentage_output_power: values
      }
    }
    console.log(body)
    console.log(userChoice)
    // axios
    //   .post('http://localhost:5001/api/remote/send_command_to_inverter', body)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error))
  }

  return (
    <Fragment>
      <Row className="mb-1">
        <Col md="2">
          <Form onSubmit={handleSubmit}>
            <Input
              type="number"
              placeholder="Điều chỉnh công suất toàn dự án"
              // eslint-disable-next-line no-return-assign
              onFocus={(e) => (e.target.placeholder = '')}
              name={userChoice}
              value={values}
              onChange={(e) => setValues(e.target.value)}
            />
          </Form>
        </Col>
        <Col md="6"></Col>
        <Col md="4">
          <Select
            options={options}
            onChange={(choice) => setUserChoice(choice.value)}
            placeholder={<FormattedMessage id="Select project" />}
          />
        </Col>
      </Row>
    
      {/* <Row className='mb-1'>
        <Col>Chọn loại giảm</Col>
        <Col>Tỷ lệ</Col>
        <Col>Nơi nhập liệu</Col>
        <Col>Áp dụng</Col>
      </Row> */}
      <InverterTable2 
      openForValueModal={openForValueModal}
      selectedInverters={selectedInverters}
      />
      <ModalForCommonValue 
      modalForCommonValue={modalForCommonValue}
      setModalForCommonValue={setModalForCommonValue}
      selectedInverters={selectedInverters}
      />
    </Fragment>
  )
}

export default Inverters2
