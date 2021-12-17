import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import LogoAction from "../assets/LogoAction"
import BlockchainDesign from "../assets/BlockchainDesign"
import FondoRedondo from "../assets/FondoRedondo"
import { useMoralis } from "react-moralis";


const Start = () => {

    const { authenticate, isAuthenticated, user } = useMoralis();

    // para probar
    const redirect = () => {
        alert("te redirige a la pagina de inicio");
    }
    
    /**
     * SACAR LA NAVBAR Y DEJAR SOLO BOTONES
     */

    return (
        <div className="container-start">
            <Navbar bg="white" expand="lg" className="mi-navbar me-auto" id="start-navbar">
                <Container id="nav-container-start">
                    <LogoAction width={150} height={75}/>
                    {!isAuthenticated ? <Button onClick={() => authenticate({signingMessage: "Action Fintech Authentication"})} id="start-connect"><p>Connect Wallet</p></Button> : redirect() }
                </Container>
            </Navbar>
            <div id="circulo-container">
                <div className="circulo-container">
                    <BlockchainDesign id="blockchain-design" width={700} height={700}/>
                    <FondoRedondo className="fondo-redondo" width={700} height={700}/>
                </div>
            </div>
            <div>
                <div>
                 
                </div>
            </div>
        </div>
    )
}


export default Start