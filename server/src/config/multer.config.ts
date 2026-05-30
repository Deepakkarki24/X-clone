import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./public/images");
  },
  filename: (_req, file, cb) => {
    const uniqueName =
      crypto.randomBytes(12).toString("hex") + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
