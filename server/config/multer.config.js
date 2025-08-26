import multer from "multer";
import path from "path";

// configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(12, function (err, name) {
      const filename = name.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const upload = multer({ storage });

export default upload;
