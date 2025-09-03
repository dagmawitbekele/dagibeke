import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // your MongoDB connection
import authRoutes from "./routes/authRoutes.js";
import pregnancyRoutes from "./routes/pregnancyRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express(); // <-- app must be initialized before using it

app.use(cors());
app.use(express.json()); // parse JSON body

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pregnancy", pregnancyRoutes);
app.use("/api/health", healthRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
