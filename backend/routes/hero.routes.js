 import express from "express";
import {
  getHero,
  uploadHeroImage,
  deleteHeroImage,
  updateHeroText
} from "../controllers/hero.controllers.js";

import { uploadHero } from "../middleware/uploadHero.js";

const router = express.Router();

// FULL HERO (images + text)
router.get("/", getHero);

// upload images
router.post("/upload", uploadHero.array("images", 10), uploadHeroImage);

// delete image
router.delete("/delete", deleteHeroImage);

// TEXT update
router.put("/text", updateHeroText);

export default router;
