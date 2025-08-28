import multer from "multer";
import path from "path";
import crypto from "crypto";

// configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      crypto.randomBytes(12).toString("hex") + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
