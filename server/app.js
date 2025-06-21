import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import User from "./models/user.models.js";
import Post from "./models/post.models.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();
const port = 3001;

// Give the permission to frontend to run the bakcend port into the frontend
app.use(
  cors({
    origin: "*",
  })
);

// Middleware first
app.use(express.json());

// Routes next
app.use(userRouter);
app.use(postRouter);

mongoose
  .connect(
    "mongodb+srv://dishunwab0:VHk0UNfX4iMI98c5@cluster0.ugyic8h.mongodb.net/x-clone"
  )
  .then(() => {
    console.log("Db is Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
