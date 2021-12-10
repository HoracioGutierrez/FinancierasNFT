import { Routes, Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import FinancieraPage from "../pages/FinancieraPage"
import {PublicRoute, PrivateRoute} from "../CustomRoutes"

const Main = () => {

    return (
        <main>
            <Routes>
                <PublicRoute path="/" element={<LoginPage/>}/>
                {/* <PrivateRoute path="/logout"/>
                <PrivateRoute path="/home"/> */}
                <PrivateRoute path="/financiera/:id" element={<FinancieraPage/>}/>
                {/* <PrivateRoute path="/nft/:id"/>
                <PrivateRoute path="/minter/:id"/> */}
            </Routes>
        </main>
    )
}

export default Main