import express from "express";
import {
  getUserAdmin,
  getAdminCount,
  updateUserAdmin,
  getUserAdminByID,
  deleteUserAdmin 
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/useradmin/users", getUserAdmin);
router.get("/useradmin/count", getAdminCount);
router.get("/useradmin/:userID", getUserAdminByID);
router.put("/useradmin/update/:userID", updateUserAdmin);
router.delete("/useradmin/delete/:userID", deleteUserAdmin);

export default router;
