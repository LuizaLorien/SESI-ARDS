import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample() {

    return (
    <Navbar expand="lg" className="Navbar">
    <Container>
        <Navbar.Brand >SESI ARDS</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            <Dropdown.Menu>
                <Dropdown.Item href='/home' id="homeitem" >Home</Dropdown.Item>
                <Dropdown.Item href='/agendar' id='agendaritem' >Agendar</Dropdown.Item>
                <Dropdown.Item href='calendario' id='calendarioitem' >Calendário</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown.Toggle>
            </Dropdown>

            
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
);
}

export default BasicExample;