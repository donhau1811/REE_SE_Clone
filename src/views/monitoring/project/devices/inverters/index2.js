// ** React Imports
import { Fragment } from 'react'
import { useQueryState } from '@src/utility/hooks/useQueryState'

// ** Third Party Components
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import { Col, Row } from 'reactstrap'

// ** Tables
import InverterTable2 from './InverterTable2'

const options = [
  { value: '137', label: 'Chocolate' },
  { value: '136', label: 'Strawberry' },
  { value: '164', label: 'Vanilla' }
]

const Inverters2 = () => {
  const [userChoice, setUserChoice] = useQueryState('projectId')

  return (
    <Fragment>
      <Row>
        <Col md="8"></Col>
        <Col md="4">
          <Select
            options={options}
            onChange={(choice) => setUserChoice(choice.value)}
            placeholder={<FormattedMessage id='Select project' />}
          />
        </Col>
      </Row>
      <h3>User chose {userChoice}</h3>
      <InverterTable2 />
    </Fragment>
  )
}

export default Inverters2
