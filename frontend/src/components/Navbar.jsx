import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/auth">Auth</Link></li>
                <li><Link to="/chatbot">Chatbot</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/userprofile">Profile</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
