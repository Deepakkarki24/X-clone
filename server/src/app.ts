import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import connectDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://x-clone-frontend-n5ba.onrender.com",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(userRouter);
app.use(postRouter);

connectDB();

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

export default app;
