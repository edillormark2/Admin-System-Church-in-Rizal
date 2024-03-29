import express from "express";
import {
  coordinatorsAdd,
  coordinatorsDisplay,
  coordinatorsDelete,
  teamCreate,
  teamDisplay,
  teamDisplayByID,
  teamEditByID,
  teamDeleteByID
} from "../controllers/training.controller.js";

const router = express.Router();

router.post("/coordinators-add", coordinatorsAdd);
router.get("/coordinators-display", coordinatorsDisplay);
router.delete("/coordinators-delete/:id", coordinatorsDelete);

router.post("/team-create", teamCreate);
router.get("/team-display", teamDisplay);
router.get("/team-display/:id", teamDisplayByID);
router.put("/team-edit/:id", teamEditByID);
router.delete("/team-delete/:id", teamDeleteByID);

export default router;
