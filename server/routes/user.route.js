import express from "express";
import { getUserAdmin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/useradmin/:id", getUserAdmin);
export default router;
