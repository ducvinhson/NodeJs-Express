import express from "express";
import {
  homeController,
  homeDetailsController,
} from "./../controllers/homeController.js";

const router = express.Router();

router.get("/details", homeDetailsController);
router.get("/", homeController);

export default router;
