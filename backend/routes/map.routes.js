import express from "express";
import { getMap, updateMap } from "../controllers/map.Controller.js";

const router = express.Router();

router.get("/", getMap);        // GET map address
router.put("/", updateMap);     // UPDATE map address

export default router;
