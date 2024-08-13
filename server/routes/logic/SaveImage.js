import express from "express";
import multer from "multer";
import path from "path";
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  const image = req.file.filename;
  return res.json(image);
});

export default app;
