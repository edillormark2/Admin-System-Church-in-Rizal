import express from "express";
import { announcementpost } from "../controllers/announcement.controller.js";

const router = express.Router();

router.post("/announcement-post", announcementPost);

export default router;
