import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  location: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  profileImg: { type: String, default: "profile_default.jpg" },
  coverImg: { type: String, default: "cover_default.jpg" },
});

const User = mongoose.model("user", userSchema);

export default User;
