import { useMoralis } from "react-moralis";
import {useEffect} from 'react'


const Login = () => {

    const { authenticate, isAuthenticated, user } = useMoralis();

    const login = () => authenticate({signingMessage: "Action Fintech Authentication"})

    useEffect(() => {
        login()
    }, [])

    return(
        <div><h1>hola</h1></div>
    )
}

export default Login
