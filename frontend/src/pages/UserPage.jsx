import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user");
                navigate("/login");
            }
        } else {
            navigate("/login"); // ✅ Redirect only if no user is stored
        }
    }, [navigate]);

    if (!user) return <h2>Loading...</h2>; // ✅ Avoids infinite login loop

    return (
        <div className="container">
            <h1>Welcome, {user.username}!</h1>
            <img
                src={user.photo || "/userpfp.jpg"}
                alt="Profile"
                style={{ width: "100px", borderRadius: "50%" }}
            />
            <h3>How are you doing today?</h3>
        </div>
    );
};

export default UserProfilePage;
