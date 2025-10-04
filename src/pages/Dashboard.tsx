import React, { useState } from "react";
import Logo from "../assets/lo.jpg"; 

const Dashboard: React.FC = () => {
 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username] = useState("Admin");

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Logged out successfully!");
   
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-100">
        <p>Please log in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <div className="welcome-card bg-white p-6 rounded-lg shadow-md text-center">
        <img src={Logo} alt="Logo" className="mx-auto w-24 h-24 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Welcome, {username} 🎉</h2>
        <p className="mb-4">You have successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
