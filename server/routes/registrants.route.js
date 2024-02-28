import express from "express";
import {
  registrantsDisplay,
  registrantsAdd,
  registrantsDeleted,
  registrantsDisplayByID
} from "../controllers/registrants.controller.js";

const router = express.Router();

router.get("/registrants-display", registrantsDisplay);
router.post("/registrants-add", registrantsAdd);
router.delete("/registrants-delete/:id", registrantsDeleted);
router.get("/registrant-display/:id", registrantsDisplayByID);

export default router;
