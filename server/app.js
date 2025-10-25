import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Give the permission to frontend to run the bakcend port into the frontend
app.use(
  cors({
    // origin: "https://x-clone-frontend-n5ba.onrender.com", // frontend URL
    origin: "http://localhost:5173",
    credentials: true,
  })
);

import User from "./models/user.models.js";
import Post from "./models/post.models.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import connectDB from "./config/db.js";

// Middleware first
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes next
app.use(userRouter);
app.use(postRouter);

// Db connection
connectDB();

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
