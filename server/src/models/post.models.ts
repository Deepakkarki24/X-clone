import mongoose, { type InferSchemaType } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true },
);

export type PostDocument = InferSchemaType<typeof postSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Post = mongoose.model("post", postSchema);

export default Post;
