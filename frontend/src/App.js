import logo from './logo.svg';
import './App.css';
import ResearchList from './components/ResearchList';
import Summary from './components/Sumary';
import SearchBar from './components/Info/searchbar'; 
import InfoMessage from './components/Info/info';
import { useState } from 'react';


function App() {
  const [article, setArticle] = useState(null);

  return (
    <div>
      
      <div>
        <InfoMessage />
      </div>
      {!article ? (
        <ResearchList setArticle={setArticle} />
      ) : (
        <Summary article={article} />
      )}
      <div >
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
