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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
