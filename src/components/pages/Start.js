import { Button } from "react-bootstrap"
import BlockchainDesign from "../../assets/BlockchainDesign"
import FondoRedondo from "../../assets/FondoRedondo"
import useAuth from "../hooks/useAuth"

const Start = () => {

    const {logInToMoralis} = useAuth()

    return (
        <div id="landing">
           <BlockchainDesign id="blockchain-design"/>
           <FondoRedondo className="fondo-redondo"/>
           <div id="landing-banner">
                <h1>Acceso a NFT</h1>
                <Button id="landing-login" onClick={() => logInToMoralis()}><p>Login</p></Button>
           </div>
        </div>
    )
}

export default Start
