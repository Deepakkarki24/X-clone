import Post from "../models/post.models.js";

export const addTweet = async (req, res) => {
  try {
    let { tweetText } = req.body;
    let newPost = new Post({
      userId: req.user.id,
      tweetText: tweetText,
      tweetMedia: {
        url: req.file?.path || "",
        public_id: req.file?.filename,
      },
    });

    let savedPost = await newPost.save();

    if (!savedPost) {
      return res.status(400).json({
        success: false,
        message: "Error while save post in DB!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Succesfully Posted!!",
      data: savedPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let allPost = await Post.find({}).populate("userId");

    return res.status(200).json({
      success: true,
      message: "Succesfully fetched data!",
      data: allPost.reverse(),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    let post = await Post.find({ userId: req.user.id }).populate("userId");
    return res.status(200).json({
      success: true,
      message: "Succesfully fetched data!",
      data: post.reverse(),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const likePost = async (req, res) => {
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
        return res.status(200).json({
          success: true,
          message: "Post unliked",
          data: foundPost,
        });
      }
    } else {
      foundPost.likes.push(userId);
      await foundPost.save();
      return res.status(200).json({
        success: true,
        message: "Post liked",
        data: foundPost,
      });
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};
