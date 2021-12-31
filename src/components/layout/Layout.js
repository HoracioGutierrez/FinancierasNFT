import { ToastContainer } from 'react-toastify';
import useAuth from "../hooks/useAuth"
import Header from "./Header"
import Main from "./Main"

const Layout = () => {

    const auth = useAuth()
    
    return (
        <>
            <Header/>
            <Main/>
            <ToastContainer position='bottom-right' autoClose={1500} />
        </>
    )
}

export default Layout
