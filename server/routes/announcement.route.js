import express from "express";
import {
  announcementPost,
  announcementDisplay,
  getAnnouncementByID,
  updateAnnouncementByID,
  deleteAnnouncementByID,
  pinAnnouncementByID,
  unpinAnnouncementByID
} from "../controllers/announcement.controller.js";

const router = express.Router();

router.post("/announcement-post", announcementPost);
router.get("/announcement-display", announcementDisplay);
router.get("/announcement-display/:id", getAnnouncementByID);
router.put("/announcement-update/:id", updateAnnouncementByID);
router.delete("/announcement-delete/:id", deleteAnnouncementByID);
router.put("/announcement-pin/:id", pinAnnouncementByID);
router.put("/announcement-unpin/:id", unpinAnnouncementByID);

export default router;
