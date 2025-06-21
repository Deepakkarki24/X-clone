import express from "express";
import { v4 as uuidv4 } from "uuid";

const postRouter = express.Router();

import Post from "../models/post.models.js";

postRouter.post("/add-tweet", async (req, res) => {
  let { tweetText, tweetMedia } = req.body;

  console.log(tweetMedia, tweetText);

  let postId = uuidv4();

  try {
    let newPost = new Post({
      postId: postId,
      tweetMedia: tweetMedia,
      tweetText: tweetText,
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
