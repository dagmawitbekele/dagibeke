import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { chatWithAI } from "../controllers/chatController.js";

const router = express.Router();

// User must be logged in to use chatbot
router.post("/", protect, chatWithAI);

export default router;
