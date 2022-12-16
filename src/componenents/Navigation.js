import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'

function Navigation() {
  return (
    <Nav justify defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home" className='logo'>
          {/* <Image src="/public/logo/PNG/logo3.png"></Image> */}
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