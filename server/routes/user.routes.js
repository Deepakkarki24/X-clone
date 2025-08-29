import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../config/multer.config.js";

import dotenv from "dotenv";

dotenv.config();

const userRouter = express.Router();
userRouter.post("/signup", async (req, res) => {
  let { name, username, email, password } = req.body;

  //Validation..

  if (!name || !username || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (password.length < 3) {
    return res.json({
      success: false,
      message: "Password must be atleast greater than 3 letters.",
    });
  }

  //Validation..

  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPwd = await bcrypt.hash(password, salt);

    //create new user with the User schema object from usermodels.
    let newUser = await new User({
      name,
      username,
      email,
      password: hashedPwd,
    }).save();

    if (!newUser) {
      return res.json({
        success: false,
        message: "Error while signing up",
      });
    }

    const token = jwt.sign(
      { id: newUser._id, email },
      process.env.JWTSECRETKEY,
      {
        expiresIn: process.env.JWTEXPIRESIN,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const { password: pwd, ...userWithoutPwd } = newUser._doc;

    return res.json({
      success: true,
      message: "Account created succesfully!",
      data: userWithoutPwd,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// Login

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "All Fields are required",
    });
  }

  try {
    let foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.json({
        success: false,
        message: "Email or password doesn't match!",
      });
    }

    let compare = await bcrypt.compare(password, foundUser.password);

    if (!compare) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { id: foundUser._id, email },
      process.env.JWTSECRETKEY,
      {
        expiresIn: process.env.JWTEXPIRESIN,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const { password: pwd, ...userWithoutPwd } = foundUser._doc;

    return res.json({
      success: true,
      message: "Successfully Logged In!",
      data: userWithoutPwd,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

// Logout

userRouter.get("/logout", authMiddleware, async (req, res) => {
  try {
    res.clearCookie("token");

    return res.json({
      success: true,
      message: "Succesfully Logged out",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

userRouter.get("/me", authMiddleware, async (req, res) => {
  let userFound = await User.findOne({ email: req.user.email });

  try {
    if (!userFound) {
      return res.json({
        success: false,
        message: "No user found or user logged out",
      });
    }

    let { password: pwd, ...userWithoutPwd } = userFound._doc;

    return res.json({
      success: true,
      message: "User found!",
      data: userWithoutPwd,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

userRouter.post(
  "/edit-profile",
  authMiddleware,
  upload.fields([
    { name: "profile_image", maxCount: 1 },
    { name: "cover_image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const foundUser = await User.findOne({ email: req.user.email });

      if (!foundUser) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }

      let { name, username, bio, location } = req.body;

      if (req.files["profile_image"]) {
        foundUser.profileImg = req.files["profile_image"][0].filename;
      }

      if (req.files["cover_image"]) {
        foundUser.coverImg = req.files["cover_image"][0].filename;
      }

      if (name) foundUser.name = name;

      if (username) foundUser.username = username;

      if (bio) foundUser.bio = bio;

      if (location) foundUser.location = location;

      await foundUser.save();

      return res.json({
        success: true,
        message: "Profile updated successfully",
        data: foundUser,
      });
    } catch (err) {
      return res.json({
        success: false,
        message: err.message,
      });
    }
  }
);

export default userRouter;
