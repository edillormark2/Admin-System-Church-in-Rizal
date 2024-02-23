import express from "express";
import {
  announcementPost,
  announcementDisplay
} from "../controllers/announcement.controller.js";

const router = express.Router();

router.post("/announcement-post", announcementPost);
router.get("/announcement-display", announcementDisplay);

export default router;
