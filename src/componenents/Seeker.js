import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

function Seeker() {
  const now = 60;
  return (
    <Container className='mt-3 text-center'>
      <h4>4:23</h4><ProgressBar className='seek' now={now} />
    </Container>
    )
}

export default Seeker;