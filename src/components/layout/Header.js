import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from "../hooks/useAuth"
import logo from "../../assets/logo_action-01.png";
import { useMoralis } from 'react-moralis';
import { toast } from 'react-toastify';

const Header = () => {

    const { logInToMoralis, user: { logged } } = useAuth()
    const { logout } = useMoralis()

    const balanceYAccount = () => { }

    const customLogout = () => {
        toast.success("Sesión cerrada")
        logout()
    }

    return (
        <Navbar bg="white" expand="lg" as="header" id="layout-header">
            <Container fluid>
                <Navbar.Brand to="/" as={NavLink}>
                    <img id="layout-header-logo" src={logo} alt="logo-action-fintech"/>
                </Navbar.Brand>
                {logged && <Navbar.Toggle className='d-lg-none' aria-controls="basic-navbar-nav"/>}
                {logged && <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to="/fintechlist" as={NavLink} >Fintechs</Nav.Link>
                        <Nav.Link to="/minterlist" as={NavLink}>Minters</Nav.Link>
                        <Nav.Item className="d-lg-none nav-link" onClick={customLogout}>Logout</Nav.Item>
                    </Nav>
                </Navbar.Collapse>}
                {!logged ? <Button color='primary' onClick={logInToMoralis} id="connect-wallet">Conectar Wallet</Button> : balanceYAccount()}
                {logged ? <Button color='primary' className='d-none d-lg-inline-block' onClick={customLogout} id="disconnect-wallet">Logout</Button> : balanceYAccount()}
            </Container>
        </Navbar>
    )
}

export default Header
