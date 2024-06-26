import express from "express";
import {
  eventCreate,
  eventDisplayByYear,
  eventDisplay,
  eventDeleteByID,
  updateEventByID
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/event-create", eventCreate);
router.get("/event-display-year", eventDisplayByYear);
router.get("/event-display", eventDisplay);
router.delete("/event-delete/:id", eventDeleteByID);
router.put("/event-update/:id", updateEventByID);

export default router;
