import express from "express";
import { eventCreate } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/event-create", eventCreate);

export default router;
