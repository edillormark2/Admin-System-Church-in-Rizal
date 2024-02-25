import express from "express";
import { registrationDisplay } from "../controllers/registration.controller.js";

const router = express.Router();

router.get("/registration-display", registrationDisplay);

export default router;
