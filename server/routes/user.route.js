import express from "express";
import {
  getUserAdmin,
  getAdminCount,
  updateUserAdmin,
  getUserAdminByID
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/useradmin/users", getUserAdmin);
router.get("/useradmin/count", getAdminCount);
router.put("/useradmin/update/:userID", updateUserAdmin);
router.get("/useradmin/:userID", getUserAdminByID);

export default router;
