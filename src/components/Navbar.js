import {Navbar, Nav, Container} from 'react-bootstrap';
import logo from "../assets/logo_action-01.png";

const MiNavbar = () => {
    return (
        <>
            <Navbar bg="light" expand="lg" className="mi-navbar">
                <Container>
                    <Navbar.Brand href="#home"><img src={logo} alt="logo-action-fintech" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default MiNavbar
