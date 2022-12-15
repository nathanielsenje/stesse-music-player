import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

function Seeker() {
  const now = 60;
  return (
    <Container className='sectopm'>
      <Row>
        <Col md="auto">
          <p><b>4:45</b></p>
        </Col>
        <Col>
          <ProgressBar className='seek' now={now} />
        </Col>
      </Row>
    </Container>
    )
}

export default Seeker;