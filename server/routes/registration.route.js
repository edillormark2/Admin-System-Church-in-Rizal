import express from "express";
import {
  registrationDisplay,
  updateStatusByID,
  registrationGetbyID
} from "../controllers/registration.controller.js";

const router = express.Router();

router.get("/registration-display", registrationDisplay);
router.put("/registration-open-close/:id", updateStatusByID);
router.get("/registration-get/:id", registrationGetbyID);

export default router;
