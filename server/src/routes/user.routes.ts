import express from "express";
import dotenv from "dotenv";
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

dotenv.config();

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", authMiddleware, logout);
userRouter.get("/me", authMiddleware, checkAuth);

userRouter.post(
  "/edit-profile",
  authMiddleware,
  upload.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "cover_image", maxCount: 1 },
  ]),
  editProfile,
);

userRouter.get("/users/:username", getUser);

export default userRouter;
