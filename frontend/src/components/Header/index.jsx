import { useContext } from "react"
import { Link } from "react-router-dom";
import usersService from "../../services/usersService";
import { UserContext } from "../../UserContext";
import "./index.scss";

export default function Header() {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('user');
        usersService.setToken(null);
    }

    return (
        <header>
            <h2>Header</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        {
                            user ?
                            <>
                                <p>{ user.username }</p>
                                <button onClick={ handleLogout }>Log out</button>
                            </> : 
                            <>
                                <Link to="login">Log In</Link> / <Link to="register">Register</Link>
                            </>
                            
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}