import React, { useState } from 'react';
import axios from 'axios';

import './searchbar.css'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/research-list?q=${encodeURIComponent(query)}`);
      setPapers(res.data);
    } catch (error) {
      console.error("Error fetching research papers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for research papers..."
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-red rounded-md">
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {papers.map((paper, index) => (
            <li key={index} className="border p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg">{paper.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Published: {new Date(paper.published).toLocaleDateString()}</p>
              <p className="text-sm text-gray-800">{paper.summary}</p>
              <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
                View PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
