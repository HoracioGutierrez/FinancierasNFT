import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import logo from "../assets/logo_action-01.png";
import campana from "../assets/Vector.png";
import { useMoralis } from "react-moralis";
import NativeBalance from './NativeBalance';


const MiNavbar = () => {

    const { authenticate, isAuthenticated, user } = useMoralis();

    const balanceYAccount = () => {
        return (
            <>
                <NativeBalance/>
                <h3 id="ethaddress">{user.get("ethAddress")}</h3>
            </>
        )
    }
    
    return (
        <>
            <Navbar bg="light" expand="lg" className="mi-navbar me-auto">
                <Container id="nav-container">
                    <Navbar.Brand href="#home" className="logo-fintech"><img src={logo} alt="logo-action-fintech" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto links-nav">
                            <Nav.Link href="#home"><p className="link-nav">Home</p></Nav.Link>
                            <Nav.Link href="#link"><p className="link-nav">Explore</p></Nav.Link>
                            <Nav.Link href="#link"><p className="link-nav">Marketplace</p></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar className="campana"><img src={campana} alt="bell"/></Navbar>
                    {/* <Button id="connect-wallet">Connect Wallet</Button> */}
                    {/* <Button onClick={() => authenticate()} id="connect-wallet">Connect Wallet</Button> */}
                    {/* <NativeBalance/> */}
                    {!isAuthenticated ? <Button onClick={() => authenticate({signingMessage: "Action Fintech Authentication"})} id="connect-wallet">Connect Wallet</Button> : balanceYAccount() }
                </Container>
            </Navbar>
        </>
    )
}


export default MiNavbar
