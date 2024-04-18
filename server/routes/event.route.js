import express from "express";
import { eventCreate, eventDisplay } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/event-create", eventCreate);
router.get("/event-display", eventDisplay);

export default router;
