import express from "express";
import axios from "axios";
import xml2js from "xml2js";
import https from "https";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";

const router = express.Router();
// Route to search for papers
router.get("/research-list", async (req, res) => {
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
  // router.post("/summarize-pdf-chatgpt", async (req, res) => {
  //   const { pdfUrl } = req.body;
  
  //   if (!pdfUrl) {
  //     return res.status(400).json({ error: "PDF URL is required." });
  //   }
  
  //   const fileName = `temp-${Date.now()}.pdf`;
  //   const filePath = path.join(process.cwd(), fileName);
  
  //   try {
  //     // Step 1: Download the PDF
  //     const response = await axios.get(pdfUrl, { responseType: "stream" });
  //     await pipeline(response.data, fs.createWriteStream(filePath));
  
  //     // Step 2: Upload the PDF to OpenAI
  //     const form = new FormData.default();
  //     form.append("file", fs.createReadStream(filePath));
  //     form.append("purpose", "assistants");
  
  //     const uploadRes = await axios.post("https://api.openai.com/v1/files", form, {
  //       headers: {
  //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //         "OpenAI-Beta": "assistants=v2",
  //         ...form.getHeaders(),
  //       },
  //     });
  
  //     const fileId = uploadRes.data.id;
  
  //     // Step 3: Create a thread and add message + file in one step
  //     const threadRes = await axios.post(
  //       "https://api.openai.com/v1/threads",
  //       {
  //         messages: [
  //           {
  //             role: "user",
  //             content: "Please summarize this research paper.",
  //             attachments: [
  //               {
  //                 file_id: fileId,
  //                 tools: [{ type: "file_search" }]
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //           "Content-Type": "application/json",
  //           "OpenAI-Beta": "assistants=v2",
  //         },
  //       }
  //     );
  //     const threadId = threadRes.data.id;
  
  //     // Step 4: Run the assistant
  //     const runRes = await axios.post(
  //       `https://api.openai.com/v1/threads/${threadId}/runs`,
  //       {
  //         assistant_id: process.env.OPENAI_ASSISTANT_ID,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //           "Content-Type": "application/json",
  //           "OpenAI-Beta": "assistants=v2",
  //         },
  //       }
  //     );
  
  //     const runId = runRes.data.id;
  
  //     // Step 5: Poll for completion
  //     let runStatus = "queued";
  //     let attempts = 0;
  //     let summary = "";
  
  //     while (runStatus === "queued" || runStatus === "in_progress") {
  //       if (attempts > 20) {
  //         throw new Error("Timed out waiting for the summary.");
  //       }
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  //       const statusRes = await axios.get(
  //         `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //             "OpenAI-Beta": "assistants=v2",
  //           },
  //         }
  //       );
  //       runStatus = statusRes.data.status;
  //       attempts++;
  //     }
  //     if (runStatus === "failed") {
  //       const runDetails = await axios.get(
  //         `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //             "OpenAI-Beta": "assistants=v2",
  //           },
  //         }
  //       );
  //       console.error("🛑 Run failed reason:", runDetails.data.last_error);
  //     }
  // console.log("runStatus: ", runStatus);
  //     if (runStatus === "completed") {
  //       const messagesRes = await axios.get(
  //         `https://api.openai.com/v1/threads/${threadId}/messages`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //             "OpenAI-Beta": "assistants=v2",
  //           },
  //         }
  //       );
  
  //       const messages = messagesRes.data.data;
  //       console.log("message: ", messages);
  //       summary = messages.find(msg => msg.role === "assistant")?.content[0]?.text?.value || "No summary found.";
  //       console.log("summary: ", summary);
  //     }
  
  //     fs.unlinkSync(filePath);
  //     res.json({ summary });
  
  //   } catch (error) {
  //     console.error("PDF Summary Error:", error.response?.data || error.message);
  //     res.status(500).json({ error: "Failed to summarize PDF." });
  //   }
  // });
  
  async function summarizeText(text) {
    const CHUNK_SIZE = 5000;
    const chunks = [];
    for (let i = 0; i < text.length; i += CHUNK_SIZE) {
      chunks.push(text.slice(i, i + CHUNK_SIZE));
    }
  
    const summaries = [];
    for (const chunk of chunks) {
      try {
        const response = await axios.post(
          "https://api-inference.huggingface.co/models/google/pegasus-xsum",
          { inputs: chunk },
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        summaries.push(response.data[0]?.summary_text || "");
      } catch (err) {
        console.error("Hugging Face model error:", err.response?.data || err.message);
        throw new Error("Model is unavailable or busy. Try again later.");
      }
    }
  
    return summaries
      .filter((s) => s.trim() !== "")
      .map((s) => `• ${s.trim()}`)
      .join("\n\n");
  }
  
  // Step 1: Extract PDF Text and pass to summarizer
  router.post("/extract-pdf-text", async (req, res) => {
    const { pdfUrl } = req.body;
  
    if (!pdfUrl) {
      return res.status(400).json({ error: "PDF URL is required." });
    }
  
    const filePath = path.join(process.cwd(), `temp-${Date.now()}.pdf`);
  
    try {
      const response = await axios.get(pdfUrl, { responseType: "stream" });
      await pipeline(response.data, fs.createWriteStream(filePath));
  
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
  
      fs.unlinkSync(filePath);
  
      const summary = await summarizeText(pdfData.text);
      console.log("Summary final: ", summary);
      res.json({ summary });
  
    } catch (error) {
      console.error("PDF Processing Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to extract and summarize PDF." });
    }
  });

  export default router;