import { useState } from "react";
import InfoMessage from "./components/Info/info";
import ResearchList from "./components/ResearchList";
import Summary from "./components/Sumary";
import SearchBar from "./components/Info/searchbar";
import Signup from "./pages/Signup"; // ✅ Import it
import "./App.css";

function App() {
  const [article, setArticle] = useState(null);
  const [user, setUser] = useState(null);

  const handleSignup = (email) => {
    setUser(email);
  };

  return (
    <div>
<<<<<<< HEAD
      
      <div>
        <InfoMessage />
      </div>
      <div >
        <SearchBar />
      </div>
      {!article ? (
        <ResearchList setArticle={setArticle} />
=======
      {!user ? (
        <Signup onSignup={handleSignup} />
>>>>>>> 6b86a70 (Added Signup page and updated App.js logic)
      ) : (
        <>
          <InfoMessage />
          {!article ? (
            <ResearchList setArticle={setArticle} />
          ) : (
            <Summary article={article} />
          )}
          <SearchBar />
        </>
      )}
    </div>
  );
}

export default App;
