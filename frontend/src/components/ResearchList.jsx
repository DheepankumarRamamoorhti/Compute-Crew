import React, { useEffect, useState } from "react";
import axios from "axios";

const ResearchList = ({ setArticle }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/research-list", {
      params: { q: "machine learning" }
    })
    .then((res) => {
      setArticles(res?.data);
    })
    .catch((err) => console.error(err));
  }, []);

  const extractPdfText = (pdfUrl) => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/extract-pdf-text", { pdfUrl })
      .then((res) => {
        console.log("Oka: ", res?.data?.text);
        setArticle(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  console.log("Articles: ", articles)
  return (
    <div>
      <h2>Research Articles (arXiv)</h2>
      <ul>
        {articles.map((article, index) => (
          <li
            key={index}
            onClick={() => setArticle(article)}
            style={{
              cursor: "pointer",
              marginBottom: "15px",
              padding: "10px",
              borderBottom: "1px solid #ccc"
            }}
          >
            <strong>{article.title}</strong> <br />
            <em>Authors: {article.authors.join(", ")}</em> <br />
            Published: {new Date(article.published).toDateString()} <br />
            {article.pdfUrl && (
              <button onClick={()=>extractPdfText(article.pdfUrl)}>
                {loading ? "Extracting..." : "Extract PDF Text"}
              <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer" onClick={extractPdfText}>
                📄 View Full Paper
              </a>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResearchList;
