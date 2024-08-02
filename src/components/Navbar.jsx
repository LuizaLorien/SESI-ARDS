import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/Navbar.css'
import menuicon from '../assets/calendar4-week.svg'

function BasicExample() {

    return (
    <Navbar fixed='top' expand="lg" className="Navbar">
    <Container>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Dropdown img= {menuicon}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            <Dropdown.Menu id='dropdown'>
                <Dropdown.Item href='/home' id="homeitem">Home</Dropdown.Item>
                <Dropdown.Item href='/agendar' id='agendaritem'>Agendar</Dropdown.Item>
                <Dropdown.Item href='calendario' id='calendarioitem'>Calendário</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown.Toggle>
            </Dropdown>
            <Navbar.Brand >SESI ARDS</Navbar.Brand>
            
            <div className='profile'>
            </div>
        </Nav>
        </Navbar.Collapse>
        
    </Container>
    </Navbar>
);
}

export default BasicExample;