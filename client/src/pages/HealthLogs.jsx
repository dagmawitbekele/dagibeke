import { useEffect, useState } from "react";
import API from "../api/api";
import Header from "../components/Header";
import HealthLogForm from "../components/HealthLogForm";

export default function HealthLogs() {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/health");
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { 
    fetchLogs(); 
  }, []);

  const handleLogClick = (log) => {
    setSelectedLog(selectedLog && selectedLog._id === log._id ? null : log);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Health Tracker</h1>
            <p className="text-gray-600 mt-2">Monitor and track your health throughout your pregnancy</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="mt-4 sm:mt-0 bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Entry
          </button>
        </div>

        {/* Stats Summary */}
        {logs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-blue-600 font-medium mb-1">Avg. Weight</div>
              <div className="text-2xl font-bold text-gray-800">
                {(logs.reduce((sum, log) => sum + (log.weight || 0), 0) / logs.length).toFixed(1)} 
                <span className="text-sm font-normal text-gray-600 ml-1">kg</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-green-600 font-medium mb-1">Latest BP</div>
              <div className="text-2xl font-bold text-gray-800">
                {logs[0].bloodPressure?.systolic || '-'}/{logs[0].bloodPressure?.diastolic || '-'}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-purple-600 font-medium mb-1">Latest Sugar</div>
              <div className="text-2xl font-bold text-gray-800">{logs[0].sugarLevel || '-'}</div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-pink-600 font-medium mb-1">Total Entries</div>
              <div className="text-2xl font-bold text-gray-800">{logs.length}</div>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Health Log Form */}
          <div className={`lg:col-span-1 ${isFormOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">New Health Entry</h2>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <HealthLogForm fetchLogs={fetchLogs} onSuccess={() => setIsFormOpen(false)} />
            </div>
          </div>

          {/* Health Logs List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Health History</h2>
              
              {logs.length === 0 ? (
                <div className="text-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-700">No health entries yet</h3>
                  <p className="mt-1 text-gray-500">Your health records will appear here after your first entry.</p>
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="mt-6 bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg font-semibold text-sm transition duration-300"
                  >
                    Create First Entry
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {logs.map(log => (
                    <div 
                      key={log._id} 
                      className={`border rounded-xl overflow-hidden transition-all duration-300 ${selectedLog && selectedLog._id === log._id ? 'border-pink-500 shadow-md' : 'border-gray-200 hover:border-pink-300'}`}
                      onClick={() => handleLogClick(log)}
                    >
                      <div className="p-4 cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="bg-pink-100 p-2 rounded-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <h3 className="font-medium text-gray-800">{formatDate(log.date)}</h3>
                              <div className="flex flex-wrap gap-3 mt-1">
                                <span className="text-sm text-gray-600 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                  </svg>
                                  {log.weight} kg
                                </span>
                                <span className="text-sm text-gray-600 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                  </svg>
                                  BP: {log.bloodPressure?.systolic || '-'}/{log.bloodPressure?.diastolic || '-'}
                                </span>
                                <span className="text-sm text-gray-600 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4a2 2 0 11-4 0 2 2 0 014 0zM4 10h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                                  </svg>
                                  Sugar: {log.sugarLevel || '-'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={`transform transition-transform ${selectedLog && selectedLog._id === log._id ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Details */}
                      {selectedLog && selectedLog._id === log._id && (
                        <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {log.symptoms?.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Symptoms</h4>
                                <div className="flex flex-wrap gap-2">
                                  {log.symptoms.map((symptom, index) => (
                                    <span key={index} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm">
                                      {symptom}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {log.alerts?.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                  </svg>
                                  Important Notices
                                </h4>
                                <ul className="text-sm text-red-600 space-y-1">
                                  {log.alerts.map((alert, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="mr-2">•</span>
                                      <span>{alert}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          
                          {log.notes && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Notes</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{log.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}