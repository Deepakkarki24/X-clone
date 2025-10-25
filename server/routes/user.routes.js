import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../config/multer.config.js";
import {
  checkAuth,
  editProfile,
  getUser,
  login,
  logout,
  signup,
} from "../controllers/userController.js";

import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();

// Signup
userRouter.post("/signup", signup);

// Login
userRouter.post("/login", login);

// Logout
userRouter.get("/logout", authMiddleware, logout);

// check user
userRouter.get("/me", authMiddleware, checkAuth);

userRouter.post(
  "/edit-profile",
  authMiddleware,
  upload.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "cover_image", maxCount: 1 },
  ]),
  editProfile
);

userRouter.get("/users/:username", getUser);

export default userRouter;
