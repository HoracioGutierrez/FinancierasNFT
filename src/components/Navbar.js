import {Navbar, Nav, Container} from 'react-bootstrap';
import logo from "../assets/logo_action-01.png";
import campana from "../assets/Vector.png";
import WalletCard from "./Web3Client"


const MiNavbar = () => {

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
                    {/* <Button id="connect-wallet" onClick={connectWalletHandler}>Connect Wallet</Button> */}
                    <WalletCard/>
                </Container>
            </Navbar>
        </>
    )
}


export default MiNavbar
