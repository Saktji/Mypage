import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/lo.jpg";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Error states
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v: string) => /^\d{10}$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
    };

    let hasError = false;

    if (!username.trim()) {
      newErrors.username = "Please enter a username";
      hasError = true;
    }

    if (!email.trim()) {
      newErrors.email = "Please enter an email";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email";
      hasError = true;
    }

    if (!phone.trim()) {
      newErrors.phone = "Please enter a phone number";
      hasError = true;
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Please enter a password";
      hasError = true;
    }

    if (!confirmPassword) {
      newErrors.confirm = "Please confirm your password";
      hasError = true;
    } else if (confirmPassword !== password) {
      newErrors.confirm = "Passwords do not match";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000)); // simulate API call
      alert("Account created successfully! 🎉");
      navigate("/"); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gradient-to-tr from-yellow-100 to-orange-200">
      <div className="w-[350px] max-w-[90%] rounded-2xl bg-white/90 shadow-2xl p-8 text-center">
        <img src={Logo} alt="Logo" className="w-24 mb-5 rounded-full mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.username ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500 border-gray-300"
              }`}
              disabled={loading}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="mb-4 text-left">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500 border-gray-300"
              }`}
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4 text-left">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500 border-gray-300"
              }`}
              disabled={loading}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500 border-gray-300"
              }`}
              disabled={loading}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-purple-600"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="relative mb-6">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 ${
                errors.confirm ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500 border-gray-300"
              }`}
              disabled={loading}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-purple-600"
              onClick={() => setShowConfirm((s) => !s)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold transition hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
