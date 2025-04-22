import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ResearchList = () => {
  const [articlesList, setArticlesList] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/api/summary/research-list", {
      params: { q: "machine learning" }
    })
    .then((res) => {
      setArticlesList(res?.data);
    })
    .catch((err) => console.error(err));
  }, []);

  const extractPdfText = (pdfUrl) => {
    navigate(`/viewer?pdfUrl=${encodeURIComponent(pdfUrl)}`);
  };

  const styles = {
    container: {
      backgroundColor: "#121212",
      color: "#FFFFFF",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "600",
      marginBottom: "20px",
      borderBottom: "1px solid #333",
      paddingBottom: "10px",
    },
    articleCard: {
      backgroundColor: "#1E1E1E",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      marginBottom: "20px",
      transition: "box-shadow 0.3s ease",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    authors: {
      fontStyle: "italic",
      color: "#BBBBBB",
      fontSize: "14px",
      marginBottom: "4px",
    },
    published: {
      fontSize: "13px",
      color: "#AAAAAA",
      marginBottom: "15px",
    },
    buttonGroup: {
      display: "flex",
      gap: "12px",
    },
    button: {
      padding: "10px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      border: "none",
      cursor: "pointer",
    },
    extractButton: {
      backgroundColor: "#7C3AED",
      color: "#FFFFFF",
    },
    viewButton: {
      backgroundColor: "#2563EB",
      color: "#FFFFFF",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Research Articles (arXiv)</h2>
      <ul>
        {articlesList.map((article, index) => (
          <li key={index} style={styles.articleCard}>
            <h3 style={styles.title}>{article.title}</h3>
            <p style={styles.authors}>
              Authors: {article.authors.join(", ")}
            </p>
            <p style={styles.published}>
              Published: {new Date(article.published).toDateString()}
            </p>
            {article.pdfUrl && (
              <div style={styles.buttonGroup}>
                <button
                  style={{ ...styles.button, ...styles.extractButton }}
                  onClick={() => extractPdfText(article.pdfUrl)}
                >
                  📄 View Full Paper
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResearchList;
