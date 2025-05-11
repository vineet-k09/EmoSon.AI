import React from 'react';
import './ChatbotPage.css';
import BubbleEffect from '../components/bubbleEffect';
const ChatbotPage = () => {
    return (
        <div className='body'>
            <h1>Endxiety</h1>
            <iframe
                title="Mental Health Chatbot"
                src="http://localhost:8501"  // Replace with the URL of your deployed Streamlit app
                width="100%"
                height="600px"
                style={{ border: "none" }}
            ></iframe>
            <BubbleEffect />
        </div>
    );
};

export default ChatbotPage;