import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

function BasicExample() {

    const navigate = useNavigate();

    const navigatetoHome = () => navigate('/home');
    const navigatetoCalendar = () => navigate('/calendario');
    const navigatetoAgendar = () => navigate('/agendar')

    return (
    <Navbar expand="lg" className="Navbar">
    <Container>
        <Navbar.Brand onClick={navigatetoHome}>SESI ARDS</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            <Dropdown.Menu>
                <Dropdown.Item id="homeitem" onClick={navigatetoHome}>Home</Dropdown.Item>
                <Dropdown.Item id='agendaritem' onClick={navigatetoAgendar}>Agendar</Dropdown.Item>
                <Dropdown.Item id='calendarioitem' onClick={navigatetoCalendar}>Calendário</Dropdown.Item>
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