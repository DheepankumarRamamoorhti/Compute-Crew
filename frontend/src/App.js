import logo from './logo.svg';
import './App.css';
import ResearchList from './components/ResearchList';
import Summary from './components/Sumary';
import InfoMessage from './components/Info/info';
import { useState } from 'react';

function App() {
  const [article, setArticle] = useState(null);

  return (
    <div>
      <h1>Research Paper Summarizer</h1>
      <div>
        <InfoMessage />
      </div>
      {!article ? (
        <ResearchList setArticle={setArticle} />
      ) : (
        <Summary article={article} />
      )}
    </div>
  );
}

export default App;
