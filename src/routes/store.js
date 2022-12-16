import express from "express";
import { storeController } from "./../controllers/storeController.js";

const router = express.Router();

router.get("/", storeController);

export default router;
