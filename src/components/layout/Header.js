import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from "../hooks/useAuth"
import logo from "../../assets/logo_action-01.png";
import { useMoralis } from 'react-moralis';

const Header = () => {

    const { logInToMoralis, user: { logged } } = useAuth()
    const { logout } = useMoralis()

    const balanceYAccount = () => { }

    return (
        <Navbar bg="white" expand="lg" as="header" id="layout-header">
            <Container fluid>
                <Navbar.Brand to="/" as={NavLink}>
                    <img src={logo} alt="logo-action-fintech"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {logged && <Nav.Link to="/fintechlist" as={NavLink} >Fintechs</Nav.Link>}
                        {logged && <Nav.Link to="/minterlist" as={NavLink}>Minters</Nav.Link>}
                        {logged ? <Nav.Item className="d-lg-none nav-link" onClick={logout}>Logout</Nav.Item> : balanceYAccount()}
                    </Nav>
                </Navbar.Collapse>
                {!logged ? <Button color='primary' onClick={logInToMoralis} id="connect-wallet"><p>Connect Wallet</p></Button> : balanceYAccount()}
                {logged ? <Button color='primary' className='d-none d-lg-inline-block' onClick={logout} id="disconnect-wallet"><p>Logout</p></Button> : balanceYAccount()}
            </Container>
        </Navbar>
    )
}

export default Header
