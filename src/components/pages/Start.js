import { Button } from "react-bootstrap"
import BlockchainDesign from "../../assets/BlockchainDesign"
import FondoRedondo from "../../assets/FondoRedondo"
import useAuth from "../hooks/useAuth"

const Start = () => {

    const { logInToMoralis } = useAuth()

    return (
        <div id="landing">
            <FondoRedondo className="fondo-redondo" />
            <div>
                <BlockchainDesign id="blockchain-design" />
                <div id="landing-banner">
                    <h1>Acceso a tu Cuenta</h1>
                    <Button id="landing-login" onClick={() => logInToMoralis()}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Start
