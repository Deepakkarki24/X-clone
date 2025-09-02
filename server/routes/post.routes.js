import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import multer from "multer";
import { storage } from "../config/cloudinary.js";
import Post from "../models/post.models.js";

const postRouter = express.Router();
const upload = multer({ storage });

postRouter.post(
  "/add-tweet",
  authMiddleware,
  upload.single("tweetMedia"),
  async (req, res) => {
    let { tweetText } = req.body;

    try {
      let newPost = new Post({
        userId: req.user.id,
        tweetText: tweetText,
        tweetMedia: {
          url: req.file?.path || "",
          public_id: req.file?.filename,
        },
      });

      console.log(newPost);

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
  }
);

postRouter.get("/get-all-posts", authMiddleware, async (req, res) => {
  try {
    let allPost = await Post.find({}).populate("userId");

    return res.json({
      success: true,
      message: "Succesfully fetched data!",
      data: allPost.reverse(),
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

postRouter.get("/get-user-posts", authMiddleware, async (req, res) => {
  try {
    let post = await Post.find({ userId: req.user.id }).populate("userId");
    return res.json({
      success: true,
      message: "Succesfully fetched data!",
      data: post.reverse(),
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

postRouter.get("/like-post/:id", authMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    let foundPost = await Post.findById(postId);
    if (!foundPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (foundPost.likes.includes(userId)) {
      {
        foundPost.likes = foundPost.likes.filter(
          (id) => id.toString() !== userId
        );
        await foundPost.save();
        return res.json({
          success: true,
          message: "Post unliked",
          data: foundPost,
        });
      }
    } else {
      foundPost.likes.push(userId);
      await foundPost.save();
      return res.json({
        success: true,
        message: "Post liked",
        data: foundPost,
      });
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
});

export default postRouter;
