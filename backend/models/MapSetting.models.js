import mongoose from "mongoose";

const MapSettingSchema = new mongoose.Schema({
  mapAddress: { type: String, required: true, default: "" }
}, { timestamps: true });

export default mongoose.model("MapSetting", MapSettingSchema);
