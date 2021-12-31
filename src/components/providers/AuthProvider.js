import { createContext, useContext, useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { toast } from "react-toastify";
import { contractAbi, CONTRACT_ADDRESS } from '../../abi';
import { context as authContext } from "./Web3Provider"

export const context = createContext()
const { Provider } = context

const AuthProvider = ({ children }) => {

    const { user, auth, authenticate, web3, isWeb3Enabled } = useMoralis()
    const { manuallyEnableWeb3 } = useContext(authContext)
    const { state } = auth
    const [role, setRole] = useState({ role : "undefined" , isAdmin : false , isFinanciera : false , isMinter : false , loading : false })
    const [logged, setLogged] = useState(false)
    const [logging, setLogging] = useState(true)
    const [manualLogin , setManualLogin] = useState(false)

    const getUserRole = async () => {
        const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
        const addr = user.get("ethAddress")
        setRole({...role, loading : true})
        const financiera_role = await contract.methods.isInRole("FINANCIERA_ROLE", addr).call({ from: addr })
        const minter_role = await contract.methods.isInRole("MINTER_ROLE", addr).call({ from: addr })
        const admin_role = await contract.methods.isInRole("DEFAULT_ADMIN_ROLE", addr).call({ from: addr })
        setRole({
            ...role, 
            loading : false, 
            isAdmin : admin_role, 
            isFinanciera : financiera_role, 
            isMinter : minter_role, 
            role : financiera_role ? "financiera" : minter_role ? "minter" : admin_role ? "admin" : "undefined" 
        })
        setLogged(true)
        setLogging(false)
        setManualLogin(false)
        toast.dismiss()
        toast.success("Bienvenido!")
    }

    useEffect(() => {
        autoAuthenticationWeb3Enable()
        if(state == "unauthenticated" && logged){
            setLogged(false)
        }
    }, [state])

    useEffect(() => {
        if (isWeb3Enabled) {
            getUserRole()
        }
    }, [isWeb3Enabled])

    const logInToMoralis = async () => {
        try {
            setManualLogin(true)
            await authenticate()
        } catch (e) {
            console.log(e)
            toast.error("Hubo un error al iniciar sesión")
        }
    }

    const autoAuthenticationWeb3Enable = async () => {
        if (state === "authenticated" && !isWeb3Enabled) {
            if(!manualLogin) {
                toast.info("Autenticando con Metamask...")
            }
            manuallyEnableWeb3()
        }
    }

    const valorDelProvider = {
        logInToMoralis,
        user : {
            moralisInterface : user,
            logged ,
            logging ,
            ...role
        }
    }

    return (
        <Provider value={valorDelProvider}>
            {children}
        </Provider>
    )
}

export default AuthProvider
