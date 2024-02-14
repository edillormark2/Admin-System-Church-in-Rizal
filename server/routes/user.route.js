import express from "express";
import { getUserAdmin } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/useradmin/users", getUserAdmin);
export default router;
