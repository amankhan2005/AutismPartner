 import multer from "multer";
import path from "path";
import fs from "fs";

const folder = "uploads/hero";
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder, { recursive: true });
}

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, "hero_" + Date.now() + path.extname(file.originalname));
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"), false);
  }
  cb(null, true);
};

export const uploadHero = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
