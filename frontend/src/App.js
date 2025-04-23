// App.js
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ResearchList from './components/ResearchList';
import Summary from './components/Sumary';
import SearchBar from './components/Info/searchbar'; 
import InfoMessage from './components/Info/info';

import Signup from './pages/Signup';
import Login from './components/Info/login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user)
  }, [])
  

  return (
    <Router>
      <InfoMessage />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!user ? <Signup /> : <Navigate to="/articles" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/articles" />} />

        {/* Protected Routes */}
        {user && (
          <>
            <Route path="/articles" element={<ResearchList />} />
            <Route path="/viewer" element={<Summary />} />
          </>
        )}

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={user ? "/articles" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
