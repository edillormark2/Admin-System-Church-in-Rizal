import express from "express";
import {
  announcementPost,
  announcementDisplay,
  getAnnouncementByID,
  updateAnnouncementByID,
  deleteAnnouncementByID
} from "../controllers/announcement.controller.js";

const router = express.Router();

router.post("/announcement-post", announcementPost);
router.get("/announcement-display", announcementDisplay);
router.get("/announcement-display/:id", getAnnouncementByID);
router.put("/announcement-update/:id", updateAnnouncementByID);
router.delete("/announcement-delete/:id", deleteAnnouncementByID);

export default router;
