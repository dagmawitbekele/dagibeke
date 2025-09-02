import { useState } from "react";
import API from "../api/api";

export default function HealthLogForm({ fetchLogs }) {
  const [weight, setWeight] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [sugar, setSugar] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/health", {
        weight,
        bloodPressure: { systolic, diastolic },
        sugarLevel: sugar,
        symptoms: symptoms.split(",").map(s => s.trim())
      });
      fetchLogs();
      setWeight(""); setSystolic(""); setDiastolic(""); setSugar(""); setSymptoms("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-2">
      <h3 className="text-xl font-semibold mb-2">Add Health Log</h3>
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={e=>setWeight(e.target.value)} className="w-full p-2 border rounded" required />
      <div className="flex space-x-2">
        <input type="number" placeholder="Systolic" value={systolic} onChange={e=>setSystolic(e.target.value)} className="w-1/2 p-2 border rounded" required />
        <input type="number" placeholder="Diastolic" value={diastolic} onChange={e=>setDiastolic(e.target.value)} className="w-1/2 p-2 border rounded" required />
      </div>
      <input type="number" placeholder="Sugar Level" value={sugar} onChange={e=>setSugar(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="text" placeholder="Symptoms (comma separated)" value={symptoms} onChange={e=>setSymptoms(e.target.value)} className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">Add Log</button>
    </form>
  );
}
