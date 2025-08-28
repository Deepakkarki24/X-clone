import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  let token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
