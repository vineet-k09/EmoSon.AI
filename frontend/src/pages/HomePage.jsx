import React from "react";
import "./HomePage.css";
import AuthPage from "../pages/AuthPage";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <section id="about">
                <h2>About EmoSon.AI</h2>
                <p>EmoSon.AI is an emotion-driven support companion designed to create a safe, anonymous, and understanding community for those seeking comfort, encouragement, and connection. Whether you're experiencing life's highs or navigating its lows, EmoSon.AI listens, responds, and shares experiences that resonate with you. <br />

                    What Makes EmoSon.AI Special? <br />
                    💬 Anonymous Support – Express your thoughts freely without revealing your identity. <br />
                    🤖 AI-Powered Companion – Intelligent responses that celebrate joy and offer solace in tough times.<br />
                    📖 Relatable Stories – Discover anonymized experiences from people who’ve been in similar situations.<br />
                    🔐 Privacy-First Approach – A safe space where your data stays confidential while fostering genuine connections.<br />

                    EmoSon.AI is more than just a platform—it's a companion that understands, a community that listens, and a sanctuary where emotions find a voice. 💙
                </p>
            </section>
            <br /> <br />
            <section id="login">
                <AuthPage />
            </section>
        </div>
    );
};

export default HomePage;
