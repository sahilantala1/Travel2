import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../Controllers/tourControllers.js";
import multer from "multer";
import { verifyAdmin } from "../utils/verifyToken.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

//Create new tour
router.post("/", upload.single("photo"), verifyAdmin, createTour);

//Update tour
router.put("/:id", verifyAdmin, updateTour);

//Delete tour
router.delete("/:id", verifyAdmin, deleteTour);

//Get single tour
router.get("/:id", getSingleTour);

//Get all tour
router.get("/", getAllTour);

//Get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTour", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

export default router;
