import express from "express";
import {
  eventCreate,
  eventDisplayByYear,
  eventDisplay,
  eventDeleteByID
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/event-create", eventCreate);
router.get("/event-display-year", eventDisplayByYear);
router.get("/event-display", eventDisplay);
router.delete("/event-delete/:id",  eventDeleteByID);

export default router;
