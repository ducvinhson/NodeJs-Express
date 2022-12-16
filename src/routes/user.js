import express from "express";
import authMiddleware from "../middleware/authMiddleWare.js";
import {
  createUserController,
  DeleteAllController,
  DeleteController,
  getAllController,
  loginUserController,
  refreshTokenController,
  searchController,
  updateController,
  userController,
  userDetailsController,
} from "./../controllers/userController.js";

const router = express.Router();

router.get("/search", searchController);

router.get("/getAll", authMiddleware, getAllController);

router.patch("/update/:id", updateController);

router.delete("/delete/:id", DeleteController);

router.delete("/deleteMulti", DeleteAllController);

router.get("/:userId", userDetailsController);

router.get("/", userController);

router.post("/", createUserController);

router.post("/login", loginUserController);

router.post("/refreshToken", refreshTokenController);

export default router;
