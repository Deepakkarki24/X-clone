import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    let { name, username, email, password } = req.body;

    //Validation..

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast greater than 3 letters.",
      });
    }

    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }

    let hashedPwd = await bcrypt.hash(password, 10);

    //create new user with the User schema object from usermodels.
    let newUser = await User.create({
      name,
      username,
      email,
      password: hashedPwd,
    });

    if (!newUser) {
      return res.status(409).json({
        success: false,
        message: "Error while creating user",
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
      sameSite: "strict",
    });

    const { password: pwd, ...userWithoutPwd } = newUser._doc;

    return res.status(200).json({
      success: true,
      message: "Account created succesfully!",
      data: userWithoutPwd,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(409).json({
        success: false,
        message: "All Fields are required",
      });
    }

    let foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(409).json({
        success: false,
        message: "Email or password doesn't match!",
      });
    }

    let compare = await bcrypt.compare(password, foundUser.password);

    if (!compare) {
      return res.status(400).json({
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

    return res.status(200).json({
      success: true,
      message: "Successfully Logged In!",
      data: userWithoutPwd,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Succesfully Logged out!",
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    let userFound = await User.findOne({ email: req.user.email });
    if (!userFound) {
      return res.status(401).json({
        success: false,
        message: "No user found or user logged out",
      });
    }

    let { password: pwd, ...userWithoutPwd } = userFound._doc;

    return res.status(200).json({
      success: true,
      message: "User found!",
      data: userWithoutPwd,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.user.email });

    if (!foundUser) {
      return res.status(401).json({
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

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: foundUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
