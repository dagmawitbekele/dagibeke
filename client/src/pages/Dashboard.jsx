import { useEffect, useState } from "react";
import API from "../api/api";
import Header from "../components/Header";

export default function Dashboard() {
  const [weeks, setWeeks] = useState({});
  const [healthSummary, setHealthSummary] = useState({});
  const [registeredWeek, setRegisteredWeek] = useState(null); // NEW
  const [currentWeek, setCurrentWeek] = useState(null);
  const [showAllWeeks, setShowAllWeeks] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resWeeks = await API.get("/pregnancy/weeks");
        setWeeks(resWeeks.data);

        const token = localStorage.getItem("token");
        const resHealth = await API.get("/health/latest", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resHealth.data) {
          setHealthSummary(resHealth.data);
          setRegisteredWeek(resHealth.data.pregnancyWeek); // user registered week
          setCurrentWeek(resHealth.data.pregnancyWeek);
        } else if (Object.keys(resWeeks.data).length > 0) {
          setCurrentWeek(Object.keys(resWeeks.data)[0]); // fallback
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const getWeeksToDisplay = () => {
    const weekEntries = Object.entries(weeks);
    return showAllWeeks ? weekEntries : weekEntries.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Pregnancy Journey
          </h1>
          <p className="text-gray-600">
            Track your progress and health throughout your pregnancy
          </p>
        </div>

        {/* Registered Week Highlight */}
        {registeredWeek && weeks[registeredWeek] && (
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg p-6 text-white mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Registered Week
                </span>
                <h2 className="text-3xl font-bold mt-1">
                  Week {registeredWeek}
                </h2>
                <p className="mt-3 max-w-2xl">{weeks[registeredWeek].baby}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full">
                  <span className="text-2xl font-bold">{registeredWeek}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pregnancy Timeline */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pregnancy Timeline
            </h2>

            <div className="space-y-5">
              {getWeeksToDisplay().map(([week, info]) => (
                <div
                  key={week}
                  className={`p-4 rounded-xl border-l-4 ${
                    parseInt(week) === parseInt(currentWeek)
                      ? "border-pink-500 bg-pink-50"
                      : "border-purple-200"
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          parseInt(week) === parseInt(currentWeek)
                            ? "bg-pink-500 text-white"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        <span className="font-bold">{week}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800">
                        Week {week}
                      </h3>
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="mb-1">
                          <span className="font-medium text-pink-600">
                            Baby:
                          </span>{" "}
                          {info.baby}
                        </p>
                        <p>
                          <span className="font-medium text-purple-600">
                            Mom:
                          </span>{" "}
                          {info.mom}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {Object.entries(weeks).length > 3 && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setShowAllWeeks(!showAllWeeks)}
                    className="flex items-center text-pink-600 hover:text-pink-700 font-medium"
                  >
                    {showAllWeeks ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Advice Section */}
          {currentWeek && weeks[currentWeek] && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Weekly Advice
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <span className="font-semibold text-pink-600">Baby Tip:</span>{" "}
                  {weeks[currentWeek].advice?.baby ||
                    "Your baby is growing strong, keep up with balanced nutrition!"}
                </p>
                <p>
                  <span className="font-semibold text-purple-600">Mom Tip:</span>{" "}
                  {weeks[currentWeek].advice?.mom ||
                    "Remember to rest well and stay hydrated."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Health Summary */}
        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Health Summary
          </h2>

          {healthSummary._id ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">
                  Latest Check-in
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(healthSummary.date).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-blue-800 font-medium mb-1">Weight</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {healthSummary.weight}{" "}
                    <span className="text-sm font-normal text-gray-600">
                      kg
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-green-800 font-medium mb-1">
                    Blood Pressure
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {healthSummary.bloodPressure?.systolic || "-"}/
                    {healthSummary.bloodPressure?.diastolic || "-"}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl">
                  <div className="text-yellow-800 font-medium mb-1">
                    Sugar Level
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {healthSummary.sugarLevel || "-"}
                  </div>
                </div>

                {healthSummary.symptoms?.length > 0 && (
                  <div className="bg-orange-50 p-4 rounded-xl col-span-2">
                    <div className="text-orange-800 font-medium mb-2">
                      Symptoms
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {healthSummary.symptoms.map((symptom, index) => (
                        <span
                          key={index}
                          className="bg-white px-3 py-1 rounded-full text-sm text-orange-700 border border-orange-200"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No health data yet. Please submit your health profile first.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
