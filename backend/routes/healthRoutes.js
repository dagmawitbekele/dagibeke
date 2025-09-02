import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addHealthLog,
  getHealthLogs,
  getHealthLogById,
  updateHealthLog,
  deleteHealthLog,
} from "../controllers/healthController.js";

const router = express.Router();

router.route("/")
  .post(protect, addHealthLog)   // Add new log
  .get(protect, getHealthLogs);  // Get all logs

router.route("/:id")
  .get(protect, getHealthLogById) // Get single log
  .put(protect, updateHealthLog)  // Update log
  .delete(protect, deleteHealthLog); // Delete log

export default router;
