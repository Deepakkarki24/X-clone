import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.models.js";
import { getErrorMessage, sendServerError } from "../types/api.js";
import { omitPassword } from "../utils/user.js";

dotenv.config();

const getJwtOptions = (): SignOptions => ({
  expiresIn: (process.env.JWTEXPIRESIN ?? "7d") as SignOptions["expiresIn"],
});

const signToken = (id: string, email: string) => {
  const secret = process.env.JWTSECRETKEY;
  if (!secret) {
    throw new Error("JWT secret not configured");
  }
  return jwt.sign({ id, email }, secret, getJwtOptions());
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body as {
      name?: string;
      username?: string;
      email?: string;
      password?: string;
    };

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

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
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

    const token = signToken(newUser._id.toString(), email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Account created succesfully!",
      data: omitPassword(newUser),
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.status(409).json({
        success: false,
        message: "All Fields are required",
      });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(409).json({
        success: false,
        message: "Email or password doesn't match!",
      });
    }

    const compare = await bcrypt.compare(password, foundUser.password);
    if (!compare) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = signToken(foundUser._id.toString(), email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Successfully Logged In!",
      data: omitPassword(foundUser),
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Succesfully Logged out!",
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: getErrorMessage(err),
    });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    if (!req.user?.email) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userFound = await User.findOne({ email: req.user.email });
    if (!userFound) {
      return res.status(401).json({
        success: false,
        message: "No user found or user logged out",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found!",
      data: omitPassword(userFound),
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user?.email) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const foundUser = await User.findOne({ email: req.user.email });
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, username, bio, location } = req.body as {
      name?: string;
      username?: string;
      bio?: string;
      location?: string;
    };

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    if (files?.profile_image?.[0]) {
      foundUser.profileImg = files.profile_image[0].filename;
    }

    if (files?.cover_image?.[0]) {
      foundUser.coverImg = files.cover_image[0].filename;
    }

    if (name) foundUser.name = name;
    if (username) foundUser.username = username;
    if (bio) foundUser.bio = bio;
    if (location) foundUser.location = location;

    await foundUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: omitPassword(foundUser),
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
