import express from "express";
import {
  coordinatorsAdd,
  coordinatorsDisplay,
  coordinatorsDelete,
  teamCreate,
  teamDisplay,
  teamDisplayByID,
  teamEditByID,
  teamDeleteByID,
  awardCreate,
  awardDisplay,
  awardDeleteByID,
  awardeeAddByID,
  awardeeDeleteByID
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

router.post("/award-create", awardCreate);
router.get("/award-display", awardDisplay);
router.delete("/award-delete/:id", awardDeleteByID);
router.post("/awardee-add/:id", awardeeAddByID);
router.delete("/awardee-delete/:id", awardeeDeleteByID);

export default router;
