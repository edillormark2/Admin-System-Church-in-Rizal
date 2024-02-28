import express from "express";
import {
  registrationDisplay,
  updateStatusByID,
  registrationGetbyID,
  registrationUpdateByID
} from "../controllers/registration.controller.js";

const router = express.Router();

router.get("/registration-display", registrationDisplay);
router.put("/registration-open-close/:id", updateStatusByID);
router.get("/registration-get/:id", registrationGetbyID);
router.put("/registration-update/:id", registrationUpdateByID);

export default router;
