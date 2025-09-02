import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HealthLogs from "./pages/HealthLogs";
import Chatbot from "./components/Chatbot";
import Home from "./home";
import TidioChat from "./components/TidioChat";
import HealthProfile from "./pages/HealthProfile";
function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health-logs" element={<HealthLogs />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/chat1" element={<TidioChat />} />
        <Route path="/health-profile" element={<HealthProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
