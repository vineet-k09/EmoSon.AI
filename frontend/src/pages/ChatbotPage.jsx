import React, { useState } from "react";

const ChatbotPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return; // Prevent sending empty messages

        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);

        // Placeholder AI response (replace with real AI logic)
        setTimeout(() => {
            const botMessage = { text: "Hello! How can I assist you?", sender: "bot" };
            setMessages((prev) => [...prev, botMessage]);
        }, 500);

        setInput(""); // Clear input field
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-4">Chat with EmoSon AI</h1>

            <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 my-2 max-w-xs rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-300 text-black"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="flex items-center mt-4">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatbotPage;
