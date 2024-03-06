import express from "express";
import {
  BRregistrantsDisplay,
  BRregistrantsAdd,
  BRregistrantsDeleted,
  BRregistrantsDisplayByID,
  TOLTregistrantsDisplay,
  TOLTregistrantsAdd,
  TOLTregistrantsDeleted,
  TOLTregistrantsDisplayByID,
  BRregistrantsUpdateInByID,
  BRregistrantsUpdateOutByID
} from "../controllers/registrants.controller.js";

const router = express.Router();

//Bible Reading routes
router.get("/br-registrants-display", BRregistrantsDisplay);
router.post("/br-registrants-add", BRregistrantsAdd);
router.delete("/br-registrants-delete/:id", BRregistrantsDeleted);
router.get("/br-registrant-display/:id", BRregistrantsDisplayByID);
router.put("/br-registrant-update-checkin/:id", BRregistrantsUpdateInByID);
router.put("/br-registrant-update-checkout/:id", BRregistrantsUpdateOutByID);
//TOLT routes
router.get("/tolt-registrants-display", TOLTregistrantsDisplay);
router.post("/tolt-registrants-add", TOLTregistrantsAdd);
router.delete("/tolt-registrants-delete/:id", TOLTregistrantsDeleted);
router.get("/tolt-registrant-display/:id", TOLTregistrantsDisplayByID);

export default router;
