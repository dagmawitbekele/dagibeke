import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Flutterwave config
  const config = {
    public_key: "FLWPUBK_TEST-0f74c72312f434246df02164eca89143-X",
    tx_ref: Date.now(),
    amount: 100,
    currency: "ETB",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number: phone,
      name,
    },
    customizations: {
      title: "MotherCare",
      description: "Registration Payment",
      logo: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay Now",
    callback: (response) => {
      console.log("Payment Response:", response);
      setPaymentDone(true);
      closePaymentModal();
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    
    if (!phone) newErrors.phone = "Phone number is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!paymentDone) {
      setErrors({...errors, payment: "Please complete the payment first"});
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await API.post("/auth/register", { name, email, phone, password });
      localStorage.setItem("token", res.data.token);
      navigate("/health-profile");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl">
        <div className="md:flex">
          {/* Left side - Form */}
          <div className="md:w-1/2 p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-600 mt-2">Join thousands of mothers using our platform</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-purple-300"
                  }`}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-purple-300"
                  }`}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.phone ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-purple-300"
                  }`}
                  required
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-purple-300"
                  }`}
                  required
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-purple-300"
                  }`}
                  required
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              <div className="pt-4">
                {errors.payment && <p className="mb-3 text-sm text-red-600 text-center">{errors.payment}</p>}
                
                {!paymentDone ? (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-purple-800">Registration Fee</span>
                      <span className="font-bold text-purple-900">100 ETB</span>
                    </div>
                    <FlutterWaveButton 
                      {...fwConfig} 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    />
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700 font-medium">Payment successful! You can now complete registration.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!paymentDone || isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold transition ${
                    paymentDone
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } ${isSubmitting ? "opacity-75" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 font-medium hover:text-purple-700">
                  Login here
                </Link>
              </p>
            </form>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-purple-500 to-pink-500 p-10 text-white">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-3xl font-bold mb-6">Welcome to MotherCare</h2>
              <p className="text-lg mb-8 opacity-90">
                Your trusted companion through the beautiful journey of pregnancy and motherhood.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Personalized weekly pregnancy updates</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Expert health tracking tools</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Supportive community of mothers</span>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-10 p-5 rounded-2xl">
                <p className="text-sm italic">
                  "This platform made my pregnancy journey so much easier. The weekly updates were incredibly helpful!"
                </p>
                <div className="flex items-center mt-3">
                  <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Sarah M.</p>
                    <p className="text-sm opacity-75">First-time mom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}