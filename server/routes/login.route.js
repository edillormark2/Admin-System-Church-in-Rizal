import express from "express";
import { adminlogin, adminsignup } from "../controllers/login.controller.js";

const router = express.Router();

router.post("/adminlogin", adminlogin);
router.post("/adminsignup", adminsignup);

export default router;
