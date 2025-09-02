import express from "express";
import pregnancyUpdates from "../data/pregnancyUpdates.js"; // your 40-weeks data
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all weeks
router.get("/weeks", protect, (req, res) => {
  res.json(pregnancyUpdates);
});

export default router;
