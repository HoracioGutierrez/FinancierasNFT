import { ToastContainer } from 'react-toastify';
import Header from "./Header"
import Main from "./Main"

const Layout = () => {

    return (
        <>
            <Header/>
            <Main/>
            <ToastContainer position='bottom-right' autoClose={1500} />
        </>
    )
}

export default Layout
