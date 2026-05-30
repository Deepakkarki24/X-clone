import type { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/post.models.js";
import { sendServerError } from "../types/api.js";

export const addTweet = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { tweetText } = req.body as { tweetText?: string };

    const newPost = new Post({
      userId: req.user.id,
      tweetText,
      tweetMedia: {
        url: req.file?.path ?? "",
        public_id: req.file?.filename,
      },
    });

    const savedPost = await newPost.save();
    if (!savedPost) {
      return res.status(400).json({
        success: false,
        message: "Error while save post in DB!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Succesfully Posted!!",
      data: savedPost,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const allPost = await Post.find({}).populate("userId");

    return res.status(200).json({
      success: true,
      message: "Succesfully fetched data!",
      data: allPost.reverse(),
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const posts = await Post.find({ userId: req.user.id }).populate("userId");

    return res.status(200).json({
      success: true,
      message: "Succesfully fetched data!",
      data: posts.reverse(),
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const foundPost = await Post.findById(postId);
    if (!foundPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const hasLiked = foundPost.likes.some((id) => id.toString() === userId);

    if (hasLiked) {
      foundPost.likes = foundPost.likes.filter(
        (id) => id.toString() !== userId,
      );
      await foundPost.save();
      return res.status(200).json({
        success: true,
        message: "Post unliked",
        data: foundPost,
      });
    }

    foundPost.likes.push(new mongoose.Types.ObjectId(userId));
    await foundPost.save();
    return res.status(200).json({
      success: true,
      message: "Post liked",
      data: foundPost,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
