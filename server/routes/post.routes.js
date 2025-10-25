import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import multer from "multer";
import { storage } from "../config/cloudinary.js";
import Post from "../models/post.models.js";
import {
  addTweet,
  getAllPosts,
  getUserPosts,
  likePost,
} from "../controllers/postController.js";

const postRouter = express.Router();
const upload = multer({ storage });

postRouter.post(
  "/add-tweet",
  authMiddleware,
  upload.single("tweetMedia"),
  addTweet
);

postRouter.get("/get-all-posts", authMiddleware, getAllPosts);

postRouter.get("/get-user-posts", authMiddleware, getUserPosts);

postRouter.get("/like-post/:id", authMiddleware, likePost);

export default postRouter;
