import express from "express";
import { v4 as uuidv4 } from "uuid";

import multer from "multer";
import { storage } from "../config/cloudinary.js";
import Post from "../models/post.models.js";

const postRouter = express.Router();
const upload = multer({ storage });

postRouter.post("/add-tweet", upload.single("tweetMedia"), async (req, res) => {
  let { tweetText } = req.body;

  let postId = uuidv4();

  try {
    let newPost = new Post({
      postId: postId,
      tweetText: tweetText,
      tweetMedia: {
        url: req.file?.path || "",
        public_id: req.file?.filename,
      },
    });

    let savedPost = await newPost.save();

    if (!savedPost) {
      return res.json({
        success: false,
        message: "Error while save post in DB!",
      });
    }

    res.json({
      success: true,
      message: "Succesfully Posted!!",
      data: savedPost,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

postRouter.get("/get-posts", async (req, res) => {
  try {
    let post = await Post.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      message: "Succesfully fetched data!",
      data: post,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

export default postRouter;
