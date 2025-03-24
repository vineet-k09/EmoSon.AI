import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ChatbotPage from "./pages/ChatbotPage";
import CommunityPage from "./pages/CommunityPage";
import UserProfilePage from "./pages/UserPage";

import "./App.css"; // Ensure this file exists

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/userprofile" element={<UserProfilePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
