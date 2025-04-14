// frontend/src/components/Summary.js
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

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Full Extracted Text</h2>
      <pre style={{
        whiteSpace: "pre-wrap",
        background: "#f5f5f5",
        padding: "15px",
        borderRadius: "8px",
        fontSize: "14px",
        lineHeight: "1.6",
        maxHeight: "500px",
        overflowY: "auto",
        border: "1px solid #ddd"
      }}>
        {article?.text}
      </pre>

      <button onClick={generateSummary} disabled={loading} style={{ marginTop: "20px", padding: "10px 15px" }}>
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div style={{ marginTop: "20px" }}>
          <h3>Summary</h3>
          <p style={{ background: "#eef", padding: "10px", borderRadius: "6px" }}>{summary}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Summary;
