import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <h1>Titulo</h1>
            <nav>
                <Link to="/">login</Link>
                <Link to="/financiera/1">financiera</Link>
            </nav>
        </header>
    )
}

export default Header
