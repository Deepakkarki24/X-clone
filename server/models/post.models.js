import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      unique: true,
    },
    tweetText: {
      type: String,
    },
    tweetMedia: {
      url: {
        type: String,
      },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
