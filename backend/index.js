// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createRequire } from "module";
import { connectDB } from "./database.js";
import authRoutes from "./routes/auth.js";
import summaryRoutes from "./routes/Summariser.js";
// import * as FormData from "form-data";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// Connect to MongoDB
connectDB();

// const API_SEARCH_URL = "http://export.arxiv.org/api/query?search_query=all:deep+learning";

// const CORE_API_KEY = 'hJXdB3OTNY9HSvFWcmDa8lEUrqjGueL1';
// Auth API
app.use("/api/auth", authRoutes);
app.use("/api/summary", summaryRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));
