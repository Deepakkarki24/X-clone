import express from "express";

const userRouter = express.Router();

import User from "../models/user.models.js";
import { v4 as uuidv4 } from "uuid";

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
      message: "Password must be atleast 8 letters.",
    });
  }

  //Validation..

  // process to save the data into mongo db

  try {
    const userFound = await User.findOne({ email: email }); //checks that this email has already registerd or not.

    if (userFound) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }

    //create new user with the User schema object from usermodels.
    let newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password,
    });

    let savedUser = await newUser.save(); //save the user data into mongo db and save the value into the var.

    if (!savedUser) {
      return res.json({
        success: false,
        message: "Error while saving user Data!",
      });
    }

    res.json({
      success: true,
      message: "User data saved successfully!",
      data: savedUser,
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

  let foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    return res.json({
      success: false,
      message: "User not found!",
    });
  }

  if (foundUser.password != password) {
    return res.json({
      success: false,
      message: "Incorrect password",
    });
  }

  const token = uuidv4();
  foundUser.token = token;

  try {
    const updatedUser = await foundUser.save();

    return res.json({
      success: true,
      message: "Successfully Logged IN!",
      token: token,
      data: updatedUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error while saving user",
    });
  }
});

// Logout

userRouter.delete("/logout", async (req, res) => {
  let token = req.headers.authorization;
  let foundUser = await User.findOne({ token: token });

  if (!token) {
    return res.json({
      success: false,
      message: "No token found or not LoggedIn!",
    });
  }

  try {
    // find user by token

    if (!foundUser) {
      return res.json({
        success: false,
        message: "Invailid token or user already logged out",
      });
    }

    // clear token to log the user out

    foundUser.token = null;
    let updatedUser = await foundUser.save();

    return res.json({
      success: true,
      message: "Succesfully Logged out",
      data: updatedUser,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

userRouter.get("/get-user-details", async (req, res) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.json({
      success: false,
      message: "No token found or not logged In!!",
    });
  }

  let foundUser = await User.findOne({ token: token });

  try {
    if (!foundUser) {
      return res.json({
        success: false,
        message: "No user found or user logged out",
      });
    }

    if (foundUser) {
      return res.json({
        success: true,
        message: "User found!",
        data: {
          name: foundUser.name,
          username: foundUser.username,
          email: foundUser.email,
        },
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

export default userRouter;
