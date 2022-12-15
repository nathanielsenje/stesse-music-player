import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form'

function Navigation() {
  return (
    <Nav justify defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home" className='logo'>
          <h2>Stesse</h2>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Search" />
          </Form.Group>
        </Form>
      </Nav.Item>
    </Nav>
  );
}

export default Navigation;