import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // ✅ Use navigation for redirection

    const [loading, setLoading] = useState(false);

    async function submit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/signup", { username, password });

            if (res.status === 201) {
                alert("Signup successful! You can now log in.");
                navigate("/login");
            } else {
                alert(res.data.message);
            }
        } catch (e) {
            console.error("Signup Error:", e);
            alert("Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={submit}>
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>

            </form>

            <br />
            <Link to="/login">Already have an account? Login</Link>
        </div>
    );
};

export default Signup;
