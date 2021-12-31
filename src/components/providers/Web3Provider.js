import { createContext, useEffect } from "react"
import { useMoralis } from "react-moralis"

export const context = createContext()
const { Provider } = context

const Web3Provider = ({ children }) => {

    const {isWeb3EnableLoading,isWeb3Enabled,enableWeb3} = useMoralis()

    //si esta initializing entonces metamask esta cargando , no necesariamente esta autologeado a metamask o no
    //si esta notConnected entonces metamask ya cargo pero el usuario ni esta logueado a metamask, todavia no esta autenticado a moralis
    //si esta connected entonces metamask ya cargo y el usuario esta autenticado a moralis
    //console.log(test)

    /* useEffect(()=>{
        if(!isWeb3Enabled && !isWeb3EnableLoading){
            enableWeb3()
        }
    },[]) */
    console.log(isWeb3Enabled)

    const manuallyEnableWeb3 = () => {
        enableWeb3()
    }

    const valorDelProvider = {
        manuallyEnableWeb3
    }

    return (
        <Provider value={valorDelProvider}>
            {children}
        </Provider>
    )
}

export default Web3Provider
