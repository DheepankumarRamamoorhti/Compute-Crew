import './App.css';
import { useState } from 'react';
import ResearchList from './components/ResearchList';
import Summary from './components/Sumary';
import SearchBar from './components/Info/searchbar'; 
import InfoMessage from './components/Info/info';
import Signup from './pages/Signup'; // ✅ Include Signup page

import Login from './components/Info/login';

function App() {
  const [article, setArticle] = useState(null);
  const [user, setUser] = useState(null); // ✅ Track if user is signed up
  const [isLogin, setIsLogin] = useState(false); // ✅ Toggle between login/signup

  const handleAuth = (email) => {
    setUser(email); // Just store email to mark user "signed in"
  };

  return (
    <div>
      {/* ✅ Show login/signup if user is not authenticated */}
      {!user ? (
        isLogin ? (
          <>
            <Login onLogin={handleAuth} />
            <div style={styles.switchText}>
              Don't have an account?{' '}
              <span onClick={() => setIsLogin(false)} style={styles.link}>
                Sign up here
              </span>
            </div>
          </>
        ) : (
          <>
            <Signup onSignup={handleAuth} />
            <div style={styles.switchText}>
              Already have an account?{' '}
              <span onClick={() => setIsLogin(true)} style={styles.link}>
                Log in here
              </span>
            </div>
          </>
        )
      ) : (
        <>
          <div>
            <InfoMessage />
          </div>
          {!article ? (
            <ResearchList setArticle={setArticle} />
          ) : (
            <Summary article={article} />
          )}
          <div>
            <SearchBar />
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  switchText: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#2ecc71',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
};

export default App;
