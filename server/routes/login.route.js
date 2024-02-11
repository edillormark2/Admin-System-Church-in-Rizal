import express from "express";
import {
  adminlogin,
  registrationlogin,
  inventorylogin,
  adminsignup
} from "../controllers/login.controller.js";

const router = express.Router();

router.post("/adminlogin", adminlogin);
router.post("/registrationlogin", registrationlogin);
router.post("/inventorylogin", inventorylogin);
router.post("/adminsignup", adminsignup);

export default router;
