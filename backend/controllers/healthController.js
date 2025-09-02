import HealthLog from "../models/HealthLog.js";
import { checkHealthRisks } from "../utils/healthChecker.js";

// Add new health log
export const addHealthLog = async (req, res) => {
  try {
    const { weight, bloodPressure, sugarLevel, mood, symptoms } = req.body;

    const alerts = checkHealthRisks({ weight, bloodPressure, sugarLevel, mood, symptoms });

    const healthLog = await HealthLog.create({
      user: req.user._id,
      weight,
      bloodPressure,
      sugarLevel,
      mood,
      symptoms,
      alerts,
    });

    res.status(201).json(healthLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all health logs for logged-in user
export const getHealthLogs = async (req, res) => {
  try {
    const logs = await HealthLog.find({ user: req.user._id }).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single health log
export const getHealthLogById = async (req, res) => {
  try {
    const log = await HealthLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    if (log.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update health log
export const updateHealthLog = async (req, res) => {
  try {
    const log = await HealthLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    if (log.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const updates = req.body;
    const alerts = checkHealthRisks(updates);

    const updatedLog = await HealthLog.findByIdAndUpdate(
      req.params.id,
      { ...updates, alerts },
      { new: true }
    );

    res.json(updatedLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete health log
export const deleteHealthLog = async (req, res) => {
  try {
    const log = await HealthLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    if (log.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await log.deleteOne();
    res.json({ message: "Log removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
