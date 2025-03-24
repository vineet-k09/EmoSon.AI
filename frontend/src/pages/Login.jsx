import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ For redirection

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // ⬅️ To redirect after login

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user data
            navigate("/userprofile"); // ✅ Redirect to profile
        } else {
            alert(data.message);
        }
    };

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>

            <Link to="/signup">Don't have an account? Sign up</Link>
        </>
    );
};

export default LoginPage;
