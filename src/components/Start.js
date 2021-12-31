import {Button} from 'react-bootstrap';
import LogoAction from "../assets/LogoAction"
import BlockchainDesign from "../assets/BlockchainDesign"
import FondoRedondo from "../assets/FondoRedondo"
import { useMoralis } from "react-moralis";
import {Redirect} from 'react-router-dom';


const Start = () => {
    const { web3, authenticate, isAuthenticated, logout, isAuthenticating, isWeb3Enabled,enableWeb3, user } = useMoralis();

    const onClick = () => { 
        authenticate({ signingMessage: "Action Fintech Authentication" })
    }
    
    return (
        <>
            <div className="container-start">
                <LogoAction width={150} height={75} id="logo-start" />
                <Button onClick={onClick} id="start-connect"><p>CONNECT WALLET</p></Button>
                <div id="circulo-container">
                    <div className="circulo-container">
                        <BlockchainDesign id="blockchain-design" width={600} height={600} />
                        <FondoRedondo className="fondo-redondo" width={700} height={700} />
                    </div>
                </div>
            </div>

            <div id="start-container">
                <div id="texto-start">
                    <h1 id="acceso-nft">
                        Acceso a NFT de
                        <br />
                        contratos
                    </h1>
                    <button onClick={() => logout()} disabled={isAuthenticating}>Logout</button>

                    <Button onClick={() => authenticate({ signingMessage: "Action Fintech Authentication" })} id="login-start"><p id="login-text">LOGIN</p></Button>
                </div>
            </div>
        </>
    )
}


export default Start