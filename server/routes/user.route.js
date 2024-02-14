import express from "express";
import { getUserAdmin, getAdminCount } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/useradmin/users", getUserAdmin);
router.get("/useradmin/count", getAdminCount);
export default router;
