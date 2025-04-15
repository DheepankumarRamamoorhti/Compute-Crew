import './App.css';
import { useState } from 'react';
import ResearchList from './components/ResearchList';
import Summary from './components/Sumary';
import SearchBar from './components/Info/searchbar'; 
import InfoMessage from './components/Info/info';
import Signup from './pages/Signup'; // ✅ Include Signup page

function App() {
  const [article, setArticle] = useState(null);
  const [user, setUser] = useState(null); // ✅ Track if user is signed up

  const handleSignup = (email) => {
    setUser(email); // Just store email to mark user "signed in"
  };

  return (
    <div>
      {/* ✅ Show signup first */}
      {!user ? (
        <Signup onSignup={handleSignup} />
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

export default App;
