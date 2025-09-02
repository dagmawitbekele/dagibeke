export const checkHealthRisks = ({ weight, bloodPressure, sugarLevel, mood, symptoms }) => {
  const alerts = [];

  // Blood pressure check
  if (bloodPressure?.systolic && bloodPressure?.diastolic) {
    if (bloodPressure.systolic > 140 || bloodPressure.diastolic > 90) {
      alerts.push("High blood pressure – risk of preeclampsia. Contact your doctor.");
    }
    if (bloodPressure.systolic < 90 || bloodPressure.diastolic < 60) {
      alerts.push("Low blood pressure – may cause dizziness or fainting.");
    }
  }

  // Sugar check
  if (sugarLevel) {
    if (sugarLevel > 140) {
      alerts.push("High blood sugar – risk of gestational diabetes.");
    }
    if (sugarLevel < 70) {
      alerts.push("Low blood sugar – eat something and monitor closely.");
    }
  }

  // Weight (example range check, customize by doctor)
  if (weight && weight > 120) {
    alerts.push("Excessive weight – consult your doctor for safe weight gain.");
  }

  // Symptoms check
  if (symptoms?.includes("bleeding")) {
    alerts.push("Bleeding is dangerous – seek medical help immediately.");
  }
  if (symptoms?.includes("severe headache")) {
    alerts.push("Severe headache may indicate high blood pressure.");
  }
  if (symptoms?.includes("blurred vision")) {
    alerts.push("Blurred vision could be a warning sign of preeclampsia.");
  }

  return alerts;
};
