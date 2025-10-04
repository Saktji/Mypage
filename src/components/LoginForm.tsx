import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

interface LoginFormProps {
  logo: string;
  title?: string;
  onLogin: (data: { identifier: string; password: string; type: "email" | "phone" | "username" }) => Promise<boolean> | boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ logo, title = "Login", onLogin }) => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // For inline errors
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const getIdentifierType = (value: string): "email" | "phone" | "username" => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "email";
    if (/^\d{10}$/.test(value)) return "phone";
    return "username";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    setIdentifierError("");
    setPasswordError("");
    setLoginError("");

    if (!identifier.trim()) {
      setIdentifierError("Please enter your username");
      valid = false;
    }

    if (!password) {
      setPasswordError("Please enter your password");
      valid = false;
    }

    if (!valid) return;

    const type = getIdentifierType(identifier.trim());
    setLoading(true);

    try {
      const success = await onLogin({ identifier: identifier.trim(), password, type });
      if (success) {
        navigate("/dashboard");
      } else {
        setLoginError("Invalid credentials ❌");
      }
    } catch (err) {
      setLoginError("Login failed. Please try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 bg-gradient-to-tr from-blue-100 to-purple-200">
      <div className="w-[350px] max-w-[90%] rounded-2xl bg-white/90 shadow-2xl p-8 text-center">
        <img src={logo} alt="Logo" className="w-24 mb-5 rounded-full mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label htmlFor="identifier" className="block mb-1 text-gray-700 font-medium italic">
                Username
            </label>
            <input
              type="text"
              id="identifier"
              placeholder="Enter your username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                identifierError ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500 border-gray-300"
              }`}
              disabled={loading}
              autoComplete="username"
            />
            {identifierError && <p className="text-red-500 text-sm mt-1">{identifierError}</p>}
          </div>

          <div className="mb-6 text-left">
            <label htmlFor="password" className="block mb-1 text-gray-700 font-medium italic">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 ${
                  passwordError ? "border-red-500 focus:ring-red-500" : "focus:ring-purple-500 border-gray-300"
                }`}
                autoComplete="current-password"
                disabled={loading}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-purple-600"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {loginError && <p className="text-red-500 text-center mb-4">{loginError}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold transition hover:bg-indigo-500 hover:-translate-y-1 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
