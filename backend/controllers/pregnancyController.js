import pregnancyUpdates from "../data/pregnancyUpdates.js";
import User from "../models/User.js";

// Get weekly update based on user's due date
export const getWeeklyUpdate = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.dueDate) {
      return res.status(400).json({ message: "Due date not set" });
    }

    const today = new Date();
    const dueDate = new Date(user.dueDate);

    // Pregnancy is ~40 weeks, due date is 280 days from conception
    const conceptionDate = new Date(dueDate);
    conceptionDate.setDate(conceptionDate.getDate() - 280);

    const diffWeeks = Math.floor(
      (today - conceptionDate) / (1000 * 60 * 60 * 24 * 7)
    );

    const week = diffWeeks > 40 ? 40 : diffWeeks;

    const update =
      pregnancyUpdates[week] || {
        baby: "No data available for this week.",
        mom: "Stay healthy and consult your doctor.",
      };

    res.json({ week, ...update });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
