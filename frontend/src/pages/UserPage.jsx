import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [postCount, setPostCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [replyCount, setReplyCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                fetchUserData(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user");
                navigate("/login");
            }
        } else {
            navigate("/login"); // ✅ Redirect only if no user is stored
        }
    }, [navigate]);

    const fetchUserData = async (parsedUser) => {
        const response = await fetch("http://localhost:5000/api/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${parsedUser.token}`, // Assuming the token is stored in the user data
            },
        });
        const data = await response.json();

        if (data.user) {
            setPostCount(data.postCount);
            setLikeCount(data.likeCount);
            setReplyCount(data.fakeReplyCount);
        }
    };

    if (!user) return <h2>Loading...</h2>;  // ✅ Avoids infinite login loop

    return (
        <div className="container">
            <h1>Welcome, {user.username}!</h1>
            <img
                src={user.photo || "/userpfp.jpg"}
                alt="Profile"
                style={{ width: "100px", borderRadius: "50%" }}
            />
            <h3>How are you doing today?</h3>
            <div className="stats">
                <p>
                    <strong>Posts:</strong> {postCount} <br />
                    <strong>Likes:</strong> {likeCount} <br />
                    <strong>Replies:</strong> {replyCount} <br />
                </p>
                <a href="/community" className="community-link">Go to Community</a>

            </div>
        </div>
    );
};

export default UserProfilePage;
