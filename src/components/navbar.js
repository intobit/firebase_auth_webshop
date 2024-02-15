import { Link, } from 'react-router-dom';
import { useAuth } from "../firebase/AuthProvider";
import './navbar.css';

function Navbar() {

    const { handleLogout, currentUser } = useAuth();
    return (
        <nav>
            <div className="navbar">
                <Link to="/home" className="home">
                    Home
                </Link>
                <Link to="/previousorders" className="previous_orders">
                    Previous Orders
                </Link>
                <Link to="/" className="sign_out" onClick={handleLogout}>
                    Sign Out: <span>{currentUser?.email}</span>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
