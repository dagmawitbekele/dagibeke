import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function HealthProfile() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [sugarLevel, setSugarLevel] = useState("");
  const [bloodPressure, setBloodPressure] = useState({ systolic: "", diastolic: "" });
  const [symptoms, setSymptoms] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const healthData = {
      weight,
      height,
      bloodType,
      sugarLevel,
      bloodPressure: {
        systolic: bloodPressure.systolic,
        diastolic: bloodPressure.diastolic,
      },
      symptoms: symptoms.split(",").map((s) => s.trim()), // comma-separated
    };

    try {
      const token = localStorage.getItem("token");
      await API.post("/health", healthData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Health profile saved successfully!");
      navigate("/dashboard"); // redirect to dashboard after saving
    } catch (err) {
      console.log(err);
      alert("Failed to save health data");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg w-96 space-y-6">
        <h2 className="text-2xl font-bold text-center text-pink-600">Health Profile</h2>

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="text"
          placeholder="Blood Type (e.g., A+)"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="text"
          placeholder="Sugar Level"
          value={sugarLevel}
          onChange={(e) => setSugarLevel(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Systolic BP"
            value={bloodPressure.systolic}
            onChange={(e) => setBloodPressure({ ...bloodPressure, systolic: e.target.value })}
            className="w-1/2 p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Diastolic BP"
            value={bloodPressure.diastolic}
            onChange={(e) => setBloodPressure({ ...bloodPressure, diastolic: e.target.value })}
            className="w-1/2 p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <input
          type="text"
          placeholder="Symptoms (comma-separated)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full p-3 rounded-xl bg-pink-600 text-white font-semibold hover:bg-blue-600 transition"
        >
          Save Health Profile
        </button>
      </form>
    </div>
  );
}
