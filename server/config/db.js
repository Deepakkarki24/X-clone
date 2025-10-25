import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI);
    console.log("DB is connected!!");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
