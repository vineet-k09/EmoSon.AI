import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatbotPage from "./pages/ChatbotPage";
import CommunityPage from "./pages/CommunityPage";
import UserProfilePage from "./pages/UserPage";
import CustomCursor from './components/customCursor'; // adjust path as necessary



import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div className="roots">

      <CustomCursor />
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/userprofile" element={<UserProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
