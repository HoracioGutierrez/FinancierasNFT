import { useMoralis } from "react-moralis"
import {Route,Navigate} from "react-router-dom"

export const PrivateRoute = ({path,element}) => {
    const {isAuthenticated} = useMoralis()
    return <Route path={path} element={element}/>
    if(isAuthenticated){
    }else{
        return <Navigate to="/"/>
    }
}

export const PublicRoute = ({path,element}) => {
    const {isAuthenticated} = useMoralis()
    return <Route path={path} element={element}/>
    if(isAuthenticated){
        return <Navigate to="/home"/>
    }else{
    }
}