import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { context } from '../providers/AuthProvider';
import logo from "../../assets/logo_action-01.png";
import campana from "../../assets/Vector.png";

const Header = () => {

    const { logInToMoralis, user: { logged } } = useContext(context)

    const balanceYAccount = () => {}

    return (
        <Navbar bg="white" expand="lg" className="mi-navbar me-auto" id="mi-navbar" as="header">
            <Container id="nav-container">
                <Navbar.Brand href="#home" className="logo-fintech">
                    <img src={logo} alt="logo-action-fintech" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto links-nav">
                        <Nav.Link to="/" as={NavLink}><p className="link-nav">Home</p></Nav.Link>
                        {logged && <Nav.Link to="/explore"><p className="link-nav">Explore</p></Nav.Link>}
                        {logged && <Nav.Link to="/marketplace"><p className="link-nav">Marketplace</p></Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
                {logged && <Navbar className="campana"><img src={campana} alt="bell" /></Navbar>}
                {!logged ? <Button color='primary' onClick={logInToMoralis} id="connect-wallet"><p>Connect Wallet</p></Button> : balanceYAccount()}
            </Container>
        </Navbar>
    )
}

export default Header
