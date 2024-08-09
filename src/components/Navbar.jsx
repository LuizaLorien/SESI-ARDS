import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaBars, FaUser } from 'react-icons/fa';
import '../styles/Navbar.css';

function BasicExample() {

  return (
    <Navbar fixed="top" expand="lg" className="Navbar">
      <Nav >
        <Dropdown className="dropdown-basic" data-toggle="collapse" data-target="#dropdown">
          <Dropdown.Toggle as="div">
            <FaBars style={{ color: 'white' }} />
          </Dropdown.Toggle>
          <Dropdown.Menu id='dropdown'>
            <Dropdown.Item href='/home' id="homeitem">Home</Dropdown.Item>
            <Dropdown.Item href='/agendar' id='agendaritem'>Agendar</Dropdown.Item>
            <Dropdown.Item href='/calendario' id='calendarioitem'>Calendário</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Navbar.Brand href="/home" className="brand">
          SESI ARDS
        </Navbar.Brand>
        <Nav className="nav-profile">
        <Nav.Link href="/perfil" style={{ color: 'white' }}>
          <FaUser/>
        </Nav.Link>
      </Nav>
      </Nav>
    </Navbar>
  );
}

export default BasicExample;
