import React from 'react';

const ChatbotPage = () => {
    return (
        <div>
            <h1>Mental Health Chatbot</h1>
            <iframe
                title="Mental Health Chatbot"
                src="http://localhost:8501"  // Replace with the URL of your deployed Streamlit app
                width="100%"
                height="800px"
                style={{ border: "none" }}
            ></iframe>
        </div>
    );
};

export default ChatbotPage;
