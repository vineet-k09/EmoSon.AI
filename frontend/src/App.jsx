import './App.css'

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
        <Footer />
      </Router>

    </>
  )
}

export default App
