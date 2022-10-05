// ** React Imports
import { Fragment } from 'react'
import { useQueryState } from '@src/utility/hooks/useQueryState'

import { useSelector } from 'react-redux'

// ** Third Party Components
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import { Col, Row } from 'reactstrap'

// ** Tables
import InverterTable2 from './InverterTable2'

const Inverters2 = () => {
  const [userChoice, setUserChoice] = useQueryState('projectId')
  console.log(userChoice)

  // const dispatch = useDispatch()
  const listOfProjects = useSelector((state) => state?.auth?.userData?.user?.projects)
  const options = []

  for (let i = 0; i < listOfProjects?.length; i++) {
    const value = `${listOfProjects[i].id}`
    const label = `${listOfProjects[i].name}`
    const option = { value, label }
    options.push(option)
  }

  return (
    <Fragment>
      <Row className="mb-1">
        <Col md="8"></Col>
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
      <InverterTable2 />
    </Fragment>
  )
}

export default Inverters2
