import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

function Seeker() {
  const now = 100;
  return (
    <Container className='mt-3 text-center'>
      <h4>3:12</h4><ProgressBar className='seek' now={now} />
    </Container>
    )
}

export default Seeker;