import mongoose from "mongoose";
import dotenv from "dotenv";
import { getErrorMessage } from "../types/api.js";

dotenv.config();

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODBURI;
  if (!uri) {
    console.error("MONGODBURI is not defined in environment");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("DB is connected!!");
  } catch (err) {
    console.log(getErrorMessage(err));
    process.exit(1);
  }
};

export default connectDB;
