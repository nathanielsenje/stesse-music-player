import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form'

function Navigation() {
  return (
    <>
    <Nav justify defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home" className='logo' />
      </Nav.Item>
    </Nav>

    {/* Search bar */}
      <Form></Form>
      </>
  );
}

export default Navigation;