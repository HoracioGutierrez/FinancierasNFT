import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import logo from "../assets/logo_action-01.png";
import campana from "../assets/Vector.png";
import { useMoralis } from "react-moralis";
import NativeBalance from './NativeBalance';
import CanvasIcon from "../assets/canvasicon.png";


const MiNavbar = () => {

    const { authenticate, isAuthenticated, user } = useMoralis();

    // muestra el address y balance de la wallet
    const balanceYAccount = () => {
        let addrFormat = user.get("ethAddress")
        addrFormat = addrFormat.substring(0, 6) + "..." + addrFormat.substring(addrFormat.length - 6)
        return (
            <>
                <NativeBalance/>
                <div id="connect-wallet">
                    <p id="ethaddress">{addrFormat}</p>
                    <img src={CanvasIcon} alt="" id="canvasicon" style={{width: "24px", height: "24px"}}/>
                </div>
            </>
        )
    }
    
    return (
        <>
            <Navbar bg="white" expand="lg" className="mi-navbar me-auto" id="mi-navbar">
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
                    {!isAuthenticated ? <Button onClick={() => authenticate({signingMessage: "Action Fintech Authentication"})} id="connect-wallet"><p>Connect Wallet</p></Button> : balanceYAccount() }
                </Container>
            </Navbar>
        </>
    )
}


export default MiNavbar