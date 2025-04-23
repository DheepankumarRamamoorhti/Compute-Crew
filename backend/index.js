// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database.js";
import authRoutes from "./routes/auth.js";
import summaryRoutes from "./routes/Summariser.js";
// import * as FormData from "form-data";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// Connect to MongoDB
connectDB();

// Auth API
app.use("/api/auth", authRoutes);
app.use("/api/summary", summaryRoutes);


app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
