import React, { useState } from "react";
import axios from "axios";

const Summary = ({ article }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSummary = () => {
    setLoading(true);
    setError("");
    axios
      .post("http://localhost:5000/api/summarize-text", { text: article?.text })
      .then((res) => {
        setSummary(res?.data?.summary);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to generate summary.");
        setLoading(false);
      });
  };

  const containerStyle = {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#121212",
    color: "#e0e0e0",
    minHeight: "100vh",
  };

  const preStyle = {
    whiteSpace: "pre-wrap",
    background: "#1e1e1e",
    padding: "15px",
    borderRadius: "8px",
    fontSize: "14px",
    lineHeight: "1.6",
    maxHeight: "500px",
    overflowY: "auto",
    border: "1px solid #444",
  };

  const summaryStyle = {
    background: "#2a2a40",
    padding: "10px",
    borderRadius: "6px",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <div style={containerStyle}>
      <h2>Full Extracted Text</h2>
      <pre style={preStyle}>{article?.text}</pre>

      <button onClick={generateSummary} disabled={loading} style={buttonStyle}>
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div style={{ marginTop: "20px" }}>
          <h3>Summary</h3>
          <p style={summaryStyle}>{summary}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Summary;
