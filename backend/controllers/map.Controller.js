import MapSetting from "../models/MapSetting.models.js";

export const getMap = async (req, res) => {
  try {
    const map = await MapSetting.findOne();
    res.json(map || { mapAddress: "" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMap = async (req, res) => {
  try {
    let map = await MapSetting.findOne();

    if (!map) {
      map = new MapSetting();
    }

    map.mapAddress = req.body.mapAddress;
    await map.save();

    res.json({ message: "Map updated", map });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
