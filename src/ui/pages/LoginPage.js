import { useMoralis } from "react-moralis"

const LoginPage = () => {

    const { authenticate , logout} = useMoralis()

    return (
        <div>
            <button onClick={() => logout()}>
                logout
            </button>
            <button onClick={() => authenticate()}>login</button>
        </div>
    )
}

export default LoginPage
