import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login"); // ✅ Redirect to login
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/chatbot">Chatbot</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/userprofile">Profile</Link></li>
                {isAuthenticated ? (
                    <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
