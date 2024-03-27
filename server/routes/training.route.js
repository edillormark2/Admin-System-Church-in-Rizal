import express from "express";
import {
  coordinatorsAdd,
  coordinatorsDisplay
} from "../controllers/training.controller.js";

const router = express.Router();

router.post("/coordinators-add", coordinatorsAdd);
router.get("/coordinators-display", coordinatorsDisplay);

export default router;
