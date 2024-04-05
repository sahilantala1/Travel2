import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../Controllers/userController.js";

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Get all user
router.get("/", verifyAdmin, getAllUser);

//Update user
router.put("/:id", verifyUser, updateUser);

//Delete user
router.delete("/:id", verifyUser, deleteUser);

//Get single user
router.get("/:id", verifyUser, getSingleUser);

export default router;
