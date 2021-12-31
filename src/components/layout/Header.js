import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from "../hooks/useAuth"
import logo from "../../assets/logo_action-01.png";
import campana from "../../assets/Vector.png";
import { useMoralis } from 'react-moralis';

const Header = () => {

    const { logInToMoralis, user: { logged } } = useAuth()
    const { logout } = useMoralis()

    const balanceYAccount = () => { }

    return (
        <Navbar bg="white" expand="lg" className="mi-navbar me-auto" id="mi-navbar" as="header">
            <Container id="nav-container">
                <Navbar.Brand to="/" as={NavLink} className="logo-fintech">
                    <img src={logo} alt="logo-action-fintech" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto links-nav">
                        {logged && <Nav.Link to="/fintechlist" as={NavLink} ><p className="link-nav">Fintechs</p></Nav.Link>}
                        {logged && <Nav.Link to="/minterlist" as={NavLink}><p className="link-nav">Minters</p></Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
                {!logged ? <Button color='primary' onClick={logInToMoralis} id="connect-wallet"><p>Connect Wallet</p></Button> : balanceYAccount()}
                {logged ? <Button color='primary' onClick={logout} id="disconnect-wallet"><p>Logout</p></Button> : balanceYAccount()}
            </Container>
        </Navbar>
    )
}

export default Header
