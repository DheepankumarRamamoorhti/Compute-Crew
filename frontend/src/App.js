// App.js
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ResearchList from './components/ResearchList';
import Summary from './components/Sumary';
import SearchBar from './components/Info/searchbar'; 
import InfoMessage from './components/Info/info';
import Signup from './pages/Signup';

function App() {
  const [user, setUser] = useState(null);

  const handleSignup = (email) => {
    setUser(email);
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={!user ? <Signup onSignup={handleSignup} /> : <Navigate to="/articles" />} />

        {/* Protected Routes */}
        {user && (
          <>
            <Route
              path="/articles"
              element={
                <>
                  <InfoMessage />
                  <ResearchList />
                  <SearchBar />
                </>
              }
            />

            <Route
              path="/viewer"
              element={<Summary />}
            />
          </>
        )}

        {/* Catch-all route for non-matching paths */}
        <Route path="*" element={<Navigate to={user ? "/articles" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
