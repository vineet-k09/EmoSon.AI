import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import chatbotRoutes from "./routes/chatbot.js";
import communityRoutes from "./routes/community.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/community", communityRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
