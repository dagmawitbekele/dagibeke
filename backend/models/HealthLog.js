import mongoose from "mongoose";

const healthLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, default: Date.now },
    weight: Number,
    bloodPressure: {
      systolic: Number,
      diastolic: Number,
    },
    sugarLevel: Number,
    mood: String,
    symptoms: [String],
    alerts: [String], // ⚠️ New field
  },
  { timestamps: true }
);

export default mongoose.model("HealthLog", healthLogSchema);
