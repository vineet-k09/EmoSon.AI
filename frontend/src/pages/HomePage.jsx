import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import BubbleEffect from "../components/bubbleEffect";

const HomePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const handleEmotionClick = (emotion) => {
        console.log(`User is feeling ${emotion}`);
    };

    return (
        <div>
            <h1 id="bigText">Endxiety</h1>
            <section id="about">
                <h2>About Endxiety</h2>
                <p>Endxiety is an emotion-driven support companion designed to create a safe, anonymous, and understanding community for those seeking comfort, encouragement, and connection. Whether you're experiencing life's highs or navigating its lows, Endxiety listens, responds, and shares experiences that resonate with you. <br />

                    What Makes Endxiety Special? <br />
                    💬 Anonymous Support – Express your thoughts freely without revealing your identity. <br />
                    🤖 AI-Powered Companion – Intelligent responses that celebrate joy and offer solace in tough times.<br />
                    📖 Relatable Stories – Discover anonymized experiences from people who’ve been in similar situations.<br />
                    🔐 Privacy-First Approach – A safe space where your data stays confidential while fostering genuine connections.<br />

                    Endxiety is more than just a platform—it's a companion that understands, a community that listens, and a sanctuary where emotions find a voice. 💙
                </p>
            </section>
            <br /> <br />

            {user ? (
                <section id="emotions">
                    <h2>How are you feeling today?</h2>
                    <div className="emoji-container">
                        <button onClick={() => handleEmotionClick("love")} className="emoji">❤️</button>
                        <button onClick={() => handleEmotionClick("angry")} className="emoji">😡</button>
                        <button onClick={() => handleEmotionClick("happy")} className="emoji">😊</button>
                        <button onClick={() => handleEmotionClick("sad")} className="emoji">😢</button>
                        <button onClick={() => handleEmotionClick("normal")} className="emoji">😐</button>
                    </div>
                </section>
            ) : (
                <section id="login">
                    <Link to="/login">Login here</Link>
                </section>
            )}
            <BubbleEffect />
        </div>
    );
};

export default HomePage;
