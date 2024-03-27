import express from "express";
import {
  coordinatorsAdd,
  coordinatorsDisplay,
  coordinatorsDelete
} from "../controllers/training.controller.js";

const router = express.Router();

router.post("/coordinators-add", coordinatorsAdd);
router.get("/coordinators-display", coordinatorsDisplay);
router.delete("/coordinators-delete/:id", coordinatorsDelete);

export default router;
