 import fs from "fs";
import path from "path";
import Hero from "../models/hero.Model.js";

const heroFolder = "uploads/hero";
if (!fs.existsSync(heroFolder)) {
  fs.mkdirSync(heroFolder, { recursive: true });
}

const BASE = process.env.BASE_URL || "https://autismpartner.onrender.com";

/* ====================================================
   GET HERO (Images + Text)
==================================================== */
export const getHero = async (req, res) => {
  try {
    // ---- IMAGES (filesystem) ----
    const files = fs.readdirSync(heroFolder);
    const images = files.map((file) => ({
      full: `${BASE}/uploads/hero/${file}`,
      relative: `/uploads/hero/${file}`
    }));

    // ---- TEXT (from database) ----
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({}); // creates with default text
    }

    res.json({
      images,
      text: {
        heading: hero.heading,
        highlight: hero.highlight,
        subheading: hero.subheading,
        highlightColor: hero.highlightColor,
        textColor: hero.textColor,
        buttonBg: hero.buttonBg,
        buttonTextColor: hero.buttonTextColor
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load hero section" });
  }
};

/* ====================================================
   UPDATE HERO TEXT
==================================================== */
export const updateHeroText = async (req, res) => {
  try {
    const body = req.body;

    let hero = await Hero.findOne();
    if (!hero) hero = await Hero.create({});

    Object.assign(hero, body);
    await hero.save();

    res.json({ message: "Hero text updated", text: hero });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Text update failed" });
  }
};

/* ====================================================
   UPLOAD IMAGES
==================================================== */
export const uploadHeroImage = (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const images = files.map((f) => ({
      full: `${BASE}/uploads/hero/${f.filename}`,
      relative: `/uploads/hero/${f.filename}`
    }));

    return res.json({ message: "Uploaded successfully", images });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};

/* ====================================================
   DELETE IMAGE
==================================================== */
export const deleteHeroImage = (req, res) => {
  const { filename } = req.body;

  if (!filename) return res.status(400).json({ error: "Filename required" });

  const filePath = path.join(heroFolder, filename);

  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  res.json({ message: "Deleted successfully" });
};
