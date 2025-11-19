 import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  images: [
    {
      full: { type: String, required: true },
      relative: { type: String, required: true }
    }
  ],

  heading: {
    type: String,
    default: "Autism Support & Therapy"
  },

  highlight: {
    type: String,
    default: "Caring, Evidence-Based"
  },

  subheading: {
    type: String,
    default: "Personalized therapy, parent training, and school support."
  },

  highlightColor: {
    type: String,
    default: "#F57C00"
  },

  textColor: {
    type: String,
    default: "#FFFFFF"
  },

  buttonBg: {
    type: String,
    default: "#FFFFFF"
  },

  buttonTextColor: {
    type: String,
    default: "#2E7D32"
  }
});

export default mongoose.model("Hero", heroSchema);
