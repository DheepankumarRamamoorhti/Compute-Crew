import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Summary = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pdfUrl = queryParams.get("pdfUrl");

  const cleanSummaryText = (text) => {
    if (!text) return "";
    return text
      .replace(/\b([A-Z][a-z]+)([A-Z][a-z]+)\b/g, (match, p1, p2) => `${p1} ${p2}`) // fix CamelCase
      .replace(/\b(AbstrACT|ThisTechnical|Thesummary)/gi, "") // remove junk tokens
      .replace(/\b([a-z])([A-Z])\b/g, (match, p1, p2) => `${p1} ${p2}`) // add space between a and A
      .replace(/\s+/g, " ")
      .trim();
  };

  const generateSummary = async () => {
    if (!pdfUrl) return;

    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/summary/extract-pdf-text`, { pdfUrl });
      const rawSummary = res?.data?.summary || "No summary generated.";
      const cleaned = cleanSummaryText(rawSummary);
      setSummary(cleaned);
    } catch (err) {
      console.error("Summary Error:", err);
      setError("Something went wrong while generating the summary.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "900px",
      margin: "auto",
      color: "#e0e0e0",
      backgroundColor: "#121212",
      minHeight: "100vh",
    },
    iframe: {
      border: "1px solid #444",
      borderRadius: "8px",
      width: "100%",
      height: "700px",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#4A90E2",
      color: "#fff",
      fontWeight: "bold",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginBottom: "20px",
    },
    summaryBox: {
      backgroundColor: "#1e1e2f",
      padding: "20px",
      borderRadius: "10px",
      fontSize: "16px",
      lineHeight: "1.8",
      color: "#ddd",
      fontFamily: "Segoe UI, sans-serif"
    },
    error: {
      color: "red",
      marginTop: "10px",
    }
  };

  return (
    <div style={styles.container}>
      <h2>PDF Viewer</h2>
      {pdfUrl ? (
        <iframe src={pdfUrl} title="PDF" style={styles.iframe} />
      ) : (
        <p>No PDF URL provided.</p>
      )}

      <button onClick={generateSummary} disabled={loading} style={styles.button}>
        {loading ? "Generating Summary..." : "Generate Summary"}
      </button>

      {summary && (
        <div>
          <h3>Summary</h3>
          <div style={styles.summaryBox}>{summary}</div>
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default Summary;
