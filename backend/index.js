// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import xml2js from "xml2js";
import https from "https";
import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


const API_SEARCH_URL = "http://export.arxiv.org/api/query?search_query=all:deep+learning";

// const CORE_API_KEY = 'hJXdB3OTNY9HSvFWcmDa8lEUrqjGueL1';

// Route to search for papers
app.get("/api/research-list", async (req, res) => {
  const searchTerm = req.query.q || "artificial intelligence";
  const apiUrl = `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(searchTerm)}&max_results=10`;

  try {
    const response = await axios.get(apiUrl);
    
    xml2js.parseString(response.data, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error("XML Parse Error:", err);
        return res.status(500).json({ error: "Failed to parse response" });
      }

      const entries = result.feed.entry;
      const papers = Array.isArray(entries) ? entries : [entries];

      const formatted = papers.map(paper => ({
        title: paper.title.trim(),
        published: paper.published,
        authors: Array.isArray(paper.author)
          ? paper.author.map(a => a.name)
          : [paper.author.name],
        pdfUrl: paper.link.find(link => link.$.type === "application/pdf")?.$.href,
        summary: paper.summary?.trim()
      }));

      res.json(formatted);
    });
  } catch (error) {
    console.error("arXiv API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch research papers" });
  }
});

// AI Summary Route
app.post("/api/summarize", async (req, res) => {
  const { content } = req.body;
  try {
    const openAIResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "Summarize this: " + content }],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );
    res.json({ summary: openAIResponse.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Error generating summary" });
  }
});

// Route for PDF text extraction
app.post("/api/extract-pdf-text", async (req, res) => {
  const { pdfUrl } = req.body;
  
  if (!pdfUrl) {
    return res.status(400).json({ error: "PDF URL is required." });
  }

  const filePath = path.join(process.cwd(), "temp.pdf");

  try {
    const response = await axios.get(pdfUrl, { responseType: "stream" });

    const file = fs.createWriteStream(filePath);
    response.data.pipe(file);

    file.on("finish", async () => {
      file.close();
      try {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);

        fs.unlinkSync(filePath);
        
        res.json({ text: pdfData.text });
      } catch (parseError) {
        console.error("PDF Parsing Error:", parseError.message);
        res.status(500).json({ error: "Failed to parse PDF." });
      }
    });

    file.on("error", (err) => {
      fs.unlinkSync(filePath);
      console.error("File Stream Error:", err.message);
      res.status(500).json({ error: "File streaming failed." });
    });

  } catch (error) {
    console.error("Request Error:", error.message);
    res.status(500).json({ error: "Failed to download PDF." });
  }
});

// Separate route for summarizing raw text
app.post("/api/summarize-text", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length === 0) {
    return res.status(400).json({ error: "Text content is required for summarization." });
  }

  try {
    const CHUNK_SIZE = 3000;
    const chunks = [];
    for (let i = 0; i < text.length; i += CHUNK_SIZE) {
      chunks.push(text.slice(i, i + CHUNK_SIZE));
    }

    const summaries = [];
    for (const chunk of chunks) {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        { inputs: chunk },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      summaries.push(response.data[0]?.summary_text || "");
    }

    const finalSummary = summaries.join("\n\n");
    res.json({ summary: finalSummary });

  } catch (error) {
    console.error("Hugging Face API Error:", error.message);
    res.status(500).json({ error: "Failed to generate summary." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
