import express from "express";
import {
  getUserCounts,
  getCurrentUserData,
  updateCurrentUser,
  getUserAdmin,
  updateUserAdmin,
  getUserAdminByID,
  deleteUserAdmin,
  getUserReg,
  getUserRegByID,
  updateUserReg,
  deleteUserReg,
  getUserInv,
  getUserInvByID,
  updateUserInv,
  deleteUserInv,
  getUserReport,
  getUserReportByID,
  updateUserReport,
  deleteUserReport
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.get("/userCounts", getUserCounts);
router.get("/userCurrentUser/:id", getCurrentUserData);
router.put("/userUpdateCurrentUser/:id", verifyToken, updateCurrentUser);
router.get("/useradmin/users", getUserAdmin);
router.get("/useradmin/:userID", getUserAdminByID);
router.put("/useradmin/update/:userID", updateUserAdmin);
router.delete("/useradmin/delete/:userID", deleteUserAdmin);
router.get("/userreg/users", getUserReg);
router.get("/userreg/:userID", getUserRegByID);
router.put("/userreg/update/:userID", updateUserReg);
router.delete("/userreg/delete/:userID", deleteUserReg);
router.get("/userinv/users", getUserInv);
router.get("/userinv/:userID", getUserInvByID);
router.put("/userinv/update/:userID", updateUserInv);
router.delete("/userinv/delete/:userID", deleteUserInv);
router.get("/userreport/users", getUserReport);
router.get("/userreport/:userID", getUserReportByID);
router.put("/userreport/update/:userID", updateUserReport);
router.delete("/userreport/delete/:userID", deleteUserReport);
export default router;
